// import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select"
import Header from "../Header";


export default function Tickets() {
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
                    <h4 className="mb-sm-0">Tickets List</h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Tickets</a>
                        </li>
                        <li className="breadcrumb-item active">List</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}

              <div className="row">
                <div className="col-xxl-3 col-sm-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="fw-medium text-muted mb-0">
                            Total Tickets
                          </p>
                          <h4 className="mt-4 ff-secondary fw-semibold">
                            <span className="counter-value" data-target="547">
                              0
                            </span>
                            k
                          </h4>
                          <p className="mb-0 text-muted">
                            <span className="badge bg-light text-success mb-0">
                              {" "}
                              <i className="ri-arrow-up-line align-middle"></i>{" "}
                              17.32 %{" "}
                            </span>{" "}
                            vs. previous month
                          </p>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-primary text-primary rounded-circle fs-4">
                              <i className="ri-ticket-2-line"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>{" "}
                  {/* <!-- end card--> */}
                </div>
                {/* <!--end col--> */}
                <div className="col-xxl-3 col-sm-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="fw-medium text-muted mb-0">
                            Pending Tickets
                          </p>
                          <h4 className="mt-4 ff-secondary fw-semibold">
                            <span className="counter-value" data-target="124">
                              0
                            </span>
                            k
                          </h4>
                          <p className="mb-0 text-muted">
                            <span className="badge bg-light text-danger mb-0">
                              {" "}
                              <i className="ri-arrow-down-line align-middle"></i>{" "}
                              0.96 %{" "}
                            </span>{" "}
                            vs. previous month
                          </p>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-warning text-warning rounded-circle fs-4">
                              <i className="mdi mdi-timer-sand"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                </div>
                {/* <!--end col--> */}
                <div className="col-xxl-3 col-sm-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="fw-medium text-muted mb-0">
                            Closed Tickets
                          </p>
                          <h4 className="mt-4 ff-secondary fw-semibold">
                            <span className="counter-value" data-target="107">
                              0
                            </span>
                            K
                          </h4>
                          <p className="mb-0 text-muted">
                            <span className="badge bg-light text-danger mb-0">
                              {" "}
                              <i className="ri-arrow-down-line align-middle"></i>{" "}
                              3.87 %{" "}
                            </span>{" "}
                            vs. previous month
                          </p>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-secondary text-secondary rounded-circle fs-4">
                              <i className="ri-shopping-bag-line"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                </div>
                {/* <!--end col--> */}
                <div className="col-xxl-3 col-sm-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="fw-medium text-muted mb-0">
                            Deleted Tickets
                          </p>
                          <h4 className="mt-4 ff-secondary fw-semibold">
                            <span className="counter-value" data-target="15.95">
                              0
                            </span>
                            %
                          </h4>
                          <p className="mb-0 text-muted">
                            <span className="badge bg-light text-success mb-0">
                              {" "}
                              <i className="ri-arrow-up-line align-middle"></i>{" "}
                              1.09 %{" "}
                            </span>{" "}
                            vs. previous month
                          </p>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-4">
                              <i className="ri-delete-bin-line"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="card" id="ticketsList">
                    <div className="card-header border-0">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 flex-grow-1">Tickets</h5>
                        <div className="flex-shrink-0">
                          <div className="d-flex flex-wrap gap-2">
                            <button
                              className="btn btn-primary bg-primary add-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#showModal"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Create Tickets
                            </button>
                            <button
                              className="btn btn-soft-danger"
                              id="remove-actions"
                              onClick="deleteMultiple()"
                            >
                              <i className="ri-delete-bin-2-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <form>
                        <div className="row g-3">
                          <div className="col-xxl-5 col-sm-12">
                            <div className="search-box">
                              <input
                                type="text"
                                className="form-control search bg-light border-light"
                                placeholder="Search for ticket details or something..."
                              />
                              {/* <i className="ri-search-line search-icon"></i> */}
                            </div>
                          </div>
                          {/* <!--end col--> */}

                          <div className="col-xxl-3 col-sm-4">
                            <Flatpickr
                              placeholder=" Select date range"
                              options={{
                                mode: "range",
                                dateFormat: "Y-m-d",
                                conjunction: "to",
                              }}
                              className="form-control bg-light border-light"
                            />
                          </div>
                          {/* <!--end col--> */}

                          <div className="col-xxl-3 col-sm-4">
                            <Select
                              className=""
                              placeholder="Filter Status"
                              name="choices-single-default"
                              options={[
                                { value: "all", label: "All" },
                                { value: "open", label: "Open" },
                                { value: "inprogress", label: "Inprogress" },
                                { value: "closed", label: "Closed" },
                                { value: "new", label: "New" },
                              ]}
                            />
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-xxl-1 col-sm-4">
                            <button
                              type="button"
                              className="btn btn-secondary bg-[#ff7f5d]  w-100"
                              onClick="SearchData();"
                            >
                              {" "}
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Filter
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
                        <table
                          className="table align-middle table-nowrap mb-0"
                          id="ticketTable"
                        >
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="form-check w-[40px]">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th className="sort" data-sort="id">
                                ID
                              </th>
                              <th className="sort" data-sort="tasks_name">
                                Title
                              </th>
                              {/* <!-- <th class="sort" data-sort="client_name">Client</th> --> */}
                              <th className="sort" data-sort="assignedto">
                                Assigned To
                              </th>
                              <th className="sort" data-sort="create_date">
                                Create Date
                              </th>
                              <th className="sort" data-sort="due_date">
                                Due Date
                              </th>
                              <th className="sort" data-sort="status">
                                Status
                              </th>
                              <th className="sort" data-sort="priority">
                                Priority
                              </th>
                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            className="list form-check-all"
                            id="ticket-list-data"
                          >
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="001"
                                  className="fw-medium link-primary"
                                >
                                  #VLZ001
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Error message when placing an orders?
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                James Morris
                              </td>
                              <td className="create_date text-start">
                                08 Dec, 2021
                              </td>
                              <td className="due_date text-start">
                                25 Jan, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-warning text-uppercase">
                                  Inprogress
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-danger text-uppercase">
                                  High
                                </span>
                              </td>
                              <td className="text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="13"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ13
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Edit customer testimonial
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Cathleen Rivas
                              </td>
                              <td className="create_date text-start">
                                29 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                02 Feb, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-danger text-uppercase">
                                  Closed
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-success text-uppercase">
                                  Low
                                </span>
                              </td>
                              <td className="text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="12"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ12
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Additional Calendar
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Chase Osborne
                              </td>
                              <td className="create_date text-start">
                                24 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                29 Jan, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-warning text-uppercase">
                                  Inprogress
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-danger text-uppercase">
                                  High
                                </span>
                              </td>
                              <td className="text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="11"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ11
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Edit customer testimonial
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Cathleen Rivas
                              </td>
                              <td className="create_date text-start">
                                22 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                02 Feb, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-danger text-uppercase">
                                  Closed
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-success text-uppercase">
                                  Low
                                </span>
                              </td>
                              <td className="text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="10"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ10
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Additional Calendar
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Chase Osborne
                              </td>
                              <td className="create_date text-start">
                                18 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                23 Jan, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-warning text-uppercase">
                                  Inprogress
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-danger text-uppercase">
                                  High
                                </span>
                              </td>
                              <td className="text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="9"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ9
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Brand logo design
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Forrest Ellis
                              </td>
                              <td className="create_date text-start">
                                17 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                24 Jan, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-warning text-uppercase">
                                  Inprogress
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-warning text-uppercase">
                                  Medium
                                </span>
                              </td>
                              <td className="text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="8"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ8
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                Benner design for FB &amp; Twitter
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Kalia Martinez
                              </td>
                              <td className="create_date text-start">
                                13 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                20 Jan, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-danger text-uppercase">
                                  Closed
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-warning text-uppercase">
                                  Medium
                                </span>
                              </td>
                              <td className=" text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id text-start">
                                <a
                                  href="/ticket-details"
                                  data-id="7"
                                  className="fw-medium link-primary ticket-id"
                                >
                                  #VLZ7
                                </a>
                              </td>
                              <td className="tasks_name text-start">
                                User research
                              </td>
                              {/* <!-- <td class="client_name">Tonya Noble</td> --> */}
                              <td className="assignedto text-start">
                                Sean Daniel
                              </td>
                              <td className="create_date text-start">
                                07 Jan, 2012
                              </td>
                              <td className="due_date text-start">
                                17 Jan, 2022
                              </td>
                              <td className="status text-start">
                                <span className="badge badge-soft-success text-uppercase">
                                  Open
                                </span>
                              </td>
                              <td className="priority text-start">
                                <span className="badge bg-success text-uppercase">
                                  Low
                                </span>
                              </td>
                              <td className=" text-start">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          window.location.href =
                                            "/ticket-details";
                                        }}
                                      >
                                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                        View
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item edit-item-btn"
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteOrder"
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="noresult hidden">
                          <div className="text-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon>
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">
                              We&apos;ve searched more than 150+ Tickets We did
                              not find any Tickets for you search.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-2">
                        <div className="pagination-wrap hstack gap-2">
                          <a
                            className="page-item pagination-prev disabled"
                            href="#"
                          >
                            Previous
                          </a>
                          <ul className="pagination listjs-pagination mb-0"></ul>
                          <a className="page-item pagination-next" href="#">
                            Next
                          </a>
                        </div>
                      </div>

                      {/* <!-- Modal --> */}
                      <div
                        className="modal fade flip"
                        id="deleteOrder"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-body p-5 text-center">
                              <lord-icon
                                src="https://cdn.lordicon.com/gsqxdxog.json"
                                trigger="loop"
                                colors="primary:#405189,secondary:#f06548"
                                style={{ width: "90px", height: "90px" }}
                              ></lord-icon>
                              <div className="mt-4 text-center">
                                <h4>You are about to delete a order ?</h4>
                                <p className="text-muted fs-14 mb-4">
                                  Deleting your order will remove all of your
                                  information from our database.
                                </p>
                                <div className="hstack gap-2 justify-content-center remove">
                                  <button
                                    className="btn bg-success text-white btn-link link-success fw-medium text-decoration-none"
                                    id="deleteRecord-close"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="ri-close-line me-1 align-middle"></i>{" "}
                                    Close
                                  </button>
                                  <button
                                    className="btn btn-danger bg-danger"
                                    id="delete-record"
                                  >
                                    Yes, Delete It
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!--end modal --> */}
                    </div>
                    {/* <!--end card-body--> */}
                  </div>
                  {/* <!--end card--> */}
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}

              <div
                className="modal fade zoomIn"
                id="showModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content border-0">
                    <div className="modal-header p-3 bg-soft-info">
                      <h5 className="modal-title" id="exampleModalLabel"></h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        id="close-modal"
                      ></button>
                    </div>
                    <form className="tablelist-form" autoComplete="off">
                      <div className="modal-body">
                        <div className="row g-3">
                          <div className="col-lg-12">
                            <div id="modal-id">
                              <label htmlFor="orderId" className="form-label">
                                ID
                              </label>
                              <input
                                type="text"
                                id="orderId"
                                className="form-control"
                                placeholder="ID"
                                value="#VLZ462"
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div>
                              <label
                                htmlFor="tasksTitle-field"
                                className="form-label"
                              >
                                Title
                              </label>
                              <input
                                type="text"
                                id="tasksTitle-field"
                                className="form-control"
                                placeholder="Title"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div>
                              <label
                                htmlFor="client_nameName-field"
                                className="form-label"
                              >
                                Client Name
                              </label>
                              <input
                                type="text"
                                id="client_nameName-field"
                                className="form-control"
                                placeholder="Client Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div>
                              <label
                                htmlFor="assignedtoName-field"
                                className="form-label"
                              >
                                Assigned To
                              </label>
                              <input
                                type="text"
                                id="assignedtoName-field"
                                className="form-control"
                                placeholder="Assigned to"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label htmlFor="date-field" className="form-label">
                              Create Date
                            </label>
                            <Flatpickr
                              placeholder=" Due date"
                              options={{
                                dateFormat: "d-M-Y",
                              }}
                              className="form-control bg-light border-light"
                            />
                          </div>
                          <div className="col-lg-6">
                            <label
                              htmlFor="duedate-field"
                              className="form-label"
                            >
                              Due Date
                            </label>
                            <Flatpickr
                              placeholder=" Due date"
                              options={{
                                dateFormat: "d-M-Y",
                              }}
                              className="form-control bg-light border-light"
                            />
                          </div>
                          <div className="col-lg-6">
                            <label
                              htmlFor="ticket-status"
                              className="form-label"
                            >
                              Status
                            </label>
                            <Select
                              placeholder="Select Ticket Status"
                              data-plugin="choices"
                              name="priority-field"
                              options={[
                                { value: "new", label: "New" },
                                { value: "inprogress", label: "Inprogress" },
                                { value: "closed", label: "Closed" },
                                { value: "open", label: "Open" },
                              ]}
                            />
                          </div>
                          <div className="col-lg-6">
                            <label
                              htmlFor="priority-field"
                              className="form-label"
                            >
                              Priority
                            </label>
                            <Select
                              placeholder="Select Priority"
                              data-plugin="choices"
                              name="priority-field"
                              options={[
                                { value: "high", label: "High" },
                                { value: "medium", label: "Medium" },
                                { value: "low", label: "Low" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light bg-light"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success bg-success"
                            id="add-btn"
                          >
                            Add Ticket
                          </button>
                          {/* <!-- <button type="button" class="btn btn-success" id="edit-btn">Update</button> --> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}

          <footer className="footer w-100">
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