import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds/index'

const TopSkeleton = styled(Skeleton)`
  width: 124px;
  height: 25px;
  background: #eff0f6;
  border-radius: 4px;
  margin-top: 10px;
`
const BottomSkeleton = styled(Skeleton)`
  height: 168px;
  background: #f7f7fc;
  border-radius: 10px;
`

export default function ETHPoolSkeleton() {
  return (
    <Box>
      <Box>
        <TopSkeleton variant="rectangular" />
      </Box>
      <FlexBox mt="34px">
        <BottomSkeleton sx={{ width: '224px' }} variant="rectangular" />
        <BottomSkeleton sx={{ marginLeft: '48px', marginRight: '24px', width: '124px' }} variant="rectangular" />
        <BottomSkeleton sx={{ width: '124px' }} variant="rectangular" />
      </FlexBox>
    </Box>
  )
}
