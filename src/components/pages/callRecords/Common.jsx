import "../../assets/inbound.css"
import Footer from "../Footer";
import Header from "../Header";
import Flatpickr from "react-flatpickr";
import Select from "react-select"


// eslint-disable-next-line react/prop-types
export default function CommonCRComponents({type}) {
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0">Call Records</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Call records</a>
                        </li>
                        <li className="breadcrumb-item active capitalize">
                          {type}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row h-100">
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                            <i className="mdi mdi-phone-incoming-outline align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            {" "}
                            Inbound Calls
                          </p>
                          <h4 className="mb-2">
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            h{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            m{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0">
                            <span className="counter-value" data-target="2390">
                              2,390
                            </span>{" "}
                            Calls
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-success-subtle text-success">
                            <i className="ri-arrow-up-s-fill align-middle me-1"></i>
                            6.24 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-success rounded-circle fs-3">
                            <i className="mdi mdi-phone-outgoing-outline align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Outbound Calls
                          </p>
                          <h4 className="mb-2">
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            h{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            m{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0">
                            <span className="counter-value" data-target="2390">
                              2,390
                            </span>{" "}
                            Calls
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-success-subtle text-success">
                            <i className="ri-arrow-up-s-fill align-middle me-1"></i>
                            3.67 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-danger rounded-circle fs-3">
                            <i className="mdi mdi-phone-missed-outline align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Inbound Missed Calls
                          </p>
                          <h4 className="mb-2">
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            h{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            m{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0">
                            <span className="counter-value" data-target="2390">
                              2,390
                            </span>{" "}
                            Calls
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-danger-subtle text-danger">
                            <i className="ri-arrow-down-s-fill align-middle me-1"></i>
                            4.80 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-warning rounded-circle fs-3">
                            <i className="mdi mdi-phone-missed-outline align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Outbound Missed Calls
                          </p>
                          <h4 className="mb-2">
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            h{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            m{" "}
                            <span
                              className="counter-value"
                              data-target="25"
                            ></span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0">
                            <span className="counter-value" data-target="2390">
                              2,390
                            </span>{" "}
                            Calls
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-danger-subtle text-danger">
                            <i className="ri-arrow-down-s-fill align-middle me-1"></i>
                            4.80 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <form>
                        <div className="row g-3">
                          <div className="col-xxl-8 col-sm-12">
                            <div className="search-box">
                              <input
                                type="text"
                                className="form-control search bg-light border-light"
                                placeholder="Search"
                              />
                              {/* <i className="ri-search-line search-icon"></i> */}
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-xxl-2 col-sm-4">
                            <button
                              type="button"
                              className="btn btn-primary bg-primary w-100"
                            >
                              {" "}
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Search
                            </button>
                          </div>
                          <div className="col-6 col-md-3 col-lg-3 col-xxl-2 col-sm-4">
                            <button
                              id="advSearch"
                              type="button"
                              className="btn btn-info bg-info w-100"
                            >
                              {" "}
                              <i className="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
                              Advanced Search
                            </button>
                          </div>
                          <div
                            className="col-6 col-md-3 col-lg-3 col-xxl-12 py-2 m-0"
                            id="advSearchDiv"
                          >
                            <hr className="mb-4" />
                            <div className="d-flex gap-2">
                              <div className="col-xxl-2">
                                <Select
                                  className="js-example-basic-single"
                                  name="source"
                                  placeholder="Select Source"
                                  options={[
                                    {
                                      value: "Inbound",
                                      label: "Inbound",
                                    },
                                    {
                                      value: "Outbound",
                                      label: "Outbound",
                                    },
                                    {
                                      value: "Inbound missed",
                                      label: "Inbound missed",
                                    },
                                    {
                                      value: "Outbound missed",
                                      label: "Outbound missed",
                                    },
                                  ]}
                                />
                              </div>
                              <div className="col-xxl-2">
                                <Select
                                  className="js-example-basic-single"
                                  name="staff"
                                  placeholder="Select Staff"
                                  options={[
                                    {
                                      value: "Staff name | 2001",
                                      label: "Staff name | 2001",
                                    },
                                    {
                                      value: "Staff name | 2002",
                                      label: "Staff name | 2002",
                                    },
                                    {
                                      value: "Staff name | 2003",
                                      label: "Staff name | 2003",
                                    },
                                    {
                                      value: "Staff name | 2004",
                                      label: "Staff name | 2004",
                                    },
                                  ]}
                                />
                              </div>
                              <div className="col-xxl-2">
                                <Flatpickr
                                  options={{
                                    mode: "range",
                                    dateFormat: "d-M-Y",
                                    conjunction: "to",
                                    // defaultDate: new Date(),
                                  }}
                                  placeholder="Select Date Range"
                                  className="form-control bg-light border-light"
                                />{" "}
                              </div>
                              <div className="col-6 col-md-2 col-lg-2 col-xxl-1">
                                <button className="btn btn-success w-100">
                                  {" "}
                                  <i className="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
                                  Filter
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        {/* <!--end row--> */}
                      </form>
                    </div>
                    <div className="card-body">
                      {/* <!-- Nav tabs --> */}
                      <ul
                        className="nav nav-tabs nav-justified mb-3 gap-3"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              type == "inbound" ? "active" : ""
                            }`}
                            href="/inbound"
                          >
                            <i className="mdi mdi-phone-incoming-outline"></i>{" "}
                            Inbound
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link align-middle ${
                              type == "outbound" ? "active" : ""
                            }`}
                            href="/outbound"
                          >
                            <i className="mdi mdi-phone-outgoing-outline"></i>{" "}
                            Outbound
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link align-middle ${
                              type == "inbound missed" ? "active" : ""
                            }`}
                            href="/inbound-missed"
                          >
                            <i className="mdi mdi-phone-missed-outline"></i>{" "}
                            Inbound Missed
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link align-middle ${
                              type == "outbound missed" ? "active" : ""
                            }`}
                            href="/outbound-missed"
                          >
                            <i className="mdi mdi-phone-missed-outline"></i>{" "}
                            Outbound Missed
                          </a>
                        </li>
                      </ul>
                      {/* <!-- Nav tabs --> */}
                      <div className="tab-content text-muted">
                        <div className="tab-pane active">
                          <div className="card card-height-100 mt-4">
                            <div className="card-body">
                              <div className="table-responsive table-card">
                                <table className="table table-nowrap table-centered align-middle">
                                  <thead className="bg-light text-muted">
                                    <tr>
                                      <th scope="col">Sl No.</th>
                                      <th scope="col">Call Date</th>
                                      <th scope="col">Linked ID</th>
                                      <th scope="col">Caller ID</th>
                                      <th scope="col">Destination</th>
                                      <th scope="col">Disposition</th>
                                      <th scope="col">Duration</th>
                                      <th scope="col" className="w-[10%]">
                                        Recording
                                      </th>
                                    </tr>
                                    {/* <!-- end tr --> */}
                                  </thead>
                                  {/* <!-- thead --> */}
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td className="fw-medium">
                                        2023-08-23 09:13:52
                                      </td>
                                      <td>1692762232.2904217</td>
                                      <td>68415979</td>
                                      <td>09786855179</td>
                                      <td>
                                        <span className="badge badge-soft-success">
                                          ANSWERED
                                        </span>
                                      </td>
                                      <td className="text-muted">5:15</td>
                                      <td>
                                        <audio controls>
                                          <source src="" type="audio/ogg" />
                                          <source src="" type="audio/mpeg" />
                                          Your browser does not support the
                                          audio tag.
                                        </audio>
                                      </td>
                                    </tr>
                                    {/* <!-- end tr --> */}
                                  </tbody>
                                  {/* <!-- end tbody --> */}
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                              <div className="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                                <div className="flex-shrink-0">
                                  <div className="text-muted">
                                    Showing{" "}
                                    <span className="fw-semibold">5</span> of{" "}
                                    <span className="fw-semibold">25</span>{" "}
                                    Results{" "}
                                  </div>
                                </div>
                                <ul className="pagination pagination-separated pagination-sm mb-0">
                                  <li className="page-item disabled">
                                    <a href="#" className="page-link">
                                      ←
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a href="#" className="page-link">
                                      1
                                    </a>
                                  </li>
                                  <li className="page-item active">
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
                                      →
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* <!-- end card body --> */}
                          </div>
                          {/* <!-- end card --> */}
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card-body --> */}
                  </div>
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <Footer/>
        </div>
      </div>
    </>
  );
}