import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../Interceptors/Auth";
const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [loginActive, setLoginActive] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
  };
  //Authentication
  const login = async (userData) => {
    let res;
    await axios
      .post("http://localhost:3000/auth/login", { data: userData })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        res = response;
      })
      .catch((error) => {
        res = error.response.data.message;
      });
    return res;
  };
  const register = async (userData) => {
    let res;
    await axios
      .post("http://localhost:3000/auth/register", { data: userData })
      .then((response) => {
        res = response.data.message;
      })
      .catch((error) => {
        res = error.response.data.message;
      });
    return res;
  };

  return (
    <AppContext.Provider
      value={{ loginActive, setLoginActive, login, register, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
