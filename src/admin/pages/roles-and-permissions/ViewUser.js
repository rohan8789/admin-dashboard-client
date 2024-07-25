import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { validate } from "../../../shared/utils/validator";
import ModalComponent from "../../../shared/UIElements/ModalComponent";
import LoadingState from "../../../shared/UIElements/LoadingState";
import { AuthContext } from "../../../shared/context/auth-context";
import EditUser from "./EditUser";
import AddUser from "./AddUser";

const ViewUser = () => {
  const auth = useContext(AuthContext);
  const [sData, setSData] = useState();
  const [getData, setGetData] = useState()
  const [uid, setUid] = useState();
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
        "http://localhost:8000/api/admin/roles-and-permissions/user/add-user",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }
      );
      window.location.reload()
    } catch (err) {
      console.log("hello err", err);
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

  const modalContent = () => {
   if(getData){
     return (
        <EditUser data={getData}/>
     );
   }
  };

  const modalContent1 = () => {
    if(uid)console.log("modalcontent-1", uid);
    const handleDelete = async(req, res) =>{
      try{
        if(uid){
          await axios.delete(`http://localhost:8000/api/admin/roles-and-permissions/user/delete-user/${uid}`);
        }
        window.location.reload()
      }catch(err){
        console.log(err);
      }
    }
    return (
      <>
        <h1>Do you want to delete this page...</h1>
        <button
          className="mt-5 p-2 ps-3 pe-3 fw-bold btn btn-primary"
          onClick={handleDelete}
        >
          Delete
        </button>
      </>
    );
  };

  const modalContent3 = () => {
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
                {error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label
                  htmlFor="email"
                  className="d-block form-label text-start"
                >
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
                  <label
                    htmlFor="password"
                    className="d-block form-label text-start"
                  >
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
              <div className="row">
                <div className="col">
                  <label
                    htmlFor="role"
                    className="d-block form-label text-start"
                  >
                    Role:
                  </label>
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
  };

  const handleEdit = (data) => {
    setGetData(data);
  };

  const handleDelete = (id) => {
    console.log("let me handle this bitch");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      try {
        const res = await axios.get(
          `http://localhost:8000/api/admin/roles-and-permissions/user/get-user`
        );
        setSData(res?.data?.admDetails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  if (sData) {
    return (
      <>
        <div className="table-container w-100 mt-5">
          <div className="row">
            <div className="col">
              <h5 className="pb-2 mb-0">User Details</h5>
            </div>
            <div className="col text-right">
              <button
                className="btn btn-default low-height-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalDefault3"
              >
                <i className="fa fa-plus"></i>
              </button>
              <ModalComponent
                title="Static page"
                content={modalContent3()}
                id="exampleModalDefault3"
                dataBsBackdrop="static"
              />
            </div>
          </div>

          <div className="d-flex text-muted">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email-Id</th>
                  <th>Role</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {sData?.map((data) => {
                  return (
                    <>
                      <tr>
                        <td>{data?.name ? data?.name : data?.fname+" "+data?.lname}</td>
                        <td>{data?.email}</td>
                        <td>{data?.role}</td>
                        <td>
                          <div className="dropdown table-action-dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButtonSM"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i
                                className="fa fa-ellipsis-v"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButtonSM"
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalDefault"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>
                                  &nbsp;Edit
                                </button>
                              </li>

                              <div className="dropdown-divider"></div>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalDefault2"
                                  onClick={()=>setUid(data?._id)}
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
                                  &nbsp;Delete
                                </button>
                              </li>
                            </ul>
                            <ModalComponent
                              title="Edit Modal"
                              content={modalContent()}
                              id="exampleModalDefault"
                              dataBsBackdrop="static"
                            />
                            <ModalComponent
                              title="Delete Modal"
                              content={modalContent1()}
                              id="exampleModalDefault2"
                              dataBsBackdrop="static"
                            />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }else{
    return (
        <div className="d-flex justify-content-center align-items-center">
            <h1>fetching...</h1>
        </div>
    )
  }
};
export default LoadingState(ViewUser);
