/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEnquiryTransferSearchMutation, useGetUserInfoQuery, useLazyEnquiryViewQuery, useLazyGetTopsearchesQuery, useLazyViewEnquiryDetailsQuery, useLogoutMutation } from "../../services/api";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { updateUsers } from "../../reducers/user";
import { info } from "autoprefixer";
import { hideLoader, showLoader } from "../../reducers/loader";
import ProfileAgreement from "./profileAgreement/ProfileAgreement";
import {Modal} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import { CircularProgress } from "@mui/material";

import InvoiceModal from "./invoices/invoice/InvoiceModal";
import ProposalModal from "./invoices/proposal/ProposalModal";
import Notifications from "./headerNotifications/Notifications";
// import { apiInstance } from "../apiHandler";

export default function Header() {
  const dispatch = useDispatch()
  const [enqSearch, setEnqSearch] = useState("");
  const searchcompRef = useRef();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionEnqs, setSuggestionEnqs] = useState();
  const [enqDetails, setEnqDetails] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invId, setInvId] = useState();
  const [showProposal, setShowProposal] = useState(false);
  const [proId, setProId] = useState();
  const [showloader, setShowLoader] = useState(false)

  const [enquiriesSearch, { data: enqResp, isLoading: enqSearchLoading }] =
  useEnquiryTransferSearchMutation();
  const [viewEnq, { data: viewResp, isLoading: viewLoading }] =
  useLazyViewEnquiryDetailsQuery();
  const [activeTab, setActiveTab] = useState(1);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const loaderState = useSelector((state) => state.loader?.value);
  const [search,setSearch] = useState();
   const { data:infoData, isLoading, error } = useGetUserInfoQuery();
   const[searchEnquiries, { data:searchData, isLoading:searchLoad }] = useLazyGetTopsearchesQuery();
   const[viewEnquiry, { data:viewData, isLoading:viewLoad }] = useLazyEnquiryViewQuery();
  const navigate=useNavigate()
useEffect(()=>{
  let lock=localStorage.getItem('lockout')
    if(lock){
      navigate('/lockscreen')
    }
},[])
  useEffect(() => {
     setShowLoader(false);
    dispatch(updateUsers(infoData?.data))
   
    if (
      infoData?.data?.staff?.setup_status < 6
    ) {
      if (infoData?.data?.profile_info?.profile_details) {
        if (infoData?.data?.profile_info?.profile_details?.update_profile == 0) {
         setShowLoader(true)
          setTimeout(() => {
            setShowSetup(true);
            setShowLoader(false);
          }, 3000);
        } else {
          return
        }
      } else {
        setShowLoader(true);
        setTimeout(() => {
          setShowSetup(true);
          setShowLoader(false);
        }, 3000);
      }
      
    }
  }, [infoData])
  
  const data = {};

  useEffect(() => {
    // Define the debounced search function
    const debouncedSearchEnquiries = debounce((searchValue) => {
      searchEnquiries({ search: searchValue });
    }, 500); // Adjust the delay as needed (in milliseconds)

    // Call the debounced function when search value changes
    if (search) {
      debouncedSearchEnquiries(search);
    }

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedSearchEnquiries.cancel();
    };
  }, [search]);

  // useEffect(() => {
  //   apiInstance.get()
  // },[])


  useEffect(() => {
    const handleClickOutside = (event) => {
 
      if (
        searchcompRef.current &&
        !searchcompRef.current.contains(event.target)
      ) {
        // Click occurred outside of the dropdown, hide suggestions
        // setEnqSearch("");
        setShowSuggestions(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleBodyClass = () => {
      if (toggleNavbar) {
        document.body.classList.add("menu");
        // console.log("added");
        // Rebind the click function after adding the class to the body
      } else {
        document.body.classList.remove("menu");
        // console.log("removed");
      }
      buttonRef?.current?.removeEventListener("click", ToggleMenubar);
      buttonRef?.current?.addEventListener("click", ReToggleMenubar);
    };

    handleBodyClass();

    return () => {
      buttonRef?.current?.removeEventListener("click", ReToggleMenubar);
    };
  }, [toggleNavbar]);

  const ToggleMenubar = () => {
    setToggleNavbar(!toggleNavbar);
  };

  const ReToggleMenubar = () => {
    setToggleNavbar(toggleNavbar);
  };
  const [logout, { loading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout()
        .then((res) => {
          if (res?.data?.status) {
            localStorage.removeItem("clt_token");
            window.location.href = "/signin";
          } else {
            localStorage.removeItem("clt_token");
            window.location.href = "/signin";
          }
        })
        .catch(() => {
          localStorage.removeItem("clt_token");
          window.location.href = "/signin";
        });
    } catch (error) {
      // Handle successful logout redirection or actions
      // Handle logout errors
      console.log(error);
      // localStorage.removeItem("clt_token");
      // window.location.href = "/signin";
    }
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    setEnqDetails();
    dispatch(showLoader());
    const debounceTimer = setTimeout(() => {
      // setDebouncedSearchTerm(enqSearch, "searchTerm");
      console.log(enqSearch);
      if (enqSearch != "") {
        enquiriesSearch({
          searchkey: enqSearch,
        }).then((res) => {
          console.log(res?.data?.data);
          setShowSuggestions(true);
          setSuggestionEnqs(res?.data?.data);
        });
      } else {
        setShowSuggestions(false);
      }
      dispatch(hideLoader());
    }, 1000);
    // Clear the timeout on each key press to reset the timer
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [enqSearch]);

  const fetchSelectedEnqDetails = async (enqID) => {
    const response = await viewEnq({ id: enqID });
    if (response?.data?.status) {
      setEnqDetails(response?.data?.data);
    }
  };

  const hideinv = () => {
    setShowInvoice(false);
  };

  const handleShowInvoice = (id) => {
    setShowInvoice(true);
    setInvId(id);
  };

  const hidePro = () => {
    setShowProposal(false);
  };

  const handleShowProposal = (id) => {
    setShowProposal(true);
    setProId(id);
  };
  return (
    <>
      {showloader && (
        <>
          <span className="delayLoader dashboardLoader !z-[99999]"></span>
          <div className="delayLoaderOverlay !z-[999]"></div>
        </>
      )}
      {isLoading || (loading && <Loader />)}
      {showSetup && (
        <>
          <Modal
            style={{ backdropFilter: "blur(3px)" }}
            centered
            scrollable
            show={true}
            size="xl"
          >
            <Modal.Body>
              <ProfileAgreement />
            </Modal.Body>
          </Modal>
        </>
      )}
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              {/* <!--  LOGO --> */}
              <div className="navbar-brand-box horizontal-logo ">
                <a href="/" className="logo logo-dark ">
                  <span className="logo-sm">
                    <img
                      src={
                        infoData?.data?.company_settings?.logo_url
                          ? infoData?.data?.company_settings?.logo_url
                          : "/assets/images/ccp_logo.webp"
                      }
                      className="m-2  !h-[65px]  "
                      style={{maxWidth: "180px"}}
                      alt=""
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={
                        infoData?.data?.company_settings?.logo_url
                          ? infoData?.data?.company_settings?.logo_url
                          : "/assets/images/ccp_logo.webp"
                      }
                      className="m-2  !h-[65px]  "
                      style={{maxWidth: "180px"}}
                      alt=""
                    />
                  </span>
                </a>
                <a href="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src={
                        infoData?.data?.company_settings?.logo_url
                          ? infoData?.data?.company_settings?.logo_url
                          : "/assets/images/ccp_logo.webp"
                      }
                      className="m-2  !h-[65px] "
                      alt=""
                      style={{maxWidth: "180px"}}
                    />
                  </span>
                  {/* <span className="logo-lg">
                    <img src="/assets/images/logo-light.png" alt="" />
                  </span> */}
                </a>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
                ref={buttonRef}
                onClick={ToggleMenubar}
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              {/* <!--  App Search--> */}
              <form className="app-search d-none d-md-block">
                <div className="position-relative">
                  <input
                    type="text"
                    value={enqSearch}
                    onChange={(e) => setEnqSearch(e?.target?.value)}
                    onFocus={() => {
                      enqSearch?.length > 0 && setShowSuggestions(true);
                    }}
                    className="py-2 w-full rounded focus:outline-none  pl-9 bg-light border-light "
                    placeholder="Search enquiry"
                    autoComplete="off"
                    id="search-options"
                    defaultValue=""
                  />
                  <span className="mdi mdi-magnify search-widget-icon" />
                  <span
                    onClick={() => setEnqSearch("")}
                    className="mdi cursor-pointer mdi-close-circle search-widget-icon search-widget-icon-close "
                    id="search-close-options"
                  />
                </div>
                <div
                  ref={searchcompRef}
                  className={`dropdown-menu dropdown-menu-lg ${
                    showSuggestions ? "show" : ""
                  }`}
                  style={{ width: 750 }}
                  id="search-dropdown"
                >
                  <div className="row">
                    <div className="col-lg-5 border-end">
                      <SimpleBar data-simplebar="" style={{ maxHeight: 440 }}>
                        <div className="notification-list">
                          {/* item */}
                          {suggestionEnqs?.enquiries?.length > 0 &&
                            suggestionEnqs?.enquiries?.map((enq, ind) => (
                              <a
                                key={ind}
                                onClick={() => fetchSelectedEnqDetails(enq?.id)}
                                className={`dropdown-item notify-item py-2 hover:drop-shadow-sm  cursor-pointer${
                                  enqDetails?.enq_id == enq?.id
                                    ? "bg-soft-secondary drop-shadow-lg shadow-lg"
                                    : ""
                                }`}
                              >
                                <div className="d-flex">
                                  <img
                                    src="/assets/images/users/default_proile_image.png"
                                    className="me-3 rounded-circle avatar-xs"
                                    alt="user-pic"
                                  />
                                  <div className="flex-1">
                                    <h6 className="mb-1 truncate text-capitalize w-48">
                                      {enq?.name}
                                    </h6>
                                    <p className="fs-11 mb-0 text-muted">
                                      {enq?.phone?.replace(
                                        /(\d{3})(\d+)(\d{1})/,
                                        (_, prefix, middle, suffix) =>
                                          `${prefix}xxxxxx${suffix}`
                                      )}
                                    </p>
                                    <p className="fs-13 mb-0 text-muted truncate w-48">
                                      {enq?.email?.replace(
                                        /^(.{3})(.*)(@.*)$/,
                                        (_, prefix, middle, suffix) =>
                                          `${prefix}${middle.replace(
                                            /./g,
                                            "x"
                                          )}${suffix}`
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          {suggestionEnqs?.enquiries?.length == 0 && (
                            <p className="text-center text-lg mt-5 text-muted">
                              No Enquirirs Found
                            </p>
                          )}
                        </div>
                      </SimpleBar>
                      {/* <div class="text-center pt-3 pb-1">
                            <a href="pages-search-results.html" class="btn btn-primary btn-sm">View All Results <i class="ri-arrow-right-line ms-1"></i></a>
                         </div> */}
                    </div>
                    <div className="col-lg-7">
                      <SimpleBar data-simplebar="" style={{ maxHeight: 440 }}>
                        {enqDetails?.enq_id && (
                          <div className="">
                            <div className="enquiryStatus">
                              <h5 className="text-muted border-bottom pb-2 h5">
                                Enquiry status
                              </h5>
                              {enqDetails?.enq_assigned && (
                                <div className="row w-100">
                                  <div className="col-lg-6 border-end border-bottom">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Staff Name
                                    </label>
                                    <p className="mb-2 text-capitalize">
                                      {enqDetails?.enq_staff?.name}
                                    </p>
                                  </div>
                                  <div className="col-lg-6 border-bottom">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Enquiry Status
                                    </label>
                                    <p className="mb-2">
                                      <span className="badge text-capitalize badge-soft-info badge-border fs-12">
                                        {enqDetails?.enq_position?.includes(
                                          "ring"
                                        )
                                          ? "Ringing"
                                          : enqDetails?.enq_position?.includes(
                                              "post"
                                            )
                                          ? "Postponed"
                                          : enqDetails?.enq_position?.includes(
                                              "noti"
                                            )
                                          ? "Not Interested"
                                          : enqDetails?.enq_position
                                              ?.toLowerCase()
                                              ?.includes("sign")
                                          ? "Signed"
                                          : enqDetails?.enq_position}
                                      </span>{" "}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div className="row w-100">
                                {!enqDetails?.enq_assigned && (
                                  <div className="col-lg-6 border-end border-bottom">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Staff Name
                                    </label>
                                    <p className="mb-2 text-warning">
                                      Not Assigned
                                    </p>
                                  </div>
                                )}
                                {!enqDetails?.enq_assigned && (
                                  <div className="col-lg-6 border-bottom">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Enquiry Status
                                    </label>
                                    <p className="mb-2">
                                      <span className="badge badge-soft-warning badge-border fs-12">
                                        Not Assigned
                                      </span>{" "}
                                    </p>
                                  </div>
                                )}
                                <div className="col-lg-6 border-end border-bottom mt-2">
                                  <label htmlFor="" className="mb-0 text-muted">
                                    Client Name
                                  </label>
                                  <p className="mb-2">
                                    {enqDetails?.enquiry?.name}
                                  </p>
                                </div>
                                <div className="col-lg-6 border-bottom mt-2">
                                  <label htmlFor="" className="mb-0 text-muted">
                                    Client Phone
                                  </label>
                                  <p className="mb-2">
                                    {enqDetails?.enq_assigned &&
                                    enqDetails?.self_assigned
                                      ? enqDetails?.enquiry?.phone
                                      : enqDetails?.enquiry?.phone?.replace(
                                          /(\d{3})(\d+)(\d{1})/,
                                          (_, prefix, middle, suffix) =>
                                            `${prefix}xxxxxx${suffix}`
                                        )}
                                  </p>
                                </div>
                                <div className="col-lg-12 mt-2">
                                  <label htmlFor="" className="mb-0 text-muted">
                                    Client Email
                                  </label>
                                  <p className="mb-2">
                                    {enqDetails?.enq_assigned &&
                                    enqDetails?.self_assigned
                                      ? enqDetails?.enquiry?.email
                                      : enqDetails?.enquiry?.email?.replace(
                                          /^(.{3})(.*)(@.*)$/,
                                          (_, prefix, middle, suffix) =>
                                            `${prefix}${middle.replace(
                                              /./g,
                                              "x"
                                            )}${suffix}`
                                        )}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {enqDetails?.customer && (
                              <div className="customerDetails mt-2">
                                <h5 className="text-muted border-bottom pb-2 h5">
                                  Customer Details
                                </h5>
                                <div className="row w-100">
                                  <div className="col-lg-6 border-end border-bottom mt-2">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Client Name
                                    </label>
                                    <p className="mb-2 text-capitalize">
                                      {enqDetails?.customer?.first_name}{" "}
                                      {enqDetails?.customer?.last_name}
                                    </p>
                                  </div>
                                  <div className="col-lg-6 border-bottom mt-2">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Client Phone
                                    </label>
                                    <p className="mb-2">
                                      {enqDetails?.enq_assigned &&
                                      enqDetails?.self_assigned
                                        ? enqDetails?.customer?.phone
                                        : enqDetails?.customer?.phone?.replace(
                                            /(\d{3})(\d+)(\d{1})/,
                                            (_, prefix, middle, suffix) =>
                                              `${prefix}xxxxxx${suffix}`
                                          )}
                                    </p>
                                  </div>
                                  <div className="col-lg-12 border-bottom mt-2">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Client Email
                                    </label>
                                    <p className="mb-2">
                                      {enqDetails?.enq_assigned &&
                                      enqDetails?.self_assigned
                                        ? enqDetails?.customer?.email
                                        : enqDetails?.customer?.email?.replace(
                                            /^(.{3})(.*)(@.*)$/,
                                            (_, prefix, middle, suffix) =>
                                              `${prefix}${middle.replace(
                                                /./g,
                                                "x"
                                              )}${suffix}`
                                          )}
                                    </p>
                                  </div>
                                  <div className="col-lg-12 border-bottom mt-2">
                                    <label
                                      htmlFor=""
                                      className="mb-0 text-muted"
                                    >
                                      Client Address
                                    </label>
                                    <p className="mb-2">
                                      {enqDetails?.customer?.address}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {enqDetails?.customer?.proposals?.length > 0 && (
                              <div className="proposalDetails mt-2">
                                <h5 className="text-muted border-bottom pb-2 h5">
                                  Proposals
                                </h5>
                                <table className="table table-nowrap w-100">
                                  <tbody>
                                    {enqDetails?.customer?.proposals?.map(
                                      (pro, ind) => (
                                        <tr key={ind}>
                                          <td>1.</td>
                                          <td>
                                            <a
                                              className="hover:text-primary cursor-pointer"
                                              onClick={() =>
                                                handleShowProposal(pro?.id)
                                              }
                                            >
                                              PRO-
                                              {pro?.id
                                                ?.toString()
                                                .padStart(5, "0")}
                                              /
                                              {(
                                                new Date(pro?.date).getMonth() +
                                                1
                                              )
                                                ?.toString()
                                                ?.padStart(2, "0")}
                                              /
                                              {new Date(
                                                pro?.date
                                              )?.getFullYear()}
                                            </a>{" "}
                                          </td>
                                          <td className="text-center">
                                            <span
                                              className={`badge badge-outline-${
                                                pro?.status == 0
                                                  ? "primary"
                                                  : pro?.status == 1
                                                  ? "info"
                                                  : pro?.status == 2
                                                  ? "secondary"
                                                  : pro?.status == 3
                                                  ? "success"
                                                  : pro?.status == 4
                                                  ? "warning"
                                                  : "danger"
                                              }`}
                                            >
                                              {pro?.status == 0
                                                ? "Pending"
                                                : pro?.status == 1
                                                ? "Sent"
                                                : pro?.status == 2
                                                ? "Opened"
                                                : pro?.status == 3
                                                ? "Accepted"
                                                : pro?.status == 4
                                                ? "Rejected"
                                                : "Declined"}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            {enqDetails?.customer?.invoices?.length > 0 && (
                              <div className="invoiceDetails mt-2">
                                <h5 className="text-muted border-bottom pb-2 h5">
                                  Invoices
                                </h5>
                                <table className="table table-nowrap w-100">
                                  <tbody>
                                    {enqDetails?.customer?.invoices?.map(
                                      (inv, ind) => (
                                        <tr key={ind}>
                                          <td>1.</td>
                                          <td>
                                            <a
                                              className="hover:text-primary cursor-pointer"
                                              onClick={() =>
                                                handleShowInvoice(inv?.id)
                                              }
                                            >
                                              INV-
                                              {inv?.id
                                                ?.toString()
                                                .padStart(5, "0")}
                                              /
                                              {(
                                                new Date(inv?.date).getMonth() +
                                                1
                                              )
                                                ?.toString()
                                                ?.padStart(2, "0")}
                                              /
                                              {new Date(
                                                inv?.date
                                              )?.getFullYear()}
                                            </a>{" "}
                                          </td>
                                          <td className="text-center">
                                            <span
                                              className={`badge badge-outline-${
                                                inv?.status == 1
                                                  ? "primary"
                                                  : inv?.status == 2
                                                  ? "success"
                                                  : inv?.status == 3
                                                  ? "secondary"
                                                  : inv?.status == 4
                                                  ? "warning"
                                                  : "danger"
                                              } fs-11`}
                                            >
                                              {inv?.status == 1
                                                ? "Unpaid"
                                                : inv?.status == 2
                                                ? "Paid"
                                                : inv?.status == 3
                                                ? "Partially Paid"
                                                : inv?.status == 4
                                                ? "Overdue"
                                                : "Cancelled"}
                                            </span>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        )}
                        {!enqDetails?.enq_id && (
                          <div className="card" aria-hidden="true">
                            <div className="card-body">
                              <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6" />
                              </h5>
                              <p className="card-text placeholder-glow">
                                <span className="placeholder col-7" />
                                <span className="placeholder col-4" />
                                <span className="placeholder col-4" />
                                <span className="placeholder col-6" />
                              </p>
                              <p className="card-text placeholder-glow">
                                <span className="placeholder col-7" />
                                <span className="placeholder col-4" />
                                <span className="placeholder col-4" />
                                <span className="placeholder col-6" />
                              </p>
                              <p className="card-text placeholder-glow">
                                <span className="placeholder col-7" />
                                <span className="placeholder col-4" />
                                <span className="placeholder col-4" />
                                <span className="placeholder col-6" />
                              </p>
                              <a
                                href="#"
                                tabIndex={-1}
                                className="btn btn-primary bg-primary  placeholder col-6"
                              />
                            </div>
                          </div>
                        )}
                      </SimpleBar>
                    </div>
                  </div>
                </div>
              </form>

              {/*  */}
            </div>
            <div className="d-flex align-items-center">
              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-search-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-search fs-22"></i>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="ms-1 header-item d-none d-sm-flex">
                <a
                  href="/products"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-toggle="tooltip"
                  title="Pricing"
                >
                  <i className="mdi mdi-tag-text-outline fs-22"></i>
                </a>
              </div>
              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  onClick={() => {
                    document.documentElement.requestFullscreen();
                  }}
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen fs-22"></i>
                </button>
              </div>
              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22"></i>
                 {infoData?.data?.topics_notification?.length > 0 &&  <span className="position-absolute topbar-badge fs-10  translate-middle badge rounded-pill bg-danger">
                    {infoData?.data?.topics_notification?.length}<span className="visually-hidden">unread messages</span>
                  </span>}
                </button>
                <div
                  className="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold !text-white">
                            {" "}
                            Notifications{" "}
                          </h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          {/* <span className="badge badge-soft-light fs-13 text-white">
                            {" "}
                            4 New
                          </span> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="px-2 pt-2">
                      <ul
                        className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                        data-dropdown-tabs="true"
                        id="notificationItemsTab"
                        role="tablist"
                      >
                        <li
                          className={` waves-effect  ${
                            activeTab == 1 ? "bg-white hover:text-primary" : ""
                          } waves-light"`}
                          onClick={() => setActiveTab(1)}
                        >
                          <a
                            className={`nav-link ${
                              activeTab == 1 ? "text-primary" : ""
                            }`}
                          >
                            All (4)
                          </a>
                        </li>
                        <li
                          className={` waves-effect ${
                            activeTab == 2 ? "bg-white hover:text-primary" : ""
                          } waves-light`}
                          onClick={() => setActiveTab(2)}
                        >
                          <a
                            className={`nav-link ${
                              activeTab == 2 ? "text-primary" : ""
                            }`}
                          >
                            Messages
                          </a>
                        </li>
                        <li
                          className={` waves-effect ${
                            activeTab == 3 ? "bg-white hover:text-primary" : ""
                          } waves-light`}
                          onClick={() => setActiveTab(3)}
                        >
                          <a
                            className={`nav-link ${
                              activeTab == 3 ? "text-primary" : ""
                            }`}
                          >
                            Alerts
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                  <div
                    className="tab-content position-relative"
                    id="notificationItemsTabContent"
                  >
                    {/* {activeTab == 1 && (
                      <div
                        className={`tab-pane ${
                          activeTab == 1 ? "fade show active" : ""
                        }  py-2 ps-2`}
                        id="all-noti-tab"
                        role="tabpanel"
                      >
                        <SimpleBar
                          data-simplebar
                          className="pe-2 max-h-[300px] overflow-y-auto"
                        >
                          <div className="text-reset notification-item d-block dropdown-item position-relative overflow-y-auto">
                            <div className="d-flex">
                              <div className="avatar-xs me-3">
                                <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                  <i className="bx bx-badge-check"></i>
                                </span>
                              </div>
                              <div className="flex-1 ">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-2 lh-base">
                                    Your <b>Elite</b> author Graphic
                                    Optimization{" "}
                                    <span className="text-secondary">
                                      reward
                                    </span>{" "}
                                    is ready!
                                  </h6>
                                </a>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i>{" "}
                                    Just 30 sec ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check01"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check01"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-reset notification-item d-block dropdown-item position-relative">
                            <div className="d-flex">
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Angela Bernier
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    Answered to your comment on the cash flow
                                    forecast&lsquo;s graph 🔔.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 48
                                    min ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check02"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check02"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-reset notification-item d-block dropdown-item position-relative">
                            <div className="d-flex">
                              <div className="avatar-xs me-3">
                                <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                  <i className="bx bx-message-square-dots"></i>
                                </span>
                              </div>
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-2 fs-13 lh-base">
                                    You have received{" "}
                                    <b className="text-success">20</b> new
                                    messages in the conversation
                                  </h6>
                                </a>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 2
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check03"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check03"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-reset notification-item d-block dropdown-item position-relative">
                            <div className="d-flex">
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Maureen Gibson
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    We talked about a project on linkedin.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 4
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check04"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check04"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-3 text-center view-all">
                            <button
                              type="button"
                              className="btn btn-soft-success waves-effect waves-light"
                            >
                              View All Notifications{" "}
                              <i className="ri-arrow-right-line align-middle"></i>
                            </button>
                          </div>
                        </SimpleBar>
                      </div>
                    )}
                    {activeTab == 2 && (
                      <div
                        className={`tab-pane ${
                          activeTab == 2 ? "fade show active" : ""
                        }  py-2 ps-2`}
                        id="messages-tab"
                        role="tabpanel"
                        aria-labelledby="messages-tab"
                      >
                        <SimpleBar
                          data-simplebar
                          className="pe-2 max-h-[300px] overflow-y-auto"
                        >
                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    James Lemire
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    We talked about a project on linkedin.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 30
                                    min ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check01"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check01"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Angela Bernier
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    Answered to your comment on the cash flow
                                    forecast&lsquo;s graph 🔔.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 2
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check02"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check02"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Kenneth Brown
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    Mentionned you in his comment on 📃 invoice
                                    #12501.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 10
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check03"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check03"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Maureen Gibson
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    We talked about a project on linkedin.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 3
                                    days ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check04"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check04"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-3 text-center view-all">
                            <button
                              type="button"
                              className="btn btn-soft-success waves-effect waves-light"
                            >
                              View All Messages{" "}
                              <i className="ri-arrow-right-line align-middle"></i>
                            </button>
                          </div>
                        </SimpleBar>
                      </div>
                    )} */}
                    {activeTab == 1 && (
                      <div
                        className={`tab-pane ${
                          activeTab == 1 ? "fade show active" : ""
                        }  p-2 ps-2`}
                        id="alerts-tab"
                        role="tabpanel"
                        aria-labelledby="alerts-tab"
                      >
                        {infoData?.data?.topics_notification?.length == 0 && (
                          <div className="empty-notification-elem">
                            {" "}
                            <div className="w-25 w-sm-50 pt-3 mx-auto">
                              {" "}
                              <img
                                src="/assets/images/svg/bell.svg"
                                className="img-fluid"
                                alt="user-pic"
                              />{" "}
                            </div>{" "}
                            <div className="text-center pb-5 mt-2 ">
                              {" "}
                              <h6 className="fs-18 mx-auto px-5 text-center  fw-semibold lh-base">
                                Hey! You have no notifications{" "}
                              </h6>{" "}
                            </div>{" "}
                          </div>
                        )}
                        {infoData?.data?.topics_notification?.length > 0 && (
                          <Notifications />
                        )}
                      </div>
                    )}
                    <div
                      className="notification-actions"
                      id="notification-actions"
                    >
                      <div className="d-flex text-muted justify-content-center">
                        Select
                        <div
                          id="select-content"
                          className="text-body fw-semibold px-1"
                        >
                          0
                        </div>
                        Result{" "}
                        <button
                          type="button"
                          className="btn btn-link link-danger p-0 ms-3"
                          data-bs-toggle="modal"
                          data-bs-target="#removeNotificationModal"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      style={{ objectFit: "cover" }}
                      src={
                        infoData?.data?.profile_info?.profile_details
                          ?.profile_image
                          ? infoData?.data?.profile_info?.profile_details
                              ?.profile_image
                          : "/assets/images/users/default_proile_image.png"
                      }
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text capitalize">
                        {infoData?.data?.staff?.name}
                      </span>
                      <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                        Team leader
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu ">
                  {/* <!--  item--> */}
                  <h6 className="dropdown-header capitalize">
                    Welcome {infoData?.data?.staff?.name}!
                  </h6>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                  >
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Profile</span>
                  </button>
                  <Link className="dropdown-item" to="/chat">
                    <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Messages</span>
                  </Link>

                  <Link className="dropdown-item" to="/faq">
                    <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Help</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item">
                    <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">
                      Balance : <b>₹0.00</b>
                    </span>
                  </Link>
                  <Link className="dropdown-item" to="/settings">
                    <i className="mdi mdi-cog text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Settings</span>
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.setItem("lockout", true);
                      window.location.reload();
                      navigate("/lockscreen");
                    }}
                  >
                    <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Lock screen</span>
                  </Link>
                  <a
                    className="dropdown-item cursor-pointer"
                    onClick={handleLogout}
                  >
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {showInvoice && invId && (
        <InvoiceModal
          show={showInvoice}
          hide={hideinv}
          invId={invId}
          source={"projects"}
        />
      )}

      {showProposal && proId && (
        <ProposalModal
          show={showProposal}
          hide={hidePro}
          proposalId={proId}
          source={"projects"}
        />
      )}
      <Navbar />
      {/* <!-- Left Sidebar End --> */}
      {/* <!-- Vertical Overlay--> */}
      <div className="vertical-overlay"></div>
    </>
  );
}
