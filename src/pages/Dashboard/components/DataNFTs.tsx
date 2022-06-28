import { Box, styled } from '@mui/material'
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
  loading: boolean
}
export default function DataNFTs({ loading, type }: DataNFTsProps) {
  const address = useAddress()
  return (
    <DataNFTsBox>
      <Box>
        <DashboardTotal type={type} loading={loading}></DashboardTotal>
      </Box>
      <FlexBox mt="48px">
        {!address && !loading ? (
          <ConnectWallet type={type}></ConnectWallet>
        ) : (
          <>
            <MyAccount type={type} loading={loading}></MyAccount>
            <Box width="24px"></Box>
            <MyLoan type={type} loading={loading}></MyLoan>
          </>
        )}
      </FlexBox>
    </DataNFTsBox>
  )
}
