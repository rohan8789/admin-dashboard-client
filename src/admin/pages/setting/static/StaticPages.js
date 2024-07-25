import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import LoadingState from "../../../../shared/UIElements/LoadingState";
import { validate } from "../../../../shared/utils/validator";
import { AuthContext } from "../../../../shared/context/auth-context";
import ModalComponent from "../../../../shared/UIElements/ModalComponent";
import EditStaticPage from "./EditStaticPage";

const StaticPages = () => {
  const auth = useContext(AuthContext);
  const [sData, setSData] = useState();
  const [sid, setSid] = useState()
  const [data, setData] = useState({
    heading: "",
    description: "",
    slugurl: "",
    redirecturl: "",
    redirect_mode: "",
  });
  const [error, setError] = useState({
    heading: "",
    description: "",
    slugurl: "",
    redirecturl: "",
    redirect_mode: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prev) => {
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
  };

  const sendRequest = async () => {
    try {
      console.log("SendRequest", data);
      const res = await axios.post(
        "http://localhost:8000/api/admin/settings/general-settings/static-pages",
        {
          heading: data?.heading,
          description: data?.description,
          slugurl: data?.slugurl,
          redirecturl: data?.redirecturl,
          redirect_mode: data?.redirect_mode,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate(data);
    setError({
      heading: err.heading,
      description: err.description,
      slugurl: err.slugurl,
      redirecturl: err.redirecturl,
      redirect_mode: err.redirect_mode,
    });
    if (
      err.heading === "" &&
      err.description === "" &&
      err.slugurl === "" &&
      err.redirecturl === "" &&
      err.redirect_mode === ""
    ) {
      sendRequest();
    } else {
      err.heading = "";
      err.description = "";
      err.slugurl = "";
      err.redirecturl = "";
      err.redirect_mode = "";
    }
  };

  const modalContent = (arr, id) => {
    return (
      <>
        <EditStaticPage sData={arr} id={id} />
      </>
    );
  };

  const handleEdit = (arr, id) => {
    const a = arr.filter((u) => {
      return u._id === id;
    });
    setSData(a[0]);
  };



  const modalContent1 = () => {
    const handleDelete = async () => {
      try {
        if (sid){
          await axios.delete(`http://localhost:8000/api/admin/settings/general-settings/static-pages/${sid}`);
        }
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
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
            Static Page Information
          </h6>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label
                  htmlFor="title"
                  className="d-block form-label text-start"
                >
                  Heading
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="heading"
                    name="heading"
                    onChange={handleChange}
                    value={data.heading}
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
                    value={data.description}
                  />
                </div>
                {error.description ? (
                  <p style={{ color: "red" }}>{error.description}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col">
                  <label
                    htmlFor="slugurl"
                    className="d-block form-label text-start"
                  >
                    Slug URL
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="http://www.example.com"
                      name="slugurl"
                      onChange={handleChange}
                      value={data.slugurl}
                    />
                  </div>
                  {error.slugurl ? (
                    <p style={{ color: "red" }}>{error.slugurl}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label
                    htmlFor="redirecturl"
                    className="d-block form-label text-start"
                  >
                    Redirect URL
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="http://www.example.com"
                      name="redirecturl"
                      onChange={handleChange}
                      value={data.redirecturl}
                    />
                  </div>
                  {error.redirecturl ? (
                    <p style={{ color: "red" }}>{error.redirecturl}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col">
                <label
                  htmlFor="redirect_mode"
                  className="d-block form-label text-start"
                >
                  Redirection mode
                </label>
                <div className="input-group mb-3">
                  <select
                    name="redirect_mode"
                    value={data.redirect_mode}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>
                {error.redirect_mode ? (
                  <p style={{ color: "red" }}>{error.redirect_mode}</p>
                ) : (
                  ""
                )}
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

  

  

  if (auth.staticPage.length !== 0) {
    return (
      <>
        <div className="table-container w-100 mt-5">
          <div className="row">
            <div className="col">
              <h5 className="pb-2 mb-0">Static Page Information</h5>
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
                  <th>Heading</th>
                  <th>Description</th>
                  <th>Slug URL</th>
                  <th>Redirect URL</th>
                  <th>Redirect Mode</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {auth.staticPage?.map((data) => {
                  return (
                    <>
                      <tr>
                        <td>{data?.heading}</td>
                        <td>{data?.description}</td>
                        <td>{data?.slugurl}</td>
                        <td>{data?.redirecturl}</td>
                        <td>{data?.redirect_mode}</td>
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
                                  onClick={(e) => handleEdit(auth.staticPage, data?._id)}
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
                                  onClick={()=>{setSid(data?._id)}}
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
                              content={modalContent(sData, data?._id)}
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
  } else {
    return (
      <div className="d-flex justify-content-center align-content-center">
        <div className="my-3 p-3 bg-body rounded shadow-sm w-75">
          <h6 className="border-bottom pb-2 mb-0 mb-3">
            Static Page Information
          </h6>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="title" className="form-label">
                  Heading
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="heading"
                    name="heading"
                    onChange={handleChange}
                    value={data.heading}
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
                <label htmlFor="logo" className="form-label">
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
                    value={data.description}
                  />
                </div>
                {error.description ? (
                  <p style={{ color: "red" }}>{error.description}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="col-12">
                <label htmlFor="slugurl" className="form-label">
                  Slug URL
                </label>
                <div className="input-group mb-3">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="http://www.example.com"
                    name="slugurl"
                    onChange={handleChange}
                    value={data.slugurl}
                  />
                </div>
                {error.slugurl ? (
                  <p style={{ color: "red" }}>{error.slugurl}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="col-12">
                <label htmlFor="redirecturl" className="form-label">
                  Redirect URL
                </label>
                <div className="input-group mb-3">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="http://www.example.com"
                    name="redirecturl"
                    onChange={handleChange}
                    value={data.redirecturl}
                  />
                </div>
                {error.redirecturl ? (
                  <p style={{ color: "red" }}>{error.redirecturl}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="col">
                <label htmlFor="redirect_mode" className="form-label">
                  Redirection mode
                </label>
                <div className="input-group mb-3">
                  <select
                    name="redirect_mode"
                    value={data.redirect_mode}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>
                {error.redirect_mode ? (
                  <p style={{ color: "red" }}>{error.redirect_mode}</p>
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
  }
};

export default LoadingState(StaticPages);
