import { Box, Button, Modal, styled, Typography } from '@mui/material'
import * as React from 'react'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'

const style = {
  transform: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  margin: '0 2.375rem',
  padding: '1rem',
  background: '#FFFFFF',
  boxShadow: '0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2)',
  borderRadius: '0.75rem',
}
const FlexEndBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
const SureButton = styled(Button)`
  width: 50%;
  height: 3rem;
`
interface SureModalProps {
  openSureModal: boolean
  type: string
  setOpenSureModal: Function
  setMobileWithdrawCheckedIndex: Function
  setMobileDepositCheckedIndex: Function
}
export default function MobileSureModal({
  openSureModal,
  type,
  setOpenSureModal,
  setMobileWithdrawCheckedIndex,
  setMobileDepositCheckedIndex,
}: SureModalProps) {
  return (
    <Modal open={openSureModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            setOpenSureModal(false)
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23.1943 10.4171C23.6393 9.97216 23.6393 9.2507 23.1943 8.80571C22.7493 8.36073 22.0278 8.36073 21.5829 8.80571L16 14.3886L10.4171 8.80571C9.97216 8.36073 9.2507 8.36073 8.80571 8.80571C8.36073 9.2507 8.36073 9.97216 8.80571 10.4171L14.3886 16L8.80572 21.5829C8.36073 22.0278 8.36073 22.7493 8.80571 23.1943C9.2507 23.6393 9.97216 23.6393 10.4171 23.1943L16 17.6114L21.5829 23.1943C22.0278 23.6393 22.7493 23.6393 23.1943 23.1943C23.6393 22.7493 23.6393 22.0278 23.1943 21.5829L17.6114 16L23.1943 10.4171Z"
              fill="#14142A"
            />
          </svg>
        </FlexEndBox>
        <FlexBox sx={{ marginTop: '1rem' }}>
          <Typography textAlign="center" variant="subtitle1">
            Are you sure you want to cancel the selection?
          </Typography>
        </FlexBox>
        <SpaceBetweenBox mt="3rem">
          <SureButton
            color="secondary"
            variant="contained"
            onClick={() => {
              setOpenSureModal(false)
            }}
          >
            Think about it
          </SureButton>
          <SureButton
            sx={{ marginLeft: '0.5rem' }}
            variant="contained"
            onClick={() => {
              if (type === 'deposit') {
                setMobileDepositCheckedIndex([])
              } else {
                setMobileWithdrawCheckedIndex([])
              }
              setOpenSureModal(false)
            }}
          >
            Cancel
          </SureButton>
        </SpaceBetweenBox>
      </Box>
    </Modal>
  )
}
