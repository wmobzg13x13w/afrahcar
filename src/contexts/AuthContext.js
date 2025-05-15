import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    const storedToken = localStorage.getItem("token");

    if (storedAdmin && storedToken) {
      setAdmin(JSON.parse(storedAdmin));
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Clear previous error before login attempt

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "admin/login/",
        {
          email,
          password,
        }
      );
      const { admin, token } = response.data;
      setAdmin(admin);
      setToken(token);
      localStorage.setItem("admin", JSON.stringify(admin));
      localStorage.setItem("token", token);
    } catch (err) {
      // Handle server or network errors
      const errorMessage =
        err.response?.data || "An error occurred during login.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!admin && !!token;
  };

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
