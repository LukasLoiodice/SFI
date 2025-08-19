import axios from 'axios';
import { backendUrl } from 'src/consts/env';
import { getCurrentUserService } from 'src/features/auth/service';
import type { User } from 'src/features/users/model';

export const api = axios.create({
    baseURL: backendUrl
})

export const setupInterceptor = (clearCurrentUser: () => void, getRefreshToken: () => string | null, setCurrentUser: (token: string, user: User) => void) => {
    api.interceptors.response.use(response => response, async error => {
        if (error && error.status === 401 && error.response.data.detail.includes('Token invalide ou expiré')) {
            const refreshToken = getRefreshToken()
            if (!refreshToken) {
                clearCurrentUser()
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(`${backendUrl}/refresh`, {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                })

                const accessToken = res.data
                const user = await getCurrentUserService(accessToken)
                setCurrentUser(accessToken, user)
                return Promise.reject({response: {data: {detail: 'token has been refreshed, retry'}}})
            } catch (error) {
                clearCurrentUser()
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    })
}

