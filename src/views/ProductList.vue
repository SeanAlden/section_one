<template>
  <div class="relative p-4">
    <div class="flex flex-col items-center justify-between gap-4 mb-4 md:flex-row">
      <div class="flex items-center w-full max-w-xl gap-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search product..."
          class="w-full px-2 py-1 border rounded"
        />

        <!-- Page size selector -->
        <div class="flex items-center gap-2">
          <label class="text-sm">Show</label>
          <select v-model.number="pageSize" class="px-2 py-1 text-sm border rounded">
            <option v-for="n in pageSizeOptions" :key="n" :value="n">{{ n }}</option>
          </select>
          <span class="text-sm">per page</span>
        </div>
      </div>

      <div class="flex items-center ml-4 space-x-3">
        <div class="font-semibold">Cart: {{ cart.length }}</div>

        <button @click="openCart" class="relative p-2">
          🛒
          <span
            v-if="cart.length > 0"
            class="absolute px-1 text-xs text-white bg-red-500 rounded-full -top-2 -right-2"
          >
            {{ cart.length }}
          </span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard
        v-for="product in pagedProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>

    <!-- Pagination and summary -->
    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-600">
        Showing {{ showingStart }} to {{ showingEnd }} of {{ totalFiltered }} entries
      </div>

      <Pagination
        :total-pages="totalPages"
        :current-page="currentPage"
        @update:current-page="(p) => (currentPage = p)"
      />
    </div>

    <div
      v-if="showCart"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40"
    >
      <div class="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <div class="flex items-start justify-between">
          <h2 class="mb-3 text-xl font-bold">🛍️ Your Cart</h2>
          <button @click="closeCart" class="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <div v-if="cart.length === 0" class="py-10 text-center text-gray-500">
          Cart is empty.
        </div>

        <div v-else class="py-2 space-y-2 overflow-y-auto border-t border-b max-h-64">
          <div
            v-for="(item, index) in visibleCartItems"
            :key="index"
            class="flex items-center justify-between py-1"
          >
            <div class="flex items-center gap-3">
              <img :src="item.image" alt="" class="object-contain w-10 h-10" />
              <div class="text-sm">
                <div class="font-medium">{{ truncate(item.title, 40) }}</div>
                <div class="text-xs text-gray-500">Qty: {{ item.quantity || 1 }}</div>
              </div>
            </div>

            <div class="text-sm">Rp {{ item.convertedPrice.toLocaleString() }}</div>
          </div>

          <div v-if="cart.length > 7" class="mt-2 text-sm text-center text-gray-500">
            Showing first 7 items — scroll to see more.
          </div>
        </div>

        <div class="mt-3 space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="isMember" class="form-checkbox" />
            <span class="text-sm">I am a member (+5% discount)</span>
          </label>

          <div class="flex items-center gap-2">
            <select v-model="promoSelected" class="px-2 py-1 text-sm border rounded">
              <option value="">No Promo</option>
              <option value="DISKON20">DISKON20 (-20%)</option>
            </select>

            <input
              v-model="promoInput"
              @input="promoSelected = promoInput.trim()"
              placeholder="Or enter promo code"
              class="flex-1 px-2 py-1 text-sm border rounded"
            />
          </div>
        </div>

        <div class="pt-2 mt-3 space-y-1 text-sm border-t">
          <div>Total Harga: <strong>Rp {{ totalPrice.toLocaleString() }}</strong></div>
          <div>Diskon: <strong>{{ discountInfo.discount }}%</strong></div>
          <div>Total Bayar: <strong>Rp {{ discountInfo.finalPrice.toLocaleString() }}</strong></div>
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="text-xs text-gray-500">
            (Conversion used: 1 USD ≈ {{ currencyRate.toLocaleString() }} IDR)
          </div>

          <div class="flex gap-2">
            <button @click="clearCart" class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
              Clear
            </button>
            <button @click="closeCart" class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import Pagination from '../components/Pagination.vue'
import { calculateDiscount } from '../utils/discount'

export default {
  components: { ProductCard, Pagination },
  setup() {
    const products = ref([])
    const search = ref('')
    const cart = ref([])
    const showCart = ref(false)

    const isMember = ref(false)
    const promoSelected = ref('')
    const promoInput = ref('')
    const currencyRate = ref(16000)

    // Pagination state
    const pageSizeOptions = [5, 10, 15, 20, 50]
    const pageSize = ref(10)
    const currentPage = ref(1)

    const convertToRupiah = (usd) => Math.round(usd * currencyRate.value)

    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        products.value = await res.json()
      } catch (e) {
        console.error('Failed fetch products', e)
      }
    }

    const addToCart = (product) => {
      const convertedProduct = {
        id: product.id,
        title: product.title,
        image: product.image,
        convertedPrice: convertToRupiah(product.price),
        quantity: 1,
      }
      cart.value.push(convertedProduct)
    }

    const filteredProducts = computed(() => {
      if (!search.value) return products.value
      return products.value.filter((p) =>
        p.title.toLowerCase().includes(search.value.toLowerCase())
      )
    })

    // total after filtering
    const totalFiltered = computed(() => filteredProducts.value.length)

    // total pages
    const totalPages = computed(() =>
      Math.max(1, Math.ceil(totalFiltered.value / pageSize.value))
    )

    // Ensure currentPage stays valid when filters/pageSize change
    watch([pageSize, filteredProducts], () => {
      if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
      if (currentPage.value < 1) currentPage.value = 1
    })

    const pagedProducts = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      return filteredProducts.value.slice(start, start + pageSize.value)
    })

    const totalPrice = computed(() =>
      cart.value.reduce((sum, item) => sum + (item.convertedPrice || 0), 0)
    )

    watch(promoInput, (val) => {
      if (!val) promoSelected.value = ''
    })

    const discountInfo = computed(() =>
      calculateDiscount(totalPrice.value, isMember.value, promoSelected.value)
    )

    const openCart = () => {
      showCart.value = true
    }
    const closeCart = () => {
      showCart.value = false
    }

    const clearCart = () => {
      cart.value = []
    }

    const visibleCartItems = computed(() => {
      return cart.value.slice(0, 7).map((it) => it)
    })

    const truncate = (str, n = 40) => (str.length > n ? str.slice(0, n) + '...' : str)

    // Showing X to Y of Z entries
    const showingStart = computed(() => {
      if (totalFiltered.value === 0) return 0
      return (currentPage.value - 1) * pageSize.value + 1
    })
    const showingEnd = computed(() =>
      Math.min(totalFiltered.value, currentPage.value * pageSize.value)
    )

    onMounted(fetchProducts)

    return {
      products,
      search,
      cart,
      showCart,
      addToCart,
      pagedProducts,
      totalPrice,
      discountInfo,
      openCart,
      closeCart,
      clearCart,
      visibleCartItems,
      truncate,
      isMember,
      promoSelected,
      promoInput,
      currencyRate,

      // pagination
      pageSizeOptions,
      pageSize,
      currentPage,
      totalPages,
      totalFiltered,
      showingStart,
      showingEnd,
    }
  },
}
</script>

<style scoped>
/* nothing special */
</style>
