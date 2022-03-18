<template>
  <div style="display: inline-block">
    <div style="text-align: center" v-html="selectedMonthDate.format('MMM')"></div>
    <div style="display: flex; flex-direction: row" v-for="(week, i) in month" :key="i">
      <div style="padding: 0.125rem" v-for="(day, i) in week" :key="i">
        <div style="width: 0.5rem; height: 0.5rem; box-sizing: border-box" :style="day.style" :title="day.date"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)

export default {
  name: 'VueHmCalendar',
  props: {
    firstWeekDay: String,
    monthNumber: Number,
  },
  data() {
    return {
      selectedMonthDate: dayjs()
        .month(this.monthNumber || dayjs().month())
        .date(1),
    }
  },
  computed: {
    month() {
      const curentYearDay = dayjs().dayOfYear()
      const daysInMonth = this.selectedMonthDate.daysInMonth()
      let firstDay = this.selectedMonthDate.day()
      switch (this.firstWeekDay) {
        case 'MONDAY':
          firstDay--
          break
        case 'SATURDAY':
          firstDay++
          break
      }

      let date = 1
      const month = []
      for (let i = 0; i < 6; i++) {
        let row = []
        for (let j = 0; j < 7; j++) {
          const selectedYearDay = this.selectedMonthDate.date(date).dayOfYear()
          const dayOptions = {
            style: 'background-color: #f3f3f3;',
            date: this.selectedMonthDate.date(date).format('ddd, MMM D, YYYY'),
          }
          if (i === 0 && j < firstDay) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
          } else if (curentYearDay === selectedYearDay) {
            dayOptions.style += ' border: 1px solid black;'
            date++
          } else if (date > daysInMonth) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
            date++
          } else if (curentYearDay > selectedYearDay) {
            date++
          } else if (curentYearDay < selectedYearDay) {
            date++
          }
          row.push(dayOptions)
        }
        month.push(row)
      }
      return month
    },
  },
}
</script>
