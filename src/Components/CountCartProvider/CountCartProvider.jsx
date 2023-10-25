import { useEffect } from 'react';
import { createContext, useState } from 'react';
import axios from '../../api/axios';
import { getToken } from '../../Services/Token';

export const CountCartContext = createContext();

export function CountCartProvider({ children }) {
    const [countCart, setCountCart] = useState();

    useEffect(() => {
        const getList = async () => {
            try {
                const token = await getToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const result = await axios.post(axios.defaults.baseURL + `/account/cart`);
                setCountCart(result?.data.list.length);
            } catch (error) {}
        };
        getList();
    }, []);

    const handleCountCart = (number) => {
        setCountCart(number);
    };
    const value = {
        countCart,
        handleCountCart,
    };

    return <CountCartContext.Provider value={value}>{children}</CountCartContext.Provider>;
}
