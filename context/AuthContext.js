// anochat-client/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken, getAuthToken, removeAuthToken } from '../utils/api';
import { handleApiError } from '../utils/errorHandler';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const token = getAuthToken();
            if (token) {
              setAuthToken(token);
              setLoading(true);
              const res = await api.get('/users/me'); // Replace axios with api
              setUser(res.data);
              setLoading(false);
            }
          } catch (error) {
            handleApiError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      }, []);

    const login = async (username, password) => {
        try {
            setLoading(true);
            const res = await api.post('/users/login', { username, password });
            setAuthToken(res.data.token);
            setUser(res.data.user);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch (error) {
            handleApiError(error);
        }
        setUser(null);
        removeAuthToken();
    };

    const register = async (username, password) => {
        setLoading(true);
        try {
            const res = await api.post('/users/register', { username, password });
            setAuthToken(res.data.token);
            setUser(res.data.user);
        } catch (error) {
            handleApiError(error);
        }
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};