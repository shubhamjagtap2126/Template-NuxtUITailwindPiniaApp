<script setup>
import { ref, reactive } from 'vue'
// useHead({ title: 'Home' })
// const count = ref(0)
// defineProps({ msg: String })
// const signFormValues = reactive({ })
// const onSubmit = () => { console.log('Submit'); }
// const onReset = () => { console.log('onRecet'); }
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

</script>

<template>
  <client-only>
    <div
      class="flex items-center justify-center w-12 h-12 dark:text-primary bg-gray-600 text-white border-2 border-gray-200 rounded-full">
      <Icon @click="toggleTheme" :name="$colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'" size="24" />
    </div>
  </client-only>
</template>


<style scoped></style>
