<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SIDEBAR (fixed) -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-gray-200 shadow-lg border-r z-40 flex flex-col transition-[width] duration-300 ease-in-out overflow-hidden',
        isCollapsed ? 'w-16' : 'w-64'
      ]"
      aria-label="Sidebar"
    >
      <div class="flex items-center justify-between h-16 px-4 border-b">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold" v-if="!isCollapsed">My Store</span>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h18M9 3v18M15 3v18" />
          </svg>
        </div>

        <!-- Toggle button (top-right of sidebar) -->
        <button
          class="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          @click="toggleSidebar"
          :aria-expanded="!isCollapsed"
          title="Toggle sidebar"
        >
          <svg v-if="!isCollapsed" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <nav class="flex-1 px-2 py-4">
        <ul class="space-y-1">
          <li>
            <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 7h18M3 12h18M3 17h18"/>
              </svg>
              <span v-if="!isCollapsed" class="font-medium">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h18v18H3z"/>
              </svg>
              <span v-if="!isCollapsed" class="font-medium">Products</span>
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 10a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span v-if="!isCollapsed" class="font-medium">Orders</span>
            </a>
          </li>

          <!-- Categories as requested -->
          <li class="mt-4">
            <h4 v-if="!isCollapsed" class="px-2 text-sm font-semibold text-gray-600">Categories</h4>
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

    <!-- HEADER (fixed top) -->
    <header
      class="fixed top-0 left-0 right-0 z-30 flex items-center h-16 transition-all duration-300 bg-white shadow-md"
      :style="{ paddingLeft: headerPaddingLeft }"
    >
      <div class="flex items-center justify-between w-full h-full px-4">
        <!-- Left: header menu -->
        <div class="flex items-center gap-6">
          <nav class="flex items-center gap-4">
            <a href="#" class="font-medium text-gray-700 hover:underline">Home</a>
            <a href="#" class="font-medium text-gray-700 hover:underline">About</a>
            <a href="#" class="font-medium text-gray-700 hover:underline">Contact</a>
          </nav>
        </div>

        <!-- Right: profile + notification -->
        <div class="flex items-center gap-4">
          <!-- notification -->
          <button class="relative p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <img :src="notification" alt="notification" class="w-6 h-6" />
            <span class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
          </button>

          <!-- profile -->
          <div class="flex items-center gap-3">
            <div class="hidden mr-2 text-right md:block">
              <div class="text-sm font-semibold text-gray-700">Sean Alden</div>
              <div class="text-xs text-gray-500">Admin</div>
            </div>
            <img :src="profile" alt="profile" class="w-10 h-10 border rounded-full" />
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main :style="{ marginLeft: mainMarginLeft, paddingTop: headerHeight }" class="transition-all duration-300">
      <div class="p-6 mx-auto max-w-7xl">
        <ProductList />
      </div>
    </main>

    <!-- FOOTER -->
    <footer :style="{ marginLeft: mainMarginLeft }" class="p-6 mt-8 text-sm text-center text-gray-500">
      &copy; 2025 My Store. All rights reserved.
    </footer>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ProductList from "./views/ProductList.vue";
import profile from "/src/assets/profile.png";
import notification from "/src/assets/notification.png";

export default {
  name: "App",
  components: { ProductList },
  setup() {
    const isCollapsed = ref(false);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    // header height in px (used as paddingTop for main)
    const headerHeight = "64px"; // 16 * 4 (Tailwind h-16 is 4rem = 64px)

    // main margin left matches sidebar width
    const mainMarginLeft = computed(() => (isCollapsed.value ? "4rem" : "16rem")); // w-16 = 4rem, w-64 = 16rem
    const headerPaddingLeft = computed(() => (isCollapsed.value ? "4rem" : "16rem"));

    const categories = ["Electronics", "Clothing", "Books", "Toys"];

    return {
      isCollapsed,
      toggleSidebar,
      mainMarginLeft,
      headerPaddingLeft,
      headerHeight,
      categories,
      profile,
      notification,
    };
  },
};
</script>

<style scoped>
/* small visual tweaks */
/* body { */
  /* ensure body background consistent if needed */
/* } */

/* make sure main content is vertically scrollable while header/sidebar fixed */
main {
  min-height: calc(100vh - 64px - 48px); /* header + footer approx */
}

/* prevent content from going behind header when using anchors */
:root {
  scroll-padding-top: 80px;
}
</style>
