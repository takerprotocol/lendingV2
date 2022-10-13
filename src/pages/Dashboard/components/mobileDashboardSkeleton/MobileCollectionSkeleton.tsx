import { Box, Skeleton, styled } from '@mui/material'

const CollectionSkeletonBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem 2.25rem 1rem;
  transform: matrix(1, 0, 0, -1, 0, 0);
`
const TotalSkeleton = styled(Skeleton)`
  background: #eff0f6;
  border-radius: 0.25rem;
`
const Skeletons = styled(Skeleton)`
  background: #ffffff;
  border-radius: 0.5rem;
  width: 100%;
  height: 10rem;
  margin-top: 1rem;
`
// const BottomSkeleton = styled(Skeleton)`
//   width: 1160px;
//   height: 48px;
//   background: rgba(239, 240, 246, 0.5);
//   border-radius: 12px;
//   margin-bottom: 48px;
// `

export default function MobileCollectionSkeleton() {
  return (
    <CollectionSkeletonBox>
      <TotalSkeleton
        sx={{ marginBottom: '0.5625rem', width: '6.6875rem', height: '1.3125rem' }}
        variant="rectangular"
      ></TotalSkeleton>
      <TotalSkeleton sx={{ width: '11.5625rem', height: '0.875rem' }} variant="rectangular"></TotalSkeleton>
      <Skeletons variant="rectangular"></Skeletons>
      <Skeletons variant="rectangular"></Skeletons>
      <Skeletons variant="rectangular"></Skeletons>
      <Skeletons variant="rectangular"></Skeletons>
    </CollectionSkeletonBox>
  )
}
