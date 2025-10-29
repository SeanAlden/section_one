<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-xl font-bold">My Store</div>
      <nav class="space-x-4">
        <a href="#" class="hover:underline">Home</a>
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Contact</a>
      </nav>
    </header>

    <div class="flex flex-1 flex-col md:flex-row">
      <aside class="bg-gray-100 p-4 w-full md:w-64">
        <h3 class="font-semibold mb-2">Categories</h3>
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

    <footer class="bg-gray-800 text-white p-4 text-center">
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
