import { Address, BigInt, store, log } from "@graphprotocol/graph-ts";
import {
  Borrowed,
  CollateralStatusUpdated,
  Deposited,
  Liquidated,
  NFTsDeposited,
  NFTsWithdrawn,
  Repaid,
  ReserveDataUpdated,
  Withdrawn,
} from "../generated/ILendingPool/ILendingPool";
import {
  NftReserveInitialized,
  PoolConfigurator,
  ReserveDropped,
  ReserveInitialized,
} from "../generated/PoolConfigurator/PoolConfigurator";
import { ERC721 } from "../generated/PoolConfigurator/ERC721";
import { ERC20 } from "../generated/PoolConfigurator/ERC20";
import { ERC1155 } from "../generated/PoolConfigurator/ERC1155";
import {
  IPriceOracleGetter,
  NewNFTPrice,
} from "../generated/IPriceOracleGetter/IPriceOracleGetter";
import {
  LendingPool,
  Reserve,
  NftCollection,
  User,
  UserReserve,
  UserNftCollection,
  NftToken,
  ETHSupplyLog,
  ETHBorrowLog,
  LiquidatedLog,
  NFTsSupplyLog,
} from "../generated/schema";
import {
  newUser,
  newUserReserve,
  newUserNftCollection,
} from "./utils/initializers";
import { updateUserState, removeNftToken, addNftToken, addUserNftCollection2NftCollection, removeUserNftCollection } from "./utils/utils";
import { POOLID, ORACLE } from "./utils/consts";

function saveETHSupplyLog(event: Deposited): void {
  let ethSupplyId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let ethSupply = new ETHSupplyLog(ethSupplyId);
  ethSupply.blockNumber = event.block.number;
  ethSupply.asset = event.params.asset;
  ethSupply.user = event.params.to;
  ethSupply.amount = event.params.amount;
  ethSupply.save();
}

function saveETHBorrowLog(event: Borrowed): void {
  let ethBorrowId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let ethBorrow = new ETHBorrowLog(ethBorrowId);
  ethBorrow.blockNumber = event.block.number;
  ethBorrow.asset = event.params.asset;
  ethBorrow.user = event.params.from;
  ethBorrow.amount = event.params.amount;
  ethBorrow.borrowRate = event.params.borrowRate;
  ethBorrow.save();
}

function saveLiquidatedLog(event: Liquidated): void {
  let liquidatedId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let liquidated = new LiquidatedLog(liquidatedId);
  liquidated.blockNumber = event.block.number;
  liquidated.user = event.params.user;
  liquidated.nftToken = event.params.nft.toHex() + "-" + event.params.tokenId.toString();
  liquidated.debtToken = event.params.debt;
  liquidated.debtAmount = event.params.debtCovered;
  liquidated.liquidator = event.params.liquidator;
  liquidated.to = event.params.to;
  liquidated.receiveTNFT = event.params.receiveTNFT;
  liquidated.save();
}

function saveNFTsSupplyLog(event: NFTsDeposited): void {
  let nftsSupplyId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let nftsSupply = new NFTsSupplyLog(nftsSupplyId);
  nftsSupply.blockNumber = event.block.number;
  nftsSupply.user = event.params.user;
  let nftTokens: string[] = [];
  for (let i = 0; i < event.params.nfts.length; i++) {
    nftTokens.push(event.params.nfts[i].toHex() + "-" + event.params.tokenIds[i].toString());
  }
  nftsSupply.nftTokens = nftTokens;
  nftsSupply.save();
}

export function handleNftReserveInitialized(
  event: NftReserveInitialized
): void {
  let poolId = POOLID;
  let pool = LendingPool.load(poolId);
  if (!pool) {
    pool = new LendingPool(poolId);
    pool.save();
  }
  let collection = new NftCollection(event.params.asset.toHex());
  collection.users = [];
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
    let priceResult = oracle.try_getReserveAssetPrice(event.params.asset);
    collection.floorPrice = priceResult.reverted
      ? BigInt.zero()
      : priceResult.value;
  } else if (collection.ercType == BigInt.fromI32(1)) {
    // ERC721
    let collectionContract = ERC721.bind(event.params.asset);
    collection.name = collectionContract.try_name().value;
    collection.symbol = collectionContract.try_symbol().value;
    let priceResult = oracle.try_getReserveAssetPrice(event.params.asset);
    collection.floorPrice = priceResult.reverted
      ? BigInt.zero()
      : priceResult.value;
  } else if (collection.ercType == BigInt.fromI32(2)) {
    // ERC1155
    let collectionContract = ERC1155.bind(event.params.asset);
    collection.name = collectionContract._name;
    let priceResult = oracle.try_getReserveAssetPrice(event.params.asset);
    collection.floorPrice = priceResult.reverted
      ? BigInt.zero()
      : priceResult.value;
  } else {
    log.error("[handleNftReserveInitialized]Unrecognized collection ERC type", [collection.id]);
  }

  collection.save();
  log.info("[handleNftReserveInitialized]New collection from NftReserveInitialized: {}", [collection.id]);
}

export function handleReserveInitialized(event: ReserveInitialized): void {
  let poolId = POOLID;
  let pool = LendingPool.load(poolId);
  if (!pool) {
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
  log.info("[handleReserveInitialized]New reserve from ReserveInitialized: {}", [reserve.id]);
}

export function handleReserveDropped(event: ReserveDropped): void {
  let id = event.params.asset.toHex();
  let reserve = Reserve.load(id);
  if (reserve) {
    store.remove("Reserve", id);
  }
  let collection = NftCollection.load(id);
  if (collection) {
    let users = collection.users;
    if (users) {
      users.forEach((userNftCollectionId: string) => {
        removeUserNftCollection(userNftCollectionId);
      });
    }
    store.remove("NftCollection", id);
  }
}

export function handleDeposited(event: Deposited): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user) {
    user = newUser(userId);
    log.info("[handleDeposited]New user from Deposited: {}", [user.id]);
  }
  if (!reserve) {
    log.warning("[handleDeposited]Found Deposited event from unknown reserve - {}", [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.reserveSupply = user.reserveSupply.plus(event.params.amount);
  if (userReserve.usedAsCollateral) {
    user.totalCollateral = user.totalCollateral.plus(event.params.amount);
    user = updateUserState(user, POOLID);
  }
  userReserve.depositedAmount = userReserve.depositedAmount.plus(
    event.params.amount
  );

  user.save();
  userReserve.save();

  // add ETHSupply
  saveETHSupplyLog(event);
}

export function handleWithdrawn(event: Withdrawn): void {
  let userId = event.params.user.toHex();
  // User deposit ETH through gateway
  // handled through handleGatewayWithdrawn
  // if (userId == GATEWAY && event.params.to.toHex() == GATEWAY) {
  //   return;
  // }
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user) {
    log.warning("[handleWithdrawn]Found Withdrawn event for unknown user - {}", [userId]);
    user = newUser(userId);
  }
  if (!reserve) {
    log.warning("[handleWithdrawn]Found Withdrawn event for unknown reserve - {}", [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.reserveSupply = user.reserveSupply.minus(event.params.amount);
  if (userReserve.usedAsCollateral) {
    user.totalCollateral = user.totalCollateral.minus(event.params.amount);
    user = updateUserState(user, POOLID);
  }
  userReserve.depositedAmount = userReserve.depositedAmount.minus(
    event.params.amount
  );

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
  if (!user) {
    user = newUser(userId);
    log.info("[handleBorrowed]New user from Borrowed: {}", [userId]);
  }
  if (!reserve) {
    log.warning("[handleBorrowed]Found borrow event for unknown reserve - {}", [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.totalDebt = user.totalDebt.plus(event.params.amount);
  user = updateUserState(user, POOLID);
  userReserve.borrowedAmount = userReserve.borrowedAmount.plus(
    event.params.amount
  );

  user.save();
  userReserve.save();

  // add ETHBorrow
  saveETHBorrowLog(event);
}

export function handleRepaid(event: Repaid): void {
  let userId = event.params.to.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);
  if (!user) {
    log.warning("[handleRepaid]Found Repaid event for unknown user - {}", [userId]);
    user = newUser(userId);
  }
  if (!reserve) {
    log.warning("[handleRepaid]Found borrow event for unknown reserve - {}", [reserveId]);
    return;
  }
  if (!userReserve) {
    userReserve = newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  user.totalDebt = user.totalDebt.minus(event.params.amount);
  user = updateUserState(user, POOLID);
  userReserve.borrowedAmount = userReserve.borrowedAmount.minus(
    event.params.amount
  );

  user.save();
  userReserve.save();
}

export function handleCollateralStatusUpdated(
  event: CollateralStatusUpdated
): void {
  let userId = event.params.user.toHex();
  let reserveId = event.params.asset.toHex();
  let userReserveId = userId + "-" + reserveId;

  let user = User.load(userId);
  let reserve = Reserve.load(reserveId);
  let userReserve = UserReserve.load(userReserveId);

  if (!user) {
    log.warning("[handleCollateralStatusUpdated]Found CollateralStatusUpdated event for unknown user - {}", [
      userId,
    ]);
    user = newUser(userId);
    user.save();
  }
  if (!reserve) {
    log.warning(
      "[handleCollateralStatusUpdated]Found CollateralStatusUpdated event for unknown reserve - {}",
      [reserveId]
    );
    return;
  }
  if (!userReserve) {
    userReserve = newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }

  let newStatus = event.params.status;
  user = updateUserState(user, POOLID);
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

  if (!user) {
    log.warning("[handleLiquidated]Found Liquidated event for unknown user - {}", [userId]);
    return;
  }
  if (!reserve) {
    log.warning("[handleLiquidated]Found Liquidated event for unknown reserve - {}", [reserveId]);
    return;
  }

  let collectionId = event.params.nft.toHex();
  let userNftCollectionId = userId + "-" + collectionId;
  let userNftCollection = UserNftCollection.load(userNftCollectionId);
  if (!userNftCollection) {
    log.warning("[handleLiquidated]Found Liquidated event for unknown userNftCollection - {}", [
      userNftCollectionId,
    ]);
    return;
  }

  removeNftToken(userNftCollection, event.params.tokenId, BigInt.fromI32(1));

  let userReserve = UserReserve.load(userReserveId);
  if (!userReserve) {
    userReserve = newUserReserve(userReserveId);
    userReserve.user = userId;
    userReserve.reserve = reserveId;
  }
  user = updateUserState(user, POOLID);

  user.save();
  userReserve.save();

  if (event.params.receiveTNFT) {
    let toCollectionId = event.params.to.toHex() + "-" + collectionId;
    let toCollection = UserNftCollection.load(toCollectionId);
    if (!toCollection) {
      toCollection = newUserNftCollection(toCollectionId);
      addUserNftCollection2NftCollection(toCollection, collectionId);
    }
    addNftToken(toCollection, event.params.tokenId, BigInt.fromI32(1));
    let to = User.load(event.params.to.toHex());
    if (!to) {
      to = newUser(event.params.to.toHex());
    }
    to = updateUserState(to, POOLID);
    to.save();
  }

  // add Liquidated
  saveLiquidatedLog(event);
}

export function handleNFTsDeposited(event: NFTsDeposited): void {
  let userId = event.params.onBehalfOf.toHex();
  let user = User.load(userId);
  if (!user) {
    user = newUser(userId);
    log.info("[handleNFTsDeposited]New user from NFTsDeposited {}", [userId]);
  }

  for (let i = 0; i < event.params.nfts.length; i++) {
    let collectionId = event.params.nfts[i].toHex();
    let userNftCollectionId = userId + "-" + collectionId;

    let collection = NftCollection.load(collectionId);
    if (!collection) {
      log.warning("[handleNFTsDeposited]Found deposit event for unknown collection - {}", [
        collectionId,
      ]);
      return;
    }
    let userNftCollection = UserNftCollection.load(userNftCollectionId);
    if (!userNftCollection) {
      userNftCollection = newUserNftCollection(userNftCollectionId);
      addUserNftCollection2NftCollection(userNftCollection, collectionId);
      userNftCollection.user = userId;
      userNftCollection.collection = collectionId;
      userNftCollection.save();
    }

    addNftToken(
      userNftCollection,
      event.params.tokenIds[i],
      // event.params.amounts[i]
      BigInt.fromI32(1)
    );

    let tokenValue = event.params.amounts[i].times(collection.floorPrice);
    user.nftCollateral = user.nftCollateral.plus(tokenValue);
    user.totalCollateral = user.totalCollateral.plus(tokenValue);
    user = updateUserState(user, POOLID);
  }

  user.save();

  // add NFTsSupply
  saveNFTsSupplyLog(event);
}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {
  let userId = event.params.user.toHex();
  for (let i = 0; i < event.params.nfts.length; i++) {
    let collectionId = event.params.nfts[i].toHex();
    // let userNftCollectionId = userId + "-" + collectionId;
    let nftTokenId = collectionId + "-" + event.params.tokenIds[i].toString();
    let nftToken = NftToken.load(nftTokenId);
    if (!nftToken) {
      log.warning("[handleNFTsWithdrawn]Found withdraw event for unknown nftToken - {}", [
        nftTokenId,
      ]);
      continue;
    }
    let userNftCollectionId = nftToken.userCollection;
    userId = userNftCollectionId.split("-")[0];

    let userNftCollection = UserNftCollection.load(userNftCollectionId);
    if (!userNftCollection) {
      log.warning("[handleNFTsWithdrawn]Found withdraw event for unknown userNftCollection - {}", [
        userNftCollectionId,
      ]);
      userNftCollection = newUserNftCollection(userNftCollectionId);
      addUserNftCollection2NftCollection(userNftCollection, collectionId);
      userNftCollection.user = userId;
      userNftCollection.collection = collectionId;
      userNftCollection.save();
    }

    removeNftToken(
      userNftCollection,
      event.params.tokenIds[i],
      // event.params.amounts[i]
      BigInt.fromI32(1)
    );
  }

  let user = User.load(userId);
  if (!user) {
    log.warning("[handleNFTsWithdrawn]Found withdraw event for unknown user - {}", [userId]);
    user = newUser(userId);
  }
  user = updateUserState(user, POOLID);

  user.save();
}
