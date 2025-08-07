import axios from "axios";
import { backendUrl } from "src/consts/env";
import type { User } from "src/models/users";

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
                role: backUser.role
            })
        });

        return users
    } catch (error: any) {
        throw new Error("listUsersService error")
    }
}