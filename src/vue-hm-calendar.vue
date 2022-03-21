<template>
  <div>
    <month v-if="mode === 'month'" :dayjs="dayjs" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import Month from './components/Month.vue'

export default {
  name: 'VueHmCalendar',
  props: {
    mode: {
      validator: function (value) {
        return ['month', 'year', 'quarter', 'week'].includes(value)
      },
      required: true,
    },
    hideHeader: Boolean,
    firstWeekDay: {
      validator: function (value) {
        return ['monday', 'saturday'].includes(value)
      },
    },
    monthNumber: [String, Number],
    eventsDays: Object,
    eventsColors: {
      type: Array,
      default: function () {
        return ['#66BB6A', '#388E3C', '#1B5E20']
      },
    },
  },
  components: {
    Month,
  },
  data() {
    return {
      dayjs: dayjs(),
    }
  },
}
</script>
