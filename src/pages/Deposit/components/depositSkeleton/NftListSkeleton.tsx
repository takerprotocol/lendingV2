import { Box, Skeleton, styled } from '@mui/material'

const NftBox = styled(Box)`
  width: 305px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #f7f7fc;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: flex-start;
`
const NftSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 6px;
  width: 74px;
  height: 30px;
`
export default function NftListSkeleton() {
  return (
    <NftBox>
      <FlexBox>
        <NftSkeleton sx={{ height: '74px' }} variant="rectangular" />
        <NftSkeleton sx={{ width: '146px', height: '25px', marginLeft: '12px' }} variant="rectangular" />
      </FlexBox>
      <FlexBox mt="16px">
        <NftSkeleton variant="rectangular" />
        <NftSkeleton sx={{ marginLeft: '12px' }} variant="rectangular" />
      </FlexBox>
    </NftBox>
  )
}
