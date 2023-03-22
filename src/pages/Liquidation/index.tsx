import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import liquidationBg from 'assets/images/png/liquidation/liquidation-icon.png'
import mobileLiquidationBg from 'assets/images/svg/liquidation/mobileLiquidation-bg.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getClient } from 'apollo/client'
import { AllUser } from 'apollo/queries'
import {
  useAddress,
  useCollateralsType,
  // useCollateralsType,
  useDashboardType,
  useLoginWalletType,
  useMobileMenuType,
  useMobileType,
} from 'state/user/hooks'
import { useCollections, useShowChangeNetWork } from 'state/application/hooks'
import { CollateralModel, LiquidationNftModel } from 'services/type/nft'
import { getRiskLevel, getRiskLevelTag, times } from 'utils'
import MobileHeader from './components/mobileLiquidation/MobileHeader'
import MobileCollateral from './components/mobileLiquidation/MobileCollateral'
// import { WETH } from 'config'
import { fromWei } from 'web3-utils'
import { useActiveWeb3React } from 'hooks/web3'
import { Typography } from '@mui/material'
import { setLoginWalletType } from 'state/user/reducer'
import MobileMenu from 'components/Header/components/MobileMenu'
import WalletMessage from 'components/Header/components/WalletMessage'
import WalletModal from 'components/WalletModal'
import { useAppDispatch } from 'state/hooks'
import MobileCollateralSkeleton from './components/MobileLiquidationSkeleton/MobileCollateralSkeleton'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import { toWei } from 'web3-utils'
import numbro from 'numbro'
import { getAlchemyNftMetadata } from 'services/module/deposit'
import { useAlchemy } from 'hooks/useAlchemy'
let graphLoading = false
// import Collection6 from '../../assets/images/png/liquidation/example/6.png'
const Body = styled(Box)`
  background-color: #f7f7fc;
  width: 100%;
  z-index: -1;
  padding-bottom: 363px;
`
const BodyBg = styled(Box)`
  background-image: url(${liquidationBg});
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 66.11319444444445vw;
  height: 66.11319444444445vw;
  left: 0px;
  position: absolute;
  z-index: 1;
  width: 100%;
`
const MobileBody = styled(Box)`
  background: #f7f7fc;
  width: 100%;
  background-image: url(${mobileLiquidationBg});
  background-size: 100%;
  background-repeat: no-repeat;
`
const ConnectWalletBox = styled(Box)`
  background: linear-gradient(95.08deg, #7646ff 2.49%, #297ac9 49.84%, #00dfd2 97.19%);
  box-shadow: 0px 0.5rem 1rem rgba(40, 127, 202, 0.2), inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.6875rem;
  padding: 0.875rem;
  margin: 1.5rem 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MenuBg = styled(Box)`
  position: absolute;
  backdrop-filter: blur(150px);
  -webkit-backdrop-filter: blur(150px);
  width: 100wh;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
`
export default function Liquidation() {
  const mobileMenuType = useMobileMenuType()
  const loginWalletType = useLoginWalletType()
  const { chainId } = useActiveWeb3React()
  const showChangeNetWork = useShowChangeNetWork()
  // const [loading, setLoading] = useState(true)
  const [collaterals, setCollaterals] = useState<Array<CollateralModel>>([])
  const [otherCollaterals, setOtherCollaterals] = useState<Array<CollateralModel>>([])
  const [inLiquidation, setInLiquidation] = useState<number>(0)
  const address = useAddress()
  const collection = useCollections()
  const [client, setClient] = useState<any>(null)
  const [otherClient, setOtherClient] = useState<any>(null)
  const [searchTerms, setSearchTerms] = useState<string[]>([]) //搜索value
  const [sort, setSort] = useState(0) //排序方法
  const [debtFilter, setDebtFilter] = useState(0) //过滤条件
  const [collectionFilter, setCollectionFilter] = useState(0)
  const dispatch = useAppDispatch()
  const collateralsType = useCollateralsType()
  const alchemy = useAlchemy()
  const dashboardType = useDashboardType()
  const [blueChipLoading, setBlueChipLoading] = useState(true)
  const [growthLoading, setGrowthLoading] = useState(true)
  const loading = useMemo(() => {
    return dashboardType === 1 ? blueChipLoading : growthLoading
  }, [blueChipLoading, dashboardType, growthLoading])
  function ConnectWallet() {
    return (
      <ConnectWalletBox
        onClick={() => {
          dispatch(setLoginWalletType(false))
        }}
      >
        <Typography variant="subtitle2" color="#ffffff" fontWeight="600">
          Connect Wallet
        </Typography>
      </ConnectWalletBox>
    )
  }
  const conditionDebtFilter = useMemo(() => {
    switch (debtFilter) {
      case 1:
        return ['totalDebt_lt:"10000000000000000000"']
      case 2:
        return ['totalDebt_gte:"10000000000000000000"', 'totalDebt_lt:"30000000000000000000"']
      case 3:
        return ['totalDebt_gte:"30000000000000000000"', 'totalDebt_lt:"50000000000000000000"']
      case 4:
        return ['totalDebt_gte:"50000000000000000000"']
      default:
        return ['']
    }
  }, [debtFilter])
  const conditionSort = useMemo(() => {
    setCollaterals([])
    setOtherCollaterals([])
    graphLoading = false
    switch (sort) {
      case 1:
        return ['nftCollateral', 'desc']
      case 2:
        return ['nftCollateral', 'asc']
      case 3:
        return ['totalDebt', 'desc']
      case 4:
        return ['totalDebt', 'asc']
      case 5:
        return ['healthFactor', 'desc']
      case 6:
        return ['healthFactor', 'asc']
      default:
        return ['healthFactor', 'desc']
    }
  }, [sort])
  const searchValue = useMemo(() => {
    if (searchTerms.length !== 0) {
      return `collections_: {collection_contains_nocase: "${searchTerms[0].toLowerCase()}"}`
    } else {
      return ''
    }
  }, [searchTerms])
  const healthFactor = useMemo(() => {
    setCollaterals([])
    setOtherCollaterals([])
    graphLoading = false
    if (inLiquidation === 1) {
      return `healthFactor_lt: ${toWei('1')},`
    } else {
      return ` `
    }
  }, [inLiquidation])
  console.log(inLiquidation)
  const allUserWhere = useMemo(() => {
    if (collectionFilter === 0 && debtFilter === 0) {
      return ['']
    } else if (collectionFilter === 0) {
      return [...conditionDebtFilter]
    } else if (debtFilter === 0) {
      return [`collections_: {collection_contains_nocase: "${collection[collectionFilter - 1].id}"}`]
    } else {
      return [
        `collections_: {collection_contains_nocase: "${collection[collectionFilter - 1].id}"}`,
        ...conditionDebtFilter,
      ]
    }
  }, [collection, collectionFilter, conditionDebtFilter, debtFilter])

  useEffect(() => {
    if (chainId) {
      setClient(getClient(1)[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5])
      setOtherClient(getClient(2)[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5])
    }
  }, [chainId])

  const getCollaterals = useCallback(async () => {
    if (
      client &&
      otherClient &&
      alchemy &&
      collaterals.length === 0 &&
      otherCollaterals.length === 0 &&
      !graphLoading
    ) {
      graphLoading = true
      const user = await client.query({
        query: AllUser(healthFactor, searchValue, conditionSort, allUserWhere),
      })
      const otherUser = await otherClient.query({
        query: AllUser(healthFactor, searchValue, conditionSort, allUserWhere),
      })
      // setLoading(false)
      dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
      // const _users: Array<CollateralModel> = []
      // const _otherUsersCollateral: Array<CollateralModel> = []
      if (user.data.users) {
        user.data.users.forEach(async (element: any) => {
          let heath = times(fromWei(element.healthFactor), 100)
          if (new BigNumber(heath).gt(1000000)) {
            heath = '>1M'
          } else {
            heath = numbro(heath).format({ spaceSeparated: true, average: true }).replace(' ', '')
          }
          const tokens: LiquidationNftModel[] = []
          if (alchemy) {
            for (let i = 0, length = element.collections.length; i < length; i++) {
              for (let ii = 0, length1 = element.collections[i].tokens.length; ii < length1; ii++) {
                const nft = await getAlchemyNftMetadata(
                  element.collections[i].tokens[ii].id.split('-')[1],
                  element.collections[i].tokens[ii].id.split('-')[2],
                  alchemy
                )
                tokens.push({ ...nft, symbol: element.collections[i].collection.symbol })
              }
            }
          }
          setCollaterals((collaterals) => {
            return [
              ...collaterals,
              {
                address: element.id,
                collateral: fromWei(element.totalCollateral),
                collections: element.collections,
                debt: fromWei(element.totalDebt),
                riskPercentage: heath,
                tokens,
                type: 'Blue Chip',
                riskLevel: getRiskLevel(heath),
                riskLevelTag: getRiskLevelTag(heath),
              },
            ]
          })
          // _users.push({
          //   address: element.id,
          //   collateral: fromWei(element.totalCollateral),
          //   collections: element.collections,
          //   debt: fromWei(element.totalDebt),
          //   riskPercentage: heath,
          //   tokens,
          //   type: 'Blue Chip',
          //   riskLevel: getRiskLevel(heath),
          //   riskLevelTag: getRiskLevelTag(heath),
          // })
        })
      }
      if (otherUser.data.users) {
        otherUser.data.users.forEach(async (element: any) => {
          let heath = times(fromWei(element.healthFactor), 100)
          if (new BigNumber(heath).gt(1000000)) {
            heath = '>1M'
          } else {
            heath = numbro(heath).format({ spaceSeparated: true, average: true }).replace(' ', '')
          }
          const otherTokens: LiquidationNftModel[] = []
          if (alchemy) {
            for (let i = 0, length = element.collections.length; i < length; i++) {
              for (let ii = 0, length1 = element.collections[i].tokens.length; ii < length1; ii++) {
                const nft = await getAlchemyNftMetadata(
                  element.collections[i].tokens[ii].id.split('-')[1],
                  element.collections[i].tokens[ii].id.split('-')[2],
                  alchemy
                )
                otherTokens.push({ ...nft, symbol: element.collections[i].collection.symbol })
              }
            }
          }
          setOtherCollaterals((otherCollaterals) => {
            return [
              ...otherCollaterals,
              {
                address: element.id,
                collateral: fromWei(element.totalCollateral),
                collections: element.collections,
                debt: fromWei(element.totalDebt),
                riskPercentage: heath,
                tokens: otherTokens,
                type: 'Growth',
                riskLevel: getRiskLevel(heath),
                riskLevelTag: getRiskLevelTag(heath),
              },
            ]
          })
        })
      }
      // setCollaterals(
      //   orderBy(
      //     _users,
      //     function (o) {
      //       return Number(o.collateral)
      //     },
      //     ['desc']
      //   )
      // )
      // setOtherCollaterals(
      //   orderBy(
      //     _otherUsersCollateral,
      //     function (o) {
      //       return Number(o.collateral)
      //     },
      //     ['desc']
      //   )
      // )
    }
  }, [
    client,
    otherClient,
    alchemy,
    collaterals,
    otherCollaterals.length,
    healthFactor,
    searchValue,
    conditionSort,
    allUserWhere,
    dashboardType,
  ])

  useEffect(() => {
    getCollaterals()
  }, [getCollaterals])
  const mobile = useMobileType()

  const finalCollaterals = useMemo(() => {
    return collateralsType === 'All Borrowers'
      ? orderBy(
          [...collaterals, ...otherCollaterals],
          [
            function (o) {
              return numbro.unformat(o.riskPercentage.replaceAll('>', '').toLocaleLowerCase())
            },
            function (o) {
              return o.collateral
            },
          ],
          ['asc', 'desc']
        )
      : collateralsType === 'blueChip'
      ? collaterals
      : otherCollaterals
  }, [collaterals, collateralsType, otherCollaterals])
  return (
    <>
      {mobile ? (
        <Body
          // className="header-padding"
          sx={{ paddingTop: showChangeNetWork ? '118px' : '70px' }}
        >
          <BodyBg top={showChangeNetWork ? '48px' : '0'}></BodyBg>
          <Header />
          <Collaterals
            debtFilter={debtFilter}
            setDebtFilter={setDebtFilter}
            sort={sort}
            setInLiquidation={setInLiquidation}
            setSort={setSort}
            loading={loading}
            collaterals={finalCollaterals}
            setSearchTerms={setSearchTerms}
            searchTerms={searchTerms}
            setCollectionFilter={setCollectionFilter}
            collectionFilter={collectionFilter}
          />
        </Body>
      ) : (
        <MobileBody height={mobileMenuType ? '100%' : '100vh'}>
          <Box p="0 1rem">
            <MobileHeader></MobileHeader>
            {loading ? (
              <MobileCollateralSkeleton></MobileCollateralSkeleton>
            ) : (
              <MobileCollateral
                sort={sort}
                setSort={setSort}
                debtFilter={debtFilter}
                setDebtFilter={setDebtFilter}
                collectionFilter={collectionFilter}
                setCollectionFilter={setCollectionFilter}
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
                collaterals={finalCollaterals}
              ></MobileCollateral>
            )}
          </Box>
          {!mobileMenuType && (
            <MenuBg pt={showChangeNetWork ? '7.6875rem' : '3.625rem'}>
              {loginWalletType ? (
                <>
                  <MobileMenu></MobileMenu>
                  {address ? <WalletMessage></WalletMessage> : <>{ConnectWallet()}</>}
                </>
              ) : (
                <WalletModal></WalletModal>
              )}
            </MenuBg>
          )}
        </MobileBody>
      )}
    </>
  )
}
