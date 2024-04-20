/* eslint-disable no-unused-vars */
import Footer from "../Footer";
import Header from "../Header";
import Select from "react-select"
import NewEnquiriesTable from "./newEnquiriesTable";
import { useEffect, useState } from "react";
import TableLoader from "../TableLoader";
import { useLazyGetNewEnqQuery } from "../../../services/api";

export default function NewEnquiries() {

      const [enqView, setEnqView] = useState(false);
      const [enqSelected, setEnqSelected] = useState({});

      const enquirySelected = (row) => {
        console.log(row, "enqSelected");
        setEnqSelected(row);
      };

      const [
        getNewEnquiries,
        { data: newEnq, isLoading:dEnqLoading, error: Error },
      ] = useLazyGetNewEnqQuery();

      useEffect(() => {
        getNewEnquiries();
      }, []);
  
      useEffect(() => {
        setTimeout(() => {
          // console.log(enqSelected?.name != undefined)
          if (enqSelected?.email != undefined) {
            setEnqView(true);
          }
        }, 1000);
      }, [enqSelected]);
  
  
    const handleCloseViewEnqDetails = () => {
      setEnqSelected();
      setEnqView(false);
    };
  
  
  return (
    <>
      {dEnqLoading && <TableLoader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Enquiries</a>
                        </li>
                        <li className="breadcrumb-item active">New</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row">
                <div
                  className={`${
                    enqSelected?.email != undefined
                      ? "col-lg-9 slideAnim"
                      : "col-12"
                  }`}
                >
                  <div>
                    <NewEnquiriesTable
                      type={"new"}
                      data={newEnq}
                      enquirySelected={enquirySelected}
                      refetch={getNewEnquiries}
                    />
                    {/* <!--end card-body--> */}
                  </div>
                  {/* <!--end card--> */}
                </div>
                {enqView && (
                  <div className="col-lg-3 pulse">
                    <div className="card" id="contact-view-detail">
                      {/* <p
                        className="p-2 text-end cursor-pointer text-lg text-muted mb-0"
                        onClick={() => handleCloseViewEnqDetails()}
                      >
                        X
                      </p> */}
                      <div className="card-body text-center ">
                        <div className="position-relative d-inline-block">
                          <img
                            src="/assets/images/users/default_proile_image.png"
                            alt=""
                            className="avatar-lg rounded-circle img-thumbnail"
                          />
                          <span className="contact-active position-absolute rounded-circle bg-success">
                            <span className="visually-hidden"></span>
                          </span>
                        </div>
                        <h5 className="mt-4 capitalize h5">
                          {enqSelected?.name}
                        </h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item avatar-xs">
                            <a
                              href="javascript:void(0);"
                              className="avatar-title bg-soft-success text-success fs-15 rounded"
                            >
                              <i className="ri-phone-line"></i>
                            </a>
                          </li>
                          <li className="list-inline-item avatar-xs">
                            <a
                              href="javascript:void(0);"
                              className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                            >
                              <i className="ri-mail-line"></i>
                            </a>
                          </li>
                          <li className="list-inline-item avatar-xs">
                            <a
                              href="javascript:void(0);"
                              className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                            >
                              <i className="ri-question-answer-line"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td
                                  className="fw-bold py-1"
                                  width="200"
                                  scope="row"
                                >
                                  Email ID
                                </td>
                                <td className="py-1">{enqSelected?.email}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Phone No
                                </td>
                                <td className="py-1">{enqSelected?.phone}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  City
                                </td>
                                <td className="py-1">{enqSelected?.city}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  State
                                </td>
                                <td className="py-1">{enqSelected?.state}</td>
                              </tr>
                              <tr></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          className="btn btn-secondary bg-secondary w-full "
                          onClick={() => handleCloseViewEnqDetails()}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    {/* <!--end card--> */}
                  </div>
                )}
                {/* <!--end col--> */}
              </div>
              {/* <!-- end row --> */}
              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="createTask"
                tabIndex="-1"
                aria-labelledby="createTaskLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0">
                    <div className="modal-header p-3 bg-soft-success">
                      <h5 className="modal-title" id="createTaskLabel">
                        Create Comment
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        id="createTaskBtn-close"
                        aria-label="Close"
                      >
                        X
                      </button>
                    </div>
                    <div className="modal-body">
                      <div
                        id="task-error-msg"
                        className="alert alert-danger py-2"
                      ></div>
                      <form autoComplete="off" action="" id="creattask-form">
                        <input
                          type="hidden"
                          id="taskid-input"
                          className="form-control"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="task-title-input"
                            className="form-label"
                          >
                            Comment Title
                          </label>
                          <input
                            type="text"
                            id="task-title-input"
                            className="form-control"
                            placeholder="Enter task title"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="task-title-input"
                            className="form-label"
                          >
                            Comment
                          </label>
                          <textarea
                            name="name"
                            className="form-control"
                            rows=""
                            cols=""
                          ></textarea>
                          {/* <!-- <input type="text" id="task-title-input" class="form-control" placeholder="Enter task title"> --> */}
                        </div>
                        <div className="mb-3 position-relative">
                          <label
                            htmlFor="task-assign-input"
                            className="form-label"
                          >
                            Assigned To :{" "}
                            <span className="text-muted">Staff Name</span>{" "}
                          </label>
                          <div
                            className="avatar-group justify-content-center"
                            id="assignee-member"
                          >
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item mb-2"
                              data-img="assets/images/users/default_proile_image.png"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="John Robles"
                            >
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                alt=""
                                className="rounded-circle avatar-xs"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="row g-4 mb-3">
                          <div className="col-lg-6">
                            <label htmlFor="task-status" className="form-label">
                              Status
                            </label>
                            <Select
                              className=""
                              name="Enquiry Status"
                              placeholder="Enquiry Status"
                              options={[
                                {
                                  value: "Ringing",
                                  label: "Ringing",
                                },
                                {
                                  value: "Postponed",
                                  label: "Postponed",
                                },
                                {
                                  value: "Not Interested",
                                  label: "Not Interested",
                                },
                                {
                                  value: "Completed",
                                  label: "Completed",
                                },
                              ]}
                            />
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="priority-field"
                              className="form-label"
                            >
                              Post Time
                            </label>
                            <input
                              type="text"
                              className="form-control flatpickr-input active"
                              data-provider="timepickr"
                              data-time-hrs="true"
                              id="timepicker-24hrs"
                              readOnly="readonly"
                            />
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="task-duedate-input"
                            className="form-label"
                          >
                            Post Date
                          </label>
                          <input
                            type="text"
                            className="form-control flatpickr-input active"
                            data-provider="flatpickr"
                            data-date-format="d M, Y"
                            placeholder="DD MM, YYYY"
                            readOnly="readonly"
                          />
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-ghost-success"
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-fill align-bottom"></i> Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary bg-primary"
                            id="addNewTodo"
                          >
                            Add Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--end create taks--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <Footer />
        </div>
      </div>
    </>
  );
}