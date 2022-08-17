import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import Header from 'assets/images/png/liquidation/header.png'
import Header2 from 'assets/images/png/liquidation/header2.png'
import Header3 from 'assets/images/png/liquidation/header3.png'

const Image = styled('img')`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;

  &.infront {
    z-index: 2;
  }

  &.back {
    z-index: 0;
  }
`

const Title = styled(Typography)`
  position: absolute;
  width: 470px;
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
      <div>
        <Image src={Header} alt="header" />
        <Image src={Header3} alt="header3" className="back" />
        <Image src={Header2} alt="header2" className="infront" />
      </div>
      <Title variant="h3">Found some treasure!</Title>
      <Subtitle>Liquidate with a floor price to get some NFTs you like</Subtitle>
    </>
  )
}

export default LiquidationHeader
