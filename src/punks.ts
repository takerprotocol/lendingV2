import { Address, BigInt, store, log } from "@graphprotocol/graph-ts";

import {
  Assign,
  PunkBought,
  PunkTransfer,
} from "../generated/CryptoPunks/CryptoPunks";
import { CryptoPunk, NftToken } from "../generated/schema";
import { WPUNK } from "./utils/consts";

export function handleAssign(event: Assign): void {
  let newOwner = event.params.to;
  let punkIndex = event.params.punkIndex;
  let punk = new CryptoPunk(newOwner.toHex() + "-" + punkIndex.toString());
  punk.punkIndex = punkIndex;
  punk.owner = newOwner;
  punk.save();
  log.info("[handleAssign]New punk minted {} {}", [punkIndex.toString(), newOwner.toHex()]);
}

export function handlePunkTransfer(event: PunkTransfer): void {
  let oldOwner = event.params.from;
  let newOwner = event.params.to;
  let punkIndex = event.params.punkIndex;
  let punk = new CryptoPunk(newOwner.toHex() + "-" + punkIndex.toString());
  punk.punkIndex = punkIndex;
  punk.owner = newOwner;
  punk.save();
  store.remove("CryptoPunk", oldOwner.toHex() + "-" + punkIndex.toString());

  // let wPunkId = newOwner.toHex() + "-" + WPUNK + "-" + punkIndex.toString();
  let wPunkId = WPUNK + "-" + punkIndex.toString();
  let wPunk = NftToken.load(wPunkId);
  if (wPunk) store.remove("NftToken", wPunkId);
}

export function handlePunkBought(event: PunkBought): void {
  let oldOwner = event.params.fromAddress;
  let newOwner = event.params.toAddress;
  let punkIndex = event.params.punkIndex;
  let punk = new CryptoPunk(newOwner.toHex() + "-" + punkIndex.toString());
  punk.punkIndex = punkIndex;
  punk.owner = newOwner;
  punk.save();
  store.remove("CryptoPunk", oldOwner.toHex() + "-" + punkIndex.toString());
}
