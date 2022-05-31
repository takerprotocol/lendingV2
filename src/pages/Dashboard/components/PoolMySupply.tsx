import { Box, styled } from '@mui/material'
import ETHpool from './ETHPool'
import MySupply from './MySupply'
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
`
export default function PoolMySupply() {
  return (
    <FlexBox>
      <Box mr="24px">
        <ETHpool></ETHpool>
      </Box>
      <Box>
        <MySupply></MySupply>
      </Box>
    </FlexBox>
  )
}
