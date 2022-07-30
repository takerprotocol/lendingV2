import { styled, Modal, Box, Typography, Button } from '@mui/material'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import redWarning from 'assets/images/svg/common/redWarning.svg'
import { CenterBox } from 'styleds/index'
import { useBorrowLimit, useEthCollateral, useEthDebt } from 'state/user/hooks'
import { useMemo } from 'react'
import { div, times } from 'utils'
const style = {
  width: '420px',
  background: '#FFFFFF',
  padding: '24px',
  boxShadow: '0px 15px 30px rgba(20, 20, 42, 0.2)',
  borderRadius: '12px',
}
const ShutOffBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin: 8px;
  cursor: pointer;
`
interface MySupplySwitchUnableOffModalProps {
  switchUnableOffModal: boolean
  setOpenMySupplySwitchModal: Function
  setSwitchUnableOffModal: Function
  NFTCollateralType: string
  upBorrowLimitUsed: string
}
export default function MySupplySwitchUnableOffModal({
  switchUnableOffModal,
  setOpenMySupplySwitchModal,
  setSwitchUnableOffModal,
  NFTCollateralType,
  upBorrowLimitUsed,
}: MySupplySwitchUnableOffModalProps) {
  const EthCollateral = useEthCollateral()
  const ethDebt = useEthDebt()
  const borrowLimit = useBorrowLimit(times(EthCollateral, -1))
  const value = useMemo(() => {
    if (+NFTCollateralType === 0) {
      return borrowLimit
    } else {
      return div(ethDebt, borrowLimit)
    }
  }, [NFTCollateralType, borrowLimit, ethDebt])
  return (
    <Modal open={switchUnableOffModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <ShutOffBox
          onClick={() => {
            setSwitchUnableOffModal(false)
            setOpenMySupplySwitchModal(true)
          }}
        >
          <img src={shutOff} alt="" />
        </ShutOffBox>
        <CenterBox mt="11px">
          <img src={redWarning} alt="" />
        </CenterBox>
        <CenterBox>
          <Typography mt="9px" variant="h5" fontWeight="600">
            Unable to turn off
          </Typography>
        </CenterBox>
        <CenterBox sx={{ textAlign: 'center' }}>
          <Typography mt="4px" variant="subtitle2" component="span" color="#6E7191" fontWeight="500">
            Repayment of at least{' '}
            <Typography variant="subtitle2" component="span" color="rgba(20, 20, 42, 1)" fontWeight="600">
              {value} ETH
            </Typography>{' '}
            is required to turn off collateral mode
          </Typography>
        </CenterBox>
        <Button sx={{ width: '100%', marginTop: '48px', height: '54px' }} variant="contained">
          Got it
        </Button>
      </Box>
    </Modal>
  )
}
