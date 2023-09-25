export const useCurrency = (rawValue: number) => {
  return new Intl.NumberFormat('de-De', { style: 'currency', currency: 'EUR' }).format(rawValue)
} 