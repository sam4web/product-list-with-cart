<script setup>
import emptyCart from '@/assets/images/illustration-empty-cart.svg'
import removeItemIcon from '@/assets/images/icon-remove-item.svg'
import carbonIcon from '@/assets/images/icon-carbon-neutral.svg'
import { useProductStore } from '@/stores/productStore.js'
import { storeToRefs } from 'pinia'
import formatPrice from '../utils/formatPrice.js'

const productStore = useProductStore()
const { productsInCart, countProductsInCart, totalOrderPrice } =
  storeToRefs(productStore)
</script>

<template>
  <section
    class="bg-rose-50 h-fit space-y-7 lg:space-y-10 rounded-xl px-6 py-8"
  >
    <h2 class="text-red font-bold text-3xl">
      Your Cart ({{ countProductsInCart }})
    </h2>

    <div v-if="countProductsInCart <= 0" class="flex-center flex-col space-y-3">
      <img :src="emptyCart" alt="empty-cart-illustration" class="w-36" />
      <p class="text-rose-500 font-medium text-base">
        Your added items will appear here
      </p>
    </div>

    <div v-else class="space-y-6">
      <ul class="space-y-5">
        <li v-for="product in productsInCart" :key="product.id">
          <div class="flex-between mb-5">
            <div class="text-base space-y-1.5">
              <h3 class="text-rose-900 font-medium">
                {{ product.name }}
              </h3>
              <div class="space-x-3">
                <span class="font-semibold text-red">
                  {{ product.quantity }}x
                </span>
                <span class="text-rose-500 font-normal">
                  @ ${{ formatPrice(product.price) }}
                </span>
                <span class="text-rose-500 font-semibold">
                  ${{ formatPrice(product.total) }}
                </span>
              </div>
            </div>
            <button
              class="icon-btn border-rose-400"
              @click="productStore.removeProductFromCart(product.id)"
            >
              <img :src="removeItemIcon" alt="remove-icon" />
            </button>
          </div>
          <hr class="border-none bg-rose-300 h-[1px]" />
        </li>
      </ul>

      <div class="flex-between text-rose-900">
        <span>Order Total</span>
        <h3 class="font-bold text-2xl">${{ formatPrice(totalOrderPrice) }}</h3>
      </div>

      <div class="bg-rose-100 flex-center gap-2.5 p-4 rounded-md">
        <img :src="carbonIcon" alt="carbon-neutral-icon" class="size-6" />
        <p class="text-rose-900 text-base font-normal">
          This is a <b class="font-medium"> carbon-neutral </b> delivery.
        </p>
      </div>

      <button
        class="btn py-3.5 bg-red text-rose-50 w-full font-medium"
        @click=""
      >
        Confirm Order
      </button>
    </div>
  </section>
</template>
