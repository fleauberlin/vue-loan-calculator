<template>
	<label :for="label" class="input-label">{{ label }}</label>
	<input :value="modelValue" @input="$emit('update:modelValue', +($event?.target as HTMLInputElement)?.value)" type="number" class="number-input" :placeholder="placeholder" :min="min" :max="max" :required="required" :step="step"/>
</template>

<script setup lang="ts">

const props = defineProps<{
  label?: string;
  placeholder?: string;
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
</style>
