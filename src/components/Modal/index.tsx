import React from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isMobile } from '../../utils/userAgent'
import ClosePic from 'assets/images/svg/common/shutOff.svg'

const DialogWrapper = styled(Dialog)`
  box-shadow: 0px 15px 30px rgba(20, 20, 42, 0.2);
  .MuiPaper-root {
    border-radius: 12px;
  }
  .MuiDialogTitle-root {
    color: #a0a3bd;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
  }
`

const CloseIcon = styled('span')`
  display: block;
  background-image: url(${ClosePic});
  background-repeat: no-repeat;
  width: 16px;
  height: 32px;
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;
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
