import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import { shallowMount } from '@vue/test-utils'
import Month from '@/components/Month.vue'

describe('Month.vue Implementation Test', () => {
  const wrapper = shallowMount(Month, {
    propsData: {
      dayjs: dayjs,
      hideHeader: true,
      firstWeekDay: 'monday',
      pastEventsColors: ['#66BB6A', '#388E3C', '#1B5E20'],
      futureEventsColors: ['#BDBDBD', '#616161', '#212121'],
      cellSize: '30px',
      eventsDays: { '2022-03-01': 1, '2022-03-02': 2, '2022-03-03': 3 },
      yearNumber: 2022,
      monthNumber: 2,
    },
  })

  it('should be hide header', () => {
    expect(wrapper.find('.header').exists()).toBeFalsy()
  })

  it('should be show header', () => {
    const intWrapper = shallowMount(Month, {
      propsData: {
        dayjs: dayjs,
        hideHeader: false,
        yearNumber: 2022,
        monthNumber: 2,
      },
    })
    expect(intWrapper.find('.header').exists()).toBeTruthy()
  })

  it('cell should be the specified color', () => {
    expect(wrapper.vm.month[0][1]).toMatchObject({
      date: 'Tue, Mar 1, 2022',
      eventsCount: 1,
      monthWeekday: 1,
      style: 'background-color: #66BB6A;',
    })
    expect(wrapper.vm.month[0][2]).toMatchObject({
      date: 'Wed, Mar 2, 2022',
      eventsCount: 2,
      monthWeekday: 2,
      style: 'background-color: #388E3C;',
    })
    expect(wrapper.vm.month[0][3]).toMatchObject({
      date: 'Thu, Mar 3, 2022',
      eventsCount: 3,
      monthWeekday: 3,
      style: 'background-color: #1B5E20;',
    })
  })

  it('should be selected first day of month. Correct year and month.', () => {
    expect(wrapper.vm.selectedMonthDate.format('YYYY-MM-DD')).toBe('2022-03-01')
  })

  it('should be alpha is 0 for days, which before and after current month', () => {
    expect(wrapper.vm.month[0][0]).toMatchObject({
      date: null,
      style: 'background-color: rgba(0,0,0,0.0)',
    })
    const endWeek = [wrapper.vm.month[4][4], wrapper.vm.month[4][5], wrapper.vm.month[4][6]]
    endWeek.forEach(day => {
      expect(day).toMatchObject({
        date: null,
        style: 'background-color: rgba(0,0,0,0.0)',
      })
    })
    wrapper.vm.month[5].forEach(day => {
      expect(day).toMatchObject({
        date: null,
        style: 'background-color: rgba(0,0,0,0.0)',
      })
    })
  })

  it('should be setted first day of week as monday', () => {
    expect(wrapper.vm.month[1][0]).toMatchObject({
      date: 'Mon, Mar 7, 2022',
      monthWeekday: 0,
      style: 'background-color: #f3f3f3;',
    })
  })

  it('should be setted first day of week as saturday', () => {
    const intWrapper = shallowMount(Month, {
      propsData: {
        dayjs: dayjs,
        yearNumber: 2022,
        monthNumber: 2,
        firstWeekDay: 'saturday',
      },
    })
    expect(intWrapper.vm.month[1][0]).toMatchObject({
      date: 'Sat, Mar 5, 2022',
      monthWeekday: 0,
      style: 'background-color: #f3f3f3;',
    })
  })

  it('should be correct size of cell', () => {
    expect(wrapper.vm.cellStyle).toBe('width: 30px; height: 30px; box-sizing: border-box;')
    wrapper.findAll('day-stub').wrappers.forEach(wr => {
      expect(wr.attributes('cellstyle')).toBe('width: 30px; height: 30px; box-sizing: border-box;')
    })
  })

  it('count of days should be eq 42', () => {
    expect(wrapper.findAll('day-stub').length).toEqual(42)
  })
})
