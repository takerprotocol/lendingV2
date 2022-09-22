import React from 'react'
import { Box, Typography } from '@mui/material'
import mobileWallet from 'assets/images/svg/common/mobileWallet-Left.svg'
import { styled } from '@mui/material/styles'

const DialogWrapper = styled(Box)`
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem 1rem;
  display: flex;
  width: 100%;
  align-items: center;
`

interface ModalProps {
  width?: string
  isTitle?: boolean
  title?: string
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
}

export default function MobileModal({ isTitle = true, width, title, initialFocusRef, children }: ModalProps) {
  return (
    <>
      <DialogWrapper>
        {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
        <img src={mobileWallet} alt="" />
        <Typography variant="subtitle1" ml="4.25rem" lineHeight="1.125rem" fontWeight="700" color="#262338">
          {title}
        </Typography>
      </DialogWrapper>
    </>
  )
}
