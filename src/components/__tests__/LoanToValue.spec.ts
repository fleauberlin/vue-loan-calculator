import { mount } from "@vue/test-utils";
// @ts-ignore
import LoanToValue from '../calculation/LoanToValue.vue'
import { createTestingPinia } from "@pinia/testing";
import { expect, it, vi, describe } from "vitest";
import { useCalculation } from "../../stores/Calculation";

const wrapper = mount(LoanToValue, {
  global: {
    plugins: [createTestingPinia({
      createSpy: vi.fn
    })]
  }
})

describe('LoanToValue', () => {
  it('renders correctly', () => {
    expect(wrapper.find('.calculation-hint').text()).toBe('The loan to value shows the part covered by a loan compared to the property value.')
  });

  it('shows output when loan amount is set in store', async () => {
    const store = useCalculation();
    store.loanToValue = 1337;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.calculation-output').exists()).toBeTruthy();
  });

  it('correctly formats percentages', async () => {
    const store = useCalculation();
    store.loanToValue = .424159;

    await wrapper.vm.$nextTick();
    const formattedOutput = wrapper.find('.calculation-output').text();

    expect(formattedOutput).toBe(new Intl.NumberFormat('de-De', {style: 'percent', maximumFractionDigits: 2}).format(store.loanToValue));
  })
})