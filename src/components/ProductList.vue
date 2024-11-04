<script setup>
import ProductItem from '@/components/ProductItem.vue'
import { useProductStore } from '@/stores/productStore.js'

const productStore = useProductStore()
</script>

<template>
  <section class="space-y-9 lg:col-span-2">
    <h1 class="font-bold text-[46px]">Desserts</h1>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
      <ProductItem
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>
