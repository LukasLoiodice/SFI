import type { JSX } from 'react'
import { Link } from 'react-router'
import logoIcon from 'src/assets/logo.png'
import userIcon from 'src/assets/user.png'
import logout_icon from 'src/assets/logout.png'
import { ROLE_ENUM } from 'src/features/users/model'
import { useAuthStore } from 'src/stores/auth'
import type { User } from 'src/features/users/model'

const NavAuthPannel = (props: { user: User | null }): JSX.Element => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const user = props.user
    const clearCurrentUser = useAuthStore((state) => state.clearCurrentUser)

    const handleLogout = async () => {
        clearCurrentUser()
    }

    if (isLoggedIn) {
        return (
            <>
                <Link to="/profile" className="hover:text-emerald-300 transition-colors duration-200 flex">
                    <img src={userIcon} width="30" alt="user" className='mx-3' />
                    {user?.firstName} {user?.lastName}
                </Link>
                <Link to="/" onClick={handleLogout}>
                    <img src={logout_icon} width={34} alt="logout" />
                </Link>
            </>
        )
    }

    return (
        <>
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
        </>
    )
}

const NavContextPannel = (props: { user: User | null }) => {
    const user = props.user

    if (user) {
        return (
            <>
                <Link to={"/"} className="hover:text-emerald-300 transition-colors duration-200">
                    Accueil
                </Link>
                {
                    user.role == ROLE_ENUM.admin && (
                        <Link to="/admin" className="hover:text-emerald-300 transition-colors duration-200">
                            Administration
                        </Link>
                    )
                }
                <Link to="/products">
                    Produits
                </Link>
                <Link to="/items">
                    Articles
                </Link>
            </>
        )
    }
}

export const NavLayout = () => {
    const user = useAuthStore((state) => state.user)

    return (
        <nav className="bg-emerald-700 text-white px-6 py-4 shadow-md">
            <div className="mx-auto flex items-center justify-between">
                <div className='flex space-x-6'>
                    <Link to="/" className="text-2xl font-bold tracking-wide">
                        <img src={logoIcon} width="20" alt="logo" />
                    </Link>

                    <NavContextPannel user={user}/>
                </div>

                <div className="space-x-6 text-lg font-medium flex items-center">
                    <NavAuthPannel user={user}/>
                </div>
            </div>
        </nav>
    )
}