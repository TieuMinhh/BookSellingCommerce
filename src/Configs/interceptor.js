import axios from './axios';
import { getToken, setToken } from '../Services/Token';

const axiosApiInstance = axios.create({});

axiosApiInstance.interceptors.request.use((config) => {
    let [accessToken, refreshToken] = getToken();
    if (accessToken == null) {
        localStorage.clear();
        window.location.href = '/login';
    }

    config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        // 'Content-Type': 'application/json'
    };

    return config;
});

axiosApiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status == 403) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                let apiResponse = await axios.post(axios.defaults.baseURL + `/auth/refresh`, { token: refreshToken });
                if (apiResponse.data.status && apiResponse) {
                    // alert("Da Refresh Token")
                    const { accessToken, refreshToken } = apiResponse.data.data;
                    setToken(accessToken, refreshToken);
                    //alert("Da set Token moi")
                    error.config.headers = {
                        Authorization: `Bearer ${accessToken}`,
                    };
                    window.location.reload();
                } else {
                    localStorage.clear();
                    window.location.href = '/login';
                }
            }
        } else {
            return Promise.reject(error);
        }
    },
);

export default axiosApiInstance;
