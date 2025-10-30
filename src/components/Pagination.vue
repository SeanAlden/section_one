<template>
  <div class="flex items-center justify-center gap-1.5 p-4">
    <button
      :disabled="currentPage <= 1"
      @click="go(currentPage - 1)"
      class="px-4 py-2 text-base font-medium text-blue-500 transition-colors duration-200 ease-in-out bg-white border border-blue-500 rounded-md shadow-sm hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Prev
    </button>

    <template v-for="(p, idx) in pageList" :key="`pg-${idx}-${p}`">
      <button
        v-if="p !== '...'"
        @click="go(p)"
        :class="[
          'w-10 h-10 flex items-center justify-center text-base font-medium rounded-md shadow-sm border transition-colors duration-200 ease-in-out',
          p === currentPage
            ? 'bg-blue-500 text-white border-blue-500 cursor-default'
            : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
        ]"
      >
        {{ p }}
      </button>

      <span v-else class="flex items-center justify-center w-10 h-10 text-base text-gray-500">
        ...
      </span>
    </template>

    <button
      :disabled="currentPage >= totalPages"
      @click="go(currentPage + 1)"
      class="px-4 py-2 text-base font-medium text-blue-500 transition-colors duration-200 ease-in-out bg-white border border-blue-500 rounded-md shadow-sm hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:current-page'],
  computed: {
    pageList() {
      const total = this.totalPages
      const current = this.currentPage

      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1)
      }

      if (current <= 4) {
        return [1, 2, 3, 4, 5, '...', total]
      }

      if (current === 5) {
        return [1, '...', 4, 5, 6, '...', total]
      }

      if (current >= total - 3) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
      }

      return [1, '...', current - 1, current, current + 1, '...', total]
    },
  },
  methods: {
    go(page) {
      if (page === '...') return
      const p = Math.max(1, Math.min(this.totalPages, page))
      this.$emit('update:current-page', p)
    },
  },
}
</script>

<style scoped>
</style>