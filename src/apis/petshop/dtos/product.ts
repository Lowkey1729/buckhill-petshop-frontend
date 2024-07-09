import type BrandData from '@src/apis/petshop/dtos/brand'
import type CategoryData from '@src/apis/petshop/dtos/category'

type ProductMetaData = {
    brand: string
    image: string
}

export default class ProductData {
    constructor(
        public uuid: string,
        public category_uuid: string,
        public title: string,
        public price: number,
        public category: CategoryData,
        public metadata: ProductMetaData,
        public description?: string,
        public brand?: BrandData | null
    ) {
    }

    public get image(): string {
        return `https://pet-shop.buckhill.com.hr/api/v1/file/${this.metadata.image}`
    }

    public static fromJson(data: any): ProductData {
        return new ProductData(
            data.uuid,
            data.category_uuid,
            data.title,
            data.price,
            data.category,
            data.metadata,
            data.description,
            data.brand
        )
    }
}
