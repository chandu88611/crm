/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Footer from "../Footer";
import Header from "../Header";
import "../../assets/optRequests.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../reducers/loader";
import Loader from "../Loader";
import SimpleBar from "simplebar-react";
import { useLazyGetInvoicesAccessKeysPaginationQuery } from "../../../services/api";
import moment from "moment";

export default function OPTRequestes({ source, data, activeTab, handleActiveTab }) {
  const [copied, setCopied] = useState();
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
  // const [searchTerm, setSearchTerm] = useState("")
  const [tableData, setTableData] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");


    const [ nextPage, { data:pageData , isLoading:loading , error:paginationErr }] = useLazyGetInvoicesAccessKeysPaginationQuery();

  useEffect(() => {
    setTableData(data?.data?.access_keys);
  }, [data]);

    const handleNext = () => {
      nextPage({
        type: activeTab,
        no: tableData?.current_page + 1,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data?.data?.access_keys);
      });
    };

    const handlePrevious = () => {
      nextPage({
        type: activeTab,
        no: tableData?.current_page - 1,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data?.data?.access_keys);
      });
    };

    const handleCustomPage = (pageNO) => {
      nextPage({
        type: activeTab,
        no: pageNO,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data?.data?.access_keys);
      });
    };

  const handleSearch = (searchTerm) => {
    if (searchTerm != "") {
      const accesskeyData = [...data.data.access_keys];
      const lowerSearch = searchTerm.toLocaleLowerCase();  

      const filteredData = accesskeyData.filter((info) => {
        return (
          info?.staff?.name?.toLocaleLowerCase().includes(lowerSearch) ||
          info?.customer?.first_name
            ?.toLocaleLowerCase()
            .includes(lowerSearch) ||
          info?.customer?.last_name
            ?.toLocaleLowerCase()
            .includes(lowerSearch) ||
          info?.access_code === lowerSearch
        );
      });

      console.log(filteredData);
      setTableData(filteredData);  
    } else {
      setTableData(data?.data?.access_keys);
    }
  };

  return (
    <>
      {loaderState && <Loader />}
      {loading && <Loader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
         
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Access codes</a>
                        </li>
                        <li className="breadcrumb-item active capitalize">
                          {source}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <ul className="nav nav-pills card-header-pills" role="tablist">
                  <li
                    className="nav-item"
                    // onClick={() => handleActiveTab("requested")}
                  >
                    <a className="nav-link  ">
                      <div
                        className={`card card-animate ${
                          activeTab == "requested" ? "card-active" : ""
                        } card-height-100`}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-medium text-muted mb-0">
                                Requested Access codes
                              </p>
                              <h2 className="mt-4 ff-secondary fw-semibold h2">
                                <span
                                  className="counter-value"
                                  data-target="50"
                                >
                                  {data?.data?.counts?.total}
                                </span>
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-warning rounded-circle fs-2 ">
                                  <i className="text-warning mdi mdi-lock !mr-0"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleActiveTab("active")}
                  >
                    <a className="nav-link  ">
                      <div
                        className={`card card-animate ${
                          activeTab == "active" ? "card-active" : ""
                        } card-height-100`}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-medium text-muted mb-0">
                                Active Access codes
                              </p>
                              <h2 className="mt-4 ff-secondary fw-semibold h2">
                                <span
                                  className="counter-value"
                                  data-target="50"
                                >
                                  {data?.data?.counts?.active}
                                </span>
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-info rounded-circle fs-2">
                                  <i className="text-info mdi mdi-lock-check-outline !mr-0"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleActiveTab("used")}
                  >
                    <a className="nav-link">
                      <div
                        className={`card card-animate ${
                          activeTab == "used" ? "card-active" : ""
                        } card-height-100`}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-medium text-muted mb-0">
                                Successfully Used
                              </p>
                              <h2 className="mt-4 ff-secondary fw-semibold h2">
                                <span
                                  className="counter-value"
                                  data-target="50"
                                >
                                  {data?.data?.counts?.used}
                                </span>
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-success rounded-circle fs-2">
                                  <i
                                    data-feather="check-circle"
                                    className="text-success mdi mdi-progress-check !mr-0"
                                  ></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleActiveTab("expired")}
                  >
                    <a className="nav-link">
                      <div
                        className={`card card-animate ${
                          activeTab == "expired" ? "card-active" : ""
                        } card-height-100`}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-medium text-muted mb-0">
                                Expired
                              </p>
                              <h2 className="mt-4 ff-secondary fw-semibold h2">
                                <span
                                  className="counter-value"
                                  data-target="8"
                                ></span>
                                {data?.data?.counts?.expired}
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-danger rounded-circle fs-2">
                                  <i
                                    data-feather="alert-octagon"
                                    className="text-danger mdi mdi-alert-octagon-outline !mr-0"
                                  ></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card" id="apiKeyList">
                    <div className="card-header d-flex align-items-center">
                      <div className="flex justify-between items-center w-full">
                        <h5 className="card-title flex-grow-1 mb-0 h5 text-capitalize">
                          {activeTab} Access Keys
                        </h5>
                        <div>
                          <input
                            type="search"
                            className="form-control"
                            placeholder="Search here"
                            // value={searchTerm}
                            onChange={(e) => handleSearch(e?.target?.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* <!-- Tab panes --> */}
                      <div className="tab-content text-muted">
                        <div
                          className="tab-pane active"
                          id="requests"
                          role="tabpanel"
                        >
                          <div>
                            <div className="table-responsive  mb-3 ">
                              <SimpleBar className="max-h-[450px]">
                                <table className="table align-middle table-nowrap mb-0 mx-auto">
                                  <thead className="table-light">
                                    <tr>
                                      <th
                                        className="sort d-none"
                                        data-sort="id"
                                        scope="col"
                                      >
                                        Id
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="name"
                                        scope="col"
                                      >
                                        Name
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="createBy"
                                        scope="col"
                                      >
                                        Created For
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="apikey"
                                        scope="col"
                                      >
                                        Access Key
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="type"
                                        scope="col"
                                      >
                                        Type
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="status"
                                        scope="col"
                                      >
                                        Status
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="create_date"
                                        scope="col"
                                      >
                                        Create Date
                                      </th>
                                      <th
                                        className="sort"
                                        data-sort="expiry_date"
                                        scope="col"
                                      >
                                        Expiry Date
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody className="list form-check-all">
                                    {tableData?.data?.length > 0 &&
                                      tableData?.data?.map((accesskey, ind) => (
                                        <tr key={ind}>
                                          {/* <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="chk_child"
                                          value="option1"
                                        />
                                      </div>
                                    </th> */}

                                          <td className="text-primary name fs-15 capitalize">
                                            {accesskey?.staff?.name
                                              ? accesskey?.staff?.name
                                              : ""}
                                          </td>
                                          <td className="createBy capitalize">
                                            {accesskey?.customer?.first_name
                                              ? accesskey?.customer?.first_name
                                              : "NA"}{" "}
                                            {accesskey?.customer?.last_name}
                                          </td>
                                          <td className="apikey !relative">
                                            <input
                                              type="text"
                                              className="form-control apikey-value cursor-pointer "
                                              readOnly
                                              onClick={() => {
                                                navigator.clipboard.writeText(
                                                  accesskey?.access_code
                                                );
                                                setCopied(ind);
                                                setTimeout(() => {
                                                  setCopied();
                                                }, 2000);
                                              }}
                                              value={
                                                accesskey?.access_code
                                                // ?.replace(/(.{4})/g, "$1-")
                                                // .replace(/-$/, "")
                                              }
                                             
                                            />
                                            <i
                                              className="mdi mdi-content-copy !absolute !top-5 !left-[92%] "
                                              onClick={() => {
                                                navigator.clipboard.writeText(
                                                  accesskey?.access_code
                                                );
                                                setCopied(ind);
                                                setTimeout(() => {
                                                  setCopied();
                                                }, 2000);
                                              }}
                                            ></i>
                                            {copied == ind && (
                                              <p className="text-green-500 text-xs p-1">
                                                Access Code Copied to clipboard
                                              </p>
                                            )}
                                          </td>
                                          <td className=" ">
                                            <span
                                              className={`badge badge-soft-${
                                                accesskey?.type == "login"
                                                  ? "info"
                                                  : accesskey?.type == "invoice"
                                                  ? "warning"
                                                  : "primary"
                                              } capitalize fs-13`}
                                            >
                                              {accesskey?.type}
                                            </span>
                                          </td>
                                          <td className="status">
                                            <span
                                              className={`fs-13 badge badge-soft-${
                                                accesskey?.status == 0
                                                  ? "success"
                                                  : accesskey?.status == 1 ? "warning" : "danger"
                                              }`}
                                            >
                                              {accesskey?.status == 0
                                                ? "Active"
                                                : accesskey?.status == 1 ? "Used": "Expired" }
                                            </span>
                                          </td>
                                          <td className="create_date">
                                            <p className="mb-0">
                                              {new Date(
                                                accesskey?.created_date
                                              )?.toLocaleDateString(undefined, {
                                                timeZone: "Asia/Kolkata",
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </p>
                                            <small className="text-muted">
                                        
                                       {moment(accesskey?.created_date).format('hh:mm:ss A')}

                                            </small>
                                          </td>
                                          <td className="expiry_date">
                                            <p className="mb-0">
                                              {new Date(
                                                accesskey?.expire_at
                                              )?.toLocaleDateString(undefined, {
                                                timeZone: "Asia/Kolkata",
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </p>
                                            <small className="text-muted">
                                              {new Date(
                                                accesskey?.expire_at
                                              ).toLocaleTimeString()}
                                            </small>
                                          </td>
                                          {/* <td>
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-soft-secondary btn-sm dropdown"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <i className="ri-more-fill align-middle"></i>
                                              </button>
                                              <ul className="dropdown-menu dropdown-menu-end">
                                                <li>
                                                  <a className="dropdown-item regenerate-api-btn">
                                                    <i className="mdi mdi-refresh"></i>{" "}
                                                    Regenerate Key
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    className="dropdown-item disable-btn"
                                                    href="javascript:void(0);"
                                                  >
                                                    <i className="mdi mdi-close-octagon"></i>{" "}
                                                    Disable
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </td> */}
                                        </tr>
                                      ))}
                                    {tableData?.data?.length < 1 && (
                                      <>
                                        <tr>
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
                            </div>

                            <div className="flex justify-between">
                              {tableData?.data?.length > 0 && (
                                <div className="">
                                  <div
                                    className="dataTables_info"
                                    id="example_info"
                                    role="status"
                                    aria-live="polite"
                                  >
                                    Showing{" "}
                                    {tableData?.from
                                      ? tableData?.from
                                      : 0}{" "}
                                    to{" "}
                                    {tableData?.to
                                      ? tableData?.to
                                      : 0}{" "}
                                    of {tableData?.total} entries
                                  </div>
                                </div>
                              )}
                              <div className="">
                                <div
                                  className="dataTables_paginate paging_simple_numbers"
                                  id="example_paginate"
                                >
                                  <ul className="pagination">
                             

                                    {tableData?.total > 0 &&
                                      tableData?.links?.map(
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
