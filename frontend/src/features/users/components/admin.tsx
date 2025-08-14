import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { ROLE_ENUM, type User } from "src/features/users/model";
import { listUsersService } from "src/features/users/service";
import { useAuthStore } from "src/stores/auth";
import { AdminUpdateUser } from "./admin-updateUser";
import { RoleToStr } from "src/features/users/model";
import { TableComponent } from "src/components/table";
import { ModalComponent } from "src/components/modal";

export const AdminComponent = () => {
    const user = useAuthStore((res) => res.user)
    const token = useAuthStore((res) => res.token)

    const [users, setUsers] = useState<Array<User>>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

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

    const userHandler = () => {
        loadUsers()
        setSelectedUser(null)
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role != ROLE_ENUM.admin) {
        return <Navigate to="/" />;
    }

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
                <button
                    className="text-emerald-700 hover:underline"
                    onClick={() => setSelectedUser(row)}
                >
                    Modifier
                </button>
            ),
        },
    ]

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
            )}

            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <ModalComponent
                        title="Modifier l'utilisateur"
                        isClosable={true}
                        onClose={() => setSelectedUser(null)}
                    >
                        <AdminUpdateUser user={selectedUser} handler={userHandler} />
                    </ModalComponent>
                </div>
            )}
        </div >
    );
}