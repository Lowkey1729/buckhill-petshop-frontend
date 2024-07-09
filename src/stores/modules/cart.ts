import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type CartItem = {
  productUuid: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const initialCartItems = localStorage.getItem('cart') || '[]'
  const items = ref<CartItem[]>(JSON.parse(initialCartItems) || [])

  const count = computed<number>(() => Object.keys(items.value).length)

  const persistCart = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  const add = (productUuid: string, currentQuantity: number = 1) => {
    const exists = items.value.find((item) => item.productUuid === productUuid)

    if (exists) {
      exists.quantity = currentQuantity
    } else {
      items.value.push({ productUuid, quantity: currentQuantity })
    }

    persistCart()
  }

  const remove = (productUuid: string) => {
    const index = items.value.findIndex((item) => item.productUuid === productUuid)

    if (index !== -1) items.value.splice(index, 1)

    persistCart()
  }

  const exists = (productUuid: string): boolean =>
    !!items.value.find((item) => item.productUuid === productUuid)

  const productCountInCart = (productUuid: string): number => {
    const exists = items.value.find((item) => item.productUuid === productUuid)

    if (exists) return exists.quantity
    return 0
  }

  return { items, count, add, remove, exists, productCountInCart }
})
