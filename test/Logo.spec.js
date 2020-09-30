import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue';
import LineChart from '@/components/LineChart.vue';
import CityMap from '@/components/CityMap.vue';

describe('Logo', () => {
  test('this is a logo component', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('LineChart', () => {
  test('This is a line chart component', () => {
    const wrapper = mount(LineChart)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('CityMap', () => {
  test('This is a google map component', () => {
    const wrapper = mount(CityMap)
    expect(wrapper.vm).toBeTruthy()
  })
})