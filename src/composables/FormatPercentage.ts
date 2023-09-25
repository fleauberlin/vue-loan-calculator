export const usePercentage = (rawValue: number) => {
  return new Intl.NumberFormat('de-De', { style: 'percent', minimumFractionDigits: 2 }).format(rawValue)
} 