import { Typography, Button, Box, styled } from '@mui/material'
import CustomizedSwitches from 'components/Switch'
const MySupplyBox = styled(Box)`
  width: 494px;
  height: 285px;
  padding: 24px;
  background: linear-gradient(82.46deg, #6994e4 1.88%, #878df8 51.18%, #9378df 100.62%);
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const MySupplyFlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MyETHBox = styled(Box)`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 77px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`

export default function MySupply() {
  return (
    <MySupplyBox>
      <MySupplyFlexBox>
        <Box>
          <Typography component="span" variant="h1" fontWeight="600" fontSize=" 28px" lineHeight="45px" color="#FFFFFF">
            My Supply
          </Typography>
        </Box>
        <MySupplyFlexBox>
          <Typography
            component="span"
            variant="h1"
            fontWeight="600"
            fontSize=" 14px"
            lineHeight="22px"
            color="#FFFFFF"
            mr="16px"
          >
            Used as Collateral
          </Typography>
          <CustomizedSwitches></CustomizedSwitches>
        </MySupplyFlexBox>
      </MySupplyFlexBox>
      <MyETHBox>
        <Typography
          sx={{ opacity: 1 }}
          component="span"
          variant="h1"
          fontWeight="600"
          fontSize=" 28px"
          lineHeight="45px"
          color="#FFFFFF"
        >
          10.06 ETH
        </Typography>
      </MyETHBox>
      <MySupplyFlexBox mt="26px">
        <Box>
          <Box>
            <Typography
              sx={{ opacity: 0.7 }}
              component="p"
              variant="h1"
              fontWeight="600"
              fontSize=" 14px"
              lineHeight="22px"
              color="#FFFFFF"
            >
              My Balance
            </Typography>
          </Box>
          <Box mt="2px">
            <Typography component="p" variant="h1" fontWeight="600" fontSize=" 18px" lineHeight="29px" color="#FFFFFF">
              6.97 ETH
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            disableRipple={true}
            sx={{
              width: '118px',
              height: '48px',
              mr: '12px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              color: '#FFFFFF',
            }}
          >
            Repay
          </Button>
          <Button
            disableRipple={true}
            sx={{
              width: '118px',
              height: '48px',
              color: '#7646FF',
              background: 'linear-gradient(180deg, #F9F8FF 0%, #F8F7FF 100%)',
              boxShadow:
                '0px 4px 4px rgba(124, 115, 226, 0.3), inset 0px -2px 2px rgba(182, 168, 240, 0.3), inset 0px 2px 2px #FFFFFF',
              borderRadius: '6px',
            }}
          >
            Borrow
          </Button>
        </Box>
      </MySupplyFlexBox>
    </MySupplyBox>
  )
}
