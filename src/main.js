import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import VueLazyLoad from 'vue3-lazyload'

createApp(App).use(VueLazyLoad, { loading: '/loading.gif' }).mount('#app')

// createApp(App).mount('#app')
