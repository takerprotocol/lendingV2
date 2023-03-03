import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import blueChipNFTs from 'assets/images/svg/dashboard/blueChipNFTs.svg'
import growthNFTs from 'assets/images/svg/dashboard/growthNFTs.svg'
import growthNFTsBefore from 'assets/images/svg/dashboard/growthNFTsBefore.svg'
import blueChipNFTBefore from 'assets/images/svg/dashboard/ blueChipNFTBefore.svg'
import { setDashboardType } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  margin: 38px auto;
  margin-bottom: 24px;
  width: 1208px;
`
const BlueChipNFTs = styled(Box)`
  padding: 12px 24px;
  height: 53px;
  display: flex;
  align-items: center;
  border-radius: 115px;
  cursor: pointer;
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  img {
    display: none;
  }
  &.open {
    background: #14142a;
    padding: 12px 24px 12px 17px;
    box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05);
    img {
      display: block;
      margin-right: 8px;
    }
  }
`
const GrowthNFTs = styled(Box)`
  padding: 12px 24px;
  height: 53px;
  margin-left: 8px;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 115px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 8px;
  img {
    display: none;
  }
  &.open {
    padding: 12px 24px 12px 17px;
    background: linear-gradient(263.58deg, #7076ff 0%, #796aff 49.95%, #8e6bfd 100%);
    box-shadow: 0px 5px 10px rgba(125, 112, 239, 0.1);
    img {
      display: block;
      margin-right: 8px;
    }
  }
`
const BeforeImg = styled(`img`)`
  position: absolute;
  top: calc(100% - 16px);
  left: calc(50% - 19px);
`
interface BlueChipGrowthNFTs {
  type: number
}
export default function ChipNFTs({ type }: BlueChipGrowthNFTs) {
  const dispatch = useAppDispatch()
  return (
    <FlexBox>
      <BlueChipNFTs
        className={type === 1 ? 'open' : ''}
        onClick={() => {
          if (type !== 1) {
            dispatch(setDashboardType(1))
          }
        }}
      >
        <img width="24px" height="24px" src={blueChipNFTs} alt="" />
        <Typography variant="subtitle1" color={type === 2 ? '#14142A' : '#ffffff'}>
          Blue Chip NFTs
        </Typography>
        <BeforeImg src={blueChipNFTBefore}></BeforeImg>
      </BlueChipNFTs>
      <GrowthNFTs
        className={type === 2 ? 'open' : ''}
        onClick={() => {
          if (type !== 2) {
            dispatch(setDashboardType(2))
          }
        }}
      >
        <img width="24px" height="24px" src={growthNFTs} alt="" />
        <Typography variant="subtitle1" color={type === 1 ? '#14142A' : '#ffffff'}>
          Growth NFTs
        </Typography>
        <BeforeImg src={growthNFTsBefore}></BeforeImg>
      </GrowthNFTs>
    </FlexBox>
  )
}
