<template>
  <div style="display: inline-block; display: flex; flex-direction: row">
    <div v-if="!hideWeekNames">
      <div :style="'height: ' + (cellSize || '1rem')"></div>
      <div v-for="(name, i) in monthNames" :key="i">
        <div style="padding: 0.125rem">
          <div :style="'height: ' + (cellSize || '1rem')">{{ name }}</div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="!hideHeader"
        style="display: inline-block; display: flex; flex-direction: row; justify-content: space-between"
      >
        <div v-for="i in 12" :key="i">
          <span v-if="i === 1">&nbsp;&nbsp;&nbsp;</span>
          {{
            dayjs()
              .month(i - 1)
              .format('MMM')
          }}
          <span v-if="i === 12">&nbsp;&nbsp;&nbsp;</span>
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
  </div>
</template>

<script>
export default {
  name: 'Year',
  props: {
    dayjs: {
      type: Function,
      required: true,
    },
    firstWeekDay: String,
    hideHeader: Boolean,
    eventsDays: Object,
    pastEventsColors: Array,
    cellSize: String,
    yearNumber: Number,
    hideWeekNames: Boolean,
    futureEventColors: Array,
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
            date: `${
              eventsCount ? (+eventsCount === 1 ? eventsCount + ' event on ' : eventsCount + ' events on ') : ''
            }${dateDate.format('ddd, MMM D, YYYY')}`,
          }
          if (i === 0 && j < this.firstDay) {
            dayOptions.date = null
          } else if (date === selectedDayOfYear) {
            dayOptions.style = `${this.calcColor(eventsCount)} border: 1px solid black; border-radius: 4px;`
            date++
          } else if (date === this.lastYearDay.dayOfYear()) {
            dayOptions.style = this.calcColor(eventsCount)
            date++
          } else if (date > this.lastYearDay.dayOfYear()) {
            break
          } else if (date > selectedDayOfYear) {
            dayOptions.style = this.calcColor(eventsCount, true)
            date++
          } else {
            dayOptions.style = this.calcColor(eventsCount)
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
    calcColor(eventsCount, isFuture) {
      let color = '#f3f3f3;'
      if (eventsCount === 1) {
        color = isFuture ? this.futureEventColors[0] : this.pastEventsColors[0]
      } else if (eventsCount === 2) {
        color = isFuture ? this.futureEventColors[1] : this.pastEventsColors[1]
      } else if (eventsCount > 2) {
        color = isFuture ? this.futureEventColors[2] : this.pastEventsColors[2]
      }
      return `background-color: ${color};`
    },
  },
}
</script>
