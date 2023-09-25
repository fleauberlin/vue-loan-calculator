<template>
	<Card>
		<template #heading>Loan to Value</template>
		<p class="calculation-hint" v-if="!loanToValue">
			The loan to value shows the part covered by a loan compared to the property value.
		</p>

		<p class="calculation-output animate-show" v-else-if="loanToValue > 0">{{ formatted }}</p>
	</Card>
</template>

<script setup lang="ts">
import { toRefs, type ComputedRef, computed } from 'vue';
import Card from '../base/Card.vue';
import { useCalculation } from '../../stores/Calculation';
import { usePercentage } from '../../composables/FormatPercentage';

const { loanToValue } = toRefs(useCalculation());
const formatted: ComputedRef<string> = computed(() => {
  return usePercentage(loanToValue.value)
})
</script>

<style scoped></style>
