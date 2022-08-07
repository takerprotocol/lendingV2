import { Box, Typography, Link } from '@mui/material'
import Copy from 'components/Copy'
import React from 'react'
import { colors } from 'theme'
import { desensitization } from 'utils'

interface ToastProps {
  title?: string
  message?: string
  txId?: string
}

export default function Toast({ title, message, txId }: ToastProps) {
  return (
    <Box>
      {txId ? (
        <>
          <Typography variant="subtitle1" color="#14142A" fontWeight="700" sx={{ wordBreak: 'break-all' }}>
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="#262338"
            sx={{ wordBreak: 'break-all' }}
            display="flex"
            alignItems="center"
          >
            {message}
            <Link
              variant="subtitle2"
              sx={{ textDecorationColor: colors.white, marginLeft: '8px' }}
              color="#7646FF"
              href={`https://rinkeby.etherscan.io/tx/${txId}`}
            >
              {desensitization(txId)}
            </Link>
            <Copy color="#7646FF" text={txId} />
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="subtitle1" color="#14142A" fontWeight="700" sx={{ wordBreak: 'break-all' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="#A0A3BD" sx={{ wordBreak: 'break-all' }}>
            {message}
          </Typography>
        </>
      )}
    </Box>
  )
}

export class Greeting extends React.Component {
  render() {
    return <h1>Hello, 11111</h1>
  }
}