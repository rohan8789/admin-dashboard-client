import React, { useContext, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import "react-perfect-scrollbar/dist/css/styles.css";

const Sidebar = () => {
  const [image, setImage] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/admin/${auth?.uid}`
        );
        const correctedImagePath = res?.data?.admin?.image?.replace(/\\/g, "/");
        setImage("http://localhost:8000/" + correctedImagePath);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }, [auth?.uid]);

  if (image) {
    console.log("Hellow", image);
  }

  return (
    <div
      className={`border-end sidenav ${
        auth.isLoggedIn ? "d-block" : "d-none"
      } `}
      id="sidebar-wrapper"
    >
      <div className="ms-1 mt-1">
        <Link to="/">
          <img
            alt="Alt content"
            src={
              auth.siteData
                ? "http://localhost:8000/" + auth.siteData?.logo
                : require("../../assets/images/logo.jpg")
            }
            width={165}
            height={60}
          />
        </Link>
      </div>
      <PerfectScrollbar className="sidebar-items">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <Link className="" to="/">
              <i className="fa fa-dashboard"></i> Dashboard
            </Link>
          </li>
          {/* <li className="mb-1">
            <Link className="" to="/blank-page">
              <i className="fa fa-file-o"></i> Blogs
            </Link>
          </li>
          <li className="mb-1">
            <Link className="" to="/blank-page">
              <i className="fa fa-file-o"></i> Jobs
            </Link>
          </li> */}
          {/* <li className="border-top my-3"></li> */}
          <hr/>
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              Roles & permissions
            </button>
            <div className="collapse" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link to="/roles-and-permissions/add-user" className="rounded">
                    Add User
                  </Link>
                </li>
                <li>
                  <a href="#" className="rounded">
                    View User
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <hr />
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#settings-collapse"
              aria-expanded="false"
            >
              Settings
            </button>
            <div className="collapse" id="settings-collapse">
              <li className="mb-1">
                <button
                  className="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#general-settings-collapse"
                  aria-expanded="false"
                >
                  General Settings
                </button>
                <div className="collapse" id="general-settings-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <Link
                        to="/settings/general-settings/site-information"
                        className="rounded"
                      >
                        Site Information
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings/general-settings/static-pages"
                        className="rounded"
                      >
                        Static Pages
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </div>
          </li>
          <hr />
          {/* <li className="border-top my-3"></li> */}
          <li className="mb-1">
            <Link className="" to="/typography">
              <i className="fa fa-text-width" aria-hidden="true"></i> Typography
            </Link>
          </li>
        </ul>
      </PerfectScrollbar>
      <div className="dropdown fixed-bottom-dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={image ? image : "https://via.placeholder.com/150"}
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <span>Rohan Singh</span>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              <i className="fa fa-user-circle" aria-hidden="true"></i> Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
