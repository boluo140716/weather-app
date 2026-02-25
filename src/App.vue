<script setup>
import WeatherComponent from './components/WeatherComponent.vue'
</script>

<template>
  <div class="app">
    <h1>天气查询应用</h1>
    <WeatherComponent />
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 10px 0;
  border-bottom: 3px solid #4CAF50;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .app {
    padding: 0;
    max-width: 100%;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    padding: 15px;
    background-color: #4CAF50;
    color: white;
    border-bottom: none;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  }
}

/* 超小屏幕优化 */
@media (max-width: 375px) {
  h1 {
    font-size: 1.3rem;
    padding: 12px;
  }
}

/* 横屏优化 */
@media (max-height: 500px) and (orientation: landscape) {
  .app {
    padding: 0;
  }
  
  h1 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding: 8px 15px;
  }
}
</style>
