<script setup>
import { onMounted } from 'vue'
import products from '@/assets/data/products.json'
import { useProductStore } from '@/stores/productStore.js'
import ProductList from '@/components/ProductList.vue'
import ProductCart from '@/components/ProductCart.vue'
import ConfirmOrderModal from '@/components/ConfirmOrderModal.vue'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { showConfirmOrderModal } = storeToRefs(productStore)
onMounted(() => productStore.setProducts(products))
</script>

<template>
  <main
    :class="showConfirmOrderModal && 'order-model-overlay'"
    class="px-5 py-9 sm:p-14 lg:p-20 xl:py-24 xl:px-28 relative"
  >
    <ConfirmOrderModal v-if="showConfirmOrderModal" />

    <div class="grid lg:grid-cols-3 gap-8 x:glap-9">
      <ProductList />
      <ProductCart />
    </div>
  </main>
</template>
