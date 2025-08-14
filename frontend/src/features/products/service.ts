import axios from "axios";
import { backendUrl } from "src/consts/env";
import { BackToProduct, type Product } from "src/features/products/model";

export const listProductsService = async (token: string): Promise<Array<Product>> => {
    try {
        const response = await axios.get(
            `${backendUrl}/products/`,
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
        const response = await axios.post(
            `${backendUrl}/products/`,
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
        await axios.put(
            `${backendUrl}/products/${productID}`,
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
        await axios.delete(
            `${backendUrl}/products/${productID}`,
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