import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";
import { log } from '@graphprotocol/graph-ts';

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
    userNftCollection.tokenIds = new Array<BigInt>();
    userNftCollection.amounts = new Array<BigInt>();

    // log.info("len {}", [userNftCollection.tokenIds.length.toString()]);
    // userNftCollection.tokenIds.push(BigInt.fromI32(6));
    // userNftCollection.save();
    // log.info("len {}", [userNftCollection.tokenIds.length.toString()]);


    return userNftCollection;
}
