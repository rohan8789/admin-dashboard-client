import React, { useEffect, useState } from "react";
import axios from "axios";

import { validate } from "../../../shared/utils/validator";

const EditUser = ({ data }) => {
  console.log("received props is: ", data);
  const [form, setForm] = useState({
    name: data?.name || data?.fname + " " + data?.lname,
    role: data?.role,
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    console.log(name, value);
  };
  useEffect(() => {
    setForm({
      name: data?.name || data?.fname + " " + data?.lname,
      role: data?.role,
    });
  }, [data]);

  const sendRequest = async () => {
    try {
      console.log("SendRequest", form);
      const res = await axios.patch(
        `http://localhost:8000/api/admin/roles-and-permissions/user/edit-user/${data._id}`,
        {
          name: form.name,
          role: form.role,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log("hello err", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate(form);
    setError({
      name: err.name,
      role: err.role,
    });
    if (err.name === "" && err.role === "") {
      // console.log("please yaar");
      sendRequest();
    } else {
      err.name = "";
      err.role = "";
    }
  };
  return (
    <div className="d-flex justify-content-center align-content-center">
      <div className="my-3 p-3 bg-body rounded shadow-sm w-75">
        <h6 className="text-start border-bottom pb-2 mb-0 mb-3">Edit user</h6>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="name" className="d-block form-label text-start">
                Name:
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
              </div>
              {error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="role" className="d-block form-label text-start">
                Role:
              </label>
              <div className="input-group mb-3">
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
              </div>
              {error.role ? <p style={{ color: "red" }}>{error.role}</p> : ""}
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

export default EditUser;
