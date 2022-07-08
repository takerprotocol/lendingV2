// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Registry extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Registry entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Registry must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Registry", id.toString(), this);
    }
  }

  static load(id: string): Registry | null {
    return changetype<Registry | null>(store.get("Registry", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get lendingPools(): Array<string> {
    let value = this.get("lendingPools");
    return value!.toStringArray();
  }

  set lendingPools(value: Array<string>) {
    this.set("lendingPools", Value.fromStringArray(value));
  }
}

export class LendingPool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LendingPool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type LendingPool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LendingPool", id.toString(), this);
    }
  }

  static load(id: string): LendingPool | null {
    return changetype<LendingPool | null>(store.get("LendingPool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get addressProvider(): Bytes {
    let value = this.get("addressProvider");
    return value!.toBytes();
  }

  set addressProvider(value: Bytes) {
    this.set("addressProvider", Value.fromBytes(value));
  }

  get lendingPoolConfigurator(): Bytes {
    let value = this.get("lendingPoolConfigurator");
    return value!.toBytes();
  }

  set lendingPoolConfigurator(value: Bytes) {
    this.set("lendingPoolConfigurator", Value.fromBytes(value));
  }

  get poolAdmin(): Bytes {
    let value = this.get("poolAdmin");
    return value!.toBytes();
  }

  set poolAdmin(value: Bytes) {
    this.set("poolAdmin", Value.fromBytes(value));
  }

  get emergencyAdmin(): Bytes {
    let value = this.get("emergencyAdmin");
    return value!.toBytes();
  }

  set emergencyAdmin(value: Bytes) {
    this.set("emergencyAdmin", Value.fromBytes(value));
  }

  get priceOracle(): Bytes {
    let value = this.get("priceOracle");
    return value!.toBytes();
  }

  set priceOracle(value: Bytes) {
    this.set("priceOracle", Value.fromBytes(value));
  }

  get reserves(): Array<string> {
    let value = this.get("reserves");
    return value!.toStringArray();
  }

  set reserves(value: Array<string>) {
    this.set("reserves", Value.fromStringArray(value));
  }

  get nfts(): Array<string> {
    let value = this.get("nfts");
    return value!.toStringArray();
  }

  set nfts(value: Array<string>) {
    this.set("nfts", Value.fromStringArray(value));
  }
}

export class Reserve extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Reserve entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Reserve must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Reserve", id.toString(), this);
    }
  }

  static load(id: string): Reserve | null {
    return changetype<Reserve | null>(store.get("Reserve", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get configuration(): BigInt {
    let value = this.get("configuration");
    return value!.toBigInt();
  }

  set configuration(value: BigInt) {
    this.set("configuration", Value.fromBigInt(value));
  }

  get liquidityIndex(): BigInt {
    let value = this.get("liquidityIndex");
    return value!.toBigInt();
  }

  set liquidityIndex(value: BigInt) {
    this.set("liquidityIndex", Value.fromBigInt(value));
  }

  get debtIndex(): BigInt {
    let value = this.get("debtIndex");
    return value!.toBigInt();
  }

  set debtIndex(value: BigInt) {
    this.set("debtIndex", Value.fromBigInt(value));
  }

  get depositRate(): BigInt {
    let value = this.get("depositRate");
    return value!.toBigInt();
  }

  set depositRate(value: BigInt) {
    this.set("depositRate", Value.fromBigInt(value));
  }

  get borrowRate(): BigInt {
    let value = this.get("borrowRate");
    return value!.toBigInt();
  }

  set borrowRate(value: BigInt) {
    this.set("borrowRate", Value.fromBigInt(value));
  }

  get lastUpdateTimestamp(): BigInt {
    let value = this.get("lastUpdateTimestamp");
    return value!.toBigInt();
  }

  set lastUpdateTimestamp(value: BigInt) {
    this.set("lastUpdateTimestamp", Value.fromBigInt(value));
  }

  get tToken(): string {
    let value = this.get("tToken");
    return value!.toString();
  }

  set tToken(value: string) {
    this.set("tToken", Value.fromString(value));
  }

  get debtToken(): string {
    let value = this.get("debtToken");
    return value!.toString();
  }

  set debtToken(value: string) {
    this.set("debtToken", Value.fromString(value));
  }

  get interestRateCalculator(): Bytes {
    let value = this.get("interestRateCalculator");
    return value!.toBytes();
  }

  set interestRateCalculator(value: Bytes) {
    this.set("interestRateCalculator", Value.fromBytes(value));
  }

  get treasury(): Bytes {
    let value = this.get("treasury");
    return value!.toBytes();
  }

  set treasury(value: Bytes) {
    this.set("treasury", Value.fromBytes(value));
  }

  get reserveId(): BigInt {
    let value = this.get("reserveId");
    return value!.toBigInt();
  }

  set reserveId(value: BigInt) {
    this.set("reserveId", Value.fromBigInt(value));
  }

  get totalLiquidity(): BigInt {
    let value = this.get("totalLiquidity");
    return value!.toBigInt();
  }

  set totalLiquidity(value: BigInt) {
    this.set("totalLiquidity", Value.fromBigInt(value));
  }

  get totalDebt(): BigInt {
    let value = this.get("totalDebt");
    return value!.toBigInt();
  }

  set totalDebt(value: BigInt) {
    this.set("totalDebt", Value.fromBigInt(value));
  }

  get users(): Array<string> {
    let value = this.get("users");
    return value!.toStringArray();
  }

  set users(value: Array<string>) {
    this.set("users", Value.fromStringArray(value));
  }
}

export class NftCollection extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NftCollection entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NftCollection must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NftCollection", id.toString(), this);
    }
  }

  static load(id: string): NftCollection | null {
    return changetype<NftCollection | null>(store.get("NftCollection", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get configuration(): BigInt {
    let value = this.get("configuration");
    return value!.toBigInt();
  }

  set configuration(value: BigInt) {
    this.set("configuration", Value.fromBigInt(value));
  }

  get tNFT(): string {
    let value = this.get("tNFT");
    return value!.toString();
  }

  set tNFT(value: string) {
    this.set("tNFT", Value.fromString(value));
  }

  get ercType(): string {
    let value = this.get("ercType");
    return value!.toString();
  }

  set ercType(value: string) {
    this.set("ercType", Value.fromString(value));
  }

  get totalLiquidity(): BigInt {
    let value = this.get("totalLiquidity");
    return value!.toBigInt();
  }

  set totalLiquidity(value: BigInt) {
    this.set("totalLiquidity", Value.fromBigInt(value));
  }

  get floorPrice(): BigInt {
    let value = this.get("floorPrice");
    return value!.toBigInt();
  }

  set floorPrice(value: BigInt) {
    this.set("floorPrice", Value.fromBigInt(value));
  }

  get users(): Array<string> {
    let value = this.get("users");
    return value!.toStringArray();
  }

  set users(value: Array<string>) {
    this.set("users", Value.fromStringArray(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get reserveConfig(): BigInt {
    let value = this.get("reserveConfig");
    return value!.toBigInt();
  }

  set reserveConfig(value: BigInt) {
    this.set("reserveConfig", Value.fromBigInt(value));
  }

  get nftConfig(): BigInt {
    let value = this.get("nftConfig");
    return value!.toBigInt();
  }

  set nftConfig(value: BigInt) {
    this.set("nftConfig", Value.fromBigInt(value));
  }

  get reserves(): Array<string> {
    let value = this.get("reserves");
    return value!.toStringArray();
  }

  set reserves(value: Array<string>) {
    this.set("reserves", Value.fromStringArray(value));
  }

  get collections(): Array<string> {
    let value = this.get("collections");
    return value!.toStringArray();
  }

  set collections(value: Array<string>) {
    this.set("collections", Value.fromStringArray(value));
  }
}

export class UserReserve extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserReserve entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserReserve must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserReserve", id.toString(), this);
    }
  }

  static load(id: string): UserReserve | null {
    return changetype<UserReserve | null>(store.get("UserReserve", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get reserve(): string {
    let value = this.get("reserve");
    return value!.toString();
  }

  set reserve(value: string) {
    this.set("reserve", Value.fromString(value));
  }

  get depositedAmount(): BigInt {
    let value = this.get("depositedAmount");
    return value!.toBigInt();
  }

  set depositedAmount(value: BigInt) {
    this.set("depositedAmount", Value.fromBigInt(value));
  }

  get borrowedAmount(): BigInt {
    let value = this.get("borrowedAmount");
    return value!.toBigInt();
  }

  set borrowedAmount(value: BigInt) {
    this.set("borrowedAmount", Value.fromBigInt(value));
  }

  get usedAsCollateral(): boolean {
    let value = this.get("usedAsCollateral");
    return value!.toBoolean();
  }

  set usedAsCollateral(value: boolean) {
    this.set("usedAsCollateral", Value.fromBoolean(value));
  }
}

export class UserNftCollection extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserNftCollection entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserNftCollection must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserNftCollection", id.toString(), this);
    }
  }

  static load(id: string): UserNftCollection | null {
    return changetype<UserNftCollection | null>(
      store.get("UserNftCollection", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  set collection(value: string) {
    this.set("collection", Value.fromString(value));
  }

  get tokenIds(): Array<BigInt> {
    let value = this.get("tokenIds");
    return value!.toBigIntArray();
  }

  set tokenIds(value: Array<BigInt>) {
    this.set("tokenIds", Value.fromBigIntArray(value));
  }

  get amounts(): Array<BigInt> {
    let value = this.get("amounts");
    return value!.toBigIntArray();
  }

  set amounts(value: Array<BigInt>) {
    this.set("amounts", Value.fromBigIntArray(value));
  }
}

export class TToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TToken", id.toString(), this);
    }
  }

  static load(id: string): TToken | null {
    return changetype<TToken | null>(store.get("TToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get reserve(): string {
    let value = this.get("reserve");
    return value!.toString();
  }

  set reserve(value: string) {
    this.set("reserve", Value.fromString(value));
  }

  get incentivesController(): Bytes {
    let value = this.get("incentivesController");
    return value!.toBytes();
  }

  set incentivesController(value: Bytes) {
    this.set("incentivesController", Value.fromBytes(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }
}

export class DebtToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DebtToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DebtToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DebtToken", id.toString(), this);
    }
  }

  static load(id: string): DebtToken | null {
    return changetype<DebtToken | null>(store.get("DebtToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get reserve(): string {
    let value = this.get("reserve");
    return value!.toString();
  }

  set reserve(value: string) {
    this.set("reserve", Value.fromString(value));
  }

  get incentivesController(): Bytes {
    let value = this.get("incentivesController");
    return value!.toBytes();
  }

  set incentivesController(value: Bytes) {
    this.set("incentivesController", Value.fromBytes(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }
}

export class TNft extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TNft entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TNft must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TNft", id.toString(), this);
    }
  }

  static load(id: string): TNft | null {
    return changetype<TNft | null>(store.get("TNft", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get nftCollection(): string {
    let value = this.get("nftCollection");
    return value!.toString();
  }

  set nftCollection(value: string) {
    this.set("nftCollection", Value.fromString(value));
  }

  get incentivesController(): Bytes {
    let value = this.get("incentivesController");
    return value!.toBytes();
  }

  set incentivesController(value: Bytes) {
    this.set("incentivesController", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get ercType(): string {
    let value = this.get("ercType");
    return value!.toString();
  }

  set ercType(value: string) {
    this.set("ercType", Value.fromString(value));
  }
}
