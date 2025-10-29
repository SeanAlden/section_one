<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition">
    <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain mb-4" loading="lazy" />
    <h3 class="font-semibold mb-2 text-lg">{{ product.title }}</h3>
    <p class="mb-1 text-gray-700">$ {{ product.price.toLocaleString() }}</p>
    <p class="mb-2 text-yellow-500">Rating: {{ product.rating.rate }} ⭐ ({{ product.rating.count }})</p>
    <button @click="$emit('add-to-cart', product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  }
}
</script>
