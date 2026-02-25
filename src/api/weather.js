import request from '../utils/request'
// 常用城市ADCODE映射（高德接口必须用数字编码，这里直接配好，可自行添加）
const cityAdcodeMap = {
  北京: '110000',
  上海: '310000',
  广州: '440100',
  深圳: '440300',
  杭州: '330100',
  成都: '510100',
  重庆: '500000',
  武汉: '420100',
  西安: '610100',
  南京: '320100',
  南昌: '360100'
}
export const weatherApi = {
  getCurrentWeather: async (city) => {
    try {
      // 校验城市是否在映射表中
      const adcode = cityAdcodeMap[city]
      if (!adcode) {
        throw new Error('暂不支持该城市查询，请输入北京/上海/广州等已配置城市')
      }
      // 调用高德天气API（参数改为adcode，适配接口要求）
      const data = await request({
        url: '/weather/weatherInfo',
        method: 'GET',
        params: {
          key: '9cc051969329be73ba63abf63afd0fc2',
          city: adcode, // 传数字编码，不是中文
          extensions: 'base', // 仅取实时天气，减少响应数据
          output: 'JSON'
        }
      })
      // 强容错校验返回数据
      if (data.status === '1' && Array.isArray(data.lives) && data.lives.length > 0) {
        const weatherData = data.lives[0]
        return {
          name: weatherData.city,
          main: {
            temp: parseFloat(weatherData.temperature) || 0,
            humidity: parseInt(weatherData.humidity) || 0
          },
          weather: [{
            description: weatherData.weather || '未知'
          }],
          wind: {
            speed: parseInt(weatherData.windpower) || 0
          }
        }
      } else {
        throw new Error(`API返回错误：${data.info || '无错误信息'}`)
      }
    } catch (error) {
      let errMsg = '获取天气失败'
      if (error.message) errMsg = error.message
      else if (error.response) errMsg = `接口异常：${error.response.status}`
      else if (error.request) errMsg = '网络错误，无法连接高德服务器'
      
      console.error('天气查询错误：', errMsg)
      throw new Error(errMsg)
    }
  }
}