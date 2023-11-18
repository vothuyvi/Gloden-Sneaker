import axios from "axios";

const service = axios.create({
    // baseURL: "http://thuyvi-intern.loc/api",
    baseURL: 'https://dogom.click/api',
    timeout: 60000,
});

service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default service;
