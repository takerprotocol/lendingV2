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
exports.FlexEndBox = void 0;
var styled_1 = require("@emotion/styled");
var material_1 = require("@mui/material");
var myCollateral_icon_svg_1 = require("assets/images/svg/dashboard/myCollateral-icon.svg");
var addIcon_svg_1 = require("assets/images/svg/common/addIcon.svg");
var rightIcon_svg_1 = require("assets/images/svg/common/rightIcon.svg");
var DepositHeaderSkeleton_1 = require("./depositSkeleton/DepositHeaderSkeleton");
var hooks_1 = require("state/user/hooks");
var hooks_2 = require("state/application/hooks");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("utils");
var useLendingPool_1 = require("hooks/useLendingPool");
var web3_1 = require("hooks/web3");
var client_1 = require("apollo/client");
var queries_1 = require("apollo/queries");
// import { percent } from 'utils'
var HeaderBox = styled_1["default"](material_1.Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 1012px;\n  padding: 24px;\n  background: #ffffff;\n  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);\n  border-radius: 12px;\n"], ["\n  width: 1012px;\n  padding: 24px;\n  background: #ffffff;\n  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);\n  border-radius: 12px;\n"])));
var FlexBox = styled_1["default"](material_1.Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n"])));
var FlexBoxBetween = styled_1["default"](FlexBox)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  justify-content: space-between;\n"], ["\n  justify-content: space-between;\n"])));
var BgFlexBox = styled_1["default"](material_1.Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 24px;\n  border-radius: 100%;\n  height: 24px;\n  background: #eff0f6;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  img {\n    height: 24px;\n    width: 24px;\n  }\n"], ["\n  width: 24px;\n  border-radius: 100%;\n  height: 24px;\n  background: #eff0f6;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  img {\n    height: 24px;\n    width: 24px;\n  }\n"])));
var BigTypography = styled_1["default"](material_1.Typography)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 24px;\n  font-weight: 600;\n  line-height: 38px;\n  color: #4e4b66;\n"], ["\n  font-size: 24px;\n  font-weight: 600;\n  line-height: 38px;\n  color: #4e4b66;\n"])));
var SmallTypography = styled_1["default"](material_1.Typography)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 14px;\n  color: #4e4b66;\n"], ["\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 14px;\n  color: #4e4b66;\n"])));
var TokenTypography = styled_1["default"](material_1.Typography)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 22px;\n  color: #4e4b66;\n"], ["\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 22px;\n  color: #4e4b66;\n"])));
var ImagesBox = styled_1["default"](material_1.Box)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background: #ffffff;\n  width: 6px;\n  border: 1px solid #d9dbe9;\n  border-radius: 0 6px 6px 0;\n  border-left: 0;\n"], ["\n  background: #ffffff;\n  width: 6px;\n  border: 1px solid #d9dbe9;\n  border-radius: 0 6px 6px 0;\n  border-left: 0;\n"])));
var LeftFlexBox = styled_1["default"](material_1.Box)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background: #f7f7fc;\n  border-radius: 10px;\n  padding: 24px 18px 24px 50px;\n"], ["\n  background: #f7f7fc;\n  border-radius: 10px;\n  padding: 24px 18px 24px 50px;\n"])));
var RightFlexBox = styled_1["default"](material_1.Box)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background: #f7f7fc;\n  border-radius: 10px;\n  padding: 24px 83px 24px 74px;\n"], ["\n  background: #f7f7fc;\n  border-radius: 10px;\n  padding: 24px 83px 24px 74px;\n"])));
var ImgBox = styled_1["default"]('img')(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  width: 124px;\n  height: 124px;\n  display: block;\n  border-radius: 10px;\n"], ["\n  width: 124px;\n  height: 124px;\n  display: block;\n  border-radius: 10px;\n"])));
exports.FlexEndBox = styled_1["default"](material_1.Box)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: flex;\n  align-items: flex-start;\n  padding-top: 14px;\n"], ["\n  display: flex;\n  align-items: flex-start;\n  padding-top: 14px;\n"])));
function DepositHeader(_a) {
    var _this = this;
    var loading = _a.loading;
    var chainId = web3_1.useActiveWeb3React().chainId;
    var collections = hooks_2.useCollections();
    var decimal = hooks_1.useDecimal();
    var _b = react_1.useState(''), totalValue = _b[0], setTotalValue = _b[1];
    var erc20ReserveData = hooks_1.useErc20ReserveData();
    var _c = react_1.useState(0), total = _c[0], setTotal = _c[1];
    var id = react_router_dom_1.useParams().id;
    var contract = useLendingPool_1.useLendingPool();
    var _d = react_1.useState(null), client = _d[0], setClient = _d[1];
    var dashboardType = hooks_1.useDashboardType();
    react_1.useEffect(function () {
        if (chainId) {
            setClient(client_1.getClient(dashboardType)[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5]);
        }
    }, [chainId, dashboardType]);
    var collection = react_1.useMemo(function () {
        if (collections && id) {
            return collections.find(function (el) { return el.id.toLocaleLowerCase() === id.toLocaleLowerCase(); });
        }
        else {
            return null;
        }
    }, [collections, id]);
    console.log(collections, 'collection');
    console.log(id, 'collection');
    react_1.useEffect(function () {
        if (contract && id) {
            contract.getAssetValues(id).then(function (res) {
                setTotalValue(utils_1.decimalFormat(res[0].toString(), decimal));
            });
        }
    }, [contract, decimal, id]);
    var getCollection = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, count_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(client && id)) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.query({
                            query: queries_1.NftCollection(id)
                        })];
                case 1:
                    res = _a.sent();
                    count_1 = 0;
                    if (res && res.data && res.data.nftCollection && res.data.nftCollection.users) {
                        res.data.nftCollection.users.forEach(function (element) {
                            count_1 = count_1 + element.tokens.length;
                        });
                    }
                    setTotal(count_1);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [client, id]);
    react_1.useEffect(function () {
        getCollection();
    }, [getCollection, dashboardType]);
    return (React.createElement(material_1.Box, null, loading ? (React.createElement(DepositHeaderSkeleton_1["default"], null)) : (React.createElement(HeaderBox, null,
        React.createElement(FlexBox, null,
            React.createElement(FlexBox, null,
                React.createElement(ImgBox, { src: collection === null || collection === void 0 ? void 0 : collection.icon, alt: "" }),
                React.createElement(ImagesBox, { height: "110px" }),
                React.createElement(ImagesBox, { height: "100px" })),
            React.createElement(material_1.Box, { ml: "12px", width: "272px" },
                React.createElement(material_1.Typography, { component: "p", variant: "h1", fontWeight: "700", fontSize: " 24px", lineHeight: "29px" }, collection === null || collection === void 0 ? void 0 : collection.name),
                React.createElement(material_1.Typography, { mt: "12px", variant: "subtitle2", fontWeight: "500", lineHeight: "16px", color: "#A0A3BD" },
                    total || 0,
                    " NFTS")),
            React.createElement(exports.FlexEndBox, null,
                React.createElement(material_1.Box, { width: "198px" },
                    React.createElement(SmallTypography, { color: "#4E4B66 !important" }, "Total Value Locked"),
                    React.createElement(FlexBox, { mt: "8px" },
                        React.createElement("img", { "margin-top": "15px", src: myCollateral_icon_svg_1["default"], alt: "" }),
                        React.createElement(BigTypography, { ml: "4px", variant: "body1" }, totalValue || 0))),
                React.createElement(material_1.Box, { width: "148px" },
                    React.createElement(SmallTypography, null, "Floor Price"),
                    React.createElement(material_1.Box, { mt: "8px" },
                        React.createElement(FlexBox, null,
                            React.createElement("img", { src: myCollateral_icon_svg_1["default"], alt: "" }),
                            React.createElement(BigTypography, { ml: "4px", variant: "body1" }, utils_1.decimalFormat((collection === null || collection === void 0 ? void 0 : collection.floorPrice) || 0, decimal))),
                        React.createElement(material_1.Box, { height: '22px' }))),
                React.createElement(material_1.Box, { width: "198px" },
                    React.createElement(SmallTypography, null, "Loan to Value"),
                    React.createElement(FlexBox, { mt: "8px" },
                        React.createElement("img", { src: myCollateral_icon_svg_1["default"], alt: "" }),
                        React.createElement(BigTypography, { ml: "4px", variant: "body1" },
                            utils_1.div(collection === null || collection === void 0 ? void 0 : collection.ltv, 100),
                            "%"),
                        React.createElement(material_1.Typography, { mt: "4px", variant: "subtitle1", marginLeft: "8px", lineHeight: "18px", color: "#A0A3BD" },
                            "\u039E ",
                            utils_1.decimalFormat(utils_1.times((collection === null || collection === void 0 ? void 0 : collection.floorPrice) || 0, utils_1.div(collection === null || collection === void 0 ? void 0 : collection.ltv, 10000)), decimal)))))),
        React.createElement(FlexBoxBetween, { mt: '24px' },
            React.createElement(LeftFlexBox, null,
                React.createElement(FlexBox, null,
                    React.createElement(material_1.Box, { width: '86px' },
                        React.createElement(BigTypography, { color: "#4BC8B1 !important" }, "0%")),
                    React.createElement(material_1.Box, { sx: { width: '62px' } },
                        React.createElement(BgFlexBox, null,
                            React.createElement("img", { "margin-left": "20px", src: addIcon_svg_1["default"], alt: "" }))),
                    React.createElement(material_1.Box, { width: '86px' },
                        React.createElement(BigTypography, { variant: "h1", color: "#6E7191 !important" },
                            erc20ReserveData.borrowRate,
                            "%")),
                    React.createElement(material_1.Box, { width: "60px" },
                        React.createElement(BgFlexBox, null,
                            React.createElement("img", { src: rightIcon_svg_1["default"], alt: "" }))),
                    React.createElement(material_1.Box, null,
                        React.createElement(BigTypography, null,
                            erc20ReserveData.borrowRate,
                            "%"))),
                React.createElement(FlexBox, { mt: "4px" },
                    React.createElement(material_1.Box, { width: "149px" },
                        React.createElement(TokenTypography, { color: "#A0A3BD !important" }, "Token Reward")),
                    React.createElement(material_1.Box, { width: "147px" },
                        React.createElement(TokenTypography, { color: "#A0A3BD !important" }, "Borrow APY")),
                    React.createElement(material_1.Box, null,
                        React.createElement(TokenTypography, null, "Net Borrow APY")))),
            React.createElement(RightFlexBox, null,
                React.createElement(FlexBox, null,
                    React.createElement(material_1.Box, { width: '198px' },
                        React.createElement(BigTypography, null,
                            " ",
                            utils_1.div(collection === null || collection === void 0 ? void 0 : collection.liqThreshold, 100),
                            "%"),
                        React.createElement(TokenTypography, { mt: "4px", color: "#A0A3BD !important" }, "Liquidation Threshold")))))))));
}
exports["default"] = DepositHeader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
