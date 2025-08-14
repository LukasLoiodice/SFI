export const ROLE_ENUM = {
    user: 0,
    operator: 1,
    inspector: 2,
    admin: 3,
} as const;

export type ROLE = typeof ROLE_ENUM[keyof typeof ROLE_ENUM];

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: ROLE;
}

export const StrToRole = (role: string): ROLE => {
    switch (role) {
        case 'user':
            return ROLE_ENUM.user
        case 'operator':
            return ROLE_ENUM.operator
        case 'inspector':
            return ROLE_ENUM.inspector
        case 'admin':
            return ROLE_ENUM.admin
        default:
            throw new Error(`Role ${role} is not defined`)
    }
}

export const RoleToStr = (role: ROLE): string => {
    switch (role) {
        case ROLE_ENUM.user:
            return "user"
        case ROLE_ENUM.operator:
            return "operator"
        case ROLE_ENUM.inspector:
            return "inspector"
        case ROLE_ENUM.admin:
            return "admin"
        default:
            throw new Error(`Role ${role} is not defined`)
    }
}