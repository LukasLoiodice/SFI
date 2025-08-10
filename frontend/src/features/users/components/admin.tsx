import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { ROLE_ENUM, type User } from "src/models/users";
import { listUsersService } from "src/services/users";
import { useAuthStore } from "src/stores/auth";
import { Link } from "react-router";
import { RoleToStr } from "src/models/users";
import { TableComponent } from "src/components/table";

const columns = [
    {
        key: "email",
        header: "Email",
    },
    {
        key: "firstName",
        header: "First name",
    },
    {
        key: "lastName",
        header: "Last name",
    },
    {
        key: "role",
        header: "Rôle",
        render: (_: string, row: User) => (
            <span className="capitalize">{RoleToStr(row.role)}</span>
        ),
    },
    {
        key: "actions",
        header: "",
        render: (_: any, row: User) => (
            <Link
                to={`/admin/${row.id}`}
                className="text-emerald-700 hover:underline"
            >
                Modifier
            </Link>
        ),
    },
];

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
                <TableComponent
                    columns={columns}
                    data={users}
                    rowKey={(u) => u.id}
                />
            )
            }
        </div >
    );
}