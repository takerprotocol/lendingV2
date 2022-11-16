import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import liquidationBg from 'assets/images/svg/liquidation/liquidation-icon.svg'
import mobileLiquidationBg from 'assets/images/svg/liquidation/mobileLiquidation-bg.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getClient } from 'apollo/client'
import { AllUser } from 'apollo/queries'
import {
  useAddress,
  useCollateralsType,
  useDecimal,
  useLoginWalletType,
  useMobileMenuType,
  useMobileType,
} from 'state/user/hooks'
import { useCollections } from 'state/application/hooks'
import { CollateralModel } from 'services/type/nft'
import { decimalFormat, getRiskLevel, getRiskLevelTag } from 'utils'
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
  top: 0px;
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
  margin: 1rem 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MenuBg = styled(Box)`
  backdrop-filter: blur(150px);
  width: 100wh;
  height: 100vh;
`
export default function Liquidation() {
  const mobileMenuType = useMobileMenuType()
  const loginWalletType = useLoginWalletType()
  const { chainId } = useActiveWeb3React()
  const decimal = useDecimal()
  const [loading, setLoading] = useState(true)
  const [collaterals, setCollaterals] = useState<Array<CollateralModel>>([])
  const address = useAddress()
  const collection = useCollections()
  const [client, setClient] = useState<any>(null)
  const [searchTerms, setSearchTerms] = useState<string[]>([]) //搜索value
  const [sort, setSort] = useState(0) //排序方法
  const [debtFilter, setDebtFilter] = useState(0) //过滤条件
  const [collectionFilter, setCollectionFilter] = useState(0)
  const collateralsType = useCollateralsType()
  const dispatch = useAppDispatch()
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
        return ['null', 'desc']
    }
  }, [sort])
  const searchValue = useMemo(() => {
    if (searchTerms.length !== 0) {
      return `collections_: {collection_contains: "${searchTerms[0].toLowerCase()}"}`
    } else {
      return ''
    }
  }, [searchTerms])
  const healthFactor = useMemo(() => {
    if (collateralsType === 'All Borrowers') {
      return ''
    } else {
      if (collateralsType !== 'Liquidate') {
        return 'healthFactor_gt: 110,'
      } else {
        return 'healthFactor_lt: 110,'
      }
    }
  }, [collateralsType])
  const allUserWhere = useMemo(() => {
    if (collectionFilter === 0 && debtFilter === 0) {
      return ['']
    } else if (collectionFilter === 0) {
      return [...conditionDebtFilter]
    } else if (debtFilter === 0) {
      return [`collections_: {collection_contains: "${collection[collectionFilter - 1].id}"}`]
    } else {
      return [`collections_: {collection_contains: "${collection[collectionFilter - 1].id}"}`, ...conditionDebtFilter]
    }
  }, [collection, collectionFilter, conditionDebtFilter, debtFilter])
  useEffect(() => {
    if (chainId) {
      setClient(getClient()[chainId === 1 ? 42 : chainId === 4 ? 4 : chainId === 5 ? 5 : 42])
    }
  }, [chainId])
  const getCollaterals = useCallback(async () => {
    if (address && client) {
      const user = await client.query({
        query: AllUser(healthFactor, searchValue, conditionSort, allUserWhere),
      })
      setLoading(false)
      if (user.data.users) {
        const users: Array<CollateralModel> = []
        user.data.users.forEach((element: any) => {
          // let depositedAmount = '0'
          // let borrowedAmount = '0'
          // let liqThreshold = '0'
          // element.reserves.forEach((rel: any) => {
          //   if (rel.id.split('-')[1].toLocaleLowerCase() === WETH.toLocaleLowerCase()) {
          //     liqThreshold = rel.reserve.liqThreshold
          //   }
          //   depositedAmount = plus(depositedAmount, rel.depositedAmount)
          //   borrowedAmount = plus(borrowedAmount, rel.borrowedAmount)
          // })
          const heath = decimalFormat(element.healthFactor, decimal, false)
          users.push({
            address: element.id,
            collateral: fromWei(element.totalCollateral),
            collections: element.collections,
            debt: fromWei(element.totalDebt),
            riskPercentage: heath,
            riskLevel: getRiskLevel(heath),
            riskLevelTag: getRiskLevelTag(heath),
          })
        })
        setCollaterals(users)
      }
    }
  }, [address, client, healthFactor, searchValue, conditionSort, allUserWhere, decimal])

  useEffect(() => {
    getCollaterals()
  }, [getCollaterals])
  const mobile = useMobileType()
  return (
    <>
      {mobile ? (
        <Body className="header-padding">
          <BodyBg></BodyBg>
          <Header />
          <Box height="308px"></Box>
          <Collaterals
            debtFilter={debtFilter}
            setDebtFilter={setDebtFilter}
            sort={sort}
            setSort={setSort}
            loading={loading}
            collaterals={collaterals}
            setSearchTerms={setSearchTerms}
            searchTerms={searchTerms}
            setCollectionFilter={setCollectionFilter}
            collectionFilter={collectionFilter}
          />
        </Body>
      ) : (
        <MobileBody>
          {mobileMenuType ? (
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
                  collaterals={collaterals}
                ></MobileCollateral>
              )}
            </Box>
          ) : (
            <Box sx={{ minHeight: '41.6875rem' }} p="3.625rem 0 10rem 0">
              <MenuBg>
                {loginWalletType ? (
                  <>
                    <MobileMenu></MobileMenu>
                    {address ? <WalletMessage></WalletMessage> : <>{ConnectWallet()}</>}
                  </>
                ) : (
                  <WalletModal></WalletModal>
                )}
              </MenuBg>
            </Box>
          )}
        </MobileBody>
      )}
    </>
  )
}
