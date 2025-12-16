<template>
  <div class="min-h-screen no-select" @contextmenu.prevent>
    <UApp :toaster="toaster">
      <NuxtLayout>
        <NuxtPage />
      <PWAPrompt />
      </NuxtLayout>
       </UApp>
  </div>
</template>

<script setup>
// throw new Error('test');
const toaster = { expand: true , position: 'top-right' }
</script>

<style>
.no-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Custom animations for subtle effects */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

@keyframes slide-in-bottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-in-bottom {
  animation: slide-in-bottom 1s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Subtle bounce for CTA button */
@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite ease-in-out;
}

/* Ensure horizontal scrolling for testimonials on small screens */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch; /* For smoother scrolling on iOS */
  scrollbar-width: none; /* Firefox */
}

.overflow-x-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

/* Specific styling for member cards */
.member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.carousel {
  /* ... */
  &:hover .animateGroup {
    animation-play-state: paused;
  }
}

.animateGroup {
  /* ... */
  will-change: transform; /* We should be nice to the browser - let it know what we're going to animate. */
  animation: scrolling 6s linear infinite;
}

@keyframes scrolling {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
