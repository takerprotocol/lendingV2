import { useCallback } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { ApprovalState, useApproval } from './useApproval'

function useGetAndTrackApproval(getApproval: any) {
  const addTransaction = useTransactionAdder()
  return useCallback(() => {
    return getApproval().then(
      (pending: { response: any; tokenAddress: string; spenderAddress: string; amount: string }) => {
        if (pending) {
          const { response, tokenAddress, spenderAddress: spender, amount } = pending
          addTransaction(response, { type: TransactionType.APPROVAL, tokenAddress, spender, amount })
          return response
        }
      }
    )
  }, [addTransaction, getApproval])
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(amount: string, spender?: string): [ApprovalState, () => Promise<any>] {
  const [approval, getApproval] = useApproval(amount, spender)
  return [approval, useGetAndTrackApproval(getApproval)]
}
