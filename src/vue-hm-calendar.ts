import { defineComponent, h, PropType } from 'vue-demi'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)
import Month from './components/Month'
// import Year from './components/Year.vue'
import { dinamicLoader } from './dinamicLoader'
type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export default defineComponent({
  name: 'VueHmCalendar',
  props: {
    mode: {
      type: String,
      validator: (v: string) => {
        return ['month', 'year'].includes(v)
      },
    },
    hideHeader: Boolean,
    firstWeekDay: {
      type: String,
      validator: (v: string) => {
        return ['monday', 'saturday'].includes(v)
      },
    },
    monthNumber: {
      type: Number,
      validator: (v: number) => {
        return /^[0-9]|10|11$/.test(v.toString())
      },
      default: dayjs().month(),
    },
    eventsDays: Object,
    pastEventsColors: {
      type: Array as unknown as PropType<RGB | RGBA | HEX>,
      default: () => {
        return ['#66BB6A', '#388E3C', '#1B5E20']
      },
    },
    futureEventsColors: {
      type: Array as unknown as PropType<RGB | RGBA | HEX>,
      default: () => {
        return ['#BDBDBD', '#616161', '#212121']
      },
    },
    cellSize: String,
    yearNumber: {
      type: Number,
      validator: (v: number) => {
        return /^[0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4}$/.test(v.toString())
      },
      default: dayjs().year(),
    },
    hideWeekNames: Boolean,
    locale: String,
    tooltipTranslation: String,
  },
  components: {
    Month,
    // Year,
  },
  data() {
    return {
      dayjs: dayjs as unknown as Dayjs,
    }
  },
  provide() {
    return {
      $tooltipTranslation: () => this.tooltipTranslation,
    }
  },
  async created() {
    if (this.locale) {
      this.dayjs = await dinamicLoader(this.locale, dayjs as unknown as Dayjs)
    }
  },
  render() {
    const monthProps = {
      dayjs: this.dayjs,
      hideHeader: this.hideHeader,
      firstWeekDay: this.firstWeekDay,
      monthNumber: this.monthNumber,
      eventsDays: this.eventsDays,
      pastEventsColors: this.pastEventsColors,
      cellSize: this.cellSize,
      yearNumber: this.yearNumber,
      futureEventsColors: this.futureEventsColors,
    }
    if (this.dayjs) {
      if (this.mode === 'month' || !this.mode) {
        return h('div', {}, h(Month, monthProps))
      }
    }
  },
})
/*
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
*/
