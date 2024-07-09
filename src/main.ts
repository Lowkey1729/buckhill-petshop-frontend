import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import './assets/main.css'

const app = createApp(App)
const theme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4EC690',
    'primary-light': '#EDF5F1'
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: theme
    }
  }
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
