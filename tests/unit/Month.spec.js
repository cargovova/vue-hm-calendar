import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import { shallowMount } from '@vue/test-utils'
import Month from '@/components/Month.vue'

const setDay = dayIncrement => {
  let day = new Date()
  let monthDay = 0
  switch (dayIncrement) {
    case 'first':
      monthDay = 1
      break
    case 'last':
      monthDay = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate()
      break
    default:
      monthDay = day.getDate() + (dayIncrement || 0)
      break
  }
  day.setDate(monthDay)
  const yearNumber = day.getFullYear()
  const monthNumber = day.getMonth()
  const dayNumber = day.getDate()
  const weekdayNumber = day.getDay()

  const twoDigitMonthNumber = (+monthNumber + 1).toString().padStart(2, '0')
  const twoDigitDayNumber = dayNumber.toString().padStart(2, '0')

  const yyyy_mm_dd = `${yearNumber}-${twoDigitMonthNumber}-${twoDigitDayNumber}`

  const shortWeekday = day.toLocaleString('en-US', { weekday: 'short' })
  const shortMonth = day.toLocaleString('en-US', { month: 'short' })

  return { yearNumber, monthNumber, yyyy_mm_dd, shortWeekday, shortMonth, dayNumber, weekdayNumber }
}

describe('Month.vue Implementation Test', () => {
  const { yearNumber, monthNumber, yyyy_mm_dd, shortWeekday, shortMonth, dayNumber, weekdayNumber } = setDay()

  const firstMonthDay = setDay('first')
  const lastMonthDay = setDay('last')

  const firstPast = setDay(-1)
  const secondPast = setDay(-2)
  const thirdPast = setDay(-3)

  const firstFuture = setDay(1)
  const secondFuture = setDay(2)
  const thirdFuture = setDay(3)

  const wrapper = shallowMount(Month, {
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
      monthNumber,
    },
  })

  let concatMonth = []
  wrapper.vm.month.forEach(week => {
    concatMonth = concatMonth.concat(week)
  })

  it('should be hide header', () => {
    expect(wrapper.find('.header').exists()).toBeFalsy()
  })

  it('should be show header', () => {
    const intWrapper = shallowMount(Month, {
      propsData: {
        dayjs: dayjs,
        hideHeader: false,
        yearNumber,
        monthNumber,
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

  it('count of days should be eq 42', () => {
    expect(wrapper.findAll('day-stub').length).toEqual(42)
  })

  it('should be alpha is 0 for days, which before current month', () => {
    for (let i = 0; i < firstMonthDay.weekdayNumber; i++) {
      expect(wrapper.vm.month[0][i]).toMatchObject({
        date: null,
        style: 'background-color: rgba(0,0,0,0.0)',
      })
    }
  })

  it('should be alpha is 0 for days, which after current month', () => {
    let i = firstMonthDay.weekdayNumber + lastMonthDay.dayNumber
    for (i; i < 42; i++) {
      expect(concatMonth[i]).toMatchObject({
        date: null,
        style: 'background-color: rgba(0,0,0,0.0)',
      })
    }
  })

  it('should be setted first day of week as monday', () => {
    const intWrapper = shallowMount(Month, {
      propsData: {
        dayjs: dayjs,
        yearNumber,
        monthNumber,
        firstWeekDay: 'monday',
      },
    })
    expect(intWrapper.vm.month[1][0]).toMatchObject({
      date: expect.stringMatching(/^Mon/),
    })
  })

  it('should be setted first day of week as saturday', () => {
    const intWrapper = shallowMount(Month, {
      propsData: {
        dayjs: dayjs,
        yearNumber,
        monthNumber,
        firstWeekDay: 'saturday',
      },
    })
    expect(intWrapper.vm.month[1][0]).toMatchObject({
      date: expect.stringMatching(/^Sat/),
    })
  })

  it('should be selected first day of month', () => {
    expect(wrapper.vm.selectedMonthDate.format('YYYY-M-D')).toBe(
      `${firstMonthDay.yearNumber}-${firstMonthDay.monthNumber + 1}-${firstMonthDay.dayNumber}`
    )
  })

  it('should be empty cell for next year', () => {
    const intWrapper = shallowMount(Month, {
      propsData: {
        dayjs: dayjs,
        yearNumber: 2099,
        monthNumber,
      },
    })
    expect(intWrapper.vm.month[0][3]).toMatchObject({
      style: 'background-color: #f3f3f3;',
    })
  })

  it('cell should be the specified color', () => {
    const dayIndex = firstMonthDay.weekdayNumber + firstPast.dayNumber
    expect(
      concatMonth[dayIndex].style === 'background-color: #f3f3f3; border: 1px solid black; border-radius: 4px;'
    ).toBeTruthy()
    expect(concatMonth[dayIndex - 1].style === 'background-color: #66BB6A;').toBeTruthy()
    expect(concatMonth[dayIndex - 2].style === 'background-color: #388E3C;').toBeTruthy()
    expect(concatMonth[dayIndex - 3].style === 'background-color: #1B5E20;').toBeTruthy()
    expect(concatMonth[dayIndex + 1].style === 'background-color: #BDBDBD;').toBeTruthy()
    expect(concatMonth[dayIndex + 2].style === 'background-color: #616161;').toBeTruthy()
    expect(concatMonth[dayIndex + 3].style === 'background-color: #212121;').toBeTruthy()
  })
})
