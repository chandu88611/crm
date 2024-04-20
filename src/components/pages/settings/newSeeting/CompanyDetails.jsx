import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetProfileDetailsQuery, useLazyCompanySettingsQuery, useVerifyCompanyOPTMutation, useVerifyOPTMutation, useVerifyProfileOPTMutation } from '../../../../services/api';
import { successAlert } from '../../swAlert';
import { toast } from 'react-toastify';
import { Box, Modal } from '@mui/material';
import CompanyDetails from '../../profileAgreement/CompanyDetails';
import ProfileDetails from '../../profileAgreement/ProfileDetails';
import Swal from 'sweetalert2';
import CompanyDetails2 from '../../profileAgreement/CompanyDetails2';
import ProfileDetails2 from '../../profileAgreement/ProfileDetails2';

function CompanyDetails1({profileDetailsResp}) {
 
const [change,setChange]=useState(true)
const [change1,setChange1]=useState(true)
const [verifyCompanyOtp]=useVerifyCompanyOPTMutation()
const [verifyProfileOtp]=useVerifyProfileOPTMutation()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    p: 4,
  };
  const [tab,setTab]=useState("personal")
  const [getCompanyInfo, { data: companyInfo, isLoading: companyInfoLaoding }] = useLazyCompanySettingsQuery()

  const [verify, { data: verifyResp, isLoading }] = useVerifyOPTMutation();
 
  useEffect(()=>{
getCompanyInfo()
  },[])
  const [otp,setOtp]=useState('')
  const [otp1,setOtp1]=useState('')
  const [otp2,setOtp2]=useState('')
  const [otp3,setOtp3]=useState('')
  const [add,setAdd]=useState('')
  
  const validationSchema = yup.object().shape({
    companyName: yup.string().required('Company Name is required'),
    emailAddress: yup.string().email('Invalid email address').required('Email Address is required'),
    mobileNumber: yup.string().matches(/^[0-9]+$/, 'Mobile number must contain only digits').required('Mobile Number is required'),
    address: yup.string().required('Address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    pinCode: yup.string().matches(/^[0-9]+$/, 'PIN Code must contain only digits').required('PIN Code is required'),
  });

  const { register, handleSubmit, formState: { errors } ,setValue} = useForm({
    resolver: yupResolver(validationSchema), 
  });

  const onSubmit = (data) => {
    console.log(data);  
  };

  useEffect(()=>{
if(companyInfo?.data){
  const bank=companyInfo?.data?.company_address[0] 
  setValue("companyName", bank?.name)
  setValue("emailAddress", bank?.email)
  setValue("mobileNumber", bank?.phone)
  setValue("address", bank?.address)
  setValue("state", bank?.state)
  setValue("city", bank?.city)
  setValue("pinCode", bank?.zip)
 
}
  },[companyInfo]);

  const handleVerifyOTP = async () => {
if(otp1?.trim()==""){
  toast.error("OTP is Required")
  return
}
    // if (verifyFor != "companyAddress" || verifyFor != "bank") {
      const response = await verifyCompanyOtp({ 
        otp: otp1,
        type:'address'
      });
      if (response?.data?.status) {
      
        successAlert(response?.data?.message);
        setOtp1()
        refetch()
      }
      console.log(response)
        if(response?.error?.data?.message){
          Swal.fire({
            title: "Error",
            text:response?.error?.data?.message,
            icon: "error",
          })
        }

        // err(response?.data?.message);
        // setApiErr(response?.error?.data?.message);
      
    // } else if(verifyFor == "companyAddress") {
    //   const response = await verifyCompanyAdd({ otp:otp,type: verifyFor });
    //   if (response?.data?.status) {
    //     handleClose();
    //     successAlert(response?.data?.message);
    //   } else {
    //     console.log(response);
    //     setApiErr(response?.error?.data?.message);
    //   }
    // } else if (verifyFor == "bank") {
    //   const response = await verify({ otp: otp, type: verifyFor });
    //   if (response?.data?.status) {
    //     handleClose();
    //     successAlert(response?.data?.message);
    //   } else {
    //     console.log(response);
    //     setApiErr(response?.error?.data?.message);
    //   }
    // }
  }

  const handleVerifyOTP1 = async () => {
    if(otp2?.trim()==""){
      toast.error("OTP is Required")
      return
    }
        // if (verifyFor != "companyAddress" || verifyFor != "bank") {
          const response = await verifyProfileOtp({ 
            otp: otp2,
            type:'address'
          });
          if (response?.data?.status) {
          
            successAlert(response?.data?.message);
            setOtp2()
            setTimeout(()=>{
window.location.reload();
            },2000)
          }
          console.log(response)
            if(response?.error?.data?.message){
              Swal.fire({
                title: "Error",
                text:response?.error?.data?.message,
                icon: "error",
              })
            }
    
  
      }
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="flex gap-4">
          <h4
            className={`${
              tab == "personal" && "text-primary"
            } card-title mb-0 flex-grow-1 cursor-pointer`}
            onClick={() => setTab("personal")}
          >
            Personal Details
            {profileDetailsResp?.data?.profile_info?.profile_details?.status ==
            2 ? (
              <i
                className="mdi mdi-check-decagram text-success fs-18"
                data-toggle="tooltip"
                title="Verified"
              />
            ) : (
              <i
                className={`mdi mdi-alert-decagram ${
                  profileDetailsResp?.data?.profile_info?.profile_details
                    ?.status > 0
                    ? "text-warning"
                    : "text-danger"
                } fs-18`}
                data-toggle="tooltip"
                title="Verification Pending"
              />
            )}
          </h4>
          <h4
            className={`${
              tab == "company" && "text-primary"
            } card-title mb-0 flex-grow-1 cursor-pointer`}
            onClick={() => setTab("company")}
          >
            Company Details
            {companyInfo?.data?.company_address[0]?.status == 2 ? (
              <i
                className="mdi mdi-check-decagram text-success fs-18"
                data-toggle="tooltip"
                title="Verified"
              />
            ) : (
              <i
                className={`mdi mdi-alert-decagram ${
                  companyInfo?.data?.company_address[0]?.status > 0
                    ? "text-warning"
                    : "text-danger"
                } fs-18`}
                data-toggle="tooltip"
                title="Verification Pending"
              />
            )}
          </h4>
        </div>
        {/* {companyInfo?.data?.company_address[0]?.status==0&&    <span className="badge badge-soft-warning fs-14">OTP not yet dispatched</span>} */}
        {companyInfo?.data?.company_address[0]?.status == 0 &&
          tab == "company" && (
            <span className="badge badge-soft-info fs-14">
              OTP ready to dispatch
            </span>
          )}

        {companyInfo?.data?.company_address[0]?.status == 1 &&
          tab == "company" && (
            <div className="flex flex-col">
              <div className="d-flex align-items-center gap-2">
                {otp && (
                  <>
                    <input
                      type="text"
                      className="form-control  py-1"
                      name="otpInput"
                      placeholder="Enter OTP"
                      defaultValue=""
                      value={otp1}
                      onChange={(e) => {
                        
                        let inputValue = e.target.value;
  console.log(!isNaN(inputValue))
                        // Check if the input value is a number
                        if (!isNaN(inputValue)) {
                          // Update the state only if the input is a number
                          setOtp1(inputValue);
                        }
                      
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-success cancelBtn bg-success"
                      name="cancelButton"
                      onClick={handleVerifyOTP}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger cancelBtn bg-[#f7666e]"
                      name="cancelButton"
                      onClick={() => setOtp(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {!otp && (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="badge badge-soft-success fs-14">
                        OTP has been dispatched
                      </span>
                      <p className="badge badge-soft-info fs-12">
                        Consignment No{" "}
                        {companyInfo?.data?.company_address[0]?.consignment_no}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-success verifyBtn bg-[#3cd188]"
                      name="verifyButton"
                      onClick={() => setOtp(true)}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        {/* personal */}
        {profileDetailsResp?.data?.profile_info?.profile_details?.status == 0 &&
          tab == "personal" && (
            <span className="badge badge-soft-info fs-14">
              OTP ready to dispatch
            </span>
          )}

        {profileDetailsResp?.data?.profile_info?.profile_details?.status == 1 &&
          tab == "personal" && (
            <div className="flex flex-col">
              <div className="d-flex align-items-center gap-2">
                {otp3 && (
                  <>
                    <input
                      type="text"
                      className="form-control  py-1"
                      name="otpInput"
                      placeholder="Enter OTP"
                      defaultValue=""
                      value={otp2}
                      onChange={(e) =>{
                        let inputValue = e.target.value;
  console.log(!isNaN(inputValue))
                        // Check if the input value is a number
                        if (!isNaN(inputValue)) {
                          // Update the state only if the input is a number
                          setOtp2(inputValue);
                        }
                        }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-success cancelBtn bg-success"
                      name="cancelButton"
                      onClick={handleVerifyOTP1}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger cancelBtn bg-[#f7666e]"
                      name="cancelButton"
                      onClick={() => setOtp3(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {!otp3 && (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="badge badge-soft-success fs-14">
                        OTP has been dispatched
                      </span>
                      <p className="badge badge-soft-info fs-12">
                        Consignment No{" "}
                        {
                          profileDetailsResp?.data?.profile_info
                            ?.profile_details?.consignment_no
                        }
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-success verifyBtn bg-[#3cd188]"
                      name="verifyButton"
                      onClick={() => setOtp3(true)}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        {/* {!companyInfo&& 
<div className='btn btn-primary mb-2 ' onClick={()=>setAdd(true)}>Add New Company</div>
 } */}
        {false && (
          <button
            type="button"
            className="btn btn-info btn-sm ms-2 bg-[#0ac7fb]"
            data-bs-toggle="modal"
            data-bs-target="#companyAddresses"
          >
            Timeline
          </button>
        )}
      </div>
      <div className="card-body">
        {tab == "company" &&
          (companyInfo?.data?.company_address?.length > 0 ? (
            <div>
              <CompanyDetails2
                profileDetails={profileDetailsResp?.data}
                adding={true}
                change={change}
                updated={
                  companyInfo?.data?.company_address[0]?.update_company > 0 ||
                  companyInfo?.data?.company_address[0]?.status == 2
                }
                everything={
                  companyInfo?.data?.company_address[0]?.update_company == 0 &&
                  companyInfo?.data?.company_address[0]?.status == 2
                    ? false
                    : companyInfo?.data?.company_address[0]?.update_company == 0
                }
              />
              {companyInfo?.data?.company_address[0]?.status != 1 &&
                (companyInfo?.data?.company_address[0]?.update_company > 0 ||
                  companyInfo?.data?.company_address[0]?.status == 2) && (
                  <div className="flex gap-3">
                    {change ? (
                      <div
                        className="btn btn-primary "
                        onClick={() => setChange(false)}
                      >
                        Change
                      </div>
                    ) : (
                      <div
                        className="btn btn-outline-danger "
                        onClick={() => setChange(true)}
                      >
                        Cancel
                      </div>
                    )}
                  </div>
                )}
            </div>
          ) : (
            <CompanyDetails2  adding={true}  />
          ))}

        {tab == "personal" && (
          <>
            <ProfileDetails2
              profileDetails={profileDetailsResp?.data}
              change={change1}
              everything={
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.update_profile == 0 &&
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.status == 2
                  ? false
                  : profileDetailsResp?.data?.profile_info?.profile_details
                      ?.update_profile == 0
              }
              notEdit={
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.status == 1
              }
              updated={
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.update_profile > 0 ||
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.status == 2
              }
              second={
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.status == 2
              }
            />
            {profileDetailsResp?.data?.profile_info?.profile_details?.status !=
              1 &&
              (profileDetailsResp?.data?.profile_info?.profile_details
                ?.update_profile > 0 ||
                profileDetailsResp?.data?.profile_info?.profile_details
                  ?.status == 2) && (
                <div className="flex gap-3 mt-3">
                  {change1 ? (
                    <div
                      className="btn btn-primary "
                      onClick={() => setChange1(false)}
                    >
                      Change
                    </div>
                  ) : (
                    <div
                      className="btn btn-outline-danger "
                      onClick={() => setChange1(true)}
                    >
                      Cancel
                    </div>
                  )}
                </div>
              )}
          </>
        )}
        {
          <Modal
            open={add}
            onClose={() => setAdd(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CompanyDetails adding={add} />
            </Box>
          </Modal>
        }
      </div>
    </div>
  );
}

export default CompanyDetails1;
