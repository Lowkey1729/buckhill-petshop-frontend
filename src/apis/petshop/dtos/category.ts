import type ProductData from '@src/apis/petshop/dtos/product'

export default class CategoryData {
  constructor(
    public uuid: string,
    public title: string,
    public slug: string,
    public created_at: string,
    public updated_at: string,
    public products: ProductData[] = []
  ) {}

  public static fromJson(data: any): CategoryData {
    return new CategoryData(data.uuid, data.slug, data.title, data.created_at, data.updated_at)
  }
}
