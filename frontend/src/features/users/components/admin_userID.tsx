import { useAuthStore } from "src/stores/auth";
import React, { useEffect, useState } from "react";
import { deleteUserService, getUserService } from "src/services/users";
import { RoleToStr } from "src/models/users";
import { updateUserService } from "src/services/users";
import { useNavigate } from "react-router";

export const AdminUserIDComponent = (props: {userID: string | undefined}) => {
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

                <form onSubmit={handleEditUser} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            required
                            disabled
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-100"
                            value={email}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Nom
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Role
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-emerald-800 transition"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={handleDeleteUser}
                        className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                        Supprimer
                    </button>
                </form>
            </div>
        </div>
    )
}