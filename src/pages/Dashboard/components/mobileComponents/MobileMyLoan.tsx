import { Box, Button, styled, Typography } from '@mui/material'
// import mobilePrompt2 from 'assets/images/svg/dashboard/mobilePrompt-2.svg'
import mobileBlackEthLogo from 'assets/images/svg/dashboard/mobileBlackEthLogo.svg'
import mobileDown from 'assets/images/svg/dashboard/mobileDown.svg'
import mobileUp from 'assets/images/svg/dashboard/mobileUp.svg'
import CustomizedSlider from 'components/Slider'
import { FlexBox, SpaceBetweenBox, FlexEndBox } from 'styleds'
import { useMemo, useState } from 'react'
import { useBorrowLimit, useDebtBorrowLimitUsed, useErc20ReserveData, useEthDebt, useHeath } from 'state/user/hooks'
import { fixedFormat, getRiskLevel, getRiskLevelTag, times } from 'utils'
import MobileMyLoanModal from './MobileMyLoanModal'
import { useLoading } from 'state/application/hooks'
import MobileMyLoanSkeleton from '../mobileDashboardSkeleton/MobileMyLoanSkeleton '
import BigNumber from 'bignumber.js'
import TipsTooltip from '../TipsTooltip'

const MyAssetsBox = styled(Box)`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  .loanButton {
    padding: 0;
    margin-left: 0.5rem;
    min-width: 5.125rem;
    height: 2.5rem;
  }
  .openButton {
    padding: 0;
    width: 5.75rem;
    height: 2.25rem;
    min-width: 5.75rem;
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
  margin-top: 1rem;
  padding: 0 1rem 1rem 1rem;
  background: linear-gradient(180deg, rgba(247, 247, 252, 0) 0%, #e0dff3 100%) !important;
`
const NoBorrowLimitRiskLevelBox = styled(Box)`
  width: 100%;
  background: #f3f3f8;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.625rem;
  position: relative;
`
const BorrowAPYBox = styled(Box)`
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 0.5rem;
  padding: 1rem 1rem 0.25rem 1rem;
  margin-top: 1.5rem;
`
const Img = styled(`img`)`
  margin-top: 0.0625rem;
`
const FooterBox = styled(Box)`
  background: #eff0f6;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem 1.6875rem;
  margin-top: 0.75rem;
  position: relative;
  ::before {
    content: '';
    display: block;
    position: absolute;
    right: calc(50% - 7rem);
    bottom: calc(100%);
    border-width: 0.375rem 0.3125rem;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent #eff0f6 transparent;
  }
`
interface MobileMyLoanProps {
  myLoanType: boolean
  setLoanType: Function
}
export default function MobileMyLoan({ myLoanType, setLoanType }: MobileMyLoanProps) {
  const ethDebt = useEthDebt()
  const heath = useHeath()
  const erc20ReserveData = useErc20ReserveData()
  const [open, setOpen] = useState<boolean>(false)
  const [repayRoBorrow, setRepayRoBorrow] = useState<number>(1)
  const borrowLimitUsed = useDebtBorrowLimitUsed()
  const borrowLimit = useBorrowLimit()
  const loading = useLoading()
  const myLoanRiskLevel = useMemo(() => {
    return getRiskLevel(heath)
  }, [heath])
  const RiskLevelBox = styled(Box)`
    width: 100%;
    background: #f3f3f8;
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.625rem;
    padding: 0 0 1.125rem 1rem;
    position: relative;
    &.left {
      border-bottom-left-radius: 0px !important;
    }
    &.right {
      border-bottom-right-radius: 0px !important;
    }
    ::before {
      content: '';
      display: block;
      position: absolute;
      top: 99%;
      left: ${`${times(borrowLimitUsed, 0.185)}rem`};
      border-width: 10.5px 7.5px;
      border-style: dashed solid dashed dashed;
      border-color: #f3f3f8 transparent transparent transparent;
    }
  `
  const myLoanRiskLevelTag = useMemo(() => {
    return getRiskLevelTag(heath)
  }, [heath])
  return (
    <>
      {loading ? (
        <MobileMyLoanSkeleton></MobileMyLoanSkeleton>
      ) : (
        <MyAssetsBgBox>
          <MyAssetsBox
            sx={{ background: `${myLoanType ? '#ffffff' : 'linear-gradient(180deg, #FFFFFF 0%, #F7F7FC 100%)'}` }}
          >
            <SpaceBetweenBox>
              <FlexBox
                mt={myLoanType ? (myLoanType && +ethDebt !== 0 ? '0' : '0.3125rem') : '0.5rem'}
                onClick={() => {
                  setLoanType(!myLoanType)
                }}
              >
                <Typography mr="0.25rem" variant="subtitle2" fontWeight="700">
                  My Loan
                </Typography>
                <Img src={myLoanType ? mobileDown : mobileUp} alt="" />
              </FlexBox>
              {myLoanType && +ethDebt !== 0 && (
                <ClaimBox>
                  <Typography mr="0.5rem" className={myLoanRiskLevelTag} variant="body2" fontWeight="700">
                    {myLoanRiskLevel}
                  </Typography>
                  <Typography mr="0.5rem" color="#A0A3BD" variant="body2" fontWeight="600">
                    {heath}%
                  </Typography>
                  <TipsTooltip value="11"></TipsTooltip>
                </ClaimBox>
              )}
            </SpaceBetweenBox>
            {myLoanType ? (
              <SpaceBetweenBox mt={myLoanType && +ethDebt !== 0 ? '1rem' : '1.25rem'}>
                <Box ml="0.375rem">
                  <Typography variant="body2" color="#A0A3BD">
                    My Debt
                  </Typography>
                  <FlexBox>
                    <img src={mobileBlackEthLogo} alt="" />
                    <Typography
                      fontSize={fixedFormat(ethDebt).length > 10 ? '1rem' : '1.125rem'}
                      width="7.0625rem"
                      sx={{ textOverflow: 'ellipsis', maxWidth: '7.0625rem', overflow: 'hidden' }}
                      ml="0.25rem"
                      variant="subtitle1"
                      fontWeight="700"
                    >
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
                <SpaceBetweenBox mt="1.25rem" mr="1rem">
                  <Box ml="0.375rem">
                    <Typography variant="body1" color="#A0A3BD">
                      My Debt
                    </Typography>
                    <FlexBox>
                      <svg width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 15.2727L9 6L15 15.2727L9 24L3 15.2727Z"
                          stroke="#14142A"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 15L9 18L15 15"
                          stroke="#14142A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Typography
                        width="9.6875rem"
                        sx={{ textOverflow: 'ellipsis', maxWidth: '9.6875rem', overflow: 'hidden' }}
                        fontSize={fixedFormat(ethDebt).length > 10 ? '1rem' : '1.375rem'}
                        ml="0.5rem"
                        variant="h5"
                      >
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
                      className="openButton"
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
                          {/* <img width="16px" height="16px" src={mobilePrompt2} alt="" /> */}
                          <TipsTooltip size="16" value="11"></TipsTooltip>
                        </FlexEndBox>
                      </Box>
                    </RiskFlexBox>
                  </NoBorrowLimitRiskLevelBox>
                ) : (
                  <RiskLevelBox
                    className={
                      new BigNumber(borrowLimitUsed).gte(199)
                        ? 'right'
                        : new BigNumber(borrowLimitUsed).lte(1)
                        ? 'left'
                        : ''
                    }
                  >
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
                          {/* <img width="16px" height="16px" src={mobilePrompt2} alt="" /> */}
                          <TipsTooltip size="16" value="11"></TipsTooltip>
                        </FlexEndBox>
                        <Typography mt="-0.25rem" variant="body1" color="#6E7191" fontWeight="600">
                          {heath}%
                        </Typography>
                        <Typography mr="0.4375rem" variant="body2" color=" #A0A3BD" fontWeight="600">
                          Collateralization
                        </Typography>
                      </Box>
                    </RiskFlexBox>
                  </RiskLevelBox>
                )}
                <CustomizedSlider
                  sliderValue={Number(borrowLimitUsed)}
                  riskLevelTag={myLoanRiskLevelTag}
                ></CustomizedSlider>
                <SpaceBetweenBox mt=".25rem" padding="0 1rem 0 1rem">
                  <Typography variant="body1" color=" #4E4B66" fontWeight="600">
                    Borrow Limit
                  </Typography>
                  <Typography variant="body1" color="#4E4B66" fontWeight="600">
                    {fixedFormat(borrowLimit)} ETH
                  </Typography>
                </SpaceBetweenBox>
                <BorrowAPYBox>
                  <SpaceBetweenBox>
                    <Box>
                      <Typography variant="body1" color="#262338" lineHeight="1.3125rem" fontWeight="700">
                        {erc20ReserveData.borrowRate}%
                      </Typography>
                      <FlexBox>
                        <Typography variant="body2" mr="0.25rem" color="#A0A3BD" lineHeight="1.125rem">
                          Net Borrow APY
                        </Typography>
                        {/* <img src={mobilePrompt2} alt="" /> */}
                        <TipsTooltip value="11"></TipsTooltip>
                      </FlexBox>
                    </Box>
                    <Button
                      disabled={+borrowLimit === 0}
                      onClick={() => {
                        setRepayRoBorrow(1)
                        setOpen(true)
                      }}
                      className="openButton"
                      variant="contained"
                    >
                      <Typography variant="body2" fontWeight="700" color="#ffffff">
                        Borrow {'>'}
                      </Typography>
                    </Button>
                  </SpaceBetweenBox>
                  <FooterBox>
                    <Typography variant="body2" lineHeight="0.75rem" color="#4E4B66">
                      Borrow ETH to earn{' '}
                      <Typography
                        variant="body2"
                        lineHeight="0.75rem"
                        fontWeight="700"
                        component="span"
                        color="#29C3A8"
                      >
                        +20%
                      </Typography>{' '}
                      token reward
                    </Typography>
                  </FooterBox>
                </BorrowAPYBox>
              </>
            )}
          </MyAssetsBox>
          <MobileMyLoanModal
            open={open}
            repayRoBorrow={repayRoBorrow}
            onClose={() => setOpen(false)}
          ></MobileMyLoanModal>
        </MyAssetsBgBox>
      )}
    </>
  )
}
