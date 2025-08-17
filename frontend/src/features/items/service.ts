import { BackToItem, ItemStatusToStr, type Item, type ITEM_STATUS } from "src/features/items/model";
import { api } from "src/app/api";

export const ListItemsService = async (token: string): Promise<Array<Item>> => {
    try {
        const response = await api.get(
            '/items/',
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
        const url = '/items/'

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('product_id', productID.toString())

        const response = await api.post(url, formData, config)

        return response.data.id
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const GetItemContentService = async (token: string, itemID: number): Promise<ArrayBuffer> => {
    try {
        const response = await api.get(
            `/items/${itemID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: "arraybuffer"
            }
        )

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const UpdateItemStatusService = async (token: string, itemID: number, status: ITEM_STATUS): Promise<void> => {
    try {
        await api.put(
            `/items/${itemID}`,
            {
                status: ItemStatusToStr(status)
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

export const DeleteItemService = async (token: string, itemID: number): Promise<void> => {
    try {
        await api.delete(
            `/items/${itemID}`,
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