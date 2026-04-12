<script setup>
const { $googleTranslate } = useNuxtApp()
const { activeLanguage, setLanguage, isLoaded } = $googleTranslate

const languages = [
  { label: 'English', value: 'en', icon: 'i-circle-flags:en' },
  { label: 'हिन्दी', value: 'hi', icon: 'i-circle-flags:hi' },
  { label: 'मराठी', value: 'mr', icon: 'i-circle-flags:in' }
]

const currentLang = computed({
  get: () => languages.find(l => l.value === activeLanguage.value) || languages[0],
  set: (val) => setLanguage(val.value)
})

// onchange of language refresh the page
watch(() => currentLang.value, (newVal) => {
  console.log(newVal)
  if (activeLanguage.value !== newVal) {
    window.location.reload()
  }
})
</script>

<template>
  <div class="notranslate">
    <USelectMenu v-model="currentLang" :items="languages" :loading="!isLoaded" color="neutral" variant="subtle"
      :popper="{ placement: 'bottom-end' }" :ui="{
        trigger: 'clay-card !py-1.5 !px-3 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-none bg-white/10 dark:bg-black/20 backdrop-blur-md',
        leadingIcon: 'text-primary-500'
      }">
      <template #leading>
        <UIcon :name="currentLang.icon" class="w-5 h-5" />
      </template>

      <template #label>
        <span class="text-sm font-bold truncate">{{ currentLang.label }}</span>
      </template>

      <template #option="{ option: item }">
        <UIcon :name="item.icon" class="w-5 h-5" />
        <span>{{ item.label }}</span>
      </template>
    </USelectMenu>
  </div>
</template>

<style scoped>
/* Any additional claymorphism tweaks if needed */
</style>
