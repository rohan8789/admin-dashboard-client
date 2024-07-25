import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoadingState from "../../../shared/UIElements/LoadingState";
import { validate } from "../../../shared/utils/validator";

const AddJob = () => {
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
      const res = await axios.post(
        "http://localhost:8000/api/admin/jobs/post-job",
        {
          name: job?.name,
          designation: job?.designation,
          description: job?.description,
          worktype: job?.worktype,
          creatorId: data?.userId,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
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

  return (
    <div className="d-flex justify-content-center align-content-center">
      <div className="my-3 p-3 bg-body rounded shadow-sm w-75">
        <h6 className="text-start border-bottom pb-2 mb-0 mb-3">
          Post a news here
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="name">Company Name</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={job.name}
                  onChange={handleChange}
                />
              </div>
              {error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="designation">Designation</label>
              <div className="input-group mb-3">
                <select
                  className="form-control"
                  name="designation"
                  value={job.designation}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Android developer">Android developer</option>
                  <option value="Full stack developer">
                    Full stack developer(Java)
                  </option>
                  <option value="UI/UX developer">UI/UX developer</option>
                  <option value="Frontend engineer">Frontend engineer</option>
                  <option value="Backend engineer">Backend engineer</option>
                </select>
              </div>
              {error.designation ? (
                <p style={{ color: "red" }}>{error.designation}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="worktype">Work Type</label>
              <div className="input-group mb-3">
                <select
                  className="form-control"
                  name="worktype"
                  value={job.worktype}
                  onChange={handleChange}
                >
                  <option value="">select</option>
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
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="description">Description</label>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                />
              </div>
              {error.description ? (
                <p style={{ color: "red" }}>{error.description}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoadingState(AddJob);
