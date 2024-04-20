import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import axios from "axios";
import { useUpdateStaffMutation } from "../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const schema = Yup.object().shape({
  firstname: Yup.string()
    .required("First Name is required")
    .min(3, "Atleast 3 Characters required")
    .matches(/^[a-zA-Z ]+$/, "First name must contain only Alphabets")
    .test("no-space", "Enter Valid Name", (value) => {
      return value.trim().length > 0;
    }),
  lastname: Yup.string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z ]+$/, "Last name must contain only Alphabets")
    .test("no-space", "Enter Valid Name", (value) => {
      return value.trim().length > 0;
    }),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Atleast 10 Characters required")
    .max(15, "Maximum 15 Characters required")
    .required("Phone number is required"),
  emergencyphonenumber: Yup.string()
    .required("Emergency Phone Number is required")
    .matches(/^[0-9]+$/, "Emergency Phone number must contain only digits")
    .min(10, "Atleast 10 Characters required")
    .max(15, "Maximum 15 Characters required")
    .required("Emergency Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  Pemail: Yup.string().email("Invalid email").required("Email is required"),
  joiningdate: Yup.date()
    .required("Joining Date is required")
    .typeError("Joining Date must be a valid date"),
  designation: Yup.string().required("Designation is required").min(3, 'Designation  must be at least 3 characters').matches(/^[a-zA-Z. ]+$/, "Designation must contain only alphabets"),
  website: Yup.string().required("Website is required"),
  zip: Yup
  .string()
  .required("Zip Code is required")
  .matches(/^[0-9]+$/, "Zip code must contain only digits").min(6, "Atleast 6 Digits").max(10, "Maximum 10 Digits")
  .test("no-space", "Enter Valid Zip Code ", (value) => {
    return value.trim().length > 0;
  }),
state: Yup
  .string()
  .required("State is required")
  .matches(/^[a-zA-Z. ]+$/, "State must contain only alphabets")
  .test("no-space", "Enter Valid State", (value) => {
    return value.trim().length > 0;
  }),
city: Yup
  .string()
  .required("City is required")
  .matches(/^[a-zA-Z. ]+$/, "City must contain only alphabets")
  .test("no-space", "Enter Valid City", (value) => {
    return value.trim().length > 0;
  }),
country: Yup
  .string()
  .required("Country is required")
  .matches(/^[a-zA-Z. ]+$/, "Country must contain only alphabets")
  .test("no-space", "Enter Valid Country", (value) => {
    return value.trim().length > 0;
  }),
  address: Yup.string().required("Address is required"),
});

function PersonalDetails({ profile_Image, staffData, company }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors)
  const { id } = useParams();
  const [updateStaff, { loading: update }] = useUpdateStaffMutation();
  const onSubmit = async (data) => {
    const dateWithoutTime = new Date(data.joiningdate);
    dateWithoutTime.setHours(0, 0, 0, 0);

    dateWithoutTime.setDate(dateWithoutTime.getDate() + 1);
    const res = await updateStaff({
      staff_id:id,
      first_name: data.firstname,
      last_name: data?.lastname,
      phone: data.phonenumber,
      email: data.email,
      personal_email: data.Pemail,
      emergency_phone: data?.emergencyphonenumber,
      joining_date:  dateWithoutTime,
      designation: data.designation,
      website: data.website,
      city: data.city,
      state: data.state,
      country: data.country,
      address: data.address,
      zip: data.zip,
      profile_image: profile_Image,
      type: "profile",
    });
console.log(res)
    if (res?.data?.status) {
      Swal.fire({
        title: "Success",
        text: res?.data?.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          // refetch();
        }
      });
    } else {
  
        toast.error(res?.error?.data?.message)
if(res?.error?.data?.errors?.phone){
  
  toast.error(res?.error?.data?.errors?.phone[0]);
}
if(res?.error?.data?.errors?.emergency_phone){

  toast.error(res?.error?.data?.errors?.emergency_phone[0]);
}
if(res?.error?.data?.errors?.email){

  toast.error(res?.error?.data?.errors?.email[0]);
}
if(res?.error?.data?.errors?.personal_email){

  toast.error(res?.error?.data?.errors?.personal_email[0]);
}
    }
  };
  useEffect(() => {

    if (staffData||company) {
      setValue("firstname", staffData?.first_name || "");
      setValue("lastname", staffData?.last_name || "");
      setValue("phonenumber", staffData?.phone || "");
      setValue("emergencyphonenumber", staffData?.emergency_phone || "");
      setValue("Pemail", staffData?.email || "");
      setValue("email", company?.email || "");
      setValue("joiningdate", new Date(staffData?.joining_date) || "");
      setValue("designation", staffData?.designation || "");
      setValue("website", staffData?.website || "");
      setValue("city", staffData?.city || "");
      setValue("state", staffData?.state || "");
      setValue("country", staffData?.country || "");
      setValue("zip", staffData?.zip || "");
      setValue("address", staffData?.address || "");
    }
  }, [staffData, setValue,company]);
  const zipcode1 = watch("zipcode");
  const zipcode = watch();
console.log(zipcode)
  const fetchCSC = async (value) => {
    try {
      const response = await axios.post(
        "https://skycontroller.connetz.shop/tl-api/get-postal-code",
        { zip: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clt_token")}`,
          },
        }
      );
      console.log(response?.data);
      if (response) {
        setValue("city", response?.data?.data?.postal_data?.taluq);
        setValue("state", response?.data?.data?.postal_data?.state);
        setValue("country", response?.data?.data?.postal_data?.country);
        trigger("state");
        trigger("city");
        trigger("country");
        // setValue("country", response?.data?.data?.postal_data?.country);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (zipcode1?.length == 6) {
      fetchCSC(zipcode1, "billing");
    }
  }, [zipcode1]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="firstnameInput" className="form-label">
                First Name <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="firstnameInput"
                placeholder="Enter your firstname"
                {...register("firstname")}
              />
              <p className="text-danger">{errors.firstname?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="lastnameInput" className="form-label">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastnameInput"
                placeholder="Enter your lastname"
                {...register("lastname")}
              />
              <p className="text-danger">{errors.lastname?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="phonenumberInput" className="form-label">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="phonenumberInput"
                placeholder="Enter your phone number"
                {...register("phonenumber")}
              />
              <p className="text-danger">{errors.phonenumber?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="emergencyphonenumber" className="form-label">
                Emergency Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="emergencyphonenumber"
                placeholder="Enter emergency phone number"
                {...register("emergencyphonenumber")}
              />
              <p className="text-danger">
                {errors.emergencyphonenumber?.message}
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                {" "}
                Personal Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter your email"
                {...register("Pemail")}
              />
              <p className="text-danger">{errors.Pemail?.message}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Company Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter your email"
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label htmlFor="JoiningdatInput" className="form-label">
                Joining Date <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="joiningdate"
                render={({ field }) => (
                  <Flatpickr
                    {...field}
     

                    className="form-control bg-light border-light"
                  />
                )}
              />
              <p className="text-danger">{errors.joiningdate?.message}</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="designationInput" className="form-label">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="designationInput"
                placeholder="Designation"
                {...register("designation")}
              />
              <p className="text-danger">{errors.designation?.message}</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="websiteInput1" className="form-label">
                Website <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="websiteInput1"
                placeholder="www.example.com"
                {...register("website")}
              />
              <p className="text-danger">{errors.website?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="zipcodeInput" className="form-label">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                minLength="5"
                maxLength="6"
                id="zipcodeInput"
                placeholder="Enter zipcode"
                {...register("zip")}
              />
              <p className="text-danger">{errors.zipcode?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="cityInput1" className="form-label">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="cityInput1"
                placeholder="City"
                {...register("city")}
              />
              <p className="text-danger">{errors.city?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="stateInput1" className="form-label">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="stateInput1"
                placeholder="State"
                {...register("state")}
              />
              <p className="text-danger">{errors.state?.message}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label htmlFor="countryInput1" className="form-label">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="countryInput1"
                placeholder="Country"
                {...register("country")}
              />
              <p className="text-danger">{errors.country?.message}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3 pb-2">
              <label
                htmlFor="exampleFormControlTextarea"
                className="form-label"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea"
                placeholder="Enter your address"
                rows="3"
                {...register("address")}
              ></textarea>
              <p className="text-danger">{errors.address?.message}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className=" !ml-auto gap-2 justify-content-end">
              <button type="submit" className="btn btn-secondary bg-secondary">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
