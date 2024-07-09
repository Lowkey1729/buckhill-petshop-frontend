import client from '@src/apis/petshop/client'
import CategoryData from '@src/apis/petshop/dtos/category'
import type { BaseFilters } from './filter.ts'

export type CategoryListFilters = BaseFilters

class CategoryApi {
  public async details(uuid: string): Promise<CategoryData> {
    return await client
      .get(`/v1/category/${uuid}`)
      .then((response) => response.data.data)
      .then<CategoryData>((item) => CategoryData.fromJson(item))
  }
  public async all(filters: CategoryListFilters = {}): Promise<Array<CategoryData>> {
    return await client
      .get('/v1/categories', { params: filters })
      .then((response) => response.data.data)
      .then<CategoryData[]>((items) => items.map((item: object) => CategoryData.fromJson(item)))
  }
}

export default new CategoryApi()
