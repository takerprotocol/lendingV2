import { Typography, Button, Box, styled } from '@mui/material'
import OverviewIcon from 'assets/images/svg/dashboard/overview-icon.svg'
import PromptIcon from 'assets/images/svg/dashboard/prompt-icon.svg'
import OverviewLine from 'assets/images/svg/dashboard/overview-line.svg'
import MyCollateralIcon from 'assets/images/svg/dashboard/myCollateral-icon.svg'
import MinMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import CustomizedSlider from 'components/Slider'
const OverviewBox = styled(Box)`
  width: 72.4375rem;
  height: 21.375rem;
  background: #ffffff;
  box-shadow: 0rem 0.625rem 1.25rem rgba(218, 218, 238, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-style: normal;
  margin-top: 48px;
`
const OverviewFlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TopRight = styled(Box)`
  height: 3rem;
  background: #f7f7fc;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  padding: 0.875rem 1rem;
`
const OverviewTypography = styled(Typography)`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: #14142a;
`
const NetAPY = styled(Box)`
  padding: 1.5rem;
  height: 14.0625rem;
  background: #f7f7fc;
  border-radius: 0.625rem;
`
const RiskLevel = styled(Box)`
  padding: 0.625rem 0.875rem;
  width: 9.75rem;
  height: 5.25rem;
  background: #f7f7fc;
  border-radius: 0.375rem;
  position: relative;
  margin-bottom: 15px;
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: 72px;
    top: 84px;
    border-width: 11.5px 7.5px;
    border-style: dashed solid dashed dashed;
    border-color: #f7f7fc transparent transparent transparent;
  }
`
export default function Overview() {
  return (
    <OverviewBox>
      <OverviewFlexBox>
        <Box>
          <Typography component="span" variant="h4" color="#14142A">
            Overview
          </Typography>
        </Box>
        <TopRight>
          <OverviewTypography variant="h1" marginRight=".625rem">
            {' '}
            Rewards
          </OverviewTypography>
          <img src={OverviewIcon} alt="" />
          <OverviewTypography variant="h1" marginLeft=".25rem">
            {' '}
            16.84
          </OverviewTypography>
          <OverviewTypography variant="h1" marginLeft="1rem">
            {' '}
            Claim {'>'}
          </OverviewTypography>
        </TopRight>
      </OverviewFlexBox>
      <OverviewFlexBox>
        <OverviewFlexBox marginTop="1.5rem">
          <NetAPY>
            <OverviewFlexBox sx={{ justifyContent: 'flex-start' }}>
              <OverviewTypography fontSize="1rem" variant="h1" lineHeight="1.625rem" marginRight=".375rem">
                Net APY
              </OverviewTypography>
              <img src={PromptIcon} alt="" />
            </OverviewFlexBox>
            <Box marginTop=".25rem">
              <Typography component="span" variant="h4" fontWeight="600" marginBottom="1.375rem" color="#14142A">
                15%
              </Typography>
            </Box>
            <img src={OverviewLine} alt="" />
            <OverviewFlexBox sx={{ justifyContent: 'flex-start', marginTop: '1.4375rem' }}>
              <Box>
                <Typography component="p" variant="h4" fontWeight="600" color="#6E7191">
                  25%
                </Typography>
                <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                  Earned APY
                </Typography>
              </Box>
              <Box ml={'1.3125rem'}>
                <Typography component="p" variant="h5" fontWeight="600" color="#6E7191">
                  10%
                </Typography>
                <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                  Borrow APY
                </Typography>
              </Box>
            </OverviewFlexBox>
          </NetAPY>
          <NetAPY marginLeft="1.5rem">
            <OverviewFlexBox sx={{ justifyContent: 'flex-start', marginBottom: '.25rem' }}>
              <OverviewTypography fontSize="1rem" variant="h1" lineHeight="1.625rem" marginRight=".375rem">
                My Collateral
              </OverviewTypography>
              <img src={PromptIcon} alt="" />
            </OverviewFlexBox>
            <img src={MyCollateralIcon} alt="" />
            <Typography component="span" variant="h4" fontWeight="600" marginLeft=".4375rem" color="#14142A">
              26.74
            </Typography>
            <img src={OverviewLine} alt="" />
            <OverviewFlexBox sx={{ justifyContent: 'flex-start', marginTop: '1.4375rem' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={MinMyCollateralIcon} alt="" />
                  <Typography component="span" marginLeft=".375rem" variant="h5" fontWeight="600" color="#6E7191">
                    10.00
                  </Typography>
                </Box>
                <Typography
                  component="p"
                  variant="h1"
                  fontWeight="600"
                  fontSize=".875rem"
                  lineHeight="1.375rem"
                  color="#A0A3BD"
                >
                  NFT Collateral
                </Typography>
              </Box>
              <Box ml="1.75rem">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={MinMyCollateralIcon} alt="" />
                  <Typography component="span" marginLeft=".375rem" variant="h5" fontWeight="600" color="#6E7191">
                    16.74
                  </Typography>
                </Box>
                <Typography component="p" variant="body2" fontWeight="600" color="#A0A3BD">
                  ETH Collateral
                </Typography>
              </Box>
            </OverviewFlexBox>
          </NetAPY>
        </OverviewFlexBox>
        <Box ml="6.125rem" mt="1.4375rem">
          <Box sx={{ width: '466' }}>
            <RiskLevel>
              <Box>
                <Typography component="span" fontWeight="600" color="#14142A" variant="body2">
                  Risk Level
                </Typography>
                <Typography component="span" ml="1.75rem" variant="body2" color="#9A96A2">
                  180%
                </Typography>
              </Box>
              <Box mt=".25rem">
                <Typography
                  component="span"
                  fontSize="1.5rem"
                  lineHeight="2.375rem"
                  fontWeight="700"
                  color="#4BC8B1"
                  variant="h1"
                  mr=".5rem"
                >
                  HEALTHY
                </Typography>
                <img width="1rem" height="1rem" src={PromptIcon} alt="" />
              </Box>
            </RiskLevel>
            <Box>
              <CustomizedSlider></CustomizedSlider>
            </Box>
            <OverviewFlexBox
              sx={{
                mt: '24px',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                disableRipple={true}
                sx={{
                  width: '118px',
                  height: '48px',
                  mr: '12px',
                  background: '#F7F7FC',
                  borderRadius: '6px',
                  color: '#373737',
                }}
              >
                Repay
              </Button>
              <Button variant="contained" color="primary">
                Borrow
              </Button>
            </OverviewFlexBox>
          </Box>
        </Box>
      </OverviewFlexBox>
    </OverviewBox>
  )
}
