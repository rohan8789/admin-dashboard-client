import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import LoadingState from "../../../shared/UIElements/LoadingState";
import { validate } from "../../../shared/utils/validator";
import ModalComponent from "../../../shared/UIElements/ModalComponent";
import EditGeneralSetting from "./EditGeneralSetting";
import { AuthContext } from "../../../shared/context/auth-context";
import EditProfile from "../../profile/EditProfile";

const GeneralSetting = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    title: "",
    logo: null,
    f_icon: null,
    m_mode: "",
    i_mode: "",
  });
  const [error, setError] = useState({
    title: "",
    logo: null,
    f_icon: null,
    m_mode: "",
    i_mode: "",
  });
  
  console.log("This is our new authContext", auth.siteData);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let files = e.target.files;
    setData((prev) => {
      return {
        ...prev,
        [name]: name === "logo" || name === "f_icon" ? files[0] : value,
      };
    });
    setError((prev) => {
      return {
        ...prev,
        [name]: name === "logo" || name === "f_icon" ? null : "",
      };
    });
    console.log(name, value);
  };

  const sendRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("logo", data.logo);
      formData.append("f_icon", data.f_icon);
      formData.append("m_mode", data.m_mode);
      formData.append("i_mode", data.i_mode);
      const res = await axios.post(
        "http://localhost:8000/api/admin/setting/general-setting",
        formData
      );
     
      window.location.reload();
      if (res) localStorage.setItem("siteDataId", res?.data?.createdData?._id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values are: ", data);
    let err = validate(data);
    setError({
      title: err.title,
      logo: err.logo,
      f_icon: err.f_icon,
      m_mode: err.m_mode,
      i_mode: err.i_mode,
    });
    console.log("form error are: ", err);
    if (
      err.title === "" &&
      err.logo === null &&
      err.f_icon === null &&
      err.m_mode === "" &&
      err.i_mode === ""
    ) {
       console.log("please yaar");
      sendRequest();
    } else {
      err.title = "";
      err.logo = null;
      err.f_icon = null;
      err.m_mode = "";
      err.i_mode = "";
    }
    console.log("errs are: ", err);
  };

    

  const modalContent = () => {
    return <EditGeneralSetting data = {auth.siteData} />;
  };

  if (!auth.siteData) {
    return (
      <div className="d-flex justify-content-center align-content-center">
        <div className="my-3 p-3 bg-body rounded shadow-sm w-75">
          <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                {error.title ? (
                  <p style={{ color: "red" }}>{error.title}</p>
                ) : (
                  ""
                )}
              </div>
              </div>
              <div className="row">
              <div className="col">
                <label htmlFor="logo" className="form-label">
                  Logo
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Email Address"
                    accept=".jpg, .jpeg, .png"
                    name="logo"
                    onChange={handleChange}
                  />
                </div>
                {error.logo ? <p style={{ color: "red" }}>{error.logo}</p> : ""}
              </div>

              <div className="col-12">
                <label htmlFor="f_icon" className="form-label">
                  Fav-Icon:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="First Name"
                    name="f_icon"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleChange}
                  />
                </div>
                {error.f_icon ? (
                  <p style={{ color: "red" }}>{error.f_icon}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-12">
                <label htmlFor="m_mode" className="form-label">
                  Maintainance mode:
                </label>
                <div className="input-group mb-3">
                  <select
                    name="m_mode"
                    value={data.m_mode}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {error.m_mode ? (
                  <p style={{ color: "red" }}>{error.f_icon}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="col">
                <label htmlFor="phno" className="form-label">
                  Instance mode:
                </label>
                <div className="input-group mb-3">
                  <select
                    name="i_mode"
                    value={data.i_mode}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Staging Mode">Staging Mode</option>
                    <option value="Development Mode">Development Mode</option>
                  </select>
                </div>
                {error.i_mode ? (
                  <p style={{ color: "red" }}>{error.i_mode}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }else {
    
return (
  <div className="col-sm-8 m-5 p-5" style={{ width: "75vw" }}>
    <div class="card-block w-100 h-100 mt-5 border">
      <h1 className="text-center mt-4">Site Information</h1>
      <div class="user-profile container me-5">
        <div className="mt-3 p-3">
          <div className="row details w-100 ms-1">
            <h1 className="text-center">
              Title: <span>{auth.siteData?.title}</span>{" "}
            </h1>
            <div className="row details mt-4 w-100 ms-1 d-flex justify-content-around">
              <div class="card" style={{ width: "18rem" }}>
                <img
                  class="card-img-top mt-2"
                  src={"http://localhost:8000/" + auth.siteData?.logo}
                  alt="Card image cap"
                  width="32"
                  height="132"
                />
                <div class="card-body">
                  <h5 class="card-title text-center">Logo</h5>
                </div>
              </div>

              <div class="card" style={{ width: "18rem" }}>
                <img
                  class="card-img-top mt-2"
                  src={"http://localhost:8000/" + auth.siteData?.f_icon}
                  alt="Card image cap"
                  width="32"
                  height="132"
                />
                <div class="card-body">
                  <h5 class="card-title text-center">Fav-Icon</h5>
                </div>
              </div>
            </div>
            <div className="row details mt-4 w-100 ms-1 d-flex justify-content-around">
              <div className="col m-2">
                <strong className="d-block pb-1 text-center">
                  Maintainance Mode:
                </strong>
                <span className="d-block text-center">
                  {auth.siteData?.m_mode}
                </span>
              </div>

              <div className="col m-2">
                <strong className="d-block pb-1 text-center">
                  Instance Mode:{" "}
                </strong>
                <span className="d-block text-center">
                  {auth.siteData?.i_mode}
                </span>
              </div>
            </div>
          </div>

          <div className="row details  d-flex justify-content-center mt-4">
            <Button
              variant="primary w-25"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalDefault"
              //  onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
    <ModalComponent
      title="Default Modal"
      content={modalContent()}
      //  dataBsBackdrop="static"
      id="exampleModalDefault"
    />
  </div>
);




  }
};

export default LoadingState(GeneralSetting);



/*



*/