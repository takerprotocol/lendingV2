import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import liquidationBg from 'assets/images/svg/liquidation/liquidation-icon.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getClient } from 'apollo/client'
import { AllUser } from 'apollo/queries'
import { useAddress } from 'state/user/hooks'
import { CollateralModel } from 'services/type/nft'
import { div, getRiskLevel, getRiskLevelTag, times } from 'utils'
// import { WETH } from 'config'
import { fromWei } from 'web3-utils'
import { useActiveWeb3React } from 'hooks/web3'

// import Collection6 from '../../assets/images/png/liquidation/example/6.png'

const Body = styled(Box)`
  background-color: #f7f7fc;
  background-image: url(${liquidationBg});
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  padding-bottom: 96px;
  position: -webkit-sticky; /* Safari */
  // position: sticky;
  // top: -284px;
  // margin-bottom: 304px;
`
export default function Liquidation() {
  const { chainId } = useActiveWeb3React()
  const [loading, setLoading] = useState(true)
  const [collaterals, setCollaterals] = useState<Array<CollateralModel>>([])
  const address = useAddress()
  const [client, setClient] = useState<any>(null)
  const [searchTerms, setSearchTerms] = useState<string[]>([]) //搜索value
  const [sort, setSort] = useState(0) //排序方法
  const [debtFilter, setDebtFilter] = useState(0) //过滤条件
  const conditionDebtFilter = useMemo(() => {
    switch (debtFilter) {
      case 1:
        return ['totalDebt_gt:10000000000000000000', 'totalDebt_gt:`10000000000000000000`']
      case 2:
        return ['totalDebt_gte:10000000000000000000', 'totalDebt_lt:30000000000000000000']
      case 3:
        return ['totalDebt_gte:30000000000000000000', 'totalDebt_lt:50000000000000000000']
      case 4:
        return ['totalDebt_gte:50000000000000000000', 'totalDebt_gte:50000000000000000000']
      default:
        return ['totalDebt_gte:0', 'totalDebt_gte:0']
    }
  }, [debtFilter])
  console.log()
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
  useEffect(() => {
    if (chainId) {
      setClient(getClient()[chainId === 1 ? 42 : chainId === 4 ? 4 : 42])
    }
  }, [chainId])
  const getCollaterals = useCallback(async () => {
    if (address && client) {
      const user = await client.query({
        query: AllUser(searchTerms, conditionDebtFilter, conditionSort),
      })
      setLoading(false)
      if (user.data.users) {
        const users: Array<CollateralModel> = []
        user.data.users.forEach((element: any) => {
          // let depositedAmount = '0'
          // let borrowedAmount = '0'
          // let liqThreshold = '0'
          console.log(element)
          // element.reserves.forEach((rel: any) => {
          //   if (rel.id.split('-')[1].toLocaleLowerCase() === WETH.toLocaleLowerCase()) {
          //     liqThreshold = rel.reserve.liqThreshold
          //   }
          //   depositedAmount = plus(depositedAmount, rel.depositedAmount)
          //   borrowedAmount = plus(borrowedAmount, rel.borrowedAmount)
          // })
          const heath = div(times(element.reserveSupply, element.liqThreshold), element.totalDebt)
          users.push({
            address: element.id,
            collateral: fromWei(element.reserveSupply),
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
  }, [address, client, conditionDebtFilter, conditionSort, searchTerms])

  useEffect(() => {
    getCollaterals()
  }, [getCollaterals])

  return (
    <Body className="header-padding">
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
      />
    </Body>
  )
}
