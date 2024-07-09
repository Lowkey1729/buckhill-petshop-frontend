export default class BrandData {
  constructor(
    public uuid: string,
    public title: string,
    public slug: string,
    public created_at: string,
    public updated_at: string
  ) {}

  public static fromJson(data: any): BrandData {
    return new BrandData(data.uuid, data.title, data.slug, data.created_at, data.updated_at)
  }
}
