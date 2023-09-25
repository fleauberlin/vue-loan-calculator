<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
		<!-- <div class="col-span-2">
			<RegionSelector></RegionSelector>
		</div> -->
		<div>
			<NumberInput
				v-model="property_price"
				label="Property purchase price"
				placeholder="Property purchase price"
				:step="5000"
				required
			></NumberInput>
		</div>

		<div>
			<NumberInput
				v-model="total_savings"
				label="Total savings"
				placeholder="Total savings"
				:step="5000"
			></NumberInput>
		</div>

		<div>
			<BooleanInput
				v-model="real_estate_comission"
				label="Real estate comission"
				placeholder="Real estate comission"
			></BooleanInput>
		</div>

		<div>
			<NumberInput
				v-model="annual_repayment_rate"
				label="Annual repayment rate in %"
				placeholder="%"
				:min="0.1"
				:max="100"
				:step="0.1"
				required
			></NumberInput>
		</div>

		<div class="col-span-2 mt-4">
			<CalculateButton class="w-full"></CalculateButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useCalculation } from "../../stores/Calculation";
import NumberInput from "../base/NumberInput.vue";
import CalculateButton from "./CalculateButton.vue";
import BooleanInput from "../base/BooleanInput.vue";
import RegionSelector from './RegionSelector.vue'
import { useRegions } from "../../stores/Regions";

const {
	property_price,
	total_savings,
	real_estate_comission,
	annual_repayment_rate,
} = toRefs(useCalculation());

const { region } = toRefs(useRegions());
</script>

<style scoped></style>
