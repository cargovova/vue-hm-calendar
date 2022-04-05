<template>
  <div style="padding: 0.125rem">
    <div :style="cellStyle + day.style" class="tooltip" :class="{ hovered: day.date }">
      <span v-if="day.date" :class="tooltipClass" class="tooltiptext" v-html="text"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    cellStyle: String,
    day: Object,
  },
  computed: {
    text() {
      return `${
        this.day.eventsCount
          ? +this.day.eventsCount === 1
            ? this.day.eventsCount + ' event on <br/>'
            : this.day.eventsCount + ' events on <br/>'
          : ''
      }${this.day.date}`
    },
    tooltipClass() {
      if (this.day.dayOfYear > 309) {
        return 'from_left_hand'
      }
      if (this.day?.monthWeekday || this.day?.monthWeekday === 0) {
        return 'day' + this.day.monthWeekday
      }
    },
  },
}
</script>

<style>
.tooltip {
  position: relative;
}

.hovered:hover {
  outline: 3px solid black;
}

.tooltip .tooltiptext {
  font-size: 15px;
  visibility: hidden;
  width: 125px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px 6px 6px 6px;
  opacity: 0.8;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 200%;
}

.from_left_hand {
  right: 50%;
}

.day0 {
  left: 30%;
}

.day1 {
  left: -80%;
}

.day2 {
  left: -200%;
}

.day3 {
  left: -320%;
}

.day4 {
  right: -230%;
}
.day5 {
  right: -80%;
}
.day6 {
  right: 50%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
