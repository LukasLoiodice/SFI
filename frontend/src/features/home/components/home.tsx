import { Link, Navigate } from 'react-router';
import { ROLE_ENUM, RoleToStr } from 'src/models/users';
import { useAuthStore } from 'src/stores/auth';
import { TableComponent } from 'src/components/table';

const actionsByRole = {
    [ROLE_ENUM.operator]: [
        { label: 'Ajouter un produit', to: '/add-product', icon: '➕' },
        { label: 'Créer un item', to: '/create-item', icon: '🆕' },
    ],
    [ROLE_ENUM.inspector]: [
        { label: 'Voir les items à inspecter', to: '/items-to-inspect', icon: '🔍' },
        { label: 'Signaler un défaut', to: '/report-defect', icon: '⚠️' },
    ],
    [ROLE_ENUM.admin]: [
        { label: 'Gérer les utilisateurs', to: '/manage-users', icon: '👥' },
        { label: 'Voir tous les produits', to: '/all-products', icon: '📦' },
    ],
};

type Item = {
    id: number;
    product: string;
    status: string;
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
        key: "product",
        header: "Produit",
    },
    {
        key: "status",
        header: "Statut",
        render: (value: string) => (
            <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${value === "Validé"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                    }`}
            >
                {value}
            </span>
        ),
    },
];


export const HomeComponent = () => {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    if (!user || !token) {
        return <Navigate to="/login" />
    }

    const items = [
        { id: 1052, product: 'Rotor hélico', toInspect: true, status: 'En attente' },
        { id: 1024, product: 'Câble A320', toInspect: false, status: 'Validé' },
        { id: 1023, product: 'Visserie avion', toInspect: false, status: 'Validé' },
        { id: 1019, product: 'Batterie drone', toInspect: false, status: 'Validé' },
        { id: 1017, product: 'Écran tactile', toInspect: false, status: 'Validé' },
        { id: 1008, product: 'Sonde température', toInspect: false, status: 'Validé' },
    ];

    const lastItems: Item[] =
        user.role === ROLE_ENUM.inspector
            ? items.filter((i) => i.toInspect).slice(0, 5)
            : items.slice(0, 5);

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
                {lastItems.length === 0 ? (
                    <p className="text-gray-500 italic">Aucun item à afficher.</p>
                ) : (
                    <TableComponent
                        columns={columns}
                        data={lastItems}
                        rowKey={(row) => row.id} 
                    />
                )}
            </section>
        </div>
    );
}
