import React from "react";
import ModalComponent from "../../shared/UIElements/ModalComponent";
import LoadingState from "../../shared/UIElements/LoadingState";

const TypographyPage = () => {
  const modalFooterContent = () => (
    <>
      <div style={{ width: "100%" }}>
        <button className="btn btn-default">Save</button>
      </div>
    </>
  );

  const modalContent = () => (
    <>
      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type
      and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum.
    </>
  );

  return (
    <>
      <div className="table-container">
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">Table</h5>
          </div>
          <div className="col text-right">
            <button className="btn btn-default low-height-btn">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
        <div className="d-flex text-muted">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Source</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Tarun Dhiman</td>
                <td>tarun.dhiman@abc.com</td>
                <td>Website</td>
                <td>23-aug-2019</td>
                <td>26-aug-2019</td>
                <td>
                  <div className="dropdown table-action-dropdown">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      id="dropdownMenuButtonSM"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButtonSM"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          &nbsp;Edit
                        </a>
                      </li>
                      <div className="dropdown-divider"></div>
                      <li>
                        <a className="dropdown-item text-danger" href="#">
                          <i className="fa fa-trash" aria-hidden="true"></i>
                          &nbsp;Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Modals</h6>
        <div>
          <div className="bd-example">
            <div className="d-flex justify-content-between flex-wrap">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalDefault"
              >
                Launch demo modal
              </button>
            </div>
          </div>
        </div>
        <ModalComponent
          title="Default Modal"
          footerContent={modalFooterContent()}
          content={modalContent()}
          dataBsBackdrop="static"
          id="exampleModalDefault"
        />
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Dropdowns</h6>
        <div>
          <div className="bd-example">
            <div className="btn-group w-100 align-items-center justify-content-between flex-wrap">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <h6 className="dropdown-header">Dropdown header</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-success">
                Success
              </button>
              <button
                type="button"
                className="btn btn-success dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-info">
                Info
              </button>
              <button
                type="button"
                className="btn btn-info dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Buttons</h6>
        <div>
          <div className="bd-example">
            <button type="button" className="btn btn-success">
              Success
            </button>
            <button type="button" className="btn btn-danger">
              Danger
            </button>
          </div>
          <div className="bd-example">
            <button type="button" className="btn btn-outline-primary">
              Primary
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Secondary
            </button>
          </div>
          <div className="bd-example">
            <button type="button" className="btn btn-primary">
              Standard button
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Alerts</h6>
        <div>
          <div className="bd-example">
            <div
              className="alert alert-light alert-dismissible fade show"
              role="alert"
            >
              A simple light alert with{" "}
              <a href="#" className="alert-link">
                an example link
              </a>
              . Give it a click if you like.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingState(TypographyPage);
