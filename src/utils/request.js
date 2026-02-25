import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 30000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    console.log('请求发送前:', config)
    console.log('实际请求URL:', config.baseURL + config.url)
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log('响应成功:', response.data)
    return response.data
  },
  error => {
    console.error('响应错误:', error)
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error('请求失败:', error.response.data)
      }
    } else if (error.request) {
      console.error('网络错误，无法连接到服务器')
    } else {
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export default request