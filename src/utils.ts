import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import { log } from '@graphprotocol/graph-ts';

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
