import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useEffect, useState } from "react";
import "./pa.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCompanyDetailsUpdateMutation } from "../../../services/api";
import Loader from "../Loader";
import { Form } from "react-bootstrap";
import GLightbox from "glightbox";
import { error } from "jquery";

export default function CompanyDetails({
  handleActiveForm,
  profileDetails,
  adding,
  change,
  // refetch,
  second,
  everything,
}) {
  const [file, setFile] = useState(null);
  const [skipped, setSkipped] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileErr, setFileErr] = useState("");
  const [fileuploadErr, setFileuploadErr] = useState("");
  const [apiErr, setApiErr] = useState("");
  const [image, setImage] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [profileImgErr, setProfileImgErr] = useState("");
  const [companyNotExisted, setCompanyNotExisted] = useState(false);
  const [gstPanImg, setGstPanImg] = useState(null);
  const [usePrevProof, setUsePrevProof] = useState(false);
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFileErr("");
  //   }, 3000);
  // }, [fileErr]);
console.log(file)
  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
      }, 2000);
    }
  }, [apiErr]);

  useEffect(() => {
    console.log(companyNotExisted)
    if (companyNotExisted) {
      sessionStorage.setItem("compNotExited", true)
    }
  }, [companyNotExisted])
  
  useEffect(() => {
    const compSkip = sessionStorage.getItem("compNotExited");
    if (compSkip == "true") {
      setCompanyNotExisted(true)
    }
  }, [])
  

  useEffect(() => {

    if (
      profileDetails?.profile_info?.customer?.id ||
      profileDetails?.profile_info?.company_details?.id
    )
      setValue(
        "name",
        profileDetails?.profile_info?.company_details?.name
          ? profileDetails?.profile_info?.company_details?.name
          : profileDetails?.profile_info?.customer?.company
      );
    setValue(
      "email",
      profileDetails?.profile_info?.company_details?.email
        ? profileDetails?.profile_info?.company_details?.email
        : profileDetails?.profile_info?.customer?.email
    );
    setValue(
      "phone",
      profileDetails?.profile_info?.company_details?.phone
        ? profileDetails?.profile_info?.company_details?.phone
        : profileDetails?.profile_info?.customer?.phone
    );
    setValue(
      "address",
      profileDetails?.profile_info?.company_details?.address
        ? profileDetails?.profile_info?.company_details?.address
        : profileDetails?.profile_info?.customer?.address
    );
    setValue(
      "city",
      profileDetails?.profile_info?.company_details?.city
        ? profileDetails?.profile_info?.company_details?.city
        : profileDetails?.profile_info?.customer?.city
    );
    setValue(
      "state",
      profileDetails?.profile_info?.company_details?.state
        ? profileDetails?.profile_info?.company_details?.state
        : profileDetails?.profile_info?.customer?.state
    );
    setValue(
      "country",
      profileDetails?.profile_info?.company_details?.country
        ? profileDetails?.profile_info?.company_details?.country
        : profileDetails?.profile_info?.customer?.country
    );
    setValue(
      "zip",
      profileDetails?.profile_info?.company_details?.zip
        ? profileDetails?.profile_info?.company_details?.zip
        : profileDetails?.profile_info?.customer?.zip
    );
    setValue(
      "tax_number",
      profileDetails?.profile_info?.company_details?.tax_number
        ? profileDetails?.profile_info?.company_details?.tax_number
        : profileDetails?.profile_info?.customer?.tax_number
    );
    setImage(
      profileDetails?.profile_info?.company_details?.logo_url
        ? profileDetails?.profile_info?.company_details?.logo_url
        : profileDetails?.profile_info?.customer?.logo_url
    );
    setGstPanImg(
      profileDetails?.profile_info?.company_details?.tax_proof
        ? profileDetails?.profile_info?.company_details?.tax_proof
        : profileDetails?.profile_info?.customer?.tax_proof
    );
  }, [profileDetails]);

  useEffect(() => {
    if (gstPanImg) {
      setUsePrevProof(true);
    }
  }, [gstPanImg]);

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

  const [
    updateProfile,
    { data: updateProfileRes, isLoading: updateCompanyDetailsLoading },
  ] = useCompanyDetailsUpdateMutation();

  useEffect(() => {
    if (zipcode?.length == 6) {
      console.log(zipcode, "billingzip");
      fetchCSC(zipcode, "billing");
    }
  }, [zipcode]);

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
        setFileErr("GST/PAN proof is required");

        setFileuploadErr("File size should be within 2MB");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImgErr("");

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const aspectRatio = image.width / image.height;
          console.log(image.width, image.height, image.width / image.height);
          if (aspectRatio >= 2.2 && aspectRatio <= 4.5) {
            setImage(reader.result);
            setImgFile(file);
          } else {
            setProfileImgErr(
              "Upload image of proper size "
            );
          }
        };

        // const image = new Image();
        // image.src = reader.result;
        // image.onload = () => {
        //   console.log("Original width:", image.width);
        //   console.log("Original height:", image.height);
        //   setImage(reader.result);
        //   setImgFile(file);
        // };
        // setImage(reader?.result);
        // setImgFile(file);
      };
      reader.readAsDataURL(file);
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

  const formSubmit = async (data, event) => {
  
    clearErrors();
    event.preventDefault();
    console.log(companyNotExisted);
    if (!companyNotExisted) {
      if (!file && !usePrevProof) {
     setFileErr("GST/PAN proof is required");
      }
      if (
        !imgFile &&
        !profileDetails?.profile_info?.company_details?.tax_proof
      ) {
     setProfileImgErr("Company logo is required");
      }
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
    formData.append("tax_number", data?.tax_number);
    formData.append("skipped", skipped);
    formData.append("company", companyNotExisted ? "true" : "false");
    if (file?.filename && !usePrevProof) {
      formData.append("tax_proof", file?.file, file?.filename);
    }
    if (imgFile?.name) {
      formData.append("logo_image", imgFile, imgFile?.name);
    }

    if (!companyNotExisted) {
      sessionStorage.removeItem("compNotExited");
    }

    const response = await updateProfile(formData);
    console.log(response)
    if (response?.data?.status) {
      handleActiveForm(2);
    } else if (response?.error?.data?.errors != {}) {
      if(response?.error?.data?.message=="No Changes found."){
        handleActiveForm(2);
      }
      if(response?.error?.data?.errors.logo_image){
        setProfileImgErr(response?.error?.data?.errors.logo_image)
      }
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
      setError("tax_number", {
        type: "apierr",
        message: response?.error.data?.errors?.tax_number,
      });
    } else if (response?.error?.data?.message=="No Changes found.") {
      handleActiveForm(2);
      setApiErr(response?.error?.data?.message);
    }
  };
  console.log(errors);
  return (
    <div className="pulse">
      {updateCompanyDetailsLoading && <Loader />}

      <div className=" fade show">
        <div className="flex items-center justify-start gap-3 py-2">
          <div className={`${companyNotExisted&&" pointer-events-none "} w-25 md:w-50  mx-auto text-center `}>
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => (
                <Tooltip {...props}>Upload Company logo</Tooltip>
              )}
              placement="bottom"
            >
              <label htmlFor="profile-upload" className="d-block">
                {image ? (
                  <div className="relative !h-fit">
                    <img
                      src={image}
                      alt="user-img"
                      className=" !align-middle  mr-2 !h-[65px] rounded border max-w-[150px] "
                    />
                    <span class="headline  ">
                      <i className="mdi mdi-arrow-left absolute left-0 -bottom-[1px] text-[11px] text-[#e74c3c] "></i>
                      <p>150 px</p>{" "}
                      <i className="mdi mdi-arrow-right absolute right-0 -bottom-[1px] text-[11px] text-[#e74c3c]"></i>
                    </span>

                    <div class="headline -rotate-90 w-[70px] absolute -right-[33px] top-6">
                      <i className="mdi mdi-arrow-left absolute left-0 -top-[1px] text-[#e74c3c] text-[11px] "></i>
                      <p>65 px</p>
                      <i className="mdi mdi-arrow-right absolute right-[2px] -bottom-[0px] text-[11px] text-[#e74c3c]"></i>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    {/* <i className="ri-user-line"></i> */}
                    <br />
                    <div className="relative !h-fit">
                      <div className="rounded text-xs mr-[10px] !h-[65px] w-[150px] border flex items-center justify-center">
                        Upload logo
                      </div>
                      <span class="headline  ">
                        <i className="mdi mdi-arrow-left absolute left-0 -bottom-[1px] text-[11px] text-[#e74c3c] "></i>
                        <p>150 px</p>{" "}
                        <i className="mdi mdi-arrow-right absolute right-0 -bottom-[1px] text-[11px] text-[#e74c3c]"></i>
                      </span>

                      <div class="headline -rotate-90 w-[70px] absolute -right-[33px] top-6">
                        <i className="mdi mdi-arrow-left absolute left-0 -top-[1px] text-[#e74c3c] text-[11px] "></i>
                        <p>65 px</p>
                        <i className="mdi mdi-arrow-right absolute right-[2px] -bottom-[0px] text-[11px] text-[#e74c3c]"></i>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-red-600 text-xs text-center mt-2 mb-0 pb-0">
                  {profileImgErr}
                </p>
              </label>
            </OverlayTrigger>
            {
              <input
              disabled={companyNotExisted}
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            }
          </div>
          <div className="ml-2">
            <h5 className="h2"> Company details</h5>
            <p className="text-xs">
              "Share key information about your company to optimize your
              interaction with our platform. Provide details such as your
              company name, industry, and location. This allows us to tailor our
              services to better suit your business needs."
            </p>
          </div>
        </div>
        <hr />

        {
          <Form>
            <>
              <div className={`row mt-2 ${companyNotExisted&&" pointer-events-none "}`}>
                <div className="col-xl-4 col-md-6">
                  <label htmlFor="placeholderInput" className="form-label">
                    Name
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("name", {
                      required: companyNotExisted ? false : true,
                      message: "Name is required",
                      minLength: 3,
                      maxLength: 100,
                    })}
                    // disabled={everything?!everything:(change||second)}
                    placeholder="Full name"
                  />
                  {
                    <span className="error text-red-600 px-2">
                      {errors?.name?.type == "required" &&
                        "Full Name is required"}
                      {errors?.name?.type == "minLength" && "Invalid full name"}
                      {errors?.name?.type == "maxLength" && "Invalid full name"}
                      {errors?.name?.type == "apierr" && errors?.name?.message}
                    </span>
                  }
                </div>
                <div className="col-xl-4 col-md-6">
                  <label htmlFor="placeholderInput" className="form-label">
                    Phone Number
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("phone", {
                      required: companyNotExisted ? false : true,
                      message: "Number is required",
                      maxLength: 10,
                      minLength: 10,
                      pattern: /^\d{10}$/,
                    })}
                    // disabled={everything?!everything:change}
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
                  <label htmlFor="placeholderInput" className="form-label">
                    Email
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("email", {
                      required: companyNotExisted ? false : true,
                      pattern:
                        /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                      message: "Invalid email format",
                    })}
                    // disabled={everything?!everything:(change||second)}
                    placeholder="Email Address"
                  />
                  {
                    <span className="error text-red-600 px-2">
                      {errors?.email?.type == "required" && "Email is required"}
                      {errors?.email?.type == "pattern" && "Invalid email"}
                      {errors?.email?.type == "apierr" &&
                        errors?.email?.message}
                    </span>
                  }
                </div>
                <div className="col-xxl-12 col-md-12 ">
                  <label htmlFor="placeholderInput" className="form-label">
                    Address
                  </label>
                  <textarea
                    name="name"
                    rows="1"
                    disabled={companyNotExisted}
                    placeholder="Address"
                    className="form-control "
                    {...register("address", {
                      required: companyNotExisted ? false : true,
                      message: "Address is required",
                      maxLength: 250,
                      minLength: 5,
                    })}
                    // disabled={everything?!everything:change}
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
                  <label htmlFor="placeholderInput" className="form-label">
                    Zip Code
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("zip", {
                      required: companyNotExisted ? false : true,
                      message: "Zip code is required",
                      minLength: 6,
                      maxLength: 6,
                    })}
                    // disabled={everything?!everything:change}
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
                  <label htmlFor="placeholderInput" className="form-label">
                    City
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("city", {
                      required: companyNotExisted ? false : true,
                      message: "City is required",
                      minLength: 3,
                      maxLength: 100,
                    })}
                    // disabled={everything?!everything:change}
                    placeholder="City"
                  />
                  {
                    <span className="error text-red-600 px-2">
                      {errors?.city?.type == "required" && "City is required"}
                      {errors?.city?.type == "minLength" && "Invalid City"}
                      {errors?.city?.type == "maxLength" && "Invalid City"}
                      {errors?.city?.type == "apierr" && errors?.city?.message}
                    </span>
                  }
                </div>
                <div className="col-xxl-3 col-md-6">
                  <label htmlFor="placeholderInput" className="form-label">
                    State
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("state", {
                      required: companyNotExisted ? false : true,
                      message: "State is required",
                      minLength: 3,
                      maxLength: 100,
                    })}
          
                    placeholder="State"
                  />
                  {
                    <span className="error text-red-600 px-2">
                      {errors?.state?.type == "required" && "State is required"}
                      {errors?.state?.type == "minLength" && "Invalid State"}
                      {errors?.state?.type == "maxLength" && "Invalid State"}
                      {errors?.state?.type == "apierr" &&
                        errors?.state?.message}
                    </span>
                  }
                </div>
                <div className="col-xxl-3 col-md-6">
                  <label htmlFor="placeholderInput" className="form-label">
                    Country
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("country", {
                      required: companyNotExisted ? false : true,
                      message: "Country is required",
                      minLength: 3,
                      maxLength: 100,
                    })}
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
                <div className="col-xxl-3 col-md-6">
                  <label htmlFor="placeholderInput" className="form-label">
                    GST/PAN No
                  </label>
                  <input
                  disabled={companyNotExisted}
                    type="text"
                    className="form-control "
                    {...register("tax_number", {
                      required: companyNotExisted ? false : true,
                      message: "Tax number no is required",
                      minLength: 10,
                      maxLength: 20,
                    })}
                    // disabled={everything?!everything:(change||second)}
                    placeholder="GST/PAN No"
                  />
                  {
                    <span className="error text-red-600 ">
                      {errors?.tax_number?.type == "required" &&
                        "Tax number is required"}
                      {errors?.tax_number?.type == "minLength" &&
                        "Invalid Tax number"}
                      {errors?.tax_number?.type == "maxLength" &&
                        "Invalid Tax number"}
                      {errors?.tax_number?.type == "apierr" &&
                        errors?.tax_number?.message}
                    </span>
                  }
                </div>
                <div className="col-xxl-9 col-md-6">
                  <label htmlFor="placeholderInput" className="form-label">
                    GST/PAN Upload
                  </label>
                  {!usePrevProof && (
                    <FilePond
                      labelIdle="Upload GST/PAN (Max file size 2mb)"
                      allowMultiple={false}
                      maxFiles={1}
                      onupdatefiles={handleFileChange}
                      onremovefile={()=>setFile()}
                      required={companyNotExisted ? false : true}
                      acceptedFileTypes={"image/*,application/pdf"}
                      allowFileTypeValidation
                      maxFileSize="2MB"
                    />
                  )}
                  {!usePrevProof && gstPanImg && (
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
                      {!second && (
                        <button
                          onClick={() => {
                            setUsePrevProof(!usePrevProof);
                          }}
                          // className="absolute top-2 right-4 btn btn-primary"
                          className="absolute top-0 left-36 bg-primary text-white px-2  rounded"
                        >
                          Change
                        </button>
                      )}
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
                                      attachment: gstPanImg,
                                    },
                                  ],
                                  0
                                )
                              }
                              className="text-body text-truncate d-block cursor-pointer"
                            >
                              Tax Proof
                              {/* {attachment?.filetype} */}
                            </a>
                          </h5>
                        </div>
                      </div>{" "}
                    </>
                  )}
                  <p className="text-red-600 text-start">{fileErr}</p>
                </div>
              </div>
              {
                <div className="form-check form-check-secondary my-3">
                  <input
        
                    className="form-check-input"
                    type="checkbox"
                    checked={companyNotExisted}
                    onChange={() => {
                      setCompanyNotExisted(!companyNotExisted);
                      setProfileImgErr()
                      setFileuploadErr()
                      setFileErr()
                      clearErrors()
                      if (!companyNotExisted) {
                        sessionStorage.removeItem("compNotExited");
                      }
                      
                    }}
                  />
                  <span className="ml-2">
                    "Skip Company Details," I acknowledge that I am an
                    individual and do not have a registered company.
                  </span>
                </div>
              }
              <p className="text-red-600 text-start">{apiErr}</p>
              <div className="d-flex align-items-start gap-3 mt-4">
                {
                  <button
                    type="button"
                    className="btn btn-light btn-label previestab"
                    data-previous="v-pills-bill-address-tab"
                    onClick={() => {
                      handleActiveForm(0);
                    }}
                  >
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                    Back to Profile Details
                  </button>
                }
                {(everything ? everything : !change) && (
                  <button
                    type="submit"
                    className="btn btn-success bg-success btn-label right ms-auto "
                    onClick={handleSubmit(formSubmit)}
                  >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    Continue
                  </button>
                )}
              </div>
            </>
          </Form>
        }
      </div>
    </div>
  );
}
