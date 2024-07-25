import React, { useState } from "react";
import axios from "axios";

import LoadingState from "../../../shared/UIElements/LoadingState";
import { validate } from "../../../shared/utils/validator";
import { useNavigate } from "react-router-dom";

const AddEnt = () => {
  const [ent, setEnt] = useState({
    heading: "",
    description: "",
    image: null,
    type: "",
  });
  const [error, setError] = useState({
    heading: "",
    description: "",
    image: null,
    type: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let files = e.target.files;
    setEnt((prev) => {
      return {
        ...prev,
        [name]: name === "image" ? files[0] : value,
      };
    });
    setError((prev) => {
      return {
        ...prev,
        [name]: name === "image" ? null : "",
      };
    });
    console.log(name, value);
  };

  const sendRequest = async () => {
    try {
      // console.log("SendRequest", news);
      const data = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();
      formData.append("heading", ent.heading);
      formData.append("description", ent.description);
      formData.append("image", ent.image);
      formData.append("type", ent.type);
      formData.append("creatorId", data?.userId);
      const res = await axios.post("http://localhost:8000/api/admin/entertainment/post-ent",formData);
      navigate("/entertainment/view-ent");
    } catch (err) {
      console.log("hello err", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate(ent);
    setError({
      heading: err.heading,
      description: err.description,
      image: err.image,
      type: err.type,
    });
    if (
      err.heading === "" &&
      err.description === "" &&
      err.image === null &&
      err.type === ""
    ) {
      sendRequest();
    } else {
      err.heading = "";
      err.description = "";
      err.image = null;
      err.type = "";
    }
  };
  return (
    <div className="d-flex justify-content-center align-content-center">
      <div className="my-3 p-3 bg-body rounded shadow-sm w-75">
        <h6 className="text-start border-bottom pb-2 mb-0 mb-3">
          Post entertainment content here
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="title" className="d-block form-label text-start">
                Heading
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="heading"
                  name="heading"
                  onChange={handleChange}
                  value={ent.heading}
                />
              </div>
              {error.heading ? (
                <p style={{ color: "red" }}>{error.heading}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="logo" className="d-block form-label text-start">
                Description:
              </label>
              <div className="input-group mb-3">
                <textarea
                  type="text"
                  rows={5}
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={ent.description}
                />
              </div>
              {error.description ? (
                <p style={{ color: "red" }}>{error.description}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Image"
                  accept=".jpg, .jpeg, .png"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              {error.image ? <p style={{ color: "red" }}>{error.image}</p> : ""}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="role" className="d-block form-label text-start">
                Type
              </label>
              <div className="input-group mb-3">
                <select name="type" value={ent.type} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Movies">Movies</option>
                  <option value="Just for fun">Just for fun</option>
                </select>
              </div>
              {error.type ? <p style={{ color: "red" }}>{error.type}</p> : ""}
            </div>
          </div>

          <button type="submit" className="btn btn-default d-flex flex-row">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoadingState(AddEnt);
