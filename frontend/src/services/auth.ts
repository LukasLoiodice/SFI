import axios from "axios";

export async function loginService(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(
      "http://localhost:8000/login",
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