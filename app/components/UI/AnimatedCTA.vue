<script setup>
defineProps({
  label: { type: String, default: 'Click me' },
  to: { type: String, default: '#' }
});
</script>

<template>
  <NuxtLink :to="to"
    class="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-linear-to-r from-blue-500 to-purple-600 rounded-full group hover:shadow-[0_0_30px_rgba(244,168,50,0.5)] active:scale-95 overflow-hidden">
    <!-- Pulse Effect -->
    <span class="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
    <span
      class="absolute -inset-1 rounded-full blur-md opacity-25 group-hover:opacity-100 bg-linear-to-r from-purple-500 to-pink-500 transition-opacity duration-500 animate-pulse"></span>

    <span class="relative flex items-center gap-2">
      {{ label }}
      <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>
  </NuxtLink>
</template>

<style scoped>
/* Any custom animations if not using Tailwind's pulse */
</style>
