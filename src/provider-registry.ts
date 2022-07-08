import { BigInt, log } from "@graphprotocol/graph-ts"
import {
    LendingPool, Registry
} from "../generated/schema";
import {
    TakerAddressesProvider as TakerAddressesProviderSource,
    LendingPool as LendingPoolSource
} from "../generated/templates";
import {ReserveInitialized, NftReserveInitialized} from "../generated/PoolConfigurator/PoolConfigurator";
import {
    TakerAddressesProvider,
    ConfigurationAdminUpdated, EmergencyAdminUpdated, LendingPoolConfiguratorUpdated, PriceOracleUpdated,
} from "../generated/TakerAddressesProvider/TakerAddressesProvider";
import {AddressesProviderRegistered} from "../generated/TakerAddressesProviderRegistry/TakerAddressesProviderRegistry";
import * as utils from "./utils";

export function handleAddressesProviderRegistered(event: AddressesProviderRegistered): void {
    let registry = Registry.load(event.address.toHex());
    if(!registry) {
        registry = utils.initRegistry();
    }

    let addressesProviderAddr = event.params.newAddress;
    TakerAddressesProviderSource.create(addressesProviderAddr);
    utils.initPoolWithAddressProvider(TakerAddressesProvider.bind(addressesProviderAddr));
}


export function handleConfigurationAdminUpdated(event: ConfigurationAdminUpdated): void {
    let addressesProviderContract = TakerAddressesProvider.bind(event.address);
    let pool = LendingPool.load(addressesProviderContract.getLendingPool().toHex());
    if (!pool){
        pool = utils.initPoolWithAddressProvider(addressesProviderContract);
    }
    pool.poolAdmin = event.params.newAddress;
    pool.save();
}

export function handleEmergencyAdminUpdated(event: EmergencyAdminUpdated): void {
    let addressesProviderContract = TakerAddressesProvider.bind(event.address);
    let pool = LendingPool.load(addressesProviderContract.getLendingPool().toHex());
    if (!pool){
        pool = utils.initPoolWithAddressProvider(addressesProviderContract);
    }
    pool.emergencyAdmin = event.params.newAddress;
    pool.save();}

export function handlePriceOracleUpdated(event: EmergencyAdminUpdated): void {
    let addressesProviderContract = TakerAddressesProvider.bind(event.address);
    let pool = LendingPool.load(addressesProviderContract.getLendingPool().toHex());
    if (!pool){
        pool = utils.initPoolWithAddressProvider(addressesProviderContract);
    }
    pool.priceOracle = event.params.newAddress;
    pool.save();}

export function handleLendingPoolConfiguratorUpdated(event: EmergencyAdminUpdated): void {
    let addressesProviderContract = TakerAddressesProvider.bind(event.address);
    let pool = LendingPool.load(addressesProviderContract.getLendingPool().toHex());
    if (!pool){
        pool = utils.initPoolWithAddressProvider(addressesProviderContract);
    }
    pool.lendingPoolConfigurator = event.params.newAddress;
    pool.save();
}

export function handleReserveInitialized(event: ReserveInitialized): void {
    let poolId = event.address.toHex();
    let pool = LendingPool.load(poolId);
    if(!pool) {utils.initLendingPool(poolId);}

    let reserve = utils.initReserve(event.params.asset.toHex(), poolId);
    reserve.save();
}

export function handleNftReserveInitialized(event: NftReserveInitialized) : void{
    let poolId = event.address.toHex();
    let pool = LendingPool.load(poolId);
    if(!pool) {utils.initLendingPool(poolId);}

    let nftCollection = utils.initNftCollection(event.params.asset.toHex(), poolId);
    nftCollection.save();
}

