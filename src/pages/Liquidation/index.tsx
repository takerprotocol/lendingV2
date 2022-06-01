import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from 'assets/images/png/liquidation/header.png'
import Header2 from 'assets/images/png/liquidation/header2.png'
import Header3 from 'assets/images/png/liquidation/header3.png'
import { Typography } from '@mui/material'

const Body = styled(Box)`
  background: #e5e5e5;
  width: 100%;
  min-height: 100vh;
`

const Image = styled('img')`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  object-fit: cover;
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

const CollateralsContainer = styled(Box)`
  position: absolute;
  width: calc(100% - 280px);
  height: 856px;
  left: 140px;
  top: 378px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 15.73%, rgba(255, 255, 255, 0) 78.72%);
  backdrop-filter: blur(80px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 12px;
  z-index: 5;
`

export default function Liquidation() {
  return (
    <Body className="header-padding">
      <div>
        <Image src={Header} alt="header" />
        <Image src={Header3} alt="header3" className="back" />
        <Image src={Header2} alt="header2" className="infront" />
      </div>
      <Title variant="h3">Found some treasure!</Title>
      <Subtitle>Liquidate with a floor price to get some NFTs you like</Subtitle>
      <CollateralsContainer></CollateralsContainer>
    </Body>
  )
}
