import { Dayjs } from 'dayjs'
import { defineComponent, h, PropType } from 'vue-demi'
import Day from './Day'
import '../main.css'
type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export default defineComponent({
  name: 'OneYear',
  components: {
    Day,
  },
  props: {
    dayjs: {
      type: Dayjs,
      required: true,
    },
    firstWeekDay: String,
    hideHeader: Boolean,
    eventsDays: Object,
    pastEventsColors: Array as unknown as PropType<RGB | RGBA | HEX>,
    cellSize: String,
    yearNumber: Number,
    hideWeekNames: Boolean,
    futureEventsColors: Array as unknown as PropType<RGB | RGBA | HEX>,
  },
  data() {
    return {
      dayjsYear: this.dayjs().year(),
    }
  },
  computed: {
    firstYearDay() {
      return this.dayjs().year(this.yearNumber).month(0).date(1)
    },
    lastYearDay() {
      return this.dayjs().year(this.yearNumber).month(11).date(31)
    },
    cellStyle() {
      return `width: ${this.cellSize || '1rem'}; height: ${this.cellSize || '1rem'}; box-sizing: border-box;`
    },
    firstDay() {
      let firstDay = this.firstYearDay.day()
      switch (this.firstWeekDay) {
        case 'monday':
          firstDay--
          break
        case 'saturday':
          firstDay++
          break
      }
      return firstDay
    },
    monthNames() {
      const names = []
      let index = 0
      switch (this.firstWeekDay) {
        case 'monday':
          index++
          break
        case 'saturday':
          index--
          break
      }
      for (let i = 0; i < 7; i++) {
        names.push(
          i % 2
            ? this.dayjs()
                .day(i + index)
                .format('ddd')
            : ''
        )
      }
      return names
    },
    year() {
      const year = []
      const weeksInYear = this.lastYearDay.diff(this.firstYearDay, 'week')
      let selectedDayOfYear = this.dayjs().dayOfYear()
      if (this.yearNumber < this.dayjsYear) {
        selectedDayOfYear = 367
      } else if (this.yearNumber > this.dayjsYear) {
        selectedDayOfYear = 0
      }
      let date = 1
      for (let i = 0; i <= weeksInYear + 1; i++) {
        const week = []
        for (let j = 0; j < 7; j++) {
          const dateDate = this.dayjs().year(this.yearNumber).dayOfYear(date)
          const eventsCount = this.eventsDays?.[dateDate.format('YYYY-MM-DD')]
          const dayOptions = {
            style: '',
            date: dateDate.format('ddd, MMM D, YYYY'),
            eventsCount: eventsCount,
            dayOfYear: date,
          }
          if (i === 0 && j < this.firstDay) {
            dayOptions.date = null
          } else if (date === selectedDayOfYear) {
            dayOptions.style = `${this.calcColor(eventsCount, false)} border: 1px solid black; border-radius: 4px;`
            date++
          } else if (date === this.lastYearDay.dayOfYear()) {
            dayOptions.style = this.calcColor(eventsCount, false)
            date++
          } else if (date > this.lastYearDay.dayOfYear()) {
            break
          } else if (date > selectedDayOfYear) {
            dayOptions.style = this.calcColor(eventsCount, true)
            date++
          } else {
            dayOptions.style = this.calcColor(eventsCount, false)
            date++
          }
          if (i === 0) {
            if (this.firstDay !== 7) {
              week.push(dayOptions)
            }
          } else {
            week.push(dayOptions)
          }
        }
        year.push(week)
      }
      return year
    },
  },
  methods: {
    calcColor(eventsCount: number, isFuture: boolean) {
      let color = '#f3f3f3'
      if (eventsCount === 1) {
        color = isFuture ? this.futureEventsColors[0] : this.pastEventsColors[0]
      } else if (eventsCount === 2) {
        color = isFuture ? this.futureEventsColors[1] : this.pastEventsColors[1]
      } else if (eventsCount > 2) {
        color = isFuture ? this.futureEventsColors[2] : this.pastEventsColors[2]
      }
      return `background-color: ${color};`
    },
  },
  render() {
    return h('div', { style: { display: 'flex', 'flex-direction': 'row' } }, [
      !this.hideWeekNames
        ? h('div', {}, [
            h('div', { style: { height: this.cellSize || '1rem' } }),
            this.monthNames.map(name => {
              return h(
                'div',
                { style: { padding: '0.125rem' } },
                h('div', { style: { height: this.cellSize || '1rem' } }, name)
              )
            }),
          ])
        : null,
      h('div', {}, [
        [
          !this.hideHeader
            ? h(
                'div',
                { class: 'yearHeader' },
                [...new Array(12).keys()].map(i => {
                  console.log(i)
                  return h('div', {}, [
                    [i === 0 ? h('span', { style: { 'padding-left': '15px' } }) : null],
                    h('span', {}, this.dayjs().month(i).format('MMM')),
                    [i === 11 ? h('span', { style: { 'padding-right': '15px' } }) : null],
                  ])
                })
              )
            : h('div', { class: 'yearHeader' }),
        ],
        h(
          'div',
          { style: { display: 'flex', 'flex-direction': 'row' } },
          this.year.map(week => {
            return h(
              'div',
              {},
              week.map(day => {
                return h(Day, { cellStyle: this.cellStyle, day: day })
              })
            )
          })
        ),
      ]),
    ])
  },
})
