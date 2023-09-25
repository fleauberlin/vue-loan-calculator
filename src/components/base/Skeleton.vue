<template>
  <div role="status" class="animate-pulse w-full skeleton-loader">
    <div v-for="index in 10" class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <span class="sr-only">Loading...</span>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>