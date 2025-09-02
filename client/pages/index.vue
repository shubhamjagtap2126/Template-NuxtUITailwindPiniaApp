<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGsapAnimations } from '~/composables/useGsapAnimations';
import { useSwiper } from '~/composables/useSwiper';

useHead({
  title: 'Welcome to Our Amazing App',
  meta: [
    { name: 'description', content: 'Experience the future of web applications with our cutting-edge platform built with Nuxt 4, Tailwind CSS, and modern design principles.' },
    { property: 'og:title', content: 'Welcome to Our Amazing App' },
    { property: 'og:description', content: 'Experience the future of web applications with our cutting-edge platform.' },
    { property: 'og:type', content: 'website' },
  ],
});

// Refs for animations
const heroRef = ref();
const heroTitleRef = ref();
const heroSubtitleRef = ref();
const heroCtaRef = ref();
const statsRef = ref();

// Animation composables
const { animateHero, animateCards, fadeInUp, animateCounter, floatingAnimation, cleanup } = useGsapAnimations();

// Swiper configuration
const { Swiper, SwiperSlide, testimonialsConfig, heroConfig } = useSwiper();

// Toast for interactions
const toast = useToast();

// Data
const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Lightning Fast',
    description: 'Built with Nuxt 4 and optimized for performance with SSR and modern bundling.',
    color: 'yellow',
  },
  {
    icon: 'i-lucide-palette',
    title: 'Beautiful Design',
    description: 'Stunning UI components with Tailwind CSS and NuxtUI for modern aesthetics.',
    color: 'purple',
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Mobile First',
    description: 'Responsive design that works perfectly on all devices and screen sizes.',
    color: 'blue',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'PWA Ready',
    description: 'Progressive Web App features for offline capability and native-like experience.',
    color: 'green',
  },
  {
    icon: 'i-lucide-code',
    title: 'Developer Friendly',
    description: 'Clean, maintainable code with TypeScript support and modern development tools.',
    color: 'red',
  },
  {
    icon: 'i-lucide-rocket',
    title: 'Production Ready',
    description: 'Optimized builds, SEO-friendly, and ready for deployment to any platform.',
    color: 'indigo',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    company: 'Tech Innovators',
    content: 'This template saved me weeks of development time. The code quality and modern architecture are exceptional.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Perfect for rapid prototyping and production apps. The PWA features work flawlessly across all devices.',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Product Manager',
    company: 'Digital Solutions',
    content: 'The responsive design and animation capabilities helped us create an engaging user experience.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
  },
];

const stats = [
  { number: 10000, label: 'Happy Users', suffix: '+' },
  { number: 99, label: 'Performance Score', suffix: '%' },
  { number: 24, label: 'Support', suffix: '/7' },
  { number: 50, label: 'Components', suffix: '+' },
];

const heroSlides = [
  {
    title: 'Build Amazing Web Apps',
    subtitle: 'With Nuxt 4, Tailwind CSS, and Modern Design',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80',
    cta: 'Get Started',
  },
  {
    title: 'Performance First',
    subtitle: 'Optimized for Speed, SEO, and User Experience',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80',
    cta: 'Learn More',
  },
  {
    title: 'PWA Ready',
    subtitle: 'Offline Capabilities and Native-like Experience',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&fit=crop&q=80',
    cta: 'Try Now',
  },
];

// Methods
const showToast = (message = 'Action completed successfully!') => {
  toast.add({
    title: 'Success',
    description: message,
    color: 'green',
    icon: 'i-lucide-check-circle',
  });
};

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
};

// Newsletter form
const newsletterFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
    required: true,
    icon: 'i-lucide-mail',
    color: 'primary',
    size: 'lg',
  },
];

const handleNewsletterSubmit = ({ data }) => {
  // Simulate API call
  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: `Thank you for subscribing with ${data.email}`,
      color: 'green',
      icon: 'i-lucide-check-circle',
    });
  }, 1000);
};

// Lifecycle
onMounted(() => {
  // Hero animations
  animateHero(heroRef.value, heroTitleRef.value, heroSubtitleRef.value, heroCtaRef.value);

  // Feature cards animation
  setTimeout(() => {
    animateCards('.feature-card');
  }, 500);

  // Stats animation
  stats.forEach((stat, index) => {
    const element = document.querySelector(`[data-stat="${index}"]`);
    if (element) {
      animateCounter(element, stat.number, 2.5);
    }
  });

  // Floating animations for decorative elements
  setTimeout(() => {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el) => floatingAnimation(el));
  }, 1000);
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section with Swiper -->
    <section ref="heroRef" class="relative h-screen flex items-center justify-center overflow-hidden">
      <Swiper v-bind="heroConfig" class="absolute inset-0 w-full h-full">
        <SwiperSlide v-for="(slide, index) in heroSlides" :key="index" class="relative">
          <div class="absolute inset-0">
            <NuxtImg :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" loading="eager" :width="1920" :height="1080" />
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
          <div class="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 ref="heroTitleRef" class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg" data-swiper-parallax="-300">
              {{ slide.title }}
            </h1>
            <p ref="heroSubtitleRef" class="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto text-shadow" data-swiper-parallax="-200">
              {{ slide.subtitle }}
            </p>
            <div ref="heroCtaRef" data-swiper-parallax="-100">
              <UButton size="xl" color="primary" variant="solid" class="btn-gradient px-8 py-4 text-lg font-semibold" @click="scrollToFeatures">
                <template #leading>
                  <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                </template>
                {{ slide.cta }}
              </UButton>
            </div>
          </div>
        </SwiperSlide>

        <!-- Navigation -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </Swiper>

      <!-- Floating elements -->
      <div class="absolute top-20 left-10 floating-element opacity-20">
        <UIcon name="i-lucide-code" class="w-16 h-16 text-blue-400" />
      </div>
      <div class="absolute bottom-20 right-10 floating-element opacity-20">
        <UIcon name="i-lucide-rocket" class="w-12 h-12 text-purple-400" />
      </div>
      <div class="absolute top-1/2 left-20 floating-element opacity-20">
        <UIcon name="i-lucide-zap" class="w-10 h-10 text-yellow-400" />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center group">
            <div class="mb-4">
              <span :data-stat="index" class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text block"> 0 </span>
              <span class="text-2xl md:text-3xl font-bold text-gray-600 dark:text-gray-300">{{ stat.suffix }}</span>
            </div>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">Powerful Features</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Everything you need to build modern, fast, and beautiful web applications</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card glass-card p-8 hover:scale-105 transition-all duration-300 group cursor-pointer"
            @click="showToast(`Learn more about ${feature.title}`)"
          >
            <div class="mb-6">
              <div :class="`w-16 h-16 mx-auto rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`">
                <UIcon :name="feature.icon" :class="`w-8 h-8 text-${feature.color}-500`" />
              </div>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center group-hover:text-primary-500 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">What Developers Say</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Loved by developers worldwide</p>
        </div>

        <div class="max-w-6xl mx-auto">
          <Swiper v-bind="testimonialsConfig" class="testimonials-swiper">
            <SwiperSlide v-for="(testimonial, index) in testimonials" :key="index">
              <div class="glass-card p-8 mx-4 h-full">
                <div class="flex items-center mb-6">
                  <NuxtImg :src="testimonial.avatar" :alt="testimonial.name" class="w-16 h-16 rounded-full object-cover mr-4" :width="64" :height="64" />
                  <div>
                    <h4 class="font-bold text-lg">{{ testimonial.name }}</h4>
                    <p class="text-gray-600 dark:text-gray-400">{{ testimonial.role }}</p>
                    <p class="text-sm text-gray-500">{{ testimonial.company }}</p>
                  </div>
                </div>

                <div class="flex mb-4">
                  <UIcon v-for="star in testimonial.rating" :key="star" name="i-lucide-star" class="w-5 h-5 text-yellow-400 fill-current" />
                </div>

                <blockquote class="text-gray-700 dark:text-gray-300 italic leading-relaxed">"{{ testimonial.content }}"</blockquote>
              </div>
            </SwiperSlide>

            <!-- Navigation -->
            <div class="testimonials-next swiper-button-next"></div>
            <div class="testimonials-prev swiper-button-prev"></div>
            <div class="testimonials-pagination swiper-pagination"></div>
          </Swiper>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">Join thousands of developers who trust our platform to build amazing applications</p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UButton size="xl" color="white" variant="solid" class="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform" @click="showToast('Welcome aboard! 🚀')">
            <template #leading>
              <UIcon name="i-lucide-play" class="w-5 h-5" />
            </template>
            Start Building
          </UButton>

          <NuxtLink to="/about">
            <UButton size="xl" color="white" variant="outline" class="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform">
              <template #leading>
                <UIcon name="i-lucide-info" class="w-5 h-5" />
              </template>
              Learn More
            </UButton>
          </NuxtLink>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      <div class="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-xl"></div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-8">Get the latest updates and tips delivered to your inbox</p>

        <div class="max-w-md mx-auto">
          <DynamicForm :form-fields="newsletterFields" submit-label="Subscribe" submit-icon="i-lucide-mail" :show-submit-button="true" @submit="handleNewsletterSubmit" class="space-y-4" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
