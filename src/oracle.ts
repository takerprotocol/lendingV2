import { Address, BigInt, store, log } from "@graphprotocol/graph-ts";
import {
  IPriceOracleGetter,
  NewNFTPrice,
  SetTokenAggregator,
} from "../generated/IPriceOracleGetter/IPriceOracleGetter";
import {
  IPriceAggregator,
  AnswerUpdated,
} from "../generated/templates/IPriceAggregator/IPriceAggregator";
import { IPriceAggregator as RealPriceAggregator } from "../generated/templates";
import {
  NftCollection,
  PriceAggregator,
  User,
  UserNftCollection,
} from "../generated/schema";
import { newPriceAggregator, newUserNftCollection } from "./utils/initializers";
import { updateUserState } from "./utils/utils";
import { POOLID } from "./utils/consts";

export function handleNewNFTPrice(event: NewNFTPrice): void {
  let collection = NftCollection.load(event.params.asset.toHex());
  if (!collection) {
    log.error("[handleNewNFTPrice]Collection {} does not exist.", [event.params.asset.toHex()]);
    return;
  }
  
  let oldFloorPrice = collection.floorPrice;
  if ((event.params.price == BigInt.fromI32(0)) && (collection.PriceAggregator != null)) {
    let aggregator = PriceAggregator.load(collection.PriceAggregator as string);
    if (aggregator) {
      collection.floorPrice = getAssetPrice(
        Address.fromBytes(aggregator.oracle),
        Address.fromString(aggregator.collection)
      );
    }
  } else {
    collection.floorPrice = event.params.price;
  }

  if (oldFloorPrice == collection.floorPrice) {
    return;
  }

  let users = collection.users;
  if (users) {
    updateAllUserStates(users);
  }
  collection.save();
}

export function handleAggregatorSet(event: SetTokenAggregator): void {
  let realAggregatorAddress = IPriceAggregator.bind(
    event.params.aggregator
  ).try_aggregator();
  if (realAggregatorAddress.reverted) {
    return;
  }

  // init aggregator entity
  store.remove("PriceAggregator", realAggregatorAddress.value.toHex());
  let aggregator = newPriceAggregator(
    event.address,
    event.params.asset,
    realAggregatorAddress.value
  );
  const asset = event.params.asset;
  let price = getAssetPrice(event.address, asset);
  aggregator.floorPrice = price;
  aggregator.save();

  // listening to the aggregator events
  RealPriceAggregator.create(realAggregatorAddress.value);

  // update collection
  let collection = NftCollection.load(asset.toHex());
  if (!collection) {
    log.info("[handleAggregatorSet]Collection {} does not exist", [asset.toHex()]);
    collection = new NftCollection(asset.toHex());
    collection.users = [];
    collection.PriceAggregator = aggregator.id;
  }
  collection.floorPrice = price;
  collection.PriceAggregator = aggregator.id;
  collection.save();
}

export function handleAnswerUpdated(event: AnswerUpdated): void {
  let aggregator = PriceAggregator.load(event.address.toHex());
  if (!aggregator) {
    log.info("[handleAnswerUpdated]Aggregator {} no longer valid.", [event.address.toHex()]);
    return;
  }
  aggregator.floorPrice = event.params.current;
  aggregator.save();

  let collection = NftCollection.load(aggregator.collection);
  if (!collection) {
    log.error("[handleAnswerUpdated]Collection {} does not exist in aggregator {}.", [aggregator.collection, aggregator.id]);
    return;
  }
  collection.floorPrice = getAssetPrice(
    Address.fromBytes(aggregator.oracle),
    Address.fromString(aggregator.collection)
  );
  let users = collection.users;

  if (users) {
    updateAllUserStates(users);
  } 

  collection.save();
}

export function getAssetPrice(oracleAddr: Address, asset: Address): BigInt {
  let oracle = IPriceOracleGetter.bind(oracleAddr);
  let price = oracle.try_getReserveAssetPrice(asset);
  if (price.reverted) {
    log.error("[getAssetPrice]Aggregator for {} does not exist", [asset.toHex()]);
    return BigInt.zero();
  }
  return price.value;
}

export function updateAllUserStates(users: string[]): void {
  users.forEach((userNftCollectionId: string) => {
    let userNftCollection = UserNftCollection.load(userNftCollectionId);
    if (userNftCollection) {
      let user = User.load(userNftCollection.user);
      if (user) {
        user = updateUserState(user, POOLID);
        user.save();
      }
    }
  });
}
