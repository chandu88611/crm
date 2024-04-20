/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../../Header";
import "../../../assets/invoices.css";
import Select from "react-select";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProposalsQuery, useLazyProposalsPaginationQuery, useSearchProposalMutation } from "../../../../services/api";
import { hideLoader, showLoader } from "../../../../reducers/loader";
import Loader from "../../Loader";
import ProposalModal from "./ProposalModal";


export default function CommonProposal({ type }) {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
  const [showProposal, setShowProposal] = useState(false);
  const [proposalId, setProposalId] = useState();
  const [checkedIds, setCheckedIds] = useState([]);
    const [invTerm, setInvTerm] = useState("");

  const [showCreateProposal, setShowCreateProposal] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const {
    data: proposalData,
    isLoading,
    error,
  } = useGetAllProposalsQuery(type?.toLowerCase());
  console.log(proposalData, error);

  const handleShowProposal = (id) => {
    setProposalId(id);
    setShowProposal(true);
  };

  const hideinv = () => {
    setShowProposal(false);
  };

  const [proposalSearch, { data, isLoading: searchLoading }] =
    useSearchProposalMutation();

  const getSearchResults = () => {
    dispatch(showLoader());
    setDebouncedSearchTerm(searchTerm, "searchTerm");
    console.log(searchTerm);
    if (searchTerm != "" || invTerm) {
      proposalSearch({
        searchkey: searchTerm,
        proposal_no: invTerm,
        status: type?.toLowerCase(),
      }).then((res) => {
        console.log(res, "searchTerm");
        setTableData(res?.data);
      });
    } else {
      setTableData(proposalData);
    }
    dispatch(hideLoader());
  };

  // Handler for input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

    const handleInvSearch = (event) => {
      setInvTerm(event.target.value);
    };

  useEffect(() => {
    setTableData(proposalData);
  }, [proposalData]);

  const [
    nextPage,
    { data: pageData, isLoading: loading, error: paginationErr },
  ] = useLazyProposalsPaginationQuery();

  console.log(pageData, loading, paginationErr);

  const handleNext = () => {
    nextPage({
      type: type?.toLowerCase(),
      no: tableData?.data?.proposals?.current_page + 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handlePrevious = () => {
    nextPage({
      type: type?.toLowerCase(),
      no: tableData?.data?.proposals?.current_page - 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handleCustomPage = (pageNO) => {
    nextPage({
      type: type?.toLowerCase(),
      no: pageNO,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handleTableSorting = (colType, fieldName) => {
    console.log(tableData);
    if (tableData?.data?.invoices?.data) {
      if (colType == "string") {
        if (fieldName == "first_name") {
          const sortedData = [...tableData.data.invoices.data.customer].sort(
            (a, b) => a[fieldName].localeCompare(b[fieldName])
          );
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              invoices: {
                ...tableData.data.invoices,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        } else {
          const sortedData = [...tableData.data.invoices.data].sort((a, b) =>
            a[fieldName].localeCompare(b[fieldName])
          );
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              invoices: {
                ...tableData.data.invoices,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        }

        // Create a new object with the sorted data
      } else if (colType == "number") {
        const sortedData = [...tableData.data.invoices.data].sort(
          (a, b) => a[fieldName] - b[fieldName]
        );

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            invoices: {
              ...tableData.data.invoices,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
        console.log(sortedData, "sortedData");
      } else if (colType == "date") {
        const sortedData = [...tableData.data.invoices.data].sort((a, b) => {
          const dateA = new Date(a[fieldName]).getTime();
          const dateB = new Date(b[fieldName]).getTime();

          return dateA - dateB;
        });

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            invoices: {
              ...tableData.data.invoices,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
      }
    }
  };

  const handleTableDescSorting = (colType, fieldName) => {
    console.log(tableData);
    if (tableData?.data?.invoices?.data) {
      if (colType == "string") {
        const sortedData = [...tableData.data.invoices.data].sort((a, b) =>
          a[fieldName].localeCompare(b[fieldName])
        );
        sortedData.reverse();

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            invoices: {
              ...tableData.data.invoices,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
      } else if (colType == "number") {
        const sortedData = [...tableData.data.invoices.data].sort(
          (a, b) => b[fieldName] - a[fieldName]
        );

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            invoices: {
              ...tableData.data.invoices,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
        console.log(sortedData, "sortedData");
      } else if (colType == "date") {
        const sortedData = [...tableData.data.invoices.data].sort((a, b) => {
          const dateA = new Date(a[fieldName]).getTime();
          const dateB = new Date(b[fieldName]).getTime();

          return dateB - dateA;
        });

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            invoices: {
              ...tableData.data.invoices,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
      }
    }
  };

      const handleCheckboxChange = (id) => {
        // Use a functional state update to ensure consistency
        setCheckedIds((prevCheckedIds) => {
          // Find the index of the ID in the array
          const index = prevCheckedIds.indexOf(id);

          // If the ID is found, remove it; otherwise, add it
          return index !== -1
            ? prevCheckedIds
                .slice(0, index)
                .concat(prevCheckedIds.slice(index + 1))
            : [...prevCheckedIds, id];
        });
      };

      const handleZipInvoices = async () => {
      
        const proposalIdsString = checkedIds.join(',');
        console.log(proposalIdsString, "proposalIds");
        const response = await axios.get(
          `https://skycontroller.connetz.shop/tl-api/proposals/zip-proposal?proposal_ids=${proposalIdsString}`,
     
          {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/zip",
              Authorization: "Bearer " + localStorage.getItem("clt_token"),
            },
          }
        );
        console.log(response)
        if (response?.status) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log(response, url, new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Proposal.zip"); //or any other extension
          document.body.appendChild(link);
          link.click();
        }
  };
  
    const handleClearSearch = () => {
      setSearchTerm("");
      setInvTerm("")
      setTableData(proposalData);
    };
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
                    <h4 className="mb-sm-0 font-size-18 capitalize h4">
                      {type} Proposals
                    </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Proposals</a>
                        </li>
                        <li className="breadcrumb-item active capitalize">
                          {type}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row h-100">
                <div className="col-lg-4 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/proposal/accepted";
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-success rounded-circle fs-3">
                            <i className="mdi mdi-cash-check align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            {" "}
                            Accepted Proposals
                          </p>
                          <h4 className="mb-2 h4">
                            ₹{" "}
                            <span
                              className="counter-value"
                              data-target={
                                proposalData?.data?.counts?.accepted_total
                              }
                            >
                              {proposalData?.data?.counts?.accepted_total}
                            </span>
                          </h4>
                          <h6 className="text-success mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              {proposalData?.data?.counts?.accepted_count}
                            </span>{" "}
                            Proposals
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-4 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/proposal/rejected";
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-danger rounded-circle fs-3">
                            <i className="mdi mdi-cash-remove align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Rejected Proposals
                          </p>
                          <h4 className="mb-2 h4">
                            ₹{" "}
                            <span
                              className="counter-value"
                              data-target={
                                proposalData?.data?.counts?.rejected_total
                              }
                            >
                              {proposalData?.data?.counts?.rejected_total}
                            </span>
                          </h4>
                          <h6 className="text-danger mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              {proposalData?.data?.counts?.rejected_count}
                            </span>{" "}
                            Proposals
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-4 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/proposal/pending";
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-warning rounded-circle fs-3">
                            <i className="mdi mdi-cash-refund align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Pending Proposals
                          </p>
                          <h4 className="mb-2 h4">
                            ₹{" "}
                            <span
                              className="counter-value"
                              data-target={
                                proposalData?.data?.counts?.pending_total
                              }
                            >
                              {proposalData?.data?.counts?.pending_total}
                            </span>
                          </h4>
                          <h6 className="text-warning mb-0 h6">
                            <span className="counter-value" data-target="2390">
                              {proposalData?.data?.counts?.pending_count}
                            </span>{" "}
                            Proposals
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!--end row--> */}
              <div className="row">
                <div className="col-lg-12">
                  {!showCreateProposal && (
                    <div className="card" id="tasksList">
                      <div className="card-header border-0">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1 capitalize h5">
                            {type} Proposals{" "}
                            <span className="text-primary">
                              ({tableData?.data?.invoices?.total})
                            </span>{" "}
                          </h5>
                          {type == "all" && (
                            <button
                              className="btn btn-info bg-info btn-sm"
                              id="showCreateProposal"
                              onClick={() => setShowCreateProposal(true)}
                            >
                              <i className="ri-add-line align-bottom"></i>{" "}
                              Create Proposal{" "}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="card-body border border-dashed border-end-0 border-start-0">
                        <form>
                          <div className="row g-3">
                            <div className="col-xxl-4 col-sm-12">
                              <div className="search-box">
                                <input
                                  type="text"
                                  value={searchTerm}
                                  onChange={handleInputChange}
                                  className="form-control search bg-light border-light"
                                  placeholder="Search"
                                />
                                {/* <i className="ri-search-line search-icon"></i> */}
                              </div>
                            </div>
                            <div className="col-xxl-3 col-sm-12">
                              <div className="search-box">
                                <input
                                  type="text"
                                  value={invTerm}
                                  onChange={handleInvSearch}
                                  className="form-control search bg-light border-light"
                                  placeholder="Search by Proposal No"
                                />
                              </div>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-xxl-2 col-sm-4">
                              <button
                                type="button"
                                onClick={() => getSearchResults()}
                                className="btn btn-primary bg-primary w-100"
                              >
                                {" "}
                                <i className="ri-equalizer-fill me-1 align-bottom"></i>
                                Search
                              </button>
                            </div>
                            <div className="col-xxl-1 col-sm-3">
                              <button
                                type="button"
                                className="btn btn-danger bg-danger w-100"
                                onClick={() => handleClearSearch()}
                              >
                                {" "}
                                <i className="ri-filter-off-line me-1 align-bottom"></i>
                                Clear
                              </button>
                            </div>
                            <div className="col-xxl-2 col-sm-4">
                              <button
                                type="button"
                                className="btn  bg-info btn-info w-100"
                                name="button"
                                disabled={!checkedIds?.length}
                                onClick={() => handleZipInvoices()}
                              >
                                ZIP Proposals
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
                            className="table dt-responsive w-100"
                            id="example"
                          >
                            <thead className="table-light text-muted">
                              <tr>
                                <th></th>
                                <th>
                                  Proposal No
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("number", "id")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting("number", "id")
                                    }
                                  >
                                    ↓
                                  </span>
                                </th>
                                <th>
                                  Amount
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("number", "total")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting("number", "total")
                                    }
                                  >
                                    ↓
                                  </span>
                                </th>
                                <th>
                                  Total Tax
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("number", "total_tax")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting(
                                        "number",
                                        "total_tax"
                                      )
                                    }
                                  >
                                    ↓
                                  </span>
                                </th>
                                <th>
                                  Date
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("date", "date")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting("date", "date")
                                    }
                                  >
                                    ↓
                                  </span>
                                </th>
                                <th>
                                  Customer
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("string", "first_name")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting(
                                        "string",
                                        "first_name"
                                      )
                                    }
                                  >
                                    ↓
                                  </span>
                                </th>
                                <th>
                                  Date Send
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("date", "datesend")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting("date", "datesend")
                                    }
                                  >
                                    ↓
                                  </span>
                                </th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody className="list form-check-all">
                              {tableData?.data?.invoices?.data?.length > 0 &&
                                !loaderState &&
                                tableData?.data?.invoices?.data?.map(
                                  (row, ind) => (
                                    <tr key={ind}>
                                      <td>
                                        <div className="">
                                          <input
                                            className="form-check-input code-switcher"
                                            type="checkbox"
                                            checked={checkedIds.includes(
                                              row.id?.toString()
                                            )}
                                            onChange={() =>
                                              handleCheckboxChange(
                                                row.id?.toString()
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td
                                        className={`text-start ${
                                          type?.toLowerCase() != "paid"
                                            ? "cursor-pointer"
                                            : ""
                                        } text-primary`}
                                        onClick={() => {
                                          if (type?.toLowerCase() != "paid") {
                                            handleShowProposal(row?.id);
                                          }
                                        }}
                                      >
                                        {row?.prefix}-
                                        {row?.id?.toString().padStart(5, "0") +
                                          "/" +
                                          (new Date(row?.date).getMonth() + 1)
                                            ?.toString()
                                            ?.padStart(2, "0") +
                                          "/" +
                                          new Date(row?.date).getFullYear()}
                                      </td>
                                      <td className="text-start">
                                        {" "}
                                        ₹ {row?.total}
                                      </td>
                                      <td className="text-start">
                                        <span>₹ {row?.total_tax}</span>
                                      </td>
                                      <td className="text-start">
                                        <span className="badge badge-soft-info p-2 fs-13">
                                          {row?.date}
                                        </span>
                                      </td>
                                      <td className="text-start">
                                        <span className="badge badge-soft-primary p-2 fs-13 capitalize">
                                          {row?.customer?.first_name}{" "}
                                          {row?.customer?.last_name}
                                        </span>
                                      </td>
                                      <td className="text-start">
                                        {row?.datesend ? (
                                          <span className="badge bg-secondary p-1 fs-12">
                                            {new Date(
                                              row?.datesend
                                            ).toLocaleDateString(undefined, {
                                              day: "2-digit",
                                              month: "2-digit",
                                              year: "numeric",
                                            })}
                                          </span>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                      <td className="text-start">
                                        <span
                                          className={`badge border border-${
                                            row?.status == 0
                                              ? "primary"
                                              : row?.status == 1
                                              ? "info"
                                              : row?.status == 2
                                              ? "secondary"
                                              : row?.status == 3
                                              ? "success"
                                              : row?.status == 4
                                              ? "warning"
                                              : "danger"
                                          } text-${
                                            row?.status == 0
                                              ? "primary"
                                              : row?.status == 1
                                              ? "info"
                                              : row?.status == 2
                                              ? "secondary"
                                              : row?.status == 3
                                              ? "success"
                                              : row?.status == 4
                                              ? "warning"
                                              : "danger"
                                          } text-uppercase`}
                                        >
                                          {row?.status == 0
                                            ? "Pending"
                                            : row?.status == 1
                                            ? "Sent"
                                            : row?.status == 2
                                            ? "Opened"
                                            : row?.status == 3
                                            ? "Accepted"
                                            : row?.status == 4
                                            ? "Rejected"
                                            : "Expired"}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              {tableData?.data?.invoices?.data?.length == 0 && (
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
                          {loaderState && <Loader />}
                        </div>
                        <div className="flex justify-between">
                          <div className="">
                            <div
                              className="dataTables_info"
                              id="example_info"
                              role="status"
                              aria-live="polite"
                            >
                              Showing{" "}
                              {tableData?.data?.invoices?.from
                                ? tableData?.data?.invoices?.from
                                : 0}{" "}
                              to{" "}
                              {tableData?.data?.invoices?.to
                                ? tableData?.data?.invoices?.to
                                : 0}{" "}
                              of {tableData?.data?.invoices?.total} entries
                            </div>
                          </div>
                          <div className="">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="example_paginate"
                            >
                              <ul className="pagination">
                                {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.invoices?.prev_page_url == null
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
                        tableData?.data?.invoices?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                                {tableData?.data?.invoices?.total > 0 &&
                                  tableData?.data?.invoices?.links?.map(
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
                                              page?.label?.includes("Previous")
                                            ) {
                                              handlePrevious();
                                            } else if (
                                              page?.label?.includes("Next")
                                            ) {
                                              handleNext();
                                            } else {
                                              if (!page?.active) {
                                                handleCustomPage(
                                                  parseInt(page?.label)
                                                );
                                              }
                                            }
                                          }}
                                        ></button>
                                      </li>
                                    )
                                  )}

                                {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.invoices?.next_page_url != null
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
                        tableData?.data?.invoices?.next_page_url != null
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
                      </div>
                      {/* <!--end card-body--> */}
                    </div>
                  )}
                  {/* <!--end card--> */}
                </div>
              </div>
              {/* <!-- end row --> */}
              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                // id="createTask"
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
                            <Select
                              className="form-control"
                              options={[
                                { value: "Ringing", label: "Ringing" },
                                { value: "Postponed", label: "Postponed" },
                                {
                                  value: "Not Interested",
                                  label: "Not Interested",
                                },
                                { value: "Completed", label: "Completed" },
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
                              readOnly
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
                            readOnly
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
          <footer className="footer w-100">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {new Date().getFullYear()} © All Rights Reserved.
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end d-none d-sm-block">
                    Designed and Developed by Call Center Projects
                  </div>
                </div>
              </div>
              {showProposal && proposalId && (
                <ProposalModal
                  show={showProposal}
                  hide={hideinv}
                  proposalId={proposalId}
                />
              )}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
