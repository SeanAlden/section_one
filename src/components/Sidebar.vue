<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-full bg-gray-200 shadow-lg border-r z-40 flex flex-col transition-[width] duration-300 ease-in-out overflow-hidden',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
    aria-label="Sidebar"
  >
    <div class="flex items-center justify-between h-16 px-4 border-b">
      <div v-if="!isCollapsed" class="flex items-center space-x-2">
        <img :src="storeLogo" alt="Store Logo" class="object-contain w-8 h-8" />
        <span class="text-lg font-bold">My Store</span>
      </div>

      <div v-else class="flex items-center justify-center w-full">
        <button
          class="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          @click="emit('toggle-sidebar')"
          title="Open sidebar"
        >
          <img :src="toggleIcon" alt="Open sidebar" class="object-contain w-6 h-6" />
        </button>
      </div>

      <button
        v-if="!isCollapsed"
        class="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        @click="emit('toggle-sidebar')"
        :aria-expanded="!isCollapsed"
        title="Close sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
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

    <nav class="flex-1 px-2 py-4">
      <ul class="space-y-1">
        <li>
          <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
            <img src="/src/assets/dashboard.png" alt="Dashboard" class="w-5 h-5" />
            <span v-if="!isCollapsed" class="font-medium">Dashboard</span>
          </a>
        </li>

        <li>
          <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
            <img src="/src/assets/product.png" alt="Products" class="w-5 h-5" />
            <span v-if="!isCollapsed" class="font-medium">Products</span>
          </a>
        </li>

        <li>
          <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
            <img src="/src/assets/order.png" alt="Orders" class="w-5 h-5" />
            <span v-if="!isCollapsed" class="font-medium">Orders</span>
          </a>
        </li>

        <li class="mt-4">
          <h4 v-if="!isCollapsed" class="px-2 text-sm font-semibold text-gray-600">
            Categories
          </h4>
          <ul class="mt-2 space-y-1">
            <li v-for="c in categories" :key="c">
              <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <span class="w-6 text-xs text-center">{{ c[0] }}</span>
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
</style>