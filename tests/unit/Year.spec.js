import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import { shallowMount } from '@vue/test-utils'
import Year from '@/components/Year.vue'

describe('Year.vue Test', () => {
  const wrapper = shallowMount(Year, {
    propsData: {
      dayjs: dayjs,
      hideHeader: true,
      firstWeekDay: 'monday',
      pastEventsColors: ['#66BB6A', '#388E3C', '#1B5E20'],
      futureEventsColors: ['#BDBDBD', '#616161', '#212121'],
      cellSize: '30px',
      eventsDays: { '2022-02-01': 1, '2022-02-02': 2 },
      yearNumber: 2022,
    },
  })
  it('rendered with correct elements', () => {
    expect(wrapper.vm.$options.name).toMatch('Year')
  })
})
