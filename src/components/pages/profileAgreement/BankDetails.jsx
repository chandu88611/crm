/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useBankDetailsUpdateMutation } from "../../../services/api";
import Loader from "../Loader";
import { useEffect, useState } from "react";


export default function BankDetails({ handleActiveForm, profileDetails }) {
  const [apiErr, setApiErr] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [
    updateProfile,
    { data: updateBankRes, isLoading: updateBankDetailsLoading },
  ] = useBankDetailsUpdateMutation();

      useEffect(() => {
 
        if (profileDetails?.profile_info?.bank_details?.bank_name)
          setValue(
            "bank_name",
            profileDetails?.profile_info?.bank_details?.bank_name
          );
        setValue(
          "branch_name",
          profileDetails?.profile_info?.bank_details?.branch_name
        );
        setValue(
          "account_holder_name",
          profileDetails?.profile_info?.bank_details?.account_holder_name
        );
        setValue(
          "account_number",
          profileDetails?.profile_info?.bank_details?.account_number
        );
        setValue(
          "ifsc_code",
          profileDetails?.profile_info?.bank_details?.ifsc_code
        );
        setValue("state", profileDetails?.profile_info?.bank_details?.state);
      }, [profileDetails]);

  const formSubmit = async (data, event) => {
    // Prevent the default form submission
    clearErrors();
    event.preventDefault();
if(data?.bank_name.trim() == ""){
  setError("bank_name", {
    type: "pattern",
    message: "Invalid bank name",
  });
}
if(data?.branch_name.trim() == ""){
  setError("branch_name", {
    type: "pattern",
    message: "Invalid branch name",
  });
}

if(data?.account_holder_name.trim() == ""){
  setError("account_holder_name", {
    type: "pattern",
    message:"Invalid account holder name",
  });
  return
}
    const response = await updateProfile(data);
    if (response?.data?.status) {
      handleActiveForm(3);
    } else if (response?.error?.data?.errors != {}) {
      console.log(response, response?.error.data?.errors?.email);

      setError("bank_name", {
        type: "apierr",
        message: response?.error.data?.errors?.bank_name,
      });
      setError("branch_name", {
        type: "apierr",
        message: response?.error.data?.errors?.branch_name,
      });
      setError("account_holder_name", {
        type: "apierr",
        message: response?.error.data?.errors?.account_holder_name,
      });
      setError("account_number", {
        type: "apierr",
        message: response?.error.data?.errors?.account_number,
      });
      setError("ifsc_code", {
        type: "apierr",
        message: response?.error.data?.errors?.ifsc_code,
      });
    } else if (response?.error?.data?.message) {
      setApiErr(response?.error?.data?.message);
    }

    // Handle form submission here
    // console.log(addEnq.current.click())
  };
  return (
    <div className="pulse">
      {updateBankDetailsLoading && <Loader />}
      <div className="flex items-center justify-start gap-3">
        <div>
          <h5 className="h2"> Bank details</h5>
          <p className="text-xs py-2">
            Securely input your bank details to facilitate seamless
            transactions. We prioritize your privacy and utilize encrypted
            connections to ensure the confidentiality of your financial
            information. Completing your bank details enables smooth and
            efficient payment processes, enhancing your overall experience with
            our platform.
          </p>
        </div>
      </div>
      <hr />
      <form>
        <>
          <div className="row mt-2">
            <div className="col-12 col-lg-4">
              <div>
                <label htmlFor="iconInput" className="form-label">
                  Bank Name
                </label>
                <div className="form-icon">
                  <input
                    type="text"
                    className="form-control profileagreement-form-control form-control-icon"
                    {...register("bank_name", {
                      required: true,
                      message: "Name is required",
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[a-zA-Z ]+$/,
                    })}
                    placeholder="Enter Bank name"
                  />
                  <i className="mdi mdi-bank position "></i>
                </div>
                {
                  <span className="error text-red-600 px-2">
                    {errors?.bank_name?.type == "required" &&
                      "Bank Name is required"}
                    {errors?.bank_name?.type == "minLength" &&
                      "Invalid Bank name"}
                    {errors?.bank_name?.type == "maxLength" &&
                      "Invalid Bank name"}
                    {errors?.bank_name?.type == "pattern" &&
                      "Invalid Bank name"}
                    {errors?.bank_name?.type == "apierr" &&
                      errors?.bank_name?.message}
                  </span>
                }
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div>
                <label htmlFor="iconInput" className="form-label">
                  Bank Branch
                </label>
                <div className="form-icon">
                  <input
                    type="text"
                    className="form-control profileagreement-form-control form-control-icon"
                    {...register("branch_name", {
                      required: true,
                      message: "Branch name is required",
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[a-zA-Z ]+$/,
                    })}
                    placeholder="Enter Bank Branch"
                  />
                  <i className="mdi mdi-city-variant-outline position"></i>
                </div>
                {
                  <span className="error text-red-600 px-2">
                    {errors?.branch_name?.type == "required" &&
                      "Branch Name is required"}
                    {errors?.branch_name?.type == "minLength" &&
                      "Invalid Branch name"}
                    {errors?.branch_name?.type == "maxLength" &&
                      "Invalid Branch name"}
                    {errors?.branch_name?.type == "pattern" &&
                      "Invalid Branch name"}
                    {errors?.branch_name?.type == "apierr" &&
                      errors?.branch_name?.message}
                  </span>
                }
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div>
                <label htmlFor="iconInput" className="form-label">
                  Account Holder Name
                </label>
                <div className="form-icon">
                  <input
                    type="text"
                    className="form-control profileagreement-form-control form-control-icon"
                    {...register("account_holder_name", {
                      required: true,
                      message: "Account holder name is required",
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[a-zA-Z ]+$/,
                    })}
                    placeholder="Enter Account Holder name"
                  />
                  <i className="mdi mdi-account position"></i>
                </div>
                {
                  <span className="error text-red-600 px-2">
                    {errors?.account_holder_name?.type == "required" &&
                      " Name is required"}
                    {errors?.account_holder_name?.type == "minLength" &&
                      "Invalid  name"}
                    {errors?.account_holder_name?.type == "maxLength" &&
                      "Invalid  name"}
                    {errors?.account_holder_name?.type == "pattern" &&
                      "Invalid  name"}
                    {errors?.account_holder_name?.type == "apierr" &&
                      errors?.account_holder_name?.message}
                  </span>
                }
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <div>
                <label htmlFor="iconInput" className="form-label">
                  Account Number
                </label>
                <div className="form-icon">
                  <input
                    type="text"
                    className="form-control profileagreement-form-control form-control-icon"
                    {...register("account_number", {
                      required: true,
                      message: "account_number is required",
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[0-9]+$/,
                    })}
                    placeholder="Enter Account Number"
                  />
                  <i className="mdi mdi-card-bulleted-outline position"></i>
                </div>
                {
                  <span className="error text-red-600 px-2">
                    {errors?.account_number?.type == "required" &&
                      "Account Number is required"}
                    {errors?.account_number?.type == "minLength" &&
                      "Invalid Account Number"}
                    {errors?.account_number?.type == "maxLength" &&
                      "Invalid Account Number"}
                    {errors?.account_number?.type == "pattern" &&
                      "Invalid Account Number"}
                    {errors?.account_number?.type == "apierr" &&
                      errors?.account_number?.message}
                  </span>
                }
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <div>
                <label htmlFor="iconInput" className="form-label">
                  IFSC Code
                </label>
                <div className="form-icon">
                  <input
                    type="text"
                    className="form-control profileagreement-form-control form-control-icon"
                    {...register("ifsc_code", {
                      required: true,
                      message: "ifsc_code is required",
                      minLength: 3,
                      maxLength: 20,
                      pattern: /^[a-zA-Z0-9]+$/,
                    })}
                    placeholder="Enter IFSC Code"
                  />
                  <i className="mdi mdi-card-bulleted-outline position"></i>
                </div>
                {
                  <span className="error text-red-600 px-2">
                    {errors?.ifsc_code?.type == "required" &&
                      "IFSC Code is required"}
                    {errors?.ifsc_code?.type == "minLength" &&
                      "Invalid IFSC Code"}
                    {errors?.ifsc_code?.type == "maxLength" &&
                      "Invalid IFSC Code"}
                    {errors?.ifsc_code?.type == "pattern" &&
                      "Invalid IFSC Code"}
                    {errors?.ifsc_code?.type == "apierr" &&
                      errors?.ifsc_code?.message}
                  </span>
                }
              </div>
            </div>
          </div>
          <p className="text-red-600 text-start">{apiErr}</p>
          <div className="d-flex align-items-start gap-3 mt-4">
            <button
              type="button"
              className="btn btn-light btn-label previestab"
              data-previous="v-pills-bill-address-tab"
              onClick={() => handleActiveForm(1)}
            >
              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
              Back to Company Details
            </button>
            <button
              type="submit"
              className="btn btn-success bg-success btn-label right ms-auto "
              onClick={handleSubmit(formSubmit)}
            >
              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
              Continue
            </button>
          </div>
        </>
      </form>
    </div>
  );
}