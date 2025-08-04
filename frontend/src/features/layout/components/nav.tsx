import logo from '../../../assets/logo.png'
import { Link } from 'react-router'

export const NavLayout = () => {

    return (
        <nav className="bg-emerald-700 text-white px-6 py-4 shadow-md">
            <div className="mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    <img src={logo} width="20" alt="React logo" />
                </Link>

                <div className="space-x-6 text-lg font-medium">
                    <Link
                        to="/login"
                        className="hover:text-emerald-300 transition-colors duration-200"
                    >
                        Connexion
                    </Link>
                    <Link
                        to="/register"
                        className="hover:text-emerald-300 transition-colors duration-200"
                    >
                        Inscription
                    </Link>
                </div>
            </div>
        </nav>
    )
}