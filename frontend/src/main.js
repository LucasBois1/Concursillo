import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import open from 'open';

createApp(App).mount('#app')

await open('http://localhost:9595');