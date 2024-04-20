import React, { useEffect, useState } from "react";
import CompanyDetails1 from "./CompanyDetails";
import CompanyBankDetails from "./CompanyBankDetails";
import Select from 'react-select';
import {
  useBranchesListQuery,
  useGetProfileDetailsQuery,
  useLazyGetStaffDetailsQuery,
  useLazyGetStaffListQuery,
  useUpdateIpAuthMutation,
  useUpdateStaffIpMutation,
  useUpdateStaffShiftMutation,
} from "../../../../services/api";
import { Avatar } from "@mui/material";
import { successAlert } from "../../swAlert";
import Swal from "sweetalert2";

function AssignIpAddress() {
  const { data: branchesList, isLoading } = useBranchesListQuery();
  const [getList, { data: staffList, isLoading: staffLoading }] = useLazyGetStaffListQuery();
  const [donotcall, setDonotCall] = useState(true);
  const [staffs, SetStaffs] = useState([]);
  const [selected,setSelected]=useState(false);
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    if (staffList?.data && donotcall) {
      SetStaffs(staffList?.data?.staffs);
    }
  }, [staffList]);
  const {
    data: profileDetailsResp,
    isLoading: profileLoading,
    refetch,
  } = useGetProfileDetailsQuery();
  const [getStaff, { data: staffData, isLoading: staffDataLoading }] =
    useLazyGetStaffDetailsQuery();
  const [updateIp] = useUpdateStaffIpMutation();
  const [updateShift] = useUpdateStaffShiftMutation();
  const [updateIpAuth] = useUpdateIpAuthMutation();
  useEffect(() => {
    if (donotcall) {
      getList();
    }
  }, []);
  useEffect(() => {
    if (donotcall && staffs?.length > 0) {
      getStaff({ id: staffs[0]?.id });
      setSelected(staffs[0]?.id)
      setDonotCall(false);
    }
  }, [staffs]);
  const handleChange = (e) => {
    if (e.target?.value.trim != "") {
      const filtered = staffList?.data?.staffs?.filter((data) =>
        data?.name?.toLowerCase().includes(e.target?.value?.toLowerCase())
      );
      SetStaffs(filtered);
    } else {
      SetStaffs(staffList?.data?.staffs);
    }
  };
useEffect(()=>{
if(staffList){
  SetStaffs(staffList?.data?.staffs)
}
},[staffList])

  const [selectedShift, setSelectedShift] = useState('');

  const handleShiftChange = async (selectedOption) => {
    if (!selectedOption) {
      return;
    }
    
    const res = await updateShift({
      staff_id: staffData?.data?.staff_id,
      shift_id: selectedOption.value,
    });

    if (res?.data?.status) {
      successAlert(res?.data?.message)
      await getList()  
      getStaff({ id: staffData?.data?.staff_id });
    }
    
    setSelectedShift(selectedOption);
  };

  const options = branchesList?.data?.shifts?.map((data) => ({
    value: data.id,
    label: data.name,
  }));

  useEffect(()=>{
if(staffData){
 const selected= branchesList?.data?.shifts?.filter((data) => data?.id==staffData?.data?.staffs?.shift_id );
console.log(selected)
if(selected?.length>0){

  setSelectedShift({
    value: selected[0]?.id,
    label: selected[0]?.name,
  })
}else{
  setSelectedShift({
    value: '',
    label: '',
  })
}
}
  },[staffData])
  return (
    
    <div className="col-xxl-6 col-xl-6">
      {branchesList?.data?.shifts?.length<1&&<div className="alert alert-danger border-0 mb-xl-0 ">
      Add shifts to assign it to staff
        </div>}
      <div className="card mt-1">
        <div className="card-header">
          <h4 className="card-title mb-0 flex-grow-1">Assign IP Address</h4>
        </div>
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="card-body border-end">
              <div className="search-box">
                <input
                  type="text"
                  className="py-2 w-full rounded focus:outline-none  pl-8 bg-light border-light "
                  autoComplete="off"
                  id="searchList"
                  placeholder="Search candidate..."
                  onChange={handleChange}
                />
                <i className="ri-search-line search-icon" />
              </div>
              <div
                data-simplebar=""
                style={{ maxHeight: 300 }}
                className="px-3 mx-n3  overflow-auto custom-scrollbar "
              >
                <ul className="list-unstyled mb-0 pt-2 " id="candidate-list">
                  {staffs?.map((data, i) => (
                    <li
                      onClick={() => {
                        setProfilePic(data?.pic);
                                             
                        getStaff({ id: data?.id });
                        setSelected(data?.id);
                      }}
                      className="cursor-pointer "
                    >
                      <a className={`flex align-items-center p-2 ${selected==data?.id&&"bg-primary bg-opacity-10 rounded"}  `}>
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs   rounded-circle flex items-center justify-center ">
                            {/* <img
                                src={data?.pic?data?.pic:"assets/images/users/avatar-1.jpg"}
                                alt=""
                                className="img-fluid rounded-circle candidate-img "
                              /> */}
                            <Avatar
                              src={data?.pic}
                              sx={{ width: "100%", height: "100%" }}
                            >
                              {data?.name?.charAt(0)}
                            </Avatar>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13  text-truncate">
                            <span className="candidate-name font-semibold text-capitalize">{data?.name}</span><br />
                            {data?.shiftname&&<span className="candidate-name   text-xs py-[1px] px-[3px] rounded text-primary ">{data?.shiftname}</span>}
                          </h5>
                        
                        </div>
                      </a>
                    </li>
                  ))}
                  {staffs?.length == 0 && (
                    <tr className="!border-0">
                      <td colSpan={8}>
                        <p className="text-center w-full text-md">
                          No Staff&apos;s found
                        </p>
                      </td>
                    </tr>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {staffData?.data?.staff_id && (
            <div className="col-lg-6">
              <div className="card-body text-center">
                <div className="d-flex justify-content-between align-items-center">
                  {/* <select
                    className="border p-[1px] rounded  selection:border-0 focus:outline-none"
                    aria-label="Default select example"
                    id="choices-single-no-search"
                    onChange={async (e) => {
                      console.log(e.target.value);
                      if (e.target.value == "") {
                        return;
                      }
                      const res = await updateShift({
                        staff_id: staffData?.data?.staff_id,
                        shift_id: e.target.value,
                      });

                      if (res?.data?.status) {
                        getStaff({ id: staffData?.data?.staff_id });
                      }
                    }}
                  >
                    <option value="" selected={false}>
                      Select Shift{" "}
                    </option>
                    {branchesList?.data?.shifts?.map((data, i) => (
                      <option
                        value={data?.id}
                        selected={staffData?.data?.staffs?.shift_id == data.id}
                      >
                        {data?.name}
                      </option>
                    ))}
                  </select> */}
                    <Select
      value={selectedShift}
      onChange={handleShiftChange}
      options={options}
  
      placeholder="Select Shift"
      className="w-[140px]"
    />
                  <div className="form-check form-switch form-switch-success mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id=""
                      checked={staffData?.data?.staffs?.ip_auth == 1}
                      onClick={async () => {
                        const res = await updateIpAuth({
                          staff_id: staffData?.data?.staff_id,
                          //  shift_id:e.target.value
                        });

                        if (res?.data?.status) {
                          getStaff({ id: staffData?.data?.staff_id });
                        }else{
                          Swal.fire({
                            title: "Error",
                            text:res?.error?.data?.message,
                            icon: "error",
                         
                          })
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor="SwitchCheck3">
                      IP Enabled
                    </label>
                  </div>
                </div>
                <div className="avatar-md !bg-gray-200 rounded-circle flex items-center justify-center mx-auto">
                  {/* <img
                      src={staffData?.data?.staffs?.pic?staffData?.data?.staffs?.pic:}
                      alt=""
                      id="candidate-img"
                      className="img-thumbnail rounded-circle shadow-none"
                    /> */}
                  <Avatar
                    src={staffData?.data?.staffs?.pic}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    {staffData?.data?.staffs?.name?.charAt(0)}
                  </Avatar>
                </div>
                <h5 id="candidate-name" className="mb-0 capitalize">
                  {staffData?.data?.staffs?.name}
                </h5>
                <p id="candidate-position" className="text-muted mb-1">
                  {staffData?.data?.staffs?.email}
                </p>
                <div className="slideDiv">
                  {/* <button
                      className="btn btn-primary slideBtn px-1 py-0 mb-3 bg-[#687cfe]"
                      type="button"
                    >
                      IP List
                    </button> */}
                  <div className="slideContent">
                    <div className="mt-2" style={{ width: "100%" }}>
                      <div className="row">
                        <div className="col-lg-12">
                          <ul className="list-group list-group-flush border-dashed mb-0 mt-0 pt-2">
                            <li className="list-group-item px-0">
                              <h5 className="mb-0">Office IP's</h5>
                            </li>
                            <li className="list-group-item px-0">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs">
                                    <div className="avatar-title bg-soft-success text-success fs-18 rounded">
                                      <i className="mdi mdi-earth" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 text-start">
                                  <span className="mb-1">127.0.0.1</span>
                                  <p className="fs-12 mb-0 text-muted">
                                    IP Address Name{" "}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                  <div className="form-check form-switch form-switch-success mb-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id=""
                                      defaultChecked=""
                                    />
                                    {/* <label class="form-check-label" for="SwitchCheck3">IP Enabled</label> */}
                                  </div>
                                </div>
                              </div>
                            </li>
                            {/* end */}
                            <li className="list-group-item px-0">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs">
                                    <div className="avatar-title bg-soft-success text-success fs-18 rounded">
                                      <i className="mdi mdi-earth" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 text-start">
                                  <span className="mb-1">127.0.0.1</span>
                                  <p className="fs-12 mb-0 text-muted">
                                    IP Address Name{" "}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                  <div className="form-check form-switch form-switch-success mb-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id=""
                                      defaultChecked=""
                                    />
                                    {/* <label class="form-check-label" for="SwitchCheck3">IP Enabled</label> */}
                                  </div>
                                </div>
                              </div>
                            </li>
                            {/* end */}
                            <li className="list-group-item px-0">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs">
                                    <div className="avatar-title bg-soft-success text-success fs-18 rounded">
                                      <i className="mdi mdi-earth" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 text-start">
                                  <span className="mb-1">127.0.0.1</span>
                                  <p className="fs-12 mb-0 text-muted">
                                    IP Address Name
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                  <div className="form-check form-switch form-switch-success mb-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id=""
                                      defaultChecked=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item px-0">
                              <h5 className="mb-0">Other IP's</h5>
                            </li>
                            <li className="list-group-item px-0">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs">
                                    <div className="avatar-title bg-soft-primary text-primary fs-18 rounded">
                                      <i className="mdi mdi-earth" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 text-start">
                                  <span className="mb-1">127.0.0.1</span>
                                  <p className="fs-12 mb-0 text-muted">
                                    IP Address Name{" "}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                  <div className="form-check form-switch form-switch-primary mb-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id=""
                                      defaultChecked=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item px-0">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs">
                                    <div className="avatar-title bg-soft-primary text-primary fs-18 rounded">
                                      <i className="mdi mdi-earth" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 text-start">
                                  <span className="mb-1">127.0.0.1</span>
                                  <p className="fs-12 mb-0 text-muted">
                                    IP Address Name{" "}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                  <div className="form-check form-switch form-switch-primary mb-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item px-0">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs">
                                    <div className="avatar-title bg-soft-primary text-primary fs-18 rounded">
                                      <i className="mdi mdi-earth" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 text-start">
                                  <span className="mb-1">127.0.0.1</span>
                                  <p className="fs-12 mb-0 text-muted">
                                    IP Address Name{" "}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                  <div className="form-check form-switch form-switch-primary mb-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id=""
                                    />
                                    {/* <label class="form-check-label" for="SwitchCheck3">IP Enabled</label> */}
                                  </div>
                                </div>
                              </div>
                            </li>
                            {/* end */}
                          </ul>
                          <div>
                            <button
                              type="button"
                              className="btn btn-success rounded-pill w-sm py-1"
                            >
                              {" "}
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row assignedIPs d-block">
                  <div className="col-lg-12">
                    <li className="list-group-item px-0">
                      <h5 className="mb-0">Other IP's</h5>
                    </li>
                    <ul className="list-group list-group-flush border-dashed mb-0 mt-0 pt-2 h-[200px] overflow-auto custom-scrollbar">
                      {staffData?.data?.other_ip?.length > 0 ? (
                        staffData?.data?.other_ip?.map((ip, ind) => (
                          <li className="list-group-item px-0" key={ind + "ip"}>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <div className="avatar-xs">
                                  <div className="avatar-title bg-soft-success text-success fs-18 rounded">
                                    <i className="mdi mdi-earth" />
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-2 text-start">
                                <span className="mb-1">{ip?.address}</span>
                                <p className="fs-12 mb-0 text-muted">
                                  {ip?.name}
                                </p>
                              </div>
                              <div className="flex-shrink-0 text-end">
                                <div className="form-check form-switch form-switch-success mb-0">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id=""
                                    defaultChecked=""
                                    disabled=""
                                    checked={staffData?.data?.staffs?.ips?.includes(
                                      ip?.id
                                    )}
                                    onClick={async () => {
                                      const res = await updateIp({
                                        staff_id: staffData?.data?.staff_id,
                                        ip_id: ip?.id,
                                      });

                                      if (res?.data?.status) {
                                        getStaff({
                                          id: staffData?.data?.staff_id,
                                        });
                                      }else{
                                        Swal.fire({
                                          title: "Error",
                                          text:res?.error?.data?.message,
                                          icon: "error",
                                       
                                        })
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="p-2 text-xs bg-slate-200 my-1 text-gray-800">
                          No Ip's found
                        </div>
                      )}
                    </ul>

                    {/* <div className="text-end">
                        <button
                          type="button"
                          name="button"
                          className="btn btn-light btn-sm"
                        >
                          View More
                        </button>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CompanyDetails1 profileDetailsResp={profileDetailsResp} />
      <CompanyBankDetails profileDetailsResp={profileDetailsResp} />
    </div>
  );
}

export default AssignIpAddress;
