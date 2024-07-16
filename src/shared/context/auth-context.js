import { useState, useCallback, createContext, useEffect, useRef } from "react";
import axios from 'axios'

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  uid: null,
  siteData:"",
  staticPage:"",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [uid, setUId] = useState(null);
  const [siteData, setSiteData] = useState();
  const [staticPage, setStaticPage] = useState([]);

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
  
  useEffect(() => { 
    const sendRequest = async () => {
      try {
        let res = await axios.get(`http://localhost:8000/api/admin/settings/general-settings/site-information`);
        setSiteData(res?.data?.data);
        if(siteData)console.log(staticPage, siteData);
        else console.log("I am sorry");
      } catch (err) {
        console.log("err1",err);
      }
    };
    sendRequest();
  },[]);


  useEffect(() => { 
    const sendRequest = async () => {
      try {
        let res2 = await axios.get(`http://localhost:8000/api/admin/settings/general-settings/static-pages`);
        setStaticPage(res2?.data?.static_data);
        if(staticPage)console.log(staticPage, siteData, res2?.data?.static_data);
        else console.log("I am sorry");
      } catch (err) {
        console.log("err2",err);
      }
    };
    sendRequest();
  },[]);

  

  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        resetToken,
        uid,
        siteData,
        staticPage,
        login,
        logout,
        Reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
