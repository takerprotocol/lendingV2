import { Skeleton, styled, Box } from '@mui/material'
import { SpaceBetweenBox, FlexBox } from 'styleds'

const StyledSkeleton = styled(Skeleton)`
  background: rgba(223, 228, 250, 0.7);
  border-radius: 0.25rem;
`
const CardSkeleton = styled(Skeleton)`
  background: #f7f7fc;
  border-radius: 0.25rem;
`
const MobileCollateralBox = styled(Box)`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 15.73%, rgba(255, 255, 255, 0) 78.72%);
  backdrop-filter: blur(25px);
  border-radius: 12px;
  padding: 1.75rem 1rem 2.0625rem 1rem;
`
const CardBox = styled(Box)`
  background: #ffffff;
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
`

const MobileCollateralSkeleton = () => {
  return (
    <MobileCollateralBox>
      <SpaceBetweenBox mb="1.25rem">
        <StyledSkeleton variant="rectangular" height="1.5rem" width="9.0625rem" />
        <StyledSkeleton variant="rectangular" height="1.5rem" width="1.5rem" />
      </SpaceBetweenBox>
      <StyledSkeleton variant="rectangular" height="2.875rem" width="100%" />
      {[1, 1, 1, 1, 1, 1, 1].map((index: number) => (
        <CardBox key={`MobileCollateralSkeleton-${index}`}>
          <SpaceBetweenBox>
            <CardSkeleton variant="rectangular" height="1.5rem" width="8.875rem" />
            <CardSkeleton variant="rectangular" height="1.5rem" width="5.125rem" />
          </SpaceBetweenBox>
          <SpaceBetweenBox mt="1.4375rem">
            <CardSkeleton variant="rectangular" height="1rem" width="6.75rem" />
            <CardSkeleton variant="rectangular" height="1rem" width="3.75rem" />
          </SpaceBetweenBox>
          <SpaceBetweenBox mt="0.5625rem">
            <FlexBox>
              <CardSkeleton variant="rectangular" height="1.5rem" width="1.5rem" />
              <CardSkeleton sx={{ marginX: '0.25rem' }} variant="rectangular" height="1.5rem" width="1.5rem" />
              <CardSkeleton sx={{ marginRight: '0.25rem' }} variant="rectangular" height="1.5rem" width="1.5rem" />
              <CardSkeleton variant="rectangular" height="1.5rem" width="1.5rem" />
            </FlexBox>
            <CardSkeleton variant="rectangular" height="1rem" width="3.75rem" />
          </SpaceBetweenBox>
        </CardBox>
      ))}
    </MobileCollateralBox>
  )
}

export default MobileCollateralSkeleton
