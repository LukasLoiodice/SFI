import React, { useState } from "react"
import { useNavigate, Link } from "react-router";
import { getCurrentUserService, loginService } from "src/services/auth";
import { useAuthStore } from "src/stores/auth";
import { FormComponent } from "src/components/form";

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
			const user = await getCurrentUserService(token)
			localStorage.setItem("token", token)
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

				<FormComponent handler={handleLogin} buttonName="Se connecter" inputs={[
					{
						value: email,
						setValue: setEmail,
						type: "email",
						text: "Adresse email",
						required: true,
						disabled: false
					},
					{
						value: password,
						setValue: setPassword,
						type: "password",
						text: "Mot de passe",
						required: true,
						disabled: false
					}
				]} />

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