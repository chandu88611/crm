/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import {
  useInactiveStaffQuery,
  useLazyGetAllStaffsQuery,
  useLazyViewStaffQuery,
  useStaffTransferDetailsMutation,
  useStaffTransferEnquiriesMutation,
  useTerminatedStaffQuery,
} from "../../../services/api";     
import Loader from "../Loader";
import Logs from "./WebhookComponent";
import { useSelector } from "react-redux";
import Pusher from "pusher-js";
import { App_Cluster, App_key } from "../../../utils/pusher";

export default function Transfer() {
  const userData = useSelector((state) => state?.user?.value);
  const [getAllStaffs, setGetAllStaffs] = useState([]);
  const [fromStaff, setFromstaff] = useState();
  const [fromStaffDetails, setFromStaffDetails] = useState();
  const [toStaffDetails, setToStaffDetails] = useState();
  const [toStaff, setToStaff] = useState();
  const [showTransferComponent, setShowTransferComponent] = useState(false);
  const [transferData, setTransferData] = useState([]);
  const [confirmTransfer, setConfirmTransfer] = useState();
  const [confirmTransfer1, setConfirmTransfer1] = useState();
  // const [getStaffs, { data: staffData, isLoading }] =
  //   useLazyGetAllStaffsQuery();
  const { data: terminatedStaff } = useTerminatedStaffQuery();
  const { data: inactiveStaff } = useInactiveStaffQuery();
  const [getStaffDetails, { isLoading: gtLoading }] = useLazyViewStaffQuery();

  const [transferStaff, { isLoading: stLoading }] =
    useStaffTransferDetailsMutation();
  const [webhookData, setWebhookData] = useState([]);

  const [confirmTransferEnq, { isLoading: transferload }] =
    useStaffTransferEnquiriesMutation();
  useEffect(() => {
    const confirmTransferEnquiries = async () => {
      const response = await confirmTransferEnq({
        from_staff_id: fromStaff?.value,
        to_staff_id: toStaff?.value,
      });
      console.log(response);
      if (response?.data?.status) {
        setConfirmTransfer1(!confirmTransfer1);
      }
      return response?.data?.status;
    };

    if (confirmTransfer) {
      const status = confirmTransferEnquiries();
      // if (status) {

      // }
    }

    // Replace this URL with the actual URL of your React app's webhook endpoint
  }, [confirmTransfer]);
 
  // useEffect(() => {
  //         Pusher.logToConsole = true;
  //         const pusher = new Pusher("e34e33300dc2cfbed6b7", {
  //           cluster: "ap2",
  //         });
  //         const channel = pusher.subscribe("payment-checked");
  //         channel.bind("App\\Events\\Payment", (data) => {
  //           if (data.status === "Success") {
  //             // Handle success case
  //             console.log("Payment success:", data);
  //           } else if (data.status === "Failed") {
  //             // Handle failure case
  //             console.log("Payment failed:", data);
  //           } else {
  //             // Handle other cases
  //             console.log("Other status:", data);
  //           }
  //         });

  // }, [confirmTransfer])

  // useEffect(() => {
  //   Pusher.logToConsole = true;
  //   const pusher = new Pusher(App_key, {
  //     cluster: App_Cluster,
  //     encrypted: true,
  //   });

  //   const channel = pusher.subscribe(`teamleader@gmail.com`);
  //   console.log("Subscribed to channel...");
  //   channel.bind("App\\Events\\EnquiryTransferLog", (data) => {
  //     setWebhookData((prev) => [...prev, data?.data]);
  //   });

  //   // Cleanup function
  //   return () => {
  //     // Unsubscribe from Pusher channel when component unmounts
  //     channel.unbind();
  //     pusher.unsubscribe("payment-checked");
  //   };
  // }, [confirmTransfer])

  // useEffect(() => {
  //   const fetchStaffs = async () => {
  //     const response = await getStaffs();
  //     if (response?.data?.status) {
  //       setGetAllStaffs(response?.data?.data?.staffs);
  //     }
  //   };
  //   fetchStaffs();
  // }, [staffData]);

  const handleTransfer = async () => {
    const response = await transferStaff({
      from_staff_id: fromStaff?.value,
      to_staff_id: toStaff?.value,
    });
    if (response?.data?.status) {
      setShowTransferComponent(true);
      setTransferData(response?.data?.data);
    }
  };

  useEffect(() => {
    console.log(fromStaff);
    const fetchFromStaffDetails = async () => {
      const response = await getStaffDetails(fromStaff?.value);
      if (response?.data?.status) {
        setFromStaffDetails(response?.data?.staff);
      }
    };

    if (fromStaff?.value) {
      fetchFromStaffDetails();
    }
  }, [fromStaff]);

  useEffect(() => {
    const fetchFromStaffDetails = async () => {
      const response = await getStaffDetails(toStaff?.value);
      if (response?.data?.status) {
        setToStaffDetails(response?.data?.staff);
      }
    };

    if (toStaff?.value) {
      fetchFromStaffDetails();
    }
  }, [toStaff]);

  useEffect(() => {
    if (confirmTransfer1) {
      Pusher.logToConsole = true;
      const pusher = new Pusher(App_key, {
        cluster: App_Cluster,
        encrypted: true,
      });

      const channel = pusher.subscribe(userData?.staff?.email);
      console.log("Subscribed to channel...");
      channel.bind("App\\Events\\EnquiryTransferLog", (data) => {
   
        setWebhookData((prev) => [...prev, data?.data]);
      });

      // Cleanup function
      return () => {
        channel.unbind();
        pusher.unsubscribe(userData?.staff?.email);
        pusher.disconnect();
      };
    }
  }, [confirmTransfer1]);

  const handleToStaff = (staffVal) => {
    setToStaff(staffVal);
    setConfirmTransfer();
    setShowTransferComponent(false);
  };

  const handleFromStaff = (staffVal) => {
    setFromstaff(staffVal);
    setConfirmTransfer();
    setShowTransferComponent(false);
  };

  return (
    <>
      { (stLoading && <Loader />)}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18 h4">
                      Staffs Enquiries Transfer
                    </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Staffs</a>
                        </li>
                        <li className="breadcrumb-item active">Transfer</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row">
                <div
                  className={` ${
                    showTransferComponent ? "slideAnim col-lg-3" : "col-lg-4"
                  }`}
                >
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-2 h4">From</h4>
                    </div>
                    {/* <!-- end card header --> */}
                    <div className="card-body">
                      <div className="mb-3">
                        <p className="text-muted">
                          Select Staff you want to <b>transfer</b>
                        </p>
                        <Select
                          className=""
                          name="State"
                          placeholder="Select Staff"
                          value={fromStaff}
                          options={terminatedStaff?.data?.staffs?.map(
                            (staff) => ({
                              value: staff?.id,
                              label: staff?.name ? staff.name.charAt(0).toUpperCase() + staff.name.slice(1) : "",
                            })
                          )}
                          onChange={(staffVal) => handleFromStaff(staffVal)}
                        />
                      </div>
                    </div>
                  </div>
                  {fromStaff?.value && (
                    <div className="card">
                      <div className="card-body text-center">
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
                        <h5 className="mt-4 h5 capitalize">{fromStaffDetails?.name}</h5>
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
                        <div className="table-responsive table-card pb-3">
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
                                <td
                                  className="py-1"
                                  style={{
                                    wordWrap: "break-word",
                                    width: "50px",
                                  }}
                                >
                                  <article className="!text-wrap w-fit">
                                    {fromStaffDetails?.email}
                                  </article>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Phone No
                                </td>
                                <td className="py-1">
                                  {fromStaffDetails?.phone}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Ext No
                                </td>
                                <td className="py-1">
                                  <span className="badge badge-soft-info fs-12">
                                    {fromStaffDetails?.extension?.ext_number}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Branches
                                </td>
                                <td className="py-1">
                                  {fromStaffDetails?.branches?.map(
                                    (branch, id) => (
                                      <p
                                        className="badge badge-soft-primary"
                                        key={id}
                                      >
                                        {branch}
                                      </p>
                                    )
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Staff Activity
                                </td>
                                <td className="py-1">
                                  <span className="btn btn-secondary bg-secondary btn-sm fs-12 py-0">
                                    {fromStaffDetails?.status == 1
                                      ? "Active"
                                      : "Inactive"}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <!--end card--> */}
                </div>
                {/* <!--end col--> */}
                <div
                  className={` ${
                    showTransferComponent ? "slideAnim col-lg-3" : "col-lg-4"
                  }`}
                >
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0 h4">To</h4>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary bg-primary"
                        name="button"
                        disabled={!fromStaff || !toStaff}
                        onClick={() => {
                          handleTransfer();
                        }}
                      >
                        {" "}
                        <i className="bx bx-transfer"></i> Get Transfer Details
                      </button>
                    </div>
                    {/* <!-- end card header --> */}
                    <div className="card-body">
                      <div className="mb-3">
                        <p className="text-muted">
                          Select Staff you want to <b>assign</b>
                        </p>
                        <Select
                          className=""
                          name="State"
                          placeholder="Select Staff"
                          value={toStaff}
                          options={inactiveStaff?.data?.staffs?.map(
                            (staff) => ({
                              value: staff?.id,
                              label: staff?.name ? staff.name.charAt(0).toUpperCase() + staff.name.slice(1) : "",
                            })
                          )}
                          // options={inactiveStaff?.data?.staffs?.filter(data=>data?.ext_number==null).map((staff) => ({
                          //   value: staff?.id,
                          //   label: staff?.name,
                          // }))}
                          onChange={(staffVal) => {
                            console.log(staffVal);
                            handleToStaff(staffVal);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {toStaff?.value && (
                    <div className="card">
                      <div className="card-body text-center">
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
                        <h5 className="mt-4 h5 capitalize">{toStaffDetails?.name}</h5>
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
                        <div className="table-responsive table-card pb-3">
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
                                <td className="py-1">
                                  {toStaffDetails?.email}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Phone No
                                </td>
                                <td className="py-1">
                                  {toStaffDetails?.phone}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Ext No
                                </td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    {toStaffDetails?.extension?.ext_number}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Branches
                                </td>
                                <td className="py-1">
                                  {toStaffDetails?.branches?.map(
                                    (branch, id) => (
                                      <p
                                        className="badge badge-soft-primary"
                                        key={id}
                                      >
                                        {branch}
                                      </p>
                                    )
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Staff Activity
                                </td>
                                <td className="py-1">
                                  <span className="btn btn-secondary bg-secondary btn-sm fs-12 py-0">
                                    {toStaffDetails?.staff?.status == 1
                                      ? "Active"
                                      : "Inactive"}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <!--end card--> */}
                </div>
                {/* <!--end col--> */}
                {true && (
                  <div
                    className={`${
                      showTransferComponent ? "col-lg-4" : "col-lg-4"
                    } pulse`}
                  >
                    <div className="card">
                      <div className="card-header flex items-center justify-between">
                        <h4 className="card-title mb-0 h4">Transfer logs</h4>
                        {/* {showTransferComponent && <button className="btn btn-secondary bg-secondary float-right" onClick={()=>setShowTransferComponent(false)}>Close</button>} */}
                      </div>
                      <div className="card-body">
                        <SimpleBar
                          className="alert alert-dark max-h-[565px] bg-dark text-white"
                          data-simplebar
                          role="alert"
                        >
                          {!showTransferComponent && (
                            <div>
                              <ul>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder bg-primary col-2"></span>
                                  </p>
                                </li>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-8"></span>
                                    <span className="placeholder col-2"></span>
                                  </p>
                                </li>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-2"></span>
                                    <span className="placeholder bg-info col-8"></span>
                                  </p>
                                </li>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-3"></span>
                                    <span className="placeholder bg-danger col-6"></span>
                                  </p>
                                </li>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-2"></span>
                                    <span className="placeholder col-6"></span>
                                  </p>
                                </li>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder bg-success col-2"></span>
                                  </p>
                                </li>
                                <li className="py-1">
                                  <p className="card-text placeholder-glow m-1 row gap-1 mb-1">
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-2"></span>
                                  </p>
                                </li>
                              </ul>
                            </div>
                          )}
                          {showTransferComponent && !confirmTransfer && (
                            <div>
                              <ul>
                                <li className="py-1">
                                  CUSTOMERS:{" "}
                                  <span className="text-primary">
                                    {transferData?.customers}
                                  </span>
                                </li>
                                <li className="py-1">
                                  SIGNED ENQUIRIES :{" "}
                                  <span className="text-secondary">
                                    {transferData?.SIGNED}
                                  </span>
                                </li>
                                <li className="py-1">
                                  RINGING ENQUIRIES:{" "}
                                  <span className="text-warning">
                                    {transferData?.RINGING}
                                  </span>
                                </li>
                                <li className="py-1">
                                  POSTPONED ENQUIRIES:{" "}
                                  <span className="text-danger">
                                    {transferData?.POSTPONED}
                                  </span>
                                </li>
                                <li className="py-1">
                                  NEW ENQUIRIES:{" "}
                                  <span className="text-success">
                                    {transferData?.NEW}
                                  </span>
                                </li>
                                <li className="py-1">
                                  NOTINTERESTED ENQUIRIES:{" "}
                                  <span className="text-danger">
                                    {transferData?.NOTINTERESTED}
                                  </span>
                                </li>
                                <li className="py-1">
                                  EXISTING ENQUIRIES:{" "}
                                  <span className="text-info">
                                    {transferData?.EXISTING}
                                  </span>
                                </li>
                                <li className="py-1">
                                  REVIEW ENQUIRIES:{" "}
                                  <span className="text-danger">
                                    {transferData?.REVIEW}
                                  </span>
                                </li>
                              </ul>
                              <button
                                className="btn btn-secondary bg-secondary text-black font-semibold"
                                onClick={() => setConfirmTransfer(true)}
                              >
                                Confirm Transfer
                              </button>
                            </div>
                          )}
                          {confirmTransfer && (
                            <div>
                              <ul>
                                {webhookData?.map((data, ind) => (
                                  <li
                                    key={ind}
                                    className={`${
                                      data?.status == "true"
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {data?.description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </SimpleBar>
                      </div>
                    </div>
                  </div>
                )}
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
                      <h5 className="modal-title h5" id="createTaskLabel">
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
                              name="status"
                              placeholder="Select Status"
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
                                  value: "Rejected",
                                  label: "Rejected",
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
