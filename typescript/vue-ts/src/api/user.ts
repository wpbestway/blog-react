import axios, { IResponseData } from './index';
import { AxiosPromise } from 'axios';

interface ILoginReqArgInterface {
    user_name: string
    password: number
}

export function loginReq(data: ILoginReqArgInterface): AxiosPromise {
    return axios.request({
        url: '/api/user/login',
        data,
        method: 'post',
    })
}
