import { Button, styled, Modal, Box, Typography } from '@mui/material'
import whiteShutOff from 'assets/images/svg/common/whiteShutOff.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import whiteRight from 'assets/images/svg/common/whiteRight.svg'
import Right from 'assets/images/svg/common/right.svg'
import { CenterBox, SpaceBetweenBox } from 'styleds/index'
import { useMemo } from 'react'
import { fixedFormat, getRiskLevel, getRiskLevelTag, percent, plus, times } from 'utils'
import { useBorrowLimit, useCollateralBorrowLimitUsed, useCollateralRiskLevel, useHeath } from 'state/user/hooks'
import BigNumber from 'bignumber.js'
const style = {
  position: 'relative',
  width: '420px',
}
const TopBox = styled(Box)`
  height: 156px;
  padding-bottom: 32px;
  padding-top: 24px;
  box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.3);
  border-radius: 12px 12px 0px 0px;
`
const BottomBox = styled(Box)`
  margin-top: -13px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 15px 30px rgba(20, 20, 42, 0.2);
  border-radius: 12px;
`
const DataBox = styled(Box)`
  padding: 12px 16px;
  margin-top: 36px;
  width: 372px;
  background: #f7f7fc;
  border-radius: 6px;
`
export const RightBgBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  margin-right: 12px;
  height: 18px;
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
export default function MySupplySwitchModal({
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
  const upBorrowLimit = useBorrowLimit(times(ETHCollateralType, -1))
  const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(ETHCollateralType, switchType === 1 ? 1 : -1))
  const modalType = useMemo(() => {
    return !loanType && +NFTCollateralType === 0 && new BigNumber(upBorrowLimitUsed).lte(150) && switchType === 0
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
            sx={{ marginRight: '24px', justifyContent: 'flex-end', cursor: 'pointer' }}
            onClick={() => {
              handle('unable')
            }}
          >
            <img src={switchType === 0 ? shutOff : whiteShutOff} alt="" />
          </CenterBox>
          <Box mt="-8px">
            <CenterBox>
              <Typography
                variant="body1"
                component="h1"
                color={switchType === 0 ? '#A0A3BD' : 'rgba(255, 255, 255, 0.7)'}
              >
                Borrow Limit
              </Typography>
            </CenterBox>
            <CenterBox>
              <Typography
                mr="12px"
                variant="h4"
                color={switchType === 0 ? '#A0A3BD' : 'rgba(239, 240, 246, 0.6)'}
                fontWeight="600"
              >
                {switchType === 0 ? borrowLimit : upBorrowLimit}
              </Typography>
              <RightBgBox sx={{ background: `${switchType === 0 ? '#D9DBE9' : 'rgba(255, 255, 255, 0.2)'}` }}>
                <img src={switchType === 0 ? Right : whiteRight} alt="" />
              </RightBgBox>
              <Typography
                mr="6px"
                variant="h4"
                fontWeight="600"
                color={switchType === 0 ? '#4E4B66' : 'rgba(239, 240, 246)'}
              >
                {switchType === 1 ? borrowLimit : upBorrowLimit}
              </Typography>
              <Box paddingTop="8px">
                <Typography
                  variant="subtitle1"
                  fontWeight="700"
                  color={switchType === 0 ? '#4E4B66' : 'rgba(239, 240, 246)'}
                >
                  ETH
                </Typography>
              </Box>
            </CenterBox>
          </Box>
        </TopBox>
        <BottomBox>
          <Box sx={{ textAlign: 'center' }}>
            <Typography mb="4px" variant="h5" component="h1">
              {switchType === 0 ? 'Sure to unable ?' : 'Enable Collateral Mode'}
            </Typography>
            <Typography variant="subtitle2" component="span" color="#6E7191" fontWeight="500">
              {switchType === 0
                ? 'If you unable the collateral mode will reduce the borrow limit '
                : 'Use your Supply ETH as collateral to get a higher Borrow limit amount'}
            </Typography>
            <Typography
              display={modalType ? '' : 'none'}
              mt="4px"
              variant="subtitle2"
              component="span"
              color="#6E7191"
              fontWeight="500"
            >
              and{' '}
            </Typography>
            <Typography
              display={modalType ? '' : 'none'}
              variant="subtitle2"
              component="span"
              color="#E1536C"
              fontWeight="500"
            >
              increase your account risk level
            </Typography>
          </Box>
          {(switchType === 1 || modalType) && (
            <DataBox>
              <SpaceBetweenBox>
                <Box>
                  <Typography variant="body1" component="h1" color="#A0A3BD">
                    Collateral value (ETH)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                    {fixedFormat(switchType === 1 ? NFTCollateralType : plus(ETHCollateralType, NFTCollateralType))}
                    {' >'}
                  </Typography>
                  <Typography ml="6px" variant="body1" fontWeight="700" component="span">
                    {fixedFormat(switchType === 1 ? plus(ETHCollateralType, NFTCollateralType) : NFTCollateralType)}
                  </Typography>
                </Box>
              </SpaceBetweenBox>
              {!(switchType === 1 && (+NFTCollateralType === 0 || loanType)) && (
                <>
                  <SpaceBetweenBox marginY="16px">
                    <Box>
                      <Typography variant="body1" component="h1" color="#A0A3BD">
                        Borrow Limit Used
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                        {percent(borrowLimitUsed, 1)} {'>'}
                      </Typography>
                      <Typography ml="6px" variant="body1" fontWeight="700" component="span">
                        {upBorrowLimitUsed}
                      </Typography>
                    </Box>
                  </SpaceBetweenBox>
                  <SpaceBetweenBox>
                    <Box>
                      <Typography mr="8px" variant="body1" component="span" color="#A0A3BD">
                        Risk level
                      </Typography>
                      <Typography className={ColorClass} ml="8px" variant="body1" component="span" fontWeight="700">
                        {TypographyRiskLevel}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                        {heath} {'>'}
                      </Typography>
                      <Typography ml="6px" variant="body1" fontWeight="700" component="span">
                        {collateralRiskLevel}%
                      </Typography>
                    </Box>
                  </SpaceBetweenBox>
                </>
              )}
            </DataBox>
          )}
          {switchType === 0 ? (
            <SpaceBetweenBox mt="54px">
              <Button
                sx={{ width: '50%', height: '48px' }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  handle('enable')
                }}
              >
                Unable
              </Button>
              <Button
                sx={{ width: '50%', height: '48px', marginLeft: '24px' }}
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
              sx={{ marginTop: '48px', width: '372px', height: '54px' }}
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
