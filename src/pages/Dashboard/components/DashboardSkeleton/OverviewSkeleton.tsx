import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds/index'

const TotalSkeleton = styled(Skeleton)`
  width: 123px;
  height: 25px;
  background: #eff0f6;
  border-radius: 4px;
  margin-top: 10px;
`
const BottomSkeleton = styled(Skeleton)`
  height: 225px;
  background: #f7f7fc;
  border-radius: 10px;
`

export default function OverviewSkeleton() {
  return (
    <Box>
      <Box>
        <TotalSkeleton variant="rectangular" />
      </Box>
      <FlexBox mt="34px">
        <BottomSkeleton sx={{ width: '247px' }} variant="rectangular" />
        <BottomSkeleton sx={{ marginLeft: '24px', marginRight: '98px', width: '272px' }} variant="rectangular" />
        <BottomSkeleton sx={{ width: '470px' }} variant="rectangular" />
      </FlexBox>
    </Box>
  )
}
