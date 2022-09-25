import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import { log } from '@graphprotocol/graph-ts';
import {IPriceOracleGetter} from "../generated/LendingPool/IPriceOracleGetter";
import {ORACLE} from "./lending-pool";

export function newUser(Id: string): User {

    let user = new User(Id);

    user.nftCollateral = BigInt.zero();
    user.reserveSupply = BigInt.zero();
    user.totalCollateral = BigInt.zero();
    user.totalDebt = BigInt.zero();
    user.avgLtv = BigInt.zero();
    user.liqThreshold = BigInt.zero();
    user.healthFactor = BigInt.zero();

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

export function updateCollectionPrice(collection: NftCollection): void{
    let addr = Address.fromString(collection.id);
    let oracle = IPriceOracleGetter.bind(Address.fromString(ORACLE));

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

    user.avgLtv = user.avgLtv
        .plus(assetPrice.times(assetLtv))
        .div(user.totalCollateral);

    user.liqThreshold = user.liqThreshold
        .plus(assetPrice.times(assetLiqThresh))
        .div(user.totalCollateral);

    user.healthFactor = user.totalCollateral
        .times(user.liqThreshold)
        .div(user.totalDebt);

    return user;
}

export function updateHealthFactor(user: User): User {
    user.healthFactor = user.totalCollateral
        .times(user.liqThreshold)
        .div(user.totalDebt);

    return user;
}
