import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLazyBankSettingsQuery, useVerifyBankDetailsOTPMutation, useVerifyOPTMutation } from '../../../../services/api';
import { successAlert } from '../../swAlert';
import Swal from 'sweetalert2';
import BankDetails2 from '../../profileAgreement/BankDetails2';
import { toast } from 'react-toastify';

function CompanyBankDetails({profileDetailsResp}) {
  const [change,setChange]=useState(true)
  const validationSchema = yup.object().shape({
    bankName: yup.string().required('Bank Name is required'),
    bankBranch: yup.string().required('Bank Branch is required'),
    accountNumber: yup.string().required('Account Number is required'),
    ifscCode: yup.string().required('IFSC Code is required'),
    // swiftCode: yup.string().required('Swift Code is required'),
  });
  const [verify]=useVerifyBankDetailsOTPMutation()
  const [otp,setOtp]=useState('')
  const [otp1,setOtp1]=useState('')

  const { register, handleSubmit, formState: { errors } ,setValue} = useForm({
    resolver: yupResolver(validationSchema), 
  });
  const [getBankInfo, { data: bankInfo, isLoading: bankInfoLaoding}] = useLazyBankSettingsQuery();
  const bangaloreCoords = [77.5946, 12.9716];

  
  const relativeLocations = [
      { name: 'Mysore', coords: [0.0, -0.1] },  
      { name: 'Hubli', coords: [0.2, 0.1] },  
      // Add more locations as needed
  ];
  useEffect(()=>{
getBankInfo()
  },[])
console.log(bankInfo)
  const onSubmit = (data) => {
    console.log(data);  
  };
useEffect(()=>{
  if(bankInfo?.data){
    const bank=bankInfo.data?.bank_account[0] 
    setValue("bankName", bank?.bank_name)
    setValue("bankBranch", bank?.branch_name)
    setValue("accountNumber", bank?.account_number)
    setValue("ifscCode", bank?.ifsc_code)
    // setValue("swiftCode", bank?.state)
  }
    },[bankInfo]);

    const handleVerifyOTP = async () => {
      if(otp1?.trim()==""){
        toast.error("Amount is Required")
        return
      }
          // if (verifyFor != "companyAddress" || verifyFor != "bank") {
            const response = await verify({ 
              amount: otp1,
           
            });
            if (response?.data?.status) {
            
              successAlert(response?.data?.message);
              getBankInfo()
              setOtp1()
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
        <h4 className="card-title mb-0 flex-grow-1">
          Company Bank Details
          {bankInfo?.data?.bank_account[0]?.status==2?<i
            className="mdi mdi-check-decagram text-success fs-18"
            data-toggle="tooltip"
            title="Verified"
          />:<i
          className={`mdi mdi-alert-decagram ${
            bankInfo?.data?.bank_account[0]?.status>0
              ? "text-warning"
              : "text-danger"
          } fs-18`}
          data-toggle="tooltip"
          title="Verification Pending"
        />}
        </h4>

        {bankInfo?.data?.bank_account[0]?.status==0&&    <span className="badge badge-soft-warning fs-14">Bank verification pending</span>}
    {bankInfo?.data?.bank_account[0]?.status==1&&  bankInfo?.data?.bank_account[0]?.txn_amount==null&&  <span className="badge badge-soft-info fs-14">Benificiary added</span>}
    {/* {bankInfo?.data?.bank_account[0]?.status==1&&bankInfo?.data?.bank_account[0]?.txn_amount!=null&&    <span className="badge badge-soft-info fs-14">Transaction initiated</span>} */}
    {bankInfo?.data?.bank_account[0]?.status==3 &&    <span className="badge badge-soft-info fs-14">Transaction declined</span>}
        {bankInfo?.data?.bank_account[0]?.status==1&&bankInfo?.data?.bank_account[0]?.txn_amount!=null&& <div className="d-flex align-items-center gap-2">
 {otp&& <>
 <input
    type="text"
    className="form-control  py-1"
    name="otpInput"
    placeholder="Enter Amount Credited "
    defaultValue=""
    value={otp1}
    onChange={(e)=>{ let inputValue = e.target.value;

      // Remove any non-numeric characters using regular expression
      inputValue = inputValue.replace(/\D/g, '');
  
      // Update the state with the sanitized input value
      setOtp1(inputValue);}}
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
    onClick={()=>setOtp(false)}
  >
    Cancel
  </button>
 </>
  }
{!otp&&  <>
  <span className="badge badge-soft-success fs-14">Transaction initiated</span>
  <button
    type="button"
    className="btn btn-sm btn-success verifyBtn bg-[#3cd188]"
    name="verifyButton"
    onClick={()=>setOtp(true)}
  >
    Verify amount
  </button>
  </>}
</div>
}
<div>
  
</div>
        
       {false&& <button
          type="button"
          className="btn btn-primary btn-sm ms-2 bg-[#687cfe]"
          data-bs-toggle="modal"
          data-bs-target="#bankAccounts"
        >
          Timeline
        </button>}
      </div>
      <div className="card-body">
       
        <BankDetails2 profileDetails={profileDetailsResp?.data} notEdit={bankInfo?.data?.bank_account[0]?.status==1&&bankInfo?.data?.bank_account[0]?.txn_amount==null} change={change}/>
        {(bankInfo?.data?.bank_account[0]?.status==2||bankInfo?.data?.bank_account[0]?.status==0)&&
          <div className="flex gap-3">

{         change? <div className='btn btn-primary ' onClick={()=>setChange(false)}>Change</div>:
            <div className='btn btn-outline-danger ' onClick={()=>setChange(true)}>Cancel</div>}
          </div>
          
          }
      </div>
    </div>
  );
}

export default CompanyBankDetails;
