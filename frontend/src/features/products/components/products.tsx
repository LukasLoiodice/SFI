import { useEffect, useState } from "react"
import { ModalComponent } from "src/components/modal"
import { TableComponent } from "src/components/table"
import type { Product } from "src/features/products/model"
import { listProductsService } from "src/features/products/service"
import { useAuthStore } from "src/stores/auth"
import { ProductForm } from "./product-form"
import type { ProductFormAction } from "./product-form"
import { ROLE_ENUM } from "src/features/users/model"

export const ProductsPage = () => {
    const token = useAuthStore((res) => res.token)
    const user = useAuthStore((res) => res.user)

    const [products, setProducts] = useState<Array<Product>>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<{ product: Product | null, action: ProductFormAction }>({ product: null, action: 'create' })

    const canUserEdit = user?.role == ROLE_ENUM.admin || user?.role == ROLE_ENUM.operator

    const loadProducts = async () => {
        if (token) {
            listProductsService(token).then((res) => {
                setProducts(res)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        loadProducts()
    }, [token])

    const addProductHandler = () => {
        const emptyProduct: Product = {
            id: -1,
            name: '',
            description: '',
            photoUri: ''
        }
        setSelectedProduct({ product: emptyProduct, action: 'create' })
    }

    const closeHandler = async () => {
        await loadProducts()
        setSelectedProduct({ product: null, action: 'create' })
    }

    const columns = [
        {
            key: "id",
            header: "ID"
        },
        {
            key: "name",
            header: "Nom",
        },
        {
            key: "description",
            header: "Description",
        },
        {
            key: "photoUri",
            header: "Photo",
            render: (_: string, row: Product) => {
                if (row.photoUri) {
                    return (
                        <img src={row.photoUri} style={{ maxWidth: 1000, maxHeight: 50, objectFit: "contain" }} />
                    )
                }
            }
        },
        {
            key: "actions",
            header: "",
            render: (_: any, row: Product) => {
                if (canUserEdit) {
                    return (
                        <button
                            className="text-emerald-700 hover:underline"
                            onClick={() => setSelectedProduct({ product: row, action: 'edit' })}
                        >
                            Modifier
                        </button>
                    )
                }
            }
        },
    ]

    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center">Liste des produits</h1>
                {canUserEdit && (
                    <button onClick={addProductHandler} className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md px-3 py-3 transition-colors duration-200">
                        Ajouter un produit
                    </button>
                )}
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <TableComponent
                    columns={columns}
                    data={products}
                    rowKey={(u) => u.id}
                />
            )}

            {selectedProduct.product && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <ModalComponent
                        title={selectedProduct.action == 'create' ? "Ajouter un produit" : "Modifier le produit"}
                        isClosable={true}
                        onClose={() => setSelectedProduct({ product: null, action: 'create' })}
                    >
                        <ProductForm product={selectedProduct.product} action={selectedProduct.action} handler={closeHandler} />
                    </ModalComponent>
                </div>
            )}
        </div >
    )
}