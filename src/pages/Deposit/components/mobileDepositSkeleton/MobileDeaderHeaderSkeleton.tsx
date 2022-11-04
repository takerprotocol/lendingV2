import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds'

const HeaderSkeletonBox = styled(Box)`
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem 1rem 0.75rem 1rem;
`
const Skeletons = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 4px;
`
const BottomSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 3.75rem;
  width: 7.4375rem;
  height: 1.9375rem;
  margin: 0 auto;
`

export default function MobileDeaderHeaderSkeleton() {
  return (
    <HeaderSkeletonBox>
      <FlexBox mb="1rem">
        <Skeletons sx={{ width: '4rem', height: '4rem' }} variant="rectangular" />
        <Box ml="1.375rem">
          <Skeletons sx={{ width: '8.0625rem', height: '1.1875rem' }} variant="rectangular" />
          <Skeletons sx={{ width: '6.4375rem', height: '0.8125rem', marginTop: '0.625rem' }} variant="rectangular" />
        </Box>
      </FlexBox>
      <Skeletons sx={{ width: '100%', height: '3.8125rem', borderRadius: '0.375rem' }} variant="rectangular" />
      <FlexBox ml="0.75rem" my="1rem">
        <Box>
          <Skeletons sx={{ width: '3.8125rem', height: '0.8125rem' }} variant="rectangular" />
          <Skeletons sx={{ width: '4.625rem', height: '1.125rem', marginTop: '0.4375rem' }} variant="rectangular" />
        </Box>
        <Box ml="4.625rem">
          <Skeletons sx={{ width: '3.8125rem', height: '0.8125rem' }} variant="rectangular" />
          <Skeletons sx={{ width: '4.625rem', height: '1.125rem', marginTop: '0.4375rem' }} variant="rectangular" />
        </Box>
      </FlexBox>
      <BottomSkeleton variant="rectangular" />
    </HeaderSkeletonBox>
  )
}
