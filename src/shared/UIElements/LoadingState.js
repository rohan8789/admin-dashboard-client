import React, { useState, useEffect, useCallback } from "react";
import Header from "../Navigation/header";
import Sidebar from "../Navigation/sidebar";
import { Preloader, Bars } from "react-preloader-icon";

const LoadingState = (ChildComponent) => {
  const AdminLayout = (props) => {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [saveLeadClickEvent, setSaveLeadClickEvent] = useState("");

    useEffect(() => {
      const timer = setTimeout(() => {
        setPageLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    const renderHtml = () => {
      if (!pageLoaded) {
        return (
          <div className="loading-page">
            <div className="center">
              <Preloader
                use={Bars}
                size={60}
                strokeWidth={10}
                strokeColor="#f7b085"
                duration={600}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div className="main w-100" id="page-content-wrapper">
            <Header />
            <div className="container-fluid content-container">
              <ChildComponent {...props} />
            </div>
          </div>
        </div>
      );
    };

    return <>{renderHtml()}</>;
  };

  return AdminLayout;
};

export default LoadingState;
















//  const addLeadModalFooterContent = () => {
//    return (
//      <div style={{ width: "100%" }}>
//        <button
//          onClick={() =>
//            setSaveLeadClickEvent((Math.random() + 1).toString(36).substring(7))
//          }
//          className="btn btn-default low-height-btn"
//        >
//          Add Lead
//        </button>
//      </div>
//    );
//  };

//  const handleParentData = useCallback((e) => {
//    console.log(e);
//  }, []);