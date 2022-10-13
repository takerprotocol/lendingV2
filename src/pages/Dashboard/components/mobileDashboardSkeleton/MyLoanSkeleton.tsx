import { Box, Skeleton, styled } from '@mui/material'

const TotalSkeleton = styled(Skeleton)`
  width: 155px;
  height: 30px;
  margin-top: 10px;
  background: #eff0f6;
  border-radius: 4px;
`
const BottomSkeleton = styled(Skeleton)`
  width: 372px;
  background: #f7f7fc;
  border-radius: 10px;
`

export default function MyLoanSkeleton() {
  return (
    <Box>
      <TotalSkeleton variant="rectangular" />
      <BottomSkeleton sx={{ height: '74px', marginTop: '48px' }} variant="rectangular" />
      <BottomSkeleton sx={{ height: '336px', marginTop: '36px' }} variant="rectangular" />
    </Box>
  )
}
