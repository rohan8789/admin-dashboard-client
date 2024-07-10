import React, {useState} from 'react';
import { validate } from '../../shared/utils/validator';
import axios from 'axios';


const EditProfile = ({data}) => {
     const format = (date) => {
       if (!date) return "";
       const year = new Date(date).getFullYear();
       const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
       const day = new Date(date).getDate().toString().padStart(2, "0");
       return `${year}-${month}-${day}`;
     };
    const [register, setRegister] = useState({
        fname: data?.fname||"",
        lname: data?.lname||"",
        empid: data?.empid||"",
        phno: data?.phno||"",
        email: data?.email||"",
        dob: format(data?.dob)||"",
        image: data?.image||"",
    }); 
    const [error, setError] = useState({
        fname: "",
        lname: "",
        empid: "",
        phno: "",
        email: "",
        dob: "",
        image: null,
    });

    const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let files = e.target.files;
      setRegister((prev) => {
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

      console.log(name, value)
    };


    const sendRequest = async () => {
        console.log("Dont send me")
      try {
        const formData = new FormData();
        formData.append("fname", register.fname);
        formData.append("lname", register.lname);
        formData.append("email", register.email);
        formData.append("empid", register.empid);
        formData.append("image", register.image);
        formData.append("dob", register.dob);
        formData.append("phno", register.phno);
        const res = await axios.patch(
          "http://localhost:8000/api/admin/admin-profile",
          formData
        );
        window.location.reload();
      } catch (err) {
        console.log("err is: ", err);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(register)
      let err = validate(register);
      console.log("snet",err);
      setError({
        fname: err.fname,
        lname: err.lname,
        email: err.email,
        phno: err.phno,
        dob: err.dob,
        empid: err.empid,
        image: err.image,
      });
      if (
        err.fname === "" &&
        err.lname === "" &&
        err.email === "" &&
        err.phno === "" &&
        err.dob === "" &&
        err.empid === "" 
      ) {
        console.log("sent to backend");
        sendRequest();
      } else {
        err.fname = "";
        err.lname = "";
        err.email = "";
        err.phno = "";
        err.dob = "";
        err.empid = "";
        err.image = "";
      }
    };


    return (
      <>
        <div
          className="my-3 p-3 bg-body rounded shadow-sm"
          style={{ width: "43vw" }}
        >
          <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="empid" className="form-label">
                  Emp Id:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Emp Id"
                    name="empid"
                    onChange={handleChange}
                    value={register.empid}
                  />
                </div>
                {error.empid ? (
                  <p style={{ color: "red" }}>{error.empid}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col">
                <label htmlFor="email" className="form-label">
                  Email Address:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={register.email}
                  />
                </div>
                {error.email ? (
                  <p style={{ color: "red" }}>{error.email}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="fname" className="form-label">
                  First Name:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="fname"
                    onChange={handleChange}
                    value={register.fname}
                  />
                </div>
                {error.fname ? (
                  <p style={{ color: "red" }}>{error.fname}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col">
                <label htmlFor="lname" className="form-label">
                  Last Name:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name: "
                    name="lname"
                    onChange={handleChange}
                    value={register.lname}
                  />
                </div>
                {error.lname ? (
                  <p style={{ color: "red" }}>{error.lname}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="phno" className="form-label">
                  Contact Number:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Contact Number"
                    name="phno"
                    onChange={handleChange}
                    value={register.phno}
                  />
                </div>
                {error.phno ? <p style={{ color: "red" }}>{error.phno}</p> : ""}
              </div>
              <div className="col">
                <label htmlFor="dob" className="form-label">
                  Date of Birth:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Contact Number"
                    name="dob"
                    onChange={handleChange}
                    value={register.dob}
                  />
                </div>
                {error.dob ? <p style={{ color: "red" }}>{error.dob}</p> : ""}
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
                  {error.image ? (
                    <p style={{ color: "red" }}>{error.image}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </>
    );
}

export default EditProfile