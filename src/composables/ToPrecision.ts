// Used for number calculations instead of conversion to cents
export const usePrecision = (calculation: number, precision: number = 12): number => {
  // @ts-ignore
  return +parseFloat(calculation).toPrecision(precision);
}