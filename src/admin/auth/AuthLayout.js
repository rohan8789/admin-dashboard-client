import React from "react";
import LoginPage from "./LoginPage";
import ResetPassword from "./ResetPassword";
import ChangePwd from "./ChangePwd"
const AuthLayout = ({childComponent}) => {
  
  const renderChild = () =>{
    if(childComponent === "LoginPage"){
      return <LoginPage/>;
    }else if(childComponent ==="ResetPage"){
      return <ResetPassword/>
    }else if(childComponent === "ChangePasswordPage"){
      return <ChangePwd/>
    }
  }
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              alt="hey"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
            {renderChild()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
