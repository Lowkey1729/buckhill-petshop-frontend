import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const currencyLocales = {
  CNY: 'en-US',
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'fr-FR'
}

export const useCurrencyStore = defineStore('currency', () => {
  const currentCurrency = ref('CYN')
  const currencyLocale = computed<string>(() => currencyLocales[currentCurrency.value] || 'en-US')

  const format = (price: number): string => {
    const formatter = new Intl.NumberFormat(currencyLocale.value, {
      style: 'currency',
      currency: currentCurrency.value
    })

    return formatter.format(price)
  }

  return { currentCurrency, format }
})
