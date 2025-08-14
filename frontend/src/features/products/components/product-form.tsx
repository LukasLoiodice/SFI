import { useAuthStore } from "src/stores/auth";
import React, { useState } from "react";
import { FormComponent } from "src/components/form";
import type { Product } from "src/features/products/model";
import { addProductService, deleteProductService, editProductService } from "src/features/products/service";

export type ProductFormAction = 'create' | 'edit'

export const ProductForm = (props: { product: Product, action: ProductFormAction, handler: () => void }) => {
    const product = props.product
    const handler = props.handler
    const action = props.action

    const token = useAuthStore((res) => res.token)

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [photoUri, setPhotoUri] = useState(product.photoUri)
    const [error, setError] = useState('')

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (token) {
                await addProductService(token, name, description, photoUri)
                handler()
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleEditProduct = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (token) {
                await editProductService(token, product.id, name, description, photoUri)
                handler()
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleDeleteProduct = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (token) {
                await deleteProductService(token, product.id)
                handler()
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <>
            {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
                    {error}
                </div>
            )}

            <FormComponent handler={(e: React.FormEvent) => { action == 'create' ? handleCreateProduct(e) : handleEditProduct(e) }} buttonName={action == 'create' ? 'Créer' : 'Modifier'} inputs={[
                {
                    value: name,
                    setValue: setName,
                    type: "text",
                    text: "Nom",
                    required: true,
                    disabled: false
                },
                {
                    value: description,
                    setValue: setDescription,
                    type: "text",
                    text: "Description",
                    required: false,
                    disabled: false
                },
                {
                    value: photoUri,
                    setValue: setPhotoUri,
                    type: "url",
                    text: "Lien de la photo",
                    required: false,
                    disabled: false
                }
            ]} />

            {action == 'edit' && (
                <button
                    onClick={handleDeleteProduct}
                    className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition mt-3"
                >
                    Supprimer
                </button>
            )}
        </>
    )
}