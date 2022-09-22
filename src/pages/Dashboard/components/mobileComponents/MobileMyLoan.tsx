import { Box, Button, styled, Typography } from '@mui/material'
import mobilePrompt2 from 'assets/images/svg/dashboard/mobilePrompt-2.svg'
import mobileBlackEthLogo from 'assets/images/svg/dashboard/mobileBlackEthLogo.svg'
import mobileDown from 'assets/images/svg/dashboard/mobileDown.svg'
import mobileUp from 'assets/images/svg/dashboard/mobileUp.svg'
import CustomizedSlider from 'components/Slider'
import { FlexBox, SpaceBetweenBox, FlexEndBox } from 'styleds'
import { useState } from 'react'

const MyAssetsBox = styled(Box)`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  .loanButton {
    padding: 0;
    margin-left: 0.5rem;
    min-width: 5.1875rem;
    height: 2.5rem;
  }
  .MuiSlider-root {
    padding: 0;
  }
`
const ClaimBox = styled(Box)`
  display: flex;
  align-items: center;
  background: #f7f7fc;
  border-radius: 0.375rem;
  padding: 0.5rem;
`
const RiskFlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const RiskLevelBox = styled(Box)`
  width: 100%;
  background: #f3f3f8;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  padding: 0 0 1.125rem 0.75rem;
  position: relative;
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: calc(50% - 15px / 2);
    top: 100%;
    border-width: 10.5px 7.5px;
    border-style: dashed solid dashed dashed;
    border-color: #F3F3F8 transparent transparent transparent;
`
const BorrowAPYBox = styled(Box)`
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 0.5rem;
  padding: 1rem 1rem 0.25rem 1rem;
  margin-top: 1.5rem;
`
const FooterBox = styled(Box)`
  background: rgba(217, 217, 217, 0.1);
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem 1.6875rem;
  margin-top: 0.75rem;
  position: relative;
  ::before {
    content: '';
    display: block;
    position: absolute;
    right: calc(50% - 6.5rem);
    bottom: calc(100%);
    border-width: 0.375rem 0.3125rem;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent #f3f3f8 transparent;
  }
`

export default function MobileMyLoan() {
  const [myAssetsType, setMyAssetsType] = useState<boolean>(true)

  return (
    <Box mt="0.5rem">
      <MyAssetsBox
        sx={{ background: `${myAssetsType ? '#ffffff' : 'linear-gradient(180deg, #FFFFFF 0%, #F7F7FC 100%)'}` }}
      >
        <SpaceBetweenBox>
          <FlexBox
            onClick={() => {
              setMyAssetsType(!myAssetsType)
            }}
          >
            <Typography mr="0.5rem" variant="subtitle2" fontWeight="700">
              My Loan
            </Typography>
            <img src={myAssetsType ? mobileDown : mobileUp} alt="" />
          </FlexBox>
          <ClaimBox>
            <Typography mr="0.5rem" color="#4BC8B1" variant="body2" fontWeight="700">
              HEALTHY
            </Typography>
            <Typography mr="0.5rem" color="#A0A3BD" variant="body2" fontWeight="600">
              16.84
            </Typography>
            <img src={mobilePrompt2} alt="" />
          </ClaimBox>
        </SpaceBetweenBox>
        {myAssetsType ? (
          <SpaceBetweenBox mt="1rem">
            <Box ml="0.375rem">
              <Typography variant="body2" color="#A0A3BD">
                My Debt
              </Typography>
              <FlexBox>
                <img src={mobileBlackEthLogo} alt="" />
                <Typography ml="0.4375rem" variant="h5" fontSize="1.125rem" lineHeight="1.8125rem">
                  22.4653
                </Typography>
              </FlexBox>
            </Box>
            <FlexBox>
              <Button className="loanButton" variant="contained" color="secondary">
                <Typography variant="body2" component="span" fontWeight="700">
                  Repay {'>'}
                </Typography>
              </Button>
              <Button className="loanButton" variant="contained">
                <Typography variant="body2" component="span" fontWeight="700" color="#ffffff">
                  Borrow {'>'}
                </Typography>
              </Button>
            </FlexBox>
          </SpaceBetweenBox>
        ) : (
          <>
            <SpaceBetweenBox mt="1rem">
              <Box ml="0.375rem">
                <Typography variant="body2" color="#A0A3BD">
                  My Debt
                </Typography>
                <FlexBox>
                  <img src={mobileBlackEthLogo} alt="" />
                  <Typography ml="0.4375rem" variant="h5" fontSize="1.125rem" lineHeight="1.8125rem">
                    22.4653
                  </Typography>
                </FlexBox>
              </Box>
              <FlexBox>
                <Button className="loanButton" variant="contained">
                  <Typography variant="body2" component="span" fontWeight="700">
                    Repay {'>'}
                  </Typography>
                </Button>
              </FlexBox>
            </SpaceBetweenBox>
            <RiskLevelBox>
              <RiskFlexBox>
                <Box pt="1.1875rem">
                  <Typography variant="body2" lineHeight="0.75rem" fontWeight="600">
                    Risk Level
                  </Typography>
                  <Typography mt="0.5rem" variant="body1" color="#4BC8B1" fontSize="1.25rem" fontWeight="700">
                    `HEALTHY
                  </Typography>
                </Box>
                <Box m="0.5rem 0.5rem 0 0">
                  <FlexEndBox>
                    <img width="16px" height="16px" src={mobilePrompt2} alt="" />
                  </FlexEndBox>
                  <Typography mt="-0.25rem" variant="body1" color="#6E7191" fontWeight="600">
                    180%
                  </Typography>
                  <Typography mt="-0.25rem" variant="body2" color=" #A0A3BD" fontWeight="600">
                    Collateralization
                  </Typography>
                </Box>
              </RiskFlexBox>
            </RiskLevelBox>
            <CustomizedSlider riskLevelTag={''}></CustomizedSlider>
            <SpaceBetweenBox mt=".25rem" padding="0 1rem 0 1rem">
              <Typography variant="body1" color=" #4E4B66" fontWeight="600">
                Borrow Limit
              </Typography>
              <Typography variant="body1" color="#4E4B66" fontWeight="600">
                18.09 ETHs
              </Typography>
            </SpaceBetweenBox>
            <BorrowAPYBox>
              <SpaceBetweenBox>
                <Box>
                  <Typography variant="body1" color="#262338" lineHeight="1.3125rem" fontWeight="700">
                    10%
                  </Typography>
                  <FlexBox>
                    <Typography ml="0.25rem" variant="body2" color="#A0A3BD" lineHeight="1.125rem">
                      Net Borrow APY
                    </Typography>
                    <img src={mobilePrompt2} alt="" />
                  </FlexBox>
                </Box>
                <Button className="loanButton" variant="contained">
                  <Typography variant="body2" component="span" fontWeight="700" color="#ffffff">
                    Borrow {'>'}
                  </Typography>
                </Button>
              </SpaceBetweenBox>
              <FooterBox>
                <Typography variant="body2" component="span" color="#4E4B66">
                  Borrow ETH to earn{' '}
                  <Typography variant="body2" component="span" color="#29C3A8">
                    +20%
                  </Typography>{' '}
                  token reward
                </Typography>
              </FooterBox>
            </BorrowAPYBox>
          </>
        )}
      </MyAssetsBox>
    </Box>
  )
}
