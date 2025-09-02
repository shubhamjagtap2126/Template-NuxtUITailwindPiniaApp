import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

export const useSwiper = () => {
  // Default configuration for hero carousel
  const heroConfig = {
    modules: [Navigation, Pagination, Autoplay, EffectFade, Parallax],
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    parallax: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  };

  // Configuration for testimonials carousel
  const testimonialsConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.testimonials-next',
      prevEl: '.testimonials-prev',
    },
    pagination: {
      el: '.testimonials-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };

  // Configuration for features carousel
  const featuresConfig = {
    modules: [Navigation, Pagination],
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: {
      nextEl: '.features-next',
      prevEl: '.features-prev',
    },
    pagination: {
      el: '.features-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  // Configuration for gallery
  const galleryConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 16,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.gallery-next',
      prevEl: '.gallery-prev',
    },
    pagination: {
      el: '.gallery-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
    },
  };

  // Team carousel configuration
  const teamConfig = {
    modules: [Navigation, Pagination],
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: {
      nextEl: '.team-next',
      prevEl: '.team-prev',
    },
    pagination: {
      el: '.team-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  return {
    Swiper,
    SwiperSlide,
    heroConfig,
    testimonialsConfig,
    featuresConfig,
    galleryConfig,
    teamConfig,
  };
};
