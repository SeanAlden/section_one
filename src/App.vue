<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex items-center justify-between p-4 text-white bg-gray-800">
    <div class="text-xl font-bold">My Store</div>
      <nav class="space-x-4">
        <a href="#" class="hover:underline">Home</a>
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Contact</a>
      </nav>
    </header>

    <div class="flex flex-col flex-1 md:flex-row">
      <aside class="w-full p-4 bg-gray-100 md:w-64">
        <h3 class="mb-2 font-semibold">Categories</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:underline">Electronics</a></li>
          <li><a href="#" class="hover:underline">Clothing</a></li>
          <li><a href="#" class="hover:underline">Books</a></li>
          <li><a href="#" class="hover:underline">Toys</a></li>
        </ul>
      </aside>

      <main class="flex-1">
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
