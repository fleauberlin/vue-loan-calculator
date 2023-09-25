<template>
	<div class="w-full text-center">
		<button
			type="button"
			class="blue-button w-full"
			@click="calculate(true)"
			:disabled="!!disabled"
			:class="{ disabled: !!disabled }"
			@mouseover="showInputErrors"
		>
			{{ !!calculated ? "Re-calculate" : "Calculate" }}
		</button>
		<a href="javascript:void(0)" class="default-link" v-if="!!calculated" @click="clear">Clear calculation</a>
		<InputValidation v-if="inputErrorsVisible"></InputValidation>
		<div class="text-orange-600" v-if="!!error">
		<span>{{ error }}&nbsp;</span>
			<a class="underline" href="javascript:void(0)" @click="calculate()">Try again</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type ComputedRef, computed, toRefs, type Ref, ref } from 'vue';
import { useCalculation } from '../../stores/Calculation';
import InputValidation from './InputValidation.vue';
import { useRepayment } from '../../stores/Repayment';

const { calculate, clearCalculation } = useCalculation();
const { clearRepayment } = useRepayment();
const { error } = toRefs(useRepayment());
const { property_price, annual_repayment_rate, calculated } = toRefs(useCalculation());

const inputErrorsVisible: Ref<boolean> = ref(false);

const disabled: ComputedRef<boolean> = computed(() => {
	return !property_price.value || !annual_repayment_rate;
})

const showInputErrors = () => {
	if (!!disabled.value) inputErrorsVisible.value = true;
}

const clear = () => {
	clearCalculation();
	clearRepayment();
}
</script>

<style scoped></style>
