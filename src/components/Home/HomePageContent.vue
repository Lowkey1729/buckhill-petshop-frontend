<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  actionText: {
    type: String,
    required: true
  },
  textFirst: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section v-bind="$attrs">
    <v-row>
      <v-col :order="textFirst ? 1 : 0">
        <img class="w-100" :src="image" />
      </v-col>
      <v-col
        class="d-flex align-center"
        :order="textFirst ? 0 : 1"
        :class="[textFirst ? '' : 'px-14']"
      >
        <div>
          <h2 class="text-primary text-h2 mb-8">{{ title }}</h2>
          <v-btn color="primary" :text="actionText"></v-btn>
        </div>
      </v-col>
    </v-row>
  </section>
</template>
