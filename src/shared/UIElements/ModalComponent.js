import React from "react";
import PropTypes from "prop-types";

const ModalComponent = ({
  id,
  className,
  exampleModalLabel,
  dataBsBackdrop,
  ariaHidden,
  fullScreen,
  title,
  content,
  footerContent,
}) => {
  const renderFooter = () => {
    if (footerContent) {
      return <div className="modal-footer">{footerContent}</div>;
    }
  };

  return (
    <div
      className={`modal fade ${className}`}
      id={id}
      tabIndex="-1"
      aria-labelledby={exampleModalLabel}
      data-bs-backdrop={dataBsBackdrop}
      aria-hidden={ariaHidden}
      style={{ display: "none" }}
    >
      <div className={`${fullScreen ? "modal-fullscreen" : ""} modal-dialog modal-dialog-scrollable`}>
        <div className="modal-content" style={{width:"45vw"}}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="modal-body">{content}</div>
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

ModalComponent.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  exampleModalLabel: PropTypes.string,
  dataBsBackdrop: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ariaHidden: PropTypes.bool,
  fullScreen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
  footerContent: PropTypes.node,
};

export default ModalComponent;
