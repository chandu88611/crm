/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

export default function ExtensionCommon({ type }) {
  const location=useLocation()
  
  const handleViewExtension = (ext) => {
    window.location.href = `/extensions/view/${ext}`
  }
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
                    <h4 className="mb-sm-0 font-size-18"> Active Extensions</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Extensions</a>
                        </li>
                        <li className="breadcrumb-item active">{type}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row gy-2 mb-2" id="">
                <div className="col-xl-8">
                  <table
                    id="example"
                    className="table dt-responsive nowrap table-striped align-middle w-full"
                  >
                    <thead>
                      <tr className="bg-white">
                        <th scope="col">
                          <span className="pl-3"></span>
                        </th>
                        <th scope="col">Extension</th>
                       { <th scope="col">Validity</th>}
                       { <th scope="col">Created Date</th>}
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="shadow bg-white">
                        <td className="text-center">
                          <strong>1</strong>
                        </td>
                        <td className="fs-14">8002</td>
                        <td>
                          <span className="badge bg-primary-subtle text-primary badge-border fs-12">
                            9 Months
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-soft-info text-info fs-12">
                            24 August, 2023
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge border ${
                              type == "Inactive"
                                ? "border-danger text-danger"
                                : "border-success text-success"
                            } text-uppercase`}
                          >
                            {type}
                          </span>
                        </td>
                        <td>
                          <div>
                            <a
                              onClick={()=>handleViewExtension(8002)}
                              className="btn btn-primary py-0"
                            >
                              <i className="mdi mdi-account-eye-outline"></i>{" "}
                              {type == "Active" ? "View" : "View"}
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="shadow bg-white">
                        <td className="text-center">
                          <strong>2</strong>
                        </td>
                        <td className="fs-14">8002</td>
                        <td>
                          <span className="badge bg-success-subtle text-success badge-border fs-13">
                            1 Year
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-soft-info text-info fs-12">
                            24 August, 2023
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge border ${
                              type == "Inactive"
                                ? "border-danger text-danger"
                                : "border-success text-success"
                            } text-uppercase`}
                          >
                            {type}
                          </span>
                        </td>
                        <td>
                          <div>
                            <a
                              onClick={()=>handleViewExtension(8002)}
                              className="btn btn-primary py-0"
                            >
                              <i className="mdi mdi-account-eye-outline"></i>{" "}
                              {type == "Active" ? "View" : "View"}
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="shadow bg-white">
                        <td className="text-center">
                          <strong>3</strong>
                        </td>
                        <td className="fs-14">8002</td>
                        <td>
                          <span className="badge bg-primary-subtle text-primary badge-border fs-12">
                            6 Months
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-soft-info text-info fs-12">
                            24 August, 2023
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge border ${
                              type == "Inactive"
                                ? "border-danger text-danger"
                                : "border-success text-success"
                            } text-uppercase`}
                          >
                            {type}
                          </span>
                        </td>
                        <td>
                          <div>
                            <a
                              onClick={()=>handleViewExtension(8002)}
                              className="btn btn-primary py-0"
                            >
                              <i className="mdi mdi-account-eye-outline"></i>{" "}
                              {type == "Active" ? "View" : "View"}
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="shadow bg-white">
                        <td className="text-center">
                          <strong>4</strong>
                        </td>
                        <td className="fs-14">8002</td>
                        <td>
                          <span className="badge bg-success-subtle text-success badge-border fs-13">
                            1 Year
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-soft-info text-info fs-12">
                            24 August, 2023
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge border ${
                              type == "Inactive"
                                ? "border-danger text-danger"
                                : "border-success text-success"
                            } text-uppercase`}
                          >
                            {type}
                          </span>
                        </td>
                        <td>
                          <div>
                            <a
                              onClick={()=>handleViewExtension(8002)}
                              className="btn btn-primary py-0"
                            >
                              <i className="mdi mdi-account-eye-outline"></i>{" "}
                              {type == "Active" ? "View" : "View"}
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="shadow bg-white">
                        <td className="text-center">
                          <strong>5</strong>
                        </td>
                        <td className="fs-14">8002</td>
                        <td>
                          <span className="badge bg-primary-subtle text-primary badge-border fs-12">
                            3 Months
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-soft-info text-info fs-12">
                            24 August, 2023
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge border ${
                              type == "Inactive"
                                ? "border-danger text-danger"
                                : "border-success text-success"
                            } text-uppercase`}
                          >
                            {type}
                          </span>
                        </td>
                        <td>
                          <div>
                            <a
                              onClick={()=>handleViewExtension(8002)}
                              className="btn btn-primary py-0"
                            >
                              <i className="mdi mdi-account-eye-outline"></i>{" "}
                              {type == "Active" ? "View" : "View"}
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-xl-4">
                  <div className="sticky-side-div">
                    <div className="card">
                      <div className="card-header border-bottom-dashed d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">Extension Details</h5>
                        <a
                          // href="extension-history.html"
                          className="btn btn-soft-info waves-effect waves-light py-0"
                        >
                          View History
                        </a>
                      </div>
                      <div className="card-body pt-2">
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Extension Number</td>
                                <td className="text-end">
                                  <b>8002</b>
                                </td>
                              </tr>
                              <tr>
                                <td>IP/Domain:Port</td>
                                <td className="text-end">
                                  <b>127.0.0.1:2003</b>
                                </td>
                              </tr>
                              <tr className="table-active">
                                <th>Status</th>
                                <td className="text-end">
                                  <span
                                    className={`badge ${
                                      type == "Inactive"
                                        ? "badge-outline-danger"
                                        : "badge-outline-success"
                                    } fs-12`}
                                  >
                                    {type}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* <!-- end table-responsive --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- end stickey --> */}
                </div>
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