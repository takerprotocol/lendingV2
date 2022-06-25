import { Box, styled } from '@mui/material'
import ETHpool from './ETHPool'
import MySupply from './MySupply'
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
`
interface PoolMySupplyType {
  loading: boolean
  type: number
}
export default function PoolMySupply({ loading, type }: PoolMySupplyType) {
  return (
    <FlexBox>
      <Box mr="24px">
        <ETHpool type={type} loading={loading}></ETHpool>
      </Box>
      <Box>
        <MySupply loading={loading}></MySupply>
      </Box>
    </FlexBox>
  )
}
