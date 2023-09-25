import axios from "axios";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

// Updates region data, city tax and broker tax un region updates. Not implemented in components.
export const useRegions = defineStore('regions', () => {
  const possibleRegions: { value: string, text: string }[] = [
    { value: 'berlin', text: 'Berlin' },
    { value: 'brandenburg', text: 'Brandenburg' },
    { value: 'bavaria', text: 'Bavaria' },
    { value: 'hamburg', text: 'Hamburg' },
    { value: 'saxony', text: 'Saxony' },
    { value: 'baden-wurttemberg', text: 'Baden-wurttemberg' },
    { value: 'hesse', text: 'Hesse' },
  ]

  const cityTax: Ref<number> = ref(0.06);
  const brokerTax: Ref<number> = ref(0.0714);

  const region: Ref<string> = ref("berlin");

  const getCityTax = async () => {
    axios({
      url: `${import.meta.env.VITE_API_URL}`,
      method: 'POST',
      data: {
        mutations: `{
          calculateCityTax(input: { region: "${region.value}" }) { tax
          }`
      },
      timeout: 10000 // Default timeout of 10 seconds
    })
  }

  const getBrokerTax = async () => {
    axios({
      url: `${import.meta.env.VITE_API_URL}`,
      method: 'POST',
      data: {
        mutations: `{
            calculateMaklerFee(input: { new_property: false, region: "berlin" }) {
              tax
            }
          }`
      },
      timeout: 10000 // Default timeout of 10 seconds
    })
  }

  return {
    possibleRegions,
    region,
    getCityTax,
    getBrokerTax,
    cityTax,
    brokerTax
  }
})