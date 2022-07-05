import { Box, styled } from '@mui/material'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import { useEffect, useState } from 'react'
import { useAddress } from 'state/application/hooks'
import { FlexBox } from 'styleds/index'
import ConnectWallet from './ConnectWallet'
import DashboardTotal from './DashboardTotal'
import MyAccount from './MyAccount'
import MyLoan from './MyLoan'
const DataNFTsBox = styled(Box)`
  width: 1208px;
  margin-top: 24px;
  background: linear-gradient(180deg, rgba(153, 159, 210, 0.1) 0%, rgba(160, 163, 189, 0) 96.99%);
  border-radius: 12px;
  padding: 48px 24px 24px;
  .SkeletonBg {
    background: #ffffff !important;
  }
`
interface DataNFTsProps {
  type: number
}
export default function DataNFTs({ type }: DataNFTsProps) {
  const address = useAddress()
  const [loading, setLoading] = useState(true)
  const [userValues, setUserValues] = useState<Array<BigNumber>>([
    new BigNumber(0),
    new BigNumber(0),
    new BigNumber(0),
    new BigNumber(0),
  ])
  const contract = useLendingPool()
  useEffect(() => {
    if (contract && address) {
      contract
        .getUserValues(address)
        .then((res: Array<BigNumber>) => {
          setLoading(false)
          setUserValues(res)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [contract, address])
  return (
    <DataNFTsBox>
      <Box>
        <DashboardTotal type={type}></DashboardTotal>
      </Box>
      <FlexBox mt="48px">
        {!address && !loading ? (
          <ConnectWallet type={type}></ConnectWallet>
        ) : (
          <>
            <MyAccount type={type}></MyAccount>
            <Box width="24px"></Box>
            <MyLoan assets={userValues[2]} type={type} loading={loading}></MyLoan>
          </>
        )}
      </FlexBox>
    </DataNFTsBox>
  )
}
