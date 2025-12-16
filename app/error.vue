<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-purple-600 p-4 sm:p-6">
    <UCard class="rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all duration-500 hover:scale-105">
      <div class="q-py-md">
        <div class="text-8xl font-bold text-red-600 leading-none mb-4">
          {{ error.statusCode || 'Error' }}
        </div>
        <div class="text-4xl text-gray-700 opacity-80 mb-3">
          {{ error.statusMessage || 'Something went wrong!' }}
        </div>
        <p class="text-lg text-gray-600 leading-relaxed overflow-auto">
          {{ error.message || 'An unexpected error occurred. We apologize for the inconvenience.' }}
        </p>
      </div>

      <UDivider class="my-6" />

      <div class="flex justify-center gap-4 bg-white">
        <UButton icon="i-heroicons-home" variant="solid" color="warning" @click="clearNuxtError" class="mt-12 px-8 py-4 text-black font-semibold text-lg"> Home </UButton>
        <UButton icon="i-heroicons-arrow-left" @click="goBackAndClearError" class="mt-12 px-8 py-4 text-black font-semibold text-lg"> Back </UButton>
        <UButton trailing-icon="i-lucide-rocket">Show Toast</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const clearNuxtError = () => {
  clearError({ redirect: '/' });
};

const goBackAndClearError = () => {
  if (router.options.history.state.back && props.error.statusCode !== 404) {
    router.back();
    clearError();
  } else {
    clearNuxtError();
  }
};
</script>

<style scoped>
/* No additional custom styles needed beyond Tailwind utilities */
</style>
