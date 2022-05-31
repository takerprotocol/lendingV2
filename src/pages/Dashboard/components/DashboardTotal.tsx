import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TotalBorrowedIcon from 'assets/images/svg/dashboard/total-borrowed.svg'
import TotalLiquidityIcon from 'assets/images/svg/dashboard/total-liquidity.svg'
import TopLiquidity from 'assets/images/svg/dashboard/top-liquidity.svg'
import BottomLiquidity from 'assets/images/svg/dashboard/bottom-liquidity.svg'

const FlexBox = styled(Box)`
  height: 62px;
  display: flex;
  align-items: center;
`
export default function DashboardTotal() {
  return (
    <Box mt="56px">
      <FlexBox>
        <FlexBox sx={{ justifyContent: 'flex-start' }}>
          <Box marginLeft="23px">
            <img src={TotalLiquidityIcon} alt=" " />
          </Box>
          <Box marginLeft="24px">
            <Box marginY="0px">
              <Typography component="span" variant="subtitle1" lineHeight="18px" color=" #14142A" marginRight="8px">
                Total Liquidity
              </Typography>
              <img src={TopLiquidity} alt="" />
            </Box>
            <Box marginTop="16px">
              <img src={BottomLiquidity} alt="" />
              <Typography component="span" variant="h4" marginLeft="6px" lineHeight="28px" color="#14142A">
                {' '}
                174,236.01
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginLeft: '55px' }}>
            <Typography component="p" fontWeight="500" variant="subtitle2" color="#6E7191">
              ETH Supply
            </Typography>
            <Typography component="p" marginTop="10px" fontWeight="500" variant="subtitle2" color="#6E7191">
              NFT Collaterals
            </Typography>
          </Box>
          <Box sx={{ marginLeft: '10px' }}>
            <Typography component="p" variant="subtitle2" color="#262338">
              98,189.50 ETH{' '}
            </Typography>
            <Typography component="p" marginTop="10px" variant="subtitle2" color="#262338">
              76,046.50 ETH
            </Typography>
          </Box>
        </FlexBox>
        <FlexBox sx={{ marginLeft: '120px', justifyContent: 'flex-start' }}>
          <Box>
            <img src={TotalBorrowedIcon} alt="" />
          </Box>
          <Box sx={{ marginLeft: '24px' }}>
            <Box>
              <Typography component="span" variant="subtitle1" lineHeight="18px" color=" #14142A">
                Total Liquidity
              </Typography>
            </Box>
            <Box marginTop="16px">
              <img src={BottomLiquidity} alt="" />
              <Typography component="span" variant="h4" marginLeft="6px" lineHeight="28px" color=" #14142A">
                {' '}
                174,236.01
              </Typography>
            </Box>
          </Box>
        </FlexBox>
      </FlexBox>
    </Box>
  )
}
