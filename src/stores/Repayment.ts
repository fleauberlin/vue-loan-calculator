import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import axios from "axios";

// Fetches and holds the repayment data
export const useRepayment = defineStore('repayment', () => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<null | string> = ref(null);
  const rates: Ref<any> = ref({});

  const getRepaymentData = async ({ property_price, rawLoanAmount, annual_repayment_rate }: { property_price: number, rawLoanAmount: number, annual_repayment_rate: number }) => {
    error.value = null;
    loading.value = true;
    axios({
      url: `${import.meta.env.VITE_API_URL}`,
      method: 'POST',
      data: {
        query: `{
                root {
                rates_table(
                property_price: ${property_price}
                repayment: ${annual_repayment_rate}
                loan_amount: ${rawLoanAmount}
                years_fixed: [5, 10, 15, 20, 25, 30]
            )
          }
        }`
      },
      timeout: 10000 // Default timeout of 10 seconds
    }).then(res => {
      const { ratesTable } = res?.data?.data?.root;
      if (!ratesTable) error.value = "Rates could not be received.";
      rates.value = ratesTable;
      return ratesTable
    })
      .catch(e => {
        error.value = "Could not get calculation."
      })
      .finally(() => loading.value = false);
  }

  const clearRepayment = () => {
    rates.value = {};
  }

  return {
    rates,
    loading,
    error,
    getRepaymentData,
    clearRepayment
  }

})