import {NftReserveInitialized, ReserveInitialized} from "../generated/PoolConfigurator/PoolConfigurator";
import {Address, BigInt, ethereum, Value} from "@graphprotocol/graph-ts";
import { newMockEvent, describe, test, afterAll, clearStore } from "matchstick-as/assembly/index"
import {assert } from "matchstick-as";
import {
    addNft,
    handleDeposited,
    handleNftReserveInitialized,
    handleNFTsDeposited,
    handleReserveInitialized,
} from "../src/lending-pool";
import {Deposited, NFTsDeposited} from "../generated/LendingPool/LendingPool";
import {User, UserNftCollection, UserReserve} from "../generated/schema";
import {newUserNftCollection} from "../src/utils";

export function createReserveInitializedEvent(
    asset: string,
    tToken: string,
    debtToken: string,
    interestRateStrategyAddress: string,
    liqThreshold: i32,
    ltv: i32
): ReserveInitialized {
    let event = changetype<ReserveInitialized>(newMockEvent());

    // LendingPool address
    event.address = Address.fromString("0x68172cAc7A9c00C972f27E279A5d47424d84a731");

    event.parameters = new Array();
    let _asset = new ethereum.EventParam("asset", ethereum.Value.fromAddress(Address.fromString(asset)));
    let _tToken = new ethereum.EventParam("tToken", ethereum.Value.fromAddress(Address.fromString(tToken)));
    let _debtToken = new ethereum.EventParam("debtToken", ethereum.Value.fromAddress(Address.fromString(debtToken)));
    let _interestRateStrategyAddress = new ethereum.EventParam("interestRateStrategyAddress", ethereum.Value.fromAddress(Address.fromString(interestRateStrategyAddress)));
    let _liqThreshold = new ethereum.EventParam("liqThreshold", ethereum.Value.fromI32(liqThreshold));
    let _ltv = new ethereum.EventParam("ltv", ethereum.Value.fromI32(ltv));

    event.parameters.push(_asset);
    event.parameters.push(_tToken);
    event.parameters.push(_debtToken);
    event.parameters.push(_interestRateStrategyAddress);
    event.parameters.push(_liqThreshold);
    event.parameters.push(_ltv);

    return event;
}

export function createNftReserveInitializedEvent(
    asset: string,
    tNft: string,
    tokenType: i32,
    liqThreshold: i32,
    ltv: i32
): NftReserveInitialized {
    let event = changetype<NftReserveInitialized>(newMockEvent());

    // LendingPool address
    event.address = Address.fromString("0x68172cAc7A9c00C972f27E279A5d47424d84a731");

    event.parameters = new Array();
    let _asset = new ethereum.EventParam("asset", ethereum.Value.fromAddress(Address.fromString(asset)));
    let _tNft = new ethereum.EventParam("tNft", ethereum.Value.fromAddress(Address.fromString(tNft)));
    let _tokenType = new ethereum.EventParam("tokenType", ethereum.Value.fromI32(tokenType));
    let _liqThreshold = new ethereum.EventParam("liqThreshold", ethereum.Value.fromI32(liqThreshold));
    let _ltv = new ethereum.EventParam("ltv", ethereum.Value.fromI32(ltv));

    event.parameters.push(_asset);
    event.parameters.push(_tNft);
    event.parameters.push(_tokenType);
    event.parameters.push(_liqThreshold);
    event.parameters.push(_ltv);

    return event;
}

export function createDepositedEvent(
    asset: string,
    user: string,
    to: string,
    amount: i32
): Deposited {
    let event = changetype<Deposited>(newMockEvent());

    // LendingPool address
    event.address = Address.fromString("0x68172cAc7A9c00C972f27E279A5d47424d84a731");

    event.parameters = new Array();
    let _asset = new ethereum.EventParam("asset", ethereum.Value.fromAddress(Address.fromString(asset)));
    let _user = new ethereum.EventParam("user", ethereum.Value.fromAddress(Address.fromString(user)));
    let _to = new ethereum.EventParam("to", ethereum.Value.fromAddress(Address.fromString(to)));
    let _amount = new ethereum.EventParam("amount", ethereum.Value.fromI32(amount));

    event.parameters.push(_asset);
    event.parameters.push(_user);
    event.parameters.push(_to);
    event.parameters.push(_amount);

    return event;
}

export function createNftsDepositedEvent(
    nfts: string[],
    user: string,
    onBehalfOf: string,
    tokenIds: i32[],
    amounts: i32[]
): NFTsDeposited {
    let event = changetype<NFTsDeposited>(newMockEvent());

    // LendingPool address
    event.address = Address.fromString("0x68172cAc7A9c00C972f27E279A5d47424d84a731");

    event.parameters = new Array();
    let _user = new ethereum.EventParam("user", ethereum.Value.fromAddress(Address.fromString(user)));
    let _onBehalfOf = new ethereum.EventParam("onBehalfOf", ethereum.Value.fromAddress(Address.fromString(onBehalfOf)));
    let _nftsAddrArr = nfts.map<Address>(nft => Address.fromString(nft));
    let _nfts = new ethereum.EventParam("nfts", ethereum.Value.fromAddressArray(_nftsAddrArr));
    let _tokenIds = new ethereum.EventParam("tokenIds", ethereum.Value.fromI32Array(tokenIds));
    let _amounts = new ethereum.EventParam("tokenIds", ethereum.Value.fromI32Array(amounts));

    event.parameters.push(_user);
    event.parameters.push(_onBehalfOf);
    event.parameters.push(_nfts);
    event.parameters.push(_tokenIds);
    event.parameters.push(_amounts);

    return event;
}


describe("New reserve and NftCollection initialized", () => {

    test("Can handle ReserveInitialized", () => {
        let event = createReserveInitializedEvent(
            "0xC7FE0Ff4084b9c85618F8598fa95990Fe68e29F3",
            "0x5CeB7116100fBAF2AEA73Bf964eD435f7D816c37 ",
            "0x7f25793D04586Eeec731b31B38A6e887Ee3619c7",
            "0xa06481B39b67AfF6b472E144c3F5AD4D45461933",
            7777,
            5555
        );
        handleReserveInitialized(event);
        assert.fieldEquals(
            "Reserve",
            "0xC7FE0Ff4084b9c85618F8598fa95990Fe68e29F3".toLowerCase(),
            "tToken",
            "0x5CeB7116100fBAF2AEA73Bf964eD435f7D816c37".toLowerCase()
        );
        assert.entityCount("LendingPool", 1);
    })

    test("Can handle NftReserveInitialized", () => {
        let event = createNftReserveInitializedEvent(
            "0x5CeB7116100fBAF2AEA73Bf964eD435f7D816c37",
            "0x68af79b26DB5dC7b40F2d92678D5418267f879e5",
            1,
            9000,
            6000
        );
        handleNftReserveInitialized(event);
        assert.fieldEquals(
            "NftCollection",
            "0x5CeB7116100fBAF2AEA73Bf964eD435f7D816c37".toLowerCase(),
            "tNFT",
            "0x68af79b26DB5dC7b40F2d92678D5418267f879e5".toLowerCase()
        );
        assert.entityCount("LendingPool", 1);
    })


    test("Can handle Deposited", () => {
        let event = createDepositedEvent(
            "0xC7FE0Ff4084b9c85618F8598fa95990Fe68e29F3",
            "0x388a519241457b90e1349e342dCA1Fb093B50378",
            "0x388a519241457b90e1349e342dCA1Fb093B50378",
            11111,
        );
        handleDeposited(event);
        assert.fieldEquals(
            "UserReserve",
            "0x388a519241457b90e1349e342dCA1Fb093B50378".toLowerCase() + "-" + "0xC7FE0Ff4084b9c85618F8598fa95990Fe68e29F3".toLowerCase(),
            "user",
            "0x388a519241457b90e1349e342dCA1Fb093B50378".toLowerCase()
        );
        assert.entityCount("User", 1);
    })

    test("Can handle NftsDeposited", () => {
        let event = createNftsDepositedEvent(
            ["0xc023600dd707860f6521e1d5cb02c66ca90996aa"],
            "0x388a519241457b90e1349e342dCA1Fb093B50378",
            "0x388a519241457b90e1349e342dCA1Fb093B50378",
            [1],
            [1]
        );
        handleNFTsDeposited(event);
        assert.fieldEquals(
            "UserNftCollection",
            "0x388a519241457b90e1349e342dCA1Fb093B50378".toLowerCase() + "-" + "0xc023600dd707860f6521e1d5cb02c66ca90996aa".toLowerCase(),
            "user",
            "0x388a519241457b90e1349e342dCA1Fb093B50378".toLowerCase()
        );
        assert.entityCount("User", 1);
    })

    test("nftDeposited works", () => {
        const id = "0x388a519241457b90e1349e342dCA1Fb093B50378".toLowerCase() + "-" + "0xc023600dd707860f6521e1d5cb02c66ca90996aa".toLowerCase();
        let userNftCollection = newUserNftCollection(id);
        addNft(userNftCollection, BigInt.fromI32(1), BigInt.fromI32(1));
        assert.fieldEquals("NftToken", id + '-' + "1", "amount", "1");

    })
})

