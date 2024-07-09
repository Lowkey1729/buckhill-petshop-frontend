import axios from 'axios'

const client = axios.create({
    baseURL: 'https://pet-shop.buckhill.com.hr/api'
})

export default client
