import useActiveWeb3React from 'hooks/useActiveWeb3React'
import LibUpdater from 'hooks/transactions/updater'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { checkedTransaction, finalizeTransaction } from './reducer'

export default function Updater() {
  const { chainId } = useActiveWeb3React()
  // speed up popup dismisall time if on L2

  const dispatch = useAppDispatch()
  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }: any) => dispatch(checkedTransaction({ chainId, hash, blockNumber })),
    [dispatch]
  )
  const onReceipt = useCallback(
    ({ chainId, hash, receipt }: any) => {
      debugger
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
      console.log(
        {
          txn: { hash },
        },
        hash
      )
    },
    [dispatch]
  )

  const state = useAppSelector((state) => state.transactions)
  const pendingTransactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  return <LibUpdater pendingTransactions={pendingTransactions} onCheck={onCheck} onReceipt={onReceipt} />
}
