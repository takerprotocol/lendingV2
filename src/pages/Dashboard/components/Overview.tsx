import { Typography, Button, Box, styled } from '@mui/material'
import OverviewIcon from 'assets/images/svg/dashboard/overview-icon.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'
import MyCollateralIcon from 'assets/images/svg/dashboard/myCollateral-icon.svg'
import MinMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import CustomizedSlider from 'components/Slider'
import { useState } from 'react'
import ConnectWallet from './ConnectWallet'
import OverviewModal from './OverviewModal'
import { FlexBox } from 'styleds/index'
import { useAddress } from 'state/application/hooks'
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
const NetAPY = styled(Box)`
  padding: 1.5rem;
  height: 14.0625rem;
  background: #f7f7fc;
  border-radius: 0.625rem;
`
const RiskLevel = styled(Box)`
  padding: 10px 14px;
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
export default function Overview(props: any) {
  const [open, handle] = useState<boolean>(false)
  const [type, setType] = useState<number>(1)
  const address = useAddress()
  // const toggleModal = useWalletModalToggle()
  return (
    <Box>
      {address ? (
        <OverviewBox>
          <OverviewFlexBox>
            <Box>
              <Typography component="span" variant="h4" color="#14142A">
                Overview
              </Typography>
            </Box>
            <TopRight sx={{ cursor: 'pointer' }}>
              <Typography variant="body1" component="span" fontWeight="600" marginRight=".625rem">
                Rewards
              </Typography>
              <img src={OverviewIcon} alt="" />
              <Typography variant="subtitle2" component="span" marginLeft=".25rem">
                16.84
              </Typography>
              <Typography variant="body1" component="span" fontWeight="700" marginLeft="1rem">
                Claim {'>'}
              </Typography>
            </TopRight>
          </OverviewFlexBox>
          <OverviewFlexBox>
            <OverviewFlexBox marginTop="1.5rem">
              <NetAPY width="247px">
                <OverviewFlexBox sx={{ justifyContent: 'flex-start' }}>
                  <Typography variant="subtitle2" color="#14142a" marginRight=".375rem">
                    Net APY
                  </Typography>
                  <img width="14px" height="14px" src={greyPrompt} alt="" />
                </OverviewFlexBox>
                <Box marginTop=".25rem">
                  <Typography component="span" variant="h4" fontWeight="600" marginBottom="1.375rem" color="#14142A">
                    15%
                  </Typography>
                </Box>
                <Box sx={{ opacity: '0.5', border: ' 0.5px solid #D9DBE9', marginTop: '22px' }}></Box>
                <OverviewFlexBox sx={{ justifyContent: 'flex-start', marginTop: '1.4375rem' }}>
                  <Box>
                    <Typography component="p" variant="h5" fontWeight="600" color="#6E7191">
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
                  <Typography variant="subtitle2" color="#14142a" marginRight=".375rem">
                    My Collateral
                  </Typography>
                  <img width="14px" height="14px" src={greyPrompt} alt="" />
                </OverviewFlexBox>
                <img src={MyCollateralIcon} alt="" />
                <Typography component="span" variant="h4" fontWeight="600" marginLeft=".4375rem" color="#14142A">
                  26.74
                </Typography>
                <Box sx={{ opacity: '0.5', border: ' 0.5px solid #D9DBE9', marginTop: '22px' }}></Box>
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
                    <Typography
                      component="p"
                      variant="h1"
                      fontWeight="600"
                      fontSize=".875rem"
                      lineHeight="1.375rem"
                      color="#A0A3BD"
                    >
                      ETH Collateral
                    </Typography>
                  </Box>
                </OverviewFlexBox>
              </NetAPY>
            </OverviewFlexBox>
            <Box ml="6.125rem" mt="1.4375rem" width="470px">
              <Box sx={{ width: '466' }}>
                <RiskLevel>
                  <Box>
                    <Typography component="span" fontWeight="600" color="#14142A" variant="body1">
                      Risk Level
                    </Typography>
                    <Typography component="span" ml="1.75rem" variant="body2" color="#9A96A2">
                      180%
                    </Typography>
                  </Box>
                  <FlexBox mt=".25rem">
                    <Typography
                      component="span"
                      fontSize="1.5rem"
                      lineHeight="2.375rem"
                      fontWeight="700"
                      color="#4BC8B1"
                      variant="h1"
                    >
                      HEALTHY
                    </Typography>
                    <Box ml="8px" width="16px" height="16px">
                      <img src={greyPrompt} alt="" />
                    </Box>
                  </FlexBox>
                </RiskLevel>
                <Box>
                  <CustomizedSlider></CustomizedSlider>
                  <Box mt="10px" display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1" fontWeight="600" component="h1" color="#4E4B66">
                      My Debt 3.09 ETH
                    </Typography>
                    <Typography variant="body1" component="h1" fontWeight="600" color="#4E4B66">
                      Borrow Limit 18.09 ETH
                    </Typography>
                  </Box>
                </Box>
                <OverviewFlexBox
                  sx={{
                    mt: '24px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    sx={{ marginRight: '12px' }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setType(2)
                      handle(true)
                    }}
                  >
                    Repay
                  </Button>
                  {props.type === 2 ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setType(1)
                        handle(true)
                      }}
                    >
                      Borrow
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setType(1)
                        handle(true)
                      }}
                    >
                      Borrow
                    </Button>
                  )}
                </OverviewFlexBox>
              </Box>
            </Box>
          </OverviewFlexBox>
        </OverviewBox>
      ) : (
        <ConnectWallet type={props.type}></ConnectWallet>
      )}
      <OverviewModal open={open} type={type} handle={handle}></OverviewModal>
    </Box>
  )
}
