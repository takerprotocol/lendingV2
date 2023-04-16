"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var styles_1 = require("@mui/material/styles");
var Box_1 = require("@mui/material/Box");
var DepositHeader_1 = require("pages/Deposit/components/DepositHeader");
var DepositNFT_1 = require("./components/DepositNFT");
var react_1 = require("react");
var WithdrawNFT_1 = require("./components/WithdrawNFT");
var deposit_1 = require("services/module/deposit");
var hooks_1 = require("state/user/hooks");
var react_router_dom_1 = require("react-router-dom");
// import { getAlchemyNftMetadata } from 'services/module/deposit'
var hooks_2 = require("state/application/hooks");
var MobileHeader_1 = require("./components/mobileComponents/MobileHeader");
var MobileDepositRoWithdraw_1 = require("./components/mobileComponents/MobileDepositRoWithdraw");
var MobileFooter_1 = require("./components/mobileComponents/MobileFooter");
var bignumber_js_1 = require("bignumber.js");
var useAlchemy_1 = require("hooks/useAlchemy");
var hooks_3 = require("state/transactions/hooks");
var types_1 = require("state/transactions/types");
var hooks_4 = require("state/hooks");
var reducer_1 = require("state/user/reducer");
var web3_1 = require("hooks/web3");
var client_1 = require("apollo/client");
var queries_1 = require("apollo/queries");
var config_1 = require("config");
var collection_1 = require("services/module/collection");
var growths = [
    '0x07875841846abb8fba50dbc64ab4b77cbb6b5ca1',
    '0x8c8f9db836049a7b11c561510d5b8318cccb6e0b',
    '0xdcb017b5b37cf40d4955c5df42964464b5b0ea36',
    '0x9a79bccd419c9604ce02645950e994b708553165',
];
var Body = styles_1.styled(Box_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-top: 233px;\n  width: 100%;\n  position: relative;\n"], ["\n  padding-top: 233px;\n  width: 100%;\n  position: relative;\n"])));
var Main = styles_1.styled(Box_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 1012px;\n  margin: 0 auto;\n"], ["\n  width: 1012px;\n  margin: 0 auto;\n"])));
var HeaderBg = styles_1.styled(Box_1["default"])(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -3;\n"], ["\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -3;\n"])));
var LadingHeaderBg = styles_1.styled(Box_1["default"])(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #eff0f5;\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -3;\n"], ["\n  background: #eff0f5;\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -3;\n"])));
var FilterBg = styles_1.styled(Box_1["default"])(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  backdrop-filter: blur(80px);\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -2;\n"], ["\n  backdrop-filter: blur(80px);\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -2;\n"])));
var OpacityBg = styles_1.styled(Box_1["default"])(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -1;\n"], ["\n  width: 100%;\n  height: 300px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: -1;\n"])));
var MobileBody = styles_1.styled(Box_1["default"])(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 100%;\n  background: #f7f7fc;\n"], ["\n  width: 100%;\n  background: #f7f7fc;\n"])));
var MobileMain = styles_1.styled(Box_1["default"])(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: 0rem 1rem 0rem 1rem;\n  position: relative;\n  margin-top: -10.1875rem;\n  width: 100%;\n"], ["\n  padding: 0rem 1rem 0rem 1rem;\n  position: relative;\n  margin-top: -10.1875rem;\n  width: 100%;\n"])));
var MobileHeaderBg = styles_1.styled(Box_1["default"])(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background-size: 42.5rem 42.5rem;\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 100%;\n  height: 14.0625rem;\n  z-index: -2;\n"], ["\n  background-size: 42.5rem 42.5rem;\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 100%;\n  height: 14.0625rem;\n  z-index: -2;\n"])));
var MobileBg = styles_1.styled(Box_1["default"])(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background: #eff0f5;\n  width: 100%;\n  height: 14.0625rem;\n  z-index: -2;\n"], ["\n  background: #eff0f5;\n  width: 100%;\n  height: 14.0625rem;\n  z-index: -2;\n"])));
var MobileFilterBg = styles_1.styled(Box_1["default"])(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  backdrop-filter: blur(30px);\n  width: 100%;\n  height: 14.0625rem;\n  z-index: -1;\n"], ["\n  backdrop-filter: blur(30px);\n  width: 100%;\n  height: 14.0625rem;\n  z-index: -1;\n"])));
function Deposit() {
    var _this = this;
    var id = react_router_dom_1.useParams().id;
    var chainId = web3_1.useActiveWeb3React().chainId;
    var alchemy = useAlchemy_1.useAlchemy();
    var address = hooks_1.useAddress();
    var showChangeNetWork = hooks_2.useShowChangeNetWork();
    var _a = react_1.useState([]), TestWithdrawList = _a[0], setWithdrawList = _a[1];
    var _b = react_1.useState([]), punks = _b[0], setPunks = _b[1];
    // const [depositType, setDepositType] = useState<string>('shut')
    // const [withdrawType, setWithdrawType] = useState<string>('shut')
    var _c = react_1.useState([]), depositCheckedIndex = _c[0], setDepositCheckedIndex = _c[1];
    var _d = react_1.useState([]), withdrawCheckedIndex = _d[0], setWithdrawCheckedIndex = _d[1];
    var mobile = hooks_1.useMobileType();
    var dispatch = hooks_4.useAppDispatch();
    var _e = react_1.useState(1), type = _e[0], setType = _e[1];
    var _f = react_1.useState([]), mobileWithdrawCheckedIndex = _f[0], setMobileWithdrawCheckedIndex = _f[1];
    var _g = react_1.useState([]), mobileDepositCheckedIndex = _g[0], setMobileDepositCheckedIndex = _g[1];
    var collections = hooks_2.useCollections();
    var depositedCollection = hooks_2.useDepositedCollection();
    var transactions = hooks_3.useAllTransactions();
    var _h = react_1.useState(null), client = _h[0], setClient = _h[1];
    var dashboardType = hooks_1.useDashboardType();
    var depositFlag = react_1.useMemo(function () {
        return Object.keys(transactions).filter(function (hash) {
            var tx = transactions[hash];
            return (tx &&
                tx.receipt &&
                (tx.info.type === types_1.TransactionType.DEPOSIT_NFT || tx.info.type === types_1.TransactionType.WITHDRAW_NFT) &&
                hooks_3.isTransactionRecent(tx));
        }).length;
    }, [transactions]);
    // useEffect(() => {
    //   window.location.reload()
    // }, [depositFlag])
    react_1.useEffect(function () {
        if (chainId) {
            setClient(client_1.getClient(dashboardType)[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 42]);
        }
    }, [chainId, dashboardType]);
    var _j = deposit_1.useDepositableNfts(address, id || '', id, depositFlag), list = _j.list, loading = _j.loading;
    var withdrawList = react_1.useMemo(function () {
        if (depositedCollection && id) {
            var collection_2 = depositedCollection.find(function (el) {
                return el.userNftCollection.id.split('-')[1].toLocaleLowerCase() === id.toLocaleLowerCase();
            });
            return collection_2 ? collection_2.userNftCollection.tokens : [];
        }
        return [];
    }, [depositedCollection, id]);
    var collection = react_1.useMemo(function () {
        if (collections && id) {
            return collections.find(function (el) { return el.id.toLocaleLowerCase() === id.toLocaleLowerCase(); });
        }
        else {
            return null;
        }
    }, [collections, id]);
    var mobileFlag = react_1.useMemo(function () {
        return Object.keys(transactions).filter(function (hash) {
            var tx = transactions[hash];
            return (tx &&
                tx.receipt &&
                (tx.info.type === types_1.TransactionType.DEPOSIT_NFT || tx.info.type === types_1.TransactionType.WITHDRAW_NFT) &&
                hooks_3.isTransactionRecent(tx));
        }).length;
    }, [transactions]);
    react_1.useEffect(function () {
        if (mobileFlag) {
            setMobileWithdrawCheckedIndex([]);
            setMobileDepositCheckedIndex([]);
        }
    }, [mobileFlag]);
    var withdrawAmount = react_1.useMemo(function () {
        var totalAmount = '0';
        mobileWithdrawCheckedIndex.forEach(function (el) {
            var checkedNft = withdrawList.find(function (nft) { return nft.id.split('-')[2] === el; });
            totalAmount = new bignumber_js_1["default"](checkedNft.amount).plus(totalAmount).toString();
        });
        return totalAmount;
    }, [mobileWithdrawCheckedIndex, withdrawList]);
    var borrowLimitUsed = hooks_1.useCollateralBorrowLimitUsed(withdrawAmount);
    var withdrawLargeAmount = react_1.useMemo(function () {
        return new bignumber_js_1["default"](borrowLimitUsed).gte(1);
    }, [borrowLimitUsed]);
    var getWithdrawList = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var arrTokenId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(alchemy && id && withdrawList && withdrawList.length > 0)) return [3 /*break*/, 2];
                    arrTokenId = withdrawList.map(function (el) { return (el.id ? el.id.split('-')[2] : el.tokenId); });
                    return [4 /*yield*/, collection_1.getMultipleTokenId(id, arrTokenId).then(function (req) {
                            setWithdrawList(req);
                        })
                        // for (let i = 0, length = withdrawList.length; i < length; i++) {
                        //   if (withdrawList[i].id) {
                        //     const nft = await getAlchemyNftMetadata(
                        //       withdrawList[i].id.split('-')[1],
                        //       withdrawList[i].id.split('-')[2],
                        //       alchemy
                        //     )
                        //   } else {
                        //     const nft = await getAlchemyNftMetadata(withdrawList[i].contract.address, withdrawList[i].tokenId, alchemy)
                        //     arr.push(nft)
                        //   }
                        //   arr.push(nft)
                        // }
                    ];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [alchemy, id, withdrawList]);
    react_1.useEffect(function () {
        getWithdrawList();
    }, [getWithdrawList, mobileFlag]);
    react_1.useEffect(function () {
        if (id) {
            dispatch(reducer_1.setDashboardType(growths.some(function (el) { return el.toLocaleLowerCase() === id.toLocaleLowerCase(); }) ? 2 : 1));
        }
    }, [dispatch, id]);
    var getPunkNft = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, arr_1, arrTokenId, i, length;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(collection && client && collection.name && collection.name.toLocaleLowerCase().indexOf('punks') > -1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.query({
                            query: queries_1.UserPunkNft("" + address)
                        })
                        // const arr: Array<Nft> = []
                    ];
                case 1:
                    res = _a.sent();
                    arr_1 = [];
                    arrTokenId = [];
                    for (i = 0, length = res.data.cryptoPunks.length; i < length; i++) {
                        arrTokenId.push(res.data.cryptoPunks[i].punkIndex);
                    }
                    return [4 /*yield*/, collection_1.getMultipleTokenId(config_1.PUNKS_ADDRESS, arrTokenId).then(function (req) {
                            arr_1 = req;
                        })
                        // if (res && res.data && res.data.cryptoPunks && alchemy) {
                        //   for (let i = 0, length = res.data.cryptoPunks.length; i < length; i++) {
                        //     const nft = await getAlchemyNftMetadata(PUNKS_ADDRESS, res.data.cryptoPunks[i].punkIndex, alchemy)
                        //     arr.push(nft)
                        //   }
                        // }
                    ];
                case 2:
                    _a.sent();
                    // if (res && res.data && res.data.cryptoPunks && alchemy) {
                    //   for (let i = 0, length = res.data.cryptoPunks.length; i < length; i++) {
                    //     const nft = await getAlchemyNftMetadata(PUNKS_ADDRESS, res.data.cryptoPunks[i].punkIndex, alchemy)
                    //     arr.push(nft)
                    //   }
                    // }
                    setPunks(arr_1);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [address, client, collection]);
    react_1.useEffect(function () {
        getPunkNft();
    }, [getPunkNft, depositFlag]);
    return (React.createElement(React.Fragment, null, mobile ? (React.createElement(Body, { sx: { marginTop: showChangeNetWork ? '48px' : '0' } },
        loading ? (React.createElement(LadingHeaderBg, { top: showChangeNetWork ? '48px' : '0' })) : (React.createElement(React.Fragment, null,
            React.createElement(HeaderBg, { top: showChangeNetWork ? '48px' : '0', sx: { backgroundImage: "url(" + (collection === null || collection === void 0 ? void 0 : collection.icon) + ")" } }),
            React.createElement(FilterBg, { top: showChangeNetWork ? '48px' : '0' }),
            React.createElement(OpacityBg, { top: showChangeNetWork ? '48px' : '0' }))),
        React.createElement(Main, null,
            React.createElement(DepositHeader_1["default"], { loading: loading }),
            React.createElement(DepositNFT_1["default"], { loading: loading, list: collection && collection.name && collection.name.toLocaleLowerCase().indexOf('punks') > -1
                    ? punks
                    : list, floorPrice: collection ? collection.floorPrice : '0', checkedIndex: depositCheckedIndex, setCheckedIndex: setDepositCheckedIndex, setWithdrawCheckedIndex: setWithdrawCheckedIndex }),
            React.createElement(WithdrawNFT_1["default"], { loading: loading, tNFT: collection ? collection.tNFT : '', list: collection && collection.name && collection.name.toLocaleLowerCase().indexOf('punks') > -1
                    ? withdrawList.filter(function (el) { return !punks.some(function (pel) { return pel.tokenId === el.id.split('-')[2]; }); })
                    : withdrawList, TestWithdrawList: TestWithdrawList, getWayFlag: collection && collection.name.indexOf('punks') > -1 ? 1 : 0, floorPrice: collection ? collection.floorPrice : '0', checkedIndex: withdrawCheckedIndex, setDepositCheckedIndex: setDepositCheckedIndex, setCheckedIndex: setWithdrawCheckedIndex })))) : (React.createElement(MobileBody, { pt: showChangeNetWork ? '7.1875rem' : '3.125rem', pb: mobileWithdrawCheckedIndex.length !== 0 || mobileDepositCheckedIndex.length !== 0 ? '7.5625rem' : '1.25rem' },
        loading ? (React.createElement(MobileBg, null)) : (React.createElement(MobileHeaderBg, { sx: { backgroundImage: "url(" + (collection === null || collection === void 0 ? void 0 : collection.icon) + ")" } },
            React.createElement(MobileFilterBg, null))),
        React.createElement(MobileMain, null,
            React.createElement(MobileHeader_1["default"], { loading: loading }),
            React.createElement(MobileDepositRoWithdraw_1["default"], { loading: loading, depositedList: list, withdrawList: withdrawList, floorPrice: collection ? collection.floorPrice : '0', type: type, setType: setType, TestWithdrawList: TestWithdrawList, mobileWithdrawCheckedIndex: mobileWithdrawCheckedIndex, mobileDepositCheckedIndex: mobileDepositCheckedIndex, setMobileWithdrawCheckedIndex: setMobileWithdrawCheckedIndex, setMobileDepositCheckedIndex: setMobileDepositCheckedIndex })),
        !loading && (React.createElement(MobileFooter_1["default"], { mobileWithdrawCheckedIndex: mobileWithdrawCheckedIndex, mobileDepositCheckedIndex: mobileDepositCheckedIndex, depositedList: list, floorPrice: collection ? collection.floorPrice : '0', TestWithdrawList: TestWithdrawList, withdrawAmount: withdrawAmount, setMobileWithdrawCheckedIndex: setMobileWithdrawCheckedIndex, setMobileDepositCheckedIndex: setMobileDepositCheckedIndex, withdrawLargeAmount: withdrawLargeAmount, withdrawList: withdrawList, type: type }))))));
}
exports["default"] = Deposit;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
