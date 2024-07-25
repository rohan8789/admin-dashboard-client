import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validate } from "../../shared/utils/validator";

import "../../assets/css/profile.css";
import { AuthContext } from "../../shared/context/auth-context";

const ChangePwd = () => {
  const auth = useContext(AuthContext);
  const [reset, setReset] = useState({
    password: "",
    repassword: "",
  });
  const [resetErr, setResetErr] = useState({
    password: "",
    repassword: "",
  });
  const userId = useParams().userId;
  const navigate = useNavigate();
  console.log("user-id is this", userId);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReset((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setResetErr((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
  };

  const sendRequest = async () => {
    try {
      auth.logout();
      const res = await axios.patch(
        `http://localhost:8000/api/admin/changepwd/${userId}`,
        {
          password: reset.password,
          repassword: reset.repassword,
        }
      );
      toast.success(res?.data?.message);
      navigate("/login");
      console.log(res);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errr = validate(reset);
    console.log(errr, errr.password, errr.repassword);
    setResetErr({
      password: errr.password,
      repassword: errr.repassword,
    });
    if (errr.password === "" && errr.repassword === "") {
      sendRequest();
    } else {
      errr.password = "";
      errr.repassword = "";
    }
  };
  return (
    <div className="my-3 p-3 bg-body rounded shadow-sm login-form">
      <h6 className="border-bottom pb-2 mb-0 mb-3">Change Password</h6>

      <div className="row">
        <div className="col-4">
          <p>Your Password must contain:</p>
          <p>
            <i className="fa fa-check"></i> At least 8 characters.
          </p>
          <p>
            <i className="fa fa-check"></i> At least 1 number.
          </p>
          <p>
            <i className="fa fa-check"></i> At least 1 special character.
          </p>
          <p>
            <i className="fa fa-check"></i> Mixed case characters.
          </p>
        </div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                />
                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
              </div>
            </div> */}
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={reset.password}
                  className="form-control"
                  placeholder="New Password"
                />
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
              </div>
              {resetErr?.password && (
                <p style={{ color: "red" }}>{resetErr?.password}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password
              </label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="repassword"
                  onChange={handleChange}
                  value={reset.repassword}
                  className="form-control"
                  placeholder="Confirm New Password"
                />
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
              </div>
              {resetErr?.repassword && (
                <p style={{ color: "red" }}>{resetErr?.repassword}</p>
              )}
            </div>
            <hr />
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePwd;
