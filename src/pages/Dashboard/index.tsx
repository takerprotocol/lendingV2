// import logo from './logo.svg';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BgIcon from 'assets/images/png/dashboard/bg.png'
import Collection from './components/Collection'
import BlueChipNFTs from './components/BlueChipNFTs'
import { useEffect, useState } from 'react'
// import lendingPoolAbi from 'abis/ILendingPoolAddressesProvider.json'

// import { getClient } from 'apollo/client'
// import { SupportedChainId } from 'constants/chains'
// import { TEST } from 'apollo/queries'
import DataNFTs from './components/DataNFTs'

const Body = styled(Box)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${BgIcon});
  background-image: url(${BgIcon});
  background-repeat: no-repeat;
  background-size: cover;
`
const Main = styled(Box)`
  width: 1208px;
  margin: 0 auto;
`
export default function Dashboard() {
  const [type, setType] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const changeCheck = (a: number) => {
    setType(a)
  }
  // const client = getClient()[SupportedChainId.MAINNET]
  // client
  //   .query({
  //     query: TEST('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'),
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
  // console.log('client', client)
  return (
    <Body className="header-padding">
      <BlueChipNFTs type={type} changeCheck={changeCheck}></BlueChipNFTs>
      <Main>
        <DataNFTs type={type}></DataNFTs>
        <Collection loading={loading} type={type}></Collection>
      </Main>
    </Body>
  )
}
