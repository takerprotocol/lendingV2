import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import { log } from '@graphprotocol/graph-ts';
import {IPriceOracleGetter} from "../generated/LendingPool/IPriceOracleGetter";

export function newUser(Id: string): User {

    let user = new User(Id);

    user.nftCollateral = BigInt.zero();
    user.reserveSupply = BigInt.zero();
    user.totalCollateral = BigInt.zero();
    user.totalDebt = BigInt.zero();
    user.ltvAcc = BigInt.zero();
    user.liqThreshAcc = BigInt.zero();
    user.healthFactor = BigInt.fromU64(u64.MAX_VALUE).toBigDecimal();

    return user;
}

export function newUserReserve(Id: string): UserReserve {

    let userReserve = new UserReserve(Id);

    userReserve.user = "";
    userReserve.reserve = "";
    userReserve.depositedAmount = BigInt.zero();
    userReserve.borrowedAmount = BigInt.zero();
    userReserve.usedAsCollateral = false;

    return userReserve;
}

export function newUserNftCollection(Id: string): UserNftCollection {

    let userNftCollection = new UserNftCollection(Id);

    userNftCollection.user = "";
    userNftCollection.collection = "";

    return userNftCollection;
}

export function updateCollectionPrice(collection: NftCollection, oracle: IPriceOracleGetter): void{
    let addr = Address.fromString(collection.id);

    if (collection.ercType == BigInt.zero()) {
        // ERC20
        collection.floorPrice = oracle.try_getTokenizedNFTPrice(addr).value;
    }
    else if (collection.ercType == BigInt.fromI32(1)) {
        // ERC721
        collection.floorPrice = oracle.try_getNFTPrice(addr).value;
    }
    else if (collection.ercType == BigInt.fromI32(2)) {
        // ERC1155
        collection.floorPrice = oracle.try_getNFTPrice(addr).value;
    }
    else {
        log.error("Unrecognized collection ERC type", [collection.id]);
    }
    collection.save();
}

export function updateUserState(user: User, assetPrice: BigInt, assetLtv: BigInt, assetLiqThresh: BigInt): User {
    // totalCollateral should have been upgraded
    let totalCollateral = user.totalCollateral.toBigDecimal();
    let totalDebt = user.totalDebt.toBigDecimal();

    if (totalCollateral.notEqual(BigDecimal.zero())) {
        // Weighted avg of ltv & threshold
        user.ltvAcc = user.ltvAcc.plus(assetPrice.times(assetLtv));
        user.liqThreshAcc = user.liqThreshAcc.plus(assetPrice.times(assetLiqThresh))
    } else {
        // Can't borrow anything.
        // avtLtv = 0/0, liqThresh = 0/0
        user.ltvAcc = BigInt.zero();
        user.liqThreshAcc = BigInt.zero();
    }
    if (totalDebt.notEqual(BigDecimal.zero())) {
        // Hf = Allowance / Borrowed
        user.healthFactor = user.totalCollateral.toBigDecimal()
            .times(user.liqThreshAcc.toBigDecimal())
            .div(totalDebt);
    } else {
        // Hf = allowance / 0
        user.healthFactor = BigInt.fromU64(u64.MAX_VALUE).toBigDecimal();
    }

    return user;
}

export function updateHealthFactor(user: User): User {
    let totalDebt = user.totalDebt.toBigDecimal();
    if (totalDebt.equals(BigDecimal.zero())) {
        user.healthFactor = BigInt.fromU64(u64.MAX_VALUE).toBigDecimal();
        return user;
    }
    user.healthFactor = user.liqThreshAcc.toBigDecimal()
        .div(BigDecimal.fromString("10000"))
        .div(user.totalDebt.toBigDecimal());

    return user;
}
