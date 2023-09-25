<template>
	<div class="relative overflow-x-auto shadowed-table animate-show">
		<table>
			<thead>
				<tr>
					<th scope="col" class="px-6 py-3">Fixation length</th>
					<th scope="col" class="px-6 py-3">Monthly rate</th>
					<th scope="col" class="px-6 py-3">Interest rate</th>
				</tr>
			</thead>
			<tbody v-if="!loading">
				<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 fixation-row" v-for="(repaymentOption, key) in rates">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{{ key }} years
					</th>
					<td class="px-6 py-4 monthly-rate-row">{{ parseCurrency(repaymentOption.monthlyRate) }}</td>
					<td class="px-6 py-4 borrowing-rate-row">{{ parsePrecentage(repaymentOption.borrowingRate / 100) }}</td>
				</tr>
			</tbody>
			
			<tbody v-else>
				<tr>
					<td colspan="3">
						<Skeleton></Skeleton>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useRepayment } from '../../stores/Repayment';
import Skeleton from '../base/Skeleton.vue';
import { useCurrency } from '../../composables/FormatCurrency';
import { usePercentage } from '../../composables/FormatPercentage';

const { rates, loading } = toRefs(useRepayment());

const parseCurrency = (raw: number) => {
  return useCurrency(raw);
}

const parsePrecentage = (raw: number) => {
  return usePercentage(raw)
}
</script>
<style scoped></style>
