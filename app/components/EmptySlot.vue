<template>
  <div :class="class" class="flex flex-col items-center justify-center p-8 text-center bg-white max-w-sm mx-auto">
    <Icon :name="icon" size="150px" :class="class" class="text-blue-500 mb-4 animate-bounce-in" />

    <h2 :class="class" class="text-3xl text-gray-800 mb-2 leading-tight">
      {{ heading }}
    </h2>

    <p :class="class" class="text-lg text-gray-600 leading-relaxed">
      {{ caption }}
    </p>
  </div>
</template>

<script setup>
// Define props directly for brevity and clear interface
defineProps({
  icon: {
    type: String,
    default: 'fluent-color:home-16', // More modern default icon
  },
  class: {
    type: String,
    default: 'text-blue-500',
  },
  heading: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Optional: Custom animation for the icon */
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}
</style>
