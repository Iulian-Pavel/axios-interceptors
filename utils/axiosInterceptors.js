import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.interceptors.request.use((config) => {
    console.log(`Request sent to `, config.url);
    config.headers["Content-Type"] = "application/json";
    return config;
}, (error) => {
    console.log(`Error during request: ${error}`);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    console.log(`Response received: ${response}`);
    return response;
}, (error) => {
    console.log(`Error while receiving response ${error}`);
    return Promise.reject(error);
});

export default axiosInstance;