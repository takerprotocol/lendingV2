"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var close_svg_1 = require("assets/images/svg/common/close.svg");
// import RefreshIcon from 'assets/images/svg/common/refresh.svg'
var nullNft_icon_svg_1 = require("assets/images/svg/common/nullNft-icon.svg");
var NFTsList_1 = require("./NFTsList");
var Pager_1 = require("../../../components/Pages/Pager");
var AvailableAndDepositedSkeleton_1 = require("./depositSkeleton/AvailableAndDepositedSkeleton");
var react_1 = require("react");
var bignumber_js_1 = require("bignumber.js");
var NFTsSelectedModal_1 = require("./NFTsSelectedModal");
var SureModal_1 = require("./SureModal");
var hooks_1 = require("state/transactions/hooks");
var types_1 = require("state/transactions/types");
var styleds_1 = require("styleds");
var web3_utils_1 = require("web3-utils");
var utils_1 = require("utils");
var hooks_2 = require("state/application/hooks");
var react_router_dom_1 = require("react-router-dom");
var AvailableNFTsBox = material_1.styled(material_1.Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 1012px;\n  position: relative;\n  border-radius: 12px;\n  padding: 24px 0 0 24px;\n  margin-top: 24px;\n  margin-bottom: 42px;\n  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 33.61%);\n"], ["\n  width: 1012px;\n  position: relative;\n  border-radius: 12px;\n  padding: 24px 0 0 24px;\n  margin-top: 24px;\n  margin-bottom: 42px;\n  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 33.61%);\n"])));
var AvailableNFTsStyleBox = material_1.styled(material_1.Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
var FlexBox = material_1.styled(material_1.Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"])));
var DepositButtonBox = material_1.styled(material_1.Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  padding: 13px 22px;\n  width: 148px;\n  height: 48px;\n  border-radius: 24px;\n  background: #eff0f7;\n"], ["\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  padding: 13px 22px;\n  width: 148px;\n  height: 48px;\n  border-radius: 24px;\n  background: #eff0f7;\n"
    // const RefreshButtonBox = styled(Box)`
    //   display: flex;
    //   align-items: center;
    //   cursor: pointer;
    //   background: #eff0f7;
    //   width: 44px;
    //   height: 44px;
    //   border-radius: 100%;
    // `
])));
// const RefreshButtonBox = styled(Box)`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   background: #eff0f7;
//   width: 44px;
//   height: 44px;
//   border-radius: 100%;
// `
var XButtonBox = material_1.styled(material_1.Box)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  margin-right: 16px;\n  align-items: center;\n  cursor: pointer;\n  padding: 15px;\n  background: #eff0f7;\n  width: 44px;\n  height: 44px;\n  border-radius: 100%;\n"], ["\n  display: flex;\n  margin-right: 16px;\n  align-items: center;\n  cursor: pointer;\n  padding: 15px;\n  background: #eff0f7;\n  width: 44px;\n  height: 44px;\n  border-radius: 100%;\n"])));
var NullDepositBox = material_1.styled(styleds_1.CenterBox)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background: rgba(217, 219, 233, 0.3);\n  border-radius: 12px;\n  flex-direction: column;\n"], ["\n  background: rgba(217, 219, 233, 0.3);\n  border-radius: 12px;\n  flex-direction: column;\n"])));
function DepositNFT(_a) {
    var list = _a.list, loading = _a.loading, floorPrice = _a.floorPrice, checkedIndex = _a.checkedIndex, setCheckedIndex = _a.setCheckedIndex, setWithdrawCheckedIndex = _a.setWithdrawCheckedIndex;
    var _b = react_1.useState(false), openSelectedModal = _b[0], setOpenSelectedModal = _b[1];
    var _c = react_1.useState(false), openSureModal = _c[0], setOpenSureModal = _c[1];
    var _d = react_1.useState(1), pageType = _d[0], setPageType = _d[1]; //page
    var transactions = hooks_1.useAllTransactions();
    var collections = hooks_2.useCollections();
    var id = react_router_dom_1.useParams().id;
    var NftList = react_1.useMemo(function () {
        if (pageType === 1) {
            return list.slice(0, 9);
        }
        else {
            return list.slice(+utils_1.times(utils_1.minus(pageType, 1), 9), +utils_1.times(pageType, 9));
        }
    }, [list, pageType]);
    var flag = react_1.useMemo(function () {
        return Object.keys(transactions).filter(function (hash) {
            var tx = transactions[hash];
            return tx && tx.receipt && tx.info.type === types_1.TransactionType.DEPOSIT_NFT && hooks_1.isTransactionRecent(tx);
        }).length;
    }, [transactions]);
    var collection = react_1.useMemo(function () {
        if (collections && id) {
            return collections.find(function (el) { return el.id.toLocaleLowerCase() === id.toLocaleLowerCase(); });
        }
        else {
            return null;
        }
    }, [collections, id]);
    react_1.useEffect(function () {
        if (flag) {
            setOpenSelectedModal(false);
            setOpenSureModal(false);
            setCheckedIndex([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag]);
    // function ButtonDeposit() {
    //   if (withdrawType === 'shut') {
    //     setDepositType('open')
    //   }
    // }
    var Deposit = react_1.useState('Deposit')[0];
    var amount = react_1.useMemo(function () {
        return list.reduce(function (total) {
            return new bignumber_js_1["default"](total).plus(web3_utils_1.fromWei(floorPrice || '0')).toString();
        }, '0');
    }, [floorPrice, list]);
    return (React.createElement(AvailableNFTsStyleBox, { sx: {
        // opacity: `${withdrawType === 'open' ? '0.7' : '1'}`
        } },
        list.length === 0 ? (React.createElement(NullDepositBox, { my: "24px", py: '32px' },
            React.createElement("img", { src: nullNft_icon_svg_1["default"], alt: "" }),
            React.createElement(material_1.Typography, { mt: '16px', color: "#6E7191", variant: "subtitle2", fontWeight: "500" }, "You have no NFT to deposit to this collection"))) : (React.createElement(AvailableNFTsBox, null,
            loading ? (React.createElement(AvailableAndDepositedSkeleton_1["default"], null)) : (React.createElement(FlexBox, { height: '48px', sx: { marginBottom: '30px' } },
                React.createElement(material_1.Box, null,
                    React.createElement(material_1.Typography, { component: "span", variant: "h5", fontSize: " 24px", lineHeight: "38px" }, "You can deposit"),
                    React.createElement(material_1.Typography, { ml: '16px', component: "span", variant: "subtitle1", lineHeight: "18px", color: "#6E7191" },
                        list.length,
                        " NFTs / ",
                        utils_1.fixedFormat(amount),
                        " ETH")),
                React.createElement(material_1.Box, { mr: "24px" },
                    React.createElement(material_1.Box, null, checkedIndex.length !== 0 && (React.createElement(FlexBox, null,
                        React.createElement(XButtonBox, { onClick: function () {
                                // setOpenSureModal(true)
                                setCheckedIndex([]);
                            } },
                            React.createElement("img", { width: '14px', height: '14px', src: close_svg_1["default"], alt: "" })),
                        React.createElement(DepositButtonBox, { onClick: function () {
                                if (checkedIndex.length !== 0) {
                                    setOpenSelectedModal(true);
                                }
                            } },
                            React.createElement(material_1.Typography, { variant: "body1", component: "h1", fontWeight: "700", color: "#14142A" },
                                "Deposit ",
                                checkedIndex.length,
                                " NFTs")))))))),
            React.createElement(NFTsList_1["default"]
            // depositType={depositType}
            , { 
                // depositType={depositType}
                TypeKey: Deposit, loading: loading, setCheckedIndex: setWithdrawCheckedIndex, list: NftList, checked: checkedIndex, onChange: function (data) {
                    setCheckedIndex(data);
                } }),
            React.createElement(Pager_1["default"], { pageType: pageType, setPageType: setPageType, TypeKey: Deposit, list: list }))),
        openSelectedModal && (React.createElement(NFTsSelectedModal_1["default"], { type: Deposit, floorPrice: floorPrice, getWayFlag: collection && collection.name.indexOf('punks') > -1 ? 1 : 0, checkedIndex: checkedIndex, data: list.filter(function (el) { return checkedIndex.includes(el.tokenId); }), openSelectedModal: openSelectedModal, setOpenSelectedModal: setOpenSelectedModal })),
        React.createElement(SureModal_1["default"], { openSureModal: openSureModal, handle: function (type) {
                if (type === 'cancel') {
                    // setDepositType('shut')
                    setCheckedIndex([]);
                }
                setOpenSureModal(false);
            } })));
}
exports["default"] = DepositNFT;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
