<script setup>
const props = defineProps({ progress: { type: Number, default: 0 } }); // 0-100
</script>

<template>
  <div class="reading-progress" :style="{ width: `${props.progress}%` }"></div>
</template>
