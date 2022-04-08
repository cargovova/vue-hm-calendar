import VueHmCalendar from '@/vue-hm-calendar.vue'
import { shallowMount } from '@vue/test-utils'

describe('vue-hm-calendar.vue tests', () => {
  it('should be show month', () => {
    const emptyWrapper = shallowMount(VueHmCalendar, {})
    expect(emptyWrapper.find('month-stub').exists()).toBeTruthy()
    const wrapper = shallowMount(VueHmCalendar, {
      propsData: {
        mode: 'month',
      },
    })
    expect(wrapper.find('month-stub').exists()).toBeTruthy()
  })

  it('should be show year', () => {
    const wrapper = shallowMount(VueHmCalendar, {
      propsData: {
        mode: 'year',
      },
    })
    expect(wrapper.find('year-stub').exists()).toBeTruthy()
  })
})
