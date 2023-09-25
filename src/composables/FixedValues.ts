export const useFixedValues = () => {
  // Fixed values
  const BASE_NOTARY_FIXED_FEE = 2144;
  const BASE_NOTARY_PERCENTAGE = 0.013;
  const BASE_NOTARY_SUBSTRACTION = 100_000;
  const BROKER_TAX = 0.0714;
  const CITY_TAX = 0.06;

  return {
    BASE_NOTARY_FIXED_FEE,
    BASE_NOTARY_PERCENTAGE,
    BASE_NOTARY_SUBSTRACTION,
    BROKER_TAX,
    CITY_TAX
  }
}