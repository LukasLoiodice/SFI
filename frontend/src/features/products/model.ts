export interface Product {
    id: number;
    name: string;
    description: string;
    photoUri: string;
}

export const BackToProduct = (product: any): Product => {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        photoUri: product.photo_uri
    }
}