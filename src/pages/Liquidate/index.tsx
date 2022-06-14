import { Box } from '@mui/material'
import { styled } from '@mui/system'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'

const Body = styled(Box)`
  width: 100%;
  max-width: 1012px;
  margin: 0 auto;
  margin-top: 94px;
`

const Liquidate = () => {
  return (
    <Body>
      <LiquidateHeader
        address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
        riskPercentage={110}
        totalCollateral={526.1862}
        nftCollateral={360.26}
        ethCollateral={165.93}
        totalDebt={467.5814}
        ethDebt={420.82}
        borrowings={46.75}
      />
      <LiquidateBody total={233.7965} collaterals={[]} />
    </Body>
  )
}

export default Liquidate
