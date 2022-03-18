<template>
  <div id="app">
    <vue-hm-calendar firstWeekDay="MONDAY" :monthNumber="2" />
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
