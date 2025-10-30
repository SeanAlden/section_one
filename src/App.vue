<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header tetap di atas -->
    <header class="sticky top-0 z-50 flex items-center justify-between p-4 text-white bg-gray-800">
      <div class="text-xl font-bold">My Store</div>
      <nav class="space-x-4">
        <a href="#" class="hover:underline">Home</a>
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Contact</a>
      </nav>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar tetap di kiri -->
      <aside class="bg-gray-100 p-4 w-64 hidden md:block sticky top-[64px] h-[calc(100vh-64px)] overflow-auto">
        <h3 class="mb-2 font-semibold">Categories</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:underline">Electronics</a></li>
          <li><a href="#" class="hover:underline">Clothing</a></li>
          <li><a href="#" class="hover:underline">Books</a></li>
          <li><a href="#" class="hover:underline">Toys</a></li>
        </ul>
      </aside>

      <!-- Area konten bisa discroll -->
      <main class="flex-1 p-4 overflow-y-auto">
        <ProductList />
      </main>
    </div>

    <footer class="p-4 text-center text-white bg-gray-800">
      &copy; 2025 My Store. All rights reserved.
    </footer>
  </div>
</template>

<script>
import ProductList from "./views/ProductList.vue";

export default {
  components: { ProductList },
};
</script>

<style>
/* Untuk memastikan tinggi header diketahui (64px dari padding + font) */
header {
  height: 64px;
}
</style>
