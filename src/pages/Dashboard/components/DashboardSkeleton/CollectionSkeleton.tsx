import { Box, Skeleton, styled } from '@mui/material'

const TopSkeleton = styled(Skeleton)`
  width: 1160px;
  height: 74px;
  background: #eff0f6;
  border-radius: 12px;
  margin-bottom: 24px;
`
const BottomSkeleton = styled(Skeleton)`
  width: 1160px;
  height: 48px;
  background: rgba(239, 240, 246, 0.5);
  border-radius: 12px;
  margin-bottom: 48px;
`
export default function CollectionSkeleton() {
  return (
    <Box>
      <TopSkeleton variant="rectangular" />
      <BottomSkeleton variant="rectangular" />
      <BottomSkeleton variant="rectangular" sx={{ background: 'rgba(239, 240, 246, 0.4)' }} />
      <BottomSkeleton variant="rectangular" sx={{ background: 'rgba(239, 240, 246, 0.2)' }} />
      <BottomSkeleton variant="rectangular" sx={{ background: 'rgba(239, 240, 246, 0.2)' }} />
    </Box>
  )
}