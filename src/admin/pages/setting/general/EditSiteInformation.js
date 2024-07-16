import React, { useState } from "react";
import { validate } from "../../../../shared/utils/validator";
import axios from "axios";

const EditSiteInformation = ({ data }) => {
  console.log("Dataaa", data.title);
  const [sdata, setsData] = useState({
    title: data?.title || "",
    logo: null,
    f_icon: null,
    m_mode: data?.m_mode || "",
    i_mode: data?.i_mode || "",
  });
  const [error, setError] = useState({
    title: "",
    logo: null,
    f_icon: null,
    m_mode: "",
    i_mode: "",
  });

  //console.log("This is our new authContext", auth.siteData);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let files = e.target.files;
    setsData((prev) => {
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
      formData.append("title", sdata.title);
      formData.append("logo", sdata.logo);
      formData.append("f_icon", sdata.f_icon);
      formData.append("m_mode", sdata.m_mode);
      formData.append("i_mode", sdata.i_mode);
      const res = await axios.post(
        "http://localhost:8000/api/admin/settings/general-settings/site-information",
        formData
      );
      window.location.reload();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values are: ", sdata);
    let err = validate(sdata);
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

  return (
    <>
      <div
        className="my-3 p-3 bg-body rounded shadow-sm"
        style={{ width: "43vw" }}
      >
        <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
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
                  value={sdata.title}
                />
              </div>
              {error.title ? <p style={{ color: "red" }}>{error.title}</p> : ""}
            </div>
          </div>
          <div className="row">
            <div className="col-10">
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
            <div className="col-2 mt-4">
              <img
                src={
                  data?.logo
                    ? "http://localhost:8000/" + data?.logo
                    : "https://via.placeholder.com/150"
                }
                alt=""
                width="44"
                height="44"
                className="rounded-circle me-2"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-10">
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
            <div className="col-2 mt-4">
              <img
                src={
                  data?.logo
                    ? "http://localhost:8000/" + data?.f_icon
                    : "https://via.placeholder.com/150"
                }
                alt=""
                width="44"
                height="44"
                className="rounded-circle me-2"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="m_mode" className="form-label">
                Maintainance mode:
              </label>
              <div className="input-group mb-3">
                <select
                  name="m_mode"
                  value={sdata.m_mode}
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
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="phno" className="form-label">
                Instance mode:
              </label>
              <div className="input-group mb-3">
                <select
                  name="i_mode"
                  value={sdata.i_mode}
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
    </>
  );
};

export default EditSiteInformation;
