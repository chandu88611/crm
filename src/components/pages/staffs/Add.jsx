import Header from "../Header";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import {
  useCheckEmailMutation,
  useCreateStaffMutation,
  useGetBranchesAndExtensionsQuery,
  useGetProfileDetailsQuery,
  useLazyCompanySettingsQuery,
  useStaffListQuery,
} from "../../../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../reducers/loader";
import { CircularProgress } from "@mui/material";

// Register the plugins
// registerPlugin( FilePondPluginImagePreview)

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter Valid Email")
    .matches(
      /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
      "Enter Valid Email"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Atleast 8 Characters required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match")
    .required("Confirm password is required"),
  designation: yup
    .string()
    .required("Designation is required")
    .matches(/^[a-zA-Z1-9 ]+$/, "Enter valid Designation")
    .min(3, "Atleast 3 Characters required")
    .test("no-space", "Enter Valid Designation", (value) => {
      return value.trim().length > 0;
    }),
  firstname: yup
    .string()
    .required("First Name is required")
    .min(3, "Atleast 3 Characters required")
    .matches(/^[a-zA-Z ]+$/, "First name must contain only Alphabets")
    .test("no-space", "Enter Valid First Name", (value) => {
      return value.trim().length > 0;
    }),
  lastname: yup
    .string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z ]+$/, "Last name must contain only Alphabets")
    .test("no-space", "Enter Valid Last Name", (value) => {
      return value.trim().length > 0;
    }),
  branch: yup.string(),
  enquiryLimit: yup
    .string()
    .required("Enquiry Limit is required")
    .matches(/^[0-9]+$/, "Enquiry Limit must contain only digits")
    .test("no-space", "Enter Valid Enquiry Limit", (value) => {
      return value.trim().length > 0 && value.trim() > 0;
    })
    .max(3, "Maximum 3 Characters allowed"),
  email1: yup
    .string()
    .email("Enter Valid Email")
    .matches(
      /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
      "Enter Valid Email"
    )
    .required("Email is required"),
  zip: yup
    .string()
    .required("Zip Code is required")
    .matches(/^[0-9]+$/, "Zip code must contain only digits")
    .min(6, "Atleast 6 Digits")
    .max(10, "Maximum 10 Digits")
    .test("no-space", "Enter Valid Zip Code ", (value) => {
      return value.trim().length > 0;
    }),
  state: yup
    .string()
    .required("State is required")
    .matches(/^[a-zA-Z. ]+$/, "State must contain only alphabets")
    .test("no-space", "Enter Valid State", (value) => {
      return value.trim().length > 0;
    }),
  city: yup
    .string()
    .required("City is required")
    .matches(/^[a-zA-Z. ]+$/, "City must contain only alphabets")
    .test("no-space", "Enter Valid City", (value) => {
      return value.trim().length > 0;
    }),
  country: yup
    .string()
    .required("Country is required")
    .matches(/^[a-zA-Z. ]+$/, "Country must contain only alphabets")
    .test("no-space", "Enter Valid Country", (value) => {
      return value.trim().length > 0;
    }),
  files: yup.string().required("Resume is required"),
  mobile: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Atleast 10 Characters required")
    .max(15, "Maximum 15 Characters required"),

  extension: yup
    .string()
    .required("Extension is required")
    .test("no-space", "Enter Valid Extension", (value) => {
      return value.trim().length > 0;
    }),
  port: yup.string(),
  username: yup.string(),
  password1: yup.string(),
  status: yup.string(),
});
export default function AddStaff() {
  const dispatch=useDispatch()
  const [imagePreview, setImagePreview] = useState(null);
  const [error1, setError1] = useState("");
  const [mask, setMask] = useState(false);
  const [mask2, setMask2] = useState(false);
  const [checkBackendValidation,{isLoading:checkLoading}] = useCheckEmailMutation();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setError1();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      // setBase64Image(reader.result.split(',')[1]);
      // console.log(reader.result ) // Extract base64 from data URL
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const { data: profileDetailsResp, isLoading: profileLoading } =
    useGetProfileDetailsQuery();
  console.log(profileDetailsResp);
  const [getCompanyInfo, { data: companyInfo, isLoading: companyInfoLaoding }] =
    useLazyCompanySettingsQuery();
  console.log(companyInfo);
  useEffect(() => {
    getCompanyInfo();
  }, []);
  const [rError, setRError] = useState();
  const { data, refetch } = useStaffListQuery({
    type: location.pathname.split("/")[2],
  });
  const [addEnquiry, { loading, success, response }] = useCreateStaffMutation();
  const [isDraft, setIsDraft] = useState(false);
  const { data: ext_branches } = useGetBranchesAndExtensionsQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const formData = watch();
  const onSubmit = async () => {
    await trigger();

    if (
      !formData?.confirmPassword ||
      errors.confirmPassword ||
      errors.password ||
      errors.email ||
      errors.designation ||
      errors.enquiryLimit ||
      !formData?.enquiryLimit ||
      !formData?.designation
    ) {
      return;
    }

    if (formData?.email) {
 
      const res = await checkBackendValidation({
        type: "account",
        email: formData?.email,
      });
      if (res?.data?.status) {
        
        if (activetab < 4) {
          setActiveTab(2);
          clearErrors();
        }
      } else {
        if (res?.error?.data?.errors?.email) {
          toast?.error(res?.error?.data?.errors?.email[0]);
        }
        return;
      }
   
    }
    if (activetab < 4) {
      setActiveTab(2);
      clearErrors();
    }
  };
  const pass = watch("password");
  useEffect(() => {
    if (pass) {
      trigger("confirmPassword");
    }
  }, [pass]);
  useEffect(() => {
    if (companyInfo?.data) {
      setValue(
        "branch",
        companyInfo?.data?.company_address[0]?.city
          ? companyInfo?.data?.company_address[0]?.city
          : profileDetailsResp?.data?.profile_info?.profile_details?.city
      );
    } else {
      setValue(
        "branch",
        profileDetailsResp?.data?.profile_info?.profile_details?.city
      );
    }
  }, [companyInfo, profileDetailsResp]);
  const onSubmit2 = async () => {
    if (activetab == 2) {
      if (!imagePreview) {
        setError1("Upload Profile image");
      }
      await trigger();
      console.log(errors, formData);
      if (
        !formData?.mobile ||
        errors.email1 ||
        errors.name ||
        errors.email ||
        errors.state ||
        errors.city ||
        errors.zip ||
        errors?.files ||
        !formData?.files ||
        !imagePreview
      ) {
        if (!formData?.files) {
          setRError("Resume is Required");
        }
        if (!imagePreview) {
          setError1("Upload Profile image");

          return;
        }
        return;
      }

      if (formData?.email1 || formData.mobile) {
        const res = await checkBackendValidation({
          type: "personal",
          personal_email: formData.email1,
          phone: formData.mobile,
        });
        if (res?.data?.status) {
          if (activetab < 4) {
            setActiveTab(3);
            clearErrors();
          }
        } else {
          if (res?.error?.data?.errors?.phone) {
            toast?.error(res?.error?.data?.errors?.phone[0]);
          }
          if (res?.error?.data?.errors?.personal_email) {
            toast?.error(res?.error?.data?.errors?.personal_email[0]);
          }
          return;
        }
      }
      if (activetab < 4) {
        setActiveTab(3);
        clearErrors();
      }
    }
  };

  const onSubmit3 = async () => {
    if (activetab == 2 || activetab == 3) {
      await trigger();

      if (errors.extension && !isDraft) {
        return;
      }

      try {
        const res = await addEnquiry({
          name: formData.fullName,
          phone: formData.mobile,
          ext_id: formData?.extension,
          enq_limit: formData.enquiryLimit,
          branch_id: formData?.branch,
          zip: formData.zip,
          state: formData.state,
          city: formData.city,
          designation: formData.designation,
          resume: formData.files,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          personal_email: formData.email1,
          first_name: formData.firstname,
          email: formData.email,
          country: formData.country,
          last_name: formData.lastname,
          profile_image: imagePreview,

          is_draft: isDraft ? "true" : "false",
        });
        console.log(res);
        if (res?.data?.status) {
          Swal.fire({
            title: "Success",
            text: res?.data?.message,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setActiveTab(4);
            }
            setTimeout(() => {
              window.location.href = "/staff/all";
            }, 1500);
          });
        } else {
          if (res?.data?.errors?.email) {
            toast.error(res?.data?.errors?.email[0]);
          }
          if (res?.data?.errors?.phone) {
            toast.error(res?.data?.errors?.phone[0]);
          }

          if (res?.error?.data?.errors?.ext_id) {
            toast.error(res?.error?.data?.errors?.ext_id[0]);
          }

          if (res?.error?.data?.errors?.last_name) {
            toast.error(res?.error?.data?.errors?.last_name[0]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    // if (activetab < 4) {
    //     setActiveTab(activetab + 1);
    //     clearErrors();
    //   }
  };
  //  const [files, setFiles] = useState([]);
  const [fileRejectedErr, setFileRejectedErr] = useState();
  const [activetab, setActiveTab] = useState(1);

  useEffect(() => {
    if (fileRejectedErr != "") {
      setTimeout(() => {
        setFileRejectedErr("");
      }, 3000);
    }
  }, [fileRejectedErr]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(files);
    if (files?.length + acceptedFiles?.length <= 5) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign({}, file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    } else {
      setFileRejectedErr("Maximum 5 files are allowed");
      return;
    }

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };

      reader.readAsArrayBuffer(file);
    });

    if (rejectedFiles.length > 0) {
      console.log("Rejected files:", rejectedFiles);
      // Display error messages to the user
      setFileRejectedErr(rejectedFiles[0]?.errors[0]?.message);
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5mb in bytes
    accept: {
      "image/*": [".jpeg", ".png", ".webp"],
    }, // Example of accepting only images
    onMaxFilesExceeded: (file) => {
      setFileRejectedErr("Maximum files exceeded. File rejected:");
      console.log("Maximum files exceeded. File rejected:", file);
    },
    validator: (file) => {
      if (file.name.length > 40) {
        return { code: "nameTooLong", message: "Filename is too long" };
      }
      return null;
    },
  });

  if (fileRejections.length > 0) {
    console.log("rejected");
  }

  const zipcode = watch("zip");
  const ext = watch("extension");
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
    if (zipcode?.length == 6) {
      console.log(zipcode, "billingzip");
      fetchCSC(zipcode, "billing");
    }
  }, [zipcode]);

  useEffect(() => {
    if (ext) {
      const selected = ext_branches?.data?.extensions?.filter(
        (branch, id) => branch?.id == ext
      );
      console.log(selected);
      setValue(
        "port",
        selected[0].ext?.ip_address?.ip_address +
          "/" +
          selected[0].ext?.ip_address?.port
      );
      setValue("username", selected[0].ext?.username);
      setValue("password1", selected[0].ext?.password);
      setValue("status", "Active");
    } else {
      setValue("username", "");
      setValue("port", "");
      setValue("password1", "");
      setValue("status", "");
    }
  }, [ext]);
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0"> </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Add Staffs</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xxl-4">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Important Note</h4>
                    </div>
                    <div className="card-body">
                      <div className="alert alert-warning" role="alert">
                        <ul>
                          <li className="py-1">
                            <strong>Account Details:</strong> This section
                            includes official information about the staff login.
                          </li>
                          <li className="py-1">
                            <strong>Personal Details:</strong> Here, you'll
                            provide the staff's personal information.
                          </li>
                          <li className="py-1">
                            <strong>Extension Details:</strong> Assign extension
                            details to the candidate. Once created, they can
                            manage staff in the staff module.
                          </li>
                          <li className="py-1">
                            <strong>List:</strong> View the list of staff
                            members.
                          </li>
                          <li className="py-1">
                            <strong>Active:</strong> View active staff members.
                          </li>
                          <li className="py-1">
                            <strong>Inactive:</strong> View inactive staff
                            members.
                          </li>
                          <li className="py-1">
                            <strong>Transfer:</strong> If any staff is
                            terminated you can transfer all client data from
                            that staff to new staff.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-8">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Add Staff</h4>
                    </div>
                    {/* <!-- end card header --> */}
                    <div className="card-body">
                      <form
                        action="#"
                        className="form-steps"
                        autoComplete="off"
                      >
                        {/* <!-- <div class="text-center pt-3 pb-4 mb-1">
                                    <img src="/assets/images/ccp_logo.webp" alt="" height="" width="75%">
                                    </div> --> */}
                        <div className="step-arrow-nav mb-4">
                          <ul className="nav nav-pills custom-nav nav-justified">
                            <li className="nav-item">
                              <div
                                className={`nav-link cursor-pointer ${
                                  activetab == 1 ? "active" : ""
                                }`}
                                onClick={() => {
                                  setActiveTab(1);
                                }}
                                // id="steparrow-gen-info-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#steparrow-gen-info"
                                // type="div"
                                // role="tab"
                                // aria-controls="steparrow-gen-info"
                                // aria-selected="true"
                              >
                                Account Details
                              </div>
                            </li>
                            <li className="nav-item">
                              <div
                                className={`nav-link cursor-pointer ${
                                  activetab == 2 ? "active" : ""
                                }`}
                                onClick={onSubmit}
                                // id="steparrow-description-info-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#steparrow-description-info"
                                // type="div"
                                // role="tab"
                                // aria-controls="steparrow-description-info"
                                // aria-selected="false"
                              >
                                Personal Details
                              </div>
                            </li>
                            <li className="nav-item">
                              <div
                                className={`nav-link cursor-pointer ${
                                  activetab == 3 ? "active" : ""
                                }`}
                                // onClick={() => setActiveTab(3)}
                                // id="ext-details"
                                // data-bs-toggle="pill"
                                // data-bs-target="#ext-details-tab"
                                // type="div"
                                // role="tab"
                                // aria-controls="ext-details-tab"
                                // aria-selected="false"
                                onClick={onSubmit2}
                              >
                                Extension Details
                              </div>
                            </li>
                            <li className="nav-item">
                              <div
                                className={`nav-link cursor-pointer ${
                                  activetab == 4 ? "active" : ""
                                }`}
                                // onClick={() => setActiveTab(4)}
                                // id="pills-experience-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#pills-experience"
                                // type="div"
                                // role="tab"
                                // aria-controls="pills-experience"
                                // aria-selected="false"
                              >
                                Finish
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-content">
                          <div
                            className={`tab-pane fade ${
                              activetab == 1 ? "show active" : ""
                            }`}
                            id="steparrow-gen-info"
                            role="tabpanel"
                            aria-labelledby="steparrow-gen-info-tab"
                          >
                            <form>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="form-label text-muted"
                                    >
                                      Email Address
                                    </label>
                                    <div className="form-icon">
                                      <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            type="email"
                                            className={`form-control form-control-icon ${
                                              errors.email ? "is-invalid" : ""
                                            }`}
                                            placeholder="example@gmail.com"
                                          />
                                        )}
                                      />
                                      {/* <i className="ri-mail-unread-line"></i> */}
                                      {errors.email && (
                                        <span className="invalid-feedback">
                                          {errors.email.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="password"
                                      className="form-label text-muted"
                                    >
                                      Password
                                    </label>
                                    <div className="form-icon position-relative auth-pass-inputgroup">
                                      <Controller
                                        name="password"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            type={mask2 ? "text" : "password"}
                                            className={`form-control form-control-icon ${
                                              errors.password ? "" : ""
                                            }`}
                                            placeholder="Enter Password"
                                          />
                                        )}
                                      />
                                      {/* <i className="mdi mdi-lock-outline"></i> */}
                                      {errors.password && (
                                        <span className="text-xs  is-invalid text-red-500">
                                          {errors.password.message}
                                        </span>
                                      )}
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
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="confirmPassword"
                                      className="form-label text-muted"
                                    >
                                      Confirm Password
                                    </label>
                                    <div className="form-icon">
                                      <Controller
                                        name="confirmPassword"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            type={mask ? "text" : "password"}
                                            className={`form-control form-control-icon ${
                                              errors.confirmPassword ? "is" : ""
                                            }`}
                                            placeholder="Re-enter Password"
                                          />
                                        )}
                                      />
                                      {/* <i className="mdi mdi-lock-outline"></i> */}
                                      {errors.confirmPassword && (
                                        <span className="text-xs  is-invalid text-red-500">
                                          {errors.confirmPassword.message}
                                        </span>
                                      )}

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
                                  </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                  <div>
                                    <label
                                      htmlFor="designation"
                                      className="form-label text-muted"
                                    >
                                      Designation
                                    </label>
                                    <div className="form-icon">
                                      <Controller
                                        name="designation"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            type="text"
                                            className={`form-control form-control-icon ${
                                              errors.designation
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            placeholder="Ex: Executive"
                                          />
                                        )}
                                      />
                                      {/* <i className="mdi mdi-account-circle-outline"></i> */}
                                      {errors.designation && (
                                        <span className="invalid-feedback">
                                          {errors.designation.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-4 mt-3">
                                  <div>
                                    <label
                                      htmlFor="designation"
                                      className="form-label text-muted"
                                    >
                                      Branch
                                    </label>
                                    <div className="form-icon">
                                      {/* <Controller
                name="branch"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    type="text"
                    className={`form-control form-control-icon ${errors.branch ? 'is-invalid' : ''}`}
                    placeholder="Branch"
                  >
                    <option value="">Select branch</option>
                    {ext_branches?.data?.branches?.map((data) => (
                    <option value={data?.id}>{data?.name}</option>
                    ))}
                  </select>
                )}
              /> */}
                                      <Controller
                                        name="branch"
                                        defaultValue={[]}
                                        control={control}
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            type="text"
                                            className={`form-control form-control-icon `}
                                            disabled
                                          />
                                        )}
                                      />
                                      {/* <i className="mdi mdi-account-circle-outline"></i> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                  <div>
                                    <label
                                      htmlFor="designation"
                                      className="form-label text-muted"
                                    >
                                      Enquiry limit
                                    </label>
                                    <div className="form-icon">
                                      <Controller
                                        name="enquiryLimit"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            type="text"
                                            className={`form-control form-control-icon ${
                                              errors.enquiryLimit
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            placeholder="Enquiry Limit"
                                          />
                                        )}
                                      />

                                      {errors.enquiryLimit && (
                                        <span className="invalid-feedback">
                                          {errors.enquiryLimit.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <button type="submit" className="btn btn-primary mt-3">Submit</button> */}
                              <div className="d-flex align-items-start gap-3 mt-4">
                                <button
                                  type="button"
                                  className="btn btn-success bg-success btn-label right ms-auto"
                                  onClick={onSubmit}
                                  // onClick={() => {
                                  //   handleSubmit(onSubmit())
                                  // if (activetab < 4) {
                                  //   setActiveTab(activetab + 1);
                                  // }
                                  // }}
                                >
                                  <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                  {checkLoading?<CircularProgress size={14} className="text-white"/>:'Next'}
                                </button>
                              </div>
                            </form>
                          </div>
                          {/* <!-- end tab pane --> */}
                          <div
                            className={`tab-pane fade ${
                              activetab == 2 ? "show active" : ""
                            }`}
                            id="steparrow-description-info"
                            role="tabpanel"
                            aria-labelledby="steparrow-description-info-tab"
                          >
                            <form>
                              <div className="row">
                                <div className="profile-user position-relative d-inline-block mx-auto mb-4 ">
                                  <img
                                    src={
                                      imagePreview
                                        ? imagePreview
                                        : "/assets/images/users/default_proile_image.png"
                                    }
                                    className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                    alt="user-profile-image"
                                  />
                                  {
                                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit absolute !left-24">
                                      <input
                                        id="profile-img-file-input"
                                        type="file"
                                        className="profile-img-file-input"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                      />
                                      <label
                                        htmlFor="profile-img-file-input"
                                        className="profile-photo-edit avatar-xs"
                                      >
                                        <span className="avatar-title rounded-circle bg-light text-body">
                                          <i className="ri-camera-fill"></i>
                                        </span>
                                      </label>
                                    </div>
                                  }
                                </div>
                                <p className="-mt-4 mb-2 text-danger">
                                  {error1}
                                </p>
                                <div className="col-lg-3">
                                  <div>
                                    <label
                                      htmlFor="name"
                                      className="form-label text-muted"
                                    >
                                      First Name
                                    </label>
                                    <Controller
                                      name="firstname"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          className={`form-control form-control-icon ${
                                            errors.firstname ? "is-invalid" : ""
                                          }`}
                                          placeholder="Enter Name"
                                        />
                                      )}
                                    />
                                    {errors.firstname && (
                                      <span className="invalid-feedback">
                                        {errors.firstname.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div>
                                    <label
                                      htmlFor="name"
                                      className="form-label text-muted"
                                    >
                                      Last Name
                                    </label>
                                    <Controller
                                      name="lastname"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          className={`form-control form-control-icon ${
                                            errors.lastname ? "is-invalid" : ""
                                          }`}
                                          placeholder="Enter Name"
                                        />
                                      )}
                                    />
                                    {errors.lastname && (
                                      <span className="invalid-feedback">
                                        {errors.lastname.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div>
                                    <label
                                      htmlFor="email1"
                                      className="form-label text-muted"
                                    >
                                      Email Address
                                    </label>
                                    <Controller
                                      name="email1"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="email"
                                          className={`form-control form-control-icon ${
                                            errors.email1 ? "is-invalid" : ""
                                          }`}
                                          placeholder="example@gmail.com"
                                        />
                                      )}
                                    />
                                    {errors.email1 && (
                                      <span className="invalid-feedback">
                                        {errors.email1.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div>
                                    <label
                                      htmlFor="mobile"
                                      className="form-label text-muted"
                                    >
                                      Phone Number
                                    </label>
                                    <Controller
                                      name="mobile"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="tel"
                                          className={`form-control form-control-icon ${
                                            errors.mobile ? "is-invalid" : ""
                                          }`}
                                          placeholder="Enter Phone Number"
                                        />
                                      )}
                                    />
                                    {errors.mobile && (
                                      <span className="invalid-feedback">
                                        {errors.mobile.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-lg-4">
                                  <div className="">
                                    <label
                                      htmlFor="state"
                                      className="form-label text-muted"
                                    >
                                      Zip code
                                    </label>
                                    <Controller
                                      name="zip"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          placeholder="Zip Code"
                                          className={` form-control  ${
                                            errors.zip ? "is-invalid" : ""
                                          }`}
                                        />
                                      )}
                                    />
                                    {errors.zip && (
                                      <span className="invalid-feedback">
                                        {errors.zip.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="">
                                    <label
                                      htmlFor="city"
                                      className="form-label text-muted"
                                    >
                                      City
                                    </label>
                                    <Controller
                                      name="city"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          placeholder="Enter City"
                                          className={` form-control ${
                                            errors.city ? "is-invalid" : ""
                                          }`}
                                        />
                                      )}
                                    />
                                    {errors.city && (
                                      <span className="invalid-feedback">
                                        {errors.city.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="">
                                    <label
                                      htmlFor="state"
                                      className="form-label text-muted"
                                    >
                                      State
                                    </label>
                                    <Controller
                                      name="state"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          placeholder="Enter State"
                                          className={` form-control  ${
                                            errors.state ? "is-invalid" : ""
                                          }`}
                                        />
                                      )}
                                    />
                                    {errors.state && (
                                      <span className="invalid-feedback">
                                        {errors.state.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4 mt-2">
                                  <div className="">
                                    <label
                                      htmlFor="country"
                                      className="form-label text-muted"
                                    >
                                      Country
                                    </label>
                                    <Controller
                                      name="country"
                                      control={control}
                                      defaultValue=""
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          placeholder="Enter country  "
                                          className={` form-control ${
                                            errors.country ? "is-invalid" : ""
                                          }`}
                                        />
                                      )}
                                    />
                                    {errors.country && (
                                      <span className="invalid-feedback">
                                        {errors.country.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="mt-3">
                                    <label
                                      htmlFor="files"
                                      className="form-label text-muted"
                                    >
                                      Resume/CV (PDF)
                                    </label>
                                    <Controller
                                      name="files"
                                      control={control}
                                      render={({ field }) => (
                                        <FilePond
                                          {...field}
                                          acceptedFileTypes={[
                                            "application/pdf",
                                          ]}
                                          onupdatefiles={(fileItems) => {
                                            setRError();
                                            const base64Strings = fileItems.map(
                                              (fileItem) =>
                                                fileItem.getFileEncodeDataURL()
                                            );
                                            field.onChange(base64Strings[0]);
                                          }}
                                          labelIdle="Drop files here or click to upload"
                                          className={` form-control ${
                                            rError ? "is-invalid" : ""
                                          }`}
                                        />
                                      )}
                                    />
                                    {rError && (
                                      <span className="is-invalid text-danger">
                                        {rError}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-start gap-3 mt-4">
                                <button
                                  type="button"
                                  className="btn btn-light btn-label previestab"
                                  data-previous="steparrow-gen-info-tab"
                                  onClick={() => {
                                    if (activetab != 1) {
                                      setActiveTab(activetab - 1);
                                    }
                                  }}
                                >
                                  <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success bg-success btn-label right ms-auto nexttab nexttab"
                                  data-nexttab="pills-experience-tab"
                                  onClick={onSubmit2}
                                >
                                  <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                  {checkLoading?<CircularProgress size={14} className="text-white"/>:'Next'}
                                </button>
                              </div>
                            </form>
                          </div>
                          {/* <!-- end tab pane --> */}
                          <div
                            className={`tab-pane fade ${
                              activetab == 3 ? "show active" : ""
                            }`}
                            id="ext-details-tab"
                            role="tabpanel"
                            aria-labelledby="ext-details-tab"
                          >
                            <div className="row">
                              <div className="col-lg-12 mb-2">
                                <label
                                  className="form-check-label text-primary mr-1"
                                  htmlFor="formCheck1"
                                >
                                  Additional Staff
                                </label>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="additionalStaff"
                                  checked={isDraft ? true : false}
                                  onClick={() => setIsDraft(!isDraft)}
                                />
                              </div>
                              {!isDraft && (
                                <>
                                  <div className="col-lg-12 extensionsDiv">
                                    <div>
                                      <label
                                        htmlFor="Extentions"
                                        className="form-label text-muted"
                                      >
                                        Extensions
                                      </label>
                                      <Controller
                                        name="extension"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                          <select
                                            {...field}
                                            className={`form-control form-control-icon ${
                                              errors.extension
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            placeholder="Enter Name"
                                          >
                                            <option value="">
                                              Select Extension
                                            </option>
                                            {ext_branches?.data?.extensions?.map(
                                              (ext, ind) => (
                                                <option
                                                  key={ind}
                                                  value={ext?.id}
                                                >
                                                  {ext?.ext_number}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        )}
                                      />
                                      {errors.extension && (
                                        <span className="invalid-feedback">
                                          {errors.extension.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-12 mt-3 extensionsDiv">
                                    <div>
                                      <label
                                        htmlFor="iconInput"
                                        className="form-label text-muted"
                                      >
                                        IP/Domain:Port
                                      </label>
                                      <div className="form-icon">
                                        <Controller
                                          name="port"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <input
                                              {...field}
                                              type="text"
                                              className={`form-control form-control-icon ${
                                                errors.port ? "is-invalid" : ""
                                              }`}
                                              disabled
                                              placeholder="Extension"
                                            />
                                          )}
                                        />
                                        {errors.port && (
                                          <span className="invalid-feedback">
                                            {errors.port.message}
                                          </span>
                                        )}
                                      </div>
                                      {/* {!errors.port&& <i
                                    className="mdi mdi-content-copy"
                                    data-toggle="tooltip"
                                    title="Click to Copy"
                                  ></i>} */}
                                    </div>
                                  </div>
                                  <div className="col-lg-4 mt-3 extensionsDiv">
                                    <div>
                                      <label
                                        htmlFor="iconInput"
                                        className="form-label text-muted"
                                      >
                                        Username
                                      </label>
                                      <div className="form-icon">
                                        <Controller
                                          name="username"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <input
                                              {...field}
                                              type="text"
                                              className={`form-control form-control-icon ${
                                                errors.username
                                                  ? "is-invalid"
                                                  : ""
                                              }`}
                                              disabled
                                              placeholder="User Name"
                                            />
                                          )}
                                        />
                                        {errors.username && (
                                          <span className="invalid-feedback">
                                            {errors.username.message}
                                          </span>
                                        )}
                                      </div>
                                      {/* { !errors.username &&<i
                                    className="mdi mdi-content-copy"
                                    data-toggle="tooltip"
                                    title="Click to Copy" */}
                                      {/* // onClick={() => {navigator.clipboard.writeText("testing")}}
                                  // ></i>} */}
                                    </div>
                                  </div>
                                  <div className="col-lg-4 mt-3 extensionsDiv">
                                    <div>
                                      <label
                                        htmlFor="iconInput"
                                        className="form-label text-muted"
                                      >
                                        Password
                                      </label>
                                      <div className="form-icon">
                                        <Controller
                                          name="password1"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <input
                                              {...field}
                                              type="password"
                                              className={`form-control form-control-icon ${
                                                errors.password1
                                                  ? "is-invalid"
                                                  : ""
                                              }`}
                                              disabled
                                              placeholder="Password"
                                            />
                                          )}
                                        />
                                        {errors.password1 && (
                                          <span className="invalid-feedback">
                                            {errors.password1.message}
                                          </span>
                                        )}
                                      </div>
                                      {/* {!errors.password1&&<i
                                    className="mdi mdi-content-copy"
                                    data-toggle="tooltip"
                                    title="Click to Copy"
                                  ></i>} */}
                                    </div>
                                  </div>
                                  <div className="col-lg-4 mt-3 extensionsDiv">
                                    <div>
                                      <label
                                        htmlFor="iconInput"
                                        className="form-label text-muted"
                                      >
                                        Status
                                      </label>
                                      <div className="form-icon">
                                        <Controller
                                          name="status"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <input
                                              {...field}
                                              type="text"
                                              className={`form-control form-control-icon ${
                                                errors.status
                                                  ? "is-invalid"
                                                  : ""
                                              }`}
                                              disabled
                                              placeholder="status"
                                            />
                                          )}
                                        />
                                        {errors.status && (
                                          <span className="invalid-feedback">
                                            {errors.status.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="d-flex align-items-start gap-3 mt-4">
                              <button
                                type="button"
                                className="btn btn-light btn-label previestab"
                                data-previous="steparrow-gen-info-tab"
                                onClick={() => {
                                  if (activetab != 1) {
                                    setActiveTab(activetab - 1);
                                  }
                                }}
                              >
                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                Back
                              </button>
                              <button
                                type="button"
                                className="btn btn-success bg-success btn-label right ms-auto nexttab nexttab"
                                onClick={onSubmit3}
                              >
                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                Submit
                              </button>
                            </div>
                          </div>
                          {/* <!-- end tab pane --> */}
                          <div
                            className={`tab-pane fade ${
                              activetab == 4 ? "show active" : ""
                            }`}
                          >
                            <div className="text-center">
                              <div className="avatar-md mt-5 mb-4 mx-auto">
                                <div className="avatar-title bg-light text-success display-4 rounded-circle">
                                  <i className="ri-checkbox-circle-fill"></i>
                                </div>
                              </div>
                              <h5>Well Done !</h5>
                              <p className="text-muted">
                                You have Successfully Added Staff.
                              </p>
                            </div>
                          </div>
                          {/* <!-- end tab pane --> */}
                        </div>
                        {/* <!-- end tab content --> */}
                      </form>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
