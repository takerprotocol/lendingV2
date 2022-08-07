import { MaxUint256 } from '@ethersproject/constants'
import { ERC20_ADDRESS } from 'config'
import { useContract } from 'hooks/useContract'
import { useCallback, useEffect, useState } from 'react'
import erc20 from 'abis/MockErc20.json'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useAddress } from 'state/user/hooks'
// import BigNumber from 'bignumber.js'
import { TransactionResponse } from '@ethersproject/providers'
import { useHasPendingApproval } from 'state/transactions/hooks'
import BigNumber from 'bignumber.js'

export enum ApprovalState {
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export function useApproval(
  amount: string,
  spender: string | undefined
): [
  ApprovalState,
  () => Promise<{ response: TransactionResponse; tokenAddress: string; spenderAddress: string } | undefined>
] {
  const tokenContract = useContract(ERC20_ADDRESS, erc20)
  const [approvalState, setApprovalState] = useState(ApprovalState.NOT_APPROVED)
  const address = useAddress()
  const hasPendingApproval = useHasPendingApproval(ERC20_ADDRESS, spender)
  useEffect(() => {
    if (tokenContract && address && spender) {
      tokenContract.allowance(address, spender).then((allowance: BigNumber) => {
        if (new BigNumber(amount).lte(allowance.toString())) {
          setApprovalState(ApprovalState.APPROVED)
        }
      })
    }
  }, [tokenContract, address, spender, amount, hasPendingApproval])
  const approve = useCallback(async () => {
    function logFailure(error: Error | string): undefined {
      console.warn(`Token approval failed:`, error)
      return
    }
    // Bail early if there is an issue.
    if (!tokenContract) {
      return logFailure('tokenContract is null')
    } else if (!amount) {
      return logFailure('missing amount to approve')
    } else if (!spender) {
      return logFailure('no spender')
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens which restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amount)
    })

    return tokenContract
      .approve(spender, useExact ? amount : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: any) => {
        setApprovalState(ApprovalState.PENDING)
        return {
          response,
          tokenAddress: ERC20_ADDRESS,
          amount,
          spenderAddress: spender,
        }
      })
      .catch((error: Error) => {
        logFailure(error)
        throw error
      })
  }, [tokenContract, amount, spender])

  return [approvalState, approve]
}