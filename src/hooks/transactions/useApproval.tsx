import { MaxUint256 } from '@ethersproject/constants'
import { getWETH } from 'config'
import { useContract } from 'hooks/useContract'
import { useCallback, useEffect, useState } from 'react'
import erc20 from 'abis/MockErc20.json'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useAddress, useErc20ReserveData } from 'state/user/hooks'
// import BigNumber from 'bignumber.js'
import { TransactionResponse } from '@ethersproject/providers'
import { useHasPendingApproval } from 'state/transactions/hooks'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from 'hooks/web3'

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
  const { chainId } = useActiveWeb3React()

  const tokenContract = useContract(getWETH(chainId), erc20)
  const [approvalState, setApprovalState] = useState(ApprovalState.NOT_APPROVED)
  const address = useAddress()
  const hasPendingApproval = useHasPendingApproval(getWETH(chainId), spender)
  useEffect(() => {
    if (tokenContract && address && spender) {
      tokenContract.allowance(address, spender).then((allowance: BigNumber) => {
        if (new BigNumber(amount).lte(allowance.toString())) {
          setApprovalState(ApprovalState.APPROVED)
        } else {
          setApprovalState(ApprovalState.NOT_APPROVED)
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
    setApprovalState(ApprovalState.PENDING)
    return tokenContract
      .approve(spender, useExact ? amount : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: any) => {
        setApprovalState(ApprovalState.PENDING)
        return {
          response,
          tokenAddress: getWETH(chainId),
          amount,
          spenderAddress: spender,
        }
      })
      .catch((error: Error) => {
        logFailure(error)
        throw error
      })
  }, [tokenContract, amount, spender, chainId])

  return [approvalState, approve]
}

export function useTWETHApproval(
  amount: string,
  spender: string | undefined
): [
  ApprovalState,
  () => Promise<{ response: TransactionResponse; tokenAddress: string; spenderAddress: string } | undefined>
] {
  const erc20ReserveData = useErc20ReserveData()
  const tokenContract = useContract(erc20ReserveData.tTokenAddress, erc20)
  const [approvalState, setApprovalState] = useState(ApprovalState.NOT_APPROVED)
  const address = useAddress()
  const hasPendingApproval = useHasPendingApproval(erc20ReserveData.tTokenAddress, spender)
  useEffect(() => {
    if (tokenContract && address && spender) {
      tokenContract.allowance(address, spender).then((allowance: BigNumber) => {
        if (new BigNumber(amount).lte(allowance.toString())) {
          setApprovalState(ApprovalState.APPROVED)
        } else {
          setApprovalState(ApprovalState.NOT_APPROVED)
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
    setApprovalState(ApprovalState.PENDING)
    return tokenContract
      .approve(spender, useExact ? amount : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: any) => {
        setApprovalState(ApprovalState.PENDING)
        return {
          response,
          tokenAddress: erc20ReserveData.tTokenAddress,
          amount,
          spenderAddress: spender,
        }
      })
      .catch((error: Error) => {
        logFailure(error)
        throw error
      })
  }, [tokenContract, amount, spender, erc20ReserveData.tTokenAddress])

  return [approvalState, approve]
}
