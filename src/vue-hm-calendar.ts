import { defineComponent, h, PropType } from 'vue-demi'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)
import Month from './components/Month'
import Year from './components/Year'
import { dinamicLoader } from './dinamicLoader'
import { colorType } from './types'

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
      type: Array as unknown as PropType<colorType>,
      default: () => {
        return ['#66BB6A', '#388E3C', '#1B5E20']
      },
    },
    futureEventsColors: {
      type: Array as unknown as PropType<colorType>,
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
    Year,
  },
  data() {
    return {
      dayjs: dayjs as unknown as Dayjs,
    }
  },
  provide() {
    return {
      $tooltipTranslation: () => this.tooltipTranslation as String,
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
    const yearProps = {
      dayjs: this.dayjs,
      hideWeekNames: this.hideWeekNames,
      eventsDays: this.eventsDays,
      pastEventsColors: this.pastEventsColors,
      cellSize: this.cellSize,
      yearNumber: this.yearNumber,
      firstWeekDay: this.firstWeekDay,
      hideHeader: this.hideHeader,
      futureEventsColors: this.futureEventsColors,
    }
    if (this.dayjs) {
      if (this.mode === 'month' || !this.mode) {
        return h('div', {}, h(Month as any, monthProps))
      }
      if (this.mode === 'year') {
        return h('div', {}, h(Year as any, yearProps))
      }
    }
  },
})
