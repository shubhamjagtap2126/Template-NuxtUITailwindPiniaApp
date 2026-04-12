<script setup>
import { ref, reactive } from 'vue'
// useHead({ title: 'Home' })
// const count = ref(0)
// defineProps({ msg: String })
// const signFormValues = reactive({ })
// const onSubmit = () => { console.log('Submit'); }
// const onReset = () => { console.log('onRecet'); }

const phoneChips = [
  { id: 1, icon: '🎉', bold: 'Suggest fun activities', rest: 'for the kids this weekend.' },
  { id: 2, icon: '😴', bold: 'Create a sleep plan', rest: "for Emmi's 4 mo regression." },
  { id: 3, icon: '🦷', bold: 'Help me find', rest: 'doctor-recommended teethers.' },
  { id: 4, icon: '🧠', bold: 'Brainstorm ways', rest: 'to help Max with his big feelings.' },
]
</script>

<template>
  <!-- Phone mockup -->
  <div class="relative">
    <NuxtImg loading="lazy" src="/assets/mobile.svg" alt="Mobile" class="absolute" />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-50 flex flex-col justify-between p-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-base">⏳</span>
        <span class="text-xs font-bold text-gray-900">Talk to us</span>
        <span class="text-xs text-gray-400 cursor-pointer">✕</span>
      </div>
      <div
        class="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-yellow-300 mx-auto mb-1.5 flex items-center justify-center text-lg">
        🌟</div>
      <p class="text-[9px] text-center text-gray-500 leading-relaxed mb-2">
        Hey Rebecca!<br />What can I do to help you today?<br />Here's a few ideas for you:
      </p>

      <div class="flex flex-col gap-2">
        <!-- Suggestion chips -->
        <div class="grid grid-cols-2 gap-1.5 mb-2">
          <div v-for="chip in phoneChips" :key="chip.id"
            class="bg-white border border-gray-200 rounded-xl p-1.5 text-[8.5px] text-gray-600 leading-relaxed">
            <span>{{ chip.icon }}</span>
            <b class="text-gray-900">{{ chip.bold }}</b>
            {{ chip.rest }}
          </div>
        </div>
        <!-- Input row -->
        <div
          class="mt-auto bg-white border border-gray-200 rounded-2xl px-3 py-1.5 flex items-center justify-between mb-1.5">
          <span class="text-[8px] text-gray-400">Talk to us, what's going on?</span>
          <svg class="w-3 h-3 fill-gray-400" viewBox="0 0 24 24">
            <path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-7 11a7 7 0 0 0 14 0h-2a5 5 0 0 1-10 0H5z" />
          </svg>
        </div>
        <!-- Keyboard rows -->
        <div class="grid grid-cols-10 gap-0.5">
          <div v-for="k in 'qwertyuiopasdfghjkl⏎'.split('')" :key="k"
            class="bg-white rounded text-[7px] h-4 flex items-center justify-center font-medium text-gray-900">{{ k }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped></style>
