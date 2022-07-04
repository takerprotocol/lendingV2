import {LendingPool, NftCollection} from "../generated/schema";
import {LendingPool as LendingPoolContract} from "../generated/LendingPool/LendingPool";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import {TToken} from "../generated/TToken/TToken";
import {DebtToken} from "../generated/DebtToken/DebtToken";
import {initLendingPool} from "./utils";


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