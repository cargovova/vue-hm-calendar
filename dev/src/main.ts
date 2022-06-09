import { createApp } from 'vue'
import App from './App.vue'
import vueHmCalendar from '../../src'

const app = createApp(App)

app.use(vueHmCalendar)

app.mount('#app')
