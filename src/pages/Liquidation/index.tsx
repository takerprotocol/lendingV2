import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import liquidationBg from 'assets/images/svg/liquidation/liquidation-icon.svg'
import mobileLiquidationBg from 'assets/images/svg/liquidation/mobileLiquidation-bg.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getClient } from 'apollo/client'
import { AllUser } from 'apollo/queries'
import { useAddress, useCollateralsType, useMobileType } from 'state/user/hooks'
import { useCollections } from 'state/application/hooks'
import { CollateralModel } from 'services/type/nft'
import { getRiskLevel, getRiskLevelTag } from 'utils'
import MobileHeader from './components/mobileLiquidation/MobileHeader'
import MobileCollateral from './components/mobileLiquidation/MobileCollateral'
// import { WETH } from 'config'
import { fromWei } from 'web3-utils'
import { useActiveWeb3React } from 'hooks/web3'
import BigNumber from 'bignumber.js'

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
  background-size: 100%;
  max-height: 952.03px;
  height: 952.03px;
  top: 0px;
  left: 0px;
  position: absolute;
  z-index: 1;
  width: 100%;
`
const MobileBody = styled(Box)`
  background: #f7f7fc;
  width: 100%;
  padding: 0 1rem;
  background-image: url(${mobileLiquidationBg});
  background-repeat: no-repeat;
`
export default function Liquidation() {
  const { chainId } = useActiveWeb3React()
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
        return ['avgLtv', 'desc']
      case 6:
        return ['avgLtv', 'asc']
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
          const heath = new BigNumber(fromWei(element.healthFactor)).toFixed(2, 1)
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
  }, [address, client, healthFactor, searchValue, conditionSort, allUserWhere])

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
          <MobileHeader></MobileHeader>
          <MobileCollateral collaterals={collaterals}></MobileCollateral>
        </MobileBody>
      )}
    </>
  )
}
