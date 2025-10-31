<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-full bg-gray-200 shadow-lg border-r z-40 flex flex-col',
      'transition-all duration-300 ease-in-out',
      'w-64', // Lebar dasar untuk laci mobile

      // --- PERBAIKAN LOGIKA KELAS ---
      
      // Logika Mobile (<lg): Menggunakan translate
      // Jika 'isCollapsed', sembunyikan. Jika tidak, tampilkan.
      isCollapsed ? '-translate-x-full' : 'translate-x-0',

      // Logika Desktop (lg+): Menggunakan width DAN membatalkan translate
      // Di desktop, 'translate' *selalu* 0.
      'lg:translate-x-0',
      // Di desktop, 'width' diatur oleh 'isCollapsed'.
      isCollapsed ? 'lg:w-16' : 'lg:w-64'
      
      // --- AKHIR PERBAIKAN ---
    ]"
    aria-label="Sidebar"
  >
    <div class="flex h-16 items-center justify-between border-b px-4">
      <div v-if="!isCollapsed" class="flex items-center space-x-2">
        <img :src="storeLogo" alt="Store Logo" class="h-8 w-8 object-contain" />
        <span class="text-lg font-bold">My Store</span>
      </div>

      <div v-else class="hidden w-full items-center justify-center lg:flex">
        <button
          class="rounded-md p-2 hover:bg-gray-100 focus:outline-none"
          @click="emit('toggle-sidebar')"
          title="Open sidebar"
        >
          <img :src="toggleIcon" alt="Open sidebar" class="h-6 w-6 object-contain" />
        </button>
      </div>

      <button
        v-if="!isCollapsed"
        class="rounded-md p-2 hover:bg-gray-100 focus:outline-none"
        @click="emit('toggle-sidebar')"
        :aria-expanded="!isCollapsed"
        title="Close sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto px-2 py-4">
      <ul class="space-y-1">
        <li>
          <a href="#" class="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100">
            <img src="/src/assets/dashboard.png" alt="Dashboard" class="h-5 w-5" />
            <span v-if="!isCollapsed" class="font-medium">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100">
            <img src="/src/assets/product.png" alt="Products" class="h-5 w-5" />
            <span v-if="!isCollapsed" class="font-medium">Products</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100">
            <img src="/src/assets/order.png" alt="Orders" class="h-5 w-5" />
            <span v-if="!isCollapsed" class="font-medium">Orders</span>
          </a>
        </li>
        <li class="mt-4">
          <h4 v-if="!isCollapsed" class="px-2 text-sm font-semibold text-gray-600">
            Categories
          </h4>
          <ul class="mt-2 space-y-1">
            <li v-for="c in categories" :key="c">
              <a
                href="#"
                class="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100"
              >
                <span class="w-6 text-center text-xs">{{ c[0] }}</span>
                <span v-if="!isCollapsed" class="text-sm">{{ c }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  isCollapsed: {
    type: Boolean,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  storeLogo: {
    type: String,
    required: true,
  },
  toggleIcon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['toggle-sidebar'])
</script>

<style scoped>
/* Kosong */
</style>