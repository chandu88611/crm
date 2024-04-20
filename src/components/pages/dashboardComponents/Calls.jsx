/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  useLazyCallsPaginationQuery,
  useLazyCallsSearchPaginationQuery,
  useLazyCallsSearchQuery,
  useLazyGetCallsQuery,
} from "../../../services/api";
import Loader from "../Loader";
import Flatpickr from "react-flatpickr";
import { date } from "yup";


export default function TodaysCalls() {
  const [activeTab, setActiveTab] = useState("inbound");
  const [tableData, setTableData] = useState()
  const [dateRange, setDateRange] = useState("");
  const [searchTerm, setSEarchTerm] = useState("")
  const [toggleDateRange, setToggleDateRange] = useState(false)
  const [callsData, setCallsData] = useState()



  const [getcallsData, { isLoading: callsLoading }] = useLazyGetCallsQuery()
  
  const fetchCallsData = async () => {
    // const response = await getcallsData({ type: activeTab == "inboundmissed" ? "inbound_missed" : activeTab == "outboundmissed" ? "outbound_missed" : activeTab, })
    const response = await searchCalls({
      type:
        activeTab == "inboundmissed"
          ? "inbound_missed"
          : activeTab == "outboundmissed"
          ? "outbound_missed"
          : activeTab,
      search: searchTerm,
      range: dateRange,
    })

    if (response?.data?.status) {
      setTableData(response?.data)
      setCallsData(response?.data)
    }
  }

  const [searchCalls, { isLoading: searchLoading }] = useLazyCallsSearchQuery()
  
  useEffect(() => {
    if (!toggleDateRange) {
      setDateRange("")
    }
  },[toggleDateRange])
  
useEffect(()=>{
  if(!dateRange){
    
    fetchCallsData() 
  }
},[dateRange])
  // const getSearchResults = async () => {
  //   if (searchTerm != "" || dateRange != "") {
  //     const response = await searchCalls({
  //       type:
  //         activeTab == "inboundmissed"
  //           ? "inbound_missed"
  //           : activeTab == "outboundmissed"
  //           ? "outbound_missed"
  //           : activeTab,
  //       search: searchTerm,
  //       range: dateRange,
  //     });
  //     if (response?.data?.status) {
  //       setTableData(response?.data)

  //     }
  //   } else {
  //     setTableData(callsData)
  //   }
  // }

  useEffect(() => {
    fetchCallsData()
  }, [activeTab])
  
  const [nextPage, { data: pageData, isLoading: loading, error }] =
    useLazyCallsPaginationQuery();
  
    const [nextSearchPage, { data: pageSearchData, isLoading: searchPageloading }] =
      useLazyCallsSearchPaginationQuery();


  const handleNext = () => {
    if (dateRange || searchTerm) {
      nextSearchPage({
        type:
          activeTab == "inboundmissed"
            ? "inbound_missed"
            : activeTab == "outboundmissed"
            ? "outbound_missed"
            : activeTab,
        page: tableData?.data?.calls?.current_page + 1,
        search: searchTerm,
        range: dateRange,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    } else {
      nextPage({
        type: activeTab == "inboundmissed" ? "inbound_missed" : activeTab == "outboundmissed" ? "outbound_missed" : activeTab,
        page: tableData?.data?.calls?.current_page + 1,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    }
  };

  const handlePrevious = () => {
    if (dateRange || searchTerm) {
      nextSearchPage({
        type:
          activeTab == "inboundmissed"
            ? "inbound_missed"
            : activeTab == "outboundmissed"
            ? "outbound_missed"
            : activeTab,
        page: tableData?.data?.calls?.current_page - 1,
        search: searchTerm,
        range: dateRange,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    } else {
      nextPage({
        type:
          activeTab == "inboundmissed"
            ? "inbound_missed"
            : activeTab == "outboundmissed"
            ? "outbound_missed"
            : activeTab,
        page: tableData?.data?.calls?.current_page - 1,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    }
  };

  const handleCustomPage = (pageNO) => {
    if (dateRange || searchTerm) {
      nextSearchPage({
        type:
          activeTab == "inboundmissed"
            ? "inbound_missed"
            : activeTab == "outboundmissed"
            ? "outbound_missed"
            : activeTab,
        page: pageNO,
        search: searchTerm,
        range: dateRange,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    } else {
      nextPage({
        type:
          activeTab == "inboundmissed"
            ? "inbound_missed"
            : activeTab == "outboundmissed"
            ? "outbound_missed"
            : activeTab,
        page: pageNO,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    }
  };


  function secondsToHMS(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    // Add leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return hours + ":" + minutes + ":" + remainingSeconds;
  }


    const handleDateRange = (value) => {
 
      setDateRange(value);
  };
  

  const handleClear = () => {
    setDateRange("")
    setSEarchTerm("")
   
  }
  useEffect(()=>{
if(dateRange||!searchTerm){
  fetchCallsData();
}
  },[dateRange,searchTerm])
  return (
    <>
      {callsLoading && <Loader />}
      {searchLoading && <Loader />}
      {loading && <Loader />}
      {searchPageloading && <Loader />}
      <div className="card">
        <div className="card-header border-0 align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1 h4">Call Recordings</h4>
        </div>
        <div className="card-body border border-dashed border-end-0 border-start-0">
          <form>
            <div className="row g-3">
              <div
                className={`col-xxl-${toggleDateRange ? "5" : "7"} col-sm-4`}
              >
                <div className="search-box">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSEarchTerm(e?.target?.value)}
                    className="form-control search bg-light border-light"
                    placeholder="Search by linked id and phone number"
                  />
                  {/* <i className="ri-search-line search-icon"></i> */}
                </div>
              </div>
              {toggleDateRange && (
                <div className="col-xxl-2 col-sm-4">
                  <Flatpickr
                    value={dateRange}
                    options={{
                      mode: "range",
                      // dateFormat: "d m, Y"
                      onChange: (selectedDates, dateStr) =>
                        handleDateRange(dateStr),
                    }}
                    placeholder="Select date range"
                    className="form-control search bg-light border-light"
                  />
                </div>
              )}
              <div className="col-xxl-2 col-sm-4">
                <button
                  type="button"
                  className="btn btn-primary bg-primary w-100"
                  onClick={() =>{if(searchTerm != "" || dateRange != ""){ fetchCallsData()}}}
                >
                  {" "}
                  <i className="ri-equalizer-fill me-1 align-bottom"></i>
                  Search
                </button>
              </div>
              <div
                className={`${
                  toggleDateRange
                    ? "col-6 col-md-3 col-lg-3 col-xxl-2 col-sm-4"
                    : "col-6 col-md-3 col-lg-3 col-xxl-2 col-sm-4"
                }`}
              >
                <button
                  id="advSearch"
                  type="button"
                  onClick={() => setToggleDateRange(!toggleDateRange)}
                  className={`btn btn-${
                    toggleDateRange ? "danger" : "info"
                  } bg-${toggleDateRange ? "danger" : "info"} w-100`}
                >
                  {" "}
                  {!toggleDateRange && (
                    <i className="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
                  )}
                  {toggleDateRange ? "Hide Advance Search" : " Advanced Search"}
                </button>
              </div>
              <div className="col-xxl-1 col-sm-2">
                <button
                  type="button"
                  className="btn btn-secondary bg-secondary w-100"
                  onClick={() => handleClear()}
                >
                  {" "}
                  Clear
                </button>
              </div>
              <div
                className="col-6 col-md-3 col-lg-3 col-xxl-12 py-2 m-0"
                id="advSearchDiv"
              >
                <hr />
                <div className="d-flex gap-2">
                  <div className="col-xxl-2">
                    <select
                      className="form-control"
                      data-choices
                      name="choices-single-default"
                    >
                      <option value="">Select Source</option>
                      <option value="Choice 1">Inbound</option>
                      <option value="Choice 2">Outbound</option>
                      <option value="Choice 3">Inbound Missed</option>
                      <option value="Choice 3">Outbound Missed</option>
                    </select>
                  </div>
                  <div className="col-xxl-2">
                    <input
                      type="text"
                      className="form-control"
                      data-provider="flatpickr"
                      data-date-format="d M, Y"
                      data-range-date="true"
                      placeholder="Select Date Range"
                    />
                  </div>
                  <div className="col-6 col-md-2 col-lg-2 col-xxl-1">
                    <button className="btn btn-success bg-success w-100">
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
            data-dropdown-tabs="true"
            id=""
            role="tablist"
          >
            <li className="nav-item">
              <a
                className={`nav-link align-middle cursor-pointer ${
                  activeTab == "inbound" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("inbound");
                }}
              >
                <i className="mdi mdi-phone-incoming-outline"></i> Inbound
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link align-middle cursor-pointer ${
                  activeTab == "outbound" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("outbound");
                }}
              >
                <i className="mdi mdi-phone-outgoing-outline"></i> Outbound
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link align-middle cursor-pointer ${
                  activeTab == "inboundmissed" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("inboundmissed");
                }}
              >
                <i className="mdi mdi-phone-missed-outline"></i> Inbound Missed
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link align-middle cursor-pointer ${
                  activeTab == "outboundmissed" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("outboundmissed");
                }}
              >
                <i className="mdi mdi-phone-missed-outline"></i> Outbound Missed
              </a>
            </li>
          </ul>
          {/* <!-- Nav tabs --> */}
          <div className="tab-content text-muted" id="">
            <div
              className={`tab-pane ${activeTab == "inbound" ? "active" : ""}`}
              id="inbound-tab"
              role="tabpanel"
            >
              <div className="card card-height-100 mt-4">
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap table-centered align-middle">
                      <thead className="bg-light text-muted">
                        <tr>
                          <th className="text-center" scope="col">
                            Sl No.
                          </th>
                          <th className="text-center" scope="col">
                            Staff Name
                          </th>
                          <th className="text-center" scope="col">
                            Call Date
                          </th>
                          <th className="text-center" scope="col">
                            Linked ID
                          </th>
                          <th className="text-center" scope="col">
                            Phone
                          </th>
                          <th className="text-center" scope="col">
                            Disposition
                          </th>
                          <th className="text-center" scope="col">
                            Duration
                          </th>
                          <th className="text-center w-[10%]" scope="col">
                            Recording
                          </th>
                        </tr>
                        {/* <!-- end tr --> */}
                      </thead>
                      {/* <!-- thead --> */}
                      <tbody>
                        {tableData?.data?.calls?.data?.length > 0 &&
                          !callsLoading &&
                          tableData?.data?.calls?.data?.map((row, ind) => (
                            <tr key={ind}>
                              <td className="text-center">{ind + 1}</td>
                              <td className="text-center text-capitalize">
                                {row?.staff?.name}
                              </td>
                              <td className="fw-medium text-center">
                                {row?.calldate}
                              </td>
                              <td className="text-center">{row?.uuid}</td>
                              <td className="text-center">{row?.source}</td>
                              <td className="text-center">
                                <span
                                  className={`badge badge-soft-${
                                    row?.bill_sec > 0 ? "success" : "danger"
                                  }`}
                                >
                                  {row?.bill_sec > 0
                                    ? "ANSWERED"
                                    : "NOT ANSWERED"}
                                </span>
                              </td>
                              <td className="text-muted text-center">
                                {secondsToHMS(row?.bill_sec)}
                              </td>
                              <td>
                                <audio controls controlsList="nodownload">
                                  <source
                                    src={
                                      row?.bill_sec > 0
                                        ? row?.recordingfile
                                        : null
                                    }
                                    type="audio/ogg"
                                  />
                                  <source
                                    src={
                                      row?.bill_sec > 0
                                        ? row?.recordingfile
                                        : null
                                    }
                                    type="audio/mpeg"
                                  />
                                  Your browser does not support the audio tag.
                                </audio>
                              </td>
                            </tr>
                          ))}
                        {tableData?.data?.calls?.data?.length == 0 && (
                          <tr className="!border-0">
                            <td colSpan={8}>
                              <p className="text-center w-full text-lg">
                                No data found
                              </p>
                            </td>
                          </tr>
                        )}
                 
                      </tbody>
                
                    </table>
                    <div className="flex justify-between">
                      <div className="">
                        <div
                          className="dataTables_info"
                          id="example_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing{" "}
                          {tableData?.data?.calls?.from
                            ? tableData?.data?.calls?.from
                            : 0}{" "}
                          to{" "}
                          {tableData?.data?.calls?.to
                            ? tableData?.data?.calls?.to
                            : 0}{" "}
                          of {tableData?.data?.calls?.total} entries
                        </div>
                      </div>
                      <div className="">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example_paginate"
                        >
                          <ul className="pagination">
                            {tableData?.data?.calls?.total > 0 &&
                              tableData?.data?.calls?.links?.map(
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
                                        if (page?.label?.includes("Previous")) {
                                          handlePrevious();
                                        } else if (
                                          page?.label?.includes("Next")
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
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end table --> */}
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
              {/* <!-- end card --> */}
            </div>

            <div
              className={`tab-pane ${activeTab == "outbound" ? "active" : ""}`}
              id="outbound-tab"
              role="tabpanel"
            >
              <div className="card card-height-100 mt-4">
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap table-centered align-middle">
                      <thead className="bg-light text-muted">
                        <tr>
                          <th className="text-center" scope="col">
                            Sl No.
                          </th>
                          <th className="text-center">Staff Name</th>
                          <th className="text-center" scope="col">
                            Call Date
                          </th>
                          <th className="text-center" scope="col">
                            Linked ID
                          </th>
                          <th className="text-center" scope="col">
                            Phone
                          </th>
                          <th className="text-center" scope="col">
                            Disposition
                          </th>
                          <th className="text-center" scope="col">
                            Duration
                          </th>
                          <th className="text-center w-[10%]" scope="col">
                            Recording
                          </th>
                        </tr>
                        {/* <!-- end tr --> */}
                      </thead>
                      {/* <!-- thead --> */}
                      <tbody>
                        {tableData?.data?.calls?.data?.length > 0 &&
                          !callsLoading &&
                          tableData?.data?.calls?.data?.map((row, ind) => (
                            <tr key={ind}>
                              <td className="text-center">{ind + 1}</td>
                              <td className="text-center text-capitalize">
                                {row?.staff?.name}
                              </td>
                              <td className="fw-medium text-center">
                                {row?.calldate}
                              </td>
                              <td className="text-center">{row?.uuid}</td>
                              <td className="text-center">
                                {row?.destination}
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge badge-soft-${
                                    row?.bill_sec > 0 ? "success" : "danger"
                                  }`}
                                >
                                  {row?.bill_sec > 0
                                    ? "ANSWERED"
                                    : "NOT ANSWERED"}
                                </span>
                              </td>
                              <td className="text-muted text-center">
                                {secondsToHMS(row?.bill_sec)}
                              </td>
                              <td>
                                <audio controls controlsList="nodownload">
                                  <source
                                    src={
                                      row?.bill_sec > 0
                                        ? row?.recordingfile
                                        : null
                                    }
                                    type="audio/ogg"
                                  />
                                  <source
                                    src={
                                      row?.bill_sec > 0
                                        ? row?.recordingfile
                                        : null
                                    }
                                    type="audio/mpeg"
                                  />
                                  Your browser does not support the audio tag.
                                </audio>
                              </td>
                            </tr>
                          ))}
                        {tableData?.data?.calls?.data?.length == 0 && (
                          <tr className="!border-0">
                            <td colSpan={8}>
                              <p className="text-center w-full text-lg">
                                No data found
                              </p>
                            </td>
                          </tr>
                        )}
                        {/* <!-- end tr --> */}
                      </tbody>
                      {/* <!-- end tbody --> */}
                    </table>
                    <div className="flex justify-between">
                      <div className="">
                        <div
                          className="dataTables_info"
                          id="example_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing{" "}
                          {tableData?.data?.calls?.from
                            ? tableData?.data?.calls?.from
                            : 0}{" "}
                          to{" "}
                          {tableData?.data?.calls?.to
                            ? tableData?.data?.calls?.to
                            : 0}{" "}
                          of {tableData?.data?.calls?.total} entries
                        </div>
                      </div>
                      <div className="">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example_paginate"
                        >
                          <ul className="pagination">
                            {tableData?.data?.calls?.total > 0 &&
                              tableData?.data?.calls?.links?.map(
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
                                        if (page?.label?.includes("Previous")) {
                                          handlePrevious();
                                        } else if (
                                          page?.label?.includes("Next")
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
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end table --> */}
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
              {/* <!-- end card --> */}
            </div>

            <div
              className={`tab-pane ${
                activeTab == "inboundmissed" ? "active" : ""
              }`}
              id="inbound-missed-tab"
              role="tabpanel"
            >
              <div className="card card-height-100 mt-4">
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap table-centered align-middle">
                      <thead className="bg-light text-muted">
                        <tr>
                          <th className="text-center" scope="col">
                            Sl No.
                          </th>
                          <th className="text-center">Staff Name</th>
                          <th className="text-center" scope="col">
                            Call Date
                          </th>
                          <th className="text-center" scope="col">
                            Linked ID
                          </th>
                          <th className="text-center" scope="col">
                            Phone
                          </th>
                          <th className="text-center" scope="col">
                            Disposition
                          </th>
                          <th className="text-center" scope="col">
                            Duration
                          </th>
                          {/* <th className="text-center w-[10%]" scope="col">
                            Recording
                          </th> */}
                        </tr>
                        {/* <!-- end tr --> */}
                      </thead>
                      {/* <!-- thead --> */}
                      <tbody>
                        {tableData?.data?.calls?.data?.length > 0 &&
                          !callsLoading &&
                          tableData?.data?.calls?.data?.map((row, ind) => (
                            <tr key={ind}>
                              <td className="text-center">{ind + 1}</td>
                              <td className="text-center text-capitalize">
                                {row?.staff?.name?row?.staff?.name:"NA"}
                              </td>
                              <td className="fw-medium text-center">
                                {row?.calldate}
                              </td>
                              <td className="text-center">{row?.uuid}</td>
                              <td className="text-center">{row?.source}</td>
                              <td className="text-center">
                                <span
                                  className={`badge badge-soft-${
                                    row?.bill_sec > 0 ? "success" : "danger"
                                  }`}
                                >
                                  {row?.bill_sec > 0
                                    ? "ANSWERED"
                                    : "NOT ANSWERED"}
                                </span>
                              </td>
                              <td className="text-muted text-center">
                                {secondsToHMS(row?.bill_sec)}
                              </td>
                              {/* <td>
                                <audio controls controlsList="nodownload">
                                  <source
                                    src={row?.bill_sec > 0 ? row?.recordingfile : null}
                                    type="audio/ogg"
                                  />
                                  <source
                                    src={row?.bill_sec > 0 ? row?.recordingfile : null}
                                    type="audio/mpeg"
                                  />
                                  Your browser does not support the audio tag.
                                </audio>
                              </td> */}
                            </tr>
                          ))}
                        {tableData?.data?.calls?.data?.length == 0 && (
                          <tr className="!border-0">
                            <td colSpan={8}>
                              <p className="text-center w-full text-lg">
                                No data found
                              </p>
                            </td>
                          </tr>
                        )}
                        {/* <!-- end tr --> */}
                      </tbody>
                      {/* <!-- end tbody --> */}
                    </table>
                    <div className="flex justify-between">
                      <div className="">
                        <div
                          className="dataTables_info"
                          id="example_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing{" "}
                          {tableData?.data?.calls?.from
                            ? tableData?.data?.calls?.from
                            : 0}{" "}
                          to{" "}
                          {tableData?.data?.calls?.to
                            ? tableData?.data?.calls?.to
                            : 0}{" "}
                          of {tableData?.data?.calls?.total} entries
                        </div>
                      </div>
                      <div className="">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example_paginate"
                        >
                          <ul className="pagination">
                            {tableData?.data?.calls?.total > 0 &&
                              tableData?.data?.calls?.links?.map(
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
                                        if (page?.label?.includes("Previous")) {
                                          handlePrevious();
                                        } else if (
                                          page?.label?.includes("Next")
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
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end table --> */}
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
              {/* <!-- end card --> */}
            </div>

            <div
              className={`tab-pane ${
                activeTab == "outboundmissed" ? "active" : ""
              }`}
              id="outbound-missed-tab"
              role="tabpanel"
            >
              <div className="card card-height-100 mt-4">
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap table-centered align-middle">
                      <thead className="bg-light text-muted">
                        <tr>
                          <th className="text-center" scope="col">
                            Sl No.
                          </th>
                          <th className="text-center">Staff Name</th>
                          <th className="text-center" scope="col">
                            Call Date
                          </th>
                          <th className="text-center" scope="col">
                            Linked ID
                          </th>
                          <th className="text-center" scope="col">
                            Phone
                          </th>
                          <th className="text-center" scope="col">
                            Disposition
                          </th>
                          <th className="text-center" scope="col">
                            Duration
                          </th>
                          {/* <th className="text-center w-[10%]" scope="col">
                            Recording
                          </th> */}
                        </tr>
                        {/* <!-- end tr --> */}
                      </thead>
                      {/* <!-- thead --> */}
                      <tbody>
                        {tableData?.data?.calls?.data?.length > 0 &&
                          !callsLoading &&
                          tableData?.data?.calls?.data?.map((row, ind) => (
                            <tr key={ind}>
                              <td className="text-center">{ind + 1}</td>
                              <td className="text-center text-capitalize">
                                {row?.staff?.name}
                              </td>
                              <td className="fw-medium text-center">
                                {row?.calldate}
                              </td>
                              <td className="text-center">{row?.uuid}</td>
                              <td className="text-center">
                                {row?.destination}
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge badge-soft-${
                                    row?.bill_sec > 0 ? "success" : "danger"
                                  }`}
                                >
                                  {row?.bill_sec > 0
                                    ? "ANSWERED"
                                    : "NOT ANSWERED"}
                                </span>
                              </td>
                              <td className="text-muted text-center">
                                {secondsToHMS(row?.bill_sec)}
                              </td>
                              {/* <td>
                                <audio controls controlsList="nodownload">
                                  <source
                                    src={row?.bill_sec > 0 ? row?.recordingfile : null}
                                    type="audio/ogg"
                                  />
                                  <source
                                    src={row?.bill_sec > 0 ? row?.recordingfile : null}
                                    type="audio/mpeg"
                                  />
                                  Your browser does not support the audio tag.
                                </audio>
                              </td> */}
                            </tr>
                          ))}
                        {tableData?.data?.calls?.data?.length == 0 && (
                          <tr className="!border-0">
                            <td colSpan={8}>
                              <p className="text-center w-full text-lg">
                                No data found
                              </p>
                            </td>
                          </tr>
                        )}
                        {/* <!-- end tr --> */}
                      </tbody>
                      {/* <!-- end tbody --> */}
                    </table>
                    <div className="flex justify-between">
                      <div className="">
                        <div
                          className="dataTables_info"
                          id="example_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing{" "}
                          {tableData?.data?.calls?.from
                            ? tableData?.data?.calls?.from
                            : 0}{" "}
                          to{" "}
                          {tableData?.data?.calls?.to
                            ? tableData?.data?.calls?.to
                            : 0}{" "}
                          of {tableData?.data?.calls?.total} entries
                        </div>
                      </div>
                      <div className="">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example_paginate"
                        >
                          <ul className="pagination">
                            {tableData?.data?.calls?.total > 0 &&
                              tableData?.data?.calls?.links?.map(
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
                                        if (page?.label?.includes("Previous")) {
                                          handlePrevious();
                                        } else if (
                                          page?.label?.includes("Next")
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
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end table --> */}
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
    </>
  );
}