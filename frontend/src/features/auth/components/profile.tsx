import { useAuthStore } from "src/stores/auth"
import React, { useState } from "react"
import { editCurrentUserService, getCurrentUserService, deleteCurrentUserService } from "src/services/auth"
import { Navigate, useNavigate } from "react-router"
import { RoleToStr } from "src/models/users"
import { FormComponent } from "src/components/form"

export const ProfileComponent = () => {
    const [error, setError] = useState('')

    const user = useAuthStore((res) => res.user)
    const token = useAuthStore((res) => res.token)
    const setCurrentUser = useAuthStore((res) => res.setCurrentUser)
    const clearCurrentUser = useAuthStore((res) => res.clearCurrentUser)

    const navigate = useNavigate()

    const [email, setEmail] = useState(user?.email || '')
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const role = RoleToStr(user ? user.role : 0)

    if (!user || !token) {
        return <Navigate to="/login" />
    }

    const handleEditCurrentUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await editCurrentUserService(token, email, firstName, lastName)
            const user = await getCurrentUserService(token)
            setCurrentUser(token, user)
        } catch (err: any) {
            setError("Erreur lors de la modification de l'utilisatateur.");
        }
    }

    const handleDeleteCurrentUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await deleteCurrentUserService(token)
            clearCurrentUser()
            localStorage.removeItem("token")
            navigate('/')
        } catch (err: any) {
            setError("Erreur lors de la suppréssion de l'utilisatateur.");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl text-center text-emerald-700 font-bold mb-6">
                    {user.firstName} {user.lastName}
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <FormComponent handler={handleEditCurrentUser} buttonName="Modifier" inputs={[
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
                        setValue: () => { },
                        type: "text",
                        text: "Role",
                        required: false,
                        disabled: true
                    }
                ]} />
                <button
                    onClick={handleDeleteCurrentUser}
                    className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition mt-3"
                >
                    Supprimer mon compte
                </button>
            </div>
        </div>
    )
}