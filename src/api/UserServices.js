import axios from 'axios';

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
    return response.data;
};

const AddToCart = async (token, id_product, quantity) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let response = await axios.post(`http://localhost:8081/api/v1/add-to-cart/${id_product}`, { quantity });
    return response.data;
};

const getProduct = async () => {
    let response = await axios.get('http://192.168.138.135:8081/api/v1/admin/product?id=ALL');
    return response.data;
};
export { checkToken, AddToCart, getProduct };
