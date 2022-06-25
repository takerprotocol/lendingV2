import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import AvailableNFTs from './components/AvailableNFTs'
import BgImg from 'assets/images/svg/deposit/Bg.svg'
import { useState, useEffect } from 'react'
import DepositedNFT from './components/DepositedNFT'
import NFTsSelectedModal from './components/NFTsSelectedModal'
import SureModal from './components/SureModal'
import { useOwnerNft } from 'services/module/deposit'

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
  const list = useOwnerNft('0x1108f964b384f1dCDa03658B24310ccBc48E226F')
  const [openSelectedModal, setOpenSelectedModal] = useState<boolean>(false) //SureModal
  const [openSureModal, setOpenSureModal] = useState<boolean>(false) //NFTsSelectedModal
  const [loading, setLoading] = useState(true)
  const [depositType, setDepositType] = useState<string>('shut')
  const [withdrawType, setWithdrawType] = useState<string>('shut')
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
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
          setOpenSelectedModal={setOpenSelectedModal}
          setOpenSureModal={setOpenSureModal}
        ></AvailableNFTs>
        <DepositedNFT
          loading={loading}
          list={list}
          depositType={depositType}
          withdrawType={withdrawType}
          setWithdrawType={setWithdrawType}
          setOpenSelectedModal={setOpenSelectedModal}
          setOpenSureModal={setOpenSureModal}
        ></DepositedNFT>
        <SureModal openSureModal={openSureModal} setOpenSureModal={setOpenSureModal}></SureModal>
        <NFTsSelectedModal
          openSelectedModal={openSelectedModal}
          setOpenSelectedModal={setOpenSelectedModal}
        ></NFTsSelectedModal>
      </Main>
    </Body>
  )
}
