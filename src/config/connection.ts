import axios from "axios";

const connection = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
});

connection.interceptors.request.use(
    async (config: any) => {
        if (config.headers) {
            config.headers = {
                'Content-Type': 'application/json'
            };
        }
        return config;
    },
    (error) => {
        console.error("[Interceptors Request] Error: ", error);
        Promise.reject(error);
    },
);

export default connection