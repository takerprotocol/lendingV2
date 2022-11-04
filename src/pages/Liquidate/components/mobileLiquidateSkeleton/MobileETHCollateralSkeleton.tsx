import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds'

const SkeletonBox = styled(Box)``
const TotalSkeleton = styled(Skeleton)`
  width: 6.8125rem;
  height: 1.5625rem;
  background: #f7f7fc;
  border-radius: 0.25rem;
`
const Skeletons = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 0.25rem;
`
const BigSkeletons = styled(Skeleton)`
  width: 100%;
  height: 5.0625rem;
  background: #f7f7fc;
  border-radius: 0.625rem;
  margin-top: 1.5625rem;
`

export default function MobileETHCollateralSkeleton() {
  return (
    <SkeletonBox>
      <TotalSkeleton variant="rectangular" />
      <BigSkeletons variant="rectangular" />
      <FlexBox mt="1.3125rem">
        <Box>
          <Skeletons sx={{ width: '6.375rem', height: '0.875rem' }} variant="rectangular" />
          <Skeletons sx={{ width: '3.6875rem', height: '0.875rem', marginTop: '1.3125rem' }} variant="rectangular" />
        </Box>
        <Box ml="8.0625rem">
          <Skeletons sx={{ width: '3.125rem', height: '0.875rem' }} variant="rectangular" />
          <Skeletons sx={{ width: '3.125rem', height: '0.875rem', marginTop: '1.3125rem' }} variant="rectangular" />
        </Box>
      </FlexBox>
    </SkeletonBox>
  )
}
