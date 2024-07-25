import React, { useEffect, useState } from "react";
import axios from "axios";

import { validate } from "../../../shared/utils/validator";

const EditBlog = ({ data }) => {
  console.log("received props is we are running: ", data);
  const [news, setNews] = useState({
    heading: data?.heading || "",
    description: data?.description || "",
    image: data?.image || null,
    type: data?.type || "",
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
    let files = e.target.files;
    setNews((prev) => {
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
      const data1 = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();
      formData.append("heading", news.heading);
      formData.append("description", news.description);
      formData.append("image", news.image);
      formData.append("type", news.type);
      formData.append("creatorId", data1?.userId);
      console.log("This is data id where i m sending req", data);
      const res = await axios.patch(
        `http://localhost:8000/api/admin/blogs/update-blog/${data?._id}`,
        formData
      );
      window.location.reload();
    } catch (err) {
      console.log("hello err", err);
    }
  };

  useEffect(() => {
    setNews({
      heading: data?.heading,
      description: data?.description,
      image: data?.image,
      type: data?.type,
    });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate(news);
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
          Post a news here
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
                  value={news.heading}
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
                  value={news.description}
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
                <select name="type" value={news.type} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Middle East News">Middle East News</option>
                  <option value="Entertainment News">Entertainment News</option>
                  <option value="Dubai">Dubai</option>
                  <option value="World">World</option>
                  <option value="Business">Business</option>
                  <option value="Legal">Legal</option>
                  <option value="Sports">Sports</option>
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

export default EditBlog;
