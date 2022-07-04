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

export class AddressSet extends ethereum.Event {
  get params(): AddressSet__Params {
    return new AddressSet__Params(this);
  }
}

export class AddressSet__Params {
  _event: AddressSet;

  constructor(event: AddressSet) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get newAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get hasProxy(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class ConfigurationAdminUpdated extends ethereum.Event {
  get params(): ConfigurationAdminUpdated__Params {
    return new ConfigurationAdminUpdated__Params(this);
  }
}

export class ConfigurationAdminUpdated__Params {
  _event: ConfigurationAdminUpdated;

  constructor(event: ConfigurationAdminUpdated) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class EmergencyAdminUpdated extends ethereum.Event {
  get params(): EmergencyAdminUpdated__Params {
    return new EmergencyAdminUpdated__Params(this);
  }
}

export class EmergencyAdminUpdated__Params {
  _event: EmergencyAdminUpdated;

  constructor(event: EmergencyAdminUpdated) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LendingPoolConfiguratorUpdated extends ethereum.Event {
  get params(): LendingPoolConfiguratorUpdated__Params {
    return new LendingPoolConfiguratorUpdated__Params(this);
  }
}

export class LendingPoolConfiguratorUpdated__Params {
  _event: LendingPoolConfiguratorUpdated;

  constructor(event: LendingPoolConfiguratorUpdated) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LendingPoolUpdated extends ethereum.Event {
  get params(): LendingPoolUpdated__Params {
    return new LendingPoolUpdated__Params(this);
  }
}

export class LendingPoolUpdated__Params {
  _event: LendingPoolUpdated;

  constructor(event: LendingPoolUpdated) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PriceOracleUpdated extends ethereum.Event {
  get params(): PriceOracleUpdated__Params {
    return new PriceOracleUpdated__Params(this);
  }
}

export class PriceOracleUpdated__Params {
  _event: PriceOracleUpdated;

  constructor(event: PriceOracleUpdated) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ProxyCreated extends ethereum.Event {
  get params(): ProxyCreated__Params {
    return new ProxyCreated__Params(this);
  }
}

export class ProxyCreated__Params {
  _event: ProxyCreated;

  constructor(event: ProxyCreated) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get newAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TakerAddressesProvider extends ethereum.SmartContract {
  static bind(address: Address): TakerAddressesProvider {
    return new TakerAddressesProvider("TakerAddressesProvider", address);
  }

  getAddress(id: Bytes): Address {
    let result = super.call("getAddress", "getAddress(bytes32):(address)", [
      ethereum.Value.fromFixedBytes(id)
    ]);

    return result[0].toAddress();
  }

  try_getAddress(id: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall("getAddress", "getAddress(bytes32):(address)", [
      ethereum.Value.fromFixedBytes(id)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getEmergencyAdmin(): Address {
    let result = super.call(
      "getEmergencyAdmin",
      "getEmergencyAdmin():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getEmergencyAdmin(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getEmergencyAdmin",
      "getEmergencyAdmin():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getLendingPool(): Address {
    let result = super.call("getLendingPool", "getLendingPool():(address)", []);

    return result[0].toAddress();
  }

  try_getLendingPool(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getLendingPool",
      "getLendingPool():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getLendingPoolConfigurator(): Address {
    let result = super.call(
      "getLendingPoolConfigurator",
      "getLendingPoolConfigurator():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getLendingPoolConfigurator(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getLendingPoolConfigurator",
      "getLendingPoolConfigurator():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPoolAdmin(): Address {
    let result = super.call("getPoolAdmin", "getPoolAdmin():(address)", []);

    return result[0].toAddress();
  }

  try_getPoolAdmin(): ethereum.CallResult<Address> {
    let result = super.tryCall("getPoolAdmin", "getPoolAdmin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPriceOracle(): Address {
    let result = super.call("getPriceOracle", "getPriceOracle():(address)", []);

    return result[0].toAddress();
  }

  try_getPriceOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getPriceOracle",
      "getPriceOracle():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetAddressCall extends ethereum.Call {
  get inputs(): SetAddressCall__Inputs {
    return new SetAddressCall__Inputs(this);
  }

  get outputs(): SetAddressCall__Outputs {
    return new SetAddressCall__Outputs(this);
  }
}

export class SetAddressCall__Inputs {
  _call: SetAddressCall;

  constructor(call: SetAddressCall) {
    this._call = call;
  }

  get id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get newAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetAddressCall__Outputs {
  _call: SetAddressCall;

  constructor(call: SetAddressCall) {
    this._call = call;
  }
}

export class SetAddressAsProxyCall extends ethereum.Call {
  get inputs(): SetAddressAsProxyCall__Inputs {
    return new SetAddressAsProxyCall__Inputs(this);
  }

  get outputs(): SetAddressAsProxyCall__Outputs {
    return new SetAddressAsProxyCall__Outputs(this);
  }
}

export class SetAddressAsProxyCall__Inputs {
  _call: SetAddressAsProxyCall;

  constructor(call: SetAddressAsProxyCall) {
    this._call = call;
  }

  get id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get impl(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetAddressAsProxyCall__Outputs {
  _call: SetAddressAsProxyCall;

  constructor(call: SetAddressAsProxyCall) {
    this._call = call;
  }
}

export class SetEmergencyAdminCall extends ethereum.Call {
  get inputs(): SetEmergencyAdminCall__Inputs {
    return new SetEmergencyAdminCall__Inputs(this);
  }

  get outputs(): SetEmergencyAdminCall__Outputs {
    return new SetEmergencyAdminCall__Outputs(this);
  }
}

export class SetEmergencyAdminCall__Inputs {
  _call: SetEmergencyAdminCall;

  constructor(call: SetEmergencyAdminCall) {
    this._call = call;
  }

  get emergencyAdmin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetEmergencyAdminCall__Outputs {
  _call: SetEmergencyAdminCall;

  constructor(call: SetEmergencyAdminCall) {
    this._call = call;
  }
}

export class SetLendingPoolConfiguratorImplCall extends ethereum.Call {
  get inputs(): SetLendingPoolConfiguratorImplCall__Inputs {
    return new SetLendingPoolConfiguratorImplCall__Inputs(this);
  }

  get outputs(): SetLendingPoolConfiguratorImplCall__Outputs {
    return new SetLendingPoolConfiguratorImplCall__Outputs(this);
  }
}

export class SetLendingPoolConfiguratorImplCall__Inputs {
  _call: SetLendingPoolConfiguratorImplCall;

  constructor(call: SetLendingPoolConfiguratorImplCall) {
    this._call = call;
  }

  get configurator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetLendingPoolConfiguratorImplCall__Outputs {
  _call: SetLendingPoolConfiguratorImplCall;

  constructor(call: SetLendingPoolConfiguratorImplCall) {
    this._call = call;
  }
}

export class SetLendingPoolImplCall extends ethereum.Call {
  get inputs(): SetLendingPoolImplCall__Inputs {
    return new SetLendingPoolImplCall__Inputs(this);
  }

  get outputs(): SetLendingPoolImplCall__Outputs {
    return new SetLendingPoolImplCall__Outputs(this);
  }
}

export class SetLendingPoolImplCall__Inputs {
  _call: SetLendingPoolImplCall;

  constructor(call: SetLendingPoolImplCall) {
    this._call = call;
  }

  get pool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetLendingPoolImplCall__Outputs {
  _call: SetLendingPoolImplCall;

  constructor(call: SetLendingPoolImplCall) {
    this._call = call;
  }
}

export class SetPoolAdminCall extends ethereum.Call {
  get inputs(): SetPoolAdminCall__Inputs {
    return new SetPoolAdminCall__Inputs(this);
  }

  get outputs(): SetPoolAdminCall__Outputs {
    return new SetPoolAdminCall__Outputs(this);
  }
}

export class SetPoolAdminCall__Inputs {
  _call: SetPoolAdminCall;

  constructor(call: SetPoolAdminCall) {
    this._call = call;
  }

  get admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPoolAdminCall__Outputs {
  _call: SetPoolAdminCall;

  constructor(call: SetPoolAdminCall) {
    this._call = call;
  }
}

export class SetPriceOracleCall extends ethereum.Call {
  get inputs(): SetPriceOracleCall__Inputs {
    return new SetPriceOracleCall__Inputs(this);
  }

  get outputs(): SetPriceOracleCall__Outputs {
    return new SetPriceOracleCall__Outputs(this);
  }
}

export class SetPriceOracleCall__Inputs {
  _call: SetPriceOracleCall;

  constructor(call: SetPriceOracleCall) {
    this._call = call;
  }

  get priceOracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPriceOracleCall__Outputs {
  _call: SetPriceOracleCall;

  constructor(call: SetPriceOracleCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
