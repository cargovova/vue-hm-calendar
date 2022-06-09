import { defineComponent, h } from 'vue-demi'
import '../main.css'

export default defineComponent({
  name: 'DayItem',
  props: {
    cellStyle: String,
    day: Object,
  },
  inject: ['$tooltipTranslation'],
  computed: {
    text() {
      if (this.$tooltipTranslation() && this.day.eventsCount) {
        return `${this.$tooltipTranslation()} ${this.day.eventsCount}<br/>${this.day.date}`
      }
      return `${
        this.day.eventsCount
          ? +this.day.eventsCount === 1
            ? this.day.eventsCount + ' event on <br/>'
            : this.day.eventsCount + ' events on <br/>'
          : ''
      }${this.day.date}`
    },
    tooltipClass() {
      let className = ''
      if (this.day.dayOfYear > 309) {
        className = 'from_left_hand'
      }
      if (this.day?.monthWeekday || this.day?.monthWeekday === 0) {
        className = 'day' + this.day.monthWeekday
      }
      return className
    },
  },
  render() {
    const commonStyle = this.cellStyle + ' ' + this.day.style
    return h(
      'div',
      { style: { padding: '0.125rem' } },
      h('div', { style: commonStyle, class: ['tooltip', this.day.date ? 'hovered' : false] }, [
        this.day.date ? h('span', { class: [this.tooltipClass, 'tooltiptext'] }, this.text) : false,
      ])
    )
  },
})
