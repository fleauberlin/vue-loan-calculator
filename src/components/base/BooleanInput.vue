<template>
	<label
		:for="label"
		class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>{{ label }}</label
	>
	<select
    @change="$emit('update:modelValue', !!+($event?.target as HTMLInputElement)?.value)"
		class="select-input"
	>
		<option selected :value="0">No</option>
		<option :value="1">Yes</option>
	</select>
</template>

<script setup lang="ts">
defineProps<{
	label?: string;
	placeholder?: string;
	modelValue: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
