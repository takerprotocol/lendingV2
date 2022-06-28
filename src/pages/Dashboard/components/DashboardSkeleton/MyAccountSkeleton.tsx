import { Box, Skeleton, styled } from '@mui/material'
import { SpaceBetweenBox } from 'styleds/index'
const TotalSkeleton = styled(Skeleton)`
  width: 155px;
  height: 30px;
  background: #eff0f6;
  border-radius: 4px;
  margin-top: 10px;
`
const BottomSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 10px;
  width: 322px;
`

export default function MyAccountSkeleton() {
  return (
    <Box>
      <Box>
        <TotalSkeleton variant="rectangular"></TotalSkeleton>
      </Box>
      <SpaceBetweenBox mt="48px">
        <BottomSkeleton sx={{ height: '74px' }} variant="rectangular" />
        <BottomSkeleton sx={{ height: '74px' }} variant="rectangular" />
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="36px">
        <BottomSkeleton sx={{ height: '336px' }} variant="rectangular" />
        <BottomSkeleton sx={{ height: '336px' }} variant="rectangular" />
      </SpaceBetweenBox>
    </Box>
  )
}
