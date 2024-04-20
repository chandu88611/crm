/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
// import TableLoader from "../TableLoader";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../reducers/loader";
import { useApproveDraftEnqMutation, useDraftEnqSearchMutation, useGetDraftEnqQuery, useLazyDraftEnqPaginationQuery } from "../../../services/api";
import {Table} from "react-bootstrap"
import { successAlert } from "../swAlert";
import Loader from "../Loader";
import { CircularProgress } from "@mui/material";

/* eslint-disable no-unused-vars */
export default function EnquiriesTable({ type, enquirySelected }) {
  const loaderState = useSelector((state) => state.loader?.value);
  const dispatch = useDispatch();
  const [checkedIds, setCheckedIds] = useState([]);
  const [toggledReqEnq, setToggleReqEnq] = useState(false);
  const [tableData, setTableData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

   const {
     data,
     isLoading: dEnqLoading,
     error: dError,
   } = useGetDraftEnqQuery();

  console.log(data)




  const [enqsSearch, { data: searchData, isLoading: searchLoading }] =
    useDraftEnqSearchMutation();

  const handleSearch = () => {
    dispatch(showLoader());
    
      setDebouncedSearchTerm(searchTerm, "searchTerm");
      console.log(searchTerm);
      if (searchTerm != "") {
        enqsSearch({ searchkey: searchTerm }).then((res) => {
          console.log(res, "searchTerm");
          setTableData(res?.data);
        });
      } else {
        setTableData(data);
      }
      dispatch(hideLoader());
    
  };

  const [
    nextPage,
    { data: pageData, isLoading: loading, error: paginationErr },
  ] = useLazyDraftEnqPaginationQuery();

  const city = watch("city");
  const state = watch("state");
  const staff = watch("staff");

  const handleCheckboxChange = (id) => {
    // Use a functional state update to ensure consistency
    setCheckedIds((prevCheckedIds) => {
      // Find the index of the ID in the array
      const index = prevCheckedIds.indexOf(id);

      // If the ID is found, remove it; otherwise, add it
      return index !== -1
        ? prevCheckedIds.slice(0, index).concat(prevCheckedIds.slice(index + 1))
        : [...prevCheckedIds, id];
    });
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleInputChange = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
  };

  const handleNext = () => {
    nextPage({
      no: tableData?.data?.enqs?.current_page + 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handlePrevious = () => {
    nextPage({
      no: tableData?.data?.enqs?.current_page - 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handleCustomPage = (pageNO) => {
    nextPage({
      no: pageNO,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handleTableSorting = (colType, fieldName) => {
    console.log(tableData);
    if (tableData?.data?.enqs?.data) {
      if (colType == "string") {
        const sortedData = [...tableData.data.enqs.data].sort((a, b) =>
          a[fieldName].localeCompare(b[fieldName])
        );

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            enqs: {
              ...tableData.data.enqs,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
      } else if (colType == "number") {
        const sortedData = [...tableData.data.enqs.data].sort(
          (a, b) => a[fieldName] - b[fieldName]
        );

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            enqs: {
              ...tableData.data.enqs,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
        console.log(sortedData, "sortedData");
      } else if (colType == "date") {
        const sortedData = [...tableData.data.enqs.data].sort((a, b) => {
          const dateA = new Date(a[fieldName]).getTime();
          const dateB = new Date(b[fieldName]).getTime();

          return dateA - dateB;
        });

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            enqs: {
              ...tableData.data.enqs,
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
    
    if (tableData?.data?.enqs?.data) {
      if (colType == "string") {
        const sortedData = [...tableData.data.enqs.data].sort((a, b) =>
          a[fieldName].localeCompare(b[fieldName])
        );
        sortedData.reverse();

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            enq: {
              ...tableData.data.enq,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
      } else if (colType == "number") {
        const sortedData = [...tableData.data.enq.data].sort(
          (a, b) => b[fieldName] - a[fieldName]
        );

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            enqs: {
              ...tableData.data.enqs,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
        console.log(sortedData, "sortedData");
      } else if (colType == "date") {
        const sortedData = [...tableData.data.enq.data].sort((a, b) => {
          const dateA = new Date(a[fieldName]).getTime();
          const dateB = new Date(b[fieldName]).getTime();

          return dateB - dateA;
        });

        // Create a new object with the sorted data
        const updatedTableData = {
          ...tableData,
          data: {
            ...tableData.data,
            enqs: {
              ...tableData.data.enqs,
              data: sortedData,
            },
          },
        };

        // Update the state with the new object
        setTableData(updatedTableData);
      }
    }
  };

  const [approveDraftEnqs, {data:responseData, isLoading:approveLoading, error}] = useApproveDraftEnqMutation()

  const handleApprove = async () => {
    try {
      dispatch(showLoader())
      const response = await approveDraftEnqs({})
      if (response?.data?.status) {
        successAlert(response?.data?.message)
      }
     } catch (err) { console.log(err) } finally {
      dispatch(hideLoader())
    }
  }

      const handleClearSearch = () => {
        setSearchTerm("");
        setTableData(data);
      };

  return (
    <>
      {searchLoading || (approveLoading && <Loader />)}
      <div className={`${type == "new" ? "card" : ""}`}>
        {type == "new" && (
          <div className="card-header border-0">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <h5 className="card-title mb-0 flex-grow-1">New Enquiries</h5>
              <div className="d-flex align-items-center gap-2">
                <Select
                  className=""
                  name="Select Staff"
                  placeholder="Select Staff"
                  {...register("staff", {
                    required: true,
                    message: "Staff is required",
                  })}
                  options={[
                    {
                      value: "Staff 1",
                      label: "Staff 1",
                    },
                    {
                      value: "Staff 2",
                      label: "Staff 2",
                    },
                    {
                      value: "Staff 3",
                      label: "Staff 3",
                    },
                    {
                      value: "Staff 4",
                      label: "Staff 4",
                    },
                    {
                      value: "Staff 5",
                      label: "Staff 5",
                    },
                  ]}
                />
                <button
                  className="btn btn-success flex items-center"
                  disabled={!checkedIds?.length || !staff}
                >
                  <i className="mdi mdi-account-plus-outline align-bottom me-1 fs-14"></i>
                  Assign
                </button>
              </div>
              <button
                id="requestEnqBtn"
                className="btn btn-primary bg-primary"
                onClick={() => setToggleReqEnq(!toggledReqEnq)}
              >
                <i className="mdi mdi-account-multiple-plus align-bottom me-1 fs-14"></i>
                Request Enquiries
              </button>
            </div>
            {toggledReqEnq && (
              <div
                className="col-6 col-md-3 col-lg-3 col-xxl-12 py-2  "
                id="requestEnqDiv"
              >
                <hr />
                <div className="d-flex flex-wrap gap-2 !mt-3">
                  <Select
                    className=""
                    name="Select State"
                    placeholder="Select State"
                    options={[
                      {
                        value: "State 1",
                        label: "State 1",
                      },
                      {
                        value: "State 2",
                        label: "State 2",
                      },
                      {
                        value: "State 3",
                        label: "State 3",
                      },
                      {
                        value: "State 4",
                        label: "State 4",
                      },
                      {
                        value: "State 5",
                        label: "State 5",
                      },
                    ]}
                    {...register("state", {
                      required: true,
                      message: "state is required",
                    })}
                    onChange={(value) => {
                      setValue("state", value);
                      trigger("state");
                    }}
                  />
                  <Select
                    className=""
                    name="Select City"
                    placeholder="Select City"
                    options={[
                      {
                        value: "City 1",
                        label: "City 1",
                      },
                      {
                        value: "City 2",
                        label: "City 2",
                      },
                      {
                        value: "City 3",
                        label: "City 3",
                      },
                      {
                        value: "City 4",
                        label: "City 4",
                      },
                      {
                        value: "City 5",
                        label: "City 5",
                      },
                    ]}
                    {...register("city", {
                      required: true,
                      message: "city is required",
                    })}
                    onChange={(value) => {
                      setValue("city", value);
                      trigger("city");
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary bg-primary"
                    // onClick={() => handleRequest()}
                    disabled={!city || !state}
                  >
                    Submit
                  </button>
                  {/* {<button
                    disabled
                    type="button"
                    className="btn btn-outline-primary btn-load"
                  >
                    <span className="d-flex align-items-center">
                      <span className="flex-grow-1 me-2">Please Wait...</span>
                      <span
                        className="spinner-border flex-shrink-0"
                        role="status"
                      >
                        <span className="visually-hidden">Please Wait...</span>
                      </span>
                    </span>
                  </button>} */}
                </div>
              </div>
            )}
          </div>
        )}

        {type == "new" && (
          <div className="card-body border border-dashed border-end-0 border-start-0">
            {/* <form> */}
            <div className="row g-3">
              <div className="col-xxl-10 col-sm-12">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search bg-light border-light"
                    placeholder="Search "
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  {/* <i className="ri-search-line search-icon"></i> */}
                </div>
              </div>

              {/* <!--end col--> */}
              {/* <div className="col-xxl-2 col-sm-4">
                  <button
                    type="button"
                    className="btn btn-primary bg-primary w-100"
                  >
                    <i className="ri-equalizer-fill me-1 align-bottom"></i>
                    Search
                  </button>
                </div> */}
              {/* <!--end col--> */}
            </div>
            {/* <!--end row--> */}
            {/* </form> */}
          </div>
        )}

        <div
          className={` table-responsive table-card ${
            type == "new" ? "my-2 mx-1 card-body" : ""
          } `}
        >
          {type == "upload" && (
            <div className="card-body border border-dashed border-end-0 border-start-0">
              <form>
                <div className="row g-3">
                  <div className="col-xxl-6 col-sm-12">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search bg-light border-light"
                        placeholder="Search "
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      {/* <i className="ri-search-line search-icon"></i> */}
                    </div>
                  </div>
                  {/* <!--end col--> */}
                  <div className="col-xxl-3 col-sm-4">
                    <button
                      type="button"
                      className="btn btn-primary bg-primary w-100 whitespace-nowrap"
                      onClick={() => handleSearch()}
                    >
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>
                      Search
                    </button>
                  </div>
                  <div className="col-xxl-1 col-sm-4">
                    <button
                      type="button"
                      className="btn btn-danger bg-danger w-100"
                      onClick={() => handleClearSearch()}
                    >
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>
                      Clear
                    </button>
                  </div>
                  <div className="col-xxl-2 col-sm-4">
                    <button
                      type="button"
                      disabled={!tableData?.data?.enqs?.data?.length||approveLoading}
                      className="btn btn-secondary bg-secondary w-100"
                      onClick={() => handleApprove()}
          
                    >
                      <i className="ri-check-double-line me-1 align-bottom"></i>
                      {approveLoading?<CircularProgress size={20} className="text-white"/>:"Approve"}
                    </button>
                  </div>

                  {/* <!--end col--> */}
                </div>
                {/* <!--end row--> */}
              </form>
            </div>
          )}
          <Table
            responsive={true}
            striped
            className="table dt-responsive w-100 !px-2"
            id="example"
          >
            <thead className="table-light text-muted">
              <tr>
                {type != "upload" && <th scope="col" className="w-[40px]"></th>}
                <th className="text-center">SL No</th>
                <th>
                  Name
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableSorting("string", "name")}
                  >
                    ↑
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableDescSorting("string", "name")}
                  >
                    ↓
                  </span>
                </th>
                <th>
                  Phone
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableSorting("number", "phone")}
                  >
                    ↑
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableDescSorting("number", "phone")}
                  >
                    ↓
                  </span>
                </th>
                <th>
                  City
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableSorting("string", "city")}
                  >
                    ↑
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableDescSorting("string", "city")}
                  >
                    ↓
                  </span>
                </th>
                <th>
                  State
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableSorting("string", "state")}
                  >
                    ↑
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableDescSorting("string", "state")}
                  >
                    ↓
                  </span>
                </th>
                <th>
                  Source
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableSorting("string", "source")}
                  >
                    ↑
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableDescSorting("string", "source")}
                  >
                    ↓
                  </span>
                </th>
                <th>IP</th>
                <th>
                  Created Date
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableSorting("date", "created_at")}
                  >
                    ↑
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleTableDescSorting("date", "created_at")}
                  >
                    ↓
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="list form-check-all ">
              {loaderState && <Loader />}
              {tableData?.data?.enqs?.data?.length > 0 &&
                tableData?.data?.enqs?.data?.map((enq, ind) => (
                  <tr
                    key={ind}
                    className=" cursor-pointer "
                    onClick={() => {
                      enquirySelected(enq);
                    }}
                  >
                    <td className="!ml-2 text-center">{ind + 1}</td>
                    {type != "upload" && (
                      <th scope="row">
                        <div className="">
                          <input
                            className="form-check-input code-switcher"
                            type="checkbox"
                            checked={checkedIds.includes(enq.id?.toString())}
                            onChange={() =>
                              handleCheckboxChange(enq.id?.toString())
                            }
                          />
                        </div>
                      </th>
                    )}
                    <td>
                      <a className="fw-medium link-primary fs-16 capitalize">
                        {enq?.name}
                      </a>
                      <p className="mb-0">{enq?.email}</p>
                    </td>
                    <td>{enq?.phone}</td>
                    <td>{enq?.city}</td>
                    <td>{enq?.state}</td>
                    <td>
                      <span className="badge badge-soft-info badge-border fs-12">
                        {enq?.domain?enq?.domain:"NA"}
                      </span>
                    </td>
                    <td>
                      <span>{enq?.ip_address}</span>
                    </td>
                    <td>
                      <span className="badge badge-soft-secondary p-2 fs-12">
                        {new Date(enq?.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              {tableData?.data?.enqs?.data?.length == 0 && (
                <tr>
                  <td colSpan={type == "new" ? 8 : 8}>
                    <p className="text-center w-full text-lg">No data found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="flex justify-between">
            <div className="">
              <div
                className="dataTables_info"
                id="example_info"
                role="status"
                aria-live="polite"
              >
                Showing{" "}
                {tableData?.data?.enqs?.from ? tableData?.data?.enqs?.from : 0}{" "}
                to {tableData?.data?.enqs?.to ? tableData?.data?.enqs?.to : 0}{" "}
                of {tableData?.data?.enqs?.total} entries
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
                      tableData?.data?.enqs?.prev_page_url == null
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
                        tableData?.data?.enqs?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                  {tableData?.data?.enqs?.total >0 && tableData?.data?.enqs?.links?.map(
                    (page, ind) => (
                      <li
                        className={`paginate_button page-item  ${
                          page?.active ? "active" : ""
                        } `}
                        key={ind}
                      >
                        <button
                          className="page-link"
                          dangerouslySetInnerHTML={{ __html: page?.label }}
                          disabled={page?.url == null}
                          onClick={() => {
                            if (page?.label?.includes("Previous")) {
                              handlePrevious();
                            } else if (page?.label?.includes("Next")) {
                              handleNext();
                            } else {
                              if (!page?.active) {
                                handleCustomPage(parseInt(page?.label));
                              }
                            }
                          }}
                        ></button>
                      </li>
                    )
                  )}

                  {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enqs?.next_page_url != null
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
                        tableData?.data?.enqs?.next_page_url != null
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
          {/* <!--end table--> */}
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
                We&apos;ve searched more than 200k+ tasks We did not find any
                tasks for you search.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
