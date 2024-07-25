import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { validate } from "../../../shared/utils/validator";
import ModalComponent from "../../../shared/UIElements/ModalComponent";
import LoadingState from "../../../shared/UIElements/LoadingState";
import { AuthContext } from "../../../shared/context/auth-context";
import EditEnt from "./EditEnt";

const ViewEnt = () => {
  const auth = useContext(AuthContext);
  const [sData, setSData] = useState();
  const [getData, setGetData] = useState();
  const [uid, setUid] = useState();
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

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const file = e.target.files;
    setEnt((prev) => {
      return {
        ...prev,
        [name]: name === "image" ? file[0] : value,
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
      const data = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();
      formData.append("heading", ent.heading);
      formData.append("description", ent.description);
      formData.append("image", ent.image);
      formData.append("type", ent.type);
      formData.append("creatorId", data?.userId);
      const res = await axios.post("http://localhost:8000/api/admin/entertainment/post-ent", formData);
      window.location.reload();
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
      err.image === "" &&
      err.type === ""
    ) {
      // console.log("please yaar");
      sendRequest();
    } else {
      err.heading = "";
      err.description = "";
      err.image = "";
      err.type = "";
    }
  };

  const modalContent = () => {
    if (getData) {
      return <EditEnt data={getData} />;
    }
  };

  const modalContent1 = () => {
    if (uid) console.log("modalcontent-1", uid);
    const handleDelete = async (req, res) => {
      try {
        if (uid) {
          await axios.delete(`http://localhost:8000/api/admin/entertainment/delete-ent/${uid}`);
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
            Add news here
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
                <label
                  htmlFor="image"
                  className="d-block form-label text-start"
                >
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
                {error.image ? (
                  <p style={{ color: "red" }}>{error.image}</p>
                ) : (
                  ""
                )}
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

  const handleEdit = (data) => {
    setGetData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/admin/entertainment/get-ent`
        );
        setSData(res?.data?.news);
        // console.log("news", res?.data)
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
              <h5 className="pb-2 mb-0">Entertainment related Posts</h5>
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
                  <th>Picture</th>
                  <th>Heading</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Posted By</th>
                </tr>
              </thead>
              <tbody>
                {sData?.map((data, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {console.log(data?.image)}
                          <img
                            src={
                              data?.image
                                ? "http://localhost:8000/" + data?.image
                                : "https://via.placeholder.com/150"
                            }
                            alt=""
                            width="32"
                            height="32"
                            className="rounded-circle me-2"
                          />
                        </td>
                        <td>{data?.heading}</td>
                        <td>{data?.description}</td>
                        <td>{data?.type}</td>
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
export default LoadingState(ViewEnt);
