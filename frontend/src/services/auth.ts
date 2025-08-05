import axios from "axios";
import { backendUrl } from "src/consts/env";

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

    const { access_token } = response.data;

    return access_token;
  } catch (error: any) {
    if (error.response) {
      throw new Error("Identifiants invalides");
    } else {
      throw new Error("Erreur réseau");
    }
  }
}

export async function registerService(email: string, firstName: string, lastName: string, password: string) {
  try {
    await axios.post(
      `${backendUrl}/register`,
      {
        "email": email,
        "first_name": firstName ,
        "last_name": lastName,
        "password": password
      }
    )

    return
  } catch (error: any) {
    throw new Error("Requête invalide")
  }
}