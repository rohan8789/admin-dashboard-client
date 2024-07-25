import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { validate } from "../../../shared/utils/validator";
import ModalComponent from "../../../shared/UIElements/ModalComponent";
import LoadingState from "../../../shared/UIElements/LoadingState";
import { AuthContext } from "../../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import EditJob from "./EditJob";


const ViewJob= () => {
  const auth = useContext(AuthContext);
  const [sData, setSData] = useState();
  const [getData, setGetData] = useState();
  const [uid, setUid] = useState();
  const [job, setJob] = useState({
    name: "",
    designation: "",
    worktype: "",
    description: "",
    creatorId: "",
  });
  const [error, setError] = useState({
    name: "",
    designation: "",
    worktype: "",
    description: "",
    creatorId: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const sendRequest = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));
      const res = await axios.post("http://localhost:8000/api/admin/jobs/post-jobs",{
          name: job?.name,
          designation: job?.designation,
          description: job?.description,
          worktype: job?.worktype,
          creatorId: data?.userId,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log("hello err", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate(job);
    console.log(err, job);
    setError({
      name: err.name,
      description: err.description,
      worktype: err.worktype,
      designation: err.designation,
    });
    if (
      err.name === "" &&
      err.description === "" &&
      err.worktype === "" &&
      err.designation === ""
    ) {
      sendRequest();
    } else {
      err.name = "";
      err.description = "";
      err.worktype = "";
      err.designation = "";
    }
  };

  const modalContent = () => {
    if (getData) {
      return <EditJob data={getData} />;
    }
    // return <h1>Hello guys</h1>
  };

  const modalContent1 = () => {
    if (uid) console.log("modalcontent-1", uid);
    const handleDelete = async (req, res) => {
      try {
        if (uid) {
          await axios.delete(
            `http://localhost:8000/api/admin/jobs/delete-job/${uid}`
          );
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <h3>Post a Job</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={job.name}
                      onChange={handleChange}
                    />
                    {error.name ? (
                      <p style={{ color: "red" }}>{error.name}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="position">Designation</label>
                    <div className="input-group mb-3">
                      <select
                        className="form-control"
                        name="designation"
                        value={job.designation}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Android developer">
                          Android developer
                        </option>
                        <option value="Full stack developer">
                          Full stack developer(Java)
                        </option>
                        <option value="UI/UX developer">UI/UX developer</option>
                        <option value="Frontend engineer">
                          Frontend engineer
                        </option>
                        <option value="Backend engineer">
                          Backend engineer
                        </option>
                      </select>
                    </div>
                    {error.designation ? (
                      <p style={{ color: "red" }}>{error.designation}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="worktype">Work Type</label>
                    <div className="input-group mb-3">
                      <select
                        className="form-control"
                        name="worktype"
                        value={job.worktype}
                        onChange={handleChange}
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    {error.worktype ? (
                      <p style={{ color: "red" }}>{error.worktype}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={job.description}
                      onChange={handleChange}
                    />
                    {error.description ? (
                      <p style={{ color: "red" }}>{error.description}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Post Job
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleEdit = (data) => {
    setGetData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/admin/jobs/get-job`);
        setSData(res?.data?.news);
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
              <h5 className="pb-2 mb-0">All News Posts</h5>
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
                  <th>Sr No</th>
                  <th>Company Name</th>
                  <th>Designation</th>
                  <th>Work Type</th>
                  <th>Description</th>
                  <th>Posted By</th>
                </tr>
              </thead>
              <tbody>
                {sData?.map((data, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data?.name}</td>
                        <td>{data?.designation}</td>
                        <td>{data?.worktype}</td>
                        <td>{data?.description}</td>
                        <td>{data?.createdBy}</td>
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
                                  onClick={() => setUid(data?._id)}
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
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h1>fetching...</h1>
      </div>
    );
  }
};
export default LoadingState(ViewJob);
