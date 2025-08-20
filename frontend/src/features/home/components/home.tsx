import { Link, Navigate } from 'react-router';
import { ROLE_ENUM, RoleToStr } from 'src/features/users/model';
import { useAuthStore } from 'src/stores/auth';
import { TableComponent } from 'src/components/table';
import { useEffect, useState } from 'react';
import { ListItemsService } from 'src/features/items/service';
import { ITEM_STATUS_ENUM, ItemStatusToStr, type Item } from 'src/features/items/model';
import { ItemStatusToColor } from 'src/features/items/components/items';

const actionsByRole = {
    [ROLE_ENUM.operator]: [
        { label: 'Ajouter un produit', to: '/products', icon: '➕' },
        { label: 'Créer un item', to: '/items', icon: '🆕' },
    ],
    [ROLE_ENUM.inspector]: [
        { label: 'Voir les items à inspecter', to: '/items', icon: '🔍' },
        { label: 'Signaler un défaut', to: '/items', icon: '⚠️' },
    ],
    [ROLE_ENUM.admin]: [
        { label: 'Gérer les utilisateurs', to: '/admin', icon: '👥' },
        { label: 'Voir tous les produits', to: '/products', icon: '📦' },
    ],
};
const columns = [
    {
        key: "id",
        header: "ID",
        render: (value: number) => (
            <span className="font-mono">#{value}</span>
        ),
    },
    {
        key: "productName",
        header: "Produit",
    },
    {
        key: "status",
        header: "Statut",
        render: (_: string, row: Item) => {
            return (
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${ItemStatusToColor(row.status)} capitalize`}
                >
                    {ItemStatusToStr(row.status)}
                </span>
            )
        }
    },
];


export const HomeComponent = () => {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        if (token && user) {
            ListItemsService(token).then((res) => {
                const lastItems = user.role === ROLE_ENUM.inspector
                    ? res.filter((i) => i.status == ITEM_STATUS_ENUM.unknown).slice(0, 5)
                    : res.slice(0, 5);
                setItems(lastItems)
            })
        }
    }, [token])

    if (!user || !token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="max-w-6xl min-h-screen mx-auto p-8 space-y-12">
            <header>
                <h1 className="text-3xl font-extrabold mb-2 text-gray-900">
                    Bienvenue, <span className="text-emerald-600">{user.firstName}</span> !
                </h1>
                <p className="text-lg text-gray-700 italic">
                    Rôle : <span className="font-semibold">{RoleToStr(user.role)}</span>
                </p>
                <p className="mt-3 max-w-xl text-gray-600">
                    {user.role === ROLE_ENUM.operator &&
                        'Vous pouvez gérer les produits et les items depuis le menu ci-dessous.'}
                    {user.role === ROLE_ENUM.inspector &&
                        'Consultez les items à inspecter et signalez les défauts rapidement.'}
                    {user.role === ROLE_ENUM.admin &&
                        'Gérez les utilisateurs et visualisez tous les produits de la plateforme.'}
                    {user.role === ROLE_ENUM.user &&
                        'Consultez les items à inspecter'}
                </p>
            </header>

            {user.role != ROLE_ENUM.user && (
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Actions principales</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {(actionsByRole[user.role] || []).map((action) => (
                            <Link
                                key={action.label}
                                to={action.to}
                                className="flex items-center justify-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md px-6 py-4 transition-colors duration-200"
                            >
                                <span className="text-2xl">{action.icon}</span>
                                <span>{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}


            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {user.role === ROLE_ENUM.inspector ? 'Items à inspecter' : 'Derniers items ajoutés'}
                </h2>
                {items.length === 0 ? (
                    <p className="text-gray-500 italic">Aucun item à afficher.</p>
                ) : (
                    <TableComponent
                        columns={columns}
                        data={items}
                        rowKey={(row) => row.id}
                    />
                )}
            </section>
        </div>
    );
}
