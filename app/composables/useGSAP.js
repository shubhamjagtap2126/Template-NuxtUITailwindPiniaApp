import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapAnimations = () => {
  // Hero section animations
  const animateHero = (heroRef, titleRef, subtitleRef, ctaRef) => {
    if (!process.client) return;

    const tl = gsap.timeline();

    // Initial state
    gsap.set([titleRef, subtitleRef, ctaRef], {
      opacity: 0,
      y: 50,
    });

    tl.to(titleRef, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .to(
        subtitleRef,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        ctaRef,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );

    return tl;
  };

  // Stagger animation for cards/features
  const animateCards = (cardsSelector) => {
    if (!process.client) return;

    gsap.fromTo(
      cardsSelector,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsSelector,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  // Fade in animation with scroll trigger
  const fadeInUp = (element, delay = 0) => {
    if (!process.client) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  // Parallax effect
  const parallaxEffect = (element, speed = 0.5) => {
    if (!process.client) return;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

  // Counter animation
  const animateCounter = (element, endValue, duration = 2) => {
    if (!process.client) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value);
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  };

  // Floating animation
  const floatingAnimation = (element) => {
    if (!process.client) return;

    gsap.to(element, {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  };

  // Pulse glow effect
  const pulseGlow = (element) => {
    if (!process.client) return;

    gsap.to(element, {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
      duration: 1.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });
  };

  // Text reveal animation
  const textReveal = (element) => {
    if (!process.client) return;

    const text = element.textContent;
    element.innerHTML = text
      .split('')
      .map((char) => `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = element.querySelectorAll('span');

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  };

  // Form field animation
  const animateFormFields = (fieldsSelector) => {
    if (!process.client) return;

    gsap.fromTo(
      fieldsSelector,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  };

  // Button hover animation
  const buttonHoverEffect = (button) => {
    if (!process.client) return;

    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };

  // Page transition
  const pageTransition = () => {
    if (!process.client) return;

    const tl = gsap.timeline();

    tl.to('.page-content', {
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: 'power2.in',
    })
      .set('.page-content', { y: -30 })
      .to('.page-content', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

    return tl;
  };

  // Cleanup function
  const cleanup = () => {
    if (process.client && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  };

  return {
    animateHero,
    animateCards,
    fadeInUp,
    parallaxEffect,
    animateCounter,
    floatingAnimation,
    pulseGlow,
    textReveal,
    animateFormFields,
    buttonHoverEffect,
    pageTransition,
    cleanup,
  };
};
