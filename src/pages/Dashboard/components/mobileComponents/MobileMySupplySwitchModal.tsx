import { Button, styled, Modal, Box, Typography } from '@mui/material'
import whiteShutOff from 'assets/images/svg/common/whiteShutOff.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import whiteRight from 'assets/images/svg/common/whiteRight.svg'
import Right from 'assets/images/svg/common/right.svg'
import { CenterBox, FlexBox, SpaceBetweenBox } from 'styleds/index'
import { useMemo } from 'react'
import { fixedFormat, getRiskLevel, getRiskLevelTag, plus, times } from 'utils'
import {
  useBorrowLimit,
  useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useHeath,
  useUserValue,
} from 'state/user/hooks'
import BigNumber from 'bignumber.js'
const style = {
  position: 'relative',
  width: '100%',
}
const TopBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  padding-bottom: 2.25rem;
  padding-top: 1rem;
  box-shadow: 0px 0.625rem 1.25rem rgba(20, 20, 42, 0.3);
  border-radius: 0.75rem 0.75rem 0px 0px;
`
const BottomBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  margin-top: -0.75rem;
  padding: 1.5rem 1rem 1rem 1rem;
  background: #ffffff;
  box-shadow: 0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2);
  border-radius: 0.75rem;
`
const DataBox = styled(Box)`
  margin-bottom: 1.5rem;
  width: 100%;
  border-radius: 0.375rem;
`
export const RightBgBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  margin-right: 0.75rem;
  height: 1.125rem;
  border-radius: 100%;
`
interface MySupplySwitchModalProps {
  openMySupplySwitchModal: boolean
  loanType: boolean
  handle: Function
  ETHCollateralType: string
  NFTCollateralType: string
  switchType: number
}
export default function MobileMySupplySwitchModal({
  openMySupplySwitchModal,
  loanType,
  NFTCollateralType,
  ETHCollateralType,
  handle,
  switchType,
}: MySupplySwitchModalProps) {
  const heath = useHeath()
  const collateralRiskLevel = useCollateralRiskLevel(times(ETHCollateralType, switchType === 1 ? 1 : -1))
  const TypographyRiskLevel = getRiskLevel(collateralRiskLevel)
  const ColorClass = getRiskLevelTag(collateralRiskLevel)
  const borrowLimitUsed = useCollateralBorrowLimitUsed()
  const borrowLimit = useBorrowLimit()
  const userValue = useUserValue()
  const upBorrowLimit = useBorrowLimit(times(ETHCollateralType, -1))
  const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(ETHCollateralType, switchType === 1 ? 1 : -1))
  // const NFTCollateral = useMemo(()=>{
  //   return()
  // })
  const modalType = useMemo(() => {
    return !loanType && +NFTCollateralType !== 0 && new BigNumber(upBorrowLimitUsed).lte(150) && switchType === 0
  }, [NFTCollateralType, loanType, switchType, upBorrowLimitUsed])

  return (
    <Modal
      open={openMySupplySwitchModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TopBox
          sx={{
            background: `${switchType === 0 ? '#eff0f6' : 'linear-gradient(249.47deg, #6AA2F7 0%, #627EEA 100%)'}`,
          }}
        >
          <CenterBox
            sx={{ marginRight: '1rem', justifyContent: 'flex-end', cursor: 'pointer' }}
            onClick={() => {
              handle('unable')
            }}
          >
            <img src={switchType === 0 ? shutOff : whiteShutOff} alt="" />
          </CenterBox>
          <Box>
            <CenterBox>
              <Typography variant="body1" color={switchType === 0 ? '#A0A3BD' : 'rgba(255, 255, 255, 0.7)'}>
                Borrow Limit
              </Typography>
            </CenterBox>
            <CenterBox mt="0.5rem">
              <Typography
                mr="0.75rem"
                fontSize="1.25rem"
                lineHeight="1.5rem"
                color={switchType === 0 ? '#A0A3BD' : 'rgba(239, 240, 246, 0.6)'}
                fontWeight="600"
              >
                {switchType === 0 ? fixedFormat(borrowLimit) : fixedFormat(upBorrowLimit)}
              </Typography>
              <RightBgBox sx={{ background: `${switchType === 0 ? '#D9DBE9' : 'rgba(255, 255, 255, 0.2)'}` }}>
                <img src={switchType === 0 ? Right : whiteRight} alt="" />
              </RightBgBox>
              <Typography
                mr="0.375rem"
                fontSize="1.25rem"
                lineHeight="1.5rem"
                fontWeight="600"
                color={switchType === 0 ? '#4E4B66' : 'rgba(239, 240, 246)'}
              >
                {switchType === 1 ? fixedFormat(borrowLimit) : fixedFormat(upBorrowLimit)}
              </Typography>
              <Box paddingTop="0.375rem">
                <Typography
                  variant="body1"
                  fontWeight="700"
                  lineHeight="1.0625rem"
                  color={switchType === 0 ? '#4E4B66' : 'rgba(239, 240, 246)'}
                >
                  ETH
                </Typography>
              </Box>
            </CenterBox>
          </Box>
        </TopBox>
        <BottomBox>
          <Box mb="2.25rem" sx={{ textAlign: 'center' }}>
            <Typography mb="0.375rem" variant="subtitle1" fontWeight="700">
              {switchType === 0 ? 'Sure to unable ?' : 'Enable Collateral Mode'}
            </Typography>
            <Typography display={switchType === 0 ? 'inline' : ''} variant="body2" color="#6E7191">
              {switchType === 0
                ? 'If you unable the collateral mode will reduce the borrow limit '
                : 'Use your Supply ETH as collateral to get a higher Borrow limit amount'}
            </Typography>
            <Typography display={modalType ? 'inline' : 'none'} variant="body2" color="#6E7191">
              and&nbsp;
            </Typography>
            <Typography display={modalType ? 'inline' : 'none'} fontWeight="600" variant="body2" color="#E1536C">
              increase your account risk level
            </Typography>
          </Box>
          {(switchType === 1 || modalType) && (
            <DataBox>
              <SpaceBetweenBox>
                <Box>
                  <Typography variant="body2" component="h1" color="#A0A3BD">
                    Collateral value (ETH)
                  </Typography>
                </Box>
                <FlexBox>
                  <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                    {fixedFormat(
                      switchType === 1
                        ? userValue.NFTLiquidity
                        : plus(userValue.borrowLiquidity, userValue.NFTLiquidity)
                    )}
                    {' >'}
                  </Typography>
                  <Typography ml="0.375rem" variant="body2" fontWeight="700">
                    {fixedFormat(
                      switchType === 1
                        ? plus(userValue.borrowLiquidity, userValue.NFTLiquidity)
                        : userValue.NFTLiquidity
                    )}
                  </Typography>
                </FlexBox>
              </SpaceBetweenBox>
              {!(switchType === 1 && (+NFTCollateralType === 0 || loanType)) && (
                <>
                  <SpaceBetweenBox marginY="1rem">
                    <Box>
                      <Typography variant="body2" component="h1" color="#A0A3BD">
                        Borrow Limit Used
                      </Typography>
                    </Box>
                    <FlexBox>
                      <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                        {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
                      </Typography>
                      <Typography ml="0.375rem" variant="body2" fontWeight="700">
                        {new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}%
                      </Typography>
                    </FlexBox>
                  </SpaceBetweenBox>
                  <SpaceBetweenBox>
                    <FlexBox>
                      <Typography variant="body2" color="#A0A3BD">
                        Heath Level
                      </Typography>
                      <Typography className={ColorClass} ml="0.5rem" variant="body2" fontWeight="700">
                        {TypographyRiskLevel}
                      </Typography>
                    </FlexBox>
                    <FlexBox>
                      <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                        {heath} {'>'}
                      </Typography>
                      <Typography ml="0.375rem" variant="body2" fontWeight="700">
                        {collateralRiskLevel}%
                      </Typography>
                    </FlexBox>
                  </SpaceBetweenBox>
                </>
              )}
            </DataBox>
          )}
          {switchType === 0 ? (
            <SpaceBetweenBox>
              <Button
                sx={{ width: '50%', height: '3rem' }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  handle('enable')
                }}
              >
                Unable
              </Button>
              <Button
                sx={{ width: '50%', height: '3rem', marginLeft: '0.5rem' }}
                variant="contained"
                onClick={() => {
                  handle('unable')
                }}
              >
                Think about it
              </Button>
            </SpaceBetweenBox>
          ) : (
            <Button
              sx={{ width: '100%', height: '3rem' }}
              variant="contained"
              onClick={() => {
                handle('enable')
              }}
            >
              Enable
            </Button>
          )}
        </BottomBox>
      </Box>
    </Modal>
  )
}
