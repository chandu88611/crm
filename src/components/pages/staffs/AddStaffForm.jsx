import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateStaffMutation, useUpdateStaffMutation } from '../../../services/api';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Select from 'react-select';

 

const schema = yup.object().shape({
  fullName: yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed').min(3, 'Full Name should be at least 2 characters')
    .max(50, 'Full Name should not exceed 50 characters')
    .required('Full Name is required'),
  emailInput: yup.string().email().required('Email is required'),
  mobileInput: yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').min(8, 'Mobile Number should be at least 10 digits')
    .max(15, 'Mobile Number should not exceed 15 digits')
    .required('Mobile Number is required'),
  extension: yup.string().required('Extension is required'),
  enquiryLimit: yup.number().required('Enquiry Limit is required'),
  password: yup.string(),
});

function AddStaffForm({setAdd,extensions,refetch,staffData}) {
  console.log(staffData)
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
 
  const [addEnquiry, { loading, success, response }] = useCreateStaffMutation();
  const [updateStaff,{loading:update}]=useUpdateStaffMutation()
  const onSubmit =async (data) => {
    console.log(data.branch)
    if(data.branch.length<1){
      toast?.error("Select Branch")
      return
    }
 if(!staffData?.id){

   try{

       const res=await  addEnquiry({
              name: data.fullName,
              email:data?.emailInput,
              phone:data.mobileInput,
              ext_id:data?.extension,
              enq_limit:data.enquiryLimit,
              branch_id:data?.branch?.map((data)=>data?.value),
              password:data.password,
          })
          console.log(res);
          if(res?.data?.status){
              setAdd(false)
              Swal.fire({
               title: "Success",
               text: res?.data?.message,
               icon: "success"
             }).then((result) => {
               if (result.isConfirmed) {
               refetch()
               }
             });
          }else{
      if(res?.data?.errors?.email){
      toast.error(res?.data?.errors?.email[0])
      }
      if(res?.data?.errors?.phone){
          toast.error(res?.data?.errors?.phone[0])
      
      }
      
      if(res?.error?.data?.errors?.ext_id){
          toast.error(res?.error?.data?.errors?.ext_id[0])
      
      }
          }
   }catch(e){
       console.log(e)
   }
 }else{
  const res=await  updateStaff({
    staff_id:staffData.id,
    name: data.fullName,
    email:data?.emailInput,
    phone:data.mobileInput,
    ext_id:data?.extension,
    enq_limit:data.enquiryLimit,
    branch_id:data.branch,
    password:data.password,
})
console.log(res);
if(res?.data?.status){
    setAdd(false)
    Swal.fire({
     title: "Success",
     text: res?.data?.message,
     icon: "success"
   }).then((result) => {
     if (result.isConfirmed) {
     refetch()
     }
   })
  }
 }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name <span className="text-danger">*</span>
          </label>
          <div className="form-icon right">
            <Controller
              name="fullName"
              control={control}
              defaultValue={staffData?.name || ''}
              render={({ field }) => (
                <input
                  type="text"
                  className={`form-control ${errors?.fullName ? 'is-invalid' : ''}`}
                  id="fullName"
                  placeholder="Enter name"
                  {...field}
                />
              )}
            />
            {errors?.fullName && <span className="invalid-feedback">{errors?.fullName.message}</span>}
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <div className="form-icon right">
            <Controller
              name="emailInput"
              control={control}
              defaultValue={staffData?.email || ''}
              render={({ field }) => (
                <input
                  type="email"
                  className={`form-control form-control-icon ${errors?.emailInput ? 'is-invalid' : ''}`}
                  id="emailInput"
                  placeholder="Enter email"
                  {...field}
                />
              )}
            />
            {errors?.emailInput && <span className="invalid-feedback">{errors?.emailInput.message}</span>}
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="mobileInput" className="form-label">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <div className="form-icon right">
            <Controller
              name="mobileInput"
              defaultValue={staffData?.phone || ''}
              control={control}
              render={({ field }) => (
                <input
                  type="mobile"
                  className={`form-control ${errors?.mobileInput ? 'is-invalid' : ''}`}
                  id="mobileInput"
                  placeholder="Enter Mobile Number"
                  {...field}
                />
              )}
            />
            {errors?.mobileInput && <span className="invalid-feedback">{errors?.mobileInput.message}</span>}
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="branch" className="form-label">
            Branch <span className="text-danger">*</span>
          </label>
          <div className="form-icon right">
          

          <Controller
  name="branch"
  defaultValue={staffData?.branch_id || []}
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      isMulti
      options={extensions?.data?.branches.map(option => ({
        value: option.id.toString(),  
        label: option.name
      }))}
   
    />
  )}
/>
            {errors?.branch && <span className="invalid-feedback">{errors?.branch.message}</span>}
          </div>
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="extension" className="form-label">
            Extension <span className="text-danger">*</span>{" "}
          </label>
          <div className="form-icon right">
            <Controller
              name="extension"

              control={control}
              render={({ field }) => (
                <select
                  className={`form-control ${errors?.extension ? 'is-invalid' : ''}`}
                  {...field}
                >
                  <option value="">Select Extension</option>
                  {extensions?.data?.extensions.map(option => (
                    <option key={option.id} value={option.id}>{option.ext_number}</option>
                  ))}
                </select>
              )}
            />
            {errors?.extension && <span className="invalid-feedback">{errors?.extension.message}</span>}
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="enquiryLimit" className="form-label">
            Enquiry Limit <span className="text-danger">*</span>
          </label>
          <div className="form-icon right">
            <Controller
              name="enquiryLimit"
              defaultValue={staffData?.enq_limit || ''}
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  className={`form-control ${errors?.enquiryLimit ? 'is-invalid' : ''}`}
                  id="enquiryLimit"
                  placeholder="Enter Enquiry Limit"
                  {...field}
                />
              )}
            />
            {errors?.enquiryLimit && <span className="invalid-feedback">{errors?.enquiryLimit.message}</span>}
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label htmlFor="password" className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <div className="form-icon right">
            <Controller
              name="password"
              // defaultValue={staffData?.password || ''}
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Enter Password"
                  {...field}
                />
              )}
            />
            {errors?.password && <span className="invalid-feedback">{errors?.password.message}</span>}
          </div>
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="btn btn-primary bg-[#687cfe]"
            id="sa-success"
          >
           {loading?<CircularProgress size={20} sx={{color:"white"}}/>:"Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddStaffForm;
