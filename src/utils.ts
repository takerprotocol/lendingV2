import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

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
    userNftCollection.tokenIds = [];
    userNftCollection.amounts = [];

    return userNftCollection;
}
