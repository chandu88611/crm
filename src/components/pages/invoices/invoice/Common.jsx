/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Header from "../../Header";
import "../../../assets/invoices.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { hideLoader, showLoader } from "../../../../reducers/loader";
import Loader from "../../Loader";
import InvoiceModal from "./InvoiceModal";
import { useGetAllInvoicesQuery, useLazyInvoicesPaginationQuery, useSearchInvoiceMutation } from "../../../../services/api";

export default function CommonInvoice({ type }) {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invId, setInvId] = useState();

  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
 const [checkedIds, setCheckedIds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [invTerm, setInvTerm] = useState("");


  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const {
    data: invoiceData,
    isLoading,
    error,
  } = useGetAllInvoicesQuery(type?.toLowerCase());
  console.log(invoiceData, error);

  const handleShowInvoice = (id) => {
    setInvId(id);
    setShowInvoice(true);
  };

  const hideinv = () => {
    setShowInvoice(false);
  };

  const [invoiceSearch, { data, isLoading: searchLoading }] =
    useSearchInvoiceMutation();

  const getSearRchesults = () => {
  dispatch(showLoader());
      setDebouncedSearchTerm(searchTerm, "searchTerm");
      console.log(searchTerm);
      if (searchTerm != "" || invTerm) {
        invoiceSearch({
          searchkey: searchTerm,
          invoice_no: invTerm,
          status: type?.toLowerCase(),
        }).then((res) => {
          console.log(res, "searchTerm");
          setTableData(res?.data);
        });
      } else {
        setTableData(invoiceData);
      }
      dispatch(hideLoader());
  }
  
  const handleClearSearch = () => {
    setSearchTerm("")
    setInvTerm("");
    setTableData(invoiceData)
  }

  // Handler for input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInvSearch = (event) => {
    setInvTerm(event.target.value);
  };

  useEffect(() => {
    setTableData(invoiceData);
  }, [invoiceData]);

  const [
    nextPage,
    { data: pageData, isLoading: loading, error: paginationErr },
  ] = useLazyInvoicesPaginationQuery();

  console.log(pageData, loading, paginationErr);

  const handleNext = () => {
    nextPage({
      type: type?.toLowerCase(),
      no: tableData?.data?.invoices?.current_page + 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handlePrevious = () => {
    nextPage({
      type: type?.toLowerCase(),
      no: tableData?.data?.invoices?.current_page - 1,
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
          const sortedData = [...tableData.data.invoices.data.customer].sort((a, b) =>
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
      console.log(typeof checkedIds, "type");
      const response = await axios.get(
        `https://skycontroller.connetz.shop/tl-api/invoices/zip-invoice?invoice_ids=${checkedIds}`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/zip",
            Authorization: "Bearer " + localStorage.getItem("clt_token"),
          },
        }
      );
      if (response?.status) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(response, url, new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.zip"); //or any other extension
        document.body.appendChild(link);
        link.click();
      }
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
                      {type} Invoices
                    </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Invoices</a>
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
                <div className="col-lg-3 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/paid-invoices";
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
                            Paid Invoices
                          </p>
                          <h4 className="mb-2 h4 flex gap-1">
                            ₹{" "}
                            <span
                              className="counter-value"
                              data-target={
                                invoiceData?.data?.counts?.paid_total
                              }
                            >
                              {invoiceData?.data?.counts?.paid_total}
                            </span>
                          </h4>
                          <h6 className="text-success mb-0 h6">
                            <span
                              className="counter-value"
                              data-target={
                                invoiceData?.data?.counts?.paid_count
                              }
                            >
                              {invoiceData?.data?.counts?.paid_count}
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/due-invoices";
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                            <i className="mdi mdi-file-document-multiple-outline align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Due Invoices
                          </p>
                          <h4 className="mb-2 h4 flex gap-1">
                            ₹{" "}
                            <span
                              className="counter-value"
                              data-target={invoiceData?.data?.counts?.due_total}
                            >
                              {invoiceData?.data?.counts?.due_total}
                            </span>
                          </h4>
                          <h6 className="text-warning mb-0 h6">
                            <span
                              className="counter-value"
                              data-target={invoiceData?.data?.counts?.due_count}
                            >
                              {invoiceData?.data?.counts?.due_count}
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/unpaid-invoices";
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
                            Unpaid Invoices
                          </p>
                          <h4 className="mb-2 h4 flex gap-1">
                            ₹
                            <span
                              className="counter-value"
                              data-target={
                                invoiceData?.data?.counts?.unpaid_total
                              }
                            >
                              {invoiceData?.data?.counts?.unpaid_total}
                            </span>
                          </h4>
                          <h6 className="text-danger mb-0 h6">
                            <span
                              className="counter-value"
                              data-target={
                                invoiceData?.data?.counts?.unpaid_count
                              }
                            >
                              {invoiceData?.data?.counts?.unpaid_count}
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div
                    className="card hover:scale-105 transition-all delay-100 ease-in-out cursor-pointer"
                    onClick={() => {
                      window.location.href = "/partially-paid-invoices";
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
                            Partially Paid
                          </p>
                          <h4 className="mb-2 h4 flex gap-1">
                            ₹{" "}
                            <span
                              className="counter-value"
                              data-target={
                                invoiceData?.data?.counts?.partially_paid_total
                              }
                            >
                              {invoiceData?.data?.counts?.partially_paid_total}
                            </span>
                          </h4>
                          <h6 className="text-warning mb-0 h6">
                            <span
                              className="counter-value"
                              data-target={
                                invoiceData?.data?.counts?.partially_paid_count
                              }
                            >
                              {invoiceData?.data?.counts?.partially_paid_count}
                            </span>{" "}
                            Invoices
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
                  {!showCreateInvoice && (
                    <div className="card" id="tasksList">
                      <div className="card-header border-0">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1 capitalize h5">
                            {type} Invoices{" "}
                            <span className="text-primary">
                              ({tableData?.data?.invoices?.total})
                            </span>{" "}
                          </h5>
                          {type == "all" && (
                            <button
                              className="btn btn-info bg-info btn-sm"
                              id="showCreateInvoice"
                              onClick={() => setShowCreateInvoice(true)}
                            >
                              <i className="ri-add-line align-bottom"></i>{" "}
                              Create Invoice{" "}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="card-body border border-dashed border-end-0 border-start-0">
                        <form>
                          <div className="row g-3">
                            <div className="col-xxl-3 col-sm-12">
                              <div className="search-box">
                                <input
                                  type="text"
                                  value={searchTerm}
                                  onChange={handleInputChange}
                                  className="form-control search bg-light border-light"
                                  placeholder="Search by customer name, email, phone or company"
                                />
                              </div>
                            </div>

                            <div className="col-xxl-4 col-sm-12">
                              <div className="search-box">
                                <input
                                  type="text"
                                  value={invTerm}
                                  onChange={handleInvSearch}
                                  className="form-control search bg-light border-light"
                                  placeholder="Search by Invoice No"
                                />
                              </div>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-xxl-2 col-sm-4">
                              <button
                                type="button"
                                className="btn btn-primary bg-primary w-100"
                                onClick={() => getSearRchesults()}
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
                                ZIP INVOICES
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
                                  Invoice No.
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
                                  Due Date
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableSorting("date", "duedate")
                                    }
                                  >
                                    ↑
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleTableDescSorting("date", "duedate")
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
                                        className={`text-start 
                                          cursor-pointer text-primary`}
                                        onClick={() => {
                                          handleShowInvoice(row?.id);
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
                                          {row?.customer?.first_name+" "} 
                                          {row?.customer?.last_name}
                                        </span>
                                      </td>
                                      <td className="text-start">
                                        <span className="badge bg-secondary p-1 fs-12">
                                          {row?.duedate}
                                        </span>
                                      </td>
                                      <td className="text-start">
                                        <span
                                          className={`badge border border-${
                                            row?.status == 1
                                              ? "primary"
                                              : row?.status == 2
                                              ? "success"
                                              : row?.status == 3
                                              ? "secondary"
                                              : row?.status == 4
                                              ? "warning"
                                              : "danger"
                                          } text-${
                                            row?.status == 1
                                              ? "primary"
                                              : row?.status == 2
                                              ? "success"
                                              : row?.status == 3
                                              ? "secondary"
                                              : row?.status == 4
                                              ? "warning"
                                              : "danger"
                                          } text-uppercase`}
                                        >
                                          {row?.status == 1
                                            ? "Unpaid"
                                            : row?.status == 2
                                            ? "Paid"
                                            : row?.status == 3
                                            ? "Partially Paid"
                                            : row?.status == 4
                                            ? "Overdue"
                                            : "Cancelled"}
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
                          {/* <!--end table--> */}
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
            </div>
          </footer>
        </div>
        {showInvoice && invId && (
          <InvoiceModal show={showInvoice} hide={hideinv} invId={invId} />
        )}
      </div>
    </>
  );
}
