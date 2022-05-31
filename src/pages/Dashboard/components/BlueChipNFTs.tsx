import { styled } from '@mui/material/styles'
import { Link, Box, Typography } from '@mui/material'
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  width: 372px;
  height: 53px;
  background: rgba(160, 163, 189, 0.2);
  border-radius: 40px;
  margin-left: 111px;
  margin-top: 30px;
`
const BlueChipNFTs = styled(Box)`
  padding: 8px 24px;
  height: 45px;
  background: #14142a;
  box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05);
  border-radius: 115px;
`
const AggressiveNFT = styled(Box)`
  padding: 8px 24px;
  height: 45px;
  box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05);
  border-radius: 115px;
`
export default function ChipNFTs() {
  return (
    <FlexBox>
      <BlueChipNFTs>
        <Link underline="none">
          <Typography component="span" variant="subtitle1" color="#FFFFFF">
            Blue Chip NFTs
          </Typography>
        </Link>
      </BlueChipNFTs>
      <AggressiveNFT>
        <Link underline="none">
          <Typography component="span" variant="subtitle1" color="#000000">
            Aggressive NFT
          </Typography>
        </Link>
      </AggressiveNFT>
    </FlexBox>
  )
}
