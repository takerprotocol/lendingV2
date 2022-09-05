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

  get tToken(): Bytes {
    let value = this.get("tToken");
    return value!.toBytes();
  }

  set tToken(value: Bytes) {
    this.set("tToken", Value.fromBytes(value));
  }

  get debtToken(): Bytes {
    let value = this.get("debtToken");
    return value!.toBytes();
  }

  set debtToken(value: Bytes) {
    this.set("debtToken", Value.fromBytes(value));
  }

  get interestRateCalculator(): Bytes {
    let value = this.get("interestRateCalculator");
    return value!.toBytes();
  }

  set interestRateCalculator(value: Bytes) {
    this.set("interestRateCalculator", Value.fromBytes(value));
  }

  get liqThreshold(): BigInt {
    let value = this.get("liqThreshold");
    return value!.toBigInt();
  }

  set liqThreshold(value: BigInt) {
    this.set("liqThreshold", Value.fromBigInt(value));
  }

  get ltv(): BigInt {
    let value = this.get("ltv");
    return value!.toBigInt();
  }

  set ltv(value: BigInt) {
    this.set("ltv", Value.fromBigInt(value));
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

  get tNFT(): Bytes {
    let value = this.get("tNFT");
    return value!.toBytes();
  }

  set tNFT(value: Bytes) {
    this.set("tNFT", Value.fromBytes(value));
  }

  get ercType(): BigInt {
    let value = this.get("ercType");
    return value!.toBigInt();
  }

  set ercType(value: BigInt) {
    this.set("ercType", Value.fromBigInt(value));
  }

  get liqThreshold(): BigInt {
    let value = this.get("liqThreshold");
    return value!.toBigInt();
  }

  set liqThreshold(value: BigInt) {
    this.set("liqThreshold", Value.fromBigInt(value));
  }

  get ltv(): BigInt {
    let value = this.get("ltv");
    return value!.toBigInt();
  }

  set ltv(value: BigInt) {
    this.set("ltv", Value.fromBigInt(value));
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

  get nftCollateral(): BigInt {
    let value = this.get("nftCollateral");
    return value!.toBigInt();
  }

  set nftCollateral(value: BigInt) {
    this.set("nftCollateral", Value.fromBigInt(value));
  }

  get reserveSupply(): BigInt {
    let value = this.get("reserveSupply");
    return value!.toBigInt();
  }

  set reserveSupply(value: BigInt) {
    this.set("reserveSupply", Value.fromBigInt(value));
  }

  get totalDebt(): BigInt {
    let value = this.get("totalDebt");
    return value!.toBigInt();
  }

  set totalDebt(value: BigInt) {
    this.set("totalDebt", Value.fromBigInt(value));
  }

  get avgLtv(): BigInt {
    let value = this.get("avgLtv");
    return value!.toBigInt();
  }

  set avgLtv(value: BigInt) {
    this.set("avgLtv", Value.fromBigInt(value));
  }

  get liqThreshold(): BigInt {
    let value = this.get("liqThreshold");
    return value!.toBigInt();
  }

  set liqThreshold(value: BigInt) {
    this.set("liqThreshold", Value.fromBigInt(value));
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

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }
}

export class NftToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NftToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NftToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NftToken", id.toString(), this);
    }
  }

  static load(id: string): NftToken | null {
    return changetype<NftToken | null>(store.get("NftToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get userCollection(): string {
    let value = this.get("userCollection");
    return value!.toString();
  }

  set userCollection(value: string) {
    this.set("userCollection", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}