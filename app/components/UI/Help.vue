<template>
  <div>
    <div class="fixed bottom-10 right-10 z-50">
      <UDropdownMenu :items="items" :popper="{ placement: 'top-end' }">
        <UButton color="primary" variant="solid" icon="fluent:info-sparkle-32-regular" size="xl" square rounded />

        <template #chnage-theme-slot="{ item }">
          <component :is="ThemeToggleComponent" />
        </template>
        <template #support-slot="{ item }">
          <component :is="SupportComponent" />
        </template>
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
const ThemeToggleComponent = resolveComponent('ThemeToggle')
const SupportComponent = resolveComponent('UISupport')
const items = [
  [{
    label: 'Change Theme',
    icon: 'i-heroicons-pencil-square-20-solid',
    slot: 'chnage-theme-slot',
  },
  {
    label: 'Support',
    icon: 'i-heroicons-pencil-square-20-solid',
    slot: 'support-slot',
  }],
  [{
    label: 'Sublist Parent',
    icon: 'i-heroicons-folder-20-solid',
    children: [
      { label: 'Sub-item 1', icon: 'i-heroicons-document-20-solid' },
      { label: 'Sub-item 2', icon: 'i-heroicons-document-20-solid' }
    ]
  }]
]
</script>
