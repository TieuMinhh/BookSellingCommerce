import axios from 'axios';
import { toast } from 'react-toastify';

// const signIn = async (email, password) => {
//   let res = await axios.post("http://localhost:8081/api/v1/login", {
//     email,
//     password,
//   });
//   console.log(res.data);
//   return res.data;
// };

const checkToken = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //let response = await handleGetAllUser('ALL');
    //let response = await handleGetAllUserShop()
    // let response = await axios.get('http://192.168.138.135:8081/api/v1/admin/account')
    let response = await axios.get('http://localhost:8081/api/v1/account/info');
    console.log('Check token neeee:', response);
    return response.data;
};

const AddToCart = async (token, id_product, quantity) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Add Cart: ', token, id_product, quantity);
    let response = await axios.post(`http://localhost:8081/api/v1/add-to-cart/${id_product}`, { quantity });
    console.log(response);
    return response.data;
};

const getProduct = async () => {
    let response = await axios.get('http://192.168.138.135:8081/api/v1/admin/product?id=ALL');
    return response.data;
};
export {
    //   signIn,
    checkToken,
    AddToCart,
    getProduct,
};
