import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds'

const ListSkeletonBox = styled(Box)`
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 1rem 0rem 2.125rem 0rem;
`
export const FlexStartBox = styled(Box)`
  display: flex;
  align-items: flex-start;
`
const TitleSkeletons = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 4px;
  width: 7.8125rem;
  height: 1.5625rem;
`
const Skeletons = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 4px;
`
const ListBox = styled(FlexBox)`
  background: #ffffff;
  border-radius: 0.625rem;
  padding: 1rem 0rem 0.875rem 0.8125rem;
  margin-bottom: 0.5rem;
`

export default function MobileDeaderListSkeleton() {
  return (
    <ListSkeletonBox>
      <TitleSkeletons variant="rectangular" />
      {[1, 2, 3, 4, 5, 6].map((el: number, index: number) => (
        <ListBox key={`MobileDeaderListSkeleton${index}`}>
          <Skeletons sx={{ width: '1.25rem', height: '1.25rem', margin: 'auto 0' }} variant="rectangular" />
          <Box ml="0.8125rem">
            <FlexStartBox mb="1rem">
              <Skeletons sx={{ width: '3rem', height: '3rem', marginRight: '0.5rem' }} variant="rectangular" />
              <Skeletons sx={{ width: '8.5625rem', height: '0.875rem' }} variant="rectangular" />
            </FlexStartBox>
            <Skeletons
              sx={{ width: '7.9375rem', height: '1.875rem', borderRadius: '0.375rem' }}
              variant="rectangular"
            />
          </Box>
        </ListBox>
      ))}
    </ListSkeletonBox>
  )
}
