import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import UserProfileLayout from "./userProfileLayout";
import {AuthContext} from "../../shared/context/auth-context";
import {validate} from "../../shared/utils/validator";
import ModalComponent from "../../shared/UIElements/ModalComponent";


import "../../assets/css/profile.css";
import EditProfile from "./EditProfile";
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [register, setRegister] = useState({
    fname:"",
    lname:"",
    empid:"",
    phno:"",
    email:"",
    dob:"",
    image:null
  }) 
  
  const [error, setError] = useState({
    fname: "",
    lname: "",
    empid: "",
    phno: "",
    email: "",
    dob: "",
    image: null
  });
  
  const auth = useContext(AuthContext);
  
  const handleChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    let files = e.target.files;
    setRegister((prev)=>{
      return {
        ...prev,
        [name]:name==="image"?files[0]:value
      }
    })
    setError((prev)=>{
      return {
        ...prev,
        [name]:name==="image" ? null:""
      }
    })
  }

  const sendRequest = async () =>{
    try{
      const formData = new FormData();
      formData.append("fname", register.fname);
      formData.append("lname", register.lname);
      formData.append("email", register.email);
      formData.append("empid", register.empid);
      formData.append("image", register.image);
      formData.append("dob", register.dob);
      formData.append("phno", register.phno);
      console.log("the is form data",formData)
      const res = await axios.patch('http://localhost:8000/api/admin/admin-profile', formData);
      window.location.reload();
    }catch(err){
      console.log("err is: ", err);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    let err = validate(register);
    setError({
      fname:err.fname,
      lname:err.lname,
      email:err.email,
      phno:err.phno,
      dob:err.dob,
      empid:err.empid,
      image:err.image
    });
    if(err.fname===""&&err.lname===""&&err.email===""&&err.phno===""&&err.dob===""&&err.empid===""&&err.image===""){
      console.log("sent to backend");
      sendRequest();
    }else{
      err.fname = "";
      err.lname = "";
      err.email = "";
      err.phno ="";
      err.dob ="";
      err.empid = "";
      err.image ="";
    }
  }

  useEffect(()=>{
    const sendRequest = async() =>{
      try{
        const res = await axios.get(`http://localhost:8000/api/admin/${auth?.uid}`);
        console.log("This is response",res)
        setProfile(res?.data?.admin)
      }catch(err){
        console.log(err);
      }
    }
    sendRequest();
  },[])
  

  const modalContent = () => {
    return <EditProfile data = {profile}/>
  }




  if(!profile){
    return (
      <>
        <div className="my-3 p-3 bg-body rounded shadow-sm" style={{width:"53vw"}}>
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
                {error.empid ? <p style={{color:"red"}}>{error.empid}</p> : ""}
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
                {error.email ? <p style={{color:"red"}}>{error.email}</p> : ""}
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
                {error.fname ? <p style={{color:"red"}}>{error.fname}</p> : ""}
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
                {error.lname ? <p style={{color:"red"}}>{error.lname}</p> : ""}
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
                {error.phno ? <p style={{color:"red"}}>{error.phno}</p> : ""}
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
                {error.dob ? <p style={{color:"red"}}>{error.dob}</p> : ""}
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
                  {error.image ? <p style={{color:"red"}}>{error.image}</p> : ""}
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
  }else{
     return (
       <div
         class="col-sm-8 d-flex justify-content-center align-items-center mt-5"
         style={{ width: "53vw" }}
       >
         <div class="card-block w-100 h-100 mt-5">
           <h1 className="text-center">Admin Details</h1>
           <div class="user-profile container me-5">
             <div className="mt-3 p-3">
               <div className="row details w-100 ms-1">
                 <div className="col m-2">
                   <strong className="d-block pb-1">Employee Id: </strong>
                   <span>{profile?.empid}</span>
                 </div>
                 <div className="col m-2">
                   <strong className="d-block pb-1">Email Id: </strong>{" "}
                   <span>{profile?.email}</span>
                 </div>
               </div>
               <div className="row details w-100 ms-1">
                 <div className="col m-2">
                   <strong className="d-block pb-1">First Name: </strong>
                   <span>{profile?.fname}</span>
                 </div>
                 <div className="col m-2">
                   <strong className="d-block pb-1">Last Name: </strong>
                   <span>{profile?.lname}</span>
                 </div>
               </div>
               <div className="row details w-100 ms-1">
                 <div className="col m-2">
                   <strong className="d-block pb-1">Date of Birth: </strong>
                   <span>{profile?.dob}</span>
                 </div>
                 <div className="col m-2">
                   <strong className="d-block pb-1">Contact Number: </strong>
                   <span>{profile?.phno}</span>
                 </div>
               </div>
               <div className="row details  d-flex justify-content-center mt-4">
                 <Button
                   variant="primary w-25"
                   data-bs-toggle="modal"
                   data-bs-target="#exampleModalDefault"
                   //  onClick={handleEdit}
                 >
                   <FontAwesomeIcon icon={faEdit} /> Edit
                 </Button>
               </div>
             </div>
           </div>
         </div>
         <ModalComponent
           title="Default Modal"
           content={modalContent()}
          //  dataBsBackdrop="static"
           id="exampleModalDefault"
         />
       </div>
     );
  }
};

export default UserProfileLayout(ProfilePage);
