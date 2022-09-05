import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";
import { log } from '@graphprotocol/graph-ts';

export function newUser(Id: string): User {

    let user = new User(Id);

    user.nftCollateral = BigInt.zero();
    user.reserveSupply = BigInt.zero();
    user.totalDebt = BigInt.zero();
    user.avgLtv = BigInt.zero();
    user.liqThreshold = BigInt.zero();

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
