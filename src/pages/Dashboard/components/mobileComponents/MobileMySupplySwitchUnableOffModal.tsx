import { styled, Modal, Box, Typography, Button } from '@mui/material'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import redWarning from 'assets/images/svg/common/redWarning.svg'
import { CenterBox } from 'styleds/index'
import { useBorrowLimit, useEthCollateral, useEthDebt } from 'state/user/hooks'
import { fixedFormat, minus, times } from 'utils'
const style = {
  width: '100%',
  background: '#FFFFFF',
  marginLeft: '2.375rem',
  marginRight: '2.375rem',
  padding: '1rem',
  boxShadow: '0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2)',
  borderRadius: '0.75rem',
}
const ShutOffBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`
interface MobileMySupplySwitchUnableOffModalProps {
  switchUnableOffModal: boolean
  setSwitchUnableOffModal: Function
  NFTCollateralType: string
}
export default function MobileMySupplySwitchUnableOffModal({
  switchUnableOffModal,
  setSwitchUnableOffModal,
  NFTCollateralType,
}: MobileMySupplySwitchUnableOffModalProps) {
  const EthCollateral = useEthCollateral()
  const ethDebt = useEthDebt()
  // const [value, setValue] = useState<string>('')
  const borrowLimit = useBorrowLimit(times(EthCollateral, -1))
  return (
    <Modal open={switchUnableOffModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <ShutOffBox
          onClick={() => {
            setSwitchUnableOffModal(false)
          }}
        >
          <img src={shutOff} alt="" />
        </ShutOffBox>
        <CenterBox my="0.5625rem">
          <img src={redWarning} alt="" />
        </CenterBox>
        <CenterBox>
          <Typography variant="subtitle1" fontWeight="700">
            Unable to turn off
          </Typography>
        </CenterBox>
        <CenterBox sx={{ textAlign: 'center' }}>
          <Typography mt="0.5rem" variant="body2" color="#6E7191" fontWeight="500">
            Repayment of at least{' '}
            <Typography variant="body2" component="span" color="rgba(20, 20, 42, 1)" fontWeight="600">
              {+NFTCollateralType === 0
                ? fixedFormat(minus(ethDebt, borrowLimit))
                : fixedFormat(minus(ethDebt, borrowLimit))}{' '}
              ETH
            </Typography>{' '}
            is required to turn off collateral mode
          </Typography>
        </CenterBox>
        <Button sx={{ width: '100%', marginTop: '2.25rem', height: '3rem' }} variant="contained">
          Got it
        </Button>
      </Box>
    </Modal>
  )
}
