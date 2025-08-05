import React, { useState } from "react"
import { useNavigate, Link } from "react-router";
import { loginService, whoamiService } from "src/services/auth";
import { useAuthStore } from "src/stores/auth";

export const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
	const navigate = useNavigate()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const token = await loginService(email, password)
			const user = await whoamiService(token)
			localStorage.setItem("token",token)
			setCurrentUser(token, user)
			navigate("/");
		} catch (err: any) {
			setError("Identifiants incorrects.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-center text-emerald-700 mb-6">
					Connexion
				</h1>

				{error && (
					<div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-4">
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

					<button
						type="submit"
						className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-emerald-800 transition"
					>
						Se connecter
					</button>
				</form>

				<p className="text-center text-sm text-gray-600 mt-4">
					Pas encore inscrit ?{" "}
					<Link to="/register" className="text-emerald-700 hover:underline font-medium">
						Créer un compte
					</Link>
				</p>
			</div>
		</div>
	)
}