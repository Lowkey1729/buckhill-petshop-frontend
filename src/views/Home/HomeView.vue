<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CategoryData from '@src/apis/petshop/dtos/category'
import categoryApi from '@src/apis/petshop/category'
import productApi from '@src/apis/petshop/product'
import ProductSearch from '@src/components/Products/Search.vue'
import CategorySlider from '@src/components/Category/Slider.vue'
import HomePageContent from '@src/components/Home/HomePageContent.vue'

const loading = ref(false)
const featuredCategories = ref<CategoryData[]>([])

const loadData = async () => {
  loading.value = true

  const categories = await categoryApi.all({ limit: 2 })
  const filteredCategories = categories.slice(0, 2) // slice to get first 2 elements

  featuredCategories.value = []
  for (const category of filteredCategories) {
    category.products = await productApi.list({
      limit: 20,
      category: category.uuid
    })
    featuredCategories.value.push(category)
  }

  loading.value = false
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="tw-my-8">
    <ProductSearch />
  </section>
  <section class="tw-relative tw-my-6">
    <div
      class="tw-w-full tw-h-96 tw-bg-cover tw-bg-gray-300 tw-rounded-lg tw-overflow-hidden tw-relative"
    >
      <img
        src="/images/hero-image.png"
        alt="Image description"
        class="absolute inset-0 object-cover w-full h-full opacity-75"
      />

      <div
        class="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-gap-3 tw-ml-24 tw-mt-24 tw-text-white"
      >
        <div class="m-1 tw-w-[35%]">
          <p class="tw-bg-black tw-opacity-40 tw-text-5xl tw-p-5">Up to 30% sale</p>
        </div>
        <div class="m-1 tw-w-[50%]">
          <p class="tw-bg-black tw-opacity-40 tw-w-1/2 tw-text-xl tw-p-2">
            On select dog food and toys
          </p>
        </div>
      </div>
    </div>
  </section>
  <CategorySlider class="tw-my-14" v-if="featuredCategories[0]" :category="featuredCategories[0]">
  </CategorySlider>
  <HomePageContent
    class="tw-my-24"
    image="/images/home-image-1.png"
    title="Treat your pup"
    action-text="Discover our dog treat selection"
  />
  <CategorySlider class="tw-my-14" v-if="featuredCategories[1]" :category="featuredCategories[1]">
  </CategorySlider>
</template>
