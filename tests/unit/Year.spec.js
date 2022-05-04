import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import { shallowMount } from '@vue/test-utils'
import Year from '@/components/Year.vue'

const setDay = dayIncrement => {
  let day = new Date()
  let monthDay = 0
  switch (dayIncrement) {
    case 'first':
      day = new Date(day.getFullYear(), 0, 1)
      break
    case 'last':
      day = new Date(day.getFullYear(), 11, 31)
      break
    default:
      monthDay = day.getDate() + (dayIncrement || 0)
      day.setDate(monthDay)
      break
  }
  const yearNumber = day.getFullYear()
  const monthNumber = day.getMonth()
  const dayNumber = day.getDate()
  const weekdayNumber = day.getDay()

  const twoDigitMonthNumber = (+monthNumber + 1).toString().padStart(2, '0')
  const twoDigitDayNumber = dayNumber.toString().padStart(2, '0')

  const yyyy_mm_dd = `${yearNumber}-${twoDigitMonthNumber}-${twoDigitDayNumber}`

  const shortWeekday = day.toLocaleString('en-US', { weekday: 'short' })
  const shortMonth = day.toLocaleString('en-US', { month: 'short' })

  const first = new Date(yearNumber, 0, 0)
  const last = new Date(yearNumber, 11, 31)

  const dayOfYear = (last - first) / (1000 * 60 * 60 * 24)

  return { yearNumber, monthNumber, yyyy_mm_dd, shortWeekday, shortMonth, dayNumber, weekdayNumber, dayOfYear }
}

describe('Year.vue Test', () => {
  const firstYearday = setDay('first')
  const lastYearDay = setDay('last')

  const { yearNumber } = setDay()

  const firstPast = setDay(-1)
  const secondPast = setDay(-2)
  const thirdPast = setDay(-3)

  const firstFuture = setDay(1)
  const secondFuture = setDay(2)
  const thirdFuture = setDay(3)

  const wrapper = shallowMount(Year, {
    propsData: {
      dayjs: dayjs,
      hideHeader: true,
      pastEventsColors: ['#66BB6A', '#388E3C', '#1B5E20'],
      futureEventsColors: ['#BDBDBD', '#616161', '#212121'],
      cellSize: '30px',
      eventsDays: {
        [firstPast.yyyy_mm_dd]: 1,
        [secondPast.yyyy_mm_dd]: 2,
        [thirdPast.yyyy_mm_dd]: 3,
        [firstFuture.yyyy_mm_dd]: 1,
        [secondFuture.yyyy_mm_dd]: 2,
        [thirdFuture.yyyy_mm_dd]: 3,
      },
      yearNumber,
    },
  })

  let concatYear = []
  wrapper.vm.year.forEach(week => {
    concatYear = concatYear.concat(week)
  })

  it('should be hide header', () => {
    expect(wrapper.find('.header').exists()).toBeFalsy()
  })

  it('should be show header', () => {
    const intWrapper = shallowMount(Year, {
      propsData: {
        dayjs: dayjs,
        hideHeader: false,
        yearNumber: 2022,
      },
    })
    expect(intWrapper.find('.header').exists()).toBeTruthy()
  })

  it('should be correct size of cell', () => {
    expect(wrapper.vm.cellStyle).toBe('width: 30px; height: 30px; box-sizing: border-box;')
    wrapper.findAll('day-stub').wrappers.forEach(wr => {
      expect(wr.attributes('cellstyle')).toBe('width: 30px; height: 30px; box-sizing: border-box;')
    })
  })

  it('amount of days should be eq 371', () => {
    expect(wrapper.findAll('day-stub').length).toEqual(371)
  })

  it('should be alpha is 0 for days, which before current year', () => {
    for (let i = 0; i < firstYearday.weekdayNumber; i++) {
      expect(wrapper.vm.year[0][i]).toMatchObject({
        date: null,
        style: '',
      })
    }
  })

  it('should be alpha is 0 for days, which after current year', () => {
    let i = firstYearday.weekdayNumber + lastYearDay.dayOfYear
    for (i; i < 370; i++) {
      expect(concatYear[i]).toMatchObject({
        date: null,
        style: 'background-color: rgba(0,0,0,0.0)',
      })
    }
  })

  it('should be setted first day of week as monday', () => {
    const intWrapper = shallowMount(Year, {
      propsData: {
        dayjs: dayjs,
        yearNumber,
        firstWeekDay: 'monday',
      },
    })
    expect(intWrapper.vm.year[1][0]).toMatchObject({
      date: expect.stringMatching(/^Mon/),
    })
  })

  it('should be setted first day of week as saturday', () => {
    const intWrapper = shallowMount(Year, {
      propsData: {
        dayjs: dayjs,
        yearNumber,
        firstWeekDay: 'saturday',
      },
    })
    expect(intWrapper.vm.year[1][0]).toMatchObject({
      date: expect.stringMatching(/^Sat/),
    })
  })

  it('should be empty cell for next year', () => {
    const intWrapper = shallowMount(Year, {
      propsData: {
        dayjs: dayjs,
        yearNumber: 2099,
      },
    })
    expect(intWrapper.vm.year[0][3]).toMatchObject({
      style: '',
    })
    expect(intWrapper.vm.year[0][4]).toMatchObject({
      style: 'background-color: #f3f3f3;',
    })
  })

  it('should be empty cell for previous year', () => {
    const intWrapper = shallowMount(Year, {
      propsData: {
        dayjs: dayjs,
        yearNumber: 2001,
      },
    })
    expect(intWrapper.vm.year[0][0]).toMatchObject({
      style: '',
    })
    expect(intWrapper.vm.year[0][1]).toMatchObject({
      style: 'background-color: #f3f3f3;',
    })
  })
})
