<template>
  <div class="min-h-screen bg-gray-50">
    <div
      v-if="!isCollapsed"
      @click="toggleSidebar"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
      aria-hidden="true"
    ></div>
    <Sidebar
      :is-collapsed="isCollapsed"
      :categories="categories"
      :store-logo="storeLogo"
      :toggle-icon="toggleIcon"
      @toggle-sidebar="toggleSidebar"
    />
    <Header
      :notification="notification"
      :profile="profile"
      @toggle-sidebar="toggleSidebar"
      class="transition-all duration-300"
      :class="[isCollapsed ? 'lg:pl-16' : 'lg:pl-64']"
    />
    <main
      :style="{ paddingTop: headerHeight }"
      class="transition-all duration-300"
      :class="[isCollapsed ? 'lg:ml-16' : 'lg:ml-64']"
    >
      <div class="mx-auto max-w-7xl p-6">
        <ProductList />
      </div>
    </main>
    <footer
      class="mt-8 p-6 text-center text-sm text-gray-500 transition-all duration-300"
      :class="[isCollapsed ? 'lg:ml-16' : 'lg:ml-64']"
    >
      &copy; 2025 My Store. All rights reserved.
    </footer>
  </div>
</template>

<script>
// 1. Impor 'onMounted' dan 'onUnmounted' dari vue
import { ref, onMounted, onUnmounted } from 'vue' 
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
    const isInitiallyMobile = window.innerWidth < 1024
    const isCollapsed = ref(isInitiallyMobile)

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const categories = ['Electronics', 'Clothing', 'Books', 'Toys']
    const headerHeight = '64px'

    // --- PERBAIKAN DIMULAI DI SINI ---

    // 2. Buat fungsi handler
    // Fungsi ini akan dipanggil setiap kali jendela di-resize
    const handleResize = () => {
      // Periksa apakah kita di 'mobile' (lebar < 1024)
      // DAN sidebar sedang 'terbuka' (!isCollapsed)
      if (window.innerWidth < 1024 && !isCollapsed.value) {
        // Jika ya, paksa sidebar untuk menutup.
        // Ini adalah logika yang Anda minta.
        isCollapsed.value = true
      }
    }

    // 3. Pasang listener saat komponen di-mount (dimuat)
    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    // 4. Hapus listener saat komponen di-unmount (dihancurkan)
    // Ini penting untuk mencegah kebocoran memori (memory leaks)
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
    
    // --- AKHIR PERBAIKAN ---

    return {
      isCollapsed,
      toggleSidebar,
      headerHeight,
      categories,
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
  min-height: calc(100vh - 64px - 48px);
}
:root {
  scroll-padding-top: 80px;
}
</style>