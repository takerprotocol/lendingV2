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
import { useAddress } from 'state/user/hooks'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { setReserveData, setRiskLevel, setUserNftConfig, setUserNftValues } from 'state/user/reducer'
import { bigNumberToString } from 'utils'
// import { getClient } from 'apollo/client'
// import { SupportedChainId } from 'constants/chains'
// import { TEST1 } from 'apollo/queries'

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
          setLoading(false)
          dispatch(
            setUserNftValues(
              res.map((el) => {
                return bigNumberToString(el)
              })
            )
          )
        })
      // contract.getUserValues(address).then((res: BigNumber) => {
      //   setLoading(false)
      //   console.log(res)
      // })
      contract.getReserveData(address).then((res: any) => {
        dispatch(
          setReserveData([
            bigNumberToString(res.borrowRate),
            bigNumberToString(res.configuration),
            bigNumberToString(res.debtIndex),
            bigNumberToString(res.debtTokenAddress),
            bigNumberToString(res.depositRate),
            bigNumberToString(res.interestRateCalculatorAddress),
            res.lastUpdateTimestamp,
            bigNumberToString(res.liquidityIndex),
            bigNumberToString(res.tTokenAddress),
            bigNumberToString(res.treasury),
          ])
        )
      })
      contract.getReserveNormalizedDebtScale(address).then((res: any) => {
        dispatch(setRiskLevel(bigNumberToString(res)))
      })
      contract.getReserveConfig('0x6310098a56F9dd4D1F2a8A0Ab0E82565415054D8').then((res: any) => {
        console.log('getReserveConfig', res)
      })
      contract.getUserConfig(address).then((res: BigNumber) => {
        setLoading(false)
        dispatch(setUserNftConfig(bigNumberToString(res)))
      })
    }
  }, [contract, address, dispatch])
  const changeCheck = (a: number) => {
    setType(a)
  }
  // const client = getClient()[SupportedChainId.MAINNET]
  // client
  //   .query({
  //     query: TEST1('0xD7B4eC7c65fBFa64607017CfA1114257F03E19ab'),
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
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
