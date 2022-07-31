// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Borrowed extends ethereum.Event {
  get params(): Borrowed__Params {
    return new Borrowed__Params(this);
  }
}

export class Borrowed__Params {
  _event: Borrowed;

  constructor(event: Borrowed) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get borrowRate(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class CollateralStatusUpdated extends ethereum.Event {
  get params(): CollateralStatusUpdated__Params {
    return new CollateralStatusUpdated__Params(this);
  }
}

export class CollateralStatusUpdated__Params {
  _event: CollateralStatusUpdated;

  constructor(event: CollateralStatusUpdated) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get status(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class Deposited extends ethereum.Event {
  get params(): Deposited__Params {
    return new Deposited__Params(this);
  }
}

export class Deposited__Params {
  _event: Deposited;

  constructor(event: Deposited) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class Liquidated extends ethereum.Event {
  get params(): Liquidated__Params {
    return new Liquidated__Params(this);
  }
}

export class Liquidated__Params {
  _event: Liquidated;

  constructor(event: Liquidated) {
    this._event = event;
  }

  get nfts(): Array<Address> {
    return this._event.parameters[0].value.toAddressArray();
  }

  get tokenIds(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._event.parameters[2].value.toBigIntArray();
  }

  get debt(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get debtCovered(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get liquidator(): Address {
    return this._event.parameters[6].value.toAddress();
  }

  get receiveTNFT(): boolean {
    return this._event.parameters[7].value.toBoolean();
  }
}

export class NFTsDeposited extends ethereum.Event {
  get params(): NFTsDeposited__Params {
    return new NFTsDeposited__Params(this);
  }
}

export class NFTsDeposited__Params {
  _event: NFTsDeposited;

  constructor(event: NFTsDeposited) {
    this._event = event;
  }

  get nfts(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get onBehalfOf(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get tokenIds(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class NFTsWithdrawn extends ethereum.Event {
  get params(): NFTsWithdrawn__Params {
    return new NFTsWithdrawn__Params(this);
  }
}

export class NFTsWithdrawn__Params {
  _event: NFTsWithdrawn;

  constructor(event: NFTsWithdrawn) {
    this._event = event;
  }

  get nfts(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get tokenIds(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Repaid extends ethereum.Event {
  get params(): Repaid__Params {
    return new Repaid__Params(this);
  }
}

export class Repaid__Params {
  _event: Repaid;

  constructor(event: Repaid) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get initiator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ReserveDataUpdated extends ethereum.Event {
  get params(): ReserveDataUpdated__Params {
    return new ReserveDataUpdated__Params(this);
  }
}

export class ReserveDataUpdated__Params {
  _event: ReserveDataUpdated;

  constructor(event: ReserveDataUpdated) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get depositRate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get borrowRate(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get liquidityIndex(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get debtIndex(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Withdrawn extends ethereum.Event {
  get params(): Withdrawn__Params {
    return new Withdrawn__Params(this);
  }
}

export class Withdrawn__Params {
  _event: Withdrawn;

  constructor(event: Withdrawn) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class LendingPool__getAssetValuesResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }
}

export class LendingPool__getNftReserveDataResultValue0Struct extends ethereum.Tuple {
  get configuration(): BigInt {
    return this[0].toBigInt();
  }

  get tNFTAddress(): Address {
    return this[1].toAddress();
  }

  get id(): i32 {
    return this[2].toI32();
  }
}

export class LendingPool__getPoolValuesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }
}

export class LendingPool__getReserveDataResultValue0Struct extends ethereum.Tuple {
  get configuration(): BigInt {
    return this[0].toBigInt();
  }

  get liquidityIndex(): BigInt {
    return this[1].toBigInt();
  }

  get debtIndex(): BigInt {
    return this[2].toBigInt();
  }

  get depositRate(): BigInt {
    return this[3].toBigInt();
  }

  get borrowRate(): BigInt {
    return this[4].toBigInt();
  }

  get lastUpdateTimestamp(): BigInt {
    return this[5].toBigInt();
  }

  get tTokenAddress(): Address {
    return this[6].toAddress();
  }

  get debtTokenAddress(): Address {
    return this[7].toAddress();
  }

  get interestRateCalculatorAddress(): Address {
    return this[8].toAddress();
  }

  get treasury(): Address {
    return this[9].toAddress();
  }

  get id(): i32 {
    return this[10].toI32();
  }
}

export class LendingPool__getUserAssetValuesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }
}

export class LendingPool__getUserStateResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }
}

export class LendingPool__getUserValuesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }

  getValue3(): BigInt {
    return this.value3;
  }
}

export class LendingPool extends ethereum.SmartContract {
  static bind(address: Address): LendingPool {
    return new LendingPool("LendingPool", address);
  }

  ADDRESS_PROVIDER(): Address {
    let result = super.call(
      "ADDRESS_PROVIDER",
      "ADDRESS_PROVIDER():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_ADDRESS_PROVIDER(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "ADDRESS_PROVIDER",
      "ADDRESS_PROVIDER():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  MAX_NUMBER_NFT_RESERVES(): BigInt {
    let result = super.call(
      "MAX_NUMBER_NFT_RESERVES",
      "MAX_NUMBER_NFT_RESERVES():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_MAX_NUMBER_NFT_RESERVES(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "MAX_NUMBER_NFT_RESERVES",
      "MAX_NUMBER_NFT_RESERVES():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  MAX_NUMBER_RESERVES(): BigInt {
    let result = super.call(
      "MAX_NUMBER_RESERVES",
      "MAX_NUMBER_RESERVES():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_MAX_NUMBER_RESERVES(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "MAX_NUMBER_RESERVES",
      "MAX_NUMBER_RESERVES():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  NAME(): string {
    let result = super.call("NAME", "NAME():(string)", []);

    return result[0].toString();
  }

  try_NAME(): ethereum.CallResult<string> {
    let result = super.tryCall("NAME", "NAME():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  WETHGateway(): Address {
    let result = super.call("WETHGateway", "WETHGateway():(address)", []);

    return result[0].toAddress();
  }

  try_WETHGateway(): ethereum.CallResult<Address> {
    let result = super.tryCall("WETHGateway", "WETHGateway():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getAssetValues(asset: Address): LendingPool__getAssetValuesResult {
    let result = super.call(
      "getAssetValues",
      "getAssetValues(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return new LendingPool__getAssetValuesResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_getAssetValues(
    asset: Address
  ): ethereum.CallResult<LendingPool__getAssetValuesResult> {
    let result = super.tryCall(
      "getAssetValues",
      "getAssetValues(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LendingPool__getAssetValuesResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  getNftReserveConfig(asset: Address): BigInt {
    let result = super.call(
      "getNftReserveConfig",
      "getNftReserveConfig(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getNftReserveConfig(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNftReserveConfig",
      "getNftReserveConfig(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNftReserveData(
    asset: Address
  ): LendingPool__getNftReserveDataResultValue0Struct {
    let result = super.call(
      "getNftReserveData",
      "getNftReserveData(address):((uint256,address,uint8))",
      [ethereum.Value.fromAddress(asset)]
    );

    return changetype<LendingPool__getNftReserveDataResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getNftReserveData(
    asset: Address
  ): ethereum.CallResult<LendingPool__getNftReserveDataResultValue0Struct> {
    let result = super.tryCall(
      "getNftReserveData",
      "getNftReserveData(address):((uint256,address,uint8))",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<LendingPool__getNftReserveDataResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getPoolValues(): LendingPool__getPoolValuesResult {
    let result = super.call(
      "getPoolValues",
      "getPoolValues():(uint256,uint256,uint256)",
      []
    );

    return new LendingPool__getPoolValuesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_getPoolValues(): ethereum.CallResult<LendingPool__getPoolValuesResult> {
    let result = super.tryCall(
      "getPoolValues",
      "getPoolValues():(uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LendingPool__getPoolValuesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  getReserveConfig(asset: Address): BigInt {
    let result = super.call(
      "getReserveConfig",
      "getReserveConfig(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getReserveConfig(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getReserveConfig",
      "getReserveConfig(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getReserveData(
    asset: Address
  ): LendingPool__getReserveDataResultValue0Struct {
    let result = super.call(
      "getReserveData",
      "getReserveData(address):((uint256,uint128,uint128,uint128,uint128,uint40,address,address,address,address,uint8))",
      [ethereum.Value.fromAddress(asset)]
    );

    return changetype<LendingPool__getReserveDataResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getReserveData(
    asset: Address
  ): ethereum.CallResult<LendingPool__getReserveDataResultValue0Struct> {
    let result = super.tryCall(
      "getReserveData",
      "getReserveData(address):((uint256,uint128,uint128,uint128,uint128,uint40,address,address,address,address,uint8))",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<LendingPool__getReserveDataResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getReserveNormalizedDebtScale(asset: Address): BigInt {
    let result = super.call(
      "getReserveNormalizedDebtScale",
      "getReserveNormalizedDebtScale(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getReserveNormalizedDebtScale(
    asset: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getReserveNormalizedDebtScale",
      "getReserveNormalizedDebtScale(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getReserveNormalizedLiquidityScale(asset: Address): BigInt {
    let result = super.call(
      "getReserveNormalizedLiquidityScale",
      "getReserveNormalizedLiquidityScale(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getReserveNormalizedLiquidityScale(
    asset: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getReserveNormalizedLiquidityScale",
      "getReserveNormalizedLiquidityScale(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUserAssetValues(
    user: Address,
    asset: Address
  ): LendingPool__getUserAssetValuesResult {
    let result = super.call(
      "getUserAssetValues",
      "getUserAssetValues(address,address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(user), ethereum.Value.fromAddress(asset)]
    );

    return new LendingPool__getUserAssetValuesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_getUserAssetValues(
    user: Address,
    asset: Address
  ): ethereum.CallResult<LendingPool__getUserAssetValuesResult> {
    let result = super.tryCall(
      "getUserAssetValues",
      "getUserAssetValues(address,address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(user), ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LendingPool__getUserAssetValuesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  getUserConfig(user: Address): BigInt {
    let result = super.call(
      "getUserConfig",
      "getUserConfig(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toBigInt();
  }

  try_getUserConfig(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getUserConfig",
      "getUserConfig(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUserNftConfig(user: Address): BigInt {
    let result = super.call(
      "getUserNftConfig",
      "getUserNftConfig(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toBigInt();
  }

  try_getUserNftConfig(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getUserNftConfig",
      "getUserNftConfig(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUserState(user: Address): LendingPool__getUserStateResult {
    let result = super.call(
      "getUserState",
      "getUserState(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(user)]
    );

    return new LendingPool__getUserStateResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_getUserState(
    user: Address
  ): ethereum.CallResult<LendingPool__getUserStateResult> {
    let result = super.tryCall(
      "getUserState",
      "getUserState(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LendingPool__getUserStateResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  getUserValues(user: Address): LendingPool__getUserValuesResult {
    let result = super.call(
      "getUserValues",
      "getUserValues(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(user)]
    );

    return new LendingPool__getUserValuesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_getUserValues(
    user: Address
  ): ethereum.CallResult<LendingPool__getUserValuesResult> {
    let result = super.tryCall(
      "getUserValues",
      "getUserValues(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LendingPool__getUserValuesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  repay(asset: Address, amount: BigInt, to: Address): BigInt {
    let result = super.call(
      "repay",
      "repay(address,uint256,address):(uint256)",
      [
        ethereum.Value.fromAddress(asset),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromAddress(to)
      ]
    );

    return result[0].toBigInt();
  }

  try_repay(
    asset: Address,
    amount: BigInt,
    to: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "repay",
      "repay(address,uint256,address):(uint256)",
      [
        ethereum.Value.fromAddress(asset),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromAddress(to)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class BorrowCall extends ethereum.Call {
  get inputs(): BorrowCall__Inputs {
    return new BorrowCall__Inputs(this);
  }

  get outputs(): BorrowCall__Outputs {
    return new BorrowCall__Outputs(this);
  }
}

export class BorrowCall__Inputs {
  _call: BorrowCall;

  constructor(call: BorrowCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get from(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class BorrowCall__Outputs {
  _call: BorrowCall;

  constructor(call: BorrowCall) {
    this._call = call;
  }
}

export class DeleteReserveCall extends ethereum.Call {
  get inputs(): DeleteReserveCall__Inputs {
    return new DeleteReserveCall__Inputs(this);
  }

  get outputs(): DeleteReserveCall__Outputs {
    return new DeleteReserveCall__Outputs(this);
  }
}

export class DeleteReserveCall__Inputs {
  _call: DeleteReserveCall;

  constructor(call: DeleteReserveCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DeleteReserveCall__Outputs {
  _call: DeleteReserveCall;

  constructor(call: DeleteReserveCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get to(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositNFTsCall extends ethereum.Call {
  get inputs(): DepositNFTsCall__Inputs {
    return new DepositNFTsCall__Inputs(this);
  }

  get outputs(): DepositNFTsCall__Outputs {
    return new DepositNFTsCall__Outputs(this);
  }
}

export class DepositNFTsCall__Inputs {
  _call: DepositNFTsCall;

  constructor(call: DepositNFTsCall) {
    this._call = call;
  }

  get nfts(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get tokenIds(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get to(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class DepositNFTsCall__Outputs {
  _call: DepositNFTsCall;

  constructor(call: DepositNFTsCall) {
    this._call = call;
  }
}

export class InitNFTReserveCall extends ethereum.Call {
  get inputs(): InitNFTReserveCall__Inputs {
    return new InitNFTReserveCall__Inputs(this);
  }

  get outputs(): InitNFTReserveCall__Outputs {
    return new InitNFTReserveCall__Outputs(this);
  }
}

export class InitNFTReserveCall__Inputs {
  _call: InitNFTReserveCall;

  constructor(call: InitNFTReserveCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get configuration(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get tNFTAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class InitNFTReserveCall__Outputs {
  _call: InitNFTReserveCall;

  constructor(call: InitNFTReserveCall) {
    this._call = call;
  }
}

export class InitReserveCall extends ethereum.Call {
  get inputs(): InitReserveCall__Inputs {
    return new InitReserveCall__Inputs(this);
  }

  get outputs(): InitReserveCall__Outputs {
    return new InitReserveCall__Outputs(this);
  }
}

export class InitReserveCall__Inputs {
  _call: InitReserveCall;

  constructor(call: InitReserveCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get configuration(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get tTokenAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get debtAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get interestRateStrategyAddress(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class InitReserveCall__Outputs {
  _call: InitReserveCall;

  constructor(call: InitReserveCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get provider(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class LiquidateCall extends ethereum.Call {
  get inputs(): LiquidateCall__Inputs {
    return new LiquidateCall__Inputs(this);
  }

  get outputs(): LiquidateCall__Outputs {
    return new LiquidateCall__Outputs(this);
  }
}

export class LiquidateCall__Inputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }

  get nfts(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get tokenIds(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get debt(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get user(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get receiveTNFT(): boolean {
    return this._call.inputValues[5].value.toBoolean();
  }
}

export class LiquidateCall__Outputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }
}

export class RepayCall extends ethereum.Call {
  get inputs(): RepayCall__Inputs {
    return new RepayCall__Inputs(this);
  }

  get outputs(): RepayCall__Outputs {
    return new RepayCall__Outputs(this);
  }
}

export class RepayCall__Inputs {
  _call: RepayCall;

  constructor(call: RepayCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get to(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class RepayCall__Outputs {
  _call: RepayCall;

  constructor(call: RepayCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetNftReserveConfigCall extends ethereum.Call {
  get inputs(): SetNftReserveConfigCall__Inputs {
    return new SetNftReserveConfigCall__Inputs(this);
  }

  get outputs(): SetNftReserveConfigCall__Outputs {
    return new SetNftReserveConfigCall__Outputs(this);
  }
}

export class SetNftReserveConfigCall__Inputs {
  _call: SetNftReserveConfigCall;

  constructor(call: SetNftReserveConfigCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get configuration(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetNftReserveConfigCall__Outputs {
  _call: SetNftReserveConfigCall;

  constructor(call: SetNftReserveConfigCall) {
    this._call = call;
  }
}

export class SetReserveConfigCall extends ethereum.Call {
  get inputs(): SetReserveConfigCall__Inputs {
    return new SetReserveConfigCall__Inputs(this);
  }

  get outputs(): SetReserveConfigCall__Outputs {
    return new SetReserveConfigCall__Outputs(this);
  }
}

export class SetReserveConfigCall__Inputs {
  _call: SetReserveConfigCall;

  constructor(call: SetReserveConfigCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get configuration(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetReserveConfigCall__Outputs {
  _call: SetReserveConfigCall;

  constructor(call: SetReserveConfigCall) {
    this._call = call;
  }
}

export class SetReserveInterestRateCalculatorAddressCall extends ethereum.Call {
  get inputs(): SetReserveInterestRateCalculatorAddressCall__Inputs {
    return new SetReserveInterestRateCalculatorAddressCall__Inputs(this);
  }

  get outputs(): SetReserveInterestRateCalculatorAddressCall__Outputs {
    return new SetReserveInterestRateCalculatorAddressCall__Outputs(this);
  }
}

export class SetReserveInterestRateCalculatorAddressCall__Inputs {
  _call: SetReserveInterestRateCalculatorAddressCall;

  constructor(call: SetReserveInterestRateCalculatorAddressCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get interestRateCalculatorAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetReserveInterestRateCalculatorAddressCall__Outputs {
  _call: SetReserveInterestRateCalculatorAddressCall;

  constructor(call: SetReserveInterestRateCalculatorAddressCall) {
    this._call = call;
  }
}

export class SetUserUsingAsCollateralCall extends ethereum.Call {
  get inputs(): SetUserUsingAsCollateralCall__Inputs {
    return new SetUserUsingAsCollateralCall__Inputs(this);
  }

  get outputs(): SetUserUsingAsCollateralCall__Outputs {
    return new SetUserUsingAsCollateralCall__Outputs(this);
  }
}

export class SetUserUsingAsCollateralCall__Inputs {
  _call: SetUserUsingAsCollateralCall;

  constructor(call: SetUserUsingAsCollateralCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get usingAsCollateral(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetUserUsingAsCollateralCall__Outputs {
  _call: SetUserUsingAsCollateralCall;

  constructor(call: SetUserUsingAsCollateralCall) {
    this._call = call;
  }
}

export class SetWETHGatewayCall extends ethereum.Call {
  get inputs(): SetWETHGatewayCall__Inputs {
    return new SetWETHGatewayCall__Inputs(this);
  }

  get outputs(): SetWETHGatewayCall__Outputs {
    return new SetWETHGatewayCall__Outputs(this);
  }
}

export class SetWETHGatewayCall__Inputs {
  _call: SetWETHGatewayCall;

  constructor(call: SetWETHGatewayCall) {
    this._call = call;
  }

  get wETHGateway(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetWETHGatewayCall__Outputs {
  _call: SetWETHGatewayCall;

  constructor(call: SetWETHGatewayCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get from(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawNFTsCall extends ethereum.Call {
  get inputs(): WithdrawNFTsCall__Inputs {
    return new WithdrawNFTsCall__Inputs(this);
  }

  get outputs(): WithdrawNFTsCall__Outputs {
    return new WithdrawNFTsCall__Outputs(this);
  }
}

export class WithdrawNFTsCall__Inputs {
  _call: WithdrawNFTsCall;

  constructor(call: WithdrawNFTsCall) {
    this._call = call;
  }

  get nfts(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get tokenIds(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get to(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class WithdrawNFTsCall__Outputs {
  _call: WithdrawNFTsCall;

  constructor(call: WithdrawNFTsCall) {
    this._call = call;
  }
}
