import { BigInt } from "@graphprotocol/graph-ts"
import {
  Borrowed,
  CollateralStatusUpdated,
  Deposited,
  Initialized,
  Liquidated,
  NFTsDeposited,
  NFTsWithdrawn,
  Paused,
  Repaid,
  ReserveDataUpdated,
  Unpaused,
  Withdrawn
} from "../generated/LendingPool/LendingPool"
import {
  NftReserveInitialized, ReserveDeleted, ReserveInitialized
} from "../generated/PoolConfigurator/PoolConfigurator"
import {
  LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection, NftToken
} from "../generated/schema";
import * as utils from "./utils";
import { log } from '@graphprotocol/graph-ts';

const POOLID = "0x68172cAc7A9c00C972f27E279A5d47424d84a731"

export function handleNftReserveInitialized(event: NftReserveInitialized): void{
  let poolId = POOLID;
  let pool = LendingPool.load(poolId);
  if(!pool) {
    pool = new LendingPool(poolId);
    pool.save();
  }
  let collection = new NftCollection(event.params.asset.toHex());
  collection.pool = poolId;
  collection.tNFT = event.params.tNft;
  collection.ercType = BigInt.fromI32(event.params.tokenType);
  collection.liqThreshold = event.params.liqThreshold;
  collection.ltv = event.params.ltv;

  collection.save();
  log.info("New collection {}", [collection.id])

}

export function handleReserveInitialized(event: ReserveInitialized): void{
  let poolId = POOLID;
  let pool = LendingPool.load(poolId);
  if(!pool) {
    pool = new LendingPool(poolId);
    pool.save();
  }
  let reserve = new Reserve(event.params.asset.toHex());
  reserve.pool = poolId;
  reserve.tToken = event.params.tToken;
  reserve.debtToken = event.params.debtToken;
  reserve.interestRateCalculator = event.params.interestRateStrategyAddress;
  reserve.liqThreshold = event.params.liqThreshold;
  reserve.ltv = event.params.ltv;

  reserve.save();
  log.info("New reserve {}", [reserve.id])
}

export function handleDeposited(event: Deposited): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user){
    user = new User(userId);
    user.save();
  }
  if (!reserve) {
    log.warning('Found deposit event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }
  userReserve.depositedAmount = userReserve.depositedAmount.plus(event.params.amount);

  userReserve.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user){
    log.warning('Found Withdrawn event for unknown user - {}', [userId]);
    user = new User(userId);
    user.save();
  }
  if (!reserve) {
    log.warning('Found deposit event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }
  userReserve.depositedAmount = userReserve.depositedAmount.minus(event.params.amount);

  userReserve.save();
}


export function handleBorrowed(event: Borrowed): void {
  let userId = event.params.from.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user){
    user = new User(userId);
    user.save();
    log.info("New user {}", [userId])
  }
  if (!reserve) {
    log.warning('Found borrow event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }
  userReserve.borrowedAmount = userReserve.borrowedAmount.plus(event.params.amount);

  userReserve.save();
}

export function handleRepaid(event: Repaid): void {
  let userId = event.params.to.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user){
    log.warning('Found Repaid event for unknown user - {}', [userId]);
    user = new User(userId);
    user.save();
  }
  if (!reserve) {
    log.warning('Found borrow event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }
  userReserve.borrowedAmount = userReserve.borrowedAmount.minus(event.params.amount);

  userReserve.save();
}


export function handleLiquidated(event: Liquidated): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.debt.toHex();
  let userReserveId = userId + "-" + reserveId;
  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);

  if (!user){
    log.warning('Found Liquidated event for unknown user - {}', [userId]);
    return;
  }
  if (!reserve) {
    log.warning('Found Liquidated event for unknown reserve - {}', [reserveId]);
    return;
  }

  for (let i = 0; i < event.params.nfts.length; i ++) {
    let collectionId = event.params.nfts[i].toHex();
    let userNftCollectionId = userId + "-" + collectionId;

    let collection = NftCollection.load(collectionId);
    if (!collection) {
      log.warning('Found Liquidated event for unknown collection - {}', [collectionId]);
      return;
    }
    let userNftCollection = UserNftCollection.load(userNftCollectionId);
    if (!userNftCollection) {
      log.warning('Found Liquidated event for unknown userNftCollection - {}', [userNftCollectionId]);
      return;
    }
    removeNft(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);
  }

  let userReserve = UserReserve.load(userReserveId);
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }
  userReserve.borrowedAmount = userReserve.borrowedAmount.minus(event.params.debtCovered);

  userReserve.save();
}

export function handleNFTsDeposited(event: NFTsDeposited): void {
  let userId = event.params.user.toHex();
  let user = User.load(userId);
  if (!user){
    user = new User(userId);
    user.save();
    log.info("New user {}", [userId])
  }

  for (let i = 0; i < event.params.nfts.length; i ++) {
    let collectionId = event.params.nfts[i].toHex();
    let userNftCollectionId = userId + "-" + collectionId;

    let collection = NftCollection.load(collectionId);
    if (!collection) {
      log.warning('Found deposit event for unknown collection - {}', [collectionId]);
      return;
    }
    let userNftCollection = UserNftCollection.load(userNftCollectionId);
    if (!userNftCollection) {
      userNftCollection = utils.newUserNftCollection(userNftCollectionId);
      userNftCollection.user = userId;
      userNftCollection.collection = collectionId;
      userNftCollection.save();
    }
    // saved inside for each collection
    addNft(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);
  }
}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {
  let userId = event.params.user.toHex();
  let user = User.load(userId);
  if (!user){
    log.warning('Found withdraw event for unknown user - {}', [userId]);
    user = new User(userId);
    user.save();
  }

  for (let i = 0; i < event.params.nfts.length; i ++) {
    let collectionId = event.params.nfts[i].toHex();
    let userNftCollectionId = userId + "-" + collectionId;

    let collection = NftCollection.load(collectionId);
    if (!collection) {
      log.warning('Found withdraw event for unknown collection - {}', [collectionId]);
      return;
    }
    let userNftCollection = UserNftCollection.load(userNftCollectionId);
    if (!userNftCollection) {
      log.warning('Found withdraw event for unknown userNftCollection - {}', [userNftCollectionId]);
      userNftCollection = utils.newUserNftCollection(userNftCollectionId);
      userNftCollection.user = userId;
      userNftCollection.collection = collectionId;
      userNftCollection.save();
    }
    // saved inside for each collection
    removeNft(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);
  }
}

export function addNft(userNftCollection: UserNftCollection, tokenId: BigInt, amount: BigInt): void {
  let nftTokenId = userNftCollection.id + '-' + tokenId.toString();
  let nftToken = NftToken.load(nftTokenId);
  if (nftToken) {
    nftToken.amount = nftToken.amount.plus(amount);
  } else {
    nftToken = new NftToken(nftTokenId);
    nftToken.userCollection = userNftCollection.id;
    nftToken.amount = amount;
    log.info("New nftToken {}", [nftTokenId.toString()]);

    // log.info("userNftCollection.tokenIds {}", [userNftCollection.tokenIds.at(0).toString()]);
  }
  nftToken.save();
}

function removeNft(userNftCollection: UserNftCollection, tokenId: BigInt, amount: BigInt): void {
  let nftTokenId = userNftCollection.id + '-' + tokenId.toString();
  let nftToken = NftToken.load(nftTokenId);
  if (nftToken) {
    nftToken.amount = nftToken.amount.minus(amount);
    // TODO: remove if amount == 0
  } else {
    log.warning('Found withdraw event for unknown nftToken - {}', [nftTokenId]);
    nftToken = new NftToken(nftTokenId);
    nftToken.userCollection = userNftCollection.id;
    nftToken.amount = amount.neg();
  }
  nftToken.save();
}


// export function handleCollateralStatusUpdated(
//     event: CollateralStatusUpdated
// ): void {}
//
// export function handleReserveDataUpdated(event: ReserveDataUpdated): void {}
