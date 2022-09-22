import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import DepositNFT from './components/DepositNFT'
import { useMemo, useState } from 'react'
import WithdrawNFT from './components/WithdrawNFT'
import { useDepositableNfts } from 'services/module/deposit'
import { useAddress, useMobileType } from 'state/user/hooks'
import { useParams } from 'react-router-dom'
import { useCollections, useDepositedCollection } from 'state/application/hooks'
import MobileHeader from './components/mobileComponents/MobileHeader'
import MobileDepositRoWithdraw from './components/mobileComponents/MobileDepositRoWithdraw'
import MobileFooter from './components/mobileComponents/MobileFooter'
import mobileDepositBg from 'assets/images/svg/deposit/mobileDeposit-bg.svg'

const Body = styled(Box)`
  padding-top: 233px;
  width: 100%;
  position: relative;
`
const Main = styled(Box)`
  width: 1012px;
  margin: 0 auto;
`
const HeaderBg = styled(Box)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -3;
`
const FilterBg = styled(Box)`
  backdrop-filter: blur(80px);
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -2;
`
const OpacityBg = styled(Box)`
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`
const MobileBody = styled(Box)`
  margin-top: 6.375rem;
  width: 100%;
  background: #f7f7fc;
`
const MobileMain = styled(Box)`
  padding: 0rem 1rem 0rem 1rem;
  margin-top: -10.1875rem;
  width: 100%;
`
const MobileHeaderBg = styled(Box)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 225px;
  z-index: -1;
`
export default function Deposit() {
  const address = useAddress()
  const { id } = useParams()
  const [depositType, setDepositType] = useState<string>('shut')
  const [withdrawType, setWithdrawType] = useState<string>('shut')
  const { list, loading } = useDepositableNfts(address, id)
  const depositedCollection = useDepositedCollection()
  const depositedList = useMemo(() => {
    if (depositedCollection && id) {
      const collection = depositedCollection.find((el) => {
        return el.userNftCollection.id.split('-')[1] === id
      })
      return collection ? collection.userNftCollection.tokens : []
    }
    return []
  }, [depositedCollection, id])
  const collections = useCollections()
  const collection = useMemo(() => {
    if (collections && id) {
      return collections.find((el) => el.id.toLocaleLowerCase() === id.toLocaleLowerCase())
    } else {
      return null
    }
  }, [collections, id])
  const mobile = useMobileType()
  const [type, setType] = useState<number>(1)
  return (
    <>
      {mobile ? (
        <Body className="header-padding">
          <HeaderBg sx={{ backgroundImage: `url(${collection?.icon})` }}></HeaderBg>
          <FilterBg></FilterBg>
          <OpacityBg></OpacityBg>
          <Main>
            <DepositHeader loading={loading}></DepositHeader>
            <DepositNFT
              loading={loading}
              list={list}
              setDepositType={setDepositType}
              depositType={depositType}
              withdrawType={withdrawType}
            ></DepositNFT>
            <WithdrawNFT
              loading={loading}
              list={depositedList}
              depositType={depositType}
              withdrawType={withdrawType}
              setWithdrawType={setWithdrawType}
            ></WithdrawNFT>
          </Main>
        </Body>
      ) : (
        <MobileBody>
          <MobileHeaderBg sx={{ backgroundImage: `url(${mobileDepositBg})` }}></MobileHeaderBg>
          <MobileMain>
            <MobileHeader></MobileHeader>
            <MobileDepositRoWithdraw type={type} setType={setType}></MobileDepositRoWithdraw>
          </MobileMain>
          <MobileFooter type={type}></MobileFooter>
        </MobileBody>
      )}
    </>
  )
}
