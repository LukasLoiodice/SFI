import { useAuthStore } from "src/stores/auth"
import { useState } from "react"

export const ProfileComponent = () => {
    const user = useAuthStore((res) => res.user)

    if (user) {
        const [email, setEmail] = useState(user.email)
        const [firstName, setFirstName] = useState(user.firstName)
        const [lastName, setLastName] = useState(user.lastName)

        return (
            <div className="min-h-screen flex justify-center items-center px-4">
                <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                    <h1 className="text-2xl text-center text-emerald-700 font-bold mb-6">
                        {firstName} {lastName}
                    </h1>

                    <form onSubmit={() => { }} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Adresse email
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    </form>
                </div>
            </div>
        )
    }
}