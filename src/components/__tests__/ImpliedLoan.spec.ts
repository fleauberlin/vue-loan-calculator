import { mount } from "@vue/test-utils";
// @ts-ignore
import ImpliedLoan from '../calculation/ImpliedLoan.vue'
import { createTestingPinia } from "@pinia/testing";
import { expect, it, vi, describe } from "vitest";
import { useCalculation } from "../../stores/Calculation";

const wrapper = mount(ImpliedLoan, {
  global: {
    plugins: [createTestingPinia({
      createSpy: vi.fn
    })]
  }
})

describe('ImpliedLoan', () => {
  it('renders correctly', () => {
    expect(wrapper.find('.calculation-hint').text()).toBe('The implied loan shows the exact loan you will be applying for.')
  });

  it('shows output when loan amount is set in store', async () => {
    const store = useCalculation();
    store.rawLoanAmount = 1337;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.calculation-output').exists()).toBeTruthy();
  });

  it('correctly formats money values', async () => {
    const store = useCalculation();
    store.rawLoanAmount = 123456.789;

    await wrapper.vm.$nextTick();
    const formattedOutput = wrapper.find('.calculation-output').text();

    expect(formattedOutput).toBe(new Intl.NumberFormat('de-De', {style: 'currency', currency: 'EUR'}).format(store.rawLoanAmount));
  })
})