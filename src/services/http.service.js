import axios from 'axios';
// import logger from './log.service';
import { toast } from 'react-toastify';
import configFile from '../config.json';
import authService from './auth.service';
import { localStorageService } from './localStorage.service';

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh();
                localStorageService.setTokens({
                    expiresIn: data.expires_in,
                    idToken: data.id_token,
                    localId: data.user_id,
                    refreshToken: data.refresh_token
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map(key => ({
        ...data[key]
    })) : data;
}

http.interceptors.response.use(
    (res) => {
         if (configFile.isFirebase) {
            res.data = {
                content: transformData(res.data)
            };
            return res;
        };
    },
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
            if (!expectedErrors) {
                toast.error('Something was wrong.... Try it later');
            };
            return Promise.reject(error);
    }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};

export default httpService;
