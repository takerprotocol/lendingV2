import { Box, Skeleton, styled } from '@mui/material'

const DepositHeaderBox = styled(Box)`
  width: 1012px;
  height: 308px;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
`
const TopFlexBox = styled(Box)`
  display: flex;
`
const BottomFlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const DepositHeader = styled(Skeleton)`
  background: #f7f7fc;
  width: 124px;
  height: 124px;
  border-radius: 10px;
`
const TopSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  width: 87px;
  height: 16px;
  border-radius: 4px;
`
const CenterSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  width: 87px;
  height: 25px;
  border-radius: 4px;
  margin: 10px 0px;
`
const BottomSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  width: 470px;
  height: 112px;
  border-radius: 10px;
  margin-top: 24px;
`
export default function DepositHeaderSkeleton() {
  return (
    <DepositHeaderBox>
      <TopFlexBox>
        <Box>
          <DepositHeader variant="rectangular" />
        </Box>
        <TopFlexBox ml="24px" pt="35px">
          <Box>
            <DepositHeader variant="rectangular" sx={{ width: '171px', height: '25px', borderRadius: '4px' }} />
            <CenterSkeleton variant="rectangular" sx={{ width: '115px', height: '16px', borderRadius: '4px' }} />
          </Box>
          <Box ml="89px">
            <TopSkeleton variant="rectangular" />
            <CenterSkeleton variant="rectangular" />
            <TopSkeleton variant="rectangular" />
          </Box>
          <Box ml="114px">
            <TopSkeleton variant="rectangular" />
            <CenterSkeleton variant="rectangular" />
          </Box>
          <Box ml="76px">
            <TopSkeleton variant="rectangular" />
            <CenterSkeleton variant="rectangular" />
            <TopSkeleton variant="rectangular" />
          </Box>
        </TopFlexBox>
      </TopFlexBox>
      <BottomFlexBox>
        <BottomSkeleton variant="rectangular"></BottomSkeleton>
        <BottomSkeleton variant="rectangular"></BottomSkeleton>
      </BottomFlexBox>
    </DepositHeaderBox>
  )
}
