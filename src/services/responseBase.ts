export interface ResponseBase<T = any> {
  code: number
  msg: string
  data: T
  success?: boolean
  timestamp?: string
}
