import { NftToken, User, UserNftCollection, NftCollection } from "../../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { log, store } from "@graphprotocol/graph-ts";
import { ILendingPool } from "../../generated/ILendingPool/ILendingPool";

export function updateUserState(user: User, lendingPool: string): User {
  let pool = ILendingPool.bind(Address.fromString(lendingPool));
  let tx = pool.try_getUserState(Address.fromString(user.id));
  if (!tx.reverted) {
    let userState = tx.value;
    user.nftCollateral = userState.nftLiq;
    user.totalCollateral = userState.totalCollateralInEth;
    user.reserveSupply = userState.borrowableLiq;
    user.totalDebt = userState.totalDebtInEth;
    user.liqThreshAcc = userState.liqThreshold;
    user.healthFactor = userState.hf;
    user.ltvAcc = userState.ltv;
  } else {
    log.error("[updateUserState]get state failed {}", [user.id]);
  }
  return user;
}

export function addNftToken(
  userNftCollection: UserNftCollection,
  tokenId: BigInt,
  amount: BigInt
): void {
  let nftTokenId = userNftCollection.id + "-" + tokenId.toString();
  let nftToken = NftToken.load(nftTokenId);
  if (nftToken) {
    nftToken.amount = nftToken.amount.plus(amount);
  } else {
    nftToken = new NftToken(nftTokenId);
    nftToken.userCollection = userNftCollection.id;
    nftToken.amount = amount;
    log.info("[addNftToken]New nftToken {}", [nftTokenId.toString()]);
  }
  nftToken.save();
}

export function removeNftToken(
  userNftCollection: UserNftCollection,
  tokenId: BigInt,
  amount: BigInt
): void {
  let nftTokenId = userNftCollection.id + "-" + tokenId.toString();
  let nftToken = NftToken.load(nftTokenId);
  if (nftToken) {
    let newAmount = nftToken.amount.minus(amount);
    if (newAmount == BigInt.zero()) {
      store.remove("NftToken", nftTokenId);
      log.info("[removeNftToken]token removed", []);
      return;
    }
    nftToken.amount = newAmount;
  } else {
    log.warning("[removeNftToken]Found withdraw event for unknown nftToken - {}", [nftTokenId]);
    nftToken = new NftToken(nftTokenId);
    nftToken.userCollection = userNftCollection.id;
    nftToken.amount = amount.neg();
  }
  nftToken.save();
}

export function addUserNftCollection(
  userNftCollection: UserNftCollection,
  collectionId: string
): void {
  let collection = NftCollection.load(collectionId);
  if (!collection) {
    log.error("[addUserNftCollection]Collection {} does not exist.", [collectionId]);
    return;
  }
  if (!collection.users) {
    log.warning("[addUserNftCollection]Collection {} users is null.", [collectionId]);
    collection.users = [];
  }

  let users = collection.users;
  if (!users.includes(userNftCollection.id)) {
    users.push(userNftCollection.id);
    collection.users = users;
    collection.save();
  }
}