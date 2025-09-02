<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGsapAnimations } from '~/composables/useGsapAnimations';
import { useSwiper } from '~/composables/useSwiper';

useHead({
  title: 'About Us - Our Story & Vision',
  meta: [
    { name: 'description', content: 'Learn about our passionate team, our mission to revolutionize web development, and the story behind our innovative platform.' },
    { property: 'og:title', content: 'About Us - Our Story & Vision' },
    { property: 'og:description', content: 'Learn about our passionate team and mission to revolutionize web development.' },
  ],
});

// Animation composables
const { fadeInUp, animateCards, animateCounter, textReveal, cleanup } = useGsapAnimations();

// Swiper configuration
const { Swiper, SwiperSlide, teamConfig } = useSwiper();

// Data
const stats = [
  { number: 50000, label: 'Lines of Code', suffix: '+' },
  { number: 3, label: 'Years Experience', suffix: '+' },
  { number: 100, label: 'Projects Delivered', suffix: '+' },
  { number: 24, label: 'Countries Served', suffix: '+' },
];

const values = [
  {
    icon: 'i-lucide-target',
    title: 'Innovation',
    description: "We push the boundaries of what's possible in web development, constantly exploring new technologies and methodologies.",
    color: 'blue',
  },
  {
    icon: 'i-lucide-heart',
    title: 'Quality',
    description: "Excellence is not a skill, it's an attitude. We deliver nothing but the highest quality in every project.",
    color: 'red',
  },
  {
    icon: 'i-lucide-users',
    title: 'Collaboration',
    description: 'Great things are never done by one person. We believe in the power of teamwork and open communication.',
    color: 'green',
  },
  {
    icon: 'i-lucide-zap',
    title: 'Performance',
    description: 'Speed and efficiency matter. We optimize every aspect of our solutions for maximum performance.',
    color: 'yellow',
  },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'Lead Developer',
    bio: 'Full-stack wizard with 8+ years of experience in modern web technologies.',
    avatar: 'https://i.pravatar.cc/300?img=1',
    skills: ['Vue.js', 'Nuxt', 'Node.js', 'TypeScript'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    bio: 'Creative designer passionate about user-centered design and beautiful interfaces.',
    avatar: 'https://i.pravatar.cc/300?img=2',
    skills: ['Figma', 'Adobe XD', 'Tailwind CSS', 'Design Systems'],
    social: {
      dribbble: 'https://dribbble.com',
      linkedin: 'https://linkedin.com',
      behance: 'https://behance.net',
    },
  },
  {
    name: 'Mike Johnson',
    role: 'DevOps Engineer',
    bio: 'Infrastructure expert ensuring scalable, secure, and reliable deployments.',
    avatar: 'https://i.pravatar.cc/300?img=3',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'Emma Davis',
    role: 'Product Manager',
    bio: 'Strategic thinker who bridges the gap between user needs and technical solutions.',
    avatar: 'https://i.pravatar.cc/300?img=4',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

const timeline = [
  {
    year: '2021',
    title: 'The Beginning',
    description: 'Started as a small team with a big vision to simplify web development.',
    icon: 'i-lucide-lightbulb',
  },
  {
    year: '2022',
    title: 'First Major Release',
    description: 'Launched our first comprehensive template with Vue 3 and Nuxt 3 support.',
    icon: 'i-lucide-rocket',
  },
  {
    year: '2023',
    title: 'Community Growth',
    description: 'Reached 10,000+ developers using our templates and contributing to the ecosystem.',
    icon: 'i-lucide-users',
  },
  {
    year: '2024',
    title: 'Innovation Era',
    description: 'Introduced Nuxt 4 support, advanced PWA features, and cutting-edge performance optimizations.',
    icon: 'i-lucide-star',
  },
];

// Lifecycle
onMounted(() => {
  // Animate elements on scroll
  setTimeout(() => {
    fadeInUp('.hero-content', 0.2);
    fadeInUp('.mission-content', 0.3);
    animateCards('.value-card');
    animateCards('.timeline-item');

    // Text reveal for main heading
    const mainHeading = document.querySelector('.main-heading');
    if (mainHeading) {
      textReveal(mainHeading);
    }

    // Animate stats
    stats.forEach((stat, index) => {
      const element = document.querySelector(`[data-stat="${index}"]`);
      if (element) {
        animateCounter(element, stat.number, 2);
      }
    });
  }, 100);
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="hero-content text-center max-w-4xl mx-auto">
          <h1 class="main-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">About Our Vision</h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We're a passionate team of developers, designers, and innovators dedicated to revolutionizing the way web applications are built.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <UBadge color="blue" variant="soft" size="lg">Innovation First</UBadge>
            <UBadge color="purple" variant="soft" size="lg">Quality Driven</UBadge>
            <UBadge color="green" variant="soft" size="lg">Community Focused</UBadge>
          </div>
        </div>
      </div>

      <!-- Floating decoration -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl floating-animation"></div>
      <div class="absolute bottom-20 right-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl floating-animation"></div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center">
            <div class="mb-2">
              <span :data-stat="index" class="text-3xl md:text-4xl font-bold gradient-text block">0</span>
              <span class="text-lg font-semibold text-gray-600 dark:text-gray-300">{{ stat.suffix }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="mission-content">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We believe that building modern web applications shouldn't be complicated. Our mission is to provide developers with powerful, easy-to-use tools and templates that accelerate development
              while maintaining the highest standards of performance and design.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              From startups to enterprise companies, we're helping teams ship faster, scale better, and create exceptional user experiences with our cutting-edge technology stack.
            </p>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-500" />
                <span class="text-gray-700 dark:text-gray-300">Modern Development Stack</span>
              </div>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-500" />
                <span class="text-gray-700 dark:text-gray-300">Performance Optimized</span>
              </div>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-500" />
                <span class="text-gray-700 dark:text-gray-300">Developer Experience Focused</span>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="glass-card p-8 text-center">
              <NuxtImg
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80"
                alt="Team collaboration"
                class="w-full h-64 object-cover rounded-lg mb-6"
                :width="600"
                :height="400"
              />
              <h3 class="text-xl font-bold mb-2">Building the Future</h3>
              <p class="text-gray-600 dark:text-gray-400">Together, we create amazing digital experiences</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Core Values</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">The principles that guide everything we do</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(value, index) in values" :key="index" class="value-card glass-card p-8 hover:scale-105 transition-all duration-300 group">
            <div class="mb-6">
              <div :class="`w-16 h-16 mx-auto rounded-2xl bg-${value.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`">
                <UIcon :name="value.icon" :class="`w-8 h-8 text-${value.color}-500`" />
              </div>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Key milestones in our evolution</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform md:-translate-x-0.5"></div>

            <div v-for="(item, index) in timeline" :key="index" class="timeline-item relative mb-12">
              <div :class="['flex items-center gap-8', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']">
                <!-- Timeline dot -->
                <div class="absolute left-4 md:left-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-500 transform md:-translate-x-1/2 flex items-center justify-center z-10">
                  <UIcon :name="item.icon" class="w-4 h-4 text-blue-500" />
                </div>

                <!-- Content -->
                <div class="ml-16 md:ml-0 md:w-1/2">
                  <div class="glass-card p-6">
                    <div class="text-2xl font-bold text-blue-500 mb-2">{{ item.year }}</div>
                    <h3 class="text-xl font-bold mb-3">{{ item.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 gradient-text">Meet Our Team</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">The talented people behind our success</p>
        </div>

        <div class="max-w-6xl mx-auto">
          <Swiper v-bind="teamConfig" class="team-swiper">
            <SwiperSlide v-for="(member, index) in team" :key="index">
              <div class="glass-card p-6 mx-4 text-center group hover:scale-105 transition-all duration-300">
                <div class="mb-6">
                  <NuxtImg
                    :src="member.avatar"
                    :alt="member.name"
                    class="w-24 h-24 rounded-full object-cover mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    :width="96"
                    :height="96"
                  />
                  <h3 class="text-xl font-bold mb-1">{{ member.name }}</h3>
                  <p class="text-blue-500 font-medium mb-3">{{ member.role }}</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{{ member.bio }}</p>
                </div>

                <div class="mb-4">
                  <div class="flex flex-wrap justify-center gap-2">
                    <UBadge v-for="skill in member.skills" :key="skill" variant="soft" size="sm">
                      {{ skill }}
                    </UBadge>
                  </div>
                </div>

                <div class="flex justify-center gap-3">
                  <UButton v-for="(url, platform) in member.social" :key="platform" :to="url" target="_blank" variant="ghost" size="sm" :icon="`i-lucide-${platform}`" />
                </div>
              </div>
            </SwiperSlide>

            <!-- Navigation -->
            <div class="team-next swiper-button-next"></div>
            <div class="team-prev swiper-button-prev"></div>
            <div class="team-pagination swiper-pagination"></div>
          </Swiper>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Journey?</h2>
        <p class="text-xl mb-8 opacity-90">Let's build something amazing together</p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact">
            <UButton size="xl" color="white" variant="solid" class="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform">
              <template #leading>
                <UIcon name="i-lucide-mail" class="w-5 h-5" />
              </template>
              Get In Touch
            </UButton>
          </NuxtLink>

          <NuxtLink to="/">
            <UButton size="xl" color="white" variant="outline" class="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform">
              <template #leading>
                <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
              </template>
              Back to Home
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
