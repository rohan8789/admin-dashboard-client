import React, { useState } from "react";
import axios from "axios";

import { validate } from "../../../../shared/utils/validator";

const EditStaticPage = (sData, id) => {
  console.log("sData this is edit", sData?.id);
  //const [staticData, setStaticData] = useState();
  const [data, setData] = useState({
    heading: sData?.sData?.heading,
    description: sData?.sData?.description,
    slugurl: sData?.sData?.slugurl,
    redirecturl: sData?.sData?.redirecturl,
    redirect_mode: sData?.sData?.redirect_mode,
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
      const res = await axios.patch(
        `http://localhost:8000/api/admin/settings/general-settings/static-pages/${sData?.id}`,
        {
          heading: data?.heading,
          description: data?.description,
          slugurl: data?.slugurl,
          redirecturl: data?.redirecturl,
          redirect_mode: data?.redirect_mode,
        }
      );
      setData(res?.data?.createStaticData);
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
      // console.log("please yaar");
      sendRequest();
    } else {
      err.heading = "";
      err.description = "";
      err.slugurl = "";
      err.redirecturl = "";
      err.redirect_mode = "";
    }
  };

  if (sData?.sData) {
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
                    value={data?.heading ? data?.heading : sData?.sData?.heading}
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
                    value={data?.description ? data?.description : sData?.sData?.description}
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
                    value={data?.slugurl ? data?.slugurl : sData?.sData?.slugurl}
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
                    value={data?.redirecturl ? data?.redirecturl : sData?.sData?.redirecturl}
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
                    value={data?.redirect_mode?data?.redirect_mode:sData?.sData?.redirect_mode}
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

export default EditStaticPage;
