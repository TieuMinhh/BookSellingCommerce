import axios from 'axios';
export default axios.create({
    // baseURL: 'https://apibookshop.up.railway.app/api',
    baseURL: 'http://localhost:8081/api',
});
