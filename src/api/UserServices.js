import axios from './axios';

// const signIn = async (email, password) => {
//   let res = await axios.post("http://localhost:8081/login", {
//     email,
//     password,
//   });
//   console.log(res.data);
//   return res.data;
// };

const checkToken = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let response = await axios.get(axios.defaults.baseURL + `/account/info`);
    return response.data;
};

const AddToCart = async (token, id_product, quantity) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let response = await axios.post(axios.defaults.baseURL + `/add-to-cart/${id_product}`, { quantity });
    return response.data;
};

const getProduct = async () => {
    let response = await axios.get(axios.defaults.baseURL + `admin/product?id=ALL`);
    return response.data;
};
export { checkToken, AddToCart, getProduct };
