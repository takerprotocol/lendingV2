import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'

const SkeletonBox = styled(Box)``
const ListBox = styled(FlexBox)`
  padding: 1rem 1rem 0.875rem 0.8125rem;
  margin-bottom: 0.5rem;
`
const TotalSkeleton = styled(Skeleton)`
  width: 6.8125rem;
  height: 1.5625rem;
  background: #f7f7fc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`
const Skeletons = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 0.25rem;
`
export default function MobileNFTCollateralsSkeleton() {
  return (
    <SkeletonBox>
      <TotalSkeleton variant="rectangular" />
      {[1, 2, 3, 4].map((el: number, index: number) => (
        <ListBox key={`MobileNFTCollateralsSkeleton${index}`}>
          <Skeletons sx={{ width: '1.25rem', height: '1.25rem', margin: 'auto 0' }} variant="rectangular" />
          <Box ml="0.8125rem">
            <FlexBox mb="1rem">
              <Skeletons sx={{ width: '3rem', height: '3rem' }} variant="rectangular" />
              <Box ml="0.5rem">
                <Skeletons sx={{ width: '5.9375rem', height: '0.875rem' }} variant="rectangular" />
                <Skeletons sx={{ width: '8.5rem', height: '0.875rem', marginTop: '0.625rem' }} variant="rectangular" />
              </Box>
            </FlexBox>
            <SpaceBetweenBox>
              <Skeletons
                sx={{ width: '8rem', height: '1.875rem', borderRadius: '0.375rem', marginRight: '3.8125rem' }}
                variant="rectangular"
              />
              <Skeletons
                sx={{ width: '3.75rem', height: '0.875rem', borderRadius: '0.375rem' }}
                variant="rectangular"
              />
            </SpaceBetweenBox>
          </Box>
        </ListBox>
      ))}
    </SkeletonBox>
  )
}
