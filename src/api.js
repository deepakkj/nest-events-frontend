import axios from "axios";

const api = axios.create({
    baseURL: '',
    timeout: 2000
});

export default api;
