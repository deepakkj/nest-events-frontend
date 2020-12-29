import axios from "axios";
import {setUser} from "@/composables/user";

const api = axios.create({
    baseURL: '',
    timeout: 10000
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            setUser({
                userId: null,
                token: null
            })
        }
        return error;
    }
);

export default api;
