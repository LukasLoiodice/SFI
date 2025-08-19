import { useAuthStore } from "src/stores/auth"
import React, { useState } from "react"
import { editCurrentUserService, getCurrentUserService, deleteCurrentUserService } from "src/features/auth/service"
import { Navigate, useNavigate } from "react-router"
import { RoleToStr } from "src/features/users/model"
import { FormComponent } from "src/components/form"
import { ModalComponent } from "src/components/modal"

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
            setError(err.message);
        }
    }

    const handleDeleteCurrentUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await deleteCurrentUserService(token)
            clearCurrentUser()
            navigate('/')
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <ModalComponent title={`${user.firstName} ${user.lastName}`} isClosable={false}>
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
            </ModalComponent>
        </div >
    )
}