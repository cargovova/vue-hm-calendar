import vueHmCalendar from './vue-hm-calendar'

export default {
  install: (app: any, options: any) => {
    app.component('vueHmCalendar', vueHmCalendar)
  },
}
