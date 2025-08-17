import axios from 'axios';
import type { NavigateFunction } from 'react-router';
import { backendUrl } from 'src/consts/env';

export const api = axios.create({
    baseURL: backendUrl
})

export const setupInterceptor = (clearCurrentUser: () => void, navigate: NavigateFunction) => {
    api.interceptors.response.use(response => response, error => {
        if (error && error.status === 401 && error.response.data.detail.includes('Token invalide ou expiré')) {
            clearCurrentUser()
            navigate('/login')
        }
        return Promise.reject(error);
    })
}

