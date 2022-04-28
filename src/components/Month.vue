<template>
  <div style="display: inline-block">
    <div v-if="!hideHeader" class="header" v-html="selectedMonthDate.format('MMM')"></div>
    <div style="display: flex; flex-direction: row" v-for="(week, i) in month" :key="i">
      <day v-for="(day, i) in week" :key="i" :cellStyle="cellStyle" :day="day"> </day>
    </div>
  </div>
</template>

<script>
import Day from './Day.vue'

export default {
  name: 'OneMonth',
  components: {
    Day,
  },
  props: {
    dayjs: {
      type: Function,
      required: true,
    },
    monthNumber: Number,
    firstWeekDay: String,
    hideHeader: Boolean,
    eventsDays: Object,
    pastEventsColors: Array,
    cellSize: String,
    yearNumber: Number,
    futureEventsColors: Array,
  },
  computed: {
    selectedMonthDate() {
      return this.dayjs().year(this.yearNumber).month(this.monthNumber).date(1)
    },
    firstDay() {
      let firstDay = this.selectedMonthDate.day()
      switch (this.firstWeekDay) {
        case 'monday':
          if (firstDay === 0) {
            firstDay = 6
          } else {
            firstDay--
          }
          break
        case 'saturday':
          if (firstDay === 6) {
            firstDay = 0
          } else {
            firstDay++
          }
          break
      }
      return firstDay
    },
    month() {
      const curentYearDay = this.dayjs().dayOfYear()
      const daysInMonth = this.selectedMonthDate.daysInMonth()
      let date = 1
      const month = []
      for (let i = 0; i < 6; i++) {
        let row = []
        for (let j = 0; j < 7; j++) {
          const selectedYearDay = this.selectedMonthDate.date(date).dayOfYear()
          const eventsCount = this.eventsDays?.[this.selectedMonthDate.date(date).format('YYYY-MM-DD')]
          const dayOptions = {
            style: '',
            date: this.selectedMonthDate.date(date).format('ddd, MMM D, YYYY'),
            eventsCount: eventsCount,
            monthWeekday: j,
          }
          if (i === 0 && j < this.firstDay) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
          } else if (date > daysInMonth) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
            date++
          } else if (curentYearDay > selectedYearDay) {
            dayOptions.style = this.calcColor(eventsCount)
            date++
          } else if (curentYearDay < selectedYearDay) {
            dayOptions.style = this.calcColor(eventsCount, true)
            date++
          } else if (curentYearDay === selectedYearDay) {
            if (this.yearNumber === this.dayjs().year()) {
              dayOptions.style = `${this.calcColor(eventsCount)} border: 1px solid black; border-radius: 4px;`
            } else {
              dayOptions.style = this.calcColor(eventsCount)
            }
            date++
          }
          row.push(dayOptions)
        }
        month.push(row)
      }
      return month
    },
    cellStyle() {
      return `width: ${this.cellSize || '1rem'}; height: ${this.cellSize || '1rem'}; box-sizing: border-box;`
    },
  },
  methods: {
    calcColor(eventsCount, isFuture) {
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
}
</script>

<style scoped>
.header {
  text-align: center;
}
</style>
