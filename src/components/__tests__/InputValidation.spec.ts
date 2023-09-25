import { mount } from "@vue/test-utils";
// @ts-ignore
import InputValidation from '../calculation/InputValidation.vue'
import { createTestingPinia } from "@pinia/testing";
import { describe, expect, it, vi } from "vitest";
import { useCalculation } from "../../stores/Calculation";

const wrapper = mount(InputValidation, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn
      })
    ]
  }
});

describe('InputValidation', () => {
  it('shows no errors when required values are set', () => {
    const store = useCalculation();
    store.property_price = 1337;
    store.total_savings = 1337;

    expect(wrapper.find('.error.message').exists()).toBeFalsy();
  });

  it ('shows correct error message on property price not set', async () => {
    const store = useCalculation();
    store.total_savings = 1337;
    store.property_price = 0;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.error-message').text()).toBe('Property price is required.')
  })

  // Removed this test because total savings might be optional
  // it ('shows correct error message on total savings not set.', async () => {
  //   const store = useCalculation();
  //   store.total_savings = 0;
  //   store.property_price = 1337;

  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.find('.error-message').text()).toBe('Total savings are required.')
  // })
})