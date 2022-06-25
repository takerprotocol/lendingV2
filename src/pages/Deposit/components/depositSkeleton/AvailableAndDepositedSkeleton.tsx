import { Skeleton, styled } from '@mui/material'
import { SpaceBetweenBox } from 'styleds/index'

const AvailableSkeleton = styled(Skeleton)`
  background: #eff0f6;
  border-radius: 6px;
`
export default function AvailableAndDepositedSkeleton() {
  return (
    <SpaceBetweenBox mb="31px">
      <AvailableSkeleton variant="rectangular" sx={{ width: '203px', height: '25px' }} />
      <AvailableSkeleton variant="rectangular" sx={{ marginRight: '24px', width: '118px', height: '48px' }} />
    </SpaceBetweenBox>
  )
}
