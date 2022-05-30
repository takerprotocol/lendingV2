import React from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isMobile } from '../../utils/userAgent'
import ClosePic from 'assets/images/svg/close.svg'

const DialogWrapper = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 12px;
  }
`

const CloseIcon = styled('span')`
  display: block;
  background-image: url(${ClosePic});
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.5;
  position: absolute;
  top: 30px;
  right: 30px;
`
interface ModalProps {
  width?: string
  isOpen: boolean
  isTitle?: boolean
  title?: string
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  onClose: () => void
}

export default function Modal({
  isTitle = true,
  width,
  isOpen,
  title,
  initialFocusRef,
  children,
  onClose,
}: ModalProps) {
  return (
    <>
      <DialogWrapper
        open={isOpen}
        onClose={onClose}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': width
              ? {
                  width: '100%',
                  maxWidth: width,
                }
              : {},
          },
        }}
      >
        <CloseIcon onClick={onClose} />
        {isTitle && <DialogTitle>{title}</DialogTitle>}
        {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
        {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
        {children}
      </DialogWrapper>
    </>
  )
}
