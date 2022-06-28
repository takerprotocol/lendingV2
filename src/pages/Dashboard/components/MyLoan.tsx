import { Box, Button, styled, Typography } from '@mui/material'
import { CenterBox, FlexBox, SpaceBetweenBox } from 'styleds'
import rightBox from 'assets/images/svg/dashboard/rightBox.svg'
import ButtonSupply from 'assets/images/svg/dashboard/Button-Supply.svg'
import addBox from 'assets/images/svg/dashboard/addBox.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'
import blackEthLogo from 'assets/images/svg/dashboard/blackEthLogo.svg'
import CustomizedSlider from 'components/Slider'
import { useState } from 'react'
import MyLoanModal from './MyLoanModal'
import { RiskLevel, RiskLevelTag } from 'utils'
import MyLoanSkeleton from './DashboardSkeleton/MyLoanSkeleton'

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
  padding: 10px 14px;
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
  margin-bottom: 24px;
  margin-top: 13px;
`
const BottomBox = styled(Box)`
  width: 371px;
  height: 149px;
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
interface MyLoanProps {
  loading: boolean
  type: number
}
export default function MyLoan({ loading, type }: MyLoanProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [repayRoBorrow, setRepayRoBorrow] = useState<number>(1)
  const [datatype] = useState<boolean>(true)
  const [riskLevelType] = useState<number>(120)
  const MyLoanRiskLevel = RiskLevel(riskLevelType)
  const MyLoanRiskLevelTag = RiskLevelTag(riskLevelType)
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
                My assets
              </Typography>
              <CenterBox>
                <img src={blackEthLogo} alt="" />
                <Typography ml="13px" variant="h3" fontSize="32px" lineHeight="51px">
                  22.4653
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
              Rapay {'>'}
            </Button>
          </SpaceBetweenBox>
          <RiskLevelBox className={datatype ? 'before' : ''}>
            {datatype ? (
              <>
                <Box mb="16px" height="14px" mt="14px">
                  <Typography component="span" lineHeight="14px" fontWeight="600" variant="body1">
                    Risk Level
                  </Typography>
                  <Typography component="span" lineHeight="14px" ml="8px" variant="body1" color="#9A96A2">
                    180%
                  </Typography>
                </Box>
                <FlexBox>
                  <Typography fontSize="22px" className={MyLoanRiskLevelTag} lineHeight="24px" fontWeight="700">
                    {MyLoanRiskLevel}
                  </Typography>
                  <Box ml="8px" width="16px" height="16px">
                    <img src={greyPrompt} alt="" />
                  </Box>
                </FlexBox>
              </>
            ) : (
              <Box ml="10px" mt="4px">
                <Typography mb="4px" variant="subtitle1" fontWeight="700">
                  No loan amount
                </Typography>
                <Typography variant="body2" color="#A0A3BD">
                  You can try to mortgage some NFT or ETH
                </Typography>
                <Typography variant="body2" color="#A0A3BD">
                  to get a loan amount.
                </Typography>
              </Box>
            )}
          </RiskLevelBox>
          <CustomizedSlider colorClass={MyLoanRiskLevelTag}></CustomizedSlider>
          <FlexEndBox>
            <Typography variant="body1" color="#4E4B66">
              Borrow Limit 18.09 ETH
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
                    10%
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
      <MyLoanModal open={open} repayRoBorrow={repayRoBorrow} onClose={() => setOpen(false)}></MyLoanModal>
    </MyLoanBox>
  )
}
