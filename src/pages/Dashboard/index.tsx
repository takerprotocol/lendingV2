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
import { useLendingPool } from 'hooks/useLendingPool'
import { useAddress } from 'state/application/hooks'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { setUserNftValues } from 'state/application/reducer'
import { bigNumberToString } from 'utils'

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
  const dispatch = useAppDispatch()
  const contract = useLendingPool()
  const address = useAddress()
  useEffect(() => {
    if (contract && address) {
      contract
        .getUserAssetValues(address, '0xA8FD6E4736FDad7989b79b60a1ad5EddDEaEA637')
        .then((res: Array<BigNumber>) => {
          dispatch(
            setUserNftValues(
              res.map((el) => {
                return bigNumberToString(el)
              })
            )
          )
        })
    }
  }, [contract, address, dispatch])
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
