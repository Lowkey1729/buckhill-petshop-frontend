import client from '@src/apis/petshop/client'
import BrandData from '@src/apis/petshop/dtos/brand'
import type { BaseFilters } from './filter.ts'

export type BrandListFilters = BaseFilters

class BrandApi {
  public async list(filters: BrandListFilters = {}): Promise<Array<BrandData>> {
    return await client
      .get('/v1/brands', {
        params: filters
      })
      .then((response) => response.data.data)
      .then<BrandData[]>((items) => items.map((item: object) => BrandData.fromJson(item)))
  }
}

export default new BrandApi()
