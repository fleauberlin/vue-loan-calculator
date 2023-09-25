import { mount } from '@vue/test-utils';
// @ts-ignore
import RatesTable from '../calculation/RatesTable.vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, expect, it, vi } from 'vitest';
import { useRepayment } from '../../stores/Repayment';
import { useCurrency } from '../../composables/FormatCurrency';
import { usePercentage } from '../../composables/FormatPercentage';

const wrapper = mount(RatesTable, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn
      })
    ]
  }
});

const store = useRepayment();

store.rates = {
  "5": {
    "borrowingRate": 4.11,
    "monthlyRate": 1891.57
  },
  "10": {
    "borrowingRate": 3.91,
    "monthlyRate": 1829.65
  }
};

describe('RatesTable', () => {
  it('shows skeleton on loading', async () => {
    wrapper.vm.loading = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.skeleton-loader').exists()).toBeTruthy();
  });

  it('renders correct amount of table rows', async () => {
    wrapper.vm.loading = false;

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('tbody>tr').length).toBe(2);
  })

  it('formats displayed values correctly', async () => {
    const formatsMatching = [
      wrapper.find('tbody>tr>td').text(),
      wrapper.find('tbody>tr>td+td').text()
    ]

    expect(formatsMatching).toStrictEqual([
      useCurrency(1891.57),
      usePercentage(4.11 / 100)
    ])
  })
})