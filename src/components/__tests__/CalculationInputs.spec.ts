import { mount } from '@vue/test-utils';
// @ts-ignore
import CalculationInputs from '../calculation/CalculationInputs.vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, expect, it, vi } from 'vitest';
import { useCalculation } from '../../stores/Calculation';

const wrapper = mount(CalculationInputs, {
  global: {
    plugins: [createTestingPinia({
      createSpy: vi.fn
    })]
  }
});

describe('CalculationInputs', () => {
  it('has all relevant store items', () => {

    const store = useCalculation();
    const { property_price, total_savings, real_estate_comission, annual_repayment_rate } = wrapper.vm;

    expect([
      property_price,
      total_savings,
      real_estate_comission,
      annual_repayment_rate
    ]).toStrictEqual([
      store.property_price,
      store.total_savings,
      store.real_estate_comission,
      store.annual_repayment_rate
    ])
  });
})