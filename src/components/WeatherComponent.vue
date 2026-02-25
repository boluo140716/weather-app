<template>
  <div class="weather-container">
    <h2>天气查询</h2>
    
    <!-- 输入表单 -->
    <div class="input-group">
      <input 
        v-model="city" 
        type="text" 
        placeholder="输入你想查询天气的城市"
        @keyup.enter="fetchWeather"
      />
      <button @click="fetchWeather" :disabled="loading">
        {{ loading ? '查询中...' : '查询天气' }}
      </button>
    </div>
    
    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <!-- 天气数据展示 -->
    <div v-if="weatherData" class="weather-info">
      <h3>{{ weatherData.city }} 的天气</h3>
      <p data-label="天气状况">{{ weatherData.description }}</p>
      <p data-label="温度">{{ weatherData.temperature }}°C</p>
      <p data-label="湿度">{{ weatherData.humidity }}%</p>
      <p data-label="风速">{{ weatherData.windSpeed }} m/s</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { weatherApi } from '../api/weather'

// 响应式数据
const city = ref('')
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')

// 获取天气数据
const fetchWeather = async () => {
  if (!city.value) {
    error.value = '请输入城市名称'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const data = await weatherApi.getCurrentWeather(city.value)
    
    weatherData.value = {
      city: data.name || '未知城市',
      temperature: data.main?.temp || '未知',
      description: data.weather?.[0]?.description || '未知天气',
      humidity: data.main?.humidity || '未知',
      windSpeed: data.wind?.speed || '未知'
    }
  } catch (err) {
    error.value = err.message
    console.error('查询天气时出错:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 90%;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 100vh;
  margin: 0;
  border: none;
  border-radius: 0;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.input-group {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

input {
  flex: 1;
  min-width: 200px;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #213547;
  background-color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4CAF50;
}

input::placeholder {
  color: #999;
}

button {
  padding: 14px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  min-width: 100px;
  transition: background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
  font-weight: 500;
}

button:hover {
  background-color: #45a049;
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #d32f2f;
  margin: 15px 0;
  font-size: 14px;
  padding: 12px 16px;
  background-color: #ffebee;
  border-radius: 8px;
  border-left: 4px solid #d32f2f;
}

.weather-info {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 12px;
  color: #213547;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.weather-info h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.3rem;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #4CAF50;
}

.weather-info p {
  margin: 12px 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.weather-info p::before {
  content: attr(data-label);
  font-weight: 600;
  color: #666;
  margin-right: 10px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .weather-container {
    width: 100%;
    padding: 16px;
  }
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }
  
  .input-group {
    flex-direction: column;
    gap: 12px;
  }
  
  input {
    width: 100%;
    min-width: auto;
    padding: 16px;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 16px;
    font-size: 16px;
    min-width: auto;
  }
  
  .weather-info {
    padding: 16px;
  }
  
  .weather-info h3 {
    font-size: 1.2rem;
    padding-bottom: 12px;
  }
  
  .weather-info p {
    font-size: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .weather-info p::before {
    margin-bottom: 4px;
    margin-right: 0;
  }
}

/* 超小屏幕优化 */
@media (max-width: 375px) {
  .weather-container {
    padding: 12px;
  }
  
  h2 {
    font-size: 1.2rem;
  }
  
  .weather-info {
    padding: 12px;
  }
  
  .weather-info p {
    font-size: 0.95rem;
  }
}

/* 横屏优化 */
@media (max-height: 500px) and (orientation: landscape) {
  .weather-container {
    padding: 12px;
  }
  
  h2 {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  
  .input-group {
    margin: 12px 0;
  }
  
  .weather-info {
    padding: 12px;
    margin: 12px 0;
  }
  
  .weather-info h3 {
    font-size: 1.1rem;
    margin-bottom: 12px;
    padding-bottom: 10px;
  }
}
</style>