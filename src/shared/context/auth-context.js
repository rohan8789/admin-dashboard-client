import { useState, useCallback, createContext, useEffect, useRef } from "react";
import axios from 'axios'

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  uid: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [uid, setUId] = useState(null);
  const [siteData, setSiteData] = useState();
  // let siteData = useRef();

  const login = useCallback((uid, token) => {
    setToken(token);
    setUId(uid);
    localStorage.setItem("userData", JSON.stringify({ userId: uid, token: token })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUId(null);
    localStorage.removeItem("userData");
  }, []);

  const Reset = useCallback((uid,rToken) => {
    setResetToken(rToken);
    setUId(uid);
    console.log("THis is reset and uid", uid, rToken)
    localStorage.setItem("ResetToken", JSON.stringify({userId:uid, rToken:rToken}))
  })
  
  const id = localStorage.getItem("siteDataId");
  useEffect(() => { 
    const sendRequest = async () => {
      try {
        let res;
        if (id)res = await axios.get(`http://localhost:8000/api/admin/setting/general-setting/${id}`);
        setSiteData(res?.data?.data);
        localStorage.setItem("logoData", res?.data?.data?.logo);
        console.log("hii")
      } catch (err) {}
    };
    sendRequest();
  },[id]);

  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        resetToken,
        uid,
        siteData,
        login,
        logout,
        Reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
