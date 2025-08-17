import { useAuthStore } from "src/stores/auth"
import { DeleteItemService, ListItemsService } from "src/features/items/service"
import React, { useEffect, useState } from "react"
import { ITEM_STATUS_ENUM, ItemStatusToStr, type Item, type ITEM_STATUS } from "src/features/items/model"
import { ROLE_ENUM } from "src/features/users/model"
import { TableComponent } from "src/components/table"
import { ModalComponent } from "src/components/modal"
import { ItemForm } from "./item-form"
import { useNavigate } from "react-router"

const ItemStatusToColor = (status: ITEM_STATUS): string => {
    switch (status) {
        case ITEM_STATUS_ENUM.unknown:
            return "bg-yellow-100 text-yellow-800"
        case ITEM_STATUS_ENUM.valid:
            return "bg-green-100 text-green-800"
        case ITEM_STATUS_ENUM.invalid:
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-black"
    }
}

export const ItemsPage = () => {
    const token = useAuthStore((res) => res.token)
    const user = useAuthStore((res) => res.user)

    const [items, setItems] = useState<Array<Item>>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [IsAdding, setIsAdding] = useState<Boolean>(false)

    const canUserEdit = user?.role == ROLE_ENUM.admin || user?.role == ROLE_ENUM.operator

    const navigate = useNavigate()


    const loadItems = async () => {
        if (token) {
            ListItemsService(token).then((res) => {
                setItems(res)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        loadItems()
    }, [token])

    const handleDeleteItem = async (e: React.FormEvent, item: Item) => {
        e.preventDefault()
        e.stopPropagation()

        if (token) {
            await DeleteItemService(token, item.id)
            await loadItems()
        }
    }

    const handleAddItem = async () => {
        await loadItems()
        setIsAdding(false)
    }

    const handleRowClick = async (item: Item) => {
        navigate(`/items/${item.id}`)
    }

    const columns = [
        {
            key: "id",
            header: "ID"
        },
        {
            key: "productName",
            header: "Produit",
        },
        {
            key: "status",
            header: "Statut",
            render: (_: string, row: Item) => {
                return (
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${ItemStatusToColor(row.status)} capitalize`}
                    >
                        {ItemStatusToStr(row.status)}
                    </span>
                )
            }
        },
        {
            key: "createdAt",
            header: "Création",
            render: (_: string, row: Item) => {
                return row.createdAt.toLocaleDateString()
            }
        },
        {
            key: "UpdatedAt",
            header: "Modification",
            render: (_: string, row: Item) => {
                return row.createdAt.toLocaleDateString()
            }
        },
        {
            key: "",
            header: "",
            render: (_: any, row: Item) => {
                if (canUserEdit) {
                    return (
                        <button
                            className="text-red-700 hover:underline"
                            onClick={(e: React.FormEvent) => { handleDeleteItem(e, row) }}
                        >
                            Supprimer
                        </button>
                    )
                }
            }
        }
    ]
    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center">Liste des articles</h1>
                {canUserEdit && (
                    <button onClick={() => { setIsAdding(true) }} className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md px-3 py-3 transition-colors duration-200">
                        Ajouter un article
                    </button>
                )}
            </div>

            {isLoading ? (
                <p>Chargement...</p>
            ) : (
                <TableComponent
                    columns={columns}
                    data={items}
                    rowKey={(u) => u.id}
                    onRowClick={handleRowClick}
                />
            )}

            {IsAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <ModalComponent
                        title={"Ajouter un article"}
                        isClosable={true}
                        onClose={() => setIsAdding(false)}
                    >
                        <ItemForm handler={handleAddItem} />
                    </ModalComponent>
                </div>
            )}
        </div >
    )
}