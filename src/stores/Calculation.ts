import { defineStore } from "pinia";
import { useFixedValues } from "../composables/FixedValues";
import { ref, toRefs, type Ref, watch } from "vue";
import { usePrecision } from "../composables/ToPrecision";
import { useRepayment } from "./Repayment";
import { useRegions } from "./Regions";
import { useDebounceFn } from "@vueuse/core";

// Holds complete calculation logic and fires the repayment data request
export const useCalculation = defineStore('calculation', () => {
  // Fixed values set in composable to declutter calculation store
  const {
    BASE_NOTARY_FIXED_FEE,
    BASE_NOTARY_PERCENTAGE,
    BASE_NOTARY_SUBSTRACTION,
  } = useFixedValues();

  // Tax values from region store although not fully implemented
  const { brokerTax, cityTax } = toRefs(useRegions());

  // Determines if calculation was done at least once unless calculation is cleared
  const calculated: Ref<boolean> = ref(false);

  // User inputs
  const property_price: Ref<number> = ref(0);
  const real_estate_comission: Ref<boolean> = ref(false);
  const total_savings: Ref<number> = ref(0);
  const annual_repayment_rate: Ref<number> = ref(2);

  // Calculated values
  const notaryCosts = ref(0);
  const brokerCosts = ref(0);
  const stampDutyCosts = ref(0);
  const totalCosts = ref(0);
  const rawLoanAmount = ref(0);
  const loanToValue = ref(0);

  // Values are calculated independently instead of using a computed property for rawLoanAmount and loanToValue
  const calculate = (getRepayment: boolean = false): void => {
    notaryCosts.value = usePrecision((property_price.value - BASE_NOTARY_SUBSTRACTION) * BASE_NOTARY_PERCENTAGE + BASE_NOTARY_FIXED_FEE);

    brokerCosts.value = usePrecision(!!real_estate_comission.value ? brokerTax.value * property_price.value : 0);

    stampDutyCosts.value = usePrecision(cityTax.value * property_price.value);

    totalCosts.value = notaryCosts.value + brokerCosts.value + stampDutyCosts.value;

    rawLoanAmount.value = totalCosts.value - total_savings.value + property_price.value;
    loanToValue.value = usePrecision(rawLoanAmount.value / property_price.value, 4);

    if (getRepayment) {
      calculated.value = true;
      useRepayment().getRepaymentData({
        property_price: property_price.value,
        annual_repayment_rate: annual_repayment_rate.value,
        rawLoanAmount: rawLoanAmount.value
      });
    }
  }

  // Debounce function for smoother calculation output
  const calculateRealTime = useDebounceFn(() => calculate(false), 600)

  // Realtime calculations done on relevant input changes
  watch([property_price, total_savings, annual_repayment_rate, real_estate_comission], (values) => {
    if (!property_price.value || !annual_repayment_rate.value) return;
    calculateRealTime();
  })

  const clearCalculation = (): void => {
    calculated.value = false;
    property_price.value = 0;
    real_estate_comission.value = false;
    total_savings.value = 0;
    annual_repayment_rate.value = 2;
    notaryCosts.value = 0;
    brokerCosts.value = 0;
    stampDutyCosts.value = 0;
    totalCosts.value = 0;
    rawLoanAmount.value = 0;
    loanToValue.value = 0;
  }

  return {
    property_price,
    total_savings,
    real_estate_comission,
    annual_repayment_rate,
    rawLoanAmount,
    loanToValue,
    calculated,
    calculate,
    clearCalculation
  }
})