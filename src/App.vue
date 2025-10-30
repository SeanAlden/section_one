<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar
      :is-collapsed="isCollapsed"
      :categories="categories"
      :store-logo="storeLogo"
      :toggle-icon="toggleIcon"
      @toggle-sidebar="toggleSidebar"
    />

    <Header
      :header-padding-left="headerPaddingLeft"
      :notification="notification"
      :profile="profile"
    />

    <main
      :style="{ marginLeft: mainMarginLeft, paddingTop: headerHeight }"
      class="transition-all duration-300"
    >
      <div class="p-6 mx-auto max-w-7xl">
        <ProductList />
      </div>
    </main>

    <footer
      :style="{ marginLeft: mainMarginLeft }"
      class="p-6 mt-8 text-sm text-center text-gray-500"
    >
      &copy; 2025 My Store. All rights reserved.
    </footer>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
// Impor komponen anak
import Sidebar from './components/Sidebar.vue' 
import Header from './components/Header.vue' 
import ProductList from './views/ProductList.vue'

import profile from '/src/assets/profile.png'
import notification from '/src/assets/notification.png'
import storeLogo from '/src/assets/store.png'
import toggleIcon from '/src/assets/toggle.png'

export default {
  name: 'App',
  components: {
    ProductList,
    Sidebar, 
    Header, 
  },
  setup() {
    // --- State Utama (Tetap di App.vue) ---
    const isCollapsed = ref(false)
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    // --- Data (Tetap di App.vue untuk dikirim sebagai props) ---
    const categories = ['Electronics', 'Clothing', 'Books', 'Toys']
    const headerHeight = '64px' // 16 * 4 (Tailwind h-16 is 4rem = 64px)

    // --- Computed Properties (Tergantung state) ---
    const mainMarginLeft = computed(() => (isCollapsed.value ? '4rem' : '16rem')) // w-16 = 4rem, w-64 = 16rem
    const headerPaddingLeft = computed(() => (isCollapsed.value ? '4rem' : '16rem'))

    return {
      isCollapsed,
      toggleSidebar,
      mainMarginLeft,
      headerPaddingLeft,
      headerHeight,
      categories,
      // Aset untuk dikirim sebagai props
      profile,
      notification,
      storeLogo,
      toggleIcon,
    }
  },
}
</script>

<style scoped>
main {
  min-height: calc(100vh - 64px - 48px); /* header + footer approx */
}

:root {
  scroll-padding-top: 80px;
}
</style>