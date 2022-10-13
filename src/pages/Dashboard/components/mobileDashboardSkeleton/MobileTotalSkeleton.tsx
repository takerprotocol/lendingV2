import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds'

const MobileTotalSkeletonBox = styled(Box)`
  background: linear-gradient(180deg, rgba(153, 159, 210, 0.1) 0%, rgba(157, 162, 197, 0.0384882) 84.87%);
  padding: 1.25rem 1.125rem 1.9375rem 1.375rem;
  border-radius: 0.5rem;
`
const TopSkeleton = styled(Skeleton)`
  width: 6.4375rem;
  height: 0.875rem;
  background: rgba(160, 163, 189, 0.2);
  margin-bottom: 0.75rem;
  border-radius: 0.25rem;
`
const BottomSkeleton = styled(Skeleton)`
  width: 128px;
  height: 19px;
  background: rgba(160, 163, 189, 0.2);
  opacity: 0.2;
  border-radius: 0.25rem;
`

export default function MobileTotalSkeleton() {
  return (
    <MobileTotalSkeletonBox>
      <FlexBox>
        <Box>
          <TopSkeleton variant="rectangular" />
          <BottomSkeleton variant="rectangular" />
        </Box>
        <Box ml="2.9375rem">
          <TopSkeleton variant="rectangular" />
          <BottomSkeleton variant="rectangular" />
        </Box>
      </FlexBox>
    </MobileTotalSkeletonBox>
  )
}
