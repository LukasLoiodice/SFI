import { useAuthStore } from "src/stores/auth";
import React, { useEffect, useState } from "react";
import { deleteUserService, getUserService } from "src/services/users";
import { RoleToStr } from "src/models/users";
import { updateUserService } from "src/services/users";
import { useNavigate } from "react-router";
import { FormComponent } from "src/components/form";

export const AdminUserIDComponent = (props: { userID: string | undefined }) => {
    const userID = props.userID

    const token = useAuthStore((res) => res.token)

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (token && userID) {
            getUserService(token, parseInt(userID)).then((user) => {
                setEmail(user.email)
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setRole(RoleToStr(user.role))
            })
        }
    }, [token])

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (token && userID) {
                await updateUserService(token, parseInt(userID), firstName, lastName, role)
                navigate('/admin')
            }
        } catch (error) {
            setError("Erreur lors de la modification de l'utilisateur.")
        }
    }

    const handleDeleteUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (token && userID) {
                await deleteUserService(token, parseInt(userID))
                navigate('/admin')
            }
        } catch (error) {
            setError("Erreur lors de la modification de l'utilisateur.")
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl text-center text-emerald-700 font-bold mb-6">
                    Modifier l'utilisateur
                </h1>

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
            </div>
        </div>
    )
}