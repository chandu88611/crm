/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Header from "./Header";

import Loader from "./Loader";
import SimpleBar from "simplebar-react";
import Swal from "sweetalert2";
import { successAlert } from "./swAlert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ProposalModal from "./invoices/proposal/ProposalModal";
import {
  useAcceptEnquiryTransferMutation,
  useCancelProposal1Mutation,
  useLazyProCancelListPaginationQuery,
  useLazyProCancelRequestsQuery,
  useLazySearchProCancelListQuery,
} from "../../services/api";

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

export default function ProposalCancelRequest() {
  const [activeTab, setActiveTab] = useState(1);
  const [transferType, setTransferType] = useState("my_requests");
  const [transferData, setTransferData] = useState();
  const [enqSelected, setEnqSelected] = useState();
  const [enqDetails, setEnqDetails] = useState();
  const [showEnquiryDetails, setShowEnquiryDetails] = useState(false);
  const [delayLoader, setDelayLoader] = useState(false);
  const [searchTerm, setSEarchTerm] = useState("");
  const [transferEnqData, setTransferEnqData] = useState();
  const [showProposal, setShowProposal] = useState(false);
  const [proId, setProId] = useState();

  const hidepro = () => {
    setShowProposal(false);
  };

  const handleShowProposal = (id) => {
    setShowProposal(true);
    setProId(id);
  };

  const tabs = [
    { id: 1, title: "Pending" },
    { id: 2, title: "Accepted" },
    { id: 3, title: "Rejected" },
  ];

  const [fetchSearchResults, { isLoading: searchLoading }] =
    useLazySearchProCancelListQuery();
  const [
    fetchtSearchPaginationResults,
    { isLoading: searchPaginationLoading },
  ] = useLazyProCancelListPaginationQuery();

  const [fetchCancelRequests, { data: transferListResp, isLoading }] =
    useLazyProCancelRequestsQuery();

  const fetchTransferData = async () => {
    const response = await fetchCancelRequests({
      type:
        activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
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
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
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
    useCancelProposal1Mutation();

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
        console.log(response);
      }
    }
  };

  const handleRejectRequest = async (id, type) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        type == "reject" ? "Reject" : "Accept"
      } this proposal cancel request. This process cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    });
    if (confirmed.isConfirmed) {
      const response = await rejectReq({ req_id: id, action_type: type });
      if (response?.data?.status) {
        setActiveTab(3);
        successAlert(response?.data?.message);
      } else {
        Swal.fire({
          title: "Error",
          text: response?.error?.data?.message,
          icon: "error",
        });
      }
    }
  };

  const [nextPage, { data: pageData, isLoading: loading }] =
    useLazyProCancelListPaginationQuery();

  const handleNext = () => {
    if (searchTerm != "") {
      fetchtSearchPaginationResults({
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
        page: transferData?.requests?.current_page + 1,
        search: searchTerm,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    } else {
      nextPage({
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
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
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
        page: transferData?.requests?.current_page - 1,
        search: searchTerm,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    } else {
      nextPage({
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
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
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
        page: pageNO,
        search: searchTerm,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    } else {
      nextPage({
        type:
          activeTab == 1 ? "pending" : activeTab == 2 ? "accepted" : "rejected",
        page: pageNO,
      }).then((res) => {
        console.log(res);
        setTransferData(res?.data?.data);
      });
    }
  };

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
      {isLoading && <Loader />}
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-left justify-content-between">
                  <p className="h5">Proposal Cancel Requests</p>

                  <div className="page-title-left ">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Dashboard</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Proposal Cancel Requests
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-lg-4">
                <div
                  className="card card-animate card-height-100 cursor-pointer"
                  onClick={() => setActiveTab(1)}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Pending Requests
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span
                            className="counter-value"
                            data-target={
                              transferType == "my_requests"
                                ? transferData?.counts?.pending_count
                                : transferData?.counts?.pending_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.pending_count
                              : transferData?.counts?.pending_count}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                            <i
                              className="text-primary mdi mdi-file-clock
"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-4">
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
                                ? transferData?.counts?.accepted_count
                                : transferData?.counts?.accepted_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.accepted_count
                              : transferData?.counts?.accepted_count}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-success rounded-circle fs-2">
                            <i className="text-success mdi mdi-file-check" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-4">
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
                                ? transferData?.counts?.rejected_count
                                : transferData?.counts?.rejected_count
                            }
                          >
                            {transferType == "my_requests"
                              ? transferData?.counts?.rejected_count
                              : transferData?.counts?.rejected_count}
                          </span>{" "}
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-danger rounded-circle fs-2">
                            <i className="text-danger mdi  mdi-file-cancel" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/*end col*/}
              {/*end col*/}
            </div>
            {/* end row */}
            <div className="row">
              <div className="col-xxl-12">
                {/* partial:index.partial.html */}
                <div className="card" data-tabs-active="">
                  <div className="row">
                    <div className="col-lg-8 col-sm-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="tabs-container px-2">
                            <div className="tabs">
                              {tabs?.map((tab, ind) => (
                                <div
                                  key={ind}
                                  className={`tab text-muted font-bold ${
                                    activeTab === tab.id
                                      ? "active !text-[#007bff] "
                                      : ""
                                  }`}
                                  onClick={() => setActiveTab(tab.id)}
                                >
                                  {tab.title == "Pending"
                                    ? "Pending"
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
                              placeholder="Search by proposal no"
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
                            <a
                              data-bs-toggle="tooltip"
                              onClick={() => handleClear()}
                            >
                              <button className="btn btn-secondary py-2 btn-sm">
                                <span className="">
                                  <i className="mdi mdi-filter-remove align-middle fs-15"></i>
                                </span>
                              </button>
                            </a>
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
                        <div className={`tab-pane active`}>
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
                                        className="text-center"
                                        scope="col"
                                        style={{ width: 40 }}
                                      >
                                        S.No
                                      </th>

                                      <th className="text-center " scope="col">
                                        Proposal No
                                      </th>
                                      <th
                                        className="sort text-center "
                                        data-sort="id"
                                        scope="col"
                                      >
                                        Proposal Staff Name
                                      </th>
                                      <th
                                        className="sort text-center"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Staff Name
                                      </th>
                                      <th
                                        className="sort text-center"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Requested Date
                                      </th>
                                      {activeTab != 1 && (
                                        <th
                                          className="sort text-center"
                                          data-sort="createBy"
                                          scope="col"
                                        >
                                          {activeTab == 2
                                            ? "Approved by"
                                            : "Rejected By"}
                                        </th>
                                      )}
                                      {activeTab != 1 && (
                                        <th
                                          className="sort text-center"
                                          data-sort="createBy"
                                          scope="col"
                                        >
                                          {activeTab == 2
                                            ? "Approved Date"
                                            : "Rejected Date"}
                                        </th>
                                      )}
                                      <th
                                        className="sort text-center"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Reason
                                      </th>
                                      {activeTab == "1" && (
                                        <th
                                          className="sort text-center"
                                          data-sort="createBy"
                                          scope="col"
                                        >
                                          Action
                                        </th>
                                      )}
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
                                            <td
                                              className="text-center text-primary"
                                              onClick={() =>
                                                handleShowProposal(
                                                  req?.proposal?.id
                                                )
                                              }
                                            >
                                              {req?.proposal?.prefix}-
                                              {req?.proposal?.id
                                                ?.toString()
                                                .padStart(5, "0") +
                                                "/" +
                                                (
                                                  new Date(
                                                    req?.proposal?.date
                                                  ).getMonth() + 1
                                                )
                                                  ?.toString()
                                                  ?.padStart(2, "0") +
                                                "/" +
                                                new Date(
                                                  req?.proposal?.date
                                                ).getFullYear()}
                                            </td>

                                            <td className="name cursor-default text-center text-capitalize">
                                              {req?.staff?.name}
                                            </td>
                                            <td className="name cursor-default text-center text-capitalize">
                                              {req?.req_staff?.name}
                                            </td>
                                            <td className="text-center cursor-default text-capitalize">
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
                                            {activeTab != 1 && (
                                              <td className="cursor-default">
                                                <p className="text-capitalize text-center">
                                                  {req?.tl?.name}
                                                </p>
                                              </td>
                                            )}
                                            {activeTab != 1 && (
                                              <td className="text-center cursor-default">
                                                <span
                                                  className={` badge badge-soft-${
                                                    activeTab == 2
                                                      ? "success"
                                                      : "danger"
                                                  }`}
                                                >
                                                  {new Date(
                                                    req?.updated_at
                                                  ).toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                  })}
                                                </span>
                                              </td>
                                            )}
                                            <td className="text-center">
                                              <OverlayTrigger
                                                delay={{ hide: 450, show: 300 }}
                                                overlay={(props) => (
                                                  <Tooltip {...props}>
                                                    {req?.reason}
                                                  </Tooltip>
                                                )}
                                                placement="bottom"
                                              >
                                                <p className="line-clamp-1 ">
                                                  {req?.reason?.slice(0, 25)}
                                                </p>
                                              </OverlayTrigger>
                                            </td>
                                            {activeTab == 1 && (
                                              <td className="  ">
                                                <div className="flex justify-center">
                                                <a
                                                    className="mr-2"
                                                    data-bs-toggle="tooltip"
                                                    onClick={() =>
                                                      handleRejectRequest(
                                                        req?.id,
                                                        "accept"
                                                      )
                                                    }
                                                  >
                                                    <OverlayTrigger
                                                      delay={{
                                                        hide: 450,
                                                        show: 300,
                                                      }}
                                                      overlay={(props) => (
                                                        <Tooltip {...props}>
                                                          {`Accept Cancel Request`}
                                                        </Tooltip>
                                                      )}
                                                      placement="bottom"
                                                    >
                                                      <button className="btn btn-soft-success py-1 btn-sm">
                                                        <span className="">
                                                          Accept
                                                        </span>
                                                      </button>
                                                    </OverlayTrigger>
                                                  </a>
                                                  <a
                                                    data-bs-toggle="tooltip"
                                                    onClick={() =>
                                                      handleRejectRequest(
                                                        req?.id,
                                                        "reject"
                                                      )
                                                    }
                                                  >
                                                    <OverlayTrigger
                                                      delay={{
                                                        hide: 450,
                                                        show: 300,
                                                      }}
                                                      overlay={(props) => (
                                                        <Tooltip {...props}>
                                                          {`Reject Cancel Request`}
                                                        </Tooltip>
                                                      )}
                                                      placement="bottom"
                                                    >
                                                      <button className="btn btn-soft-danger py-1 btn-sm">
                                                        <span className="">
                                                          Reject
                                                        </span>
                                                      </button>
                                                    </OverlayTrigger>
                                                  </a>
                                                 
                                                </div>
                                              </td>
                                            )}
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
                                      style={{ width: 75, height: 75 }}
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
                      </div>
                    </div>
                    {showEnquiryDetails && (
                      <div className="col-lg-3 pulse ">
                        {!delayLoader && (
                          <div className="card">
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
      {showProposal && proId && (
        <ProposalModal
          show={showProposal}
          hide={hidepro}
          proposalId={proId}
          source={"cancel"}
        />
      )}
    </>
  );
}
