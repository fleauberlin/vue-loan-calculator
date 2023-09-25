import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
// @ts-ignore
import CalculateButton from '../calculation/CalculateButton.vue'
import { useCalculation } from '../../stores/Calculation'
import { useRepayment } from '../../stores/Repayment'

const wrapper = mount(CalculateButton, {
  global: {
    plugins: [createTestingPinia({
      createSpy: vi.fn
    })]
  }
})

describe('CalculateButton', () => {
  it('renders properly', () => {
    expect(wrapper.text()).toContain('Calculate')
  })

  it('updates button text when changed from calculation to re-calculation', async () => {
    const store = useCalculation();
    store.calculated = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.blue-button').text()).toBe('Re-calculate')
  })

  it('has a clear calculation link when loan amount is set', async () => {
    const store = useCalculation();
    store.rawLoanAmount = 1337;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.default-link').text()).toBe('Clear calculation')
  })
})
