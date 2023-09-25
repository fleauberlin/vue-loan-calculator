<template>
	<div id="calculator-container" class="mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4">
			<div class="col-span-1">
				<Card>
					<template #heading> Loan calculator </template>
					<div class="mt-4">
						<CalculationInputs></CalculationInputs>
					</div>
				</Card>
			</div>
			<div class="col-span-1 grid grid-cols-1 gap-4">
				<ImpliedLoan></ImpliedLoan>
				<LoanToValue></LoanToValue>
			</div>
			<div class="col-span-1 md:col-span-2" v-if="calculated">
				<RatesTable></RatesTable>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, toRefs, type ComputedRef } from "vue";
import Card from "./base/Card.vue";
import CalculationInputs from "./calculation/CalculationInputs.vue";
import ImpliedLoan from "./calculation/ImpliedLoan.vue";
import LoanToValue from "./calculation/LoanToValue.vue";
import RatesTable from "./calculation/RatesTable.vue";
import { useCalculation } from "../stores/Calculation";

const { calculated } = toRefs(useCalculation())
</script>

<style scoped>
#calculator-container {
	max-width: 960px;
}
</style>
