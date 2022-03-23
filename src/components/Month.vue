<template>
  <div style="display: inline-block">
    <div v-if="!hideHeader" style="text-align: center" v-html="selectedMonthDate.format('MMM')"></div>
    <div style="display: flex; flex-direction: row" v-for="(week, i) in month" :key="i">
      <div style="padding: 0.125rem" v-for="(day, i) in week" :key="i">
        <div :style="cellStyle + day.style" :title="day.date"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Month',
  props: {
    dayjs: {
      type: Object,
      required: true,
    },
    monthNumber: [String, Number],
    firstWeekDay: {
      validator: function (value) {
        return ['monday', 'saturday'].includes(value)
      },
    },
    hideHeader: Boolean,
    eventsDays: Object,
    eventsColors: Array,
    cellSize: String,
  },
  data() {
    return {
      selectedMonthDate: this.dayjs.month(this.monthNumber || this.dayjs.month()).date(1),
    }
  },
  computed: {
    month() {
      const curentYearDay = this.dayjs.dayOfYear()
      const daysInMonth = this.selectedMonthDate.daysInMonth()
      let firstDay = this.selectedMonthDate.day()
      switch (this.firstWeekDay) {
        case 'monday':
          firstDay--
          break
        case 'saturday':
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
            style: '',
            date: this.selectedMonthDate.date(date).format('ddd, MMM D, YYYY'),
          }
          if (i === 0 && j < firstDay) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
          } else if (curentYearDay === selectedYearDay) {
            dayOptions.style = `${this.calcColor(this.eventsDays?.[date])} border: 1px solid black; border-radius: 4px;`
            date++
          } else if (date > daysInMonth) {
            dayOptions.style = 'background-color: rgba(0,0,0,0.0)'
            dayOptions.date = null
            date++
          } else if (curentYearDay > selectedYearDay) {
            dayOptions.style = this.calcColor(this.eventsDays?.[date])
            date++
          } else if (curentYearDay < selectedYearDay) {
            dayOptions.style = this.calcColor(this.eventsDays?.[date])
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
