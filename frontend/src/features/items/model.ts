export const ITEM_STATUS_ENUM = {
    unknown: 0,
    valid: 1,
    invalid: 2,
} as const;

export type ITEM_STATUS = typeof ITEM_STATUS_ENUM[keyof typeof ITEM_STATUS_ENUM];

export interface Item {
    id: number,
    productName: number,
    status: ITEM_STATUS,
    createdBy: number,
    updatedBy: number,
    createdAt: Date,
    updatedAt: Date
}


export const StrToItemStatus = (itemStatus: string): ITEM_STATUS => {
    switch (itemStatus) {
        case 'unknown':
            return ITEM_STATUS_ENUM.unknown
        case 'valid':
            return ITEM_STATUS_ENUM.valid
        case 'invalid':
            return ITEM_STATUS_ENUM.invalid
        default:
            throw new Error(`Role ${itemStatus} is not defined`)
    }
}

export const ItemStatusToStr = (itemStatus: ITEM_STATUS): string => {
    switch (itemStatus) {
        case ITEM_STATUS_ENUM.unknown:
            return "unknown"
        case ITEM_STATUS_ENUM.valid:
            return "valid"
        case ITEM_STATUS_ENUM.invalid:
            return "invalid"
        default:
            throw new Error(`Role ${itemStatus} is not defined`)
    }
}

export const BackToItem = (item: any): Item => {
    return {
        id: item.id,
        productName: item.product_name,
        status: StrToItemStatus(item.status),
        createdBy: item.created_by,
        updatedBy: item.updated_by,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
    }
}