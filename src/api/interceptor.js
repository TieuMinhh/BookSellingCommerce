import axios from 'axios';
import { getToken } from '../Services/Token';

const axiosApiInstance = axios.create({});

axiosApiInstance.interceptors.request.use(async (config) => {
    try {
        const [accessToken] = getToken();
        if (!accessToken) {
            localStorage.clear();
            window.location.href = '/login';
        } else {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            config.headers['Accept'] = 'application/json';
            // Nếu cần, hãy thêm dòng sau để đảm bảo kiểu nội dung chính xác
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    } catch (error) {
        // Xử lý lỗi ở đây
        console.error('Interceptor error:', error);
        return Promise.reject(error);
    }
});

export default axiosApiInstance;
