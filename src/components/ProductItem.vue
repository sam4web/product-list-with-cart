<script setup>
import addToCartIcon from '@/assets/images/icon-add-to-cart.svg'
import incrementIcon from '@/assets/images/icon-increment-quantity.svg'
import decrementIcon from '@/assets/images/icon-decrement-quantity.svg'
import formatPrice from '../utils/formatPrice.js'
import { useProductStore } from '@/stores/productStore.js'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const productStore = useProductStore()
</script>

<template>
  <article>
    <div class="relative mb-9">
      <div
        :class="product.quantity > 0 && 'border-red'"
        class="overflow-hidden rounded-xl border-2 border-transparent"
      >
        <picture>
          <source :srcset="product.image.mobile" media="(max-width: 767px)" />
          <source
            :srcset="product.image.tablet"
            media="(min-width: 768px) and (max-width: 1024px)"
          />
          <source :srcset="product.image.desktop" media="(min-width: 1025px)" />
          <img :alt="product.name" :src="product.image.thumbnail" />
        </picture>
      </div>

      <div
        class="w-full flex-center absolute -bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          v-if="!product.quantity"
          class="btn bg-white flex-center gap-3 group"
          @click="productStore.increaseQuantity(product.id)"
        >
          <img :src="addToCartIcon" alt="cart-icon" class="size-7" />
          <span class="font-medium group-hover:text-red">Add to Cart</span>
        </button>

        <div v-else class="btn flex-between px-2.5 py-3 bg-red text-rose-50">
          <button
            class="icon-btn"
            @click="productStore.decreaseQuantity(product.id)"
          >
            <img :src="decrementIcon" alt="increment-icon" />
          </button>
          <span class="font-medium text-rose-50">
            {{ product.quantity }}
          </span>
          <button
            class="icon-btn"
            @click="productStore.increaseQuantity(product.id)"
          >
            <img :src="incrementIcon" alt="increment-icon" />
          </button>
        </div>
      </div>
    </div>

    <div class="lg:space-y-0.5">
      <h4 class="text-rose-500 text-base">
        {{ product.category }}
      </h4>
      <h3 class="text-rose-900 text-lg lg:text-xl font-semibold">
        {{ product.name }}
      </h3>
      <h3 class="text-red text-lg lg:text-xl font-semibold">
        ${{ formatPrice(product.price) }}
      </h3>
    </div>
  </article>
</template>
