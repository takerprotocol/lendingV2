import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import liquidationBg from 'assets/images/svg/liquidation/liquidation-icon.svg'
import { useCallback, useEffect, useState } from 'react'
import { getClient } from 'apollo/client'
import { SupportedChainId } from 'constants/chains'
import { AllUser } from 'apollo/queries'
import { useAddress } from 'state/user/hooks'
import { CollateralModel } from 'services/type/nft'
import { div, getRiskLevel, getRiskLevelTag, times } from 'utils'
// import { WETH } from 'config'
import { fromWei } from 'web3-utils'

const client = getClient()[SupportedChainId.MAINNET]
// import Collection6 from '../../assets/images/png/liquidation/example/6.png'

const Body = styled(Box)`
  background-color: #f7f7fc;
  background-image: url(${liquidationBg});
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: -284px;
  margin-bottom: 304px;
`
export default function Liquidation() {
  const [loading, setLoading] = useState(true)
  const [collaterals, setCollaterals] = useState<Array<CollateralModel>>([])
  const address = useAddress()
  const getCollaterals = useCallback(async () => {
    if (address) {
      const user = await client.query({
        query: AllUser(),
      })
      console.log(user)
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
  }, [address])

  useEffect(() => {
    getCollaterals()
  }, [getCollaterals])

  return (
    <Body className="header-padding">
      <Header />
      <Box height="308px"></Box>
      <Collaterals loading={loading} collaterals={collaterals} />
    </Body>
  )
}
