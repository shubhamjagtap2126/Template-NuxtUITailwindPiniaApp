import secureLs from 'secure-ls';
const { SECURELS_SECRET } = useRuntimeConfig().public;

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(10);
    const doubleCount = computed(() => count.value * 2);
    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };
    return { count, doubleCount, increment, decrement };
  },
  {
    persist: {
      storage: {
        getItem: (key) => {
          return new secureLs({ encodingType: 'aes', isCompression: true, encryptionSecret: SECURELS_SECRET }).get(key);
        },
        setItem: (key, value) => {
          return new secureLs({ encodingType: 'aes', isCompression: true, encryptionSecret: SECURELS_SECRET }).set(key, value);
        },
        removeItem: (key) => {
          return new secureLs({ encodingType: 'aes', isCompression: true, encryptionSecret: SECURELS_SECRET }).remove(key);
        },
      },
    },
  }
);
