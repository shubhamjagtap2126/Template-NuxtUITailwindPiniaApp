<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';


useHead({
  title: 'Contact Us - Get in Touch',
  meta: [
    { name: 'description', content: "Get in touch with our team. We'd love to hear from you and help with your project needs." },
    { property: 'og:title', content: 'Contact Us - Get in Touch' },
    { property: 'og:description', content: "Get in touch with our team. We'd love to hear from you." },
  ],
});

// Toast for notifications
const toast = useToast();

// Form data
const formData = reactive({});
const isSubmitting = ref(false);

// Contact form fields
const contactFields = [
  {
    name: "contact",
    label: "Contact Number",
    type: "tel",
    regex: "^[6-9]{1}[0-9]{9}$",
    errorMessage: "Valid 10-digit number",
    required: true,
    clearable: true,
    mask: "##########",
    filled: true,
    prependIcon: "line-md:phone-call-loop",
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    regex: "^[a-zA-Z]{3,}$",
    errorMessage: "Min 3 English characters",
    required: true,
    clearable: true,
    filled: true,
    prependIcon: "material-symbols:person",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    regex: "^[a-zA-Z]{3,}$",
    errorMessage: "Min 3 English characters",
    required: true,
    clearable: true,
    filled: true,
    prependIcon: "material-symbols:person",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    errorMessage: "Valid email required",
    required: true,
    clearable: true,
    filled: true,
    prependIcon: "line-md:email-check-filled",
  },
  {
    name: "password",
    label: "Create new Password",
    type: "password",
    regex: ".{6,}",
    errorMessage: "Minimum 6 characters",
    required: true,
    clearable: true,
    filled: true,
    prependIcon: "mdi:password-outline",
  },
];

// Contact info
const contactInfo = [
  {
    icon: 'i-lucide-mail',
    title: 'Email Us',
    value: 'hello@ourcompany.com',
    description: 'Send us an email anytime',
    color: 'blue',
  },
  {
    icon: 'i-lucide-phone',
    title: 'Call Us',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 6pm',
    color: 'success',
  },
  {
    icon: 'i-lucide-map-pin',
    title: 'Visit Us',
    value: '123 Tech Street, San Francisco, CA',
    description: 'Come say hello at our office',
    color: 'purple',
  },
  {
    icon: 'i-lucide-clock',
    title: 'Working Hours',
    value: 'Mon-Fri: 8am-6pm',
    description: "We're here to help",
    color: 'orange',
  },
];

// FAQ data
const faqs = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
  },
  {
    question: 'Do you offer custom development services?',
    answer: 'Yes! We provide custom development services for businesses of all sizes. Contact us to discuss your specific requirements.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in modern web technologies including Vue.js, Nuxt, React, Node.js, TypeScript, and various cloud platforms.',
  },
  {
    question: 'Can you help with existing projects?',
    answer: 'Absolutely! We can help optimize, maintain, or add new features to your existing web applications.',
  },
];

// Methods
const handleFormSubmit = async ({ data }) => {
  isSubmitting.value = true;

  try {
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.add({
      title: 'Message Sent!',
      description: `Thank you ${data.name}! We'll get back to you soon.`,
      color: 'success',
      icon: 'i-lucide-check-circle',
    });

    // Reset form
    Object.keys(formData).forEach((key) => {
      formData[key] = '';
    });
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      color: 'error',
      icon: 'i-lucide-alert-circle',
    });
  } finally {
    isSubmitting.value = false;
  }
};

const copyToClipboard = (text, type) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({
      title: 'Copied!',
      description: `${type} copied to clipboard`,
      color: 'info',
      icon: 'i-lucide-copy',
    });
  });
};

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    fadeInUp('.hero-content', 0.2);
    fadeInUp('.contact-card', 0.3);
    animateFormFields('.form-container');
  }, 100);
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="hero-content text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">Get In Touch</h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.</p>
        </div>
      </div>
    </section>

    <!-- Contact Info Cards -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div v-for="(info, index) in contactInfo" :key="index"
            class="contact-card glass-card p-6 text-center hover:scale-105 transition-all duration-300 group cursor-pointer"
            @click="copyToClipboard(info.value, info.title)">
            <div class="mb-4">
              <div
                :class="`w-16 h-16 mx-auto rounded-2xl bg-${info.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`">
                <UIcon :name="info.icon" :class="`w-8 h-8 text-${info.color}-500`" />
              </div>
            </div>
            <h3 class="text-lg font-bold mb-2">{{ info.title }}</h3>
            <p class="text-gray-900 dark:text-white font-medium mb-1">{{ info.value }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ info.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <!-- Contact Form -->
          <div class="form-container">
            <div class="glass-card p-8">
              <h2 class="text-3xl font-bold mb-6 gradient-text">Send us a Message</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">Fill out the form below and we'll get back to you within
                24 hours.</p>

              <DynamicForm v-model="formData" :form-fields="contactFields" submit-label="Send Message"
                submit-icon="i-lucide-send" :submit-button="true" :notify="true" :reset-button="false"
                @submit="handleFormSubmit" class="space-y-6" />
            </div>
          </div>

          <!-- Map and Additional Info -->
          <div class="space-y-8">
            <!-- Interactive Map -->
            <div class="glass-card p-8">
              <h3 class="text-2xl font-bold mb-6">Find Us</h3>
              <div
                class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <!-- Placeholder for map - you can integrate Google Maps, Mapbox, etc. -->
                <div class="text-center">
                  <UIcon name="i-lucide-map-pin" class="w-16 h-16 text-gray-400 mb-4" />
                  <p class="text-gray-500">Interactive Map</p>
                  <p class="text-sm text-gray-400">123 Tech Street, San Francisco, CA</p>
                </div>

                <!-- Overlay with address -->
                <div class="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                  <p class="font-medium text-sm">Our Office</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">123 Tech Street<br />San Francisco, CA 94105</p>
                </div>
              </div>
              <UButton variant="outline" size="sm" class="w-full"
                @click="copyToClipboard('123 Tech Street, San Francisco, CA 94105', 'Address')">
                <template #leading>
                  <UIcon name="i-lucide-copy" class="w-4 h-4" />
                </template>
                Copy Address
              </UButton>
            </div>

            <!-- Office Hours -->
            <div class="glass-card p-8">
              <h3 class="text-2xl font-bold mb-6">Office Hours</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                  <span class="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Saturday</span>
                  <span class="font-medium">9:00 AM - 2:00 PM</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Sunday</span>
                  <span class="font-medium">Closed</span>
                </div>
              </div>
              <div class="flex items-center gap-2 text-green-600">
                <UIcon name="i-lucide-clock" class="w-4 h-4" />
                <span class="text-sm font-medium">Currently Open</span>
              </div>
            </div>

            <!-- Social Media -->
            <div class="glass-card p-8">
              <h3 class="text-2xl font-bold mb-6">Follow Us</h3>
              <div class="grid grid-cols-2 gap-4">
                <UButton variant="outline" size="lg" class="justify-start" to="https://twitter.com" target="_blank">
                  <template #leading>
                    <UIcon name="i-lucide-twitter" class="w-5 h-5" />
                  </template>
                  Twitter
                </UButton>
                <UButton variant="outline" size="lg" class="justify-start" to="https://linkedin.com" target="_blank">
                  <template #leading>
                    <UIcon name="i-lucide-linkedin" class="w-5 h-5" />
                  </template>
                  LinkedIn
                </UButton>
                <UButton variant="outline" size="lg" class="justify-start" to="https://github.com" target="_blank">
                  <template #leading>
                    <UIcon name="i-lucide-github" class="w-5 h-5" />
                  </template>
                  GitHub
                </UButton>
                <UButton variant="outline" size="lg" class="justify-start" to="https://discord.com" target="_blank">
                  <template #leading>
                    <UIcon name="i-lucide-message-circle" class="w-5 h-5" />
                  </template>
                  Discord
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Quick answers to common questions</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <UAccordion :items="faqs.map((faq, index) => ({
            label: faq.question,
            content: faq.answer,
            defaultOpen: index === 0,
          }))
            " :ui="{
              wrapper: 'space-y-3',
              item: {
                base: 'glass-card',
                padding: 'p-6',
              },
            }" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p class="text-xl mb-8 opacity-90">Let's discuss how we can help bring your ideas to life</p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="xl" color="white" variant="solid"
            class="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
            @click="copyToClipboard('hello@ourcompany.com', 'Email')">
            <template #leading>
              <UIcon name="i-lucide-mail" class="w-5 h-5" />
            </template>
            Email Us Now
          </UButton>

          <UButton size="xl" color="white" variant="outline"
            class="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
            @click="copyToClipboard('+1 (555) 123-4567', 'Phone')">
            <template #leading>
              <UIcon name="i-lucide-phone" class="w-5 h-5" />
            </template>
            Call Us
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
