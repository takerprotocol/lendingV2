import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenStatic } from 'axios'
import { ResponseBase } from './responseBase'
import { apiUrl } from '../config'
import { toast } from 'react-toastify'

export class Request {
  protected instance: AxiosInstance

  protected pending: Array<{
    url: string
    cancel: Function
  }> = []

  protected CancelToken: CancelTokenStatic = axios.CancelToken

  protected axiosRequestConfig: AxiosRequestConfig = {}

  protected successCode: Array<number> = [200, 201, 204]
  protected tokenInvalidCode = 602
  protected hasExitedCode = 600
  protected baseURL = apiUrl + 'api/'

  constructor() {
    this.requestConfig()
    this.instance = axios.create(this.axiosRequestConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseBase<T>> {
    try {
      return await this.instance.get(url, config)
    } catch (err: any) {
      const message = err.message || err.msg || '请求失败'
      return {
        code: -1,
        msg: message,
        data: null as any,
      }
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseBase<T>> {
    try {
      return await this.instance.post(url, data, config)
    } catch (err: any) {
      const message = err.message || err.msg || '请求失败'
      return {
        code: err.code,
        msg: message,
        data: null as any,
      }
    }
  }

  // axios请求配置
  protected requestConfig(): void {
    this.axiosRequestConfig = {
      baseURL: this.baseURL,
      headers: {
        timestamp: String(new Date().getTime()),
        'Content-Type': 'application/json',
      },
      timeout: 30000,
      withCredentials: false,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxRedirects: 5,
      maxContentLength: 2000,
      validateStatus(status: number) {
        return status >= 200 && status < 500
      },
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true })
    }
  }

  // 请求拦截
  protected interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.removePending(config)
        config.cancelToken = new this.CancelToken((c: any) => {
          this.pending.push({
            url: `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`,
            cancel: c,
          })
        })
        const token = localStorage.getItem('token')
        if (token) {
          Object.assign(config.headers, { 'game-plus-token': `${token}` })
        }
        this.requestLog(config)
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  protected interceptorsResponse(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.responseLog(response)
        this.removePending(response.config)
        if (this.successCode.indexOf(response.status) === -1) {
          return Promise.reject(response.data || 'Error')
        }
        if (response.data.code === this.tokenInvalidCode) {
          localStorage.removeItem('token')
          return Promise.reject(response.data || 'Error')
        }
        if (response.data.code === this.hasExitedCode) {
          toast.error('Your account has been signed out')
          setTimeout(() => {
            document.location.reload()
          }, 2000)
          return Promise.reject(response.data || 'Error')
        }
        if (response.data.code !== 200) {
          return Promise.reject(response.data || 'Error')
        }
        return response.data
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  // 取消重复请求
  protected removePending(config: AxiosRequestConfig): void {
    this.pending.map((v, index) => {
      if (v.url === `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`) {
        v.cancel()
        this.pending.splice(index, 1)
      }
      return v
    })
  }

  // 请求日志
  protected requestLog(request: AxiosRequestConfig): void {
    if (process.env.NODE_ENV === 'development') {
      // const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
      //   Math.random() * 255
      // )})`
      // console.log('%c┍------------------------------------------------------------------┑', `color:${randomColor};`)
      // console.log('| 请求地址：', request.url)
      // console.log(
      //   '| 请求参数：',
      //   qs.parse(((request.method || 'get').toLowerCase() === 'get' ? request.params : request.data) as any)
      // )
      // console.log('%c┕------------------------------------------------------------------┙', `color:${randomColor};`)
    }
  }

  // 响应日志
  protected responseLog(response: AxiosResponse): void {
    if (process.env.NODE_ENV === 'development') {
      // const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
      //   Math.random() * 255
      // )})`
      // console.log('%c┍------------------------------------------------------------------┑', `color:${randomColor};`)
      // console.log('| 请求地址：', response.config.url)
      // console.log('| 请求参数：', qs.parse(response.config.data as any))
      // console.log('| 返回数据：', response.data)
      // console.log('%c┕------------------------------------------------------------------┙', `color:${randomColor};`)
    }
  }
}

export default new Request()
