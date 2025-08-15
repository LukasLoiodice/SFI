import React, { useState } from "react"
import { FormComponent } from "src/components/form"
import { useAuthStore } from "src/stores/auth"
import { AddItemService } from "../service"

export const ItemForm = (props: {handler: () => void }) => {
    const handler = props.handler

    const token = useAuthStore((state) => state.token)

    const [file, setFile] = useState<File>()
    const [productID, setProductID] = useState('')
    const [error, setError] = useState('')

    const handleCreateItem = async (e: React.FormEvent) => {
        e.preventDefault()

        if (token && file) {
            try {
                await AddItemService(token, file, parseInt(productID))
                handler()
            } catch (err: any) {
                setError(err.message)
            }
        }
    }
    return (
        <>
            {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
                    {error}
                </div>
            )}

            <FormComponent handler={handleCreateItem} buttonName="Créer" inputs={[
                {
                    value: file,
                    setValue: setFile,
                    type: "file",
                    text: "Fichier",
                    required: true,
                    disabled: false
                },
                {
                    value: productID,
                    setValue: setProductID,
                    type: "text",
                    text: "Identifiant du produit",
                    required: true,
                    disabled: false
                }
            ]} />
        </>
    )
}