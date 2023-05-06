/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, TextField, styled } from '@mui/material'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useContract } from 'hooks/useContract'
import MockMAYC_ABI from 'abis/WETHGateway.json'
import { useState } from 'react'
// import { useCollections } from 'state/application/hooks'
// import { RetryableError } from 'utils/retry'
// import { Box, styled } from '@mui/material'
// import { useState } from 'react'
import { amountDecimal } from 'utils'
import { useDecimal } from 'state/user/hooks'
import { ApprovalState } from 'hooks/transactions/useApproval'
import { useTTokenApproveCallback } from 'hooks/transactions/useApproveCallback'

const MintBox = styled(Box)`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`

export default function Withdraw() {
  // const collection = useCollections()
  const { account } = useActiveWeb3React()
  const [value, setValue] = useState<string>('')
  const decimal = useDecimal()
  const useMockMAYCContract = useContract('0x898b4faa08fdd29726793cbd06a3da553d8bb638', MockMAYC_ABI)
  const [tokenApproval, tokenApproveCallback] = useTTokenApproveCallback(
    value || '1',
    '0x898b4faa08fdd29726793cbd06a3da553d8bb638'
  )
  console.log(tokenApproval)
  return (
    <MintBox>
      <TextField
        sx={{
          border: '1px solid #000000',
        }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></TextField>
      <Button
        variant="contained"
        sx={{ marginTop: '16px' }}
        onClick={async () => {
          if (useMockMAYCContract) {
            if (tokenApproval !== ApprovalState.APPROVED) {
              await tokenApproveCallback()
            } else {
              useMockMAYCContract.withdraw(
                '0xA58Dd872770dD6b1107a8f4A039Cd6Bb63F9db56',
                amountDecimal(value, decimal),
                account
              )
            }
          }
        }}
      >
        Withdraw
      </Button>
    </MintBox>
  )
}
