/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Header from "./Header";
import {
  useAcceptEnquiryTransferMutation,
  useLazySearchTransferListQuery,
  useLazyTransferListPaginationQuery,
  useLazyTransferListQuery,
  useLazyViewEnquiryDetailsQuery,
  useRejectEnquiryTransferMutation,
} from "../../services/api";
import Loader from "./Loader";
import SimpleBar from "simplebar-react";
import Swal from "sweetalert2";

import { successAlert } from "./swAlert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Timer = ({ minutes }) => {
  const [timeLeft, setTimeLeft] = useState(minutes);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 0) {
      return <div>Transfer Initiated</div>;
    } else {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  return (
    <div>
      {timeLeft >= 0 ? "Time Remaining" : ""}{" "}
      <div
        className={`${timeLeft >= 0 ? "text-danger" : "text-secondary"} flex`}
      >
        {formatTime(timeLeft)}
        <div className={`${timeLeft >= 0 ? "cloud" : ""}`}></div>
      </div>
    </div>
  );
};

export default function EnquiryTransferRequest() {
  const [activeTab, setActiveTab] = useState(1);
  const [transferType, setTransferType] = useState("my_requests");
  const [transferData, setTransferData] = useState();
  const [enqSelected, setEnqSelected] = useState();
  const [enqDetails, setEnqDetails] = useState();
  const [showEnquiryDetails, setShowEnquiryDetails] = useState(false);
  const [delayLoader, setDelayLoader] = useState(false)
const [searchTerm, setSEarchTerm] = useState("");
  const [transferEnqData, setTransferEnqData] = useState();
  
  const tabs = [
    { id: 1, title: "Pending" },
    { id: 2, title: "Accepted" },
    { id: 3, title: "Rejected" },
    { id: 4, title: "Expired" },
  ];

  const [viewEnq, { data: viewResp, isLoading: viewLoading }] =
    useLazyViewEnquiryDetailsQuery();

  const [fetchTransferList, { data: transferListResp, isLoading }] =
    useLazyTransferListQuery();
  
   const [fetchSearchResults, { isLoading: searchLoading }] =
     useLazySearchTransferListQuery();
   const [
     fetchtSearchPaginationResults,
     { isLoading: searchPaginationLoading },
   ] = useLazyTransferListPaginationQuery();

  const fetchTransferData = async () => {
    const response = await fetchTransferList({
      status: tabs[activeTab - 1].title?.toLowerCase(),
      type: transferType,
    });
    console.log(response?.data?.status);
    if (response?.data?.status) {
      console.log(response?.data);
      setTransferData(response?.data?.data);
      setTransferEnqData(response?.data?.data);
    }
  };

      const getSearchResults = async () => {
        if (searchTerm != "") {
          const response = await fetchSearchResults({
            status: tabs[activeTab - 1].title?.toLowerCase(),
            type: transferType,
            search: searchTerm,
          });
          if (response?.data?.status) {
            setTransferData(response?.data?.data);
          }
        } else {
          setTransferData(transferEnqData);
        }
      };

  useEffect(() => {
    fetchTransferData();
  }, [activeTab, transferType]);

  function calculateTimeDifference(timestamp) {
    // Convert timestamp string to Date object
    const targetTime = new Date(timestamp);

    // Get the current time
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = Math.floor((targetTime - currentTime) / 1000);

    // Convert milliseconds to seconds
    return timeDiff;
  }

  const [acceptReq, { isLoading: reqAcceptLoading }] =
    useAcceptEnquiryTransferMutation();
  const [rejectReq, { isLoading: reqRejectLoading }] =
    useRejectEnquiryTransferMutation();

  const handleAcceptRequest = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this request. Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    });
    if (confirmed.isConfirmed) {
      const response = await acceptReq({ req_id: id });
      if (response?.data?.status) {
        setActiveTab(2);
        successAlert(response?.data?.message);
      } else {
        Swal.fire({
          title: "Error",
          text: response?.error?.data?.message,
          icon: "error",
        })
      }
    }
  };

  const [nextPage, { data: pageData, isLoading: loading, }] =
    useLazyTransferListPaginationQuery();

  const handleNext = () => {
    if (searchTerm != "") {
      fetchtSearchPaginationResults({
        status: tabs[activeTab - 1].title?.toLowerCase(),
        type: transferType,
        page: transferData?.requests?.current_page + 1,
        search: searchTerm,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    } else {
      nextPage({
        status: tabs[activeTab - 1].title?.toLowerCase(),
        type: transferType,
        page: transferData?.requests?.current_page + 1,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    }
  };

  const handlePrevious = () => {
    if (searchTerm != "") {
      fetchtSearchPaginationResults({
        status: tabs[activeTab - 1].title?.toLowerCase(),
        type: transferType,
        page: transferData?.requests?.current_page - 1,
        search: searchTerm,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    } else {
      nextPage({
        status: tabs[activeTab - 1].title?.toLowerCase(),
        type: transferType,
        page: transferData?.requests?.current_page - 1,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    }
  };

  const handleCustomPage = (pageNO) => {
    if (searchTerm != "") {
      fetchtSearchPaginationResults({
        status: tabs[activeTab - 1].title?.toLowerCase(),
        type: transferType,
        page: pageNO,
        search: searchTerm,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    } else {
      nextPage({
        status: tabs[activeTab - 1].title?.toLowerCase(),
        type: transferType,
        page: pageNO,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    }
  };

  const handleRejectRequest = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to Reject this request. Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    });
    if (confirmed.isConfirmed) {
      const response = await rejectReq({ req_id: id });
      if (response?.data?.status) {
        setActiveTab(3);
        successAlert(response?.data?.message);
      } else {
        console.log(response);
      }
    }
  };

  const enquirySelected = async (id) => {
    const response = await viewEnq({ id: id });
    if (response?.data?.status) {
      setEnqDetails(response?.data?.data);
      setDelayLoader(false)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (enqSelected) {
        
        enquirySelected(enqSelected);
        setShowEnquiryDetails(true);
      }
    }, 1000);
  }, [enqSelected]);

  const handleCloseViewEnqDetails = () => {
    setEnqSelected();
    setShowEnquiryDetails(false);
  };

      const handleClear = () => {
        setSEarchTerm("");
        fetchTransferData();
      };

  return (
    <>
      {reqAcceptLoading && <Loader />}
      {reqRejectLoading && <Loader />}
      {loading && <Loader />}
      {isLoading && <Loader />}
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-left justify-content-between">
                  <p className="h5">Enquiry Transfer Requests</p>

                  <div className="page-title-left ">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Dashboard</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Transfer Requests
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="card card-animate card-height-100 cursor-pointer"
                  onClick={() => setActiveTab(1)}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Ongoing Requests
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span
                            className="counter-value"
                            data-target={
                              transferType == "my_requests"
                                ? transferData?.counts?.pending_req_count
                                : transferData?.counts?.oth_pending_req_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.pending_req_count
                              : transferData?.counts?.oth_pending_req_count}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                            <i className="text-primary mdi mdi-account-clock-outline" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-3">
                <div
                  className="card card-animate card-height-100 cursor-pointer"
                  onClick={() => setActiveTab(2)}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Accepted Requests
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span
                            className="counter-value"
                            data-target={
                              transferType == "my_requests"
                                ? transferData?.counts?.accepted_req_count
                                : transferData?.counts?.oth_accepted_req_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.accepted_req_count
                              : transferData?.counts?.oth_accepted_req_count}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-success rounded-circle fs-2">
                            <i className="text-success mdi mdi-account-multiple-check-outline" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-3">
                <div
                  className="card card-animate card-height-100 cursor-pointer"
                  onClick={() => setActiveTab(3)}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Rejected Requests
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span
                            className="counter-value"
                            data-target={
                              transferType == "my_requests"
                                ? transferData?.counts?.rejected_req_count
                                : transferData?.counts?.oth_rejected_req_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.rejected_req_count
                              : transferData?.counts?.oth_rejected_req_count}
                          </span>{" "}
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-danger rounded-circle fs-2">
                            <i className="text-danger mdi  mdi-account-multiple-remove-outline" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-3">
                <div
                  className="card card-animate card-height-100 ribbon-box right cursor-pointer"
                  onClick={() => setActiveTab(4)}
                >
                  <div className="card-body">
                    {/* <div className="ribbon-two ribbon-two-info">
                      <span>Renewal</span>
                    </div> */}
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="animateds flash fw-medium text-muted mb-0">
                          Expired Requests -{" "}
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span
                            className="counter-value"
                            data-target={
                              transferType == "my_requests"
                                ? transferData?.counts?.expired_req_count
                                : transferData?.counts?.oth_expired_req_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.expired_req_count
                              : transferData?.counts?.oth_expired_req_count}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-warning rounded-circle fs-2">
                            <i className="text-warning mdi mdi-account-off-outline" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
            </div>
            {/* end row */}
            <div className="row">
              <div className="col-xxl-12">
                {/* partial:index.partial.html */}
                <div className="card" data-tabs-active="">
                  <div className="mx-2 row">
                    <div className="col-lg-8 col-sm-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="tabs-container px-2">
                            <div className="row">
                              {tabs?.map((tab, ind) => (
                                <div
                                  key={ind}
                                  className={`col-md-3 text-center cursor-pointer mt-2  py-2 text-muted font-bold ${
                                    activeTab === tab.id
                                      ? `activ ${
                                          activeTab == 1
                                            ? "bg-gradient-to-r from-blue-800 to-indigo-900 !text-white "
                                            : activeTab == 2
                                            ? "bg-gradient-to-r from-emerald-400 to-cyan-400 !text-white"
                                            : activeTab == 3
                                            ? "bg-gradient-to-r from-rose-400 to-red-500 !text-white"
                                            : "bg-gradient-to-r from-amber-500 to-pink-500 !text-white"
                                        } `
                                      : `border-l-2  ${
                                          activeTab == 1
                                            ? "border-l-indigo-900"
                                            : activeTab == 2
                                            ? "border-l-emerald-400"
                                            : activeTab == 3
                                            ? "border-l-rose-400"
                                            : "border-l-amber-500"
                                        }`
                                  }`}
                                  onClick={() => {
                                    setActiveTab(tab.id);
                                    setShowEnquiryDetails();
                                    setEnqSelected();
                                  }}
                                >
                                  {tab.title == "Pending"
                                    ? "Ongoing"
                                    : tab?.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      {/* <form> */}
                      <div className="row g-1">
                        <div className="col-xxl-7 col-sm-8 py-2">
                          <div className="search-box">
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSEarchTerm(e?.target?.value)}
                              className="py-2 w-full rounded focus:outline-none  pl-9 bg-light border-light "
                              placeholder="Search by enquiry name, email"
                            />
                            <i className="ri-search-line search-icon" />
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-xxl-3 col-sm-4 text-end py-2 pl-3">
                          <button
                            type="button"
                            className="btn btn-primary bg-primary w-100"
                            onClick={() => getSearchResults()}
                          >
                            {" "}
                            <i className="ri-equalizer-fill me-1 align-bottom" />
                            Search
                          </button>
                        </div>
                        <div className="col-xxl-1 col-sm-2 py-[0.4rem] px-2">
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>{"Clear"}</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <div onClick={() => handleClear()}>
                              <button className="btn btn-secondary py-2 btn-sm">
                                <span className="">
                                  <i className="mdi mdi-filter-remove align-middle fs-15"></i>
                                </span>
                              </button>
                            </div>
                          </OverlayTrigger>
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                      {/* </form> */}
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className={`${
                        enqSelected ? "col-lg-9 slideAnim" : "col-lg-12"
                      }`}
                    >
                      <div className="tab-content p-4">
                        <div
                          className={`tab-pane ${
                            activeTab === 1 ? "active" : ""
                          }`}
                        >
                          <div>
                            <div className="table-responsive table-card mb-4">
                              <SimpleBar className="max-h-[500px]">
                                <table
                                  className="table align-middle table-nowrap mb-0"
                                  id="tasksTable"
                                >
                                  <thead className="table-light text-muted">
                                    <tr>
                                      <th scope="col" style={{ width: 40 }}>
                                        S.No
                                      </th>
                                      <th
                                        className="sort "
                                        data-sort="id"
                                        scope="col"
                                      >
                                        Enquiry Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Date
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Enquiry
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="apikey"
                                        scope="col"
                                      >
                                        Expire In
                                      </th>
                                      {<th>Action</th>}
                                    </tr>
                                  </thead>
                                  <tbody className="list form-check-all">
                                    {transferData?.requests?.data?.length > 0 &&
                                      transferData?.requests?.data?.map(
                                        (req, ind) => (
                                          <tr
                                            key={ind}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              if (enqSelected != req?.enq?.id) {
                                                setEnqSelected(req?.enq?.id);
                                                setDelayLoader(true);
                                              }
                                            }}
                                          >
                                            <th scope="row">{ind + 1}</th>

                                            <td className="name text-start text-capitalize">
                                              {req?.staff_name}
                                            </td>
                                            <td className="name text-start text-capitalize">
                                              {req?.req_staff_name}
                                            </td>
                                            <td className="text-start text-capitalize">
                                              <span className="badge badge-soft-primary">
                                                {new Date(
                                                  req?.created_at
                                                ).toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                })}
                                              </span>
                                            </td>
                                            {
                                              <td className="text-start">
                                                {/*<input type="text" class="form-control apikey-value" readonly value="b5815DE8A7224438932eb296Z5">*/}
                                                <div className="ms-lg-0 my-0 my-lg-0 ">
                                                  <span>
                                                    <h5 className="fs-16 mb-0 text-capitalize">
                                                      {req?.enq?.name}
                                                    </h5>
                                                  </span>
                                                  <p className="text-muted mb-0">
                                                    {req?.enq?.email?.replace(
                                                      /^(.{3})(.*)(@.*)$/,
                                                      (
                                                        _,
                                                        prefix,
                                                        middle,
                                                        suffix
                                                      ) =>
                                                        `${prefix}${middle.replace(
                                                          /./g,
                                                          "x"
                                                        )}${suffix}`
                                                    )}
                                                  </p>
                                                </div>
                                              </td>
                                            }
                                            <td className="text-start">
                                              {/* <div>
                                        Time Remaining:{" "} */}
                                              <Timer
                                                minutes={calculateTimeDifference(
                                                  req?.expire_at
                                                )}
                                              />
                                              {/* </div> */}
                                            </td>
                                            {
                                              //  transferType == "others" &&
                                              <td className="text-start">
                                                <a
                                                  data-bs-toggle="tooltip"
                                                  onClick={() =>
                                                    handleAcceptRequest(req?.id)
                                                  }
                                                >
                                                  <OverlayTrigger
                                                    delay={{
                                                      hide: 450,
                                                      show: 300,
                                                    }}
                                                    overlay={(props) => (
                                                      <Tooltip {...props}>
                                                        {`Accept Transfer Request`}
                                                      </Tooltip>
                                                    )}
                                                    placement="bottom"
                                                  >
                                                    <button className="btn btn-soft-success py-1 btn-sm">
                                                      <span className="">
                                                        <i className="mdi mdi-account-check-outline align-middle fs-15"></i>
                                                      </span>
                                                    </button>
                                                  </OverlayTrigger>
                                                </a>
                                                <a
                                                  className="ml-2"
                                                  data-bs-toggle="tooltip"
                                                  onClick={() =>
                                                    handleRejectRequest(req?.id)
                                                  }
                                                >
                                                  <OverlayTrigger
                                                    delay={{
                                                      hide: 450,
                                                      show: 300,
                                                    }}
                                                    overlay={(props) => (
                                                      <Tooltip {...props}>
                                                        {`Reject Transfer Request`}
                                                      </Tooltip>
                                                    )}
                                                    placement="bottom"
                                                  >
                                                    <button className="btn btn-soft-danger py-1 btn-sm">
                                                      <span className="">
                                                        <i className="mdi mdi-account-cancel-outline align-middle fs-15"></i>
                                                      </span>
                                                    </button>
                                                  </OverlayTrigger>
                                                </a>
                                              </td>
                                            }
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </SimpleBar>
                              <div className="flex justify-between">
                                {transferData?.requests?.data?.length > 0 && (
                                  <div className="">
                                    <div
                                      className="dataTables_info"
                                      id="example_info"
                                      role="status"
                                      aria-live="polite"
                                    >
                                      Showing{" "}
                                      {transferData?.requests?.from
                                        ? transferData?.requests?.from
                                        : 0}{" "}
                                      to{" "}
                                      {transferData?.requests?.to
                                        ? transferData?.requests?.to
                                        : 0}{" "}
                                      of {transferData?.requests?.total} entries
                                    </div>
                                  </div>
                                )}
                                <div className="">
                                  <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example_paginate"
                                  >
                                    <ul className="pagination">
                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.prev_page_url == null
                        ? "disabled"
                        : " "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handlePrevious()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                                      {transferData?.requests?.total > 0 &&
                                        transferData?.requests?.links?.map(
                                          (page, ind) => (
                                            <li
                                              className={`paginate_button page-item  ${
                                                page?.active ? "active" : ""
                                              } `}
                                              key={ind}
                                            >
                                              <button
                                                className="page-link"
                                                dangerouslySetInnerHTML={{
                                                  __html: page?.label,
                                                }}
                                                disabled={page?.url == null}
                                                onClick={() => {
                                                  if (
                                                    page?.label?.includes(
                                                      "Previous"
                                                    )
                                                  ) {
                                                    handlePrevious();
                                                  } else if (
                                                    page?.label?.includes(
                                                      "Next"
                                                    )
                                                  ) {
                                                    handleNext();
                                                  } else {
                                                    handleCustomPage(
                                                      parseInt(page?.label)
                                                    );
                                                  }
                                                }}
                                              ></button>
                                            </li>
                                          )
                                        )}

                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.next_page_url != null
                        ? ""
                        : "disabled "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handleNext()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.next_page_url != null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Next
                    </a>
                  </li> */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/*end table*/}
                              {transferData?.requests?.data?.length == 0 && (
                                <div className="noresult">
                                  <div className="text-center">
                                    <lord-icon
                                      src="https://cdn.lordicon.com/msoeawqm.json"
                                      trigger="loop"
                                      colors="primary:#121331,secondary:#08a88a"
                                      className="!w-[50px] !h-[50px]"
                                    />
                                    <h5 className="mt-2 font-bold">
                                      No Requests Found
                                    </h5>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`tab-pane ${
                            activeTab === 2 ? "active" : ""
                          }`}
                        >
                          <div>
                            <div className="table-responsive table-card mb-4">
                              <SimpleBar className="max-h-[500px]">
                                <table
                                  className="table align-middle table-nowrap mb-0"
                                  id="tasksTable"
                                >
                                  <thead className="table-light text-muted">
                                    <tr>
                                      <th scope="col" style={{ width: 40 }}>
                                        S.No
                                      </th>
                                      <th
                                        className="sort "
                                        data-sort="id"
                                        scope="col"
                                      >
                                        Enquiry Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Staff Name
                                      </th>

                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Date
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Enquiry
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Approved By
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="apikey"
                                        scope="col"
                                      >
                                        Accepted Date
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="list form-check-all">
                                    {transferData?.requests?.data?.length > 0 &&
                                      transferData?.requests?.data?.map(
                                        (req, ind) => (
                                          <tr
                                            key={ind}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              if (enqSelected != req?.enq?.id) {
                                                setEnqSelected(req?.enq?.id);
                                                setDelayLoader(true);
                                              }
                                            }}
                                          >
                                            <th scope="row">{ind + 1}</th>

                                            <td className="name text-start text-capitalize">
                                              {req?.staff_name}
                                            </td>
                                            <td className="name text-start text-capitalize">
                                              {req?.req_staff_name}
                                            </td>
                                            <td className="text-start text-capitalize">
                                              {new Date(
                                                req?.created_at
                                              ).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </td>
                                            <td className="text-start">
                                              {/*<input type="text" class="form-control apikey-value" readonly value="b5815DE8A7224438932eb296Z5">*/}
                                              <div className="ms-lg-0 my-0 my-lg-0">
                                                <span>
                                                  <h5 className="fs-16 mb-0 text-capitalize">
                                                    {req?.enq?.name}
                                                  </h5>
                                                </span>
                                                <p className="text-muted mb-0">
                                                  {req?.enq?.email}
                                                </p>
                                              </div>
                                            </td>
                                            <td className="text-start">
                                              {/*<input type="text" class="form-control apikey-value" readonly value="b5815DE8A7224438932eb296Z5">*/}
                                              {req?.approver_name}{" "}
                                              <span
                                                className={`badge text-capitalize ml-2 ${
                                                  req?.approved_by == "staff"
                                                    ? "badge-soft-secondary"
                                                    : "badge-soft-warning"
                                                }`}
                                              >
                                                {req?.approved_by}
                                              </span>
                                            </td>
                                            <td className="text-start text-capitalize">
                                              {new Date(
                                                req?.updated_at
                                              ).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </SimpleBar>
                              <div className="flex justify-between">
                                {transferData?.requests?.data?.length > 0 && (
                                  <div className="">
                                    <div
                                      className="dataTables_info"
                                      id="example_info"
                                      role="status"
                                      aria-live="polite"
                                    >
                                      Showing{" "}
                                      {transferData?.requests?.from
                                        ? transferData?.requests?.from
                                        : 0}{" "}
                                      to{" "}
                                      {transferData?.requests?.to
                                        ? transferData?.requests?.to
                                        : 0}{" "}
                                      of {transferData?.requests?.total} entries
                                    </div>
                                  </div>
                                )}
                                <div className="">
                                  <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example_paginate"
                                  >
                                    <ul className="pagination">
                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.prev_page_url == null
                        ? "disabled"
                        : " "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handlePrevious()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                                      {transferData?.requests?.total > 0 &&
                                        transferData?.requests?.links?.map(
                                          (page, ind) => (
                                            <li
                                              className={`paginate_button page-item  ${
                                                page?.active ? "active" : ""
                                              } `}
                                              key={ind}
                                            >
                                              <button
                                                className="page-link"
                                                dangerouslySetInnerHTML={{
                                                  __html: page?.label,
                                                }}
                                                disabled={page?.url == null}
                                                onClick={() => {
                                                  if (
                                                    page?.label?.includes(
                                                      "Previous"
                                                    )
                                                  ) {
                                                    handlePrevious();
                                                  } else if (
                                                    page?.label?.includes(
                                                      "Next"
                                                    )
                                                  ) {
                                                    handleNext();
                                                  } else {
                                                    handleCustomPage(
                                                      parseInt(page?.label)
                                                    );
                                                  }
                                                }}
                                              ></button>
                                            </li>
                                          )
                                        )}

                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.next_page_url != null
                        ? ""
                        : "disabled "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handleNext()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.next_page_url != null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Next
                    </a>
                  </li> */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/*end table*/}
                              {transferData?.requests?.data?.length == 0 && (
                                <div className="noresult">
                                  <div className="text-center">
                                    <lord-icon
                                      src="https://cdn.lordicon.com/msoeawqm.json"
                                      trigger="loop"
                                      colors="primary:#121331,secondary:#08a88a"
                                      className="!w-[50px] !h-[50px]"
                                    />
                                    <h5 className="mt-2 font-bold">
                                      No Requests Found
                                    </h5>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`tab-pane ${
                            activeTab === 3 ? "active" : ""
                          }`}
                        >
                          <div>
                            <div className="table-responsive table-card mb-4">
                              <SimpleBar className="max-h-[500px]">
                                <table
                                  className="table align-middle table-nowrap mb-0"
                                  id="tasksTable"
                                >
                                  <thead className="table-light text-muted">
                                    <tr>
                                      <th scope="col" style={{ width: 40 }}>
                                        S.No
                                      </th>
                                      <th
                                        className="sort "
                                        data-sort="id"
                                        scope="col"
                                      >
                                        Enquiry Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Date
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="enquiry"
                                        scope="col"
                                      >
                                        Enquiry
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Rejected By
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="apikey"
                                        scope="col"
                                      >
                                        Rejected Date
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="list form-check-all">
                                    {transferData?.requests?.data?.length > 0 &&
                                      transferData?.requests?.data?.map(
                                        (req, ind) => (
                                          <tr
                                            key={ind}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              if (enqSelected != req?.enq?.id) {
                                                setEnqSelected(req?.enq?.id);
                                                setDelayLoader(true);
                                              }
                                            }}
                                          >
                                            <th scope="row">{ind + 1}</th>

                                            <td className="name text-start text-capitalize">
                                              {req?.staff_name}
                                            </td>
                                            <td className="name text-start text-capitalize">
                                              {req?.req_staff_name}
                                            </td>
                                            <td className="text-start text-capitalize">
                                              {new Date(
                                                req?.created_at
                                              ).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </td>
                                            <td className="text-start">
                                              {/*<input type="text" class="form-control apikey-value" readonly value="b5815DE8A7224438932eb296Z5">*/}
                                              <div className="ms-lg-0 my-0 my-lg-0 ">
                                                <span>
                                                  <h5 className="fs-16 mb-0 text-capitalize">
                                                    {req?.enq?.name}
                                                  </h5>
                                                </span>
                                                <p className="text-muted mb-0">
                                                  {req?.enq?.email?.replace(
                                                    /^(.{3})(.*)(@.*)$/,
                                                    (
                                                      _,
                                                      prefix,
                                                      middle,
                                                      suffix
                                                    ) =>
                                                      `${prefix}${middle.replace(
                                                        /./g,
                                                        "x"
                                                      )}${suffix}`
                                                  )}
                                                </p>
                                              </div>
                                            </td>
                                            <td className="text-start">
                                              {/*<input type="text" class="form-control apikey-value" readonly value="b5815DE8A7224438932eb296Z5">*/}
                                              {req?.decliner_name}{" "}
                                              <span
                                                className={`badge text-capitalize ml-2 ${
                                                  req?.declined_by == "staff"
                                                    ? "badge-soft-secondary"
                                                    : "badge-soft-warning"
                                                }`}
                                              >
                                                {req?.declined_by}
                                              </span>
                                            </td>
                                            <td className="text-start text-capitalize">
                                              {new Date(
                                                req?.updated_at
                                              ).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </SimpleBar>
                              <div className="flex justify-between">
                                {transferData?.requests?.data?.length > 0 && (
                                  <div className="">
                                    <div
                                      className="dataTables_info"
                                      id="example_info"
                                      role="status"
                                      aria-live="polite"
                                    >
                                      Showing{" "}
                                      {transferData?.requests?.from
                                        ? transferData?.requests?.from
                                        : 0}{" "}
                                      to{" "}
                                      {transferData?.requests?.to
                                        ? transferData?.requests?.to
                                        : 0}{" "}
                                      of {transferData?.requests?.total} entries
                                    </div>
                                  </div>
                                )}
                                <div className="">
                                  <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example_paginate"
                                  >
                                    <ul className="pagination">
                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.prev_page_url == null
                        ? "disabled"
                        : " "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handlePrevious()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                                      {transferData?.requests?.total > 0 &&
                                        transferData?.requests?.links?.map(
                                          (page, ind) => (
                                            <li
                                              className={`paginate_button page-item  ${
                                                page?.active ? "active" : ""
                                              } `}
                                              key={ind}
                                            >
                                              <button
                                                className="page-link"
                                                dangerouslySetInnerHTML={{
                                                  __html: page?.label,
                                                }}
                                                disabled={page?.url == null}
                                                onClick={() => {
                                                  if (
                                                    page?.label?.includes(
                                                      "Previous"
                                                    )
                                                  ) {
                                                    handlePrevious();
                                                  } else if (
                                                    page?.label?.includes(
                                                      "Next"
                                                    )
                                                  ) {
                                                    handleNext();
                                                  } else {
                                                    handleCustomPage(
                                                      parseInt(page?.label)
                                                    );
                                                  }
                                                }}
                                              ></button>
                                            </li>
                                          )
                                        )}

                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.next_page_url != null
                        ? ""
                        : "disabled "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handleNext()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.next_page_url != null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Next
                    </a>
                  </li> */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/*end table*/}
                              {transferData?.requests?.data?.length == 0 && (
                                <div className="noresult">
                                  <div className="text-center">
                                    <lord-icon
                                      src="https://cdn.lordicon.com/msoeawqm.json"
                                      trigger="loop"
                                      colors="primary:#121331,secondary:#08a88a"
                                      className="!w-[50px] !h-[50px]"
                                    />
                                    <h5 className="mt-2 font-bold">
                                      No Requests Found
                                    </h5>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`tab-pane ${
                            activeTab === 4 ? "active" : ""
                          }`}
                        >
                          <div>
                            <div className="table-responsive table-card mb-4">
                              <SimpleBar className="max-h-[500px]">
                                <table
                                  className="table align-middle table-nowrap mb-0"
                                  id="tasksTable"
                                >
                                  <thead className="table-light text-muted">
                                    <tr>
                                      <th
                                        className="sort"
                                        data-sort="id"
                                        scope="col"
                                      >
                                        S.No
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Enquiry Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Staff Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Requested Date
                                      </th>
                                      <th className="sort">Enquiry</th>
                                      <th
                                        className="sort"
                                        data-sort="apikey"
                                        scope="col"
                                      >
                                        Expired Date
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="list form-check-all">
                                    {transferData?.requests?.data?.length > 0 &&
                                      transferData?.requests?.data?.map(
                                        (req, ind) => (
                                          <tr
                                            key={ind}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              if (enqSelected != req?.enq?.id) {
                                                setEnqSelected(req?.enq?.id);
                                                setDelayLoader(true);
                                              }
                                            }}
                                          >
                                            <th scope="row">
                                              <div className="form-check">
                                                {ind + 1}
                                              </div>
                                            </th>
                                            <td className="name text-start text-capitalize">
                                              {req?.staff_name}
                                            </td>
                                            <td className="name text-start text-capitalize">
                                              {req?.req_staff_name}
                                            </td>
                                            <td className="text-start">
                                              <span className="badge badge-soft-primary">
                                                {new Date(
                                                  req?.created_at
                                                ).toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                })}
                                              </span>
                                            </td>
                                            <td className="text-start">
                                              {/*<input type="text" class="form-control apikey-value" readonly value="b5815DE8A7224438932eb296Z5">*/}
                                              <div className="ms-lg-0 my-0 my-lg-0 ">
                                                <span>
                                                  <h5 className="fs-16 mb-0 text-capitalize">
                                                    {req?.enq?.name}
                                                  </h5>
                                                </span>
                                                <p className="text-muted mb-0">
                                                  {req?.enq?.email}
                                                </p>
                                              </div>
                                            </td>
                                            <td className="text-start">
                                              <span className="badge badge-soft-primary">
                                                {new Date(
                                                  req?.expire_at
                                                ).toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                })}
                                              </span>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </SimpleBar>
                              <div className="flex justify-between">
                                {transferData?.requests?.data?.length > 0 && (
                                  <div className="">
                                    <div
                                      className="dataTables_info"
                                      id="example_info"
                                      role="status"
                                      aria-live="polite"
                                    >
                                      Showing{" "}
                                      {transferData?.requests?.from
                                        ? transferData?.requests?.from
                                        : 0}{" "}
                                      to{" "}
                                      {transferData?.requests?.to
                                        ? transferData?.requests?.to
                                        : 0}{" "}
                                      of {transferData?.requests?.total} entries
                                    </div>
                                  </div>
                                )}
                                <div className="">
                                  <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example_paginate"
                                  >
                                    <ul className="pagination">
                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.prev_page_url == null
                        ? "disabled"
                        : " "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handlePrevious()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                                      {transferData?.requests?.total > 0 &&
                                        transferData?.requests?.links?.map(
                                          (page, ind) => (
                                            <li
                                              className={`paginate_button page-item  ${
                                                page?.active ? "active" : ""
                                              } `}
                                              key={ind}
                                            >
                                              <button
                                                className="page-link"
                                                dangerouslySetInnerHTML={{
                                                  __html: page?.label,
                                                }}
                                                disabled={page?.url == null}
                                                onClick={() => {
                                                  if (
                                                    page?.label?.includes(
                                                      "Previous"
                                                    )
                                                  ) {
                                                    handlePrevious();
                                                  } else if (
                                                    page?.label?.includes(
                                                      "Next"
                                                    )
                                                  ) {
                                                    handleNext();
                                                  } else {
                                                    handleCustomPage(
                                                      parseInt(page?.label)
                                                    );
                                                  }
                                                }}
                                              ></button>
                                            </li>
                                          )
                                        )}

                                      {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.next_page_url != null
                        ? ""
                        : "disabled "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handleNext()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.next_page_url != null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Next
                    </a>
                  </li> */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/*end table*/}
                              {transferData?.requests?.data?.length == 0 && (
                                <div className="noresult">
                                  <div className="text-center">
                                    <lord-icon
                                      src="https://cdn.lordicon.com/msoeawqm.json"
                                      trigger="loop"
                                      colors="primary:#121331,secondary:#08a88a"
                                      className="!w-[50px] !h-[50px]"
                                    />
                                    <h5 className="mt-2 font-bold">
                                      No Requests Found
                                    </h5>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* <div className="d-flex justify-content-end mt-2">
                          <div className="pagination-wrap hstack gap-2">
                            <a
                              className="page-item pagination-prev disabled"
                              href="#"
                            >
                              Previous
                            </a>
                            <ul className="pagination listjs-pagination mb-0" />
                            <a className="page-item pagination-next" href="#">
                              Next
                            </a>
                          </div>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {showEnquiryDetails && (
                      <div className="col-lg-3 pulse ">
                        {!delayLoader && (
                          <div className="card">
                            {enqDetails?.enq_id && (
                              <div className="">
                                <div className="enquiryStatus">
                                  <h5 className="text-muted border-bottom pb-2 h5 p-2">
                                    Enquiry status
                                  </h5>
                                  {enqDetails?.enq_assigned && (
                                    <div className="row w-100 px-3">
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
                                  <div className="row w-100 px-3">
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
                                      <label
                                        htmlFor=""
                                        className="mb-0 text-muted"
                                      >
                                        Client Name
                                      </label>
                                      <p className="mb-2">
                                        {enqDetails?.enquiry?.name}
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
                                          ? enqDetails?.enquiry?.phone
                                          : enqDetails?.enquiry?.phone?.replace(
                                              /(\d{3})(\d+)(\d{1})/,
                                              (_, prefix, middle, suffix) =>
                                                `${prefix}xxxxxx${suffix}`
                                            )}
                                      </p>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                      <label
                                        htmlFor=""
                                        className="mb-0 text-muted"
                                      >
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
                                    <h5 className="text-muted border-bottom pb-2 h5 p-2">
                                      Customer Details
                                    </h5>
                                    <div className="row w-100 px-3">
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
                            <div className="card-footer">
                              <button
                                className="btn btn-secondary bg-secondary w-full "
                                onClick={() => handleCloseViewEnqDetails()}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                        {delayLoader && <Loader />}
                      </div>
                    )}
                  </div>
                </div>
                {/* partial */}
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            {/* End Page-content */}
            <footer className="footer">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    {new Date().getFullYear()} © All Rights Reserved.
                  </div>
                  <div className="col-sm-6">
                    <div className="text-sm-end d-none d-sm-block">
                      Designed and Developed by BPO Call Center Projects
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
