import axiosClient from "./axiosClient";
import axios from "axios";
import { BASE_API } from "../constants/host";
class AppAPI {
    baseApi: string;

    constructor(api: string | undefined) {
        this.baseApi = api ? api : "http://localhost:3333/api";
    }

    login = (data: any) => {
        const url = this.baseApi.concat("/auth/login");
        return axios.post(url, data, {
            withCredentials: true,
        });
    }
    getNewToken =  () => {
        const url = this.baseApi.concat("/auth/token");
        return axios.get(url, {
            withCredentials: true,
        });
    }

    // App
    getTokens = () => {
        const url = this.baseApi.concat("/enterprises");  
        return axios.get(url);
    }
    
    getAllOrders = () => {
        const url = this.baseApi.concat("/transactions/?page=1");
        return axios.get(url);
    }

    getOrdersWithFilter = (data: any) => {
        const url = this.baseApi.concat("/transactions");
        return axios.get(url, {params: data});
    }
    
    getExchangeRate = (data : any) => {
        const url = this.baseApi.concat(`/transactions/rate/${data.tokenId1}/${data.tokenId2}`);
        return axios.get(url);
    } 

    getStatisApp = () => {
        const url = this.baseApi.concat("/transactions/general");
        return axios.get(url);
    }

    // App State
    createOrder = (data: any) => {
        const url = this.baseApi.concat("/transactions/create");
        return axiosClient.post(url, {...data, transactionType: 'exchange'});
    }

    acceptOder = (txId: string, body?: any) => {
        const url = this.baseApi.concat(`/transactions/${txId}/accept`);
        return axiosClient.patch(url, body);
    }
    cancelOrder = (txId: string) => {
        const url = this.baseApi.concat(`/transactions/${txId}/cancel`);
        return axiosClient.patch(url);
    }
    updateStatusOrder = (txId: string, status: string) => {
        const url = this.baseApi.concat(`/transactions/${txId}/progress`);
        return axiosClient.patch(url, {status: status});
    }
    getScretKey = (txId: string) => {
        const url = this.baseApi.concat(`/transactions/${txId}/secretKey`);
        return axiosClient.get(url);
    }
    getSignatureAdmin = (txId: string, nonce: number) => {
        const url = this.baseApi.concat(`/transactions/${txId}/sig/refund`)
        return axiosClient.post(url, {nonce: nonce})
    }

    createTransfer = (data: any) => {
        const url = this.baseApi.concat("/transactions/create");
        return axiosClient.post(url, {
            ...data, 
            transactionType: 'transfer', 
            toTokenId: data.fromTokenId,
            toValue: 0,
        });
    }
    getUserOrder = (data: any) => {
        const url = this.baseApi.concat("/users/tx");
        return axiosClient.get(url, {params: {...data, transactionType: 'exchange'}});
    }
    getUserHistory = (page: number) => {
        const url = this.baseApi.concat("/users/tx");
        return axiosClient.get(url, {params: {status: 2, page}});
    }
}

const appApi = new AppAPI(BASE_API);

export default appApi;