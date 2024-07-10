import React, { useContext, useState , useEffect} from "react";
import axios from "axios";

import adminLayout from "../../shared/UIElements/LoadingState";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import "../../assets/css/profile.css";

const UserProfileLayout = (ChildComponent) => {
  const UserProfilePageHoc = (props) => {
    const [image, setImage] = useState();
    const auth = useContext(AuthContext);

    useEffect(() => {
      const sendRequest = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/admin/${auth?.uid}`);
          const correctedImagePath = res?.data?.admin?.image?.replace(/\\/g, "/");
          setImage("http://localhost:8000/" + correctedImagePath);
        } catch (err) {
          console.log(err);
        }
      };
      sendRequest();
    }, [auth?.uid]);
   
    console.log("Imageimage",image)
    
    return (
      <>
        <div className="container-x">
          <div className="row profile">
            <div className="col-md-9 w-100">
              <div className="profile-content">
                <div class="page-content page-container" id="page-content">
                  <div class="row container-x">
                    <div class="col-xl-6 col-md-12 w-100">
                      <div class="card user-card-full mt-5 w-100">
                        <div class="row m-l-0 m-r-0 w-100">
                          <div class="col-sm-4 user-profile">
                            <div class="card-block text-center text-white p-3">
                              <div className="profile-userpic">
                                <img
                                  src={image ? image : 'https://via.placeholder.com/150'}
                                  className="img-responsive profile-img-center"
                                  style={{width:"200px", height:"200px"}}
                                  alt=""
                                />
                              </div>
                              <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                  Rohan Singh
                                </div>
                                <div className="profile-usertitle-job">
                                  Software Engineer
                                </div>
                              </div>
                              <div>
                                <div className="bd-example">
                                  <div className="list-group">
                                    <NavLink
                                      to="/profile"
                                      className={({ isActive }) =>
                                        `list-group-item list-group-item-action ${
                                          isActive ? "active" : ""
                                        }`
                                      }
                                    >
                                      Personal Info
                                    </NavLink>
                                    <NavLink
                                      to={`/change-password/${auth.uid}`}
                                      className={({ isActive }) =>
                                        `list-group-item list-group-item-action ${
                                          isActive ? "active" : ""
                                        }`
                                      }
                                    >
                                      Change Password
                                    </NavLink>
                                    <NavLink
                                      to="/preferences"
                                      className={({ isActive }) =>
                                        `list-group-item list-group-item-action ${
                                          isActive ? "active" : ""
                                        }`
                                      }
                                    >
                                      Preferences
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                          </div>
                          <ChildComponent {...props} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return adminLayout(UserProfilePageHoc);
};

export default UserProfileLayout;

/*




*/

/*



<div class="col-sm-4 user-profile">
                <div class="card-block text-center text-white">
                  <div className="profile-userpic">
                    <img
                      src="https://via.placeholder.com/150"
                      className="img-responsive profile-img-center"
                      alt=""
                    />
                  </div>
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">Shravan</div>
                    <div className="profile-usertitle-job">
                      Software Engineer
                    </div>
                  </div>
                  <div>
                    <div className="bd-example">
                      <div className="list-group">
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            `list-group-item list-group-item-action ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          Personal Info
                        </NavLink>
                        <NavLink
                          to="/change-password"
                          className={({ isActive }) =>
                            `list-group-item list-group-item-action ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          Change Password
                        </NavLink>
                        <NavLink
                          to="/preferences"
                          className={({ isActive }) =>
                            `list-group-item list-group-item-action ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          Preferences
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                </div>
              </div>


*/

/*

<NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            `list-group-item list-group-item-action ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          Personal Info
                        </NavLink>
                        <NavLink
                          to="/change-password"
                          className={({ isActive }) =>
                            `list-group-item list-group-item-action ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          Change Password
                        </NavLink>
                        <NavLink
                          to="/preferences"
                          className={({ isActive }) =>
                            `list-group-item list-group-item-action ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          Preferences
                        </NavLink>


*/

// import React, { useContext } from "react";
// import adminLayout from "../../shared/UIElements/LoadingState";
// import "../../assets/css/profile.css";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../shared/context/auth-context";

// const userProfileLayout = (ChildComponent) => {
//   const UserProfilePageHoc = (props) => {
//     const auth = useContext(AuthContext);
//     return (
//       <div className="container">
//         <div className="row profile">
//           <div className="col-md-3">
//             <div className="profile-sidebar">
//               <div className="my-3 p-3 bg-body rounded shadow-sm">
//                 <div className="profile-userpic">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     className="img-responsive profile-img-center"
//                     alt="ROhan"
//                   />
//                 </div>

//                 <div className="profile-usertitle">
//                   <div className="profile-usertitle-name">Tarun Dhiman</div>
//                   <div className="profile-usertitle-job">Software Engineer</div>
//                 </div>
//                 <hr />

//                 <div className="bd-example">
//                   <div className="list-group">
//                     <NavLink
//                       to="/profile"
//                       className={({ isActive }) =>
//                         `list-group-item list-group-item-action ${
//                           isActive ? "active" : ""
//                         }`
//                       }
//                     >
//                       Personal Info
//                     </NavLink>
//                     <NavLink
//                       to={`/change-password/${auth.uid}`}
//                       className={({ isActive }) =>
//                         `list-group-item list-group-item-action ${
//                           isActive ? "active" : ""
//                         }`
//                       }
//                     >
//                       Change Password
//                     </NavLink>
//                     <NavLink
//                       to="/preferences"
//                       className={({ isActive }) =>
//                         `list-group-item list-group-item-action ${
//                           isActive ? "active" : ""
//                         }`
//                       }
//                     >
//                       Preferences
//                     </NavLink>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-9">
//             <div className="profile-content">
//               <ChildComponent {...props} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return adminLayout(UserProfilePageHoc);
// };

// export default userProfileLayout;

