import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Deposited, Withdrawn, Borrowed, Repaid,
  NFTsDeposited, NFTsWithdrawn,
  ReserveDataUpdated, CollateralStatusUpdated,
  LendingPool
} from "../generated/LendingPool/LendingPool"
import {
  Pool, Reserve, Collection, User, UserReserve, UserCollection
} from "../generated/schema"

export function handleDeposited(event: Deposited): void {

  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserve = UserReserve.load(userId + "-" + reserveId);

  if (!userReserve) {
    userReserve = new UserReserve(userId + "-" + reserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
    userReserve.depositedAmount = event.params.amount;
  } else {
    userReserve.depositedAmount = userReserve.depositedAmount.plus(event.params.amount);
  }

  userReserve.save();
}

export function handleWithdrawed(event: Withdrawn): void {

  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserve = UserReserve.load(userId + "-" + reserveId);

  if (!userReserve) {
    // TODO: rpc to get userReserve data and init
    log.info("userReserve {} does not exist", [userId + "-" + reserveId]);
    return;
  } else {
    userReserve.depositedAmount = userReserve.depositedAmount.minus(event.params.amount);
  }

  userReserve.save();
}

export function handleBorrowed(event: Borrowed): void {

  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserve = UserReserve.load(userId + "-" + reserveId);

  if (!userReserve) {
    userReserve = new UserReserve(userId + "-" + reserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
    userReserve.borrowedAmount = event.params.amount;
  } else {
    userReserve.borrowedAmount = userReserve.borrowedAmount.plus(event.params.amount);
  }

  userReserve.save();
}

export function handleRepaid(event: Repaid): void {

  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserve = UserReserve.load(userId + "-" + reserveId);

  if (!userReserve) {
    // TODO: rpc to get userReserve data and init
    log.info("userReserve {} does not exist", [userId + "-" + reserveId]);
    return;
  } else {
    userReserve.depositedAmount = userReserve.borrowedAmount.minus(event.params.amount);
  }

  userReserve.save();
}

export function handleNFTsDeposited(event: NFTsDeposited): void {

  let userId = event.params.onBehalfOf.toHex();

  for (let i = 0; i < event.params.nfts.length; i ++) {
    _depositNFT(
        event.params.nfts[i].toString(),
        userId,
        event.params.tokenIds[i],
        event.params.amounts[i]
    );
  }
}

function _depositNFT(collectionId: string, userId: string, tokenId: BigInt, amount: BigInt): void {
  let userCollection = UserCollection.load(userId + "-" + collectionId + "-" + tokenId.toString());
  if (!userCollection) {
    userCollection = new UserCollection(userId + "-" + collectionId + "-" + tokenId.toString());
    userCollection.user = userId;
    userCollection.collection = collectionId;
    userCollection.tokenId =tokenId;
    userCollection.amount = amount;
  } else {
    userCollection.amount = userCollection.amount.plus(amount);
  }

  userCollection.save();
}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {

  let userId = event.params.to.toHex();

  for (let i = 0; i < event.params.nfts.length; i ++) {
    _withdrawNFT(
        event.params.nfts[i].toString(),
        userId,
        event.params.tokenIds[i],
        event.params.amounts[i]
    );
  }
}

function _withdrawNFT(collectionId: string, userId: string, tokenId: BigInt, amount: BigInt): void {
  let userCollection = UserCollection.load(userId + "-" + collectionId + "-" + tokenId.toString());
  if (!userCollection) {
    // TODO: rpc to get userCollection data and init
    log.info("userReserve {} does not exist", [userId + "-" + collectionId]);
    return;
  } else {
    userCollection.amount = userCollection.amount.minus(amount);
  }

  userCollection.save();
}

export function updateReserveData(event: ReserveDataUpdated): void {

  let reserveId = event.params.asset.toHex();
  let reserve = Reserve.load(reserveId);

  if (!reserve) {
    // TODO: set pool, tToken & debtToken
    reserve = new Reserve(reserveId);
  }
  reserve.depositRate = event.params.depositRate;
  reserve.borrowRate = event.params.borrowRate;
  reserve.liquidityIndex = event.params.liquidityIndex;
  reserve.debtIndex = event.params.debtIndex;

  reserve.save();
}

export function updateUserCollateralStatus(event: CollateralStatusUpdated): void {

  let reserveId = event.params.asset.toHex();
  let userId = event.params.user.toHex();
  let userReserve = UserReserve.load(userId + "-" + reserveId);

  if (!userReserve) {
    userReserve = new UserReserve(userId + "-" + reserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
    // TODO: rpc to get depositedAmount & borrowedAmount
  }
  userReserve.usedAsCollateral = event.params.status;

  userReserve.save();
}