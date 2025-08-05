import axios from "axios";
import { backendUrl } from "src/consts/env";
import type { User } from "src/models/user";



export async function loginService(email: string, password: string): Promise<{user: User, token: string}> {
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

    const res = response.data.user

    const user: User = {
      id: res.id,
      email: res.email,
      firstName: res.first_name,
      lastName: res.last_name
    }

    return {user: user, token: response.data.token.access_token};
  } catch (error: any) {
    if (error.response) {
      throw new Error("Identifiants invalides");
    } else {
      throw new Error("Erreur réseau");
    }
  }
}

export async function registerService(user: User, password: string) {
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
    throw new Error("Requête invalide")
  }
}