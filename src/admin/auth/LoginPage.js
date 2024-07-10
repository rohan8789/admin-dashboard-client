import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { validate } from "../../shared/utils/validator";
import { AuthContext } from "../../shared/context/auth-context";

import "../../assets/css/login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  let c = useRef(0);
  const [isDisabled, setIsDisabled] = useState("");
  const [message, setMessage] = useState("");
  let [captchaRef, setCaptchaRef] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setFormError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    console.log(name, value);
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/admin/login`, {
        email: formData?.email,
        password: formData?.password,
        captcha: formData?.captcha,
      });
      auth.login(res?.data?.userId, res?.data?.token);
      console.log(res);
      navigate("/");
      toast.success(`Welcome back`);
    } catch (err) {
      if (err?.response?.data?.disabled === true) {
        const then = new Date().getMinutes();
        localStorage.setItem("thenTime", JSON.stringify({ then: then }));
        setIsDisabled(true);
      }
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(5);
    const tTime = JSON.parse(localStorage.getItem("thenTime"));
    if (tTime){
      const now = new Date().getMinutes();
      if (now - tTime?.then >= 1) {
        localStorage.removeItem("thenTime");
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }else{
      setIsDisabled(false);
    }
  },[]);

  const handleValidate = async (e) => {
    e.preventDefault();
    const v = validateCaptcha(formData?.captcha);
    if (v) {
      c.current=1;
      setCaptchaRef(() => {
        return false;
      });
    } else {
      setCaptchaRef(() => {
        return true;
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate(formData);
    setFormError({
      email: err.email,
      password: err.password,
      captcha: err.captcha,
    });
    if (err.captcha === "") {
      err.captcha = "";
    } else {
      err.captcha = "Please enter a valid captcha";
    }
    console.log("This is login form error", formError, err);

    if (err.email === "" && err.password === "" && err.captcha === "") {
      console.log("sent");
      sendRequest();
    } else {
      err.email = "";
      err.password = "";
      err.captcha = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {JSON.parse(localStorage.getItem("thenTime")) ? (
        <p className="text-center" style={{ color: "red"}}>
          You have reached maximum login attempts.
        </p>
      ) : (
        ""
      )}
      <div className="d-flex align-items-center my-4">
        <h1 className="mb-0 me-3">Sign In</h1>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="form-control form-control-lg"
          placeholder="Enter a valid email address"
        />
        {formError?.email && <p style={{ color: "red" }}>{formError?.email}</p>}
      </div>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="form-control form-control-lg"
          placeholder="Enter password"
        />
        {formError?.password && (
          <p style={{ color: "red" }}>{formError?.password}</p>
        )}
      </div>
      <div className="form-outline mb-3">
        <LoadCanvasTemplateNoReload />
        <input
          type="text"
          name="captcha"
          onChange={handleChange}
          value={formData.captcha}
        />
        <button onClick={handleValidate}>Validate</button>
        {(formError?.captcha || captchaRef) ?(
          <p style={{ color: "red" }}>Please enter a valid captcha</p>
        ):c.current===1?(<p style={{color:"green"}}>Verified</p>):""}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/reset-password" className="text-body">
          Forgot password?
        </Link>
      </div>
      <div className="text-center text-lg-start mt-4 pt-2">
        <button className="btn btn-primary btn-lg" disabled={isDisabled}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
