import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    productsInCart: [],
    showConfirmOrderModal: false,
  }),
  getters: {
    countProductsInCart() {
      return this.productsInCart.length
    },
    totalOrderPrice() {
      return this.productsInCart.reduce((prev, curr) => prev + curr.total, 0)
    },
  },
  actions: {
    findProductById(productId) {
      return this.products.find(product => product.id === productId)
    },
    setProducts(products) {
      this.products = products.map(product => ({
        ...product,
        id: uuidv4(),
        quantity: 0,
      }))
    },
    updateProductsInCart(productId) {
      const product = this.findProductById(productId)
      const selectedProductInCart = this.productsInCart.find(
        product => product.id === productId,
      )
      // check if product exists in cart, is no add product to cart
      if (!selectedProductInCart) {
        this.productsInCart.push({
          ...product,
          total: product.quantity * product.price,
        })
        return
      }
      // remove item from cart is quantity is 0
      if (!product.quantity) {
        this.productsInCart = this.productsInCart.filter(
          product => product.id !== productId,
        )
        return
      }
      // update quantity and total price of product in cart
      selectedProductInCart.quantity = product.quantity
      selectedProductInCart.total = product.quantity * product.price
    },
    increaseQuantity(productId) {
      const product = this.findProductById(productId)
      product.quantity += 1
      this.updateProductsInCart(productId)
    },
    decreaseQuantity(productId) {
      const product = this.findProductById(productId)
      product.quantity -= 1
      this.updateProductsInCart(productId)
    },
    removeProductFromCart(productId) {
      const product = this.findProductById(productId)
      product.quantity = 0
      this.productsInCart = this.productsInCart.filter(
        product => product.id !== productId,
      )
    },
    confirmOrder() {
      if (!this.countProductsInCart) return
      this.showConfirmOrderModal = true
    },

    startNewOrder() {
      this.products = this.products.map(product => ({
        ...product,
        quantity: 0,
      }))
      this.productsInCart = []
      this.showConfirmOrderModal = false
    },
  },
})
