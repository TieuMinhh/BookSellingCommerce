import jwtDecode from 'jwt-decode';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [roleUser, setRoleUser] = useState();

    const handleChangeRole = () => {
        let role = localStorage.getItem('accessToken') ? jwtDecode(localStorage.getItem('accessToken')).role_id : 0;
        setRoleUser(role);
    };

    const value = {
        roleUser,
        handleChangeRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
