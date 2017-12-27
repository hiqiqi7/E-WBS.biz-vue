
import axios from 'axios'
import config from '@/config'
import { Message } from 'element-ui'

// 创建 axios 实例
const instance = axios.create({
  baseURL: config.serverUrl
})

// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 如果服务端有响应，显示响应的错误信息
    if (error.response) {
      switch (error.response.data.status_code) {
        case 404:
          Message({ type: 'error', message: '服务器发生错误，请重试 !!!' })
          break
        case 422:
          Message({ type: 'error', message: '服务器发生错误，请重试 !!!' })
          break
        case 403:
          Message({ type: 'error', message: '服务器发生错误，请重试 !!!' })
          break
        case 500:
          Message({ type: 'error', message: '服务器发生错误，请重试 !!!' })
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
