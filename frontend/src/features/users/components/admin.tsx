import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { ROLE_ENUM, type User } from "src/models/users";
import { listUsersService } from "src/services/users";
import { useAuthStore } from "src/stores/auth";
import { Link } from "react-router";
import { RoleToStr } from "src/models/users";

export const AdminComponent = () => {
    const user = useAuthStore((res) => res.user)
    const token = useAuthStore((res) => res.token)

    const [users, setUsers] = useState<Array<User>>([])
    const [loading, setLoading] = useState<boolean>(true);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role != ROLE_ENUM.admin) {
        return <Navigate to="/" />;
    }

    const loadUsers = () => {
        if (token) {
            listUsersService(token)
                .then((res) => {
                    setUsers(res)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        loadUsers()
    }, [token])

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-emerald-700">
                        <thead className="bg-emerald-700 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">First name</th>
                                <th className="px-4 py-2 text-left">Last name</th>
                                <th className="px-4 py-2 text-left">Rôle</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="px-4 py-2">{u.email}</td>
                                    <td className="px-4 py-2">{u.firstName}</td>
                                    <td className="px-4 py-2">{u.lastName}</td>
                                    <td className="px-4 py-2 capitalize">{RoleToStr(u.role)}</td>
                                    <td>
                                        <Link to={`/admin/${u.id}`}>
                                            Modifier
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <p className="mt-4 text-gray-500">Aucun utilisateur trouvé.</p>
                    )}
                </div>
            )
            }
        </div >
    );
}