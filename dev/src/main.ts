import { createApp } from 'vue'
import App from './App.vue'
import vueHmCalendar from './../../src/entry.esm'

const app = createApp(App)

app.use(vueHmCalendar)

app.mount('#app')
