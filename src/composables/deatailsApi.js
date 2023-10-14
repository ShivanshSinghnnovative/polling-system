import axios from "axios";
const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});
api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;
