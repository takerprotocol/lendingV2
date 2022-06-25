import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds/index'
const MySupplyBox = styled(Box)`
  margin-top: 12px;
`
const TotalSkeleton = styled(Skeleton)`
  width: 124px;
  height: 25px;
  background: #eff0f6;
  border-radius: 4px;
`
const BottomSkeleton = styled(Skeleton)`
  width: 494px;
  height: 98px;
  margin-right: 24px;
  background: #eff0f6;
  border-radius: 12px;
`

export default function NFTPoolSkeleton() {
  return (
    <MySupplyBox>
      <Box>
        <TotalSkeleton variant="rectangular" />
      </Box>
      <FlexBox mt="32px">
        <BottomSkeleton variant="rectangular" />
        <BottomSkeleton variant="rectangular" />
      </FlexBox>
    </MySupplyBox>
  )
}
