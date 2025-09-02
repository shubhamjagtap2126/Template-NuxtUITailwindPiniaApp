<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white p-4 text-center">
    <div>
      <div class="text-[30vh] leading-none font-bold">404</div>

      <div class="text-4xl sm:text-5xl md:text-6xl" style="opacity: 0.7">Oops. Nothing here...</div>

      <UButton to="/" class="mt-12 px-8 py-4 bg-white text-black font-semibold text-lg">Go home</UButton>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'empty', // Assuming you have an 'empty' layout defined for error pages
});
</script>

<style scoped>
/* No specific styles needed as Tailwind handles everything */
</style>
