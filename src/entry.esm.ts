import vueHmCalendar from './vue-hm-calendar.vue'

export default {
  install: (app: any, options: any) => {
    app.component('vueHmCalendar', vueHmCalendar)
  },
}
