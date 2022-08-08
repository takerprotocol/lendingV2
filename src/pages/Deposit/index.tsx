import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import DepositNFT from './components/DepositNFT'
import BgImg from 'assets/images/svg/deposit/Bg.svg'
import { useMemo, useState } from 'react'
import WithdrawNFT from './components/WithdrawNFT'
import { useDepositableNfts } from 'services/module/deposit'
import { useAddress } from 'state/user/hooks'
import { useParams } from 'react-router-dom'
import { useDepositedCollection } from 'state/application/hooks'

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
  return (
    <Body className="header-padding">
      <HeaderBg />
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
  )
}
