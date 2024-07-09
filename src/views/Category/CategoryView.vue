<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import categoryApi from '@src/apis/petshop/category'
import {useRoute} from 'vue-router'
import type CategoryData from '@src/apis/petshop/dtos/category'
import productApi from '@src/apis/petshop/product'
import type ProductData from '@src/apis/petshop/dtos/product'

import ProductSearch from '@src/components/Products/Search.vue'
import ProductCard from '@src/components/Products/Card.vue'
import brandApi from '@src/apis/petshop/brand'
import type BrandData from '@src/apis/petshop/dtos/brand'

const route = useRoute()

const category = ref<CategoryData | null>()
const products = ref<ProductData[]>([])
const categories = ref<CategoryData[]>([])
const brands = ref<BrandData[]>([])

const loading = ref(false)
const loadingProducts = ref(false)

const selectedBrand = ref<string | null>(null)

const updateBrand = (brand: BrandData) => {
  if (brand.uuid === selectedBrand.value) {
    selectedBrand.value = null
  } else {
    selectedBrand.value = brand.uuid
  }

  loadProducts()
}

const loadData = async () => {
  loading.value = true

  const loadCategory = categoryApi.details(<string>route.params.uuid)
  const loadCategories = categoryApi.all()
  const loadBrands = brandApi.list()

  const [_category, _categories, _brands] = await Promise.all([
    loadCategory,
    loadCategories,
    loadBrands,
    loadProducts()
  ])

  category.value = _category
  categories.value = _categories
  brands.value = _brands

  loading.value = false
}

const loadProducts = async () => {
  loadingProducts.value = true
  products.value = await productApi.all({
    category: route.params.uuid as string,
    limit: 15,
    brand: selectedBrand.value ?? null
  })
  loadingProducts.value = false
}

onMounted(() => {
  loadData()
})

watch(
  () => route.params.uuid,
  () => {
    selectedBrand.value = null
    loadData()
  }
)
</script>

<template>
  <section class="my-8">
    <ProductSearch />
  </section>

  <section v-if="loading" class="text-center">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </section>

  <section v-else-if="category" class="pt-12">
    <v-row>
      <v-col cols="2">
        <v-list lines="one">
          <v-list-group value="Categories">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-filter-outline">
                <template v-slot:title>
                  <v-list-item-title class="font-weight-bold">Category</v-list-item-title>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              :to="{ name: 'category', params: { uuid: category.uuid } }"
              v-for="category of categories"
              :key="category.uuid"
              :value="category.uuid"
            >
              <template v-slot:title>
                <v-list-item-title class="text-capitalize">{{ category.title }}</v-list-item-title>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>

        <v-list lines="one">
          <v-list-group value="Brands">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-filter-outline">
                <template v-slot:title>
                  <v-list-item-title class="font-weight-bold">Brands</v-list-item-title>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              @click="updateBrand(brand)"
              :active="selectedBrand === brand.uuid"
              color="info"
              v-for="brand of brands"
              :key="brand.uuid"
              :value="brand.uuid"
            >
              <template v-slot:title>
                <v-list-item-title class="text-capitalize">{{ brand.title }}</v-list-item-title>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>

      <v-col cols="10">
        <div class="mb-12">
          <h2 class="tw-text-5xl">{{ category.title }}</h2>
          <v-breadcrumbs class="tw-uppercase" :items="['Homepage', 'Categories', category.title]">
          </v-breadcrumbs>
        </div>

        <div class="text-center" v-if="loadingProducts">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </div>
        <div class="text-center" v-else-if="!products.length">
          <p>No products available based on your filters.</p>
        </div>
        <v-row v-else>
          <v-col v-for="product of products" :key="product.uuid" cols="3">
            <ProductCard :product="product" :show-add-to-cart="true" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
