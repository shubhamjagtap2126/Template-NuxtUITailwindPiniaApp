<template>
  <div class="flex items-center justify-center" :style="{ width: size, height: size }">
    <div class="animate-spin rounded-full border-2 border-t-transparent"
      :style="{ width: size, height: size, borderColor: `var(--accent) transparent var(--accent) transparent` }"></div>
  </div>
</template>

<script setup>
defineProps({ size: { type: String, default: '32px' } });
</script>
