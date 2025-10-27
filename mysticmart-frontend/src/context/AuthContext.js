import React from 'react';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[token,setToken] = useState(localStorage.getItem('token'));
    const[data,setUserData] = useState('');

    useEffect(() => {
            if(token) {
                localStorage.setItem('token',token);
            } else {
                localStorage.removeItem('token');
            }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const register = (data) => {
        setUserData(data);
    }

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{token, data, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider};