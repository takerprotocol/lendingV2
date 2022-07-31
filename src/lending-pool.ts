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
  LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import * as utils from "./utils";
import { log } from '@graphprotocol/graph-ts';

export function handleNftReserveInitialized(event: NftReserveInitialized): void{
  let poolId = event.address.toHex();
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
}

export function handleReserveInitialized(event: ReserveInitialized): void{
  let poolId = event.address.toHex();
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

  reserve.save();
}


export function handleBorrowed(event: Borrowed): void {

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

export function handleInitialized(event: Initialized): void {}

export function handleLiquidated(event: Liquidated): void {}

export function handleNFTsDeposited(event: NFTsDeposited): void {
  let userId = event.params.user.toHex();
  let user = User.load(userId);
  if (!user){
    user = new User(userId);
    user.save();
  }

  for (let i = 0; i < event.params.tokenIds.length; i ++) {
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
      userNftCollection.collection = userNftCollectionId;
    }

    nftDeposited(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);
  }
}

function nftDeposited(userNftCollection: UserNftCollection, tokenId: BigInt, amount: BigInt): void {
  let idx = userNftCollection.tokenIds.indexOf(tokenId);
  if (idx != -1) {
    userNftCollection.amounts[idx] = userNftCollection.amounts[idx].plus(amount);
  } else {
    userNftCollection.tokenIds.push(tokenId);
    userNftCollection.amounts.push(amount);
  }
  userNftCollection.save();
}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {}

export function handlePaused(event: Paused): void {}

export function handleRepaid(event: Repaid): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdrawn(event: Withdrawn): void {}

export function handleCollateralStatusUpdated(
    event: CollateralStatusUpdated
): void {}

export function handleReserveDataUpdated(event: ReserveDataUpdated): void {}
