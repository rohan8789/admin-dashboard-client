import React, {useState} from 'react'
import axios from 'axios';


import LoadingState from '../../../shared/UIElements/LoadingState'
import { validate } from '../../../shared/utils/validator';

const AddUser = () => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    const [error, setError] = useState({
      name: "",
      email: "",
      password: "",
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

    const sendRequest = async () => {
      try {
        console.log("SendRequest", form);
        const res = await axios.post(
            "http://localhost:8000/api/admin/settings/general-settings/static-pages", {
            name:form.name,
            email: form.email,
            password:form.password,
            role:form.role
          }
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let err = validate(form);
      setError({
        name: err.name,
        email: err.email,
        password: err.password,
        role: err.role,
      });
      if (
        err.name === "" &&
        err.email === "" &&
        err.password === "" &&
        err.role === "" 
      ) {
        // console.log("please yaar");
        sendRequest();
      } else {
        err.name = "";
        err.email = "";
        err.password = "";
        err.role = "";
      }
    };


  return (
    <div className="d-flex justify-content-center align-content-center">
      <div className="my-3 p-3 bg-body rounded shadow-sm w-75">
        <h6 className="text-start border-bottom pb-2 mb-0 mb-3">
          Add new user
        </h6>
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
              {error.name ? (
                <p style={{ color: "red" }}>{error.name}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email" className="d-block form-label text-start">
                Email-Id:
              </label>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email-Id"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                />
              </div>
              {error.email ? (
                <p style={{ color: "red" }}>{error.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="password" className="d-block form-label text-start">
                  Password:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                  />
                </div>
                {error.password ? (
                  <p style={{ color: "red" }}>{error.password}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className='row'>

            <div className="col">
              <label htmlFor="role" className="d-block form-label text-start">Role:</label>
              <div className="input-group mb-3">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  >
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
              </div>
              {error.role ? (
                  <p style={{ color: "red" }}>{error.role}</p>
                ) : (
                    ""
                )}
            </div>
            </div>
          </div>
          <button type="submit" className="btn btn-default d-flex flex-row">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoadingState(AddUser);