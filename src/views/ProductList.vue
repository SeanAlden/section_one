<template>
  <div class="p-4 relative">
    <div class="flex flx-col md:flex-row justify-between mb-4 items-center gap-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search product..."
        class="border rounded px-2 py-1 w-full max-w-sm"
      />

      <div class="flex items-center ml-4 space-x-3">
        <div class="font-semibold">Cart: {{ cart.length }}</div>

        <button @click="openCart" class="relative p-2">
          🛒
          <span
            v-if="cart.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1"
          >
            {{ cart.length }}
          </span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>

    <div
      v-if="showCart"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
        <div class="flex justify-between items-start">
          <h2 class="text-xl font-bold mb-3">🛍️ Your Cart</h2>
          <button @click="closeCart" class="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <div v-if="cart.length === 0" class="text-gray-500 text-center py-10">
          Cart is empty.
        </div>

        <div v-else class="max-h-64 overflow-y-auto border-t border-b py-2 space-y-2">
          <div
            v-for="(item, index) in visibleCartItems"
            :key="index"
            class="flex justify-between items-center py-1"
          >
            <div class="flex items-center gap-3">
              <img :src="item.image" alt="" class="w-10 h-10 object-contain" />
              <div class="text-sm">
                <div class="font-medium">{{ truncate(item.title, 40) }}</div>
                <div class="text-xs text-gray-500">Qty: {{ item.quantity || 1 }}</div>
              </div>
            </div>

            <div class="text-sm">Rp {{ item.convertedPrice.toLocaleString() }}</div>
          </div>

          <div v-if="cart.length > 7" class="text-center text-sm text-gray-500 mt-2">
            Showing first 7 items — scroll to see more.
          </div>
        </div>

        <div class="mt-3 space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="isMember" class="form-checkbox" />
            <span class="text-sm">I am a member (+5% discount)</span>
          </label>

          <div class="flex items-center gap-2">
            <select v-model="promoSelected" class="border rounded px-2 py-1 text-sm">
              <option value="">No Promo</option>
              <option value="DISKON20">DISKON20 (-20%)</option>
            </select>
           
            <input
              v-model="promoInput"
              @input="promoSelected = promoInput.trim()"
              placeholder="Or enter promo code"
              class="border rounded px-2 py-1 text-sm flex-1"
            />
          </div>
        </div>

        <div class="mt-3 border-t pt-2 text-sm space-y-1">
          <div>Total Harga: <strong>Rp {{ totalPrice.toLocaleString() }}</strong></div>
          <div>Diskon: <strong>{{ discountInfo.discount }}%</strong></div>
          <div>Total Bayar: <strong>Rp {{ discountInfo.finalPrice.toLocaleString() }}</strong></div>
        </div>

        <div class="flex justify-between items-center mt-3">
          <div class="text-xs text-gray-500">
            (Conversion used: 1 USD ≈ {{ currencyRate.toLocaleString() }} IDR)
          </div>

          <div class="flex gap-2">
            <button @click="clearCart" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
              Clear
            </button>
            <button @click="closeCart" class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm">
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
import { calculateDiscount } from '../utils/discount'

export default {
  components: { ProductCard },
  setup() {
    const products = ref([])
    const search = ref('')
    const cart = ref([])
    const showCart = ref(false)
   
    const isMember = ref(false)
    const promoSelected = ref('') 
    const promoInput = ref('') 
    const currencyRate = ref(16000) 

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

    onMounted(fetchProducts)

    return {
      products,
      search,
      cart,
      showCart,
      addToCart,
      filteredProducts,
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
    }
  },
}
</script>

<style scoped>
</style>
