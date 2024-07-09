import client from '@src/apis/petshop/client'
import ProductData from '@src/apis/petshop/dtos/product'
import type { BaseFilters } from './filter.ts'

export type ProductListFilters = BaseFilters & {
  category?: string
  price?: number
  brand?: string
  title?: string
}

class ProductApi {
  public async details(uuid: string): Promise<ProductData> {
    return await client
      .get(`/v1/product/${uuid}`)
      .then((response) => response.data.data)
      .then<ProductData>((item) => ProductData.fromJson(item))
  }
  public async all(filters: ProductListFilters = {}): Promise<Array<ProductData>> {
    return await client
      .get('/v1/products', {
        params: filters
      })
      .then((response) => response.data.data)
      .then<ProductData[]>((items) => items.map((item: object) => ProductData.fromJson(item)))
  }
}

export default new ProductApi()
