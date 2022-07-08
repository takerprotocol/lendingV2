import {BigInt, Bytes, log} from "@graphprotocol/graph-ts";
import {
    TToken as TTokenContract,
    Transfer as TTokenTransfer,
    Initialized as TTokenInitialized
} from "../generated/TToken/TToken";
import {
    DebtToken as DebtTokenContract,
    Transfer as DebtTokenTransfer,
    Initialized as DebtTokenInitialized
} from "../generated/DebtToken/DebtToken";
import {Initialized as TERC20Initialized} from "../generated/TERC20/TERC20";
import {Initialized as TERC721Initialized} from "../generated/TERC721/TERC721";
import {Initialized as TERC1155Initialized} from "../generated/TERC1155/TERC1155";
import {
    NftCollection,
    Reserve, User, UserReserve, TToken, DebtToken, TNft
} from "../generated/schema";
import * as utils from "./utils";

export function handleTTokenInitialized(event: TTokenInitialized): void {

    let poolId = event.params.pool.toHex();
    let reserveId = event.params.underlyingAsset.toHex();
    let tTokenId = event.address.toHex();

    // reserve might have been initialized by DebtToken init
    let reserve = Reserve.load(reserveId);
    if (!reserve) {utils.initReserve(reserveId, poolId);}

    let tToken = new TToken(tTokenId);
    tToken.pool = poolId;
    tToken.reserve = reserveId;
    tToken.incentivesController = event.params.incentivesController;
    tToken.decimals = BigInt.fromI32(event.params.decimals);
    tToken.name = event.params.name;
    tToken.symbol = event.params.symbol;
}

export function handleTTokenTransfer(event: TTokenTransfer): void {

    let tTokenId = event.address.toHex();
    let fromUserId = event.params.from.toHex();
    let toUserId = event.params.to.toHex();
    let value = event.params.value;

    let tToken = TToken.load(tTokenId);
    if (!tToken) {
        // Cannot init since we don't know the pool address
        console.error("TToken: " + tTokenId + " entity is not initialized");
        return;
    }
    let reserve = Reserve.load(tToken.reserve);
    if (!reserve) {
        // Cannot init since we don't know the pool address
        console.error("Reserve: " + tToken.reserve + " entity is not initialized");
        return;
    }

    let fromUserReserve = UserReserve.load(fromUserId + "-" +  tToken.reserve);
    let toUserReserve = UserReserve.load(toUserId + "-" +  tToken.reserve);
    if (!fromUserReserve) {
        fromUserReserve = utils.initUserReserve(tToken.id, fromUserId, tToken.reserve);
        reserve.users.push(fromUserReserve.id);
    }
    if (!toUserReserve) {
        toUserReserve = utils.initUserReserve(tToken.id, toUserId, tToken.reserve);
        reserve.users.push(toUserReserve.id);
    }
    fromUserReserve.depositedAmount = fromUserReserve.depositedAmount.minus(value);
    toUserReserve.depositedAmount = toUserReserve.depositedAmount.plus(value);

    fromUserReserve.save();
    toUserReserve.save();
    reserve.save();
}

export function handleDebtTokenInitialized(event: DebtTokenInitialized): void {

    let poolId = event.params.pool.toHex();
    let reserveId = event.params.underlyingAsset.toHex();
    let debtTokenId = event.address.toHex();

    // reserve might have been initialized by DebtToken init
    let reserve = Reserve.load(reserveId);
    if (!reserve) {utils.initReserve(reserveId, poolId);}

    let debtToken = new DebtToken(debtTokenId);
    debtToken.pool = poolId;
    debtToken.reserve = reserveId;
    debtToken.incentivesController = event.params.incentivesController;
    debtToken.decimals = BigInt.fromI32(event.params.decimals);
    debtToken.name = event.params.name;
    debtToken.symbol = event.params.symbol;
}

export function handleDebtTokenTransfer(event: DebtTokenTransfer): void {

    let debtTokenId = event.address.toHex();
    let fromUserId = event.params.from.toHex();
    let toUserId = event.params.to.toHex();
    let value = event.params.value;

    let debtToken = DebtToken.load(debtTokenId);
    if (!debtToken) {
        // Cannot init since we don't know the pool address
        console.error("TToken: " + debtTokenId + " entity is not initialized");
        return;
    }
    let reserve = Reserve.load(debtToken.reserve);
    if (!reserve) {
        // Cannot init since we don't know the pool address
        console.error("Reserve: " + debtToken.reserve + " entity is not initialized");
        return;
    }

    let fromUserReserve = UserReserve.load(fromUserId + "-" +  debtToken.reserve);
    let toUserReserve = UserReserve.load(toUserId + "-" +  debtToken.reserve);
    if (!fromUserReserve) {
        fromUserReserve = utils.initUserReserve(debtToken.id, fromUserId, debtToken.reserve);
        reserve.users.push(fromUserReserve.id);
    }
    if (!toUserReserve) {
        toUserReserve = utils.initUserReserve(debtToken.id, toUserId, debtToken.reserve);
        reserve.users.push(toUserReserve.id);
    }
    fromUserReserve.borrowedAmount = fromUserReserve.borrowedAmount.minus(value);
    toUserReserve.borrowedAmount = toUserReserve.borrowedAmount.plus(value);

    fromUserReserve.save();
    toUserReserve.save();
    reserve.save();
}

export function handleTERC20Initialized(event: TERC20Initialized): void {
    let poolId = event.params.pool.toHex();
    let nftCollectionId = event.params.underlyingAsset.toHex();
    let tNnftId = event.address.toHex();

    // reserve might have been initialized by DebtToken init
    let nftCollection = NftCollection.load(nftCollectionId);
    if (!nftCollection) {utils.initNftCollection(nftCollectionId, poolId);}

    let tNft = new TNft(tNnftId);
    tNft.pool = poolId;
    tNft.nftCollection = nftCollectionId;
    tNft.incentivesController = event.params.incentivesController;
    tNft.name = event.params.name;
    tNft.symbol = event.params.symbol;

    tNft.save();
}

export function handleTERC721Initialized(event: TERC721Initialized): void {
    let poolId = event.params.pool.toHex();
    let nftCollectionId = event.params.underlyingAsset.toHex();
    let tNnftId = event.address.toHex();

    // reserve might have been initialized by DebtToken init
    let nftCollection = NftCollection.load(nftCollectionId);
    if (!nftCollection) {utils.initNftCollection(nftCollectionId, poolId);}

    let tNft = new TNft(tNnftId);
    tNft.pool = poolId;
    tNft.nftCollection = nftCollectionId;
    tNft.incentivesController = event.params.incentivesController;
    tNft.name = event.params.name;
    tNft.symbol = event.params.symbol;

    tNft.save();
}

export function handleTERC1155Initialized(event: TERC1155Initialized): void {
    let poolId = event.params.pool.toHex();
    let nftCollectionId = event.params.underlyingAsset.toHex();
    let tNnftId = event.address.toHex();

    // reserve might have been initialized by DebtToken init
    let nftCollection = NftCollection.load(nftCollectionId);
    if (!nftCollection) {utils.initNftCollection(nftCollectionId, poolId);}

    let tNft = new TNft(tNnftId);
    tNft.pool = poolId;
    tNft.nftCollection = nftCollectionId;
    tNft.incentivesController = event.params.incentivesController;
    tNft.name = event.params.name;
    tNft.symbol = event.params.symbol;

    tNft.save();
}
