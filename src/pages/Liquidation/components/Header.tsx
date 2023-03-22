import { Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
const Title = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  position: relative;
  font-weight: 700;
  font-size: 36px;
  line-height: 160%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  z-index: 5;
`

const Subtitle = styled(Typography)`
  width: 482px;
  font-family: 'Quicksand';
  font-style: normal;
  position: relative;
  font-weight: 500;
  font-size: 22px;
  margin-top: 19px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #ffffff;
  z-index: 5;
`

const LiquidationHeader = () => {
  return (
    <Box m="157px 0  74px 140px">
      <Title variant="h3">found some treasure !</Title>
      <Subtitle>Help the borrower repay their debt, instantly liquidate, and get the NFT you desire</Subtitle>
    </Box>
  )
}

export default LiquidationHeader
