import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUpdateStaffMutation } from '../../../../services/api';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function ChangePassword() {
  const { register, handleSubmit, formState: { errors },watch ,trigger,setValue} = useForm({
    resolver: yupResolver(schema)
  });
  const {id}=useParams()
  const [updateStaff,{loading:update}]=useUpdateStaffMutation()
  const onSubmit = async(data) => {
    const res=await  updateStaff({
        staff_id:id,
        current_password: data.currentPassword,
        new_password:data?.newPassword,
        confirm_password:data?.confirmPassword,
       
        type:'password',
    })
 
    if(res?.data?.status){
        
        Swal.fire({
         title: "Success",
         text: res?.data?.message,
         icon: "success"
       }).then((result) => {
         if (result.isConfirmed) {
        //  refetch()
         }
       })
       setValue("confirmPassword", '')
       setValue("currentPassword", '')
       setValue("newPassword", '')
      }else{
        toast.error(res?.error?.data?.message)
        if(res?.error?.data?.errors?.current_password){
            toast.error(res?.error?.data?.errors?.current_password)
            }
      }

  };
  const pass=watch("newPassword");
  const pass1=watch("confirmPassword");
  useEffect(()=>{
    if(pass){

      trigger("confirmPassword")
    }
  },[pass1,pass])
  const [mask,setMask] = useState(false);
  const [mask2,setMask2] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12 col-lg-4">
          <div>
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <div className="form-icon">
              <input type="password" className="form-control form-control-icon" id="currentPassword" placeholder="Enter Current Password" {...register('currentPassword')} />
            </div>
            <p className="text-danger">{errors.currentPassword?.message}</p>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div>
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <div className="form-icon">
              <input  type={mask2 ? "text" : "password"} className="form-control form-control-icon" id="newPassword" placeholder="Enter New Password" {...register('newPassword')} />
              <button
                              onClick={() => setMask2(!mask2)}
                              className="btn btn-link absolute top-[12px] right-4 text-muted "
                              type="button"
                              id="password-addon"
                            >
                              <i
                                className={`${
                                  mask2
                                    ? "ri-eye-off-fill"
                                    : "ri-eye-fill"
                                }  align-middle`}
                              ></i>
                            </button>
            </div>
            <p className="text-danger">{errors.newPassword?.message}</p>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="form-icon">
              <input  type={mask ? "text" : "password"} className="form-control form-control-icon" id="confirmPassword" placeholder="Re-enter Password" {...register('confirmPassword')} />
              <button
                              onClick={() => setMask(!mask)}
                              className="btn btn-link absolute top-[12px] right-4 text-muted "
                              type="button"
                              id="password-addon"
                            >
                              <i
                                className={`${
                                  mask
                                    ? "ri-eye-off-fill"
                                    : "ri-eye-fill"
                                }  align-middle`}
                              ></i>
                            </button>
            </div>
            <p className="text-danger">{errors.confirmPassword?.message}</p>
          </div>
        </div>
        {/* <div className="col-12 col-lg-4 mt-3">
          <div>
            <label htmlFor="otp" className="form-label">OTP</label>
            <div className="form-icon">
              <input type="text" className="form-control form-control-icon" id="otp" placeholder="Enter OTP" {...register('otp')} />
            </div>
            <p className="text-danger">{errors.otp?.message}</p>
          </div>
        </div> */}
        <div className="col-12 mt-3">
        {!update&& <button type="submit" className="btn btn-primary bg-primary waves-effect waves-light">
            <i className="mdi mdi-content-save"></i> Save
          </button>}
          {update&&<button className="btn btn-outline-primary btn-load">
            <span className="d-flex align-items-center">
              <span className="flex-grow-1 me-2">Please Wait...</span>
              <span className="spinner-border flex-shrink-0" role="status">
                <span className="visually-hidden">Please Wait...</span>
              </span>
            </span>
          </button>}
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
