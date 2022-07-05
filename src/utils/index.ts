import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { JSEncrypt } from 'jsencrypt'

const SHA256 = require('crypto-js/sha256')

BigNumber.config({ EXPONENTIAL_AT: [-40, 40] })
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function bcryptPassword(password: string, publicKey: string): string {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(SHA256(password).toString()) || ''
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function getDefaultProvider(): Web3Provider | undefined {
  if (window.ethereum) {
    return new Web3Provider(window.ethereum)
  } else {
    return undefined
  }
}

export function numFormat(value?: string | number, thousandSeparated = true): string {
  if (value) {
    const fmt = {
      prefix: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: thousandSeparated ? 3 : 0,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0,
      suffix: '',
    }
    const x = new BigNumber(value)
    BigNumber.config({ FORMAT: fmt })
    return x.toFormat()
  }
  return ''
}

export function fixedFormat(value?: string | number): string {
  if (value) {
    if (value.toString().split('.')[1] && value.toString().split('.')[1].length > 8) {
      return new BigNumber(value).dp(8).toFormat(2, 1)
    } else {
      return new BigNumber(value).toFormat(2, 1)
    }
  }
  return ''
}

export function decimalFormat(value?: number | string, decimal = 18, thousandSeparated = true, precision = 2) {
  if (value) {
    if (thousandSeparated) {
      return new BigNumber(value).div(new BigNumber(10).pow(decimal)).toFormat(precision, 1)
    } else {
      return new BigNumber(value).div(new BigNumber(10).pow(decimal)).toFixed(precision, 1).toString()
    }
  } else {
    return '0'
  }
}

export function div(value1: number | string | BigNumber, value2: number | string | BigNumber) {
  if (value1) {
    if (BigNumber.isBigNumber(value1)) {
      return value1.div(value2).toFormat()
    } else {
      return new BigNumber(value1).div(value2).toFormat()
    }
  } else {
    return '0'
  }
}

export function timestampFormat(diff: number): [number, number, number, number] {
  if (diff > 0) {
    const diffd = Math.floor(diff / (24 * 3600 * 1000))
    const diffh = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const diffm = Math.floor((diff / (1000 * 60)) % 60)
    const diffs = Math.floor((diff / 1000) % 60)
    return [diffd, diffh, diffm, diffs]
  } else {
    return [0, 0, 0, 0]
  }
}

export function desensitization(str: string | undefined, beginLen = 4, endLen = -4, fillingLen = 3) {
  if (!str) return ''
  let tempStr = ''
  const len = str.length
  const firstStr = str.substring(0, beginLen)
  const lastStr = str.substring(len + endLen, len)
  const middleStr = str.substring(beginLen, beginLen + fillingLen).replace(/[\s\S]/gi, '.')
  tempStr = firstStr + middleStr + lastStr
  return tempStr
}

export const isValidEmail = (email: string) => {
  const res = email.match(/^[/+_a-z0-9-'&=]+(\.[/+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)
  return res !== null
}

export const repairZero = (value: string | number, length: number) => {
  return (Array(length).join('0') + value).slice(-length)
}

export const formatFiatPrice = (value: string | number, price: string | number): string | number => {
  if (!price) {
    return value
  }
  if (!value || value === '-') {
    return '-'
  }
  return new BigNumber(value).times(price).decimalPlaces(2, 1).toString()
}

export function bigNumberToString(value: BigNumber, thousandSeparated = true) {
  if (value) {
    if (thousandSeparated) {
      return new BigNumber(value.toString()).toFormat(2, 1)
    } else {
      return new BigNumber(value.toString()).toFixed(2, 1).toString()
    }
  } else {
    return '0'
  }
}

export const RiskLevel = (value: string | number) => {
  switch (true) {
    case value < 100:
      return 'In liquidation...'
    case value <= 110 && value >= 100:
      return 'HIGH RISK'
    case value <= 130 && value > 110:
      return 'RISKY'
    default:
      return 'HEALTHY'
  }
}
export const RiskLevelTag = (value: string | number) => {
  switch (true) {
    case value < 100:
      return 'In-liquidation'
    case value < 110 && value >= 100:
      return 'High-Risk'
    case value <= 130 && value > 110:
      return 'Risky'
    default:
      return 'Healthy'
  }
}
