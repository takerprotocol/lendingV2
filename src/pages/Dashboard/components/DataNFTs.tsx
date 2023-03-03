import { Box, styled } from '@mui/material'
import { useAddress } from 'state/user/hooks'
import { FlexBox } from 'styleds/index'
import ConnectWallet from './ConnectWallet'
import DashboardTotal from './DashboardTotal'
import MyAccount from './MyAccount'
import MyLoan from './MyLoan'
const DataNFTsBox = styled(Box)`
  width: 1208px;
  background: linear-gradient(180deg, rgba(153, 159, 210, 0.1) 0%, rgba(160, 163, 189, 0) 96.99%);
  border-radius: 12px;
  padding-bottom: 24px;
  padding-right: 24px;
  padding-left: 24px;
  .SkeletonBg {
    background: #ffffff !important;
  }
`
interface DataNFTsProps {
  type: number
  loading: boolean
}
export default function DataNFTs({ type, loading }: DataNFTsProps) {
  const address = useAddress()
  return (
    <DataNFTsBox pt={loading ? '48px' : '46px'}>
      <Box>
        <DashboardTotal type={type}></DashboardTotal>
      </Box>
      <FlexBox mt="38px">
        {!address && !loading ? (
          <ConnectWallet type={type}></ConnectWallet>
        ) : (
          <>
            <MyAccount loading={loading} type={type}></MyAccount>
            <Box width="24px"></Box>
            <MyLoan type={type} loading={loading}></MyLoan>
          </>
        )}
      </FlexBox>
    </DataNFTsBox>
  )
}
