import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Deposited, Withdrawn, Borrowed, Repaid,
  NFTsDeposited, NFTsWithdrawn,
  ReserveDataUpdated, CollateralStatusUpdated,
} from "../generated/LendingPool/LendingPool";
import {
  Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";

import {ReserveInitialized} from "../generated/PoolConfigurator/PoolConfigurator";
import {ConfigurationAdminUpdated} from "../generated/TakerAddressesProvider/TakerAddressesProvider";
import {AddressesProviderRegistered} from "../generated/TakerAddressesProviderRegistry/TakerAddressesProviderRegistry";
import * as utils from "./utils";

export function handleDeposited(event: Deposited): void {
  let poolId = event.address.toHex();
  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserveId = userId + "-" + reserveId;

  let reserve = Reserve.load(reserveId);
  let user = User.load(userId);
  let userReserve = UserReserve.load(userReserveId);

  if (!reserve) {utils.initReserve(reserveId, poolId);}
  if (!user) {utils.initUser(userId, poolId);}
  if (!userReserve) {
    userReserve = utils.initUserReserve(poolId, userId, reserveId);
  }  userReserve.depositedAmount = userReserve.depositedAmount.plus(event.params.amount);

  userReserve.save();
}

export function handleWithdrawed(event: Withdrawn): void {
  let poolId = event.address.toHex();
  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserveId = userId + "-" + reserveId;

  let reserve = Reserve.load(reserveId);
  let user = User.load(userId);
  let userReserve = UserReserve.load(userReserveId);

  if (!reserve) {utils.initReserve(reserveId, poolId);}
  if (!user) {utils.initUser(userId, poolId);}
  if (!userReserve) {
    userReserve = utils.initUserReserve(poolId, userId, reserveId);
  }  userReserve.depositedAmount = userReserve.depositedAmount.minus(event.params.amount);

  userReserve.save();
}

export function handleBorrowed(event: Borrowed): void {
  let poolId = event.address.toHex();
  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserveId = userId + "-" + reserveId;

  let reserve = Reserve.load(reserveId);
  let user = User.load(userId);
  let userReserve = UserReserve.load(userReserveId);

  if (!reserve) {utils.initReserve(reserveId, poolId);}
  if (!user) {utils.initUser(userId, poolId);}
  if (!userReserve) {
    userReserve = utils.initUserReserve(poolId, userId, reserveId);
  }  userReserve.borrowedAmount = userReserve.borrowedAmount.plus(event.params.amount);

  userReserve.save();
}

export function handleRepaid(event: Repaid): void {
  let poolId = event.address.toHex();
  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();
  let userReserveId = userId + "-" + reserveId;

  let reserve = Reserve.load(reserveId);
  let user = User.load(userId);
  let userReserve = UserReserve.load(userReserveId);

  if (!reserve) {utils.initReserve(reserveId, poolId);}
  if (!user) {utils.initUser(userId, poolId);}
  if (!userReserve) {
    userReserve = utils.initUserReserve(poolId, userId, reserveId);
  }  userReserve.depositedAmount = userReserve.borrowedAmount.minus(event.params.amount);

  userReserve.save();
}



export function handleNFTsDeposited(event: NFTsDeposited): void {
  let poolId = event.address.toHex();
  let userId = event.params.onBehalfOf.toHex();

  let user = User.load(userId);
  if (!user) {utils.initUser(userId, poolId);}

  for (let i = 0; i < event.params.nfts.length; i ++) {
    _depositNFT(
        event.params.nfts[i].toString(),
        poolId,
        userId,
        event.params.tokenIds[i],
        event.params.amounts[i]
    );
  }
}

function _depositNFT(collectionId: string, poolId: string, userId: string, tokenId: BigInt, amount: BigInt): void {
  let userNftCollectionId = userId + "-" + collectionId + "-" + tokenId.toString();

  let nftCollection = NftCollection.load(collectionId);
  let userNftCollection = UserNftCollection.load(userNftCollectionId);

  if (!nftCollection) {
    utils.initNftCollection(collectionId, poolId);
  }
  if (!userNftCollection) {
    userNftCollection = utils.initUserNftCollection(poolId, userId, collectionId, tokenId, amount);
  }
  let idx = userNftCollection.tokenIds.indexOf(tokenId);
  if (idx) {
    userNftCollection.amounts[idx].plus(amount);
  } else {
    userNftCollection.tokenIds.push(tokenId);
    userNftCollection.amounts.push(amount);
  }

  userNftCollection.save();
}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {
  let poolId = event.address.toHex();
  let userId = event.params.to.toHex();

  let user = User.load(userId);
  if (!user) {utils.initUser(userId, poolId);}

  for (let i = 0; i < event.params.nfts.length; i ++) {
    _withdrawNFT(
        event.params.nfts[i].toString(),
        poolId,
        userId,
        event.params.tokenIds[i],
        event.params.amounts[i]
    );
  }
}

function _withdrawNFT(collectionId: string, poolId: string, userId: string, tokenId: BigInt, amount: BigInt): void {
  let userNftCollectionId = userId + "-" + collectionId + "-" + tokenId.toString();

  let nftCollection = NftCollection.load(collectionId);
  let userNftCollection = UserNftCollection.load(userNftCollectionId);

  if (!nftCollection) {
    utils.initNftCollection(collectionId, poolId);
  }
  if (!userNftCollection) {
    userNftCollection = utils.initUserNftCollection(poolId, userId, collectionId, tokenId, amount);
  }
  let idx = userNftCollection.tokenIds.indexOf(tokenId);
  if (idx) {
    userNftCollection.amounts[idx].minus(amount);
  } else {
    console.error("tokenId: " + tokenId.toHex() + " not found.");
  }

  userNftCollection.save();
}

export function handleReserveDataUpdated(event: ReserveDataUpdated): void {

  let reserveId = event.params.asset.toHex();
  let reserve = Reserve.load(reserveId);
  if (!reserve) {
    reserve = utils.initReserve(reserveId, event.address.toHex());
  }
  reserve.depositRate = event.params.depositRate;
  reserve.borrowRate = event.params.borrowRate;
  reserve.liquidityIndex = event.params.liquidityIndex;
  reserve.debtIndex = event.params.debtIndex;

  reserve.save();
}

export function handleCollateralStatusUpdated(event: CollateralStatusUpdated): void {

  let reserveId = event.params.asset.toHex();
  let userId = event.params.user.toHex();
  let userReserve = UserReserve.load(userId + "-" + reserveId);
  if (!userReserve) {
    userReserve =  utils.initUserReserve(event.address.toHex(), userId, reserveId);
  }
  userReserve.usedAsCollateral = event.params.status;

  userReserve.save();
}