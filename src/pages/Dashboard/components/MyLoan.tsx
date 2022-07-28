import { Box, Button, styled, Typography } from '@mui/material'
import { CenterBox, FlexBox, SpaceBetweenBox } from 'styleds'
import rightBox from 'assets/images/svg/dashboard/rightBox.svg'
import ButtonSupply from 'assets/images/svg/dashboard/Button-Supply.svg'
import addBox from 'assets/images/svg/dashboard/addBox.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'
import blackEthLogo from 'assets/images/svg/dashboard/blackEthLogo.svg'
import CustomizedSlider from 'components/Slider'
import { useMemo, useState } from 'react'
import MyLoanModal from './MyLoanModal'
import { fixedFormat, getRiskLevel, getRiskLevelTag } from 'utils'
import MyLoanSkeleton from './DashboardSkeleton/MyLoanSkeleton'
import BigNumber from 'bignumber.js'
import { useBorrowLimit, useErc20ReserveData, useEthDebt, useRiskLevel } from 'state/user/hooks'
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
    height: 46px;
    padding: 5px 16px;
  }
`
const RiskLevelBox = styled(Box)`
  padding: 10px 10px 10px 14px;
  width: 100%;
  height: 98px;
  background: #f3f3f8;
  border-radius: 0.375rem;
  position: relative;
  margin-bottom: 15px;
  margin-top: 36px;
  &.before {
    ::before {
      content: '';
      display: block;
      position: absolute;
      left: 72px;
      top: 98px;
      border-width: 11.5px 7.5px;
      border-style: dashed solid dashed dashed;
      border-color: #f3f3f8 transparent transparent transparent;
    }
  }
`
const FlexEndBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
`
const BottomBox = styled(Box)`
  width: 371px;
  height: 149px;
  margin-top: 24px;
  padding: 16px 24px 24px 23px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 8px;
  .left {
    margin-left: 8px;
  }
`
const RewardAPYBox = styled(Box)`
  height: 48px;
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
interface MyLoanProps {
  loading: boolean
  type: number
  assets: BigNumber
}
export default function MyLoan({ loading, type, assets }: MyLoanProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [repayRoBorrow, setRepayRoBorrow] = useState<number>(1)
  const [datatype] = useState<boolean>(true)
  const riskLevel = useRiskLevel()
  const erc20ReserveData = useErc20ReserveData()
  const ethDebt = useEthDebt()
  const borrowLimit = useBorrowLimit()

  const myLoanRiskLevel = useMemo(() => {
    return getRiskLevel(riskLevel)
  }, [riskLevel])

  const myLoanRiskLevelTag = useMemo(() => {
    return getRiskLevelTag(riskLevel)
  }, [riskLevel])

  return (
    <MyLoanBox className={loading ? 'SkeletonBg' : ''}>
      {loading ? (
        <MyLoanSkeleton></MyLoanSkeleton>
      ) : (
        <>
          <Typography variant="h4">My Loan</Typography>
          <SpaceBetweenBox mt="39px" ml="16px">
            <Box>
              <Typography variant="subtitle2" fontWeight="500" component="p" color="#A0A3BD">
                My Debt
              </Typography>
              <CenterBox>
                <img src={blackEthLogo} alt="" />
                <Typography ml="13px" variant="h3" fontSize="32px" lineHeight="51px">
                  {fixedFormat(ethDebt)}
                </Typography>
              </CenterBox>
            </Box>
            <Button
              disabled={!datatype}
              className="Padding-button"
              variant="contained"
              onClick={() => {
                setOpen(true)
                setRepayRoBorrow(2)
              }}
            >
              Repay {'>'}
            </Button>
          </SpaceBetweenBox>
          <RiskLevelBox className={datatype ? 'before' : ''}>
            {datatype ? (
              <>
                <FlexStartBox ml="10px">
                  <Box width="220px" mt="14px">
                    <Typography mb="12px" lineHeight="14px" fontWeight="600" variant="body1">
                      Risk Level
                    </Typography>
                    <Typography fontSize="22px" className={myLoanRiskLevelTag} lineHeight="24px" fontWeight="700">
                      {myLoanRiskLevel}
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <FlexEndBox>
                        <img src={greyPrompt} alt="" />
                      </FlexEndBox>
                      <Box mr="24px">
                        <Typography component="p" variant="subtitle2" color="#6E7191">
                          {riskLevel}%
                        </Typography>
                        <Typography component="p" variant="body2" color="#A0A3BD">
                          Collateralization
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </FlexStartBox>
              </>
            ) : (
              <Box ml="10px">
                <FlexStartBox mb="4px">
                  <Typography mt="4px" variant="subtitle1" fontWeight="700">
                    No loan amount
                  </Typography>
                  <Box width="16px" height="16px" mt="2px">
                    <img src={greyPrompt} alt="" />
                  </Box>
                </FlexStartBox>
                <Typography variant="body2" color="#A0A3BD">
                  You can try to mortgage some NFT or ETH
                </Typography>
                <Typography variant="body2" color="#A0A3BD">
                  to get a loan amount.
                </Typography>
              </Box>
            )}
          </RiskLevelBox>
          <CustomizedSlider colorClass={myLoanRiskLevelTag}></CustomizedSlider>
          <FlexEndBox>
            <Typography variant="body1" color="#4E4B66">
              Borrow Limit {borrowLimit} ETH
            </Typography>
          </FlexEndBox>
          <BottomBox>
            <RewardAPYBox>
              <FlexBox>
                <Box width="64px">
                  <Typography variant="subtitle2" color="#4BC8B1">
                    20%
                  </Typography>
                </Box>
                <ImgBox src={addBox} alt="" />
                <Box ml="33px" width="67px">
                  <Typography variant="subtitle2" color="#6E7191">
                    {erc20ReserveData.borrowRate}%
                  </Typography>
                </Box>
                <ImgBox src={rightBox} alt="" />
                <Box>
                  <Typography ml="33px" variant="subtitle2" color="#4E4B66">
                    30%
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
            <SpaceBetweenBox mt="16px">
              <Box>
                <Typography variant="subtitle2" fontWeight="700" color="#262338">
                  Net Borrow APY
                </Typography>
                <Typography ml="2px" variant="body2" fontWeight="600" color="#A0A3BD">
                  Remaining loanable
                </Typography>
              </Box>
              <Button
                disabled={!datatype}
                sx={{ width: '174px', height: '48px' }}
                variant="contained"
                onClick={() => {
                  setOpen(true)
                  setRepayRoBorrow(1)
                }}
              >
                Borrow{datatype && <img className="left" src={ButtonSupply} alt="" />}
              </Button>
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
