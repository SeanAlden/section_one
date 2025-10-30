<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SIDEBAR -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white shadow-lg border-r transition-all duration-300 ease-in-out overflow-hidden z-30',
      ]"
      :style="{ width: sidebarPx + 'px' }"
      aria-hidden="false"
    >
      <!-- Toggle button (top-right of sidebar) -->
      <div class="relative flex items-center h-16 px-4">
        <button
          @click="toggleSidebar"
          class="absolute flex items-center justify-center w-8 h-8 bg-white border rounded-full shadow -right-4 top-3 focus:outline-none"
          :title="isOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="flex items-center gap-3" :class="isOpen ? '' : 'justify-center w-full'">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-10 h-10 font-bold text-white rounded-md bg-gradient-to-br from-indigo-500 to-pink-500">
              MS
            </div>
          </div>
          <div v-if="isOpen" class="leading-tight">
            <div class="text-sm font-semibold">My Store</div>
            <div class="text-xs text-gray-500">Manage products</div>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <nav class="px-4 mt-4">
        <h3 v-if="isOpen" class="mb-3 text-sm tracking-wider text-gray-500 uppercase">Categories</h3>

        <ul class="space-y-2">
          <li>
            <a href="#" class="flex items-center gap-3 p-2 transition rounded-md hover:bg-gray-100">
              <span class="flex justify-center w-6 text-gray-500">📱</span>
              <span v-if="isOpen" class="text-gray-700">Electronics</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center gap-3 p-2 transition rounded-md hover:bg-gray-100">
              <span class="flex justify-center w-6 text-gray-500">👗</span>
              <span v-if="isOpen" class="text-gray-700">Clothing</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center gap-3 p-2 transition rounded-md hover:bg-gray-100">
              <span class="flex justify-center w-6 text-gray-500">📚</span>
              <span v-if="isOpen" class="text-gray-700">Books</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center gap-3 p-2 transition rounded-md hover:bg-gray-100">
              <span class="flex justify-center w-6 text-gray-500">🧸</span>
              <span v-if="isOpen" class="text-gray-700">Toys</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- optional bottom area -->
      <div class="p-4 mt-auto" v-if="isOpen">
        <button class="w-full py-2 text-sm text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700">
          Create product
        </button>
      </div>
    </aside>

    <!-- HEADER -->
    <header
      class="fixed top-0 right-0 z-40 flex items-center justify-between h-16 px-6 transition-all duration-300 bg-white shadow-sm"
      :style="{ left: sidebarPx + 'px', right: '0' }"
    >
      <div class="flex items-center gap-6">
        <!-- header menu (moved to left but not overlapping sidebar) -->
        <nav class="flex items-center gap-4">
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-indigo-600">Home</a>
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-indigo-600">About</a>
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-indigo-600">Contact</a>
        </nav>
      </div>

      <!-- right side: bell icon + profile -->
      <div class="flex items-center gap-4">
        <button class="relative p-2 transition rounded-md hover:bg-gray-100 focus:outline-none">
          <img :src="bell" alt="Bell" class="w-5 h-5" />
          <span class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>

        <div class="flex items-center gap-3">
          <img :src="profile" alt="Profile" class="object-cover border rounded-full shadow-sm w-9 h-9" />
          <div class="hidden md:block">
            <div class="text-sm font-semibold text-gray-800">Sean Alden</div>
            <div class="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main
      :style="{ marginLeft: sidebarPx + 'px', paddingTop: '4rem' }"
      class="transition-all duration-300"
    >
      <!-- Spacer to keep header from covering content on very small screens (header is 4rem) -->
      <div class="max-w-6xl px-6 py-6 mx-auto">
        <!-- product list component -->
        <ProductList />
      </div>

      <!-- footer -->
      <footer class="max-w-6xl px-6 py-10 mx-auto text-center text-gray-500">
        &copy; 2025 My Store. All rights reserved.
      </footer>
    </main>
  </div>
</template>

<script>
import ProductList from "./views/ProductList.vue";
import profileImg from "@/assets/profile.jpg";
import bellIcon from "@/assets/bell.svg";

export default {
  name: "App",
  components: { ProductList },
  data() {
    return {
      isOpen: true,
      // responsive widths in px
      openWidth: 256, // matches Tailwind's w-64
      collapsedWidth: 64, // matches w-16
      profile: profileImg,
      bell: bellIcon,
    };
  },
  computed: {
    sidebarPx() {
      return this.isOpen ? this.openWidth : this.collapsedWidth;
    },
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
/* small polish for smoother look */
body {
  /* keep background subtle */
  background-color: #f7fafc;
}

/* ensure product list scrolls independently (page scroll) while header/sidebar fixed */
main {
  min-height: 100vh;
}

/* hide focus outline on mouse click but keep for keyboard (optional) */
button:focus {
  outline: 2px solid rgba(99,102,241,0.25);
  outline-offset: 2px;
}

/* make sure header has subtle blur (if supported) */
header {
  backdrop-filter: saturate(120%) blur(4px);
}
</style>
