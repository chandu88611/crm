/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import SimpleBar from "simplebar-react";
import Swal from "sweetalert2";
import { useLazyGetStaffsQuery, useStaffStatusMutation } from "../../../services/api";
import Loader from "../Loader";

export default function CommonStaffs({ type }) {
  const [tableData, setTableData] = useState([]);
  const [staffSelected, setStaffSelected] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  const [copyData, setCopyData] = useState()
  const [showStaffDetails, setShowStaffDetails] = useState(false);
    const staffSelect = (row) => {
      console.log(row, "enqSelected");
      setStaffSelected(row);
    };

    useEffect(() => {
      setTimeout(() => {
        if (staffSelected) {
          setShowStaffDetails(true);
        }
      }, 1000);
    }, [staffSelected]);

  const [getStaffs, {data:staffData, isLoading}] = useLazyGetStaffsQuery()

  useEffect(() => {
    const fetchStaffs = async () => {
      const response = await getStaffs(type?.toLowerCase()); 
      if (response?.data?.status) {
        setTableData(response?.data?.data?.staffs)
        setCopyData(response?.data?.data?.staffs);
      }
    }
    fetchStaffs()
       
  }, [type,staffData ])

  const [staffStatusUpdate, { isLoading: statusLoading }] =
    useStaffStatusMutation()
  
  const handleStatusChange = async() => {
    const response = await staffStatusUpdate({ id: staffSelected?.id, status: staffSelected?.status == 0 ? "active" : "inactive" })
    if (response?.data?.status) {
      Swal.fire({
        title: "Success!",
        text: response?.data?.message,
        icon: "success",
        showCancelButton: !1,
        confirmButtonText: "Ok",
        confirmButtonColor: "btn btn-info  w-xs me-2 mt-2",
        buttonsStyling: 1,
        showCloseButton: !0,
      });
    }
  }


  const handleSearch = () => {
    const staffTData = [...copyData]
    const lowerSearch = searchTerm;
    if (searchTerm != "") {
      const filteredData = staffTData?.find((staff) => {
        return (
          staff?.name?.toLocaleLowerCase().includes(lowerSearch?.toLocaleLowerCase()) ||
          staff?.email?.toLocaleLowerCase().includes(lowerSearch?.toLocaleLowerCase()) ||
          staff?.branch?.toLocaleLowerCase().includes(lowerSearch?.toLocaleLowerCase()) ||
          staff?.extension?.ext_number == lowerSearch
        );
      });
      console.log(filteredData);
      if (filteredData) {
        setTableData([filteredData]);
      } else if (filteredData == undefined) {
        setTableData([]);
      }
    } else {
      setTableData(copyData)
    }
    
    
  }

      const handleCloseViewEnqDetails = () => {
        setShowStaffDetails();
        setStaffSelected(false);
      };

  
  return (
    <>
      {statusLoading && <Loader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18 h4">Staffs {type}</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Staffs</a>
                        </li>
                        <li className="breadcrumb-item active">{type}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row h-100">
                <div className="col-lg-3 col-md-6">
                  <div className="card card-animate">
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
                          <h4 className="mb-2 h4">
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            h{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            m{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              0
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
                  <div className="card card-animate">
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
                          <h4 className="mb-2 h4">
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            h{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            m{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              0
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
                  <div className="card card-animate">
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
                          <h4 className="mb-2 h4">
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            h{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            m{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              0
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
                  <div className="card card-animate">
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
                          <h4 className="mb-2 h4">
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            h{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            m{" "}
                            <span className="counter-value" data-target="25">
                              0
                            </span>
                            s
                          </h4>
                          <h6 className="text-muted mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              0
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
                <div
                  className={`${
                    staffSelected ? "col-lg-9 slideAnim" : "col-lg-12"
                  }`}
                >
                  <div className="card" id="tasks{type}">
                    <div className="card-header border-0">
                      <div className="d-flex align-items-center gap-2">
                        <h5 className="card-title mb-0 flex-grow-1 h5">
                          Staffs {type}
                        </h5>
                        {/* <span className="btn btn-warning btn-sm fs-12 py-1">
                          Inactive
                        </span>
                        <span className="btn btn-danger bg-danger btn-sm fs-12 py-1">
                          Terminate
                        </span> */}
                      </div>
                    </div>
                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <form>
                        <div className="row g-3">
                          <div className="col-xxl-10 col-lg-8 col-sm-12">
                            <div className="search-box">
                              <input
                                type="text"
                                className="form-control search bg-light border-light"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) =>
                                  setSearchTerm(e?.target?.value)
                                }
                              />
                              {/* <i className="ri-search-line search-icon"></i> */}
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-xxl-2 col-sm-4">
                            <button
                              type="button"
                              className="btn btn-primary bg-primary w-100"
                              onClick={() => handleSearch()}
                            >
                              {" "}
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Search
                            </button>
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        {/* <!--end row--> */}
                      </form>
                    </div>
                    {/* <!--end card-body--> */}
                    <div className="card-body">
                      <div className="table-responsive table-card mb-4">
                        <SimpleBar data-simplebar className="max-h-[500px]">
                          <table
                            className="table dt-responsive w-100"
                            id="example"
                          >
                            <thead className="table-light text-muted">
                              <tr>
                                {/* <th scope="col" className="w-[40px]">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="checkAll"
                                      value="option"
                                    />
                                  </div>
                                </th> */}
                                <th>Ext No.</th>
                                <th className="w-4">Name</th>
                                <th>Branch</th>
                                <th>Created Date</th>
                                <th>Last Login</th>
                              </tr>
                            </thead>
                            <tbody className="list form-check-all">
                              {tableData?.map((staff, ind) => (
                                <tr key={ind}>
                                  {/* <td scope="row">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="chk_child"
                                        value="option1"
                                      />
                                    </div>
                                  </td> */}
                                  <td
                                    className="cursor-pointer"
                                    onClick={() => staffSelect(staff)}
                                  >
                                    <a className="fw-medium link-primary pl-2">
                                      {staff?.extension?.ext_number}
                                    </a>
                                  </td>
                                  <td
                                    className="cursor-pointer "
                                    onClick={() => staffSelect(staff)}
                                  >
                                    <a className="fw-medium link-primary fs-16">
                                      {staff?.name}
                                    </a>
                                    <p className="mb-0">{staff?.email}</p>
                                  </td>
                                  <td
                                    className="cursor-pointer"
                                    onClick={() => staffSelect(staff)}
                                  >
                                    <span>
                                      {staff?.branches?.map((branch, index) => (
                                        <p
                                          className="badge badge-soft-primary"
                                          key={index}
                                        >
                                          {branch}
                                        </p>
                                      ))}
                                    </span>
                                  </td>
                                  <td
                                    className="cursor-pointer"
                                    onClick={() => staffSelect(staff)}
                                  >
                                    <span className="badge badge-soft-secondary p-2 fs-12">
                                      {new Date(
                                        staff?.created_at
                                      ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </td>
                                  <td className="cursor-pointer">
                                    <span>NA </span>
                                  </td>
                                </tr>
                              ))}
                              {tableData?.length == 0 && (
                                <>
                                  <tr key={0}>
                                    <td colSpan={8}>
                                      <p className="text-center w-full text-lg">
                                        No data found
                                      </p>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </SimpleBar>
                        {isLoading && <Loader />}
                        {/* <!--end table--> */}
                        <div className="noresult hidden">
                          <div className="text-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon>
                            <h5 className="mt-2 h5">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">
                              We&apos;ve searched more than 200k+ tasks We did
                              not find any tasks for you search.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--end card-body--> */}
                  </div>
                  {/* <!--end card--> */}
                </div>
                {showStaffDetails && (
                  <div className="col-lg-3 pulse">
                    <div className="card" id="contact-view-detail">
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
                        <h5 className="mt-4 h5">{staffSelected?.name}</h5>
                        {/* <!-- <p class="text-muted">Nesta Technologies</p> --> */}
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
                        {/* <!-- <h6 class="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6> --> */}
                        {/* <!-- <p class="text-muted mb-4">Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the job you are applying for. It states what kind of career you are seeking, and what skills and experiences.</p> --> */}
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
                                <td className="py-1">{staffSelected?.email}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Phone No
                                </td>
                                <td className="py-1">{staffSelected?.phone}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Ext No
                                </td>
                                <td className="py-1">
                                  <span className="badge badge-soft-info fs-12">
                                    {staffSelected?.extension?.ext_number}
                                  </span>
                                </td>
                              </tr>
                              {/* <tr>
                                <td
                                  valign="top"
                                  className="fw-bold"
                                  scope="row"
                                >
                                  Branch id
                                </td>
                                <td className="py-1">
                                  {staffSelected?.branch_id}
                                </td>
                              </tr> */}
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Branch
                                </td>
                                <td className="py-1">
                                  {staffSelected?.branches?.map(
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
                                    View
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Status
                                </td>
                                <td className="py-1">
                                  <span
                                    className={`badge badge-outline-${
                                      staffSelected?.status == 0
                                        ? "danger"
                                        : "success"
                                    } fs-12`}
                                  >
                                    {staffSelected?.status == 0
                                      ? "Inactive"
                                      : "Active"}
                                  </span>{" "}
                                  |
                                  <a
                                    onClick={() => handleStatusChange()}
                                    className="text-warning cursor-pointer"
                                  >
                                    &nbsp;Change
                                  </a>
                                </td>
                              </tr>
                              {/* <tr>
                              <td
                                colSpan="2"
                                className="pt-1 pb-3"
                                align="right"
                              >
                                <span>
                                  <a
                                    className="text-primary"
                                    href="edit-profile.html"
                                  >
                                    <i className="mdi mdi-square-edit-outline"></i>{" "}
                                    Edit
                                  </a>
                                </span>{" "}
                                |
                                <span>
                                  <button
                                    className="btn text-danger px-0"
                                    id="sa-dialog-three-btn"
                                  >
                                    <i className="mdi mdi-trash-can-outline"></i>{" "}
                                    Terminate
                                  </button>
                                </span>
                              </td>
                            </tr> */}
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
                      <h5 className="modal-title h5" id="createTaskLabel">
                        Create Comment
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        id="createTaskBtn-close"
                        aria-label="Close"
                      >X</button>
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
                            <select
                              className="form-control"
                              data-choices
                              data-choices-search-false
                              id="task-status-input"
                            >
                              <option value="">Status</option>
                              <option value="Ringing" selected>
                                Ringing
                              </option>
                              <option value="Postponed">Postponed</option>
                              <option value="Not Interested">
                                Not Interested
                              </option>
                              <option value="Completed">Completed</option>
                            </select>
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