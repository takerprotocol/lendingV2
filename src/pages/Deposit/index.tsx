import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import AvailableNFTs from './components/AvailableNFTs'
import BgImg from 'assets/images/svg/deposit/Bg.svg'

const Body = styled(Box)`
  padding-top: 233px;
  width: 100%;
`
const Main = styled(Box)`
  width: 1012px;
  margin: 0 auto;
`

const HeaderBg = styled(Box)`
  background: linear-gradient(0deg, rgba(99, 133, 150, 0.4), rgba(99, 133, 150, 0.4)), url(${BgImg});
  background-image: url(${BgImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`

export default function Deposit() {
  return (
    <Body className="header-padding">
      <HeaderBg />
      <Main>
        <DepositHeader></DepositHeader>
        <AvailableNFTs></AvailableNFTs>
      </Main>
    </Body>
  )
}
