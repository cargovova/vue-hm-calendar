import Day from '@/components/Day.vue'
import { shallowMount } from '@vue/test-utils'

describe('Day.vue tests', () => {
  it('should not be span into cell', () => {
    const wrapper = shallowMount(Day, {
      propsData: {
        cellStyle: 'width: 30px; height: 30px; box-sizing: border-box;',
        day: {
          style: '',
          date: null,
        },
      },
      provide: {
        $tooltipTranslation() {
          return ''
        },
      },
    })
    expect(wrapper.find('span').exists()).toBeFalsy()
  })

  it('should be cell without event', () => {
    const wrapper = shallowMount(Day, {
      propsData: {
        cellStyle: 'width: 30px; height: 30px; box-sizing: border-box;',
        day: {
          date: 'Sat, Jan 1, 2022',
        },
      },
      provide: {
        $tooltipTranslation() {
          return ''
        },
      },
    })
    expect(wrapper.find('span').exists()).toBeTruthy()
    expect(wrapper.vm.text).toBe('Sat, Jan 1, 2022')
  })

  it('should be correct text for any events', () => {
    const wrapper = shallowMount(Day, {
      propsData: {
        cellStyle: 'width: 30px; height: 30px; box-sizing: border-box;',
        day: { style: 'background-color: #1B5E20;', date: 'Mon, Apr 4, 2022', eventsCount: 3, monthWeekday: 0 },
      },
      provide: {
        $tooltipTranslation() {
          return ''
        },
      },
    })
    expect(wrapper.vm.text).toBe('3 events on <br/>Mon, Apr 4, 2022')
  })

  it('should be correct text for one event', () => {
    const wrapper = shallowMount(Day, {
      propsData: {
        cellStyle: 'width: 30px; height: 30px; box-sizing: border-box;',
        day: { style: 'background-color: #66BB6A;', date: 'Wed, Apr 6, 2022', eventsCount: 1, monthWeekday: 2 },
      },
      provide: {
        $tooltipTranslation() {
          return ''
        },
      },
    })
    expect(wrapper.vm.text).toBe('1 event on <br/>Wed, Apr 6, 2022')
  })

  it('should be left hand class', () => {
    const wrapper = shallowMount(Day, {
      propsData: {
        cellStyle: 'width: 30px; height: 30px; box-sizing: border-box;',
        day: {
          style: 'background-color: #f3f3f3;',
          date: 'Mon, Dec 26, 2022',
          eventsCount: '__vue_devtool_undefined__',
          dayOfYear: 360,
        },
      },
      provide: {
        $tooltipTranslation() {
          return ''
        },
      },
    })
    expect(wrapper.vm.tooltipClass).toBe('from_left_hand')
  })

  it('first tooltip line should be setted from props', () => {
    const wrapper = shallowMount(Day, {
      propsData: {
        cellStyle: 'width: 30px; height: 30px; box-sizing: border-box;',
        day: { style: 'background-color: #66BB6A;', date: 'Wed, Apr 6, 2022', eventsCount: 1, monthWeekday: 2 },
      },
      provide: {
        $tooltipTranslation() {
          return 'событий:'
        },
      },
    })
    expect(wrapper.vm.text).toBe('событий: 1<br/>Wed, Apr 6, 2022')
  })
})
