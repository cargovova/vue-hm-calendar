<template>
  <div id="app">
    <br />
    <br />
    <vue-hm-calendar
      mode="year"
      :yearNumber="2022"
      cellSize="15px"
      firstWeekDay="monday"
      :hideWeekNames="false"
      :hideHeader="false"
      :eventsDays="{
        '2022-12-31': 10,
        '2022-01-01': 2,
        '2022-03-23': 1,
        '2022-03-24': 1,
        '2022-03-25': 2,
        '2022-03-26': 1000,
        '2022-01-05': 2,
        '2022-08-05': 1,
        '2022-08-06': 2,
        '2022-08-07': 3,
      }"
      :futureEventsColors="['#42A5F5', '#1976D2', '#0D47A1']"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueHmCalendar from '@/vue-hm-calendar.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueHmCalendar,
  },
})
</script>
