<template>
	<Card>
		<template #heading>Implied loan</template>
		<p class="calculation-hint" v-if="!rawLoanAmount">
			The implied loan shows the exact loan you will be applying for.
		</p>

		<p class="calculation-output animate-show" v-else-if="rawLoanAmount > 0">{{ formatted }}</p>
	</Card>
</template>

<script setup lang="ts">
import { toRefs, type ComputedRef, computed } from 'vue';
import Card from '../base/Card.vue';
import { useCalculation } from '../../stores/Calculation';
import { useCurrency } from '../../composables/FormatCurrency';

const { rawLoanAmount } = toRefs(useCalculation());
const formatted: ComputedRef<string> = computed(() => {
  return useCurrency(rawLoanAmount.value);
});
</script>

<style scoped></style>
