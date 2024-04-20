/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "./pa.css";
import { useForm } from "react-hook-form";
import axios from "axios"
import { Form } from "react-bootstrap";

// Import the necessary plugins
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useProfileUpdateMutation, useUploadAttachmentMutation } from "../../../services/api";
import Loader from "../Loader";
import swAlert, { successAlert } from "../swAlert";
import GLightbox from "glightbox";
import Swal from "sweetalert2";

export default function ProfileDetails2({
  handleActiveForm,
  profileDetails,adding,change,refetch,second,everything ,notEdit,updated
}) {
  console.log(profileDetails)
  const [image, setImage] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [profileImgErr, setProfileImgErr] = useState("");
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileErr, setFileErr] = useState("");
  const [fileuploadErr, setFileuploadErr] = useState("");
  const [apiErr, setApiErr] = useState("");
  const [aadhaarImg, setAadhaarImg] = useState(null)
  const [usePrevProof, setUsePrevProof] = useState(false);

  const [
    updateProfile,
    { data: updateProfileRes, isLoading: updateprofileLoading },
  ] = useProfileUpdateMutation();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    console.log(profileDetails)
    if (profileDetails?.profile_info?.customer?.id||profileDetails?.profile_info?.profile_details?.id)
      setValue("name",profileDetails?.profile_info?.profile_details?.name?profileDetails?.profile_info?.profile_details?.name: profileDetails?.profile_info?.customer?.first_name+" "+profileDetails?.profile_info?.customer?.last_name);
    setValue("email", profileDetails?.profile_info?.profile_details?.email?profileDetails?.profile_info?.profile_details?.email:profileDetails?.profile_info?.customer?.email);
    setValue("phone", profileDetails?.profile_info?.profile_details?.phone?profileDetails?.profile_info?.profile_details?.phone:profileDetails?.profile_info?.customer?.phone);
    setValue("address", profileDetails?.profile_info?.profile_details?.address?profileDetails?.profile_info?.profile_details?.address:profileDetails?.profile_info?.customer?.address);
    setValue("city", profileDetails?.profile_info?.profile_details?.city?profileDetails?.profile_info?.profile_details?.city:profileDetails?.profile_info?.customer?.city);
    setValue("state", profileDetails?.profile_info?.profile_details?.state?profileDetails?.profile_info?.profile_details?.state:profileDetails?.profile_info?.customer?.state);
    setValue("country", profileDetails?.profile_info?.profile_details?.country?profileDetails?.profile_info?.profile_details?.country:profileDetails?.profile_info?.customer?.country);
    setValue("zip", profileDetails?.profile_info?.profile_details?.zip?profileDetails?.profile_info?.profile_details?.zip:profileDetails?.profile_info?.customer?.zip);
    setValue("aadhaar_no",profileDetails?.profile_info?.profile_details?.aadhaar_number?profileDetails?.profile_info?.profile_details?.aadhaar_number:profileDetails?.profile_info?.aadhaar_number);
    setImage(profileDetails?.profile_info?.profile_details?.profile_image?profileDetails?.profile_info?.profile_details?.profile_image:profileDetails?.profile_info?.profile_image);
    setAadhaarImg(profileDetails?.profile_info?.profile_details?.aadhaar_proof
?profileDetails?.profile_info?.profile_details?.aadhaar_proof
:profileDetails?.profile_info?.aadhaar_proof);
  }, [profileDetails])
  
  useEffect(() => {
    if (aadhaarImg) {
      setUsePrevProof(true)
    }
  },[aadhaarImg])

  useEffect(() => {
    setTimeout(() => {
      setFileErr("");
    }, 3000);
  }, [fileErr]);

  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
      }, 2000);
    }
  }, [apiErr]);

  const zipcode = watch("zip");

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
      if (err?.response?.status == 401) {
        window.location.href = "/signin";
      }
    }
  };

  useEffect(() => {
    if (zipcode?.length == 6) {
      console.log(zipcode, "billingzip");
      fetchCSC(zipcode, "billing");
    }
  }, [zipcode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image')) {
        setProfileImgErr("Only image files are allowed");
        return;
      }
      setProfileImgErr("");
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader?.result);
        setImgFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (files) => {
    if (files.length > 0) {
      const uploadedFile = files[0];
      if (uploadedFile.fileSize <= 2000000) {
        // 2MB in bytes
        setFile(uploadedFile);
        setIsUploaded(true);
        setFileErr("");
      } else {
        // Reset file and show error message
        setFile(null);
        setIsUploaded(false);
        setFileErr("Aadhaar proof is required");

        setFileuploadErr("File size should be within 2MB");
      }
    }
  };

   const openImg = (attachment, index) => {
     const lbElements = attachment?.map((attachment, ind) => {
       return { href: attachment.attachment };
     });
     const myGallery = GLightbox({
       elements: lbElements,
       autoplayVideos: false,
       index: index,
     });
     console;
     myGallery.openAt(index);
   };


  const formSubmit = async (data, e) => {
 

 
    e.preventDefault();
    clearErrors();
    if (!file && !usePrevProof) {
      return setFileErr("Aadhaar proof is required");
    }
    if (
      !imgFile &&
      !profileDetails?.profile_info?.profile_details?.profile_image
    ) {
      return setProfileImgErr("Profile image is required");
    }

    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);
    formData.append("address", data?.address);
    formData.append("zip", data?.zip);
    formData.append("city", data?.city);
    formData.append("state", data?.state);
    formData.append("country", data?.country);
    formData.append("aadhaar_number", data?.aadhaar_no);
    formData.append("type", "update");
    if (!usePrevProof) {
      formData.append("aadhaar_proof", file?.file, file?.filename);
    }
    
    if (
      imgFile != null
    ) {
      formData.append("profile_image", imgFile, imgFile?.name);
    }

    const response = await updateProfile(formData);
    if (response?.data?.status) {
      successAlert(response?.data?.message)
      setTimeout(()=>{
        window.location.reload()
             },2000)
    } else if (response?.error?.data?.errors != {}) {
      Swal.fire({
        title: "Error",
        text: response?.error?.data?.message,
        icon: "error",
      });

      setError("name", {
        type: "apierr",
        message: response?.error.data?.errors?.name,
      });
      setError("email", {
        type: "apierr",
        message: response?.error.data?.errors?.email,
      });
      setError("phone", {
        type: "apierr",
        message: response?.error.data?.errors?.phone,
      });
      setError("city", {
        type: "apierr",
        message: response?.error.data?.errors?.city,
      });
      setError("state", {
        type: "apierr",
        message: response?.error.data?.errors?.state,
      });
      setError("zip", {
        type: "apierr",
        message: response?.error.data?.errors?.zip,
      });
      setError("aadhaar_no", {
        type: "apierr",
        message: response?.error.data?.errors?.aadhaar_number,
      });
      setFileErr(response?.error.data?.errors?.aadhaar_proof);
    } else if (response?.error?.data?.message) {
      Swal.fire({
        title: "Error",
        text: response?.error?.data?.message,
        icon: "error",
      });
      setApiErr(response?.error?.data?.message);
    }

    // Handle form submission here
    // console.log(addEnq.current.click())
  };
  return (
    <div className="tab-pane pulse">
      {updateprofileLoading && <Loader />}
      <div className="flex items-center justify-start gap-3">
        <div className="w-25 md:w-50  mx-auto text-center">
          <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => <Tooltip {...props}>Upload profile</Tooltip>}
            placement="bottom"
          >
            <label htmlFor="profile-upload" className="d-block">
              {image ? (
                <img
                  src={image}
                  alt="user-img"
                  className="img-thumbnail rounded-circle object-cover w-24 h-24 "
                />
              ) : (
                <div className="p-3 rounded-full border w-24 h-24">
                  <i className="ri-user-line"></i>
                  <br />
                  <span className="rounded-full text-xs">Upload Profile</span>
                </div>
              )}
              <p className="text-red-600 text-xs text-center mt-2 mb-0 pb-0">
                {profileImgErr}
              </p>
            </label>
          </OverlayTrigger>
          {<input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            disabled={notEdit?notEdit:everything?!everything:change}
          />}
        </div>
        <div>
          <h5 className="h2"> Profile details</h5>
          <p className="text-xs">
            Complete your profile by providing essential details. This
            information helps us personalize your experience and ensures you get
            the most out of our services.
          </p>
        </div>
      </div>
      <hr />
      <div className="text-muted mt-3">
        <div className="" id="arrow-personal-profile" role="tabpanel">
          <div className="row">
            <div className="col-md-12">
              <Form className="profileForm">
                <div className="row">
                  <div className="col-xl-4 col-md-6">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control profileagreement-form-control"
                      {...register("name", {
                        required: true,
                        message: "Name is required",
                        minLength: 3,
                        maxLength: 100,
                      })}
                      disabled={notEdit?notEdit:updated?updated:everything?!everything:change}
                      placeholder="Full name"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.name?.type == "required" &&
                          "Full Name is required"}
                        {errors?.name?.type == "minLength" &&
                          "Invalid full name"}
                        {errors?.name?.type == "maxLength" &&
                          "Invalid full name"}
                        {errors?.name?.type == "apierr" &&
                          errors?.name?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control profileagreement-form-control"
                      {...register("phone", {
                        required: true,
                        message: "Number is required",
                        maxLength: 10,
                        minLength: 10,
                        pattern: /^\d{10}$/,
                      })}
                      disabled={notEdit?notEdit:everything?!everything:change}
                      placeholder="Phone Number"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.phone?.type == "required" &&
                          "Phone number is required"}
                        {errors?.phone?.type == "pattern" &&
                          "Invalid phone number"}
                        {errors?.phone?.type == "maxLength" &&
                          "Invalid phone number"}
                        {errors?.phone?.type == "minLength" &&
                          "Invalid phone number"}
                        {errors?.phone?.type == "apierr" &&
                          errors?.phone?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                    
                      className="form-control profileagreement-form-control"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                        message: "Invalid email format",
                      })}
                      disabled={true}
                      placeholder="Email Address"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.email?.type == "required" &&
                          "Email is required"}
                        {errors?.email?.type == "pattern" && "Invalid email"}
                        {errors?.email?.type == "apierr" &&
                          errors?.email?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-12 col-md-12 ">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Address
                    </label>
                    <textarea
                      name="name"
                      rows="1"
                      className="form-control profileagreement-form-control"
                      placeholder="Address"
                      {...register("address", {
                        required: true,
                        message: "Address is required",
                        maxLength: 250,
                        minLength: 15,
                      })}
                      disabled={notEdit?notEdit:everything?!everything:change}
                    ></textarea>
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.address?.type == "required" &&
                          "Address is required"}
                        {errors?.address?.type == "maxLength" &&
                          "Max 250 characters are allowed"}
                        {errors?.address?.type == "minLength" &&
                          "Invalid address"}
                        {errors?.address?.type == "apierr" &&
                          errors?.address?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-3 col-md-6 ">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control profileagreement-form-control"
                      {...register("zip", {
                        required: true,
                        message: "Zip code is required",
                        minLength: 6,
                        maxLength: 6,
                      })}
                      disabled={notEdit?notEdit:everything?!everything:change}
                      placeholder="Zip Code"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.zip?.type == "required" &&
                          "Zip code is required"}
                        {errors?.zip?.type == "minLength" && "Invalid zip code"}
                        {errors?.zip?.type == "maxLength" && "Invalid zip code"}
                        {errors?.zip?.type == "apierr" && errors?.zip?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-3 col-md-6 ">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control profileagreement-form-control"
                      {...register("city", {
                        required: true,
                        message: "City is required",
                        minLength: 3,
                        maxLength: 100,
                      })}
                      disabled={notEdit?notEdit:everything?!everything:change}
                      placeholder="City"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.city?.type == "required" && "City is required"}
                        {errors?.city?.type == "minLength" && "Invalid City"}
                        {errors?.city?.type == "maxLength" && "Invalid City"}
                        {errors?.city?.type == "apierr" &&
                          errors?.city?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-3 col-md-6 ">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control profileagreement-form-control"
                      {...register("state", {
                        required: true,
                        message: "State is required",
                        minLength: 3,
                        maxLength: 100,
                      })}
                      disabled={notEdit?notEdit:everything?!everything:change}
                      placeholder="State"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.state?.type == "required" &&
                          "State is required"}
                        {errors?.state?.type == "minLength" && "Invalid State"}
                        {errors?.state?.type == "maxLength" && "Invalid State"}
                        {errors?.state?.type == "apierr" &&
                          errors?.state?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-3 col-md-6 ">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control profileagreement-form-control"
                      {...register("country", {
                        required: true,
                        message: "Country is required",
                        minLength: 3,
                        maxLength: 100,
                      })}
                      disabled={notEdit?notEdit:everything?!everything:change}
                      placeholder="Country"
                    />
                    {
                      <span className="error text-red-600 px-2">
                        {errors?.country?.type == "required" &&
                          "Country is required"}
                        {errors?.country?.type == "minLength" &&
                          "Invalid Country"}
                        {errors?.country?.type == "maxLength" &&
                          "Invalid Country"}
                        {errors?.country?.type == "apierr" &&
                          errors?.country?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-3 col-md-6 ">
                    <label
                      htmlFor="placeholderInput"
                      className="form-label px-2"
                    >
                      Aadhaar No
                    </label>
                    <input
                      type="text"
                     
                      className="form-control profileagreement-form-control"
                      {...register("aadhaar_no", {
                        required: true,
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Aadhaar should contain only numbers",
                        },
                        minLength: 12,
                        maxLength: 15,
                      })}
                      disabled={notEdit?notEdit:updated?updated:everything?!everything:change}
                      placeholder="Aadhaar no"
                    />
                    {
                      <span className="error text-red-600 ">
                        {errors.aadhaar_no && (
  <span className="error text-red-600 px-2">
    {errors.aadhaar_no.message}
  </span>
)}
                        {errors?.aadhaar_no?.type == "required" &&
                          "Aadhaar is required"}
                        {errors?.aadhaar_no?.type == "minLength" &&
                          "Invalid Aadhaar"}
                        {errors?.aadhaar_no?.type == "maxLength" &&
                          "Invalid Aadhaar"}
                        {errors?.aadhaar_no?.type == "apierr" &&
                          errors?.aadhaar_no?.message}
                      </span>
                    }
                  </div>
                  <div className="col-xxl-9 col-md-6 ">
                    <label htmlFor="placeholderInput" className="form-label">
                      Aadhaar Upload
                    </label>
                    {!usePrevProof && (
                      <FilePond
                        id="custom-filepond"
                        labelIdle="Upload Aadhaar (Max file size 2mb)"
                        allowMultiple={false}
                        className="custom-filepond"
                        maxFiles={1}
                        onupdatefiles={handleFileChange}
                        // required={true}
                        acceptedFileTypes={
                          "image/jpg,image/jpeg,image/png,image/webp,application/pdf"
                        }
                        allowFileTypeValidation
                        maxFileSize="2MB"
                      />
                    )}
                    {!usePrevProof && aadhaarImg && (
                      <>
                        <small
                          className="alert relative right-0 p-1 alert-secondary cursor-pointer float-right font-semibold"
                          onClick={() => {
                            setUsePrevProof(!usePrevProof);
                          }}
                        >
                          Use previously uploaded proof
                        </small>
                      </>
                    )}
                    {usePrevProof && (
                      <>
                        {((everything?everything:!change)&&(!notEdit&&!updated))&&<button
                      onClick={() => {
                        setUsePrevProof(!usePrevProof);
                      }}
                      className="absolute top-0 left-36 bg-primary text-white px-2  rounded"
                    >
                     Reset
                    </button>}
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <div className="avatar-title bg-light text-secondary rounded fs-24">
                                <i className={`ri-file-pdf-line`}></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <h5 className="fs-13 mb-1 h5">
                              <a
                                onClick={() =>
                                  openImg(
                                    [
                                      {
                                        attachment: aadhaarImg,
                                      },
                                    ],
                                    0
                                  )
                                }
                                className="text-body text-truncate d-block cursor-pointer"
                              >
                                Aadhaar Proof
                                {/* {attachment?.filetype} */}
                              </a>
                            </h5>
                          </div>
                        </div>
                      </>
                    )}
                    <p className="text-red-600 text-start">{fileErr}</p>
                  </div>
                </div>

                {apiErr && <div className="my-4 text-center">
                  <p className="text-red-600 text-start">{apiErr}</p>

                  {/* <button type="submit" className="custom-btn btn-16">
                    <i className="mdi mdi-content-save "></i> Continue
                  </button> */}
                  {/* <button className="btn btn-outline-primary btn-load">
          <span className="d-flex align-items-center">
            <span className="flex-grow-1 me-2">Please Wait...</span>
            <span className="spinner-border flex-shrink-0" role="status">
              <span className="visually-hidden">Please Wait...</span>
            </span>
          </span>
        </button> */}
                </div>}
                <div className="d-flex align-items-start justify-between gap-3 ">
  <p> <b>Note:</b> Once you request an address update, we will send a unique Postal OTP to your registered address.   Only after successful verification of   your address will the withdrawal feature be enabled. </p>
                  {(everything?everything:!change)&&<button
                    type="submit"
                    className="btn btn-success bg-success btn-label right ms-auto "
                    onClick={handleSubmit(formSubmit)}
                  >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                  Update
                  </button>}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
