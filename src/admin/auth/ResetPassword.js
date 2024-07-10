import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../shared/context/auth-context";

import "../../assets/css/login.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  let [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/admin/reset", {
        email,
      });
      console.log("resetToken", res?.data?.resetToken);
      console.log(auth);
      auth.Reset(res?.data?.userId, res?.data?.resetToken);
      toast.success("Email sent");
      // if(auth.isLoggedIn){
      //   navigate(`/change-password`);
      // }else{
      //   navigate(`/change-password/${res?.data?.userId}`);
      // }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^\S+@\S+\.\S+$/;
    let err = "";
    if (email.length === 0) {
      err = "Please enter a valid email id.";
    } else if (emailRegex.test(email) === false) {
      err = "Please enter a Valid email-id.";
    }
    setError(err);
    if (err === "") {
      sendRequest();
    } else {
      err = "";
    }
  };

  return (
    <div className="container border" style={{ height: "350px" }}>
      <div className="text-center mt-5">
        <h3>
          <i className="fa fa-lock"></i>
        </h3>
        <h2 className="text-center">Forgot Password?</h2>
        <p>You can reset your password here.</p>
        <div className="panel-body">
          <form onSubmit={handleSubmit} className="form" method="post">
            <div className="form-group">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
                placeholder="email address"
                className="form-control"
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className="form-group mt-2">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Remember your password?
                <Link to="/login" className="link-danger">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
