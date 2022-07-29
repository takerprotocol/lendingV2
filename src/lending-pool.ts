import { BigInt } from "@graphprotocol/graph-ts"
import {
  LendingPool,
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
import { ExampleEntity } from "../generated/schema"

export function handleBorrowed(event: Borrowed): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.asset = event.params.asset
  entity.from = event.params.from

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.ADDRESS_PROVIDER(...)
  // - contract.MAX_NUMBER_NFT_RESERVES(...)
  // - contract.MAX_NUMBER_RESERVES(...)
  // - contract.NAME(...)
  // - contract.WETHGateway(...)
  // - contract.getAssetValues(...)
  // - contract.getNftReserveConfig(...)
  // - contract.getNftReserveData(...)
  // - contract.getPoolValues(...)
  // - contract.getReserveConfig(...)
  // - contract.getReserveData(...)
  // - contract.getReserveNormalizedDebtScale(...)
  // - contract.getReserveNormalizedLiquidityScale(...)
  // - contract.getUserAssetValues(...)
  // - contract.getUserConfig(...)
  // - contract.getUserNftConfig(...)
  // - contract.getUserState(...)
  // - contract.getUserValues(...)
  // - contract.paused(...)
  // - contract.repay(...)
}

export function handleCollateralStatusUpdated(
  event: CollateralStatusUpdated
): void {}

export function handleDeposited(event: Deposited): void {}

export function handleInitialized(event: Initialized): void {}

export function handleLiquidated(event: Liquidated): void {}

export function handleNFTsDeposited(event: NFTsDeposited): void {}

export function handleNFTsWithdrawn(event: NFTsWithdrawn): void {}

export function handlePaused(event: Paused): void {}

export function handleRepaid(event: Repaid): void {}

export function handleReserveDataUpdated(event: ReserveDataUpdated): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdrawn(event: Withdrawn): void {}
