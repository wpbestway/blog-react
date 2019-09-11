// tslint:disable-next-line: ordered-imports
import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import config from '../config/index';

const { api: { devApiBaseUrl, proApiBaseUrl } } = config;
const apiBaseUrl = process.env.NODE_ENV === 'production' ? proApiBaseUrl : devApiBaseUrl;

export interface IResponseData {
    code: number
    data?: any
    msg: string
}

export default class HttpRequest {
    constructor(public baseUrl: string = apiBaseUrl) {
        this.baseUrl = baseUrl;
    }

    public request(options: AxiosRequestConfig): AxiosPromise {
        const instance: AxiosInstance = axios.create();
        options = this.mergeConfig(options);
        this.interceptors(instance);
        return instance(options);
    }

    private interceptors(instance: AxiosInstance) {
        instance.interceptors.request.use((axiosConfig: AxiosRequestConfig): AxiosRequestConfig => {
            axiosConfig.headers.post['Content-Type'] = 'application/json';
            return axiosConfig;
        }, (error) => {
            return Promise.reject(error);
        });

        instance.interceptors.response.use((res: AxiosResponse) => {
            const { data } = res;
            const { code, msg } = data;
            if (code !== 0) {
                console.error(msg);
            }
            return res;
        });
    }

    private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
        return Object.assign({ baseURL: this.baseUrl }, options);
    }
}
