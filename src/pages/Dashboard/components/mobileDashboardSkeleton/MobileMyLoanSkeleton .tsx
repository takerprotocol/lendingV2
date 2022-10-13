import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'
const MobileMyLoanSkeletonBox = styled(Box)`
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem 1rem 1.25rem 1rem;
  margin: 0.5rem 1rem 1rem 1rem;
`
const Skeletons = styled(Skeleton)`
  background: rgba(239, 240, 246);
  border-radius: 0.25rem;
  max-height: 3rem;
`

export default function MobileMyLoanSkeleton() {
  return (
    <MobileMyLoanSkeletonBox>
      <SpaceBetweenBox>
        <Box>
          <Skeletons
            variant="rectangular"
            sx={{ mb: '1.6875rem', width: '6.6875rem', height: '1.3125rem' }}
          ></Skeletons>
          <Skeletons
            variant="rectangular"
            sx={{ mb: '0.6875rem', width: '3.5625rem', height: '0.6875rem' }}
          ></Skeletons>
          <Skeletons sx={{ width: '5.0625rem', height: '0.875rem' }}></Skeletons>
        </Box>
        <FlexBox mt="2.9375rem">
          <Skeletons variant="rectangular" sx={{ width: '5.1875rem', mr: '0.5rem', height: '2.5rem' }}></Skeletons>
          <Skeletons variant="rectangular" sx={{ width: '5.1875rem', height: '2.5rem' }}></Skeletons>
        </FlexBox>
      </SpaceBetweenBox>
    </MobileMyLoanSkeletonBox>
  )
}
