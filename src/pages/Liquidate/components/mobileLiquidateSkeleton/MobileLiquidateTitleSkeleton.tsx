import { Box, Skeleton, styled } from '@mui/material'

const SkeletonBox = styled(Box)`
  background: #ffffff;
  padding: 1.375rem 0rem 1.1875rem 1rem;
  border-top-left-radius: 0.75rem;
  margin-top: -0.8125rem;
  border-top-right-radius: 0.75rem;
`
const TotalSkeleton = styled(Skeleton)`
  width: 4.5rem;
  height: 1.0625rem;
  background: #f7f7fc;
  border-radius: 0.25rem;
`
const BottomSkeleton = styled(Skeleton)`
  width: 9.3125rem;
  height: 0.75rem;
  background: #f7f7fc;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
`

export default function MobileLiquidateTitleSkeleton() {
  return (
    <SkeletonBox>
      <TotalSkeleton variant="rectangular" />
      <BottomSkeleton variant="rectangular" />
    </SkeletonBox>
  )
}
