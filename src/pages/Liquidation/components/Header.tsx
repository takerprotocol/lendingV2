import { Typography } from '@mui/material'
import { styled } from '@mui/system'
const Title = styled(Typography)`
  position: absolute;
  height: 58px;
  left: 140px;
  top: 157px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 160%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  z-index: 5;
`

const Subtitle = styled(Typography)`
  position: absolute;
  width: 482px;
  height: 70px;
  left: 140px;
  top: 234px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #ffffff;
  z-index: 5;
`

const LiquidationHeader = () => {
  return (
    <>
      <Title variant="h3">found some treasure !</Title>
      <Subtitle>Liquidate with a floor price to get some NFTs you like</Subtitle>
    </>
  )
}

export default LiquidationHeader
