interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values is persisted in state and if you change the value it will cause errors
 */
export enum TransactionType {
  APPROVAL = 0,
  DEPOSIT,
  WITHDRAW,
  DEPOSIT_NFT,
  WITHDRAW_NFT,
  BORROW,
  REPAY,
  APPROVAL_NFT,
  LIQUIDATE,
  USE_COLLATERAL,
}

export interface BaseTransactionInfo {
  type: TransactionType
}

export interface DepositTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.DEPOSIT | TransactionType.WITHDRAW
  recipient: string
  amount: string
}
export interface DepositNftTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.DEPOSIT_NFT | TransactionType.WITHDRAW_NFT
  recipient: string
  amount: string
  count: number
}
export interface BorrowTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BORROW
  recipient: string
  amount: string
}
export interface RepayTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.REPAY
  recipient: string
  amount: string
}
export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL
  tokenAddress: string
  spender: string
  amount: string
}

export interface ApproveNFTTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL_NFT
  spender: string
  amount: string
  message: string
}

export interface LiquidateTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.LIQUIDATE
  amount: string
}
export interface UseCollateralTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.USE_COLLATERAL
  value: boolean
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | DepositTransactionInfo
  | DepositNftTransactionInfo
  | BorrowTransactionInfo
  | RepayTransactionInfo
  | ApproveNFTTransactionInfo
  | LiquidateTransactionInfo
  | UseCollateralTransactionInfo

export interface TransactionDetails {
  hash: string
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
  info: TransactionInfo
}
