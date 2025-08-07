import { useAuthStore } from "src/stores/auth"
import React, { useState } from "react"
import { editCurrentUserService, getCurrentUserService, deleteCurrentUserService } from "src/services/auth"
import { useNavigate } from "react-router"
import { RoleToStr } from "src/models/users"

export const ProfileComponent = () => {
    const [error, setError] = useState('')

    const user = useAuthStore((res) => res.user)
    const token = useAuthStore((res) => res.token)
    const setCurrentUser = useAuthStore((res) => res.setCurrentUser)
    const clearCurrentUser = useAuthStore((res) => res.clearCurrentUser)

    const navigate = useNavigate()

    if (user && token) {
        const [email, setEmail] = useState(user.email)
        const [firstName, setFirstName] = useState(user.firstName)
        const [lastName, setLastName] = useState(user.lastName)
        const role = RoleToStr(user.role)

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

                    <form onSubmit={handleEditCurrentUser} className="space-y-4">
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                disabled
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-100"
                                value={role}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-emerald-800 transition"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={handleDeleteCurrentUser}
                            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                            Supprimer mon compte
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}