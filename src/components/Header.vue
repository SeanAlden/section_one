<template>
  <header
    class="fixed top-0 left-0 right-0 z-30 flex items-center h-16 transition-all duration-300 bg-white shadow-md"
    :style="{ paddingLeft: headerPaddingLeft }"
  >
    <div class="flex items-center justify-between w-full h-full px-4">
      <div class="flex items-center gap-6">
        <nav class="flex items-center gap-4">
          <a href="#" class="font-medium text-gray-700 hover:underline">Home</a>
          <a href="#" class="font-medium text-gray-700 hover:underline">About</a>
          <a href="#" class="font-medium text-gray-700 hover:underline">Contact</a>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <button class="relative p-2 rounded-md hover:bg-gray-100 focus:outline-none">
          <img :src="notification" alt="notification" class="w-6 h-6" />
          <span
            class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
            >3</span
          >
        </button>

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
</template>

<script setup>
defineProps({
  headerPaddingLeft: {
    type: String,
    required: true,
  },
  notification: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
</style>