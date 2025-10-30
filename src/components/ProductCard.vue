<template>
  <div class="p-4 transition border rounded-lg shadow hover:shadow-lg">
    <img
      v-lazy="product.image"
      :alt="product.title"
      class="object-contain w-full h-48 mb-4"
    />
    <h3 class="mb-2 text-lg font-semibold">{{ product.title }}</h3>
    <p class="mb-1 text-gray-700">$ {{ product.price.toLocaleString() }}</p>
    <p class="mb-2 text-yellow-500">Rating: {{ product.rating.rate }} ⭐ ({{ product.rating.count }})</p>
    <button
      @click="$emit('add-to-cart', product)"
      class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  directives: {
    lazy: {
      mounted(el, binding) {
        const options = { rootMargin: '100px', threshold: 0.1 }

        const loadImage = () => {
          el.src = binding.value
          el.classList.add('fade-in')
        }

        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage()
              obs.unobserve(el)
            }
          })
        }, options)

        observer.observe(el)
      },
    },
  },
}
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}
.fade-in[src] {
  opacity: 1;
}
</style>
