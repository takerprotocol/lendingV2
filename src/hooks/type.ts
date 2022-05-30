import { BigNumber } from '@ethersproject/bignumber'

export interface IGODB {
  issue: BigNumber
  igoToken: string
  receiveToken: string
  templateIndex: BigNumber
  price: BigNumber
  igoTotal: BigNumber
  receivedTotal: BigNumber
  startTime: string
  endTime: string
  minLimit: BigNumber
  maxLimit: BigNumber
  unStakeFlag: boolean
  whiteListFlag: boolean
  hasReceivedTotal: BigNumber
}
