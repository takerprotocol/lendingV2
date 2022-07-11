import { Box, Button, Modal, styled, Typography } from '@mui/material'
import * as React from 'react'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'

const style = {
  transform: 'rgba(0, 0, 0, 0.5)',
  width: '420px',
  height: '286px',
  padding: '24px',
  background: '#FFFFFF',
  boxShadow: '0px 15px 30px rgba(20, 20, 42, 0.2)',
  borderRadius: '12px',
}
const FlexEndBox = styled(Box)`
  display: flex;
  margin: 8px 8px 0px 0px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
const SureButton = styled(Button)`
  width: 50%;
  height: 48px;
`
interface SureModalProps {
  openSureModal: boolean
  handle: Function
}
export default function SureModal({ openSureModal, handle }: SureModalProps) {
  return (
    <Modal open={openSureModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            handle('close')
          }}
        >
          <img src={shutOff} alt="" />
        </FlexEndBox>
        <FlexBox sx={{ justifyContent: 'center', marginTop: '32px' }}>
          <Typography variant="h5" component="h1">
            Are you sure you want to cancel
          </Typography>
        </FlexBox>
        <FlexBox sx={{ justifyContent: 'center' }}>
          <Typography variant="h5" component="h1">
            the selection?
          </Typography>
        </FlexBox>
        <SpaceBetweenBox mt="64px">
          <SureButton
            color="secondary"
            variant="contained"
            onClick={() => {
              handle('close')
            }}
          >
            Think about it
          </SureButton>
          <SureButton
            sx={{ marginLeft: '24px' }}
            variant="contained"
            onClick={() => {
              handle('cancel')
            }}
          >
            Cancel
          </SureButton>
        </SpaceBetweenBox>
      </Box>
    </Modal>
  )
}
