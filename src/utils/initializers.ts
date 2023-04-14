import {
  LendingPool,
  Reserve,
  NftToken,
  NftCollection,
  User,
  UserReserve,
  UserNftCollection,
  PriceAggregator,
} from "../../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { log, store } from "@graphprotocol/graph-ts";
import { IPriceOracleGetter } from "../../generated/IPriceOracleGetter/IPriceOracleGetter";
import { ILendingPool } from "../../generated/ILendingPool/ILendingPool";

export function newUser(Id: string): User {
  let user = new User(Id);

  user.nftCollateral = BigInt.zero();
  user.reserveSupply = BigInt.zero();
  user.totalCollateral = BigInt.zero();
  user.totalDebt = BigInt.zero();
  user.ltvAcc = BigInt.zero();
  user.liqThreshAcc = BigInt.zero();
  user.healthFactor = BigInt.fromU64(u64.MAX_VALUE);

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

export function newPriceAggregator(
  oracle: Address,
  asset: Address,
  aggregatorAddr: Address
): PriceAggregator {
  let aggregator = new PriceAggregator(aggregatorAddr.toHex());
  aggregator.collection = asset.toHex();
  aggregator.oracle = oracle;
  aggregator.floorPrice = BigInt.zero();
  return aggregator;
}

export function updateCollectionPrice(
  collection: NftCollection,
  oracle: IPriceOracleGetter
): void {
  let addr = Address.fromString(collection.id);
  let priceResult = oracle.try_getReserveAssetPrice(addr);
  collection.floorPrice = priceResult.reverted
    ? collection.floorPrice
    : priceResult.value;
  collection.save();
}
