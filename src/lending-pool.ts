import {Address, BigInt} from "@graphprotocol/graph-ts"
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
  NftReserveInitialized, ReserveInitialized
} from "../generated/PoolConfigurator/PoolConfigurator"
import {
  LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection, NftToken
} from "../generated/schema";
import * as utils from "./utils";
import { log } from '@graphprotocol/graph-ts';
import {ERC721} from "../generated/LendingPool/ERC721";
import {ERC20} from "../generated/LendingPool/ERC20";
import {ERC1155} from "../generated/LendingPool/ERC1155";
import {NewNFTPrice} from "../generated/NFTBankConsumer/NFTBankConsumer";
import {IPriceOracleGetter} from "../generated/LendingPool/IPriceOracleGetter";

const POOLID = "0xDb2d112963A0c320b6DE43AD732b0Fb815a3Bf27";
const ORACLE = "0x547cD4C13Aa595b8EbFA2Cffe888B1246427bc4E";

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

  let oracle = IPriceOracleGetter.bind(Address.fromString(ORACLE));

  if (collection.ercType == BigInt.zero()) {
    // ERC20
    let collectionContract = ERC20.bind(event.params.asset);
    collection.name = collectionContract.try_name().value;
    collection.symbol = collectionContract.try_symbol().value;
    let priceResult = oracle.try_getTokenizedNFTPrice(event.params.asset);
    collection.floorPrice = priceResult.reverted ? BigInt.zero() : priceResult.value;
  }
  else if (collection.ercType == BigInt.fromI32(1)) {
    // ERC721
    let collectionContract = ERC721.bind(event.params.asset);
    collection.name = collectionContract.try_name().value;
    collection.symbol = collectionContract.try_symbol().value;
    let priceResult = oracle.try_getNFTPrice(event.params.asset);
    collection.floorPrice = priceResult.reverted ? BigInt.zero() : priceResult.value;
  }
  else if (collection.ercType == BigInt.fromI32(2)) {
    // ERC1155
    let collectionContract = ERC1155.bind(event.params.asset);
    collection.name = collectionContract._name;
    let priceResult = oracle.try_getNFTPrice(event.params.asset);
    collection.floorPrice = priceResult.reverted ? BigInt.zero() : priceResult.value;
  }
  else {
    log.error("Unrecognized collection ERC type", [collection.id]);
  }

  collection.save();
  log.info("New collection from NftReserveInitialized: {}", [collection.id])

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

  let reserveContract = ERC20.bind(event.params.asset);
  reserve.name = reserveContract.try_name().value;
  reserve.symbol = reserveContract.try_symbol().value;

  reserve.save();
  log.info("New reserve from ReserveInitialized: {}", [reserve.id])
}

export function handleDeposited(event: Deposited): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user){
    user = utils.newUser(userId);
    log.info("New user from Deposited: {}", [user.id])
  }
  if (!reserve) {
    log.warning('Found Deposited event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.reserveSupply = user.reserveSupply.plus(event.params.amount);
  userReserve.depositedAmount = userReserve.depositedAmount.plus(event.params.amount);

  user.save();
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
    user = utils.newUser(userId);
  }
  if (!reserve) {
    log.warning('Found Withdrawn event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.reserveSupply = user.reserveSupply.minus(event.params.amount);
  userReserve.depositedAmount = userReserve.depositedAmount.minus(event.params.amount);

  user.save();
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
    user = utils.newUser(userId);
    log.info("New user from Borrowed: {}", [userId])
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

  user.totalDebt = user.totalDebt.plus(event.params.amount);
  userReserve.borrowedAmount = userReserve.borrowedAmount.plus(event.params.amount);

  user.save();
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
    user = utils.newUser(userId);
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

  user.totalDebt = user.totalDebt.minus(event.params.amount);
  userReserve.borrowedAmount = userReserve.borrowedAmount.minus(event.params.amount);

  user.save();
  userReserve.save();
}

export function handleCollateralStatusUpdated(event: CollateralStatusUpdated): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);

  if(!user){
    log.warning('Found CollateralStatusUpdated event for unknown user - {}', [userId]);
    user = utils.newUser(userId);
    user.save();
  }
  if (!reserve) {
    log.warning('Found CollateralStatusUpdated event for unknown reserve - {}', [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  let newStatus = event.params.status;
  if(!userReserve.usedAsCollateral && newStatus){
    user.avgLtv = user.avgLtv.plus(userReserve.depositedAmount.times(reserve.ltv));
    user.liqThreshold = user.liqThreshold.plus(userReserve.depositedAmount.times(reserve.liqThreshold));
  }
  if(userReserve.usedAsCollateral && !newStatus){
    user.avgLtv = user.avgLtv.minus(userReserve.depositedAmount.times(reserve.ltv));
    user.liqThreshold = user.liqThreshold.minus(userReserve.depositedAmount.times(reserve.liqThreshold));
  }
  userReserve.usedAsCollateral = event.params.status;

  user.save();
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
    updateCollectionPrice(collection);
    removeNftToken(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);

    let tokenValue = event.params.amounts[i].times(collection.floorPrice);
    user.nftCollateral = user.nftCollateral.minus(tokenValue);
    user.avgLtv = user.avgLtv.minus(tokenValue.times(collection.ltv));
    user.liqThreshold = user.liqThreshold.minus(tokenValue.times(collection.liqThreshold));
  }

  let userReserve = UserReserve.load(userReserveId);
  if (!userReserve) {
    userReserve = utils.newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.totalDebt = user.totalDebt.minus(event.params.debtCovered);
  userReserve.borrowedAmount = userReserve.borrowedAmount.minus(event.params.debtCovered);

  user.save();
  userReserve.save();
}

export function handleNFTsDeposited(event: NFTsDeposited): void {
  let userId = event.params.user.toHex();
  let user = User.load(userId);
  if (!user){
    user = utils.newUser(userId);
    log.info("New user from NFTsDeposited {}", [userId])
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

    updateCollectionPrice(collection);
    addNftToken(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);

    let tokenValue = event.params.amounts[i].times(collection.floorPrice);
    user.nftCollateral = user.nftCollateral.plus(tokenValue);
    user.avgLtv = user.avgLtv.plus(tokenValue.times(collection.ltv));
    user.liqThreshold = user.liqThreshold.plus(tokenValue.times(collection.liqThreshold));
  }

  user.save();
}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {
  let userId = event.params.user.toHex();
  let user = User.load(userId);
  if (!user){
    log.warning('Found withdraw event for unknown user - {}', [userId]);
    user = utils.newUser(userId);
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
    updateCollectionPrice(collection);
    removeNftToken(userNftCollection, event.params.tokenIds[i], event.params.amounts[i]);

    let tokenValue = event.params.amounts[i].times(collection.floorPrice);
    user.nftCollateral = user.nftCollateral.minus(tokenValue);
    user.avgLtv = user.avgLtv.minus(tokenValue.times(collection.ltv));
    user.liqThreshold = user.liqThreshold.minus(tokenValue.times(collection.liqThreshold));
  }

  user.save();
}

function addNftToken(userNftCollection: UserNftCollection, tokenId: BigInt, amount: BigInt): void {
  let nftTokenId = userNftCollection.id + '-' + tokenId.toString();
  let nftToken = NftToken.load(nftTokenId);
  if (nftToken) {
    nftToken.amount = nftToken.amount.plus(amount);
  } else {
    nftToken = new NftToken(nftTokenId);
    nftToken.userCollection = userNftCollection.id;
    nftToken.amount = amount;
    log.info("New nftToken {}", [nftTokenId.toString()]);
  }
  nftToken.save();
}

function removeNftToken(userNftCollection: UserNftCollection, tokenId: BigInt, amount: BigInt): void {
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

function updateCollectionPrice(collection: NftCollection): void{
  let addr = Address.fromString(collection.id);
  let oracle = IPriceOracleGetter.bind(Address.fromString(ORACLE));

  if (collection.ercType == BigInt.zero()) {
    // ERC20
    collection.floorPrice = oracle.try_getTokenizedNFTPrice(addr).value;
  }
  else if (collection.ercType == BigInt.fromI32(1)) {
    // ERC721
    collection.floorPrice = oracle.try_getNFTPrice(addr).value;
  }
  else if (collection.ercType == BigInt.fromI32(2)) {
    // ERC1155
    collection.floorPrice = oracle.try_getNFTPrice(addr).value;
  }
  else {
    log.error("Unrecognized collection ERC type", [collection.id]);
  }
  collection.save();
}


export function handleNewNFTPrice(event: NewNFTPrice): void {
  let collectionId = event.params.asset.toHex();
  let collection = NftCollection.load(collectionId);
  if (!collection) {
    log.warning('NewNFTPrice for unknown collection  - {}', [collectionId]);
    return
  }
  collection.floorPrice = event.params.price;
  collection.save();
}

