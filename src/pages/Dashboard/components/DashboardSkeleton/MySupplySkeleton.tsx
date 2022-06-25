import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds/index'
const MySupplyBox = styled(Box)`
  width: 494px;
  height: 285px;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
`
const TotalSkeleton = styled(Skeleton)`
  width: 123px;
  height: 25px;
  background: #eff0f6;
  border-radius: 4px;
  margin-top: 10px;
`
const BottomSkeleton = styled(Skeleton)`
  height: 156px;
  background: #f7f7fc;
  border-radius: 10px;
  width: 446px;
`

export default function MySupplySkeleton() {
  return (
    <MySupplyBox>
      <TotalSkeleton variant="rectangular" />
      <FlexBox mt="46px">
        <BottomSkeleton variant="rectangular" />
      </FlexBox>
    </MySupplyBox>
  )
}
