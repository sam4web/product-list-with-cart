<script setup>
import confirmIcon from '@/assets/images/icon-order-confirmed.svg'
import formatPrice from '@/utils/formatPrice.js'
import { useProductStore } from '@/stores/productStore.js'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { productsInCart, totalOrderPrice } = storeToRefs(productStore)
</script>

<template>
  <section
    class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 max-w-lg w-full"
  >
    <div class="bg-white rounded-xl shadow-md p-7 space-y-6">
      <img :src="confirmIcon" alt="confirm-icon" class="size-12" />
      <div class="space-y-2">
        <h1 class="font-bold text-4xl">Order Confirmed</h1>
        <h4 class="text-rose-500 text-base">We hope you enjoy your food!</h4>
      </div>

      <div class="bg-rose-50 p-6 rounded-xl space-y-6">
        <ul class="space-y-5">
          <li v-for="product in productsInCart" :key="product.id">
            <div class="flex-between mb-5">
              <div class="flex items-center gap-4">
                <img
                  :alt="product.name"
                  :src="product.image.thumbnail"
                  class="size-14 rounded-md"
                />
                <div class="text-base">
                  <h3 class="text-rose-900 font-medium">
                    {{ product.name }}
                  </h3>
                  <div class="space-x-3.5">
                    <span class="font-semibold text-lg text-red">
                      {{ product.quantity }}x
                    </span>
                    <span class="text-rose-500 font-normal">
                      @${{ formatPrice(product.price) }}
                    </span>
                  </div>
                </div>
              </div>

              <span class="text-rose-900 font-semibold text-lg">
                ${{ formatPrice(product.total) }}
              </span>
            </div>
            <hr class="border-none bg-rose-300 h-[0.5px]" />
          </li>
        </ul>

        <div class="flex-between text-rose-900">
          <span>Order Total</span>
          <h3 class="font-bold text-2xl">
            ${{ formatPrice(totalOrderPrice) }}
          </h3>
        </div>
      </div>

      <button
        class="btn py-3.5 bg-red text-rose-50 w-full font-medium"
        @click="productStore.startNewOrder"
      >
        Start New Order
      </button>
    </div>
  </section>
</template>
