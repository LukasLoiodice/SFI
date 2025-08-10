import { useAuthStore } from "src/stores/auth";
import React, { useState } from "react";
import { deleteUserService } from "src/services/users";
import { RoleToStr } from "src/models/users";
import { updateUserService } from "src/services/users";
import { FormComponent } from "src/components/form";
import type { User } from "src/models/users";

export const AdminUpdateUser = (props: { user: User, handler: () => void }) => {
    const user = props.user
    const handler = props.handler

    const token = useAuthStore((res) => res.token)

    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [role, setRole] = useState<string>(RoleToStr(user.role))
    const [error, setError] = useState('')

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (token) {
                await updateUserService(token, user.id, firstName, lastName, role)
                handler()
            }
        } catch (error) {
            setError("Erreur lors de la modification de l'utilisateur.")
        }
    }

    const handleDeleteUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (token) {
                await deleteUserService(token, user.id)
                handler()
            }
        } catch (error) {
            setError("Erreur lors de la modification de l'utilisateur.")
        }
    }

    return (
        <>
            {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
                    {error}
                </div>
            )}

            <FormComponent handler={handleEditUser} buttonName="Modifier" inputs={[
                {
                    value: email,
                    setValue: setEmail,
                    type: "email",
                    text: "Adresse email",
                    required: false,
                    disabled: true
                },
                {
                    value: firstName,
                    setValue: setFirstName,
                    type: "text",
                    text: "Prénom",
                    required: true,
                    disabled: false
                },
                {
                    value: lastName,
                    setValue: setLastName,
                    type: "text",
                    text: "Nom",
                    required: true,
                    disabled: false
                },
                {
                    value: role,
                    setValue: setRole,
                    type: "text",
                    text: "Role",
                    required: true,
                    disabled: false
                }
            ]} />

            <button
                onClick={handleDeleteUser}
                className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition mt-3"
            >
                Supprimer
            </button>
        </>
    )
}