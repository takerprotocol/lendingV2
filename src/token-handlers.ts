import {BigInt, Bytes, log} from "@graphprotocol/graph-ts";
import {
    Transfer as LiquidityTransfer,
    Initialized as LiquidityInitialized
} from "../generated/TToken/TToken";
import {
    Transfer as DebtTransfer,
    Initialized as DebtInitialized
} from "../generated/DebtToken/DebtToken";
import {Initialized as TERC20Initialized} from "../generated/TERC20/TERC20";
import {Initialized as TERC721Initialized} from "../generated/TERC721/TERC721";
import {Initialized as TERC1155Initialized} from "../generated/TERC1155/TERC1155";

import {
    NftCollection,
    LendingPool, Reserve, User, UserReserve
} from "../generated/schema"

export function handleLiquidityInitialized(event: LiquidityInitialized): void {

    let reserveId = event.params.underlyingAsset.toHex();
    // reserve might have been initialized by DebtToken init
    let reserve = Reserve.load(reserveId);

    if (!reserve) {
        reserve = new Reserve(reserveId);
        reserve.pool = event.params.pool.toHex();
    }
    reserve.tToken = event.address;
    reserve.save();
}

export function handleLiquidityTransfer(event: LiquidityTransfer): void {

    let reserveId = event.address.toHex();
    let fromUserId = event.params.from.toHex();
    let toUserId = event.params.to.toHex();
    let value = event.params.value;

    let fromUserReserve = UserReserve.load(fromUserId + "-" + reserveId);
    let toUserReserve = UserReserve.load(toUserId + "-" + reserveId);

    if (!fromUserReserve) {
        // TODO: rpc to get userReserve data and init
        log.info("userReserve {} does not exist", [fromUserId + "-" + reserveId]);
        return;
    }
    fromUserReserve.depositedAmount = fromUserReserve.depositedAmount.minus(value);

    if (!toUserReserve) {
        toUserReserve = new UserReserve(toUserId + "-" + reserveId);
        toUserReserve.user = toUserId;
        toUserReserve.reserve = reserveId;
        toUserReserve.depositedAmount = value;
    } else {
        toUserReserve.depositedAmount = toUserReserve.depositedAmount.plus(value);
    }

    fromUserReserve.save();
    toUserReserve.save();
}

export function handleDebtInitialized(event: DebtInitialized): void {

    let reserveId = event.params.underlyingAsset.toHex();
    // reserve might have been initialized by TToken init

    let reserve = Reserve.load(reserveId);
    if (!reserve) {
        reserve = new Reserve(reserveId);
        reserve.pool = event.params.pool.toHex();
    }
    reserve.debtToken = event.address;
    reserve.save();
}

export function handleDebtTransfer(event: DebtTransfer): void {

    let reserveId = event.address.toHex();
    let fromUserId = event.params.from.toHex();
    let toUserId = event.params.to.toHex();
    let value = event.params.value;

    let fromUserReserve = UserReserve.load(fromUserId + "-" + reserveId);
    let toUserReserve = UserReserve.load(toUserId + "-" + reserveId);

    if (!fromUserReserve) {
        // TODO: rpc to get userReserve data and init
        log.info("userReserve {} does not exist", [fromUserId + "-" + reserveId]);
        return;
    }
    fromUserReserve.borrowedAmount = fromUserReserve.borrowedAmount.minus(value);

    if (!toUserReserve) {
        toUserReserve = new UserReserve(toUserId + "-" + reserveId);
        toUserReserve.user = toUserId;
        toUserReserve.reserve = reserveId;
        toUserReserve.borrowedAmount = value;
    } else {
        toUserReserve.borrowedAmount = toUserReserve.borrowedAmount.plus(value);
    }

    fromUserReserve.save();
    toUserReserve.save();
}


export function handleTERC20Initialized(event: TERC20Initialized): void {
    initializeNftCollection(
        event.params.underlyingAsset.toHex(),
        event.params.pool.toHex(),
        event.address,
        BigInt.fromI32(0), //TODO
        BigInt.fromI32(0)
    );
}

export function handleTERC721Initialized(event: TERC721Initialized): void {
    initializeNftCollection(
        event.params.underlyingAsset.toHex(),
        event.params.pool.toHex(),
        event.address,
        BigInt.fromI32(0), //TODO
        BigInt.fromI32(0)
    );
}

export function handleTERC1155Initialized(event: TERC1155Initialized): void {
    initializeNftCollection(
        event.params.underlyingAsset.toHex(),
        event.params.pool.toHex(),
        event.address,
        BigInt.fromI32(0), //TODO
        BigInt.fromI32(0)
    );
}

function initializeNftCollection(
    collectionId: string,
    pool: string,
    tNFT: Bytes,
    totalLiquidity: BigInt,
    floorPrice: BigInt
 ): void {
    let collection = new NftCollection(collectionId);
    collection.pool = pool;
    collection.tNFT = tNFT;
    collection.totalLiquidity = totalLiquidity;
    collection.floorPrice = floorPrice;
    collection.save();
}