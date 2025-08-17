import { StrToRole, type User } from "src/features/users/model";
import { api } from "src/app/api";


export async function loginService(email: string, password: string): Promise<string> {
  try {
    const response = await api.post(
      '/login',
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
    await api.post(
      '/register',
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
    const response = await api.get(
      '/me',
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
    await api.put(
      '/me',
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
    await api.delete(
      '/me',
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