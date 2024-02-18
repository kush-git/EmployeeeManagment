import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export class BaseService {

    static baseURL: string = 'https://localhost:7207/api/';

    static createInstance() {
        let headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const client: AxiosInstance = axios.create({
            baseURL: BaseService.baseURL,
            headers: { ...headers }
        });


        return client;
    }


}