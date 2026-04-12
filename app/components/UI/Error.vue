<template>
  <div class="flex flex-col items-center justify-center p-4">
    <div class="text-center bg-white dark:bg-slate-800 p-10 rounded-xl shadow-lg">
      <h1 class="text-9xl font-bold text-red-500">{{ error.statusCode }}</h1>
      <p class="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
        {{ errorMessage }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mt-2 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <button @click="handleError"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

const { error, redirectTo } = defineProps({
  error: Object as () => NuxtError,
  redirectTo: String
})

// Custom message based on status code
const errorMessage = computed(() => {
  return error?.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred'
})

// Clear error and redirect to home
const handleError = () => clearError({ redirect: redirectTo || '/' })
</script>
