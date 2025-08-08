import type { JSX } from 'react'
import { Link } from 'react-router'
import logo_icon from 'src/assets/logo.png'
import user_icon from 'src/assets/user.png'
import logout_icon from 'src/assets/logout.png'
import { ROLE_ENUM } from 'src/models/users'
import { useAuthStore } from 'src/stores/auth'
import type { User } from 'src/models/users'

const NavAuthPannel = (props: { user: User | null }): JSX.Element => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const user = props.user
    const clearCurrentUser = useAuthStore((state) => state.clearCurrentUser)

    const handleLogout = async () => {
        clearCurrentUser()
        localStorage.removeItem("token")
    }

    if (isLoggedIn) {
        return (
            <>
                <Link to="/profile" className="hover:text-emerald-300 transition-colors duration-200 flex">
                    <img src={user_icon} width="30" alt="user" className='mx-3' />
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
                <Link to={"/"}>
                    Accueil
                </Link>
                {
                    user?.role == ROLE_ENUM.admin && (
                        <Link to="/admin" className="hover:text-emerald-300 transition-colors duration-200">
                            Administration
                        </Link>
                    )
                }
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
                        <img src={logo_icon} width="20" alt="logo" />
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