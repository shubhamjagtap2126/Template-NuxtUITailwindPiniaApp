<script setup>

</script>

<template>
  <div class="flex items-center justify-start h-full">
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900">
      <!-- Spinner Wrapper -->
      <div class="relative flex items-center justify-center">
        <!-- Outer Ring (Animate Spin) -->
        <div class="h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>

        <!-- Inner Pulsing Circle -->
        <div class="absolute h-16 w-16 animate-pulse rounded-full bg-blue-500/20"></div>
      </div>

      <!-- Loading Text -->
      <h2 class="mt-8 animate-pulse text-xl font-semibold text-white tracking-widest">
        LOADING...
      </h2>

      <!-- Accessibility Text -->
      <span class="sr-only">Please wait while the page loads</span>
    </div>

  </div>
</template>


<style scoped></style>
