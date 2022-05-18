<template>
  <div v-if="dayjs">
    <month
      v-if="mode === 'month' || !mode"
      :dayjs="dayjs"
      :hideHeader="hideHeader"
      :firstWeekDay="firstWeekDay"
      :monthNumber="monthNumber"
      :eventsDays="eventsDays"
      :pastEventsColors="pastEventsColors"
      :cellSize="cellSize"
      :yearNumber="yearNumber"
      :futureEventsColors="futureEventsColors"
    />
    <year
      v-if="mode === 'year'"
      :dayjs="dayjs"
      :hideWeekNames="hideWeekNames"
      :eventsDays="eventsDays"
      :pastEventsColors="pastEventsColors"
      :cellSize="cellSize"
      :yearNumber="yearNumber"
      :firstWeekDay="firstWeekDay"
      :hideHeader="hideHeader"
      :futureEventsColors="futureEventsColors"
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
    },
    hideHeader: Boolean,
    firstWeekDay: {
      validator: function (value) {
        return ['monday', 'saturday'].includes(value)
      },
    },
    monthNumber: {
      type: Number,
      validator: function (value) {
        return /^[0-9]|10|11$/.test(value.toString())
      },
      default: dayjs().month(),
    },
    eventsDays: Object,
    pastEventsColors: {
      type: Array,
      default: function () {
        return ['#66BB6A', '#388E3C', '#1B5E20']
      },
    },
    futureEventsColors: {
      type: Array,
      default: function () {
        return ['#BDBDBD', '#616161', '#212121']
      },
    },
    cellSize: String,
    yearNumber: {
      type: Number,
      validator: function (value) {
        return /^[0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4}$/.test(value.toString())
      },
      default: dayjs().year(),
    },
    hideWeekNames: Boolean,
    locale: String,
    tooltipTranslation: String,
  },
  components: {
    Month,
    Year,
  },
  data() {
    return {
      dayjs: null,
    }
  },
  provide() {
    return {
      $tooltipTranslation: () => this.tooltipTranslation,
    }
  },
  created() {
    if (this.locale) {
      import('dayjs/locale/' + this.locale)
        .then(() => {
          dayjs.locale(this.locale)
        })
        .catch(e => {
          console.warn('locale not found', e)
        })
        .finally(() => {
          this.dayjs = dayjs
        })
    } else {
      this.dayjs = dayjs
    }
  },
}
</script>
