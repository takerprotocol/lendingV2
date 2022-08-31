import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import liquidationBg from 'assets/images/svg/liquidation/liquidation-icon.svg'
import { useCallback, useEffect, useState } from 'react'
import { getClient } from 'apollo/client'
import { SupportedChainId } from 'constants/chains'
import { User } from 'apollo/queries'
import { useAddress, useHeath, useUserValue } from 'state/user/hooks'
import { CollateralModel } from 'services/type/nft'
import { getRiskLevel, getRiskLevelTag } from 'utils'
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
  const userValue = useUserValue()
  const heath = useHeath()
  const TypographyRiskLevel = getRiskLevel(heath)
  const riskLevelTag = getRiskLevelTag(heath)
  const getCollaterals = useCallback(async () => {
    if (address) {
      const user = await client.query({
        query: User(`${address}`),
      })
      setLoading(false)
      if (user.data.user) {
        setCollaterals([
          {
            address,
            collateral: userValue.totalCollateral,
            collections: user.data.user.collections,
            debt: userValue.totalDebt,
            riskPercentage: heath,
            riskLevel: TypographyRiskLevel,
            riskLevelTag,
          },
        ])
      }
    }
  }, [TypographyRiskLevel, address, heath, riskLevelTag, userValue.totalCollateral, userValue.totalDebt])

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
