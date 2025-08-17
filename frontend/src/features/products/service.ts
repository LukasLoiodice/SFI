import { BackToProduct, type Product } from "src/features/products/model";
import { api } from "src/app/api";

export const listProductsService = async (token: string): Promise<Array<Product>> => {
    try {
        const response = await api.get(
            '/products/',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const backProducts = response.data.products

        const products = Array<Product>()
        backProducts.forEach((backProduct: any) => {
            products.push(BackToProduct(backProduct))
        });

        return products
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const addProductService = async (token: string, name: string, description: string, photoUri: string): Promise<Product> => {
    try {
        const response = await api.post(
            '/products/',
            {
                name: name,
                description: description,
                photo_uri: photoUri
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const backProduct = response.data.product

        return BackToProduct(backProduct)
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const editProductService = async (token: string, productID: number, name: string, description: string, photoUri: string): Promise<void> => {
    try {
        await api.put(
            `/products/${productID}`,
            {
                name: name,
                description: description,
                photo_uri: photoUri
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const deleteProductService = async (token: string, productID: number): Promise<void> => {
    try {
        await api.delete(
            `/products/${productID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}