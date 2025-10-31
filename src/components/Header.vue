<template>
  <!-- 
    Style paddingLeft sekarang dipindahkan ke App.vue sebagai :class
  -->
  <header
    class="fixed left-0 right-0 top-0 z-30 flex h-16 items-center bg-white shadow-md"
  >
    <div class="flex h-full w-full items-center justify-between px-4">
      <!-- Left: Tombol Hamburger (Mobile) + Menu Navigasi -->
      <div class="flex items-center gap-6">
        <!-- TOMBOL HAMBURGER (Baru) -->
        <!-- Muncul HANYA di mobile (lg:hidden) -->
        <button
          @click="emit('toggle-sidebar')"
          class="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none lg:hidden"
          title="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <!-- Navigasi Header (Home, About, Contact) -->
        <nav class="hidden items-center gap-4 md:flex">
          <a href="#" class="font-medium text-gray-700 hover:underline">Home</a>
          <a href="#" class="font-medium text-gray-700 hover:underline">About</a>
          <a href="#" class="font-medium text-gray-700 hover:underline">Contact</a>
        </nav>
      </div>

      <!-- Right: profile + notification -->
      <div class="flex items-center gap-4">
        <!-- ... (sisa dari header Anda tidak berubah) ... -->
        <button class="relative rounded-md p-2 hover:bg-gray-100 focus:outline-none">
          <img :src="notification" alt="notification" class="h-6 w-6" />
          <span
            class="absolute -right-1 -top-1 inline-flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold leading-none text-white"
            >3</span
          >
        </button>

        <div class="flex items-center gap-3">
          <div class="mr-2 hidden text-right md:block">
            <div class="text-sm font-semibold text-gray-700">Sean Alden</div>
            <div class="text-xs text-gray-500">Admin</div>
          </div>
          <img :src="profile" alt="profile" class="h-10 w-10 rounded-full border" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  // 'headerPaddingLeft' dihapus, karena ditangani oleh :class di App.vue
  notification: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
})

// Definisikan event 'toggle-sidebar' yang baru
const emit = defineEmits(['toggle-sidebar'])
</script>

<style scoped>
/* Kosong */
</style>