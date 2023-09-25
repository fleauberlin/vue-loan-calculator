<template>
	<p v-for="error in appliedErrors" class="mt-2 text-sm text-orange-600 dark:text-orange-500 animate-show error-message">{{ error.message }}</p>
</template>

<script setup lang="ts">
import { toRefs, type ComputedRef, computed } from 'vue';
import { useCalculation } from '../../stores/Calculation';

interface InputError {
  message: string;
  condition: boolean;
}

const { property_price, total_savings, annual_repayment_rate } = toRefs(useCalculation());

const inputErrors: ComputedRef<InputError[]> = computed(() => {
  return [
  {
    message: 'Property price is required.',
    condition: !property_price.value
  },
  // Temporarily removed because savings could be optional
  // {
  //   message: 'Total savings are required.',
  //   condition: !total_savings?.value
  // },
  {
    message: 'Annual repayment must be greater than 0.',
    condition: !annual_repayment_rate?.value
  }
]
});

const appliedErrors: ComputedRef<InputError[]> = computed(() => {
  return inputErrors.value.filter((e: InputError) => !!e.condition)
})
</script>

<style scoped></style>
