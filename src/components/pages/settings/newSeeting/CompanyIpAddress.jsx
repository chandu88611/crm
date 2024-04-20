import React, { useState } from 'react'
import OtherIp from './OtherIp'
// import { VectorMap, Geographies, Geography,Marker  } from '@south-paw/react-vector-maps';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import { useDeleteBranchMutation, useDeleteIpAddressMutation, useDeleteShiftMutation, useGetIpAddressesQuery } from '../../../../services/api';
import Loader from '../../Loader';
 import SimpleBar from "simplebar-react";
 import "simplebar-react/dist/simplebar.min.css";
import EditIp from './EditIp';
import EditShift from './EditShift';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import styled from '@emotion/styled';
 
import { Mercator } from "@vx/geo";
// import { worldMap } from '../../../../../public/assets/js/map';
import { worldMap1,states1} from "./indiaData"
import WorldMap from './WorldMap';


 
function CompanyIpAddress() {

  
  const [map,setMap]=useState(worldMap1)
  const [editIPData, setEditIpData] = useState()
  const [editOfficeShiftData, setEditOfficeShiftData] = useState()
  const [otherIpForEdit, setOtherIpForEdit] = useState()
  const [editOtherIp, setEditOtherIp] = useState(false)
  const [dleteIp]=useDeleteIpAddressMutation()
  const [deleteShift]=useDeleteShiftMutation()


 

  const MapContainer = styled.div`
  margin: 1rem auto;
  width: auto;

  svg {
     
    path {
      fill: #012257;
      cursor: pointer;
      outline: none;

      // When a layer is hovered
      &:hover {
        fill: #4ba6d6;
      }

      // When a layer is focused.
      &:focus {
        fill: #4ba6d6;
      }

      // When a layer is 'checked' (via checkedLayers prop).
      &[aria-checked="true"] {
        fill: rgba(56, 43, 168, 1);
      }

      // When a layer is 'selected' (via currentLayers prop).
      &[aria-current="true"] {
        fill: rgba(56, 43, 168, 0.83);
      }
    }
  }
`;
  const { data: companyIP, isLoading ,refetch} = useGetIpAddressesQuery()

  const handleEditIp = (ip) => {
    setEditIpData(ip)
  }


  const handleDeleteIp = async(ip) => {
    console.log(ip)
    if(ip){
      Swal.fire({
        title: "You are going to delete Ip address",
        text:"This Process Can't be  undone",
        icon: "warning",
        showCancelButton: true, // Adding the cancel button
        confirmButtonText: "Confirm Delete",
        cancelButtonText: "Cancel",
      }).then(async(result) => {
        if (result.isConfirmed) {
         const res=await dleteIp({
          ip_id:ip?.id
         })
         if(res?.data?.status){
          Swal.fire({
            title: "Success",
            text:res?.data?.message,
            icon: "success",
          })
          refetch()
         }
         if(res?.error?.data?.status){
          Swal.fire({
            title: "Error",
            text:res?.error?.data?.message,
            icon: "error",
          })
         }
        }
      });
    }
  }
  const handleEditOfficeShift = (shift) => {
    setEditOfficeShiftData(shift)
  }

  const handleCloseOfficeShift = () => {
    setEditOfficeShiftData()
  }

  const handleClose = () => {
    setEditIpData()
  }

  return (
    <>
      {isLoading && <Loader />}
      <EditIp
        show={editIPData ? true : false}
        onHide={handleClose}
        ipDetails={editIPData}
      />

      <EditShift
        show={editOfficeShiftData ? true : false}
        onHide={handleCloseOfficeShift}
        shiftDetails={editOfficeShiftData}
      />
      <div className="col-xxl-6 col-xl-6">
        <div className="card">
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 h4 flex-grow-1">
              Company IP Addresses
            </h4>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="btn btn-primary btn-sm bg-[#687cfe]"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Add IP Address
              </button>
              <button
                type="button"
                className="btn btn-info btn-sm ms-2 bg-[#0ac7fb]"
                data-bs-toggle="modal"
                data-bs-target="#shifts"
              >
                Add Shift
              </button>
            </div>
          </div>
          {/* end card header */}
          {/* card body */}
          <div className="card-body">
            <div id="users-by-country" data-colors='["--vz-light"]' />
            {/* <MapContainer>
            <VectorMap {...map}  layerProps={layerProps}/>
            </MapContainer> */}

            <div>
     
    </div>
            <div style={{ width: '100%', height: '60vh' }}>
<WorldMap ipaddress={companyIP}/>
            
    </div>
            {/* <Map/> */}
            <div className="card">
              <div className="card-body">
                {/* Nav tabs */}
                <ul className="nav nav-tabs mb-3" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#ipAddr"
                      role="tab"
                      aria-selected="false"
                    >
                      IP Address
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#officeShift"
                      role="tab"
                      aria-selected="false"
                    >
                      Office Shifts
                    </a>
                  </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content  text-muted">
                  <div className="tab-pane active" id="ipAddr" role="tabpanel">
                    <div className="table-responsive table-card mt-3 custom-tbl">
                      <SimpleBar data-simplebar className="max-h-[260px]">
                        <table className="table table-borderless table-sm table-centered align-middle mb-1">
                          <thead className="text-muted ">
                            <tr className="!bg-[#f5f5f5]" >
                              <th>IP Address</th>
                              <th style={{ width: "30%" }}>Name</th> 
                              <th style={{ width: "30%" }}>Expiry</th>
                              <th>Location</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody className="border-0">
                            {companyIP?.data?.ipaddress?.length > 0 &&
                              companyIP?.data?.ipaddress?.map((ip, ind) => (
                                <tr key={ind}>
                                  <td>
                                    <span className="text-primary">
                                      {ip?.address}
                                    </span>
                                  </td>
                                  <td>{ip?.name}</td>
                                  <td>
                                    <span className="badge badge-soft-warning badge-border fs-12">
                                      {ip?.valid_from} - {ip?.valid_to}
                                    </span>
                                  </td>
                                  <td>{ip?.location}</td>
                                  <td className='flex gap-1'>
                                    <a
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Comment"
                                      onClick={() => handleEditIp(ip)}
                                      className="mr-1"
                                    >
                                      <button
                                        className="btn btn-soft-info py-1 btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#myModalEdit"
                                        onClick={() => handleEditIp(ip)}
                                      >
                                        <span className="">
                                          <i className="mdi mdi-square-edit-outline align-middle fs-15"></i>
                                        </span>
                                      </button>
                                    </a>
                                    <a
                                      data-bs-toggle="tooltip"
                                      onClick={() => handleDeleteIp(ip)}
                                    >
                                      <button
                                        className="btn btn-soft-danger py-1 btn-sm"
                                        
                                      >
                                        <span className="">
                                          <i className="mdi mdi-trash-can-outline align-middle fs-15"></i>
                                        </span>
                                      </button>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            {companyIP?.data?.ipaddress?.length == 0 && (
                              <tr className="!border-0">
                                <td colSpan={8}>
                                  <p className="text-center w-full text-lg">
                                    No IP&apos;s found
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </SimpleBar>
                    </div>
                  </div>
                  <div className="tab-pane" id="officeShift" role="tabpanel">
                    <div className="table-responsive table-card mt-3 custom-tbl">
                      <SimpleBar data-simplebar className="max-h-[260px]">
                        <table className="table table-borderless table-sm table-centered align-middle mb-1">
                          <thead className="text-muted border-dashed border border-start-0 border-end-0 bg-soft-light">
                            <tr className="!bg-[#f5f5f5]">
                              <th style={{ width: "20%" }}>Shift Name</th>
                              <th style={{ width: "30%" }}>Start Time</th>
                              <th style={{ width: "30%" }}>End Time</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="border-0">
                            {companyIP?.data?.shifts?.length > 0 &&
                              companyIP?.data?.shifts?.map((shift, ind) => (
                                <tr key={ind}>
                                  <td>
                                    <span className="text-primary">
                                      {shift?.name}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-info badge-border fs-12">
                                      {shift?.start}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-danger badge-border fs-12">
                                      {shift?.end}
                                    </span>
                                  </td>
                                  <td>
                                    <a
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Comment"
                                      onClick={() =>
                                        handleEditOfficeShift(shift)
                                      }
                                      className="mr-1"
                                    >
                                      <button
                                        className="btn btn-soft-info py-1 btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#myModalEdit"
                                        onClick={() =>
                                          handleEditOfficeShift(shift)
                                        }
                                      >
                                        <span className="">
                                          <i className="mdi mdi-square-edit-outline align-middle fs-15"></i>
                                        </span>
                                      </button>
                                    </a>
                                    <a
                                      data-bs-toggle="tooltip"
                                      onClick={() =>{
                                        if(shift?.id){
                                          Swal.fire({
                                            title: "You are going to delete Ip address",
                                            text:"This Process Can't be  undone",
                                            icon: "warning",
                                            showCancelButton: true, // Adding the cancel button
        confirmButtonText: "Confirm Delete",
        cancelButtonText: "Cancel",
                                          }).then(async(result) => {
                                            if (result.isConfirmed) {
                                              const res=await deleteShift({
                                                shift_id:shift?.id
                                               })
                                               if(res?.data?.status){
                                                Swal.fire({
                                                  title: "Success",
                                                  text:res?.data?.message,
                                                  icon: "success",
                                                })
                                                refetch()
                                               }
                                               if(res?.error?.data?.status){
                                                Swal.fire({
                                                  title: "Error",
                                                  text:res?.error?.data?.message,
                                                  icon: "error",
                                                })
                                               }
                                            }
                                          });
                                        }
                                      }
                                       
                                      }
                                    >
                                      <button
                                        className="btn btn-soft-danger py-1 btn-sm"
                                      
                                      >
                                        <span className="">
                                          <i className="mdi mdi-trash-can-outline align-middle fs-15"></i>
                                        </span>
                                      </button>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                               {companyIP?.data?.shifts?.length == 0 && (
                              <tr className="!border-0">
                                <td colSpan={8}>
                                  <p className="text-center w-full text-lg">
                                    No Shift&apos;s found
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </SimpleBar>
                    </div>
                  </div>
                </div>
              </div>
              {/* end card-body */}
            </div>
            {/* end card */}
          </div>
          {/* end card body */}
        </div>
        {/* end card */}
        <OtherIp isEdit={editOtherIp} ipData={otherIpForEdit} />
        {/* end card */}
        <div className="card">
          <div className="card-body position-relative">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 h5">Other IP's List</h5>
              <div className="">
                <button
                  type="button"
                  className={`btn disabled:border-none ${!otherIpForEdit?.id?"text-muted  !cursor-default scale-100":"btn-soft-primary scale-125 "} waves-effect waves-light btn-sm me-2`}
                  disabled={!otherIpForEdit?.id}
                  onClick={() => setEditOtherIp(true)}
                >
                  <i className="mdi mdi-square-edit-outline" /> Edit
                </button>
                <button
                  type="button"
                  disabled={!otherIpForEdit?.id}
                  className={`btn disabled:border-none ${!otherIpForEdit?.id?"text-muted  !cursor-default scale-100":"btn-soft-danger scale-125 "} waves-effect waves-light btn-sm me-2`}
                  onClick={()=>{
                    if(otherIpForEdit?.id){
                      Swal.fire({
                        title: "You are going to delete Ip address",
                        text:"This Process Can't be  undone",
                        icon: "warning",
                        showCancelButton: true, // Adding the cancel button
                        confirmButtonText: "Confirm Delete",
                        cancelButtonText: "Cancel",
                      }).then(async(result) => {
                        if (result.isConfirmed) {
                         const res=await dleteIp({
                          ip_id:otherIpForEdit?.id
                         })
                         if(res?.data?.status){
                          Swal.fire({
                            title: "Success",
                            text:res?.data?.message,
                            icon: "success",
                          })
                          refetch()
                         }
                         if(res?.error?.data?.status){
                          Swal.fire({
                            title: "Error",
                            text:res?.error?.data?.message,
                            icon: "error",
                          })
                         }
                        }
                      });
                    }
                  }}
                >
                  <i className="mdi mdi-trash-can-outline" /> Delete
                </button>
              </div>
            </div>
            <div className="vstack gap-2">
              {companyIP?.data?.other_ip?.length > 0 &&
                companyIP?.data?.other_ip?.map((ip, ind) => (
                  <div className="form-check card-radio" key={ind}>
                    <input
                      name="listGroupRadioGrid"
                      type="radio"
                      onClick={() => setOtherIpForEdit(ip)}
                      checked={otherIpForEdit?.id == ip?.id}
                      className="form-check-input"
                    />
                    <label
                      className="form-check-label"
                      onClick={() => setOtherIpForEdit(ip)}
                      htmlFor="listGroupRadioGrid1"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="avatar-xs">
                            <div className="avatar-title bg-soft-success text-success fs-18 rounded">
                              <i className="mdi mdi-earth" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3 d-flex justify-content-between align-items-end flex-wrap">
                          <div className="">
                            <h6 className="mb-1 h6">{ip?.name}</h6>
                            <b className="pay-amount">{ip?.address}</b>
                          </div>
                          <div className="text-end">
                            <b className="pay-amount">{ip?.location}</b>
                            <h6 className="mb-0 text-muted fs-12 h6">
                              Valid Till :{" "}
                              {new Date(ip?.valid_to).toLocaleDateString(
                                undefined,
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}{" "}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              {companyIP?.data?.other_ip?.length == 0 && (
                <p className="h3 text-center">No Ip Found </p>
              )}
            </div>
          </div>
          {/* end card body */}
        </div>
        {/* end card */}
      </div>
    </>
  );
}

export default CompanyIpAddress
