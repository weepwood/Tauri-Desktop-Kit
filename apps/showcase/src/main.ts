import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@tdk/tokens/styles.css'
import './style.css'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
