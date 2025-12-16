<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <header class="sticky top-0 z-50 glass-card border-b border-white/20 dark:border-gray-700/20">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UIcon name="i-lucide-zap" class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-bold gradient-text hidden sm:block">ModernApp</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex  space-x-1">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
              class="relative px-4 py-2 flex items-center justify-center rounded-lg font-medium transition-all duration-300 group"
              :class="{
                'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path === link.to,
                'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50': $route.path !== link.to,
              }">
              <UIcon :name="link.icon" class="w-4 h-4 mr-2" />
              {{ link.label }}
              <!-- Active indicator -->
              <span v-if="$route.path === link.to"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
            </NuxtLink>

          </nav>

          <!-- Right side controls -->
          <div class="flex items-center space-x-2">
            <!-- Theme toggle -->
            <div
              class="dark:text-primary bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-full">
              <client-only>
                <UButton
                  :icon="colorMode.preference === 'dark' ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
                  color="gray" size="md" variant="ghost" class=" dark:text-white" aria-label="Theme"
                  @click="toggleColorMode" />
              </client-only>
            </div>
            <!-- Mobile menu button -->
            <UButton icon="i-lucide-menu" color="gray" variant="ghost" size="sm"
              class="w-10 h-10 md:hidden hover:scale-110 transition-transform duration-200"
              @click="mobileMenuOpen = !mobileMenuOpen" />
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Overlay -->
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 md:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="mobileMenuOpen = false"></div>

        <!-- Mobile menu -->
        <div class="absolute top-0 left-0 w-80 h-full glass-card border-r border-white/20">
          <div class="p-6">
            <!-- Mobile header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <UIcon name="i-lucide-zap" class="w-6 h-6 text-white" />
                </div>
                <span class="text-xl font-bold gradient-text">ModernApp</span>
              </div>
              <UButton icon="i-lucide-x" color="gray" variant="ghost" size="sm" @click="mobileMenuOpen = false" />
            </div>

            <!-- Mobile navigation links -->
            <nav class="space-y-2">
              <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
                class="flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 group" :class="{
                  'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path === link.to,
                  'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50': $route.path !== link.to,
                }" @click="mobileMenuOpen = false">
                <UIcon :name="link.icon" class="w-5 h-5" />
                <span>{{ link.label }}</span>
                <UIcon v-if="$route.path === link.to" name="i-lucide-check" class="w-4 h-4 ml-auto text-blue-500" />
              </NuxtLink>
            </nav>

            <!-- Mobile footer -->
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">2nd Lot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="min-h-screen page-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div class="container mx-auto px-4 py-16 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div
                class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UIcon name="i-lucide-zap" class="w-6 h-6 text-white" />
              </div>
              <span class="text-2xl font-bold">ModernApp</span>
            </div>
            <p class="text-gray-300 mb-6 max-w-md">Building the future of web applications with cutting-edge technology
              and beautiful design.</p>
            <div class="flex space-x-4">
              <UButton v-for="social in socialLinks" :key="social.name" :icon="social.icon" color="gray" variant="ghost"
                size="sm" :to="social.url" target="_blank"
                class="w-10 h-10 hover:scale-110 transition-transform duration-200" />
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-gray-300 hover:text-white transition-colors duration-200">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <div class="space-y-2 text-gray-300">
              <div class="flex items-center space-x-2">
                <UIcon name="i-lucide-mail" class="w-4 h-4" />
                <span class="text-sm">hello@modernapp.com</span>
              </div>
              <div class="flex items-center space-x-2">
                <UIcon name="i-lucide-phone" class="w-4 h-4" />
                <span class="text-sm">+1 (555) 123-4567</span>
              </div>
              <div class="flex items-center space-x-2">
                <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                <span class="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">© {{ currentYear }} ModernApp. All rights reserved.</p>
          <div class="flex items-center space-x-6 mt-4 md:mt-0">
            <NuxtLink to="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy </NuxtLink>
            <NuxtLink to="/terms" class="text-gray-400 hover:text-white text-sm transition-colors duration-200"> Terms
              of Service </NuxtLink>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

// State
const mobileMenuOpen = ref(false);

// Navigation links
const navLinks = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/',
  },
  {
    label: 'About',
    icon: 'i-lucide-users',
    to: '/about',
  },
  {
    label: 'Contact',
    icon: 'i-lucide-mail',
    to: '/contact',
  },
];

// Social media links
const socialLinks = [
  {
    name: 'GitHub',
    icon: 'i-lucide-github',
    url: 'https://github.com',
  },
  {
    name: 'Twitter',
    icon: 'i-lucide-twitter',
    url: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    icon: 'i-lucide-linkedin',
    url: 'https://linkedin.com',
  },
  {
    name: 'Discord',
    icon: 'i-lucide-message-circle',
    url: 'https://discord.com',
  },
];

// Current year for footer
const currentYear = new Date().getFullYear();

// Theme management
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};

// Close mobile menu when route changes
watch(
  () => useRoute().path,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>

<style scoped>
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

/* Glass effect enhancement */
.glass-card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Page content animation */
.page-content {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .glass-card {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
</style>
