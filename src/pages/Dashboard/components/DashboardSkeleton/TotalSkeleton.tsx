import { Box, Skeleton, styled } from '@mui/material'
import { FlexBox } from 'styleds/index'

const TotalSkeleton = styled(Skeleton)`
  width: 62px;
  height: 62px;
  background: rgba(160, 163, 189, 0.2);
  border-radius: 6px;
`
const TopSkeleton = styled(Skeleton)`
  width: 106px;
  height: 21px;
  background: rgba(160, 163, 189, 0.2);
  border-radius: 4px;
`
const BottomSkeleton = styled(Skeleton)`
  width: 155px;
  height: 25px;
  background: rgba(160, 163, 189, 0.2);
  border-radius: 4px;
  margin-top: 14.5px;
`

export default function DashboardTotalSkeleton() {
  return (
    <FlexBox marginLeft="23px">
      <FlexBox>
        <TotalSkeleton variant="rectangular" />
        <Box ml="24px">
          <TopSkeleton variant="rectangular" />
          <BottomSkeleton variant="rectangular" />
        </Box>
        <Box ml="79px">
          <TopSkeleton variant="rectangular" sx={{ height: '21px', width: '208px' }} />
          <BottomSkeleton variant="rectangular" sx={{ height: '21px', width: '232px', marginTop: '18px' }} />
        </Box>
      </FlexBox>
      <FlexBox ml="164px">
        <TotalSkeleton variant="rectangular" />
        <Box ml="24px">
          <TopSkeleton variant="rectangular" />
          <BottomSkeleton variant="rectangular" />
        </Box>
      </FlexBox>
    </FlexBox>
  )
}
