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
export const FlexEndBox = styled(Box)`
  display: flex;
  margin: 8px 8px 0px 0px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
export default function SureModal({ open, handle }: { open: boolean; handle: Function }) {
  console.log(open)
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            handle(false)
          }}
        >
          <img src={shutOff} alt="" />
        </FlexEndBox>
        <FlexBox
          sx={{
            justifyContent: 'center',
            marginTop: '32px',
          }}
        >
          <Typography variant="h5" component="h1" color="#14142A">
            Are you sure you want to cancel
          </Typography>
        </FlexBox>
        <FlexBox
          sx={{
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" component="h1" color="#14142A">
            the selection?
          </Typography>
        </FlexBox>
        <SpaceBetweenBox mt="64px">
          <Button color="secondary" variant="contained" sx={{ width: '174px', height: '48px' }}>
            Think about it
          </Button>
          <Button variant="contained" sx={{ width: '174px', height: '48px' }}>
            Cancel
          </Button>
        </SpaceBetweenBox>
      </Box>
    </Modal>
  )
}
