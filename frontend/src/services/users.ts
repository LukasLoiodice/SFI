import axios from "axios";
import { backendUrl } from "src/consts/env";
import type { User } from "src/models/users";
import { StrToRole } from "src/models/users";

export const listUsersService = async (token: string): Promise<Array<User>> => {
    try {
        const response = await axios.get(
            `${backendUrl}/users/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const backUsers = response.data.users

        const users = Array<User>()
        backUsers.forEach((backUser: any) => {
            users.push({
                id: backUser.id,
                email: backUser.email,
                firstName: backUser.first_name,
                lastName: backUser.last_name,
                role: StrToRole(backUser.role)
            })
        });

        return users
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const getUserService = async (token: string, userID: number): Promise<User> => {
    try {
        const res = await axios.get(
            `${backendUrl}/users/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const backUser = res.data.user
        const user = {
            id: backUser.id,
            email: backUser.email,
            firstName: backUser.first_name,
            lastName: backUser.last_name,
            role: StrToRole(backUser.role)
        }

        return user
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const deleteUserService = async (token: string, userID: number): Promise<void> => {
    try {
        await axios.delete(
            `${backendUrl}/users/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}

export const updateUserService = async (token: string, id: number, firstName: string, lastName: string, role: string): Promise<void> => {
    try {
        await axios.put(
            `${backendUrl}/users/${id}`,
            {
                first_name: firstName,
                last_name: lastName,
                role: role
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return
    } catch (error: any) {
        throw new Error(error.response.data.detail)
    }
}