<script setup lang="ts">
import {ref} from 'vue';
import {RouterView, useRoute} from 'vue-router'
import {useCartStore} from '@src/stores/modules/cart';

const route = useRoute();
const cart = useCartStore();

const links = ref([
  {text: 'Products', route: '/'},
  {text: 'Promotions', route: '/promotions'},
  {text: 'Blog', route: '/blog'}
])

const isActive = (path: string) => {
  return route.path === path;
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-container>
        <v-row align="center" justify="space-between">
        
          <v-col cols="auto">
            <div>
             <img src="/images/logo.svg" alt="logo" />
            </div>
          </v-col>


          <v-col cols="auto" class="tw-flex">
            <v-btn
                variant="text"
                v-for="link in links"
                :active="isActive(link.route)"
                :key="link.text"
                :to="link.route">
              {{ link.text}}</v-btn>
          </v-col>


          <v-col cols="auto" class="text-right">
            <v-btn prepend-icon="mdi-cart-outline" variant="outlined">
              Cart ({{ cart.count }})
            </v-btn>
            <v-btn variant="outlined" class="ms-3">Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
    <v-footer color="primary-light">
      <v-container>
        <v-row>
          <v-col>
            <div class="text-h5 font-weight-medium">
              <img src="/images/logo2.svg" alt="logo" />
            </div>
          </v-col>
          <v-col>
            <h5 class="text-h6">Petson</h5>
            <h5 >Blog</h5>
            <h5 >About Us</h5>
            <h5>Store</h5>
            <h5>Locator</h5>
          </v-col>
          <v-col>
            <h5 class="text-h6">Contact</h5>
            <h5>contact@petson</h5>
            <h5 >+385 000 000</h5>
            <h5 >35 Shnauzer avenue, Dogville AL</h5>
          </v-col>
          <v-col>
            <h5 class="text-h6 tw-font-bold">Information</h5>
            <h5>Ordering and shipping</h5>
            <h5 >FAQ</h5>
            <h5>GDPR statement</h5>
          </v-col>
          <v-col>
            <h5 class="xs">
              If you can't find answer to your question, please contact our
              customer service</h5>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>
