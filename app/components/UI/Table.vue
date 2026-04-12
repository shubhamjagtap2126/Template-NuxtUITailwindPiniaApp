<script setup>
import { getPaginationRowModel } from '@tanstack/vue-table'

const { } = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  addBtnText: { type: String, default: 'Add' },
  addBtnIcon: { type: String, default: 'i-lucide-plus' },
  addBtnColor: { type: String, default: 'primary' },
  pageSize: { type: Number, default: 50 },
})

const table = useTemplateRef('table')
const sorting = ref([])

const columnVisibility = ref({
  content: false
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 50
})

const globalFilter = ref('')


const activities = ref([{
  _id: 'E2026W01_1',
  engTitle: 'Starry Night Meditation',
  weekId: 'Week 1',
  category: 'Audio',
  likes: 432,
  bookmarks: 89
}, {
  engTitle: 'Sensory Sand Play',
  weekId: 'Week 2',
  category: 'Physical',
  likes: 215,
  bookmarks: 45
}, {
  engTitle: 'Chakra Balancing for Kids',
  weekId: 'Week 3',
  category: 'Video',
  likes: 671,
  bookmarks: 102
}])


</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white">{{ title }}</h2>
        <p class="text-slate-500 font-medium mt-1">{{ description }}</p>
      </div>
      <div class="flex gap-2">
        <UInput v-model="globalFilter" placeholder="Filter..." size="lg" />

        <UDropdownMenu :items="table?.tableApi
          ?.getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => ({
            label: column.id,
            type: 'checkbox',
            checked: column.getIsVisible(),
            onUpdateChecked(checked) {
              table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
            },
            onSelect(e) {
              e.preventDefault()
            }
          }))
          " :content="{ align: 'end' }">
          <UButton label="Columns" size="lg" color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down" />
        </UDropdownMenu>

        <UButton :icon="addBtnIcon" :color="addBtnColor" size="lg"
          class="rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-transform">{{ addBtnText }}</UButton>
      </div>
    </div>

    <!-- Table -->
    <div
      class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xs overflow-hidden">
      <UTable ref="table" :data="data" v-model:sorting="sorting" v-model:global-filter="globalFilter"
        v-model:column-visibility="columnVisibility" v-model:pagination="pagination" :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }">
        <slot name="actions-cell" :row="row"></slot>
      </UTable>


      <div class="flex justify-between border-t border-default py-4 px-4">
        <div class="px-4 py-3.5 text-sm text-muted">
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
        </div>
        <UPagination :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
      </div>
    </div>
  </div>
</template>
