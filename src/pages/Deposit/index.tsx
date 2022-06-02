import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import AvailableNFTs from './components/AvailableNFTs'
import BgImg from 'assets/images/svg/deposit/Bg.svg'
const Body = styled(Box)`
  padding-top: 163px;
  background: linear-gradient(0deg, rgba(99, 133, 150, 0.4), rgba(99, 133, 150, 0.4)), url(${BgImg});
  background-image: url(${BgImg});
  background-repeat: no-repeat;
`
const Main = styled(Box)`
  width: 1012px;
  margin: 0 auto;
`
export default function Deposit() {
  return (
    <Body className="header-padding">
      <Main>
        <DepositHeader></DepositHeader>
        <AvailableNFTs></AvailableNFTs>
      </Main>
    </Body>
  )
}
