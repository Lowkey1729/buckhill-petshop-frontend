<script setup lang="ts">
import {Navigation, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {RouterLink} from 'vue-router';
import Category from '@src/apis/petshop/dtos/category'
import ProductCard from '@src/components/Products/Card.vue';

const swiperModules = [Navigation, Autoplay];

defineProps({
  category: {
    type: Category,
    required: true
  }
});
</script>

<template>
  <section v-bind="$attrs">
    <RouterLink
        :to="{ name: 'category', params: { uuid: category.uuid } }"
        class="tw-text-3xl tw-uppercase tw-text-green-400  tw-mb-6">
      {{ category.title }}
    </RouterLink>

    <Swiper
        :modules="swiperModules"
        :slides-per-view="5"
        navigation
        loop>

      <div class="tw-grid tw-grid-cols-5 tw-gap-3">
        <SwiperSlide
            v-for="product of category.products"
            :key="product.uuid"
        >
          <ProductCard :product="product"/>
        </SwiperSlide>
      </div>
    </Swiper>
  </section>
</template>