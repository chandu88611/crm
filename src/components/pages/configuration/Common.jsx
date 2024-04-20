import Header from "../Header"

// eslint-disable-next-line react/prop-types
export default function CommonConfigurationComponent({type}) {
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex justify-content-sm-end gap-2">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      {/* <i className="ri-search-line search-icon"></i> */}
                    </div>
                    <select
                      className="form-control w-md"
                      data-choices
                      data-choices-search-false
                    >
                      <option value="All">All</option>
                      <option value="Today">Today</option>
                      <option value="Yesterday" selected>
                        Yesterday
                      </option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="This Month">This Month</option>
                      <option value="Last Year">Last Year</option>
                    </select>
                  </div>
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between py-0 my-0">
                    <h4 className="mb-sm-0 font-size-18"> </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Configuration</a>
                        </li>
                        <li className="breadcrumb-item active">{type}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row mt-3">
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top `}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-xxl-3 col-sm-6 project-card">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className={`p-3 mt-n3 mx-n3 ${
                          type == "Pending"
                            ? "bg-soft-danger"
                            : type == "Completed"
                            ? "bg-soft-success"
                            : "bg-soft-warning"
                        } rounded-top`}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h5 className="mb-0 fs-14">
                              <a
                                // href="config-overview.html"
                                className="text-dark"
                              >
                                Project name/invoice number
                              </a>
                            </h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-1 align-items-center my-n2">
                              <button
                                type="button"
                                className="btn avatar-xs p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-muted p-1 mt-n1 py-0 text-decoration-none fs-15"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                >
                                  <i
                                    data-feather="more-horizontal"
                                    className="icon-sm"
                                  ></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <a className="dropdown-item" href="">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                  <a className="dropdown-item" href="">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                  </a>
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProjectModal"
                                  >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row gy-3">
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Status</p>
                              <div
                                className={`badge ${
                                  type == "Pending"
                                    ? "badge-soft-danger"
                                    : type == "Completed"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                } fs-12`}
                              >
                                {type}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div>
                              <p className="text-muted mb-1">Deadline</p>
                              <h5 className="fs-14">18 Sep, 2021</h5>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <p className="text-muted mb-0 me-2">Team :</p>
                          <div className="avatar-group">
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Donna Kline"
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={`avatar-title rounded-circle ${
                                    type == "Pending"
                                      ? "bg-danger"
                                      : type == "Completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  D
                                </div>
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Lee Winton"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Johnny Shorter"
                            >
                              <div className="avatar-xxs">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="rounded-circle img-fluid"
                                />
                              </div>
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Add Members"
                            >
                              <div className="avatar-xxs">
                                <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                  +
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex mb-2">
                          <div className="flex-grow-1">
                            <div>Progress</div>
                          </div>
                          <div className="flex-shrink-0">
                            <div>75%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className={`w-3/4 ${
                              type == "Pending"
                                ? "bg-danger"
                                : type == "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }  text-xs leading-none py-[2.5px] rounded-full text-center text-white w-[75%]`}
                            // style="width:75%"
                          >
                            {/* 75% */}
                          </div>
                        </div>
                        {/* <!-- /.progress --> */}
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
              <div className="row g-0 text-center text-sm-start align-items-center mb-4">
                <div className="col-sm-6">
                  <div>
                    <p className="mb-sm-0 text-muted">
                      Showing <span className="fw-semibold">1</span> to{" "}
                      <span className="fw-semibold">10</span> of{" "}
                      <span className="fw-semibold text-decoration-underline">
                        12
                      </span>{" "}
                      entries
                    </p>
                  </div>
                </div>
                {/* <!-- end col --> */}
                <div className="col-sm-6">
                  <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                    <li className="page-item disabled">
                      <a href="#" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item ">
                      <a href="#" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        5
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  { new Date().getFullYear()} ©
                  All Rights Reserved.
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end d-none d-sm-block">
                    Designed and Developed by Call Center Projects
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}