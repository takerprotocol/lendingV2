import useActiveWeb3React from 'hooks/useActiveWeb3React'
import LibUpdater from 'hooks/transactions/updater'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { checkedTransaction, finalizeTransaction } from './reducer'
// import { toast } from 'react-toastify'
// import Toast from 'components/Toast'
import { useAllTransactions } from './hooks'
import { TransactionType } from './types'
import { toast } from 'react-toastify'
import Toast from 'components/Toast'

export default function Updater() {
  const { chainId } = useActiveWeb3React()
  const transactions = useAllTransactions()
  // speed up popup dismisall time if on L2

  const dispatch = useAppDispatch()
  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }: any) => dispatch(checkedTransaction({ chainId, hash, blockNumber })),
    [dispatch]
  )
  const onReceipt = useCallback(
    ({ chainId, hash, receipt }: any) => {
      dispatch(
        finalizeTransaction({
          chainId,
          hash,
          receipt: {
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            contractAddress: receipt.contractAddress,
            from: receipt.from,
            status: receipt.status,
            to: receipt.to,
            transactionHash: receipt.transactionHash,
            transactionIndex: receipt.transactionIndex,
          },
        })
      )
      // 弹窗
      const tx = transactions[hash]
      if (tx) {
        if (receipt.status === 1) {
          if (tx.info.type === TransactionType.APPROVAL) {
            toast.success(<Toast title="APPROVAL" message={`Approval ${tx.info.amount} ETH`} txId={hash}></Toast>)
          } else if (tx.info.type === TransactionType.DEPOSIT) {
            toast.success(<Toast title="DEPOSIT" message={`Deposit ${tx.info.amount} ETH`} txId={hash}></Toast>)
          }
        } else {
          if (receipt.status === 1) {
            if (tx.info.type === TransactionType.APPROVAL) {
              toast.error(<Toast title="APPROVAL" message={`Approval ${tx.info.amount} ETH`} txId={hash}></Toast>)
            } else if (tx.info.type === TransactionType.DEPOSIT) {
              toast.error(<Toast title="DEPOSIT" message={`Deposit ${tx.info.amount} ETH`} txId={hash}></Toast>)
            }
          }
        }
      }
    },
    [dispatch, transactions]
  )

  const state = useAppSelector((state) => state.transactions)
  const pendingTransactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  return <LibUpdater pendingTransactions={pendingTransactions} onCheck={onCheck} onReceipt={onReceipt} />
}
