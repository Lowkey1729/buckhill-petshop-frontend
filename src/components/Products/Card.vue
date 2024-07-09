<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import Product from '@src/apis/petshop/dtos/product';
import { useCartStore } from '@src/stores/modules/cart';
import { useCurrencyStore } from '@src/stores/modules/currency';
import { useRouter } from 'vue-router';

const router = useRouter();
const currency = useCurrencyStore();
const cart = useCartStore();

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  },

  showAddToCart: {
    type: Boolean,
    default: false
  }
})

const productQuantity = computed({
  get() {
    return cart.productCountInCart(props.product.uuid as string)
  },

  set(value: number) {
    if (value === 0) {
      cart.remove(props.product.uuid as string)
    } else {
      cart.add(props.product.uuid as string, value)
    }
  }
});

const navigateToProduct = () => {
  router.push({ name: 'product', params: { uuid: props.product.uuid } })
}
</script>

<template>
  <v-card variant="text" hover @click="navigateToProduct">
    <div class="pa-8">
      <v-img height="200px" :src="product.image"></v-img>
    </div>

    <v-card-title>{{ product.title }}</v-card-title>

    <v-card-subtitle class="text-capitalize">{{ product.brand?.title }}</v-card-subtitle>
    <v-card-text>
      <div class="text-subtitle-1 font-weight-bold mb-4">{{ currency.format(product.price) }}</div>

      <template v-if="showAddToCart">
        <v-number-input v-if="cart.exists(product.uuid)" control-variant="split"
                        v-model:model-value="productQuantity" :width="150" variant="outlined"></v-number-input>
        <v-btn v-else @click="cart.add(product.uuid)" color="primary" prepend-icon="mdi-cart"
               text="Add to cart"></v-btn>
      </template>
    </v-card-text>
  </v-card>
</template>