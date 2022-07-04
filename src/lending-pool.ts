import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Deposited, Withdrawn, Borrowed, Repaid,
  NFTsDeposited, NFTsWithdrawn,
  ReserveDataUpdated, CollateralStatusUpdated,
  LendingPool as LendingPoolContract
} from "../generated/LendingPool/LendingPool";
import {
  LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";

import {ReserveInitialized} from "../generated/PoolConfigurator/PoolConfigurator";
import {ConfigurationAdminUpdated} from "../generated/TakerAddressesProvider/TakerAddressesProvider";
import {AddressesProviderRegistered} from "../generated/TakerAddressesProviderRegistry/TakerAddressesProviderRegistry";
import * as utils from "./utils";

export function handleDeposited(event: Deposited): void {

  let userReserve = loadOrInitUserReserve(event);
  userReserve.depositedAmount = userReserve.depositedAmount.plus(event.params.amount);

  userReserve.save();
}

export function handleWithdrawed(event: Withdrawn): void {

  let userReserve = loadOrInitUserReserve(event);
  userReserve.depositedAmount = userReserve.depositedAmount.minus(event.params.amount);


  userReserve.save();
}

export function handleBorrowed(event: Borrowed): void {

  let userReserve = loadOrInitUserReserve(event);
  userReserve.borrowedAmount = userReserve.borrowedAmount.plus(event.params.amount);

  userReserve.save();
}

export function handleRepaid(event: Repaid): void {

  let userReserve = loadOrInitUserReserve(event);
  userReserve.depositedAmount = userReserve.borrowedAmount.minus(event.params.amount);

  userReserve.save();
}

function loadOrInitUserReserve(event: Deposited | Withdrawn | Borrowed | Repaid): UserReserve {
  let poolId = event.address.toHex();
  let reserveId = event.params.asset.toHex();
  let userId = event.params.to.toHex();

  let reserve = Reserve.load(reserveId);
  let user = User.load(userId);
  let userReserve = UserReserve.load(userId + "-" + reserveId);

  if (!reserve) {
    utils.initReserve(reserveId, poolId);
  }
  if (!user) {
    utils.initUser(userId, poolId);
  }
  if (!userReserve) {
    userReserve = new UserReserve(userId + "-" + reserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
    userReserve.depositedAmount = BigInt.zero();
    userReserve.borrowedAmount = BigInt.zero();
    userReserve.save();
  }

  return userReserve;
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
  let userNftCollection = UserNftCollection.load(userId + "-" + collectionId + "-" + tokenId.toString());
  if (!userNftCollection) {
    userNftCollection = new UserNftCollection(userId + "-" + collectionId + "-" + tokenId.toString());
    userNftCollection.user = userId;
    userNftCollection.collection = collectionId;
    userNftCollection.tokenId =tokenId;
    userNftCollection.amount = amount;
  } else {
    userNftCollection.amount = userNftCollection.amount.plus(amount);
  }

  userNftCollection.save();
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
  let userNftCollection = UserNftCollection.load(userId + "-" + collectionId + "-" + tokenId.toString());
  if (!userNftCollection) {
    // TODO: rpc to get userNftCollection data and init
    log.info("userReserve {} does not exist", [userId + "-" + collectionId]);
    return;
  } else {
    userNftCollection.amount = userNftCollection.amount.minus(amount);
  }

  userNftCollection.save();
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

export function addressesProviderRegistered(event: AddressesProviderRegistered): void {}

export function configurationAdminUpdated(event: ConfigurationAdminUpdated): void {}

export function reserveInitialized(event: ReserveInitialized): void {}