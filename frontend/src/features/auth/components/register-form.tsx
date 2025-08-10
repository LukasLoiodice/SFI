import { useState } from "react"
import { Link } from "react-router"
import { registerService } from "src/services/auth"
import { useNavigate } from "react-router"
import { ROLE_ENUM, type User } from "src/models/users"
import { FormComponent } from "src/components/form"
import { ModalComponent } from "src/components/modal"

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
            const user: User = {
                id: 0,
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: ROLE_ENUM.user
            }
            await registerService(user, password)
            navigate("/login")
        } catch (err: any) {
            setError("Erreur dans la création du compte.");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <ModalComponent title="Créer un compte" isClosable={false}>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <FormComponent handler={handleRegister} buttonName="Valider" inputs={[
                    {
                        value: email,
                        setValue: setEmail,
                        type: "email",
                        text: "Adresse email",
                        required: true,
                        disabled: false
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
                        value: password,
                        setValue: setPassword,
                        type: "password",
                        text: "Mot de passe",
                        required: true,
                        disabled: false
                    }
                ]} />


                <p className="text-center text-sm text-gray-600 mt-4">
                    Déjà un compte ?{" "}
                    <Link to="/login" className="text-emerald-700 hover:underline font-medium">
                        Se connecter
                    </Link>
                </p>
            </ModalComponent>
        </div>
    )
}