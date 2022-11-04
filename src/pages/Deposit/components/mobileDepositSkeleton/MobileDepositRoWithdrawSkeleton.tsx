import { Skeleton, styled } from '@mui/material'

const Skeletons = styled(Skeleton)`
  border-radius: 0.25rem;
  height: 2.875rem;
  background: #eff0f6;
  border-radius: 2.5rem;
  margin: 1rem 0rem 0rem 0rem;
`
export default function MobileDepositRoWithdrawSkeleton() {
  return <Skeletons variant="rectangular" />
}
