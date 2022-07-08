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
import {TakerAddressesProviderRegistry} from "../generated/TakerAddressesProviderRegistry/TakerAddressesProviderRegistry";
import {
    Registry, LendingPool, Reserve, NftCollection, User, UserReserve, UserNftCollection
} from "../generated/schema";
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

// import * as dotenv from "dotenv";
// dotenv.config();
// declare global {
//     export namespace NodeJS {
//         interface ProcessEnv {
//             TAKER_ADDRESSES_PROVIDER_REGISTRY: string;
//             TAKER_ADDRESSES_PROVIDER: string;
//
//         }
//     }
// }

enum ERCType {
    e20 ,
    e721,
    e1155
}

const TAKER_ADDRESSES_PROVIDER_REGISTRY = "0xD7B4eC7c65fBFa64607017CfA1114257F03E19ab";
const TAKER_ADDRESSES_PROVIDER = "0xa45B685C6502DC52BeA862fC63bFF6562fDC1C6e";
const TOKEN_TYPE_MASK = BigInt.fromString("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFCFFFFFFFFFFFFFFF");
const TOKEN_TYPE_SHIFT = u8(62);

function getERCType(configuration: BigInt): ERCType {
    let ERCType = configuration
        .bitAnd(TOKEN_TYPE_MASK)
        .rightShift(TOKEN_TYPE_SHIFT)
        .toU64() as ERCType;
    return ERCType;
}

export function initRegistry(): Registry {
    let registryId = TAKER_ADDRESSES_PROVIDER_REGISTRY;
    let defaultProviderId = TAKER_ADDRESSES_PROVIDER;

    let addressesProviderContract = TakerAddressesProviderRegistry.bind(
        Address.fromString(registryId)
    );
    let registry = new Registry(registryId);
    if (addressesProviderContract.isProviderExists(Address.fromString(defaultProviderId))){
        let addressProviderContract = TakerAddressesProvider.bind(Address.fromString(defaultProviderId));
        let defaultPool = new LendingPool(addressProviderContract.getLendingPool().toHex());

        defaultPool.addressProvider = addressProviderContract._address;
        defaultPool.lendingPoolConfigurator = addressProviderContract.getLendingPoolConfigurator();
        defaultPool.poolAdmin = addressProviderContract.getLendingPool();
        defaultPool.emergencyAdmin = addressProviderContract.getEmergencyAdmin();
        defaultPool.priceOracle = addressProviderContract.getPriceOracle();
        defaultPool.reserves = [];
        defaultPool.nfts = [];

        defaultPool.save();
        console.log("initialized default LendingPool entity at proxy: " + defaultPool.id);

    };

    registry.save();
    console.log("initialized TakerAddressesProviderRegistry entity at: " + registryId);

    return registry;
}

export function initLendingPool(poolId: string): LendingPool {

    let addressProviderContract = TakerAddressesProvider.bind(
        LendingPoolContract.bind(Address.fromString(poolId)).ADDRESS_PROVIDER()
    );
    let lendingPool = new LendingPool(poolId);

    lendingPool.addressProvider = addressProviderContract._address;
    lendingPool.lendingPoolConfigurator = addressProviderContract.getLendingPoolConfigurator();
    lendingPool.poolAdmin = addressProviderContract.getLendingPool();
    lendingPool.emergencyAdmin = addressProviderContract.getEmergencyAdmin();
    lendingPool.priceOracle = addressProviderContract.getPriceOracle();
    lendingPool.reserves = [];
    lendingPool.nfts = [];

    lendingPool.save();
    console.log("initialized LendingPool entity at proxy: " + poolId);

    return lendingPool;
}

export function initPoolWithAddressProvider(addressProviderContract: TakerAddressesProvider): LendingPool {

    let lendingPool = new LendingPool(addressProviderContract.getLendingPool().toHex());

    lendingPool.addressProvider = addressProviderContract._address;
    lendingPool.lendingPoolConfigurator = addressProviderContract.getLendingPoolConfigurator();
    lendingPool.poolAdmin = addressProviderContract.getPoolAdmin();
    lendingPool.emergencyAdmin = addressProviderContract.getEmergencyAdmin();
    lendingPool.priceOracle = addressProviderContract.getPriceOracle();
    lendingPool.reserves = [];
    lendingPool.nfts = [];

    lendingPool.save();
    console.log("initialized LendingPool with addressProvider: "+ addressProviderContract._address.toHex());

    return lendingPool;
}

export function initReserve(reserveId: string, poolId: string): Reserve {

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
    reserve.tToken = tTokenAddr.toHex();
    reserve.debtToken = debtTokenAddr.toHex();
    reserve.interestRateCalculator = reserveData.interestRateCalculatorAddress;
    reserve.treasury = reserveData.treasury;

    reserve.totalLiquidity = tTokenContract.totalSupply().times(liqIdx);
    reserve.totalDebt = debtTokenContract.totalSupply().times(debtIdx);
    reserve.users = [];

    reserve.save();
    console.log("initialized reserve entity at proxy: " + reserveId);

    return  reserve;
}

export function initNftCollection(collectionId: string, poolId: string): NftCollection {

    let nftCollection = new NftCollection(collectionId);

    let collectionAddr = Address.fromString(collectionId);
    let lendingPoolContract = LendingPoolContract.bind(Address.fromString(poolId));
    let collectionData = lendingPoolContract.getNftReserveData(collectionAddr);

    let configuration = collectionData.configuration;
    let ERCType = getERCType(configuration);
    switch (ERCType) {
        case 0: nftCollection.totalLiquidity = TERC20.bind(collectionAddr).totalSupply();
        case 1: nftCollection.totalLiquidity = TERC721.bind(collectionAddr).totalSupply();
        case 2: nftCollection.totalLiquidity = TERC1155.bind(collectionAddr).totalSupply();
    }

    nftCollection.pool = poolId;
    nftCollection.configuration = collectionData.configuration;
    nftCollection.users = [];

    nftCollection.save();
    console.log("initialized nftCollection entity at proxy: " + collectionId);

    return nftCollection;
}

export function initUser(userId: string, poolId: string): User {

    let user = new User(userId);

    let lendingPoolContract = LendingPoolContract.bind(Address.fromString(poolId));
    let userAddr = Address.fromString(userId);

    user.reserveConfig = lendingPoolContract.getUserConfig(userAddr);
    user.nftConfig = lendingPoolContract.getUserNftConfig(userAddr);
    user.reserves = [];
    user.collections = [];

    user.save();
    console.log("initialized User entity: " + userId);

    return user;
}

export function initUserReserve(poolId: string, userId: string, reserveId: string): UserReserve {

    let userReserveId = userId + "-" + reserveId;
    let userReserve = new UserReserve(userId + "-" + reserveId);

    let lendingPoolContract = LendingPoolContract.bind(Address.fromString(poolId));
    let userAddr = Address.fromString(userId);
    let reserveAddr = Address.fromString(reserveId);

    // Liquidity, debt, and collateral of asset in ETH
    let values = lendingPoolContract.getUserAssetValues(userAddr, reserveAddr);

    userReserve.user = userId;
    userReserve.reserve = reserveId;
    userReserve.depositedAmount = values.value0;
    userReserve.borrowedAmount = values.value1;
    // The reserve is used as collateral if liquidity == collateral
    userReserve.usedAsCollateral = (values.value0 == values.value2);

    let user = User.load(userId);
    user!.reserves.push(reserveId);

    userReserve.save();
    user!.save();
    console.log("initialized UserReserve entity: " + userReserveId);

    return userReserve;

}

export function initUserNftCollection(poolId: string, userId: string, collectionId: string, tokenId: BigInt, amount: BigInt): UserNftCollection {

    let userCollectionId = userId + "-" + collectionId;

    let userNftCollection = new UserNftCollection(userCollectionId);
    let nftCollection = NftCollection.load(collectionId);
    let user = User.load(userId);

    let userAddr = Address.fromString(userId);
    let collectionAddr = Address.fromString(collectionId);

    let depositIds: BigInt[] = [];
    let depositAmount: BigInt[] = [];
    switch (true) {
        case nftCollection!.ercType == "ERC20": {
            depositIds.push(BigInt.fromI32(-1));
            depositAmount.push(TERC20.bind(collectionAddr).balanceOf(userAddr));
        }
        case nftCollection!.ercType == "ERC721": {
            let collectionContract = TERC721.bind(collectionAddr)
            // TODO: need user => tokenids[] to get existing tNFT
        };
        case nftCollection!.ercType == "ERC1155": {
            let collectionContract = TERC721.bind(collectionAddr)
            // TODO: need user => tokenids[] to get existing tNFT
        };
    }
    userNftCollection.user = userId;
    userNftCollection.collection = collectionId;
    userNftCollection.tokenIds = depositIds;
    userNftCollection.amounts = depositAmount;

    user!.reserves.push(collectionId);

    userNftCollection.save();
    user!.save();
    console.log("initialized UserReserve entity: " + userCollectionId);

    return userNftCollection;

}

