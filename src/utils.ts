import {
    Deposited, Withdrawn, Borrowed, Repaid,
    NFTsDeposited, NFTsWithdrawn,
    ReserveDataUpdated, CollateralStatusUpdated,
    LendingPool as LendingPoolContract
} from "../generated/LendingPool/LendingPool";
import {TERC20} from "../generated/TERC20/TERC20";
import {TERC721} from "../generated/TERC721/TERC721";
import {TERC1155} from "../generated/TERC1155/TERC1155";
import {TToken} from "../generated/TToken/TToken";
import {DebtToken} from "../generated/DebtToken/DebtToken";
import {TakerAddressesProvider} from "../generated/TakerAddressesProvider/TakerAddressesProvider";
import {
    LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import * as dotenv from "dotenv";
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

dotenv.config();

declare global {
    export namespace NodeJS {
        interface ProcessEnv {
            TAKER_ADDRESSES_PROVIDER: string;
        }
    }
}

enum TokenType {
    ERC20 ,
    ERC721,
    ERC1155
}

const TOKEN_TYPE_MASK = BigInt.fromString("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFCFFFFFFFFFFFFFFF");
const TOKEN_TYPE_SHIFT = BigInt.fromU64(62);

function getTokenType(configuration: BigInt): TokenType {
    let tokenType = configuration
        .bitAnd(TOKEN_TYPE_MASK)
        .rightShift(TOKEN_TYPE_SHIFT)
        .toU64() as TokenType;
    return tokenType;
}

export function initLendingPool(): void {

    let addressProvider = TakerAddressesProvider.bind(
        Address.fromString(process.env.TAKER_ADDRESSES_PROVIDER)
    );

    let id = addressProvider.getLendingPool().toHex();
    let lendingPool = new LendingPool(id);

    lendingPool.addressProvider = addressProvider._address;
    lendingPool.lendingPoolConfigurator = addressProvider.getLendingPoolConfigurator();
    lendingPool.poolAdmin = addressProvider.getLendingPool();
    lendingPool.emergencyAdmin = addressProvider.getEmergencyAdmin();
    lendingPool.priceOracle = addressProvider.getPriceOracle();
    lendingPool.reserves = [];
    lendingPool.nfts = [];

    lendingPool.save();

    console.log("initialized LendingPool entity at proxy: ", id);
}

export function initReserve(reserveId: string, poolId: string): void {

    let reserve = new Reserve(reserveId);

    let lendingPoolContract = LendingPoolContract.bind(Address.fromString(poolId));
    let reserveData = lendingPoolContract.getReserveData(Address.fromString(reserveId));

    let tTokenAddr = reserveData.tTokenAddress;
    let debtTokenAddr = reserveData.debtTokenAddress;
    let liqIdx = reserveData.liquidityIndex;
    let debtIdx = reserveData.debtIndex;
    let tTokenContract = TToken.bind(tTokenAddr);
    let debtTokenContract = DebtToken.bind(debtTokenAddr);

    reserve.pool = poolId;
    reserve.configuration = reserveData.configuration;
    reserve.liquidityIndex = reserveData.liquidityIndex;
    reserve.debtIndex = reserveData.debtIndex;
    reserve.depositRate = reserveData.depositRate;
    reserve.borrowRate = reserveData.borrowRate;
    reserve.lastUpdateTimestamp = reserveData.lastUpdateTimestamp;
    reserve.tToken = tTokenAddr;
    reserve.debtToken = debtTokenAddr;
    reserve.interestRateCalculator = reserveData.interestRateCalculatorAddress;
    reserve.treasury = reserveData.treasury;

    reserve.totalLiquidity = tTokenContract.totalSupply().times(liqIdx);
    reserve.totalDebt = debtTokenContract.totalSupply().times(debtIdx);
    reserve.users = [];

    reserve.save();
    console.log("initialized reserve entity at proxy: ", reserveId);
}

export function initNftCollection(collectionId: string, poolId: string): void {

    let nftCollection = new NftCollection(collectionId);

    let collectionAddr = Address.fromString(collectionId);
    let lendingPoolContract = LendingPoolContract.bind(Address.fromString(poolId));
    let collectionData = lendingPoolContract.getNftReserveData(collectionAddr);

    let configuration = collectionData.configuration;
    let tokenType = getTokenType(configuration);
    let collectionContract: (TERC20| TERC721 | TERC1155);
    switch (tokenType) {
        case TokenType.ERC20: collectionContract = TERC20.bind(collectionAddr);
        case TokenType.ERC721: collectionContract = TERC721.bind(collectionAddr);
        case TokenType.ERC1155: collectionContract = TERC1155.bind(collectionAddr);
    }

    nftCollection.pool = poolId;
    nftCollection.configuration = collectionData.configuration;

    nftCollection.totalLiquidity = collectionContract.totalSupply();
    nftCollection.users = [];

    nftCollection.save();
    console.log("initialized nftCollection entity at proxy: ", collectionId);
}

export function initUser(userId: string, poolId: string): void {

    let user = new User(userId);

    let lendingPoolContract = LendingPoolContract.bind(Address.fromString(poolId));
    let userAddr = Address.fromString(userId);

    user.reserveConfig = lendingPoolContract.getUserConfig(userAddr);
    user.nftConfig = lendingPoolContract.getUserNftConfig(userAddr);
    user.reserves = [];
    user.collections = [];

    user.save();
    console.log("initialized nftCollection entity at proxy: ", userId);
}
