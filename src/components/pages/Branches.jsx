/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAddIpMutation, useBranchesListQuery, useCreateBranchMutation, useDeleteBranchMutation, useDeleteIpMutation, useLazyManageIpsQuery, useUpdateBranchMutation } from "../../services/api";
import Header from "./Header";
import Loader from "./Loader";
import { successAlert } from "./swAlert";

import { Modal } from "react-bootstrap"
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function Branches() {
  const [showManageIps, setshowManageIps] = useState(false)
  const [ipAddress, setIpAddress] = useState("")
  const [ipAddressErr, setIpAddressErr] = useState("")
  const [branchName, setBranchname] = useState("")
  const [branchLocation, setBranchLocation] = useState("")
  const [branchNameErr, setBranchNameErr] = useState("")
  const [branchLocationErr, setBranchLocationErr] = useState("")
  const [apierr, setApierr] = useState("")
  const [createApiErr, setCreateApierr] = useState("")
  const [ips, setIps] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [updatedName, setUpdatedName] = useState("")
  const [updatedLocation, setUpdatedLocation] = useState("")
  const [updateBranchId, setUpdateBranchId] = useState("")
  const [updateBranchNameErr, setUpdateBranchNameErr] = useState("")
  const [updateBranchLocationErr, setUpdateBranchLocationErr] = useState("")
  const [updateApiErr, setUpdateApiErr] = useState("")
  const [addIpApiErr, setAddIpApiErr] = useState("")


  const { data: branchesList, isLoading } = useBranchesListQuery()
  const [manageIp, { data: manageIpData, isLoading: manageIpLoading }] = useLazyManageIpsQuery()
  const [deleteBranch, { data:deleteResp, isLoading: deleteLoading }] = useDeleteBranchMutation()
  const [addIp, { data:addIpResp, isLoading: addIpLoading }] = useAddIpMutation()
  const [addBranch, {data:addBranchResp, isLoading:addBranchLaoding}] = useCreateBranchMutation()
  const [deleteIps, { data:deleteIpsResp, isLoading: deleteIpLoading }] = useDeleteIpMutation()
  const [updateBranch, { data:updateResp, isLoading: updateLoading }] = useUpdateBranchMutation()

  useEffect(() => {
    if (updateApiErr != "") {
      setTimeout(() => {
        setAddIpApiErr("");
      },3500)
    }
  }, [updateApiErr])
  
  useEffect(() => {
      if (addIpApiErr != "") {
        setTimeout(() => {
          setUpdateApiErr("");
        }, 3500);
      }
  }, [addIpApiErr]);
  
  useEffect(() => {
        if (createApiErr != "") {
          setTimeout(() => {
            setCreateApierr("");
          }, 3500);
        }
  }, [createApiErr]);
  
  const handleManageIps = async (id) => {

    setshowManageIps(false)
    const response = await manageIp(id)
    if (response?.data?.status) {
      setshowManageIps(true)
    }
  }

  const handleUpdateBranch = async() => {
    const response = await updateBranch({ id: updateBranchId, name: updatedName, location: updatedLocation })
    if (response?.data?.status) {
      handleHide()
      successAlert(response?.data?.message)
      
    } else {
      console.log(response)
      setUpdateBranchNameErr(response?.error?.data?.errors?.name)
      setUpdateBranchLocationErr(response?.error?.data?.errors?.location);
      setUpdateApiErr(response?.error?.data?.message)
    }
  }

  const handleUpdateBranchNameChange = (value) => {
    setUpdatedName(value)
    if (value?.length > 250) {
      setUpdateBranchNameErr("max length exceeded")
    } else if (value == "") {
      setUpdateBranchNameErr("Branch name is required")
    } else {
      setUpdateBranchNameErr("");
    }
  }

    const handleUpdateBranchLocationChange = (value) => {
      setUpdatedLocation(value);
      if (value?.length > 250) {
        setUpdateBranchLocationErr("max length exceeded");
      } else if (value == "") {
        setUpdateBranchLocationErr("Branch location is required");
      } else {
        setUpdateBranchLocationErr("");
      }
    };

  const handleCheckboxChange = (id) => {
    setIps((prev) => {
      const index = prev.indexOf(id)

      return index !== -1
      ? prev?.slice(0,index).concat(prev.slice(index+1)): [...prev, id]
    })
  }

  const handleHide = () => {
    setShowModal(false)
  }


  const handleIpAddressChange = (value) => {
    setIpAddress(value)
  }

  const handleDeleteIps = async() => {
    const response = await deleteIps({ ip_id: ips });
    if (response?.data?.status) {
      setIps([])
      successAlert(response?.data?.message)
    }
  }



  const handleCloseManageIps = () => {
    setshowManageIps(false)
  }

  const handleEditBranch = (branch) => {
    setUpdatedName(branch?.name)
    setUpdatedLocation(branch?.location)
    setUpdateBranchId(branch?.id)
    setShowModal(true)
  }

  const handleDeleteBranch = async(id) => {
    const response = await deleteBranch({ id: id});
    if (response?.data?.status) {
      successAlert(response?.data?.message)
    }
  }

  const handleAddIp = async (id) => {
    console.log(id)
    const response = await addIp({ branch_id: id, ip_address: ipAddress });
    if (response?.data?.status) {
      setIpAddress("")
      successAlert(response?.data?.message)
    } else {
      console.log(response)
      setIpAddressErr(response?.error?.data?.errors?.ip_address)
      setAddIpApiErr(response?.error?.data?.error?.message)
    }
  }

  const handleCreateBranch = async () => {
    const response = await addBranch({ name: branchName, location: branchLocation })
    if (response?.data?.status) {
      setBranchname("")
      setBranchLocation("")
      successAlert(response?.data?.message)
    } else {
      console.log(response)
      setCreateApierr(response?.data?.errors?.message)
      setBranchNameErr(response?.error?.data?.errors?.name)
      setBranchLocationErr(response?.error?.data?.errors?.location);
    }
  }

  const handleBranhNamechange = (value) => { 
    if (value?.length > 250) {
      setBranchNameErr("max length exceeded")
      return
    }
    setBranchname(value);
    
    if (value == "") {
      setBranchNameErr("Branch name is required")
    } else {
      setBranchNameErr("");
    }
  }

  const handleBranhLocationchange = (value) => {
      if (value?.length > 250) {
        setBranchLocation("max length exceeded");
        return;
      }
      setBranchLocation(value);
      if (value == "") {
        setBranchLocationErr("Branch location is required");
      } else {
        setBranchLocationErr("");
      }
    };

  return (
    <>
      {isLoading && <Loader />}
      {addBranchLaoding && <Loader />}
      {deleteLoading && <Loader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 h4">Branches </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Configurations</a>
                        </li>
                        <li className="breadcrumb-item active">Branches</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="card" id="tasksList">
                <div className="card-header border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1 h5">
                      Add New Branch
                    </h5>
                  </div>
                </div>
                <div className="card-body border border-dashed border-end-0 border-start-0">
                  <form className="add_branch_form">
                    <div className="row g-3">
                      <div className="col-xxl-4 col-lg-4 col-sm-12">
                        <div className="form-icon right">
                          <input
                            type="text"
                            className="form-control bg-light border-light validBranch"
                            name="name"
                            maxLength={250}
                            value={branchName}
                            onChange={(e) =>
                              handleBranhNamechange(e?.target?.value)
                            }
                            placeholder="Enter Branch Name"
                          />
                          <i className="mdi mdi-office-building search-icon"></i>
                        </div>
                        <p className="text-red-600">{branchNameErr}</p>
                        <span className="error fs-12 text-danger name-error"></span>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-xxl-4 col-lg-4 col-sm-12">
                        <div className="form-icon right">
                          <input
                            type="text"
                            className="form-control search bg-light border-light validLocation"
                            name="location"
                            value={branchLocation}
                            onChange={(e) =>
                              handleBranhLocationchange(e?.target?.value)
                            }
                            placeholder="Enter Branch Location"
                          />
                          <i className="mdi mdi-office-building-marker search-icon"></i>
                        </div>
                        <p className="text-red-600">{branchLocationErr}</p>
                        <span className="error fs-12 text-danger location-error"></span>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-xxl-2 col-lg-3 col-sm-4">
                        <button
                          type="button"
                          className="btn btn-primary w-auto btn-sm mt-2 addBranch bg-[#687cfe]"
                          onClick={() => handleCreateBranch()}
                          disabled={branchName == "" || branchLocation == ""}
                        >
                          {" "}
                          <i className="ri-add-line align-bottom me-1"></i>Add
                          Branch
                        </button>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    <p className="text-red-600">{createApiErr}</p>
                    {/* <!--end row--> */}
                  </form>
                </div>
              </div>
              <div className="row gy-2 mb-2" id="main_tab">
                <div class="col-xl-9 " is="list_tab">
                  <div className="row refresh_branches">
                    {branchesList?.data?.branches?.map((branch, ind) => (
                      <div key={ind} className="col-md-4 col-lg-4">
                        <div className="card card-animate">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-8">
                                <p className="fw-medium text-muted mb-0 text-capitalize">
                                  {branch?.name}
                                </p>
                                <h4 className="mt-0 ff-secondary fw-semibold text-capitalize h4">
                                  <span className=" capitalize">
                                    {branch?.location}
                                  </span>
                                </h4>
                                <p className="mb-0 text-muted">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm waves-effect waves-light manageIP bg-[#ff7f5d]"
                                    data-id="2"
                                    onClick={() => handleManageIps(branch?.id)}
                                  >
                                    <i className="mdi mdi-earth"></i> Manage
                                    IP&apos;s
                                  </button>
                                </p>
                              </div>
                              <div className="col-lg-4 m-auto">
                                <button
                                  type="button"
                                  className="btn btn-soft-success waves-effect waves-light btn-sm editBranch bg-[#3bee9725]"
                                  data-id="2"
                                  name="button"
                                  onClick={() => handleEditBranch(branch)}
                                >
                                  <i className="mdi mdi-square-edit-outline "></i>{" "}
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-soft-danger waves-effect waves-light btn-sm mt-2 deleteBranch bg-[#ee3b3b25]"
                                  data-id="2"
                                  name="button"
                                  onClick={() => handleDeleteBranch(branch?.id)}
                                >
                                  <i className="mdi mdi-trash-can"></i> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="progress animated-progress rounded-bottom rounded-0 h-[3px]">
                            <div
                              className="progress-bar bg-secondary rounded-0 w-[100%]"
                              role="progressbar"
                              aria-valuenow="100"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {manageIpLoading && (
                  <div className="col-xl-3 pulse">
                    <Loader />
                  </div>
                )}
                {deleteIpLoading ||
                  (addIpLoading && (
                    <div className="col-xl-3 pulse">
                      <Loader />
                    </div>
                  ))}

                {showManageIps && (
                  <div className="col-xl-3 pulse" id="view_tab">
                    {manageIpLoading && <Loader />}
                    <div className="sticky-side-div">
                      <div className="card">
                        <div className="card-header border-bottom-dashed d-flex justify-content-between align-items-center">
                          <h5 className="card-title mb-0 h5">
                            Manage IP Addresses
                          </h5>
                          <p
                            className="text-muted font-bold mb-0 cursor-pointer "
                            onClick={() => handleCloseManageIps()}
                          >
                            X
                          </p>
                        </div>
                        <div className="card-body pt-2">
                          <div className="row">
                            <div className="col-lg-6 border-end border-bottom">
                              <label
                                htmlFor=""
                                className="form-label text-muted mb-1"
                              >
                                Branch Name
                              </label>
                              <h6 className="h6">
                                {manageIpData?.data?.branch?.name}
                              </h6>
                            </div>
                            <div className="col-lg-6 border-bottom">
                              <label
                                htmlFor=""
                                className="form-label text-muted mb-1"
                              >
                                Branch Location
                              </label>
                              <h6 className="h6">
                                {manageIpData?.data?.branch?.location}
                              </h6>
                            </div>
                          </div>
                          <form className="addIp_form">
                            <div className="row">
                              <div className="col-lg-12 mt-3">
                                <p className="h5 p-3 bg-slate-50">
                                  Add IP Address
                                </p>
                              </div>

                              <input type="hidden" name="branch_id" value="1" />
                              <div className="col-lg-8 mt-3">
                                <input
                                  type="text"
                                  className="form-control validIP"
                                  name="ip_address"
                                  id="placeholderInput"
                                  value={ipAddress}
                                  onChange={(e) =>
                                    handleIpAddressChange(e?.target?.value)
                                  }
                                  placeholder="Enter IP Address"
                                />
                                <span className="error fs-12 text-danger ip_address-error">{ipAddressErr}</span>
                              </div>

                              <div className="col-lg-4 mt-3">
                                <button
                                  type="button"
                                  className="btn btn-md btn-success w-100 addIP bg-[#3cd188]"
                                  name="button"
                                  onClick={() =>
                                    handleAddIp(manageIpData?.data?.branch?.id)
                                  }
                                >
                                  <i className="mdi mdi-earth"></i> Add IP
                                </button>
                                <p>{addIpApiErr}</p>
                              </div>
                            </div>
                          </form>

                          <div className="row refresh_ips">
                            <div className="col-lg-12 mt-3">
                              <h5 className="h5">IP Addresses</h5>
                              <form className="removeIp_form">
                                <SimpleBar
                                  data-simplebar
                                  className="max-h-[120px]"
                                >
                                  {manageIpData?.data?.branch?.ip_address?.map(
                                    (ip, ind) => (
                                      <div
                                        key={ind}
                                        className="form-check mb-2"
                                      >
                                        <input
                                          className="form-check-input manageipCheckbox"
                                          type="checkbox"
                                          checked={ips?.includes(
                                            ip?.id?.toString()
                                          )}
                                          onChange={() => {
                                            handleCheckboxChange(
                                              ip?.id?.toString()
                                            );
                                          }}
                                          id="formCheck0"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck0"
                                        >
                                          {ip?.ip_address}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </SimpleBar>
                              </form>

                              <button
                                type="button"
                                className={`btn ${
                                  ips?.length
                                    ? "btn-soft-danger"
                                    : "bg-danger text-white"
                                } border-0 waves-effect waves-light btn-sm mt-2 w-100  `}
                                name="button"
                                disabled={ips?.length == 0}
                                onClick={() => handleDeleteIps()}
                              >
                                <i className="mdi mdi-trash-can"></i> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <!-- end row --> */}
            </div>
            {/* <!-- container-fluid --> */}

            <div
              id="EditIpModal"
              className="modal fade hidden"
              tabIndex="-1"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            ></div>
            {/* <!-- container-fluid --> */}
          </div>
        </div>
      </div>
      <Modal onHide={handleHide} show={showModal} centered>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title h5" id="myModalLabel">
              Edit Branch
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleHide()}
            >
             X
            </button>
          </div>
          <div className="modal-body">
            {updateLoading && <Loader />}
            <form className="update_branch_form">
              <input type="hidden" name="id" value="1" />
              <div className="row">
                <div className="col-lg-12">
                  <label htmlFor="placeholderInput" className="form-label">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    maxLength={250}
                    onChange={(e) =>
                      handleUpdateBranchNameChange(e?.target?.value)
                    }
                    className="form-control validBranch"
                    name="name"
                    value={updatedName}
                    id=""
                    placeholder="Enter Branch Name"
                  />
                  <span className="error text-danger fs-12 name-uerror">
                    {updateBranchNameErr}
                  </span>
                </div>
                <div className="col-lg-12 mt-3">
                  <label htmlFor="placeholderInput" className="form-label">
                    Branch Location
                  </label>
                  <input
                    type="text"
                    maxLength={250}
                    value={updatedLocation}
                    onChange={(e) =>
                      handleUpdateBranchLocationChange(e?.target?.value)
                    }
                    className="form-control validLocation"
                    name="location"
                    id=""
                    placeholder="Enter Branch Location"
                  />
                  <span className="error text-danger fs-12 location-uerror">
                    {updateBranchLocationErr}
                  </span>
                </div>
              </div>
            </form>
          </div>
          <p className="text-red-600 px-4">{updateApiErr}</p>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light btn-sm"
              data-bs-dismiss="modal"
              onClick={() => handleHide()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-sm btn-info updateBranch bg-[#0ac7fb]"
              disabled={updatedName == "" || updatedLocation == ""}
              onClick={() => handleUpdateBranch()}
              name="button"
            >
              Update Branch
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}