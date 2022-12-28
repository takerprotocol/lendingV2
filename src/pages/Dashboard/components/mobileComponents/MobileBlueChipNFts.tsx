import { Box, styled, Typography } from '@mui/material'
import { useDashboardType } from 'state/user/hooks'
import { setDashboardType } from 'state/user/reducer'
import mobileBlueChip from 'assets/images/svg/dashboard/mobileBlueChip.svg'
import mobileGrowthNFTsBefore from 'assets/images/svg/dashboard/mobileGrowthNFTs-before.svg'
import mobileBlueChipNFTsBefore from 'assets/images/svg/dashboard/mobileBlueChipNFTs-before.svg'
import mobileGrowth from 'assets/images/svg/dashboard/mobileGrowth.svg'
import { SpaceBetweenBox } from 'styleds'
import { useAppDispatch } from 'state/hooks'
const BlueChipStyleBox = styled(Box)`
  width: 100%;
  padding: 0.25rem;
  background: rgba(160, 163, 189, 0.2);
  border-radius: 2.5rem;
`
const BlueChipBox = styled(Box)`
  padding: 0.5rem 1.9688rem;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(180deg, rgba(245, 246, 255, 0.3) 0%, rgba(245, 246, 255, 0.3) 100%);
  box-shadow: inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.5625rem;
  &.open {
    background: linear-gradient(180deg, #2d2d50 0%, #14142a 100%);
    box-shadow: 0px 0.3125rem 0.625rem rgba(110, 113, 145, 0.05), inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.2);
    border-radius: 1.5625rem;
    padding: 0.5rem 1.5rem;
  }
`
const GrowthBox = styled(Box)`
  padding: 0.5rem 2.375rem;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(180deg, rgba(245, 246, 255, 0.3) 0%, rgba(245, 246, 255, 0.3) 100%);
  box-shadow: inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.5625rem;
  &.open {
    background: linear-gradient(87.14deg, #8d6cfe 0%, #7176ff 100%);
    box-shadow: 0px 5px 10px rgba(128, 113, 255, 0.2), inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
    border-radius: 1.5625rem;
    padding: 0.5rem 1.9036rem;
  }
`
const ImgGrowthBefore = styled(`img`)`
  position: absolute;
  left: calc(50% - 34px / 2);
  top: calc(100% - 13px);
`
const ImgBlueChipNFTsBefore = styled(`img`)`
  position: absolute;
  left: calc(50% - 34px / 2);
  top: calc(100% - 13px);
`
export default function MobileBlueChipNFts() {
  const type = useDashboardType()
  const dispatch = useAppDispatch()
  return (
    <Box p="0.5rem 1rem 0 1rem">
      <BlueChipStyleBox>
        <SpaceBetweenBox>
          <BlueChipBox
            className={type === 1 ? 'open' : ''}
            onClick={() => {
              if (type !== 1) {
                dispatch(setDashboardType(1))
              }
            }}
          >
            <Box height="1.25rem" mr="0.25rem" display={type === 1 ? '' : 'none'}>
              <img src={mobileBlueChip} alt="" />
            </Box>
            <Typography variant="body1" fontWeight="600" color={type === 2 ? '#14142A' : '#ffffff'}>
              Blue Chip NFTs
            </Typography>
            {type === 1 && <ImgBlueChipNFTsBefore src={mobileBlueChipNFTsBefore}></ImgBlueChipNFTsBefore>}
          </BlueChipBox>
          <GrowthBox
            className={type === 2 ? 'open' : ''}
            onClick={() => {
              if (type !== 2) {
                dispatch(setDashboardType(2))
              }
            }}
          >
            <Box mr="0.1875rem" height="1.25rem" display={type === 2 ? '' : 'none'}>
              <img src={mobileGrowth} alt="" />
            </Box>
            <Typography variant="body1" fontWeight="600" color={type === 1 ? '#14142A' : '#ffffff'}>
              Growth NFTs
            </Typography>
            {type === 2 && <ImgGrowthBefore src={mobileGrowthNFTsBefore}></ImgGrowthBefore>}
          </GrowthBox>
        </SpaceBetweenBox>
      </BlueChipStyleBox>
    </Box>
  )
}
