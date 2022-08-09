import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import blueChipNFTs from 'assets/images/svg/dashboard/blueChipNFTs.svg'
import growthNFTs from 'assets/images/svg/dashboard/growthNFTs.svg'
import { setDashboardType } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  margin: 38px auto;
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
  &.open {
    background: #14142a;
    box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05);
    ::before {
      content: '';
      display: block;
      position: absolute;
      left: 90px;
      top: 53px;
      border-width: 11px 9px;
      border-style: dashed solid dashed dashed;
      border-color: #14142a transparent transparent transparent;
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
  &.open {
    background: linear-gradient(263.58deg, #7076ff 0%, #796aff 49.95%, #8e6bfd 100%);
    box-shadow: 0px 5px 10px rgba(125, 112, 239, 0.1);
    ::before {
      content: '';
      display: block;
      position: absolute;
      left: 82px;
      top: 53px;
      border-width: 11px 9px;
      border-style: dashed solid dashed dashed;
      border-color: #7b6bff transparent transparent transparent;
    }
  }
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
        <Box mr="8px" width="24px" height="24px" display={type === 1 ? '' : 'none'}>
          <img src={blueChipNFTs} alt="" />
        </Box>
        <Typography variant="subtitle1" color={type === 2 ? '#14142A' : '#ffffff'}>
          Blue Chip NFTs
        </Typography>
      </BlueChipNFTs>
      <GrowthNFTs
        className={type === 2 ? 'open' : ''}
        onClick={() => {
          if (type !== 2) {
            dispatch(setDashboardType(2))
          }
        }}
      >
        <Box mr="8px" width="24px" height="24px" display={type === 2 ? '' : 'none'}>
          <img src={growthNFTs} alt="" />
        </Box>
        <Typography variant="subtitle1" color={type === 1 ? '#14142A' : '#ffffff'}>
          Growth NFTs
        </Typography>
      </GrowthNFTs>
    </FlexBox>
  )
}
