// import "../../public/assets/css/app.css"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.value?.nav_counts);
  
  

  useEffect(() => {
    if (window.location.hash != "") {
      const id = window.location.hash.substr(1);
      const plansSection = document.getElementById(id);
      if (plansSection) {
        plansSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  
  
  return (
    <>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link reloadDocument to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src="/assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="/assets/images/ccp_logo.webp.webp" alt="" height="17" />
            </span>
          </Link>
          <Link reloadDocument to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src="/assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img
                src="/assets/images/ccp_logo.webp"
                alt=""
                height=""
                width="75%"
              />
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <Link
                  reloadDocument
                  className={`nav-link ${
                    location?.pathname === "/" ||
                    location?.pathname == "/dashboard"
                      ? "active"
                      : ""
                  }`}
                  to="/dashboard"
                >
                  <i className="ri-dashboard-2-line"></i>{" "}
                  <span data-key="t-dashboard">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link collapsed ${
                    location?.pathname == "/enquiry-transfer-requests" ||
                    location.pathname == "/invoice-cancel-requests" ||
                    location.pathname == "/proposal-cancel-requests"
                      ? "active"
                      : ""
                  }`}
                  // href="/enquiry-transfer-requests"
                  href="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="mdi mdi-transit-transfer"></i>
                  <span className="mr-1" data-key="t-dashboard">
                    Requests{" "}
                  </span>
                  <span className="badge !block bg-danger" data-key="t-hot">
                    {user?.pending_enq_transfer_count +
                      user?.inv_cancel_req_count +
                      user?.pro_cancel_req_count}
                  </span>
                </a>
                <div className=" menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="/enquiry-transfer-requests"
                        className="nav-link d-flex gap-1 text-nowrap !mr-1"
                        data-key="t-newenq"
                      >
                        <i className="mdi mdi-account-convert !ml-1"></i>{" "}
                        Enquiry transfer{" "}
                        <span
                          className="badge !block bg-danger"
                          data-key="t-hot"
                        >
                          {user?.pending_enq_transfer_count}
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/invoice-cancel-requests"
                        className="nav-link d-flex gap-1 text-nowrap !mr-1"
                        data-key="t-newenq"
                      >
                        <i className="mdi mdi-file-cancel !ml-1"></i> Cancel
                        Invoices{" "}
                        <span
                          className="badge !block bg-danger"
                          data-key="t-hot"
                        >
                          {user?.inv_cancel_req_count}
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/proposal-cancel-requests"
                        className="nav-link d-flex gap-1 text-nowrap !mr-1"
                        data-key="t-newenq"
                      >
                        <i className="mdi mdi-file-cancel-outline !ml-1"></i>{" "}
                        Cancel Proposals{" "}
                        <span
                          className="badge !block bg-danger"
                          data-key="t-hot"
                        >
                          {user?.pro_cancel_req_count}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location?.pathname?.includes("/products") ? "active" : ""
                  }`}
                  href="#products"
                >
                  <i className="mdi mdi-archive"></i>{" "}
                  <span data-key="t-products">Products</span>
                </Link>
                <div className=" menu-dropdown" id="products">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="/products#virtual" className="nav-link">
                        {" "}
                        Virtual Number{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/products#toll-number"
                        className="nav-link"
                        data-key="t-products-toll-no"
                      >
                        {" "}
                        Toll Number{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/products#voice-broadcast"
                        className="nav-link"
                        data-key="t-products-voice-broadcast"
                      >
                        {" "}
                        Voice Broadcast{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/products#corporate-plans"
                        className="nav-link"
                        data-key="t-products-voice-broadcast"
                      >
                        {" "}
                        Corporate Plan{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/enquiries") ? "active" : ""
                  }`}
                  href="#UploadEnq"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="UploadEnq"
                >
                  <i className="mdi mdi-headphones"></i>{" "}
                  <span data-key="t-enquiries">Enquiries</span>
                </Link>
                <div className=" menu-dropdown" id="UploadEnq">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/enquiries/upload"
                        className="nav-link"
                        data-key="t-upload-enquiries"
                      >
                        <i className="mdi mdi-upload"></i> Upload Enquiries{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/enquiries/new"
                        className="nav-link"
                        data-key="t-new-enquiries"
                      >
                        <i className="mdi mdi-headphones"></i> New Enquiries{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/enquiries/history"
                        className="nav-link"
                        data-key="t-enquiries-new"
                      >
                        <i className="mdi mdi-timeline-clock-outline"></i>{" "}
                        History{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/extensions") ? "active" : ""
                  }
                  `}
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-apps-2-line"></i>{" "}
                  <span data-key="t-extensions">Extensions</span>
                  {user?.active_ext_count +
                    user?.assigned_ext_count +
                    user?.unassigned_ext_count >
                    0 && (
                    <span className="badge bg-danger   d-block ms-1">
                      {user?.active_ext_count +
                        user?.assigned_ext_count +
                        user?.unassigned_ext_count}
                    </span>
                  )}
                </Link>
                <div className=" menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/extensions/unassigned"
                        className="nav-link"
                        data-key="t-inactiveExt"
                      >
                        {" "}
                        Unassigned{" "}
                        {user?.unassigned_ext_count > 0 && (
                          <span className="badge bg-danger d-block ms-1">
                            {user?.unassigned_ext_count}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/extensions/active"
                        className="nav-link"
                        data-key="t-activeExt"
                      >
                        {" "}
                        Active{" "}
                        {user?.active_ext_count > 0 && (
                          <span className="badge bg-danger d-block ms-1">
                            {user?.active_ext_count}
                          </span>
                        )}
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/extensions/assigned"
                        className="nav-link"
                        data-key="t-assignedExt"
                      >
                        {" "}
                        Assigned{" "}
                        {user?.assigned_ext_count > 0 && (
                          <span className="badge bg-danger d-block ms-1">
                            {user?.assigned_ext_count}
                          </span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/staff") ? "active" : ""
                  }`}
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="staffs"
                >
                  <i className="mdi mdi-human-queue"></i>{" "}
                  <span data-key="t-staffs">Staffs</span>
                </Link>
                <div className=" menu-dropdown" id="staffs">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/staff/add"
                        className="nav-link"
                        data-key="t-add"
                      >
                        <i className="mdi mdi-account-plus-outline"></i> Add{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/staff/all"
                        className="nav-link"
                        data-key="t-List"
                      >
                        <i className="mdi mdi-account-details"></i> List{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/staff/active"
                        className="nav-link"
                        data-key="t-active"
                      >
                        <i className="mdi mdi-account-check-outline"></i> Active{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/staff/inactive"
                        className="nav-link"
                        data-key="t-inactive"
                      >
                        <i className="mdi mdi-account-off"></i> Inactive{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/staff/terminated"
                        className="nav-link"
                        data-key="t-inactive"
                      >
                        <i className="mdi mdi-account-remove"></i> Terminated
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        reloadDocument
                        to="/staff/transfer"
                        className="nav-link"
                        data-key="t-transfer"
                      >
                        <i
                          className="mdi mdi-account-arrow-right-outline
                                    "
                        ></i>{" "}
                        Transfer{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="mdi mdi-phone-log-outline"></i>{" "}
                  <span data-key="t-call-recorde">Call Records</span>
                </Link>
                <div className=" menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/inbound"
                        className="nav-link"
                        data-key="t-inbound"
                      >
                        <i className="mdi mdi-phone-incoming-outline"></i>{" "}
                        Inbound{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/outbound"
                        className="nav-link"
                        data-key="t-outbound"
                      >
                        <i className="mdi mdi-phone-outgoing-outline"></i>{" "}
                        Outbound{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/inbound-missed"
                        className="nav-link"
                        data-key="t-inbound-missed"
                      >
                        <i className="mdi mdi-phone-missed-outline"></i> Inbound
                        Missed{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/outbound-missed"
                        className="nav-link"
                        data-key="t-outbound-missed"
                      >
                        <i className="mdi mdi-phone-missed-outline"></i>{" "}
                        Outbound Missed{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>*/}
              <li className="nav-item">
                <Link
                  reloadDocument
                  to="/otp-requests/invoices"
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/otp-requests/invoices")
                      ? "active"
                      : ""
                  }`}
                >
                  <i className="mdi mdi-lock"></i>{" "}
                  <span data-key="t-otp">Access Codes </span>{" "}
                  {user?.invoice_otp_count > 0 && (
                    <span className="badge bg-warning px-1 d-block ms-1">
                      {user?.invoice_otp_count}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/paid-invoices") ||
                    location?.pathname?.includes("/unpaid-invoices") ||
                    location?.pathname?.includes("/due-invoices") ||
                    location?.pathname?.includes("/partially-paid-invoices") ||
                    location?.pathname?.includes("/unpaid-invoices")
                      ? "active"
                      : ""
                  }`}
                  href="#sidebarLayouts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLayouts"
                >
                  <i className="mdi mdi-file-document-multiple-outline"></i>{" "}
                  <span data-key="t-invoices">Invoices</span>{" "}
                  {user?.partially_paid_inv_count +
                    user?.pending_pro_count +
                    user?.unpaid_inv_count >
                    0 && (
                    <span className="badge bg-danger d-block ms-1">
                      {user?.partially_paid_inv_count +
                        user?.pending_pro_count +
                        user?.unpaid_inv_count}
                    </span>
                  )}
                  {/* <span className="badge bg-danger d-block ms-1">105</span> */}
                </Link>
                <div className=" menu-dropdown" id="sidebarLayouts">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        // href="#sidebarInvoice"
                        className="nav-link collapsed"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarInvoice"
                      >
                        <i className="mdi mdi-file-document-outline"></i>{" "}
                        Invoice{" "}
                        {user?.partially_paid_inv_count +
                          user?.unpaid_inv_count >
                          0 && (
                          <span className="badge bg-danger d-block ms-1">
                            {user?.partially_paid_inv_count +
                              user?.unpaid_inv_count}
                          </span>
                        )}
                      </Link>
                      <div className=" menu-dropdown" id="sidebarInvoice">
                        <ul className="nav nav-sm flex-column">
                          {/* <li className="nav-item">
                            <Link to="/all-invoices" className="nav-link">
                              <i className=" mdi mdi-format-list-bulleted"></i>{" "}
                              All
                            </Link>
                          </li> */}
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/paid-invoices"
                              className="nav-link text-success"
                            >
                              <i className=" mdi mdi-cash-check"></i> Paid
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/unpaid-invoices"
                              className="nav-link text-danger"
                            >
                              <i className=" mdi mdi-cash-remove"></i> Unpaid
                              {user?.unpaid_inv_count > 0 && (
                                <span className="badge bg-danger d-block ms-1">
                                  {user?.unpaid_inv_count}
                                </span>
                              )}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/partially-paid-invoices"
                              className="nav-link text-info"
                            >
                              <i className="mdi mdi-cash-refund"></i> Partially
                              Paid
                              {user?.partially_paid_inv_count > 0 && (
                                <span className="badge bg-danger d-block ms-1">
                                  {user?.partially_paid_inv_count}
                                </span>
                              )}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/due-invoices"
                              className="nav-link text-warning"
                            >
                              <i className="mdi mdi-cash-refund"></i> Due
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        className="nav-link collapsed"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarInvoice"
                      >
                        <i className="mdi mdi-file-document-multiple-outline"></i>{" "}
                        Recurring Invoice{" "}
                      </Link>
                      <div className=" menu-dropdown" id="sidebarInvoice">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <Link
                              to="/recurring/all-invoices"
                              className="nav-link"
                            >
                              <i className=" mdi mdi-format-list-bulleted"></i>{" "}
                              All
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/recurring/paid-invoices"
                              className="nav-link text-success"
                            >
                              <i className=" mdi mdi-cash-check"></i> Paid
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/recurring/unpaid-invoices"
                              className="nav-link text-danger"
                            >
                              <i className=" mdi mdi-cash-remove"></i> Unpaid
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/recurring/partially-paid-invoices"
                              className="nav-link text-info"
                            >
                              <i className="mdi mdi-cash-refund"></i> Partially
                              Paid
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/recurring/due-invoices"
                              className="nav-link text-warning"
                            >
                              <i className="mdi mdi-cash-refund"></i> Due
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li> */}
                    <li className="nav-item">
                      <Link
                        // href="#sidebarProposal"
                        className="nav-link collapsed"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarProposal"
                      >
                        <i className="mdi mdi-file-edit"></i> Proposal{" "}
                        {user?.pending_pro_count > 0 && (
                          <span className="badge bg-danger d-block ms-1">
                            {user?.pending_pro_count}
                          </span>
                        )}
                      </Link>
                      <div className=" menu-dropdown" id="sidebarProposal">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/proposal/accepted"
                              className="nav-link text-success"
                            >
                              <i className=" mdi mdi-file-check-outline"></i>{" "}
                              Accepted
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/proposal/rejected"
                              className="nav-link text-danger"
                            >
                              <i className=" mdi mdi-file-cancel-outline"></i>{" "}
                              Declined
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              reloadDocument
                              to="/proposal/pending"
                              className="nav-link text-primary"
                            >
                              <i className="mdi mdi-file-clock-outline"></i>{" "}
                              Pending
                              {user?.pending_pro_count > 0 && (
                                <span className="badge bg-danger d-block ms-1">
                                  {user?.pending_pro_count}
                                </span>
                              )}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/customers") ? "active" : ""
                  }`}
                  to="/customers"
                >
                  <i className="mdi mdi-human-queue"></i>
                  <span data-key="t-customers"> Customers</span>
                </Link>
              </li> */}
              <li className="nav-item">
                <a
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("projects")
                      ? "active"
                      : location.pathname?.includes("/project-overview")
                      ? "active"
                      : ""
                  }`}
                  href="#projects"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="projects"
                >
                  <i className="mdi mdi-cog"></i>{" "}
                  <span data-key="t-configuration">Configurations</span>
                  <span
                    className="badge bg-danger d-block ms-1"
                    data-key="t-hot"
                  >
                    {user?.pending_projects_count +
                      user?.processing_projects_count}
                  </span>
                </a>
                <div className=" menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="/projects/pending"
                        className="nav-link"
                        data-key="t-config-pending"
                      >
                        <i className="mdi mdi-cog-pause-outline"></i> Pending
                        <span
                          className="badge bg-danger d-block ms-1"
                          data-key="t-hot"
                        >
                          {user?.pending_projects_count}
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/projects/processing"
                        className="nav-link"
                        data-key="t-config-processing"
                      >
                        <i className="mdi mdi-cog-transfer"></i> Processing
                        <span
                          className="badge bg-danger d-block ms-1"
                          data-key="t-hot"
                        >
                          {user?.processing_projects_count}
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/projects/completed"
                        className="nav-link"
                        data-key="t-config-completed"
                      >
                        <i className="mdi mdi-cog-clockwise"></i> Completed
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-background"></div>
      </div>
    </>
  );
}
