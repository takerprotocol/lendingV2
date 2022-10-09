import { Box, Button, styled, Typography } from '@mui/material'
import mobilePrompt2 from 'assets/images/svg/dashboard/mobilePrompt-2.svg'
import mobileBlackEthLogo from 'assets/images/svg/dashboard/mobileBlackEthLogo.svg'
import mobileDown from 'assets/images/svg/dashboard/mobileDown.svg'
import mobileUp from 'assets/images/svg/dashboard/mobileUp.svg'
import CustomizedSlider from 'components/Slider'
import { FlexBox, SpaceBetweenBox, FlexEndBox } from 'styleds'
import { useMemo, useState } from 'react'
import { useBorrowLimit, useEthDebt, useHeath } from 'state/user/hooks'
import { fixedFormat, getRiskLevel, getRiskLevelTag } from 'utils'
import MobileMyLoanModal from './MobileMyLoanModal'

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
const MyAssetsBgBox = styled(Box)`
  margin-top: 0.5rem;
  padding: 0 1rem 1rem 1rem;
  background: linear-gradient(180deg, rgba(247, 247, 252, 0) 0%, #e0dff3 100%);
`
const NoBorrowLimitRiskLevelBox = styled(Box)`
  width: 100%;
  background: #f3f3f8;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  position: relative;
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
    border-color: #f3f3f8 transparent transparent transparent;
  }
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
  const ethDebt = useEthDebt()
  const heath = useHeath()
  const [open, setOpen] = useState<boolean>(false)
  const [repayRoBorrow, setRepayRoBorrow] = useState<number>(1)
  const borrowLimit = useBorrowLimit()
  const [sliderValue] = useState<number>(+heath)
  const myLoanRiskLevel = useMemo(() => {
    return getRiskLevel(heath)
  }, [heath])

  const myLoanRiskLevelTag = useMemo(() => {
    return getRiskLevelTag(heath)
  }, [heath])
  return (
    <MyAssetsBgBox>
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
            <Typography mr="0.5rem" className={myLoanRiskLevelTag} variant="body2" fontWeight="700">
              {myLoanRiskLevel}
            </Typography>
            <Typography mr="0.5rem" color="#A0A3BD" variant="body2" fontWeight="600">
              {heath}%
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
                  {fixedFormat(ethDebt)}
                </Typography>
              </FlexBox>
            </Box>
            <FlexBox>
              <Box display={+ethDebt === 0 ? 'none' : ''}>
                <Button
                  onClick={() => {
                    setRepayRoBorrow(2)
                    setOpen(true)
                  }}
                  className="loanButton"
                  variant="contained"
                  color="secondary"
                >
                  <Typography variant="body2" component="span" fontWeight="700">
                    Repay {'>'}
                  </Typography>
                </Button>
              </Box>
              <Button
                disabled={+borrowLimit === 0}
                onClick={() => {
                  setRepayRoBorrow(1)
                  setOpen(true)
                }}
                className="loanButton"
                variant="contained"
              >
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
                    {fixedFormat(ethDebt)}
                  </Typography>
                </FlexBox>
              </Box>
              <FlexBox>
                <Button
                  disabled={+ethDebt === 0}
                  onClick={() => {
                    setOpen(true)
                    setRepayRoBorrow(2)
                  }}
                  className="loanButton"
                  variant="contained"
                >
                  <Typography variant="body2" component="span" fontWeight="700">
                    Repay {'>'}
                  </Typography>
                </Button>
              </FlexBox>
            </SpaceBetweenBox>
            {+borrowLimit === 0 ? (
              <NoBorrowLimitRiskLevelBox>
                <RiskFlexBox>
                  <Box p="0.6875rem 0 0 1rem">
                    <Typography fontWeight="700" variant="body1">
                      No loan amount
                    </Typography>
                    <Typography lineHeight="1.125rem" variant="body2" color="#a0a3bd">
                      You can try to mortgage some NFT or ETH
                    </Typography>
                    <Typography mb="0.625rem" lineHeight="1.125rem" variant="body2" color="#a0a3bd">
                      to get a loan amount.
                    </Typography>
                  </Box>
                  <Box m="0.5rem 0.5rem 0 0">
                    <FlexEndBox>
                      <img width="16px" height="16px" src={mobilePrompt2} alt="" />
                    </FlexEndBox>
                  </Box>
                </RiskFlexBox>
              </NoBorrowLimitRiskLevelBox>
            ) : (
              <RiskLevelBox>
                <RiskFlexBox>
                  <Box pt="1.1875rem">
                    <Typography variant="body2" lineHeight="0.75rem" fontWeight="600">
                      Risk Level
                    </Typography>
                    <Typography
                      mt="0.5rem"
                      variant="body1"
                      className={myLoanRiskLevelTag}
                      fontSize="1.25rem"
                      fontWeight="700"
                    >
                      {myLoanRiskLevel}
                    </Typography>
                  </Box>
                  <Box m="0.5rem 0.5rem 0 0">
                    <FlexEndBox>
                      <img width="16px" height="16px" src={mobilePrompt2} alt="" />
                    </FlexEndBox>
                    <Typography mt="-0.25rem" variant="body1" color="#6E7191" fontWeight="600">
                      {heath}%
                    </Typography>
                    <Typography mt="-0.25rem" variant="body2" color=" #A0A3BD" fontWeight="600">
                      Collateralization
                    </Typography>
                  </Box>
                </RiskFlexBox>
              </RiskLevelBox>
            )}
            <CustomizedSlider sliderValue={sliderValue} riskLevelTag={myLoanRiskLevelTag}></CustomizedSlider>
            <SpaceBetweenBox mt=".25rem" padding="0 1rem 0 1rem">
              <Typography variant="body1" color=" #4E4B66" fontWeight="600">
                Borrow Limit
              </Typography>
              <Typography variant="body1" color="#4E4B66" fontWeight="600">
                {borrowLimit}
              </Typography>
            </SpaceBetweenBox>
            <BorrowAPYBox>
              <SpaceBetweenBox>
                <Box>
                  <Typography variant="body1" color="#262338" lineHeight="1.3125rem" fontWeight="700">
                    10%
                  </Typography>
                  <FlexBox>
                    <Typography variant="body2" mr="0.25rem" color="#A0A3BD" lineHeight="1.125rem">
                      Net Borrow APY
                    </Typography>
                    <img src={mobilePrompt2} alt="" />
                  </FlexBox>
                </Box>
                <Button
                  disabled={+borrowLimit === 0}
                  onClick={() => {
                    setRepayRoBorrow(1)
                    setOpen(true)
                  }}
                  className="loanButton"
                  variant="contained"
                >
                  <Typography variant="body2" component="span" fontWeight="700" color="#ffffff">
                    Borrow {'>'}
                  </Typography>
                </Button>
              </SpaceBetweenBox>
              <FooterBox>
                <Typography variant="body2" component="span" color="#4E4B66">
                  Borrow ETH to earn{' '}
                  <Typography variant="body2" fontWeight="700" component="span" color="#29C3A8">
                    +20%
                  </Typography>{' '}
                  token reward
                </Typography>
              </FooterBox>
            </BorrowAPYBox>
          </>
        )}
      </MyAssetsBox>
      <MobileMyLoanModal open={open} repayRoBorrow={repayRoBorrow} onClose={() => setOpen(false)}></MobileMyLoanModal>
    </MyAssetsBgBox>
  )
}
