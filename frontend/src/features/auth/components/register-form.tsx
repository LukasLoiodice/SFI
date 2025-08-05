import { useState } from "react"
import { Link } from "react-router"
import { registerService } from "src/services/auth"
import { useNavigate } from "react-router"

export const RegisterForm = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await registerService(email, firstName, lastName, password)
            navigate("/login")
        } catch (err: any) {
			setError("Erreur dans la création du compte.");
		}
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl text-center text-emerald-700 font-bold mb-6">
                    Créer un compte
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
                        {error}
                    </div>
                )}


                <form onSubmit={handleRegister} className="space-y-4">
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
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-emerald-800 transition">
                        Valider
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Déjà un compte ?{" "}
                        <Link to="/login" className="text-emerald-700 hover:underline font-medium">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}