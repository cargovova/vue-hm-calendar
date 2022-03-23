<template>
  <div style="display: inline-block; display: flex; flex-direction: row">
    <div v-if="!hideWeekNames">
      <div v-for="(name, i) in monthNames" :key="i">
        <div style="padding: 0.125rem">
          <div :style="'height: ' + (cellSize || '1rem')">{{ name }}</div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: row">
      <div v-for="(week, i) in year" :key="i">
        <div style="padding: 0.125rem" v-for="(day, i) in week" :key="i">
          <div :style="cellStyle + day.style" :title="day.date"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Year',
  props: {
    dayjs: {
      type: Object,
      required: true,
    },
    firstWeekDay: String,
    hideHeader: Boolean,
    eventsDays: Object,
    eventsColors: Array,
    cellSize: String,
    yearNumber: Number,
    hideWeekNames: Boolean,
  },
  data() {
    return {
      dayjsYear: this.dayjs.year(),
      firstYearDay: this.dayjs.year(this.yearNumber).month(0).date(1),
      lastYearDay: this.dayjs.year(this.yearNumber).month(11).date(31),
      cellStyle: `width: ${this.cellSize || '1rem'}; height: ${this.cellSize || '1rem'}; box-sizing: border-box;`,
    }
  },
  computed: {
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
        names.push(i % 2 ? this.dayjs.day(i + index).format('ddd') : '')
      }
      return names
    },
    year() {
      const year = []
      const weeksInYear = this.lastYearDay.diff(this.firstYearDay, 'week')
      const selectedDayOfYear = this.dayjs.dayOfYear()
      if (this.yearNumber < this.dayjsYear) {
        selectedDayOfYear = 367
      } else if (this.yearNumber > this.dayjsYear) {
        selectedDayOfYear = 0
      }
      let date = 1
      for (let i = 0; i <= weeksInYear; i++) {
        const week = []
        for (let j = 0; j < 7; j++) {
          const dayOptions = {
            style: '',
            date: this.dayjs.dayOfYear(date),
          }
          if (i === 0 && j < this.firstDay) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
          } else if (date > this.lastYearDay.dayOfYear()) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
          } else {
            dayOptions.style = this.calcColor(this.eventsDays?.[date])
            date++
          }
          week.push(dayOptions)
        }
        year.push(week)
      }
      return year
    },
  },
  methods: {
    calcColor(eventCount) {
      let color = '#f3f3f3;'
      if (eventCount === 1) {
        color = this.eventsColors[0]
      } else if (eventCount === 2) {
        color = this.eventsColors[1]
      } else if (eventCount > 2) {
        color = this.eventsColors[2]
      }
      return `background-color: ${color};`
    },
  },
}
</script>
