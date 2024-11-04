<script setup>
import { onMounted } from 'vue'
import products from '@/assets/data/products.json'
import { useProductStore } from '@/stores/productStore.js'
import ProductList from '@/components/ProductList.vue'
import CartList from '@/components/CartList.vue'

const productStore = useProductStore()
onMounted(() => productStore.setProducts(products))
</script>

<template>
  <main class="px-5 py-9 sm:p-14 lg:p-20 xl:py-24 xl:px-28 relative">
    <!--    <OrderModal v-if="showOrderModal" />-->

    <div class="grid lg:grid-cols-3 gap-8 x:glap-9">
      <ProductList />
      <CartList />
    </div>
  </main>
</template>
