<script setup>
const props = defineProps({
  variant: { type: String, default: 'default' }, // default | trending | breaking | short | featured
  priority: { type: String, default: '' },        // breaking | trending | ''
  label: { type: String, default: '' },
});
</script>

<template>
  <span class="badge" :class="[
    variant === 'breaking' || priority === 'high' ? 'badge-breaking' :
      variant === 'trending' || priority === 'medium' ? 'badge-trending' :
        'badge-category'
  ]">
    <span v-if="variant === 'breaking' || priority === 'high'">🔴</span>
    <span v-else-if="variant === 'trending' || priority === 'medium'">🟡</span>
    <span v-else>🟢</span>
    {{ label || (variant === 'breaking' ? 'Breaking' : variant === 'trending' ? 'Trending' : 'News') }}
  </span>
</template>
