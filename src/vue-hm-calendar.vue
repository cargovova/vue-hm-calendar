<template>
  <div>
    <month
      v-if="mode === 'month'"
      :dayjs="dayjs"
      :hideHeader="hideHeader"
      :firstWeekDay="firstWeekDay"
      :monthNumber="monthNumber"
      :eventsDays="eventsDays"
      :eventsColors="eventsColors"
      :cellSize="cellSize"
    />
    <year
      v-if="mode === 'year'"
      :dayjs="dayjs"
      :hideWeekNames="hideWeekNames"
      :eventsDays="eventsDays"
      :eventsColors="eventsColors"
      :cellSize="cellSize"
      :yearNumber="+yearNumber"
      :firstWeekDay="firstWeekDay"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import Month from './components/Month.vue'
import Year from './components/Year.vue'

export default {
  name: 'VueHmCalendar',
  props: {
    mode: {
      validator: function (value) {
        return ['month', 'year'].includes(value)
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
    cellSize: String,
    yearNumber: {
      type: [Number, String],
      validator: function (value) {
        return /^[0-9]{4}$/.test(value.toString())
      },
      default: dayjs().year(),
    },
    hideWeekNames: Boolean,
  },
  components: {
    Month,
    Year,
  },
  data() {
    return {
      dayjs: dayjs(),
    }
  },
}
</script>
