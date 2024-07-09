<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import productApi from '@src/apis/petshop/product'
import ProductSearch from '@src/components/Products/Search.vue'
import { useCurrencyStore } from '@src/stores/modules/currency'
import { useCartStore } from '@src/stores/modules/cart'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import type ProductData from '@src/apis/petshop/dtos/product'

const route = useRoute()
const currency = useCurrencyStore()
const cart = useCartStore()

const productData = ref<ProductData>()
const loading = ref(false)

const loadData = async () => {
  try {
    loading.value = true
    productData.value = await productApi.details(route.params.uuid as string)
  } finally {
    loading.value = false
  }
}

const productQuantity = computed({
  get() {
    const uuid = productData.value?.uuid
    if (!uuid) return 0

    return cart.productCountInCart(uuid as string)
  },

  set(value: number) {
    if (value === 0) {
      cart.remove(productData.value?.uuid as string)
    } else {
      cart.add(productData.value?.uuid as string, value)
    }
  }
})

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="my-8">
    <ProductSearch />
  </section>
  <section v-if="loading" class="text-center">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </section>
  <template v-else-if="productData">
    <div>
      <v-breadcrumbs
        class="text-capitalize"
        :items="['Homepage', productData.category.title, productData.title]"
      >
      </v-breadcrumbs>
      <v-row class="my-12 align-center">
        <v-col class="text-center">
          <img :src="productData.image" alt="" />
        </v-col>
        <v-col>
          <h1 class="text-h3 text-capitalize mb-4">{{ productData.brand?.title }}</h1>
          <h3 class="text-h5 text-disabled mb-8">{{ productData.title }}</h3>

          <div class="text-h3 mb-4">{{ currency.format(productData.price) }}</div>

          <v-number-input
            v-if="cart.exists(productData.uuid)"
            v-model:model-value="productQuantity"
            control-variant="split"
            :width="200"
          >
          </v-number-input>
          <v-btn
            v-else
            @click="cart.add(productData.uuid)"
            size="large"
            prepend-icon="mdi-cart"
            color="primary"
            text="Add to cart"
          >
          </v-btn>
        </v-col>
      </v-row>

      <div class="tw-mb-12">{{ productData.description }}</div>
    </div>
  </template>
</template>
