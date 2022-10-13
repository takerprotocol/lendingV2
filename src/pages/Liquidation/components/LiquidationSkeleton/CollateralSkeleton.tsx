import { Skeleton, styled, Box } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'

const StyledSkeleton = styled(Skeleton)`
  width: 240px;
  height: 48px;
  background: rgba(223, 228, 250, 0.7);
  border-radius: 12px;
  margin-bottom: 46px;
`
const Skeletons = styled(Skeleton)`
  width: 240px;
  height: 48px;
  background: rgba(223, 228, 250, 0.7);
  border-radius: 50px;
`
const SkeletonR = styled(Skeleton)`
  width: 155px;
  height: 26px;
  background: #f1f3fd;
  border-radius: 4px;
`
const BoxR = styled(Box)`
  width: 343px;
  height: 54px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(208, 217, 244, 0.15);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 40px;
`

const CollateralSkeleton = () => {
  return (
    <SpaceBetweenBox p="27px 50px 0 50px">
      <Box>
        <StyledSkeleton variant="rectangular" />
        <FlexBox>
          <Skeletons sx={{ marginRight: '22px' }} variant="rectangular" />
          <Skeletons variant="rectangular" />
        </FlexBox>
      </Box>
      <Box>
        <BoxR>
          <SkeletonR variant="rectangular"></SkeletonR>
        </BoxR>
        <Skeletons sx={{ marginLeft: '103px' }} variant="rectangular" />
      </Box>
    </SpaceBetweenBox>
  )
}

export default CollateralSkeleton
