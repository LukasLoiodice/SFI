import axios from "axios";
import { backendUrl } from "src/consts/env";
import type { User } from "src/models/user";



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
    if (error.response) {
      throw new Error("Identifiants invalides");
    } else {
      throw new Error("Erreur réseau");
    }
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
    throw new Error("register error")
  }
}

export async function whoamiService(token: string): Promise<User> {
  try {
    const response = await axios.get(
      `${backendUrl}/whoami`,
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
      lastName: user_back.last_name
    }

    return user
  } catch (error: any) {
    throw new Error("whoami error")
  }
}