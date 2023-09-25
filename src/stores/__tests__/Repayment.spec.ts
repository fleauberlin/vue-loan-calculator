import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useRepayment } from '../Repayment';

describe('Repayment store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  });

  it('initializes with correct defaults', () => {
    const store = useRepayment();

    expect([
      store.loading,
      store.error,
      store.rates
    ]).toStrictEqual([
      false,
      null,
      {}
    ])
  })
})