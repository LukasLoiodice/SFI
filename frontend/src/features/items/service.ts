import axios from "axios";
import { backendUrl } from "src/consts/env";
import { BackToItem, ItemStatusToStr, type Item, type ITEM_STATUS } from "src/features/items/model";

export const ListItemsService = async (token: string): Promise<Array<Item>> => {
    try {
        const response = await axios.get(
            `${backendUrl}/items/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const backItems = response.data.items

        const items = Array<Item>()
        backItems.forEach((backItem: any) => {
            items.push(BackToItem(backItem))
        });

        return items
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const AddItemService = async (token: string, file: File, productID: number): Promise<number> => {
    try {
        const url = `${backendUrl}/items/`

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('product_id', productID.toString())

        const response = await axios.post(url, formData, config)

        return response.data.id
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const GetItemContentService = async (token: string, itemID: number): Promise<void> => {
    try {
        const response = await axios.get(
            `${backendUrl}/items/${itemID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log(response.data)

        return
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const UpdateItemStatusService = async (token: string, itemID: number, status: ITEM_STATUS): Promise<void> => {
    try {
        await axios.put(
            `${backendUrl}/items/${itemID}`,
            ItemStatusToStr(status),
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

export const DeleteItemService = async (token: string, itemID: number): Promise<void> => {
    try {
        await axios.delete(
            `${backendUrl}/items/${itemID}`,
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