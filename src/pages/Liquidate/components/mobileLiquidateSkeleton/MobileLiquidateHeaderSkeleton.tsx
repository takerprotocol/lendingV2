import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds'

const SkeletonBox = styled(Box)`
  padding: 0rem 0rem 0rem 1rem;
`
const TotalSkeleton = styled(Skeleton)`
  width: 9.8125rem;
  height: 1.1875rem;
  background: #322f46;
  border-radius: 0.25rem;
`
const BottomSkeleton = styled(Skeleton)`
  width: 13.1875rem;
  height: 8.8125rem;
  background: #322f46;
  border-radius: 0.625rem;
  margin-right: 0.5rem;
`
const Skeletons = styled(Skeleton)`
  background: #322f46;
  width: 8.75rem;
  height: 8.8125rem;
  border-top-left-radius: 0.625rem;
  border-bottom-left-radius: 0.625rem;
`

export default function MobileLiquidateHeaderSkeleton() {
  return (
    <SkeletonBox>
      <TotalSkeleton variant="rectangular" />
      <FlexBox mt="1.75rem">
        <BottomSkeleton variant="rectangular" />
        <Skeletons variant="rectangular" />
      </FlexBox>
    </SkeletonBox>
  )
}
