import { setActivePinia, createPinia } from 'pinia'
import { useCalculation } from '../Calculation'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Calculation store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('calculates correct loan to value', () => {
    const store = useCalculation();

    store.property_price = 320_000;
    store.real_estate_comission = false;
    store.total_savings = 80_000;
    store.calculate();

    expect(store.loanToValue).toBe(.8256);
  })

  it('calculates correct loan amount', () => {
    const store = useCalculation();

    store.property_price = 320_000;
    store.real_estate_comission = false;
    store.total_savings = 80_000;
    store.calculate();

    expect(store.rawLoanAmount).toBe(264_204);
  })

  it('has a working clear calculation method', () => {
    const store = useCalculation();

    store.property_price = 1337;
    store.total_savings = 1337;
    store.real_estate_comission = true;
    store.annual_repayment_rate = 1337;
    store.rawLoanAmount = 1337;
    store.loanToValue = 1337;

    store.clearCalculation();

    expect([
      store.property_price,
      store.total_savings,
      store.real_estate_comission,
      store.annual_repayment_rate,
      store.rawLoanAmount,
      store.loanToValue,
    ]).toStrictEqual([
      0,
      0,
      false,
      2,
      0,
      0
    ])
  })
})