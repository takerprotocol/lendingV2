import { Box, Button, styled, Typography } from '@mui/material'
import { FlexBox, SpaceBetweenBox, CenterBox } from 'styleds'
import rightBox from 'assets/images/svg/dashboard/rightBox.svg'
// import ButtonSupply from 'assets/images/svg/dashboard/Button-Supply.svg'
import addBox from 'assets/images/svg/dashboard/addBox.svg'
import blackEthLogo from 'assets/images/svg/dashboard/blackEthLogo.svg'
import riskLevelBefore from 'assets/images/svg/dashboard/riskLevelBefore.svg'
import CustomizedSlider from 'components/Slider'
import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import MyLoanModal from './MyLoanModal'
import { minus, fixedFormat, getRiskLevel, getRiskLevelTag, times, decimalFormat } from 'utils'
import MyLoanSkeleton from './DashboardSkeleton/MyLoanSkeleton'
import { useBorrowLimit, useDebtBorrowLimitUsed, useErc20ReserveData, useEthDebt, useHeath } from 'state/user/hooks'
import TipsTooltip from './TipsTooltip'
import { useShowChangeNetWork } from 'state/application/hooks'
// import { useContract } from 'hooks/useContract'
// import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
// import { useAddress } from 'state/application/hooks'

const MyLoanBox = styled(Box)`
  width: 420px;
  height: 582px;
  padding: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f7fc 100%);
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
  .Padding-button {
    min-width: 104px;
    width: 125px;
    height: 48px;
    padding: 5px 16px;
    background: #f7f7fc !important;
    border: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    color: #373737;
    box-shadow: none !important;
    &:hover {
      box-shadow: none !important;
    }
  }
`
const FlexEndBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
`
const RepayBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const BottomBox = styled(Box)`
  width: 371px;
  height: 149px;
  margin-top: 24px;
  padding: 16px 0px 24px 23px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 8px;
  .left {
    margin-left: 8px;
  }
`
const RewardAPYBox = styled(Box)`
  height: 45px;
  margin-bottom: 16px;
`
const ImgBox = styled('img')`
  width: 18px;
  height: 18px;
`
const FlexStartBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const RiskLevelBox = styled(Box)`
  padding: 12px 12px 10px 14px;
  width: 100%;
  height: 98px;
  background: #f3f3f8;
  border-radius: 6px;
  position: relative;
  margin-bottom: 11px;
  margin-top: 36px;
  &.left {
    border-bottom-left-radius: 0px !important;
  }
  &.right {
    border-bottom-right-radius: 0px !important;
  }
`
const RiskBox = styled(Box)`
  margin-top: 6px;
  margin-right: 32px;
  padding: 3px 11px;
  border-radius: 20px;
`
const RepayButton = styled(Button)`
  width: 125px;
  height: 48px;
  &.Mui-disabled {
    background: #f7f7fc;
    mix-blend-mode: normal;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    text-align: center;
    color: rgba(55, 55, 55, 0.3) !important;
  }
`
const BorrowButton = styled(Button)`
  &.error {
    background: #f9e7ea;
    border-radius: 6px;
    color: #e1536c;
    box-shadow: none;
    :hover {
      box-shadow: none;
    }
  }
`
interface MyLoanProps {
  loading: boolean
  type: number
}
export default function MyLoan({ loading, type }: MyLoanProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [repayRoBorrow, setRepayRoBorrow] = useState<number>(1)
  const erc20ReserveData = useErc20ReserveData()
  const ethDebt = useEthDebt()
  const showChangeNetWork = useShowChangeNetWork()
  const borrowLimit = useBorrowLimit()
  const borrowLimitUsed = useDebtBorrowLimitUsed()
  const heath = useHeath()
  const myLoanRiskLevel = useMemo(() => {
    return getRiskLevel(heath)
  }, [heath])

  const myLoanRiskLevelTag = useMemo(() => {
    return getRiskLevelTag(heath)
  }, [heath])

  const BeforeImg = styled(`img`)`
    position: absolute;
    top: calc(100% - 10.5px);
    left: ${`${times(3.57, borrowLimitUsed)}px`};
  `
  return (
    <MyLoanBox className={loading ? 'SkeletonBg' : ''}>
      {loading ? (
        <MyLoanSkeleton></MyLoanSkeleton>
      ) : (
        <>
          <Typography variant="h4">My Loan</Typography>
          <Box mt="39px" mr="24px" ml="16px">
            <RepayBox>
              <Box>
                <Typography variant="subtitle2" fontWeight="500" component="p" color="#A0A3BD">
                  My Debt
                </Typography>
                <CenterBox mt="4px">
                  <img src={blackEthLogo} alt="" />
                  <Typography ml="8px" variant="h3" fontSize="32px" lineHeight="51px">
                    {new BigNumber(ethDebt).gt(0) && new BigNumber(ethDebt).lt(0.01) ? '<0.01' : fixedFormat(ethDebt)}
                  </Typography>
                </CenterBox>
              </Box>
              <Box mt="26px">
                <RepayButton
                  disabled={showChangeNetWork || +ethDebt === 0}
                  className={showChangeNetWork || +ethDebt !== 0 ? 'Padding-button' : ''}
                  variant="contained"
                  onClick={() => {
                    if (+ethDebt !== 0) {
                      setOpen(true)
                      setRepayRoBorrow(2)
                    }
                  }}
                >
                  Repay {showChangeNetWork || +ethDebt === 0 ? '' : '>'}
                </RepayButton>
              </Box>
            </RepayBox>
          </Box>
          <RiskLevelBox
            className={
              Number(ethDebt) !== 0
                ? new BigNumber(borrowLimitUsed).gt(99)
                  ? 'right'
                  : new BigNumber(borrowLimitUsed).lt(1)
                  ? 'left'
                  : ''
                : ''
            }
          >
            {+borrowLimit !== 0 ? (
              <>
                <FlexStartBox ml="10px">
                  <Box mt="12px">
                    <Typography mb="12px" lineHeight="14px" fontWeight="600" variant="body1">
                      Heath Level
                    </Typography>
                    <Typography fontSize="22px" className={myLoanRiskLevelTag} lineHeight="24px" fontWeight="700">
                      {heath}%
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <FlexEndBox>
                        <TipsTooltip
                          size="16px"
                          grey="grey"
                          value={
                            "The risk level reflects the user's current loan risk situation. When the utilization rate reaches the weighted average liquidation threshold, the rish level will reach the liquidation level, and the liquidator can start to liquidate the user's nft assets one by one."
                          }
                        ></TipsTooltip>
                      </FlexEndBox>
                      <RiskBox className={myLoanRiskLevelTag} sx={{ border: '1px solid' }}>
                        <Typography className={myLoanRiskLevelTag} variant="subtitle2">
                          {myLoanRiskLevel}
                        </Typography>
                        {/* <Typography component="p" variant="body2" color="#A0A3BD">
                          Collateralization
                        </Typography> */}
                      </RiskBox>
                    </Box>
                  </Box>
                  <BeforeImg src={riskLevelBefore}></BeforeImg>
                </FlexStartBox>
              </>
            ) : (
              <Box ml="10px">
                <FlexStartBox mb="4px">
                  <Typography variant="subtitle1" fontWeight="700">
                    No loan amount
                  </Typography>
                  <FlexEndBox>
                    <TipsTooltip
                      size="16px"
                      grey="grey"
                      value={
                        "The risk level reflects the user's current loan risk situation. When the utilization rate reaches the weighted average liquidation threshold, the rish level will reach the liquidation level, and the liquidator can start to liquidate the user's nft assets one by one."
                      }
                    ></TipsTooltip>
                  </FlexEndBox>
                </FlexStartBox>
                <Typography variant="body2" lineHeight="18px" color="#A0A3BD">
                  You can try to mortgage some NFT or ETH
                </Typography>
                <Typography variant="body2" mb="5px" lineHeight="18px" color="#A0A3BD">
                  to get a loan amount.
                </Typography>
              </Box>
            )}
          </RiskLevelBox>
          <CustomizedSlider sliderValue={Number(borrowLimitUsed)} riskLevelTag={myLoanRiskLevelTag}></CustomizedSlider>
          <FlexEndBox mt="7px">
            <Typography variant="body1" color="#4E4B66">
              Borrow Limit {fixedFormat(borrowLimit)} ETH
            </Typography>
          </FlexEndBox>
          <BottomBox>
            <RewardAPYBox>
              <FlexBox>
                <Box width="64px">
                  <Typography variant="subtitle2" color="#4BC8B1">
                    0%
                  </Typography>
                </Box>
                <ImgBox src={addBox} alt="" />
                <Box ml="33px" overflow="hidden" width="67px">
                  <Typography variant="subtitle2" color="#6E7191">
                    {erc20ReserveData.borrowRate}%
                  </Typography>
                </Box>
                <ImgBox src={rightBox} alt="" />
                <Box>
                  <Typography ml="33px" overflow="hidden" variant="subtitle2" color="#4E4B66">
                    {erc20ReserveData.borrowRate}%
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox>
                <Box width="115px">
                  <Typography variant="body2" color=" #A0A3BD">
                    Reward APY
                  </Typography>
                </Box>
                <Box width="118px">
                  <Typography variant="body2" fontWeight="600" color=" #A0A3BD">
                    Borrow APY
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="600" color="#4E4B66">
                    Net Borrow APY
                  </Typography>
                </Box>
              </FlexBox>
            </RewardAPYBox>
            <SpaceBetweenBox mr="24px" mt="16px">
              <Box pt="1px">
                <Typography variant="subtitle2" fontWeight="700" color="#262338">
                  {decimalFormat(BigNumber.max(minus(borrowLimit, ethDebt), 0).toString(), 0, false, 4)} ETH
                </Typography>
                <Typography mt="2px" variant="body2" fontWeight="600" color="#A0A3BD">
                  Available Loan
                </Typography>
              </Box>
              <BorrowButton
                disabled={
                  Number(minus(borrowLimit, ethDebt)) === 0 || new BigNumber(heath).lt(100) || showChangeNetWork
                }
                sx={{ width: '125px', height: '48px' }}
                variant="contained"
                className={new BigNumber(heath).lt(100) ? 'error' : ''}
                onClick={() => {
                  setOpen(true)
                  setRepayRoBorrow(1)
                }}
              >
                Borrow{' '}
                {new BigNumber(heath).lt(100) || Number(minus(borrowLimit, ethDebt)) === 0 || showChangeNetWork
                  ? ''
                  : '>'}
                {/* {Number(minus(borrowLimit, ethDebt)) !== 0 && <img className="left" src={ButtonSupply} alt="" />} */}
              </BorrowButton>
            </SpaceBetweenBox>
          </BottomBox>
        </>
      )}
      <MyLoanModal
        myDebt={+ethDebt}
        open={open}
        repayRoBorrow={repayRoBorrow}
        onClose={() => setOpen(false)}
      ></MyLoanModal>
    </MyLoanBox>
  )
}
