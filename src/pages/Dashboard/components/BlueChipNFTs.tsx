import { styled } from '@mui/material/styles'
import { Link, Box, Typography } from '@mui/material'
import { useState } from 'react'
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  width: 344px;
  height: 53px;
  background: rgba(160, 163, 189, 0.2);
  border-radius: 40px;
  margin-left: 111px;
  margin-top: 30px;
  a {
    cursor: pointer;
  }
  .open {
    background: #14142a;
    box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05);
  }
`
const BlueChipNFTs = styled(Box)`
  padding: 8px 24px;
  height: 45px;
  border-radius: 115px;
  cursor: pointer;
`
export default function ChipNFTs({ changeCheck }: any) {
  const [check, setCheck] = useState<number>(1)
  return (
    <FlexBox>
      <BlueChipNFTs
        className={check === 1 ? 'open' : ''}
        onClick={() => {
          if (check !== 1) {
            setCheck(1)
            changeCheck(1)
          }
        }}
      >
        <Link underline="none">
          <Typography component="span" variant="subtitle1" color={check === 2 ? '#14142A' : '#ffffff'}>
            Blue Chip NFTs
          </Typography>
        </Link>
      </BlueChipNFTs>
      <BlueChipNFTs
        className={check === 2 ? 'open' : ''}
        onClick={() => {
          if (check !== 2) {
            setCheck(2)
            changeCheck(2)
          }
        }}
      >
        <Link underline="none">
          <Typography component="span" variant="subtitle1" color={check === 1 ? '#14142A' : '#ffffff'}>
            Growth NFTs
          </Typography>
        </Link>
      </BlueChipNFTs>
    </FlexBox>
  )
}
