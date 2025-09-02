# 🚀 Modern Web App Template

> A cutting-edge, responsive web application template built with Nuxt 4, TailwindCSS, NuxtUI, and modern web technologies.

![Nuxt](https://img.shields.io/badge/Nuxt-4.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

## ✨ Features

### 🎨 **Beautiful Design**

- 🌟 Modern glass-morphism UI with gradient effects
- 🎭 Smooth GSAP animations and transitions
- 📱 Fully responsive design (Mobile-first approach)
- 🌙 Dark/Light mode support with seamless transitions
- ✨ Interactive hover effects and micro-interactions

### 🚀 **Performance & Modern Architecture**

- ⚡ Nuxt 4 with SSR/SSG capabilities
- 🔥 Optimized for Core Web Vitals
- 📦 Bundle optimization and code splitting
- 💾 Smart caching strategies
- 🛡️ TypeScript support throughout

### 🧩 **Advanced Components**

- 📝 **Dynamic Form System**: JSON-configurable forms with validation
- 🎠 **Swiper Integration**: Beautiful carousels and sliders
- 📊 **Animation Library**: GSAP-powered animations
- 🎯 **NuxtUI Components**: Pre-built, accessible UI components
- 📱 **PWA Support**: Offline capabilities and app installation

### 🛠️ **Developer Experience**

- 🔧 Hot Module Replacement (HMR)
- 📏 ESLint configuration
- 🎨 Tailwind CSS with custom utilities
- 📂 Organized file structure
- 🧪 Ready for testing integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Template-NuxtUITailwindPiniaApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5100
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Generate static site
npm run generate
```

## 🎨 Customization

### Theme Configuration

Customize colors, fonts, and spacing in `client/assets/main.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  /* Add your custom variables */
}
```

### Dynamic Form Usage

Create forms using JSON configuration:

```vue
<template>
  <DynamicForm :form-fields="contactFields" submit-label="Send Message" :show-submit-button="true" @submit="handleFormSubmit" />
</template>

<script setup>
const contactFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
    icon: 'i-lucide-mail',
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    rows: 4,
    required: true,
  },
];
</script>
```

### Animation Integration

Use GSAP animations easily:

```vue
<script setup>
const { fadeInUp, animateCards } = useGsapAnimations();

onMounted(() => {
  fadeInUp('.hero-content');
  animateCards('.feature-card');
});
</script>
```

## 🧩 Components

### DynamicForm

Advanced form component with:

- JSON field configuration
- Built-in validation
- Multiple input types
- File upload support
- Animations

### Swiper Integration

Pre-configured carousels for:

- Hero sections
- Testimonials
- Product galleries
- Team members

### GSAP Animations

Ready-to-use animations:

- Fade in effects
- Counter animations
- Scroll-triggered animations
- Text reveal effects

## 📱 PWA Features

- 📲 **App Installation**: Native app-like installation
- 🔄 **Offline Support**: Works without internet connection
- 🔔 **Background Sync**: Updates when connection is restored
- 📱 **Responsive**: Adapts to any screen size
- ⚡ **Fast Loading**: Optimized performance

## 🛠️ Tech Stack

| Technology      | Purpose              | Version |
| --------------- | -------------------- | ------- |
| **Nuxt**        | Vue.js Framework     | 4.0+    |
| **Vue**         | Frontend Framework   | 3.5+    |
| **TailwindCSS** | Utility-first CSS    | 4.1+    |
| **NuxtUI**      | UI Component Library | 3.3+    |
| **Pinia**       | State Management     | Latest  |
| **GSAP**        | Animation Library    | 3.13+   |
| **Swiper**      | Touch Slider         | 11.2+   |
| **TypeScript**  | Type Safety          | Latest  |
| **Vite**        | Build Tool           | Latest  |

## 🎯 Use Cases

Perfect for:

- 🏢 **Business Websites**: Professional landing pages
- 💼 **Portfolio Sites**: Showcase your work
- 📱 **Progressive Web Apps**: App-like experiences
- 🛍️ **E-commerce**: Product showcases
- 📝 **Blogs**: Content-rich websites
- 🎨 **Creative Agencies**: Visual portfolios

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Optional: Secure Local Storage
SECURELS_SECRET=your-secret-key

# Optional: Script URLs
SCRIPT_PROD_URL=your-production-script-url
```

### Deployment

The template is configured for multiple deployment platforms:

- **Netlify**: Default configuration
- **Vercel**: Change preset in `nuxt.config.ts`
- **Node.js Server**: Change preset to `node-server`

## 📚 Public APIs Integration

Ready-to-integrate APIs for rapid development:

### Popular APIs

- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/
- **Random User Generator**: https://randomuser.me/
- **Unsplash**: https://unsplash.com/developers
- **OpenWeatherMap**: https://openweathermap.org/
- **REST Countries**: https://restcountries.com/
- **GitHub API**: https://docs.github.com/en/rest

### API Categories

- 🌐 **Data & Content**: JSONPlaceholder, Open Library
- 🖼️ **Images & Media**: Unsplash, Pexels
- 🌍 **Location & Maps**: REST Countries, IP Geolocation
- 🎮 **Entertainment**: Jokes API, Cat Facts
- 💰 **Finance**: CoinGecko, Exchange Rates
- 🚀 **NASA & Space**: NASA APIs
- 📱 **Social**: GitHub, Reddit APIs

[View Complete API List →](https://github.com/public-apis/public-apis)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nuxt Team** for the amazing framework
- **Tailwind Labs** for the utility-first CSS framework
- **NuxtUI Team** for the beautiful component library
- **GSAP** for the powerful animation library
- **Swiper** for the touch slider functionality
