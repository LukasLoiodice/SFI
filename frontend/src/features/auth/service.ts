import axios from "axios";
import { backendUrl } from "src/consts/env";
import { StrToRole, type User } from "src/features/users/model";



export async function loginService(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(
      `${backendUrl}/login`,
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token
  } catch (error: any) {
    throw new Error(error.response.data.detail)
  }
}

export async function registerService(user: User, password: string): Promise<void> {
  try {
    await axios.post(
      `${backendUrl}/register`,
      {
        "email": user.email,
        "first_name": user.firstName,
        "last_name": user.lastName,
        "password": password
      }
    )

    return
  } catch (error: any) {
    throw new Error(error.response.data.detail)
  }
}

export async function getCurrentUserService(token: string): Promise<User> {
  try {
    const response = await axios.get(
      `${backendUrl}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )


    const user_back = response.data

    const user: User = {
      id: user_back.id,
      email: user_back.email,
      firstName: user_back.first_name,
      lastName: user_back.last_name,
      role: StrToRole(user_back.role)
    }

    return user
  } catch (error: any) {
    throw new Error(error.response.data.detail)
  }
}

export async function editCurrentUserService(token: string, email: string, firstName: string, lastName: string): Promise<void> {
  try {
    await axios.put(
      `${backendUrl}/me`,
      {
        email: email,
        first_name: firstName,
        last_name: lastName
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

export async function deleteCurrentUserService(token: string): Promise<void> {
  try {
    await axios.delete(
      `${backendUrl}/me`,
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