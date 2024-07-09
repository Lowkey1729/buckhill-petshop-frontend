<script setup lang="ts">
import {onMounted, ref} from 'vue'

import CategoryData from '@src/apis/petshop/dtos/category';
import categoryApi from '@src/apis/petshop/category'
import productApi from '@src/apis/petshop/product';
import ProductSearch from '@src/components/Products/Search.vue';
import CategorySlider from '@src/components/Category/Slider.vue';
import HomePageContent from "@src/components/Home/HomePageContent.vue";

const loading = ref(false);
const featuredCategories = ref<CategoryData[]>([]);

const loadData = async () => {
  loading.value = true;

  const categories = await categoryApi.all({ limit: 2 });
  const filteredCategories = categories.slice(0, 2); // slice to get first 2 elements

  featuredCategories.value = [];
  for (const category of filteredCategories) {
    category.products = await productApi.list({
      limit: 20,
      category: category.uuid,
    });
    featuredCategories.value.push(category);
  }

  loading.value = false;
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <section class="tw-my-8">
    <ProductSearch/>
  </section>
  <section class="position-relative section-gap">
    <img class="w-100" src="/images/hero-image.png"/>

    <div class="hero-sale-text d-flex flex-column align-start">
      <div class="hero-text text-h2 text-white pa-4">Up to 30% sale</div>
      <div class="hero-text text-subtitle-1 text-white pa-2 mt-2">On select dog food and toys</div>
    </div>
  </section>
  <CategorySlider
      v-if="featuredCategories[0]"
      :category="featuredCategories[0]">

  </CategorySlider>
  <HomePageContent
      class="tw-my-24"
      image="/images/home-image-1.png"
      title="Treat your pup"
      action-text="Discover our dog treat selection"
  />
  <CategorySlider
      v-if="featuredCategories[1]"
      :category="featuredCategories[1]">

  </CategorySlider>
</template>