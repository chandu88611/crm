import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { startLoading, stopLoading } from "../../../redux/slices/loaderSlice";
// import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Avatar, Switch, Tooltip, tooltipClasses } from "@mui/material";
import { Modal } from "react-bootstrap";

// import {
//   useSetStaffStatusMutation,
//   useTerminatestaffMutation,
// } from "../../../redux/services/bdo";

import Swal from "sweetalert2";
import styled from "@emotion/styled";
import {
  useDeleteStaffMutation,
  useInactivateStaffMutation,
  useLazyStaffsViewQuery,
  useStaffListQuery,
  useTerminateStaffMutation,
  useUpdateStaffIpAuthMutation,
  useUpdateStaffStatusMutation,
} from "../../../services/api";
import AddStaffForm from "./AddStaffForm";
import { toast } from "react-toastify";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "rgba(255, 255, 255, 0.87)",
    "& .MuiTooltip-arrow": {
      color: "black",
    },
    fontSize: 11,
  },
}));
function List() {
  const navigate = useNavigate();
  const [addStaff, setAddStaff] = useState(false);
  const [swalProps, setSwalProps] = useState({});
  const location = useLocation();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [page, setPage] = useState(1);
  const [backup, setbackup] = useState();
  const [searchinPut, setSearchInput] = useState("");
  const [pro, setPro] = useState(false);
  const { data, refetch } = useStaffListQuery({
    type: location.pathname.split("/")[2],
  });
  const [terminateStaff] = useTerminateStaffMutation();
  const [enquiries, setNewEnquiries] = useState();
  const [viewStaff, { data: staffData }] = useLazyStaffsViewQuery();
  const [staff12, setStaff12] = useState(staffData);
  const [deleteStaff, { loading }] = useDeleteStaffMutation();
  const [updateIp] = useUpdateStaffIpAuthMutation();
  const [updateStatus] = useUpdateStaffStatusMutation();
  const [inactivate] = useInactivateStaffMutation();
  const [staffData1, setStaffData1] = useState();
  useEffect(() => {
    if (staffData) {
      setStaff12(staffData);
    }
  }, [staffData]);
  useEffect(() => {
    setNewEnquiries(data?.data?.staffs);
    setbackup(data?.data?.staffs);
  }, [data]);

  const dispatch = useDispatch();
  useEffect(() => {
    refetch();
    setStaff12();
  }, [location?.pathname]);

  useEffect(() => {
    if (!searchinPut || searchinPut.trim() === "") {
      setNewEnquiries(backup);
      return;
    }

    const filteredEnquiries = backup?.filter((enquiry) => {
      for (let key in enquiry) {
        if (
          enquiry[key]
            ?.toString()
            ?.toLowerCase()
            .includes(searchinPut.trim().toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });

    setNewEnquiries(filteredEnquiries);
  }, [searchinPut, backup]);
  const [proposalIds, setProposalIds] = useState([]);
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(
    startPage + 4,
    enquiries?.paginate?.links?.length - 1
  );
  const combinedString = `${staffData?.staff?.city}, ${staffData?.staff?.state}, ${staffData?.staff?.country}`;
  const displayedString =
    combinedString.length > 19 ? combinedString.slice(0, 19) : combinedString;
  return (
    <div className="page-content md:ml-5">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">
                {" "}
                {location?.pathname?.split("/")[2]} Staffs List
              </h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Staffs</a>
                  </li>
                  <li className="breadcrumb-item active capitalize">
                    {location?.pathname?.split("/")[2]}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row h-100">
          <div className="col-lg-3 col-md-6">
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                      <i className="mdi mdi-phone-incoming-outline align-middle" />
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      {" "}
                      Inbound Calls
                    </p>
                    <h4 className="mb-2 text-lg">
                      {data?.data?.counts?.total_incount}
                    </h4>
                    <h6 className="text-muted mb-0">
                      <span className="counter-value">
                        <CountUp
                          end={data?.data?.counts?.total_count}
                          duration={1}
                        />
                      </span>{" "}
                      Calls
                    </h6>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className="badge bg-success-subtle text-success">
                      <i className="ri-arrow-up-s-fill align-middle me-1" />
                      {data?.data?.counts?.incount_per
                        ? parseFloat(data?.data?.counts?.incount_per)?.toFixed(
                            2
                          )
                        : data?.data?.counts?.incount_per}{" "}
                      %<span></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-light text-success rounded-circle fs-3">
                      <i className="mdi mdi-phone-outgoing-outline align-middle" />
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Outbound Calls
                    </p>
                    <h4 className="mb-2 text-lg">
                      {data?.data?.counts?.total_outcount}
                    </h4>
                    <h6 className="text-muted mb-0">
                      <span className="counter-value">
                        <CountUp
                          end={data?.data?.counts?.total_count}
                          duration={1}
                        />
                      </span>{" "}
                      Calls
                    </h6>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className="badge bg-success-subtle text-success">
                      <i className="ri-arrow-up-s-fill align-middle me-1" />
                      {data?.data?.counts?.outcount_per
                        ? parseFloat(data?.data?.counts?.outcount_per)?.toFixed(
                            2
                          )
                        : data?.data?.counts?.outcount_per}{" "}
                      %<span></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-light text-danger rounded-circle fs-3">
                      <i className="mdi mdi-phone-missed-outline align-middle" />
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Inbound Missed Calls
                    </p>
                    <h4 className="mb-2 text-lg">
                      {data?.data?.counts?.total_inmissed}
                    </h4>
                    <h6 className="text-muted mb-0">
                      <span className="counter-value">
                        <CountUp
                          end={data?.data?.counts?.total_count}
                          duration={1}
                        />
                      </span>{" "}
                      Calls
                    </h6>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className="badge bg-danger-subtle text-success">
                      <i className="ri-arrow-up-s-fill align-middle me-1" />
                      {data?.data?.counts?.inmissed_per
                        ? parseFloat(data?.data?.counts?.inmissed_per)?.toFixed(
                            2
                          )
                        : data?.data?.counts?.inmissed_per}{" "}
                      %<span></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-light text-warning rounded-circle fs-3">
                      <i className="mdi mdi-phone-missed-outline align-middle" />
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Outbound Missed Calls
                    </p>
                    <h4 className="mb-2 text-lg">
                      {data?.data?.counts?.total_outmissed}
                    </h4>
                    <h6 className="text-muted mb-0">
                      <span className="counter-value">
                        <CountUp
                          end={data?.data?.counts?.total_count}
                          duration={1}
                        />
                      </span>{" "}
                      Calls
                    </h6>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className="badge bg-danger-subtle text-success">
                      <i className="ri-arrow-up-s-fill align-middle me-1" />
                      {data?.data?.counts?.inmissed_per
                        ? parseFloat(
                            data?.data?.counts?.outmissed_per
                          )?.toFixed(2)
                        : data?.data?.counts?.outmissed_per}{" "}
                      %<span />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className={`${
              staff12?.staff?.id != undefined ? "col-lg-9 " : "col-12"
            }`}
          >
            <div className="card" id="tasksList">
              <div className="card-header border-0">
                <div className="flex align-items-center gap-2">
                  <h5 className="card-title mb-0 flex-grow-1 capitalize">
                    {location?.pathname?.split("/")[2]} Staffs List
                  </h5>
                  {location?.pathname?.split("/")[2] == "active" && (
                    <span
                      className="btn btn-warning btn-sm fs-12 py-1"
                      onClick={() => {
                        if (proposalIds?.length <= 0) {
                          toast.warn("Select at least one Staff");
                        } else {
                          Swal.fire({
                            title: `This Process Can't be Undone`,
                            icon: "info", // Use the icon you want for inactive state
                            showCancelButton: true,
                            confirmButtonText: "Inactivate",

                            cancelButtonText: "Close",
                            onClose: () => {
                              +setSwalProps({
                                show: false,
                                title: "",
                                text: "",
                              });
                            },
                            preConfirm: async () => {
                              const res = await inactivate({
                                staff_ids: proposalIds,
                              });
                              if (res?.data?.status) {
                                setProposalIds([]);
                                refetch();
                                navigate(`/staff/inactive`);
                              }
                            },
                            //  async () => {
                            //   const res = await changeStatus({
                            //     bdo_ids: proposalIds,
                            //     type:
                            //       location?.pathname?.split("/")[3] == "active"
                            //         ? "inactive"
                            //         : "active",
                            //   });
                            //   if (res?.data?.status) {
                            //     await Swal.fire({
                            //       title: res?.data?.message,
                            //       icon: "success",
                            //     });
                            //     await searchFunction(true);

                            //     Swal.close();
                            //   }
                            // },
                          });
                        }
                      }}
                    >
                      Inactivate
                    </span>
                  )}
                  {location.pathname.split("/")[2] != "terminated" && (
                    // (location?.pathname?.split("/")[2] == "active")&&
                    <span
                      className="btn btn-danger btn-sm fs-12 py-1"
                      onClick={() => {
                        if (proposalIds?.length <= 0) {
                          toast.warn("Select at least one Staff");
                        } else {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You will not be able to recover this staff members!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Terminate",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const res = await terminateStaff({
                                staff_ids: proposalIds,
                              });
                              if (res?.data?.status) {
                                refetch();
                                setProposalIds([]);
                                Swal.fire(
                                  "Deleted!",
                                  "Staff members has been Terminated.",
                                  "success"
                                ).then(async (result) => {
                                  if (result.isConfirmed) {
                                    window.location.reload();
                                  }
                                });
                              } else {
                                Swal.fire(
                                  "Error!",
                                  "Failed to terminate staff members.",
                                  "error"
                                );
                              }
                            }
                          });
                        }
                      }}
                    >
                      Terminate
                    </span>
                  )}
                </div>
              </div>
              <div className="card-body border border-dashed border-end-0 border-start-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!searchinPut || searchinPut.trim() === "") {
                      setNewEnquiries(backup);
                      toast.warn("Enter Something to search");
                      return;
                    }
                    searchFunction();
                  }}
                >
                  <div className="row g-3">
                    <div className="col-xxl-10 col-sm-12">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control   bg-light border-light "
                          placeholder="Search"
                          onChange={(e) => {
                            setSearchInput(e.target.value);
                          }}
                        />
                        {/* <i className="ri-search-line search-icon" /> */}
                      </div>
                    </div>

                    <div className="col-xxl-2 col-sm-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 h-full bg-[#687cfe]"
                      >
                        {" "}
                        <i className="ri-equalizer-fill me-1 align-bottom" />
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="card-body">
                <div className="table-responsive table-card mb-4">
                  <table className="table dt-responsive w-100" id="example">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col" style={{ width: 40 }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkAll"
                              defaultValue="option"
                              checked={
                                enquiries?.every((data) =>
                                  proposalIds.includes(data.id)
                                ) && enquiries?.length > 0
                              }
                              onClick={() => {
                                const allIdsInProposal = enquiries?.every(
                                  (data) => proposalIds.includes(data.id)
                                );
                                if (allIdsInProposal) {
                                  setProposalIds([]);
                                } else {
                                  setProposalIds(
                                    enquiries?.map((data) => data.id)
                                  );
                                }
                              }}
                            />
                          </div>
                        </th>
                        <th>Ext No.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Enquiry Limit</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {enquiries?.length > 0 &&
                        enquiries?.map((data1, i) => (
                          <tr key={i + "invoiceData"}>
                            <th scope="row">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  defaultValue="option1"
                                  checked={proposalIds?.includes(data1?.id)}
                                  onClick={() => {
                                    if (proposalIds?.includes(data1?.id)) {
                                      setProposalIds(
                                        proposalIds?.filter(
                                          (id) => id != data1?.id
                                        )
                                      );
                                    } else {
                                      setProposalIds((prev) => [
                                        ...prev,
                                        data1?.id,
                                      ]);
                                    }
                                  }}
                                />
                              </div>
                            </th>
                            <td>
                              <a
                                className="fw-medium link-primary cursor-pointer"
                                onClick={() => setSelectedCustomer(data1)}
                              >
                                {data1?.extension?.ext_number
                                  ? data1?.extension?.ext_number
                                  : "NA"}
                              </a>
                            </td>
                            <td
                              onClick={async () => {
                                const res = await viewStaff({ id: data1?.id });

                                setStaff12(res?.data);
                              }}
                              className="flex   flex-col justify-center"
                            >
                              <div className="-mb-5 mt-1">
                                <a className="fw-medium link-primary fs-16 cursor-pointer capitalize">
                                  {data1?.name}
                                </a>
                                <p> {data1?.email}</p>
                              </div>
                              <td></td>
                            </td>
                            {/* <td>
                              <p className="fw-medium link-primary fs-16 cursor-pointer">
                                {data1?.email}
                              </p>
                            </td> */}
                            <td>
                              <span> {data1?.phone}</span>
                            </td>
                            <td>
                              <span className="badge badge-soft-info p-2 fs-12">
                                {data1?.enq_limit}
                              </span>
                            </td>
                            <td>
                              {data1?.status == 2 && (
                                <span className="badge badge-soft-danger p-2 fs-12">
                                  Terminated
                                </span>
                              )}
                              {data1?.status == 1 && (
                                <span className="badge badge-soft-success p-2 fs-12">
                                  Active
                                </span>
                              )}
                              {data1?.status == 0 && (
                                <span className="badge badge-soft-warning p-2 fs-12">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              <span className="badge badge-soft-secondary p-2 fs-12">
                                {moment(data1?.created_at).format(
                                  "DD MMM YYYY"
                                )}
                              </span>
                            </td>
                            <td>
                              {data1?.status != 2 && (
                                <Link
                                  className="btn btn-primary btn-sm fs-12 py-1"
                                  // onClick={() => {
                                  //   setStaffData1(data1);
                                  // }}
                                  to={`/edit-staff/${data1?.id}`}
                                >
                                  Edit
                                </Link>
                              )}
                              {location.pathname.split("/")[2] ==
                                "terminated" && (
                                <span
                                  className="btn btn-danger btn-sm fs-12 py-1 ml-1"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You will not be able to recover this staff member!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#d33",
                                      cancelButtonColor: "#3085d6",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        const res = await deleteStaff({
                                          staff_id: data1.id,
                                        });
                                        if (res?.data?.status) {
                                          setStaffData1();
                                          refetch();
                                          Swal.fire(
                                            "Deleted!",
                                            "Staff member has been deleted.",
                                            "success"
                                          );
                                        } else {
                                          Swal.fire(
                                            "Error!",
                                            "Failed to delete staff member.",
                                            "error"
                                          );
                                        }
                                      }
                                    });
                                  }}
                                  //  onClick={async()=>{
                                  //   const res =await deleteStaff({
                                  //     staff_id:data1.id
                                  //   })
                                  //   if(res?.data?.status){
                                  //     refetch()
                                  //   }
                                  //  }}
                                >
                                  Delete
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {!enquiries?.length > 0 && (
                    <div className="w-full whitespace-nowrap p-2 text-primary  bg-[#f1f1f1] text-muted text-lg text-center shadow-sm ">
                      No Data Found
                    </div>
                  )}
                  {/* <ul className="pagination pagination-separated pagination-sm mb-0">
              {enquiries?.paginate?.data?.length>0&&enquiries?.paginate?.links?.map((link,i)=>(

                      <li className={`page-item ${link?.url==null?"disabled":"cursor-pointer "} ${link?.active&&"active"}`} key={i+"paginate"} onClick={()=>{  
                       
    setPage(link.url.split("page=")[1])

                        }}>
                        <a className="page-link" dangerouslySetInnerHTML={{__html:link.label}}/>
                          
                      </li>
              ))}

           
                      
                      
                    </ul> */}

                  {enquiries?.data?.extensions?.length > 0 && (
                    <div className="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                      <div className="flex-shrink-0">
                        <div className="text-muted">
                          Showing{" "}
                          <span className="fw-semibold">
                            {enquiries?.data?.extensions?.length}
                          </span>{" "}
                          of
                          <span className="fw-semibold">
                            {" "}
                            {enquiries?.paginate?.total}{" "}
                          </span>{" "}
                          Results
                        </div>
                      </div>
                      <ul className="pagination pagination-separated pagination-sm mb-0">
                        {enquiries?.paginate?.links?.map((link, i) => (
                          <React.Fragment key={i + "paginate"}>
                            {i === 0 && (
                              <>
                                <li
                                  className={`page-item ${
                                    link?.url == null
                                      ? "disabled"
                                      : "cursor-pointer "
                                  } ${link?.active && "active"}`}
                                  key={i + "paginate"}
                                  onClick={() => {
                                    setPage(link.url.split("page=")[1]);
                                  }}
                                >
                                  <a
                                    className="page-link"
                                    dangerouslySetInnerHTML={{
                                      __html: link.label,
                                    }}
                                  />
                                </li>

                                {page >= 4 && (
                                  <li className="page-item disabled">
                                    <span className="page-link">. . .</span>
                                  </li>
                                )}
                              </>
                            )}

                            {i >= startPage && i < endPage && (
                              <li
                                className={`page-item ${
                                  link?.url == null
                                    ? "disabled"
                                    : "cursor-pointer "
                                } ${link?.active && "active"}`}
                                key={i + "paginate"}
                                onClick={() => {
                                  setPage(link.url.split("page=")[1]);
                                }}
                              >
                                <a
                                  className="page-link"
                                  dangerouslySetInnerHTML={{
                                    __html: link.label,
                                  }}
                                />
                              </li>
                            )}

                            {i === enquiries.paginate.links.length - 1 && (
                              <>
                                {enquiries.paginate.links.length - 1 >
                                  endPage && (
                                  <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                  </li>
                                )}
                                <li
                                  className={`page-item ${
                                    link?.url == null
                                      ? "disabled"
                                      : "cursor-pointer "
                                  } ${link?.active && "active"}`}
                                  key={i + "paginate"}
                                  onClick={() => {
                                    setPage(link.url.split("page=")[1]);
                                  }}
                                >
                                  <a
                                    className="page-link"
                                    dangerouslySetInnerHTML={{
                                      __html: link.label,
                                    }}
                                  />
                                </li>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* {staffData?.staff?.id&&
          <div className="card  col-lg-3 pulse">
            <div className="card-body text-center">
              <div className="placeholder-glow fs-14">
                { (
                  <Avatar className=" mx-auto col-12 !w-[80px] !h-[80px]">
                    {" "}
                    {staffData?.staff?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                )}
              </div>
              <a href="#">
                <h5 className="card-text placeholder-glow mt-1 mb-1 uppercase">
                  {staffData?.staff?.name ? (
                    staffData?.staff?.name
                  ) : (
                    <>
                      <span className="placeholder col-4" />
                      <span className="placeholder col-2" />
                    </>
                  )}
                </h5>
              </a>
              <div
                className="card-body pb-2 "
                data-simplebar=""
                style={{ maxHeight: 815 }}
              >
              
                  <ul className="list-group list-group-flush border-dashed ">
                    <li className="list-group-item px-0">
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                            <i className="mdi mdi-phone-outline" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2 text-start">
                          <h6 className="mt-2">Phone No:</h6>
                        </div>
                        <div className="flex-shrink-0 text-end">
                          <h6 className="mt-2 placeholder-glow">
                            {staffData?.staff?.phone}
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                            <i className="mdi mdi-email-outline" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2 text-start">
                          <h6 className="mt-2">Email ID:</h6>
                        </div>
                        <div className="flex-shrink-0 text-end">
                          <h6 className="mt-2 placeholder-glow">
                            {staffData?.staff?.email?.length > 15 ? (
                              <LightTooltip
                                arrow
                                title={staffData?.staff?.email}
                              >
                                {staffData?.staff?.email?.slice(0, 15) + "..."}
                              </LightTooltip>
                            ) : (
                              staffData?.staff?.email
                            )}
                          </h6>
                        </div>
                      </div>
                    </li>

                    
                    <li className="list-group-item px-0">
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                            <i className="mdi mdi-comment-multiple" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2 text-start">
                          <h6 className="mt-2">Ext No: </h6>
                        </div>
                        <div className="flex-shrink-0 text-end">
                          <h6 className="mt-2 placeholder-glow">
                            {staffData?.staff?.ext_number}
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                            <i className="mdi mdi-map" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2 text-start">
                          <h6 className="mt-2">Ip Auth: </h6>
                        </div>
                        <div className="flex-shrink-0 text-end">
                         <Switch
                         checked={staffData?.staff?.ip_auth=="1"}
                         onClick={async()=>{
                        const res=await updateIp({
                          staff_id:staffData.staff?.id
                        })
                        if(res?.data?.status){
                          viewStaff({id:staffData.staff?.id})
                        }
                         }}
                         />
                       
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                            <i className="mdi mdi-list-status" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2 text-start">
                          <h6 className="mt-2">Status:</h6>
                        </div>
                        <div className="flex-shrink-0 text-end">
                        <Switch
                         checked={staffData?.staff?.ip_auth=="1"}
                         onClick={async()=>{
                        const res=await updateStatus({
                          staff_id:staffData.staff?.id
                        })
                        if(res?.data?.status){
                          viewStaff({id:staffData.staff?.id})
                        }
                         }}
                         />
                        </div>
                      </div>
                    </li>
                  </ul>
               

                <a href="#">
                  <div className="card-text flex justify-end gap-1 placeholder-glow mt-4 mb-1 ml-auto items-center"></div>
                </a>
              </div>
            </div>
          </div>} */}
          {staff12?.staff?.id && (
            <div className="card col-lg-3 pulse" id="contact-view-detail">
              <div className=" mt-3 mb-4 text-center">
                <div className="position-relative d-inline-block capitalize">
                  <Avatar
                    src={staff12?.staff?.profile?.profile_image}
                    sx={{ width: "80px", height: "80px" }}
                  >
                    {staff12?.staff?.name?.charAt(0)}
                  </Avatar>
                  <span className="contact-active position-absolute rounded-circle bg-success">
                    <span className="visually-hidden" />
                  </span>
                </div>
                <h5 className="mt-4 h5 capitalize">{staff12?.staff?.name}</h5>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item avatar-xs">
                    <a
                      href="javascript:void(0);"
                      className="avatar-title bg-soft-success text-success fs-15 rounded"
                    >
                      <i className="ri-phone-line" />
                    </a>
                  </li>
                  <li className="list-inline-item avatar-xs">
                    <a
                      href="javascript:void(0);"
                      className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                    >
                      <i className="ri-mail-line" />
                    </a>
                  </li>
                  <li className="list-inline-item avatar-xs">
                    <a
                      href="javascript:void(0);"
                      className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                    >
                      <i className="ri-question-answer-line" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card">
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold py-1" width={200} scope="row">
                          Email ID
                        </td>
                        <td className="py-1">{staff12?.staff?.email}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold py-1" scope="row">
                          Phone No
                        </td>
                        <td className="py-1">{staff12?.staff?.phone}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold py-1" scope="row">
                          Ext No
                        </td>
                        <td className="py-1">
                          <span className="badge badge-soft-info fs-12">
                            {staff12?.staff?.extension?.ext_number
                              ? staff12?.staff?.extension?.ext_number
                              : "NA"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold py-1" scope="row">
                          Branch
                        </td>
                        <td className="py-1">
                          <p className="badge badge-soft-primary">
                            {staff12?.staff?.branches?.length > 0
                              ? staff12?.staff?.branches?.map((data) => data)
                              : "NA"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold py-1" scope="row">
                          Ip Auth
                        </td>
                        <td className="py-1">
                          <Switch
                            checked={staff12?.staff?.ip_auth == "1"}
                            onClick={async () => {
                              const res = await updateIp({
                                staff_id: staff12.staff?.id,
                                status:
                                  staff12.staff?.ip_auth == 1
                                    ? "inactive"
                                    : "active",
                              });
                              if (res?.data?.status) {
                                viewStaff({ id: staff12.staff?.id });
                              } else {
                                Swal.fire({
                                  title: "Error",
                                  text: res?.error?.data?.message,
                                  icon: "error",
                                });
                              }
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold py-1" scope="row">
                          Status
                        </td>
                        <td className="py-1">
                          {staff12.staff?.status == 1 ? (
                            <span className="badge badge-outline-success fs-12">
                              Active
                            </span>
                          ) : (
                            <span className="badge badge-outline-danger fs-12">
                              Inactive
                            </span>
                          )}{" "}
                          |
                          <a
                            className="text-warning cursor-pointer"
                            onClick={async () => {
                              const res = await updateStatus({
                                staff_id: staff12.staff?.id,
                                status:
                                  staff12.staff?.status == 1
                                    ? "inactive"
                                    : "active",
                              });
                              if (res?.data?.status) {
                                viewStaff({ id: staff12.staff?.id });
                                refetch();
                                navigate(
                                  `/staff/${
                                    staff12.staff?.status == 1
                                      ? "inactive"
                                      : "active"
                                  }`
                                );
                              } else {
                                toast.error(res?.error?.data?.message);
                              }
                            }}
                          >
                            &nbsp;Change
                          </a>
                        </td>
                      </tr>
                      <tr>
                        {staff12.staff?.status != 2 && (
                          <td colspan="2" class="pt-1 pb-3 !ml-auto">
                            <span>
                              <Link
                                class="text-primary"
                                to={`/edit-staff/${staff12.staff?.id}`}
                              >
                                <i class="mdi mdi-square-edit-outline"></i> Edit
                              </Link>
                            </span>{" "}
                            |
                            <span
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You will not be able to recover this staff member!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#d33",
                                  cancelButtonColor: "#3085d6",
                                  confirmButtonText: "Terminate",
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    const res = await terminateStaff({
                                      staff_ids: [staff12.staff?.id],
                                    });
                                    if (res?.data?.status) {
                                      refetch();
                                      setStaff12();
                                      Swal.fire(
                                        "Deleted!",
                                        "Staff member has been deleted.",
                                        "success"
                                      );
                                    } else {
                                      Swal.fire(
                                        "Error!",
                                        "Failed to delete staff member.",
                                        "error"
                                      );
                                    }
                                  }
                                });
                              }}
                            >
                              {
                                <button
                                  class="btn text-danger px-0"
                                  id="sa-dialog-three-btn"
                                >
                                  <i class="mdi mdi-trash-can-outline"></i>{" "}
                                  Terminate
                                </button>
                              }
                            </span>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className="btn btn-danger w-full "
                    onClick={() => {
                      setStaff12();
                      viewStaff({ id: null });
                    }}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {
        <>
          <Modal
            style={{ backdropFilter: "blur(3px)" }}
            centered
            scrollable
            show={addStaff}
            onHide={() => setAddStaff(false)}
            size="xl"
          >
            <Modal.Body>
              <AddStaffForm
                setAdd={setAddStaff}
                extensions={data}
                refetch={refetch}
              />
            </Modal.Body>
          </Modal>
        </>
      }
      <Modal
        style={{ backdropFilter: "blur(3px)" }}
        centered
        scrollable
        show={staffData1}
        onHide={() => setStaffData1(false)}
        size="xl"
      >
        <Modal.Body>
          <AddStaffForm
            setAdd={setStaffData1}
            extensions={data}
            refetch={refetch}
            staffData={staffData1}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default List;
