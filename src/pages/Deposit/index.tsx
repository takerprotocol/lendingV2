import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import AvailableNFTs from './components/AvailableNFTs'
import BgImg from 'assets/images/svg/deposit/Bg.svg'
import { useState } from 'react'
import DepositedNFT from './components/DepositedNFT'
import { useDepositableNfts } from 'services/module/deposit'
import { useAddress } from 'state/user/hooks'

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
  const address = useAddress()
  const [depositType, setDepositType] = useState<string>('shut')
  const [withdrawType, setWithdrawType] = useState<string>('shut')
  const { list, loading } = useDepositableNfts(address)
  console.log(list)

  return (
    <Body className="header-padding">
      <HeaderBg />
      <Main>
        <DepositHeader loading={loading}></DepositHeader>
        <AvailableNFTs
          loading={loading}
          list={list}
          setDepositType={setDepositType}
          depositType={depositType}
          withdrawType={withdrawType}
        ></AvailableNFTs>
        <DepositedNFT
          loading={loading}
          list={list}
          depositType={depositType}
          withdrawType={withdrawType}
          setWithdrawType={setWithdrawType}
        ></DepositedNFT>
      </Main>
    </Body>
  )
}
