import Header from "../Header";
import "../../assets/profile.css";
import Flatpickr from "react-flatpickr";
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
  useCreateStaffMutation,
  useGetBranchesAndExtensionsQuery,
  useLazyStaffsViewQuery,
  useStaffListQuery,
  useUpdateStaffMutation,
} from "../../../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PersonalDetails from "./forms/PersonalDetails";
import ChangePassword from "./forms/ChangePassword";
import EducationalQualification from "./forms/EducationalQualification";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  extension: yup
    .object()
    .nullable()
    .typeError("Extension is required")  
    .required("Extension is required"),
  port: yup.string(),
  username: yup.string(),
  password1: yup.string(),
  status: yup.string(),
});
export default function Editstaff() {
  const [newExt, setNewExt] = useState([]);
  const [viewStaff, { data: staffData }] = useLazyStaffsViewQuery();
  const [pimage, setpimage] = useState(true);
  // const {data,refetch}=useStaffListQuery({type:location.pathname.split('/')[2]})
  const [addEnquiry, { loading, success, response }] = useCreateStaffMutation();
  const [isDraft, setIsDraft] = useState(false);
  const { data: ext_branches, refetch } = useGetBranchesAndExtensionsQuery();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    refetch();
    viewStaff({ id: id });
  }, []);
  const formData = watch();

  const { id } = useParams();
  const [updateStaff, { loading: update }] = useUpdateStaffMutation();
  const onSubmit3 = async (data) => {
    const res = await updateStaff({
      staff_id: id,
      ext_id: formData?.extension?.value,
      is_draft: "false",
      type: "extension",
    });

    if (res?.data?.status) {
      Swal.fire({
        title: "Success",
        text: res?.data?.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          //  refetch()
        }
      });
    } else {
      toast.error(res?.error?.data?.message);
    }
  };
  useEffect(() => {
    if (
      ext_branches?.data?.extensions?.length > 0 &&
      staffData?.staff?.extension != null
    ) {
      setNewExt([
        ...ext_branches?.data?.extensions,
        staffData?.staff?.extension,
      ]);
    } else {
      if (ext_branches?.data?.extensions?.length > 0) {
        setNewExt([...ext_branches?.data?.extensions]);
      }

      if (staffData?.staff?.extension) {
        setNewExt([staffData?.staff?.extension]);
      }
    }
  }, [ext_branches, staffData]);
  const [fileRejectedErr, setFileRejectedErr] = useState();
  const [activetab, setActiveTab] = useState(1);

  //  useEffect(() => {
  //    if (fileRejectedErr != "") {

  //      setTimeout(() => {
  //        setFileRejectedErr("");
  //      }, 3000);

  //    }
  //  }, [fileRejectedErr]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
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

  const zipcode = watch("zip");
  useEffect(() => {
    if (staffData?.staff?.extension?.id) {
      setValue("extension", {
        value: staffData?.staff?.extension?.id,
        label: staffData?.staff?.extension?.ext_number,
      });
    }
  }, [staffData?.staff?.extension?.id]);
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
      console.log(ext);

      const selected = newExt?.filter((branch, id) => branch?.id == ext?.value);

      if (selected?.length > 0) {
        setValue(
          "port",
          selected[0]?.ext?.ip_address?.ip_address +
            "/" +
            selected[0].ext?.ip_address?.port
        );
        setValue("username", selected[0]?.ext?.username);
        setValue("password1", selected[0]?.ext?.password);
        setValue("status", "Active");
      }
    } else {
      setValue("port", "");
      setValue("username", "");
      setValue("password1", "");
      setValue("status", "");
    }
  }, [ext]);

  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      // setBase64Image(reader.result.split(',')[1]);
      // console.log(reader.result ) // Extract base64 from data URL
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="position-relative mx-n4 mt-n4">
                <div className="profile-wid-bg profile-setting-img">
                  <img
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80"
                    className="profile-wid-img"
                    alt=""
                  />
                  <div className="overlay-content">
                    <div className="text-end p-3">
                      {/*  
                      <!-- <div class="p-0 ms-auto rounded-circle profile-photo-edit">
                                 <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input">
                                 <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
                                     <i class="ri-image-edit-line align-bottom me-1"></i> Change Cover
                                 </label>
                                 </div> --> 
                                 */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xxl-3">
                  <div className="card mt-n5">
                    <div className="card-body p-4">
                      <div className="text-center">
                        <div className="profile-user position-relative d-inline-block mx-auto mb-4">
                          <img
                            src={
                              imagePreview
                                ? imagePreview
                                : !staffData?.staff?.profile?.profile_image
                                ? "/assets/images/users/default_proile_image.png"
                                : staffData?.staff?.profile?.profile_image
                            }
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                            alt="user-profile-image"
                          />
                          {pimage && (
                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
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
                          )}
                        </div>
                        <h5 className="fs-16 mb-1 capitalize">
                          {staffData?.staff?.name}
                        </h5>
                        <p className="text-muted mb-0 capitalize">
                          {staffData?.staff?.profile?.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!--end card--> */}
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-5">
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-0">
                            Complete Your Profile
                          </h5>
                        </div>
                        <div className="flex-shrink-0">
                          {/* <a
                            href="javascript:void(0);"
                            className="badge bg-light text-primary fs-12"
                          >
                            <i className="ri-edit-box-line align-bottom me-1"></i>{" "}
                            Edit
                          </a> */}
                        </div>
                      </div>
                      <div className="progress animated-progress custom-progress progress-label">
                        <div
                          className="progress-bar bg-danger w-[30%]"
                          role="progressbar"
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div className="label">30%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-9">
                  <div className="card mt-xxl-n5">
                    <div className="card-header">
                      <ul
                        className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#personalDetails"
                            role="tab"
                            onClick={() => setpimage(true)}
                          >
                            <i className="fas fa-home"></i> Personal Details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#changePassword"
                            role="tab"
                            onClick={() => setpimage(false)}
                          >
                            <i className="far fa-user"></i> Change Password
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#qualification"
                            role="tab"
                            onClick={() => setpimage(false)}
                          >
                            <i className="far fa-envelope"></i> Educational
                            Qualification
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#extension"
                            role="tab"
                            onClick={() => setpimage(false)}
                          >
                            <i className="far fa-envelope"></i> Extension
                            Details
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body p-4">
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="personalDetails"
                          role="tabpanel"
                        >
                          <PersonalDetails
                            profile_Image={imagePreview}
                            staffData={staffData?.staff?.profile}
                            company={staffData?.staff}
                          />
                        </div>
                        {/* <!--end tab-pane--> */}
                        <div
                          className="tab-pane"
                          id="changePassword"
                          role="tabpanel"
                        >
                          <ChangePassword />
                          <div className="mt-4 mb-3 border-bottom pb-2">
                            <h5 className="card-title">Login History</h5>
                          </div>
                          <div className="custom-scroll scrollbar style-2">
                            <div className="d-flex align-items-center mb-3">
                              <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                  <i className="mdi mdi-web"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6>Browser Name</h6>
                                <p className="text-muted mb-0">
                                  Los Angeles, United States
                                </p>
                                <small className="text-muted mb-0">
                                  16 March, 2023 2:47PM
                                </small>
                              </div>
                              <div>
                                <a href="javascript:void(0);">127.0.0.1</a>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                              <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                  <i className="mdi mdi-web"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6>Browser Name</h6>
                                <p className="text-muted mb-0">
                                  Los Angeles, United States
                                </p>
                                <small className="text-muted mb-0">
                                  16 March, 2023 2:47PM
                                </small>
                              </div>
                              <div>
                                <a href="javascript:void(0);">127.0.0.1</a>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                              <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                  <i className="mdi mdi-web"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6>Browser Name</h6>
                                <p className="text-muted mb-0">
                                  Los Angeles, United States
                                </p>
                                <small className="text-muted mb-0">
                                  16 March, 2023 2:47PM
                                </small>
                              </div>
                              <div>
                                <a href="javascript:void(0);">127.0.0.1</a>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                              <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                  <i className="mdi mdi-web"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6>Browser Name</h6>
                                <p className="text-muted mb-0">
                                  Los Angeles, United States
                                </p>
                                <small className="text-muted mb-0">
                                  16 March, 2023 2:47PM
                                </small>
                              </div>
                              <div>
                                <a href="javascript:void(0);">127.0.0.1</a>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                              <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                  <i className="mdi mdi-web"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6>Browser Name</h6>
                                <p className="text-muted mb-0">
                                  Los Angeles, United States
                                </p>
                                <small className="text-muted mb-0">
                                  16 March, 2023 2:47PM
                                </small>
                              </div>
                              <div>
                                <a href="javascript:void(0);">127.0.0.1</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--end tab-pane--> */}
                        <div
                          className="tab-pane"
                          id="qualification"
                          role="tabpanel"
                        >
                          <EducationalQualification
                            academic={staffData?.staff?.academic}
                          />
                        </div>
                        {/* <!--end tab-pane--> */}
                        <div
                          className="tab-pane"
                          id="extension"
                          role="tabpanel"
                        >
                          <div className=" ">
                            <div
                              className={`tab-pane   ${
                                activetab == 3 ? "show active" : ""
                              }`}
                              id="ext-details-tab"
                              role="tabpanel"
                              aria-labelledby="ext-details-tab"
                            >
                              <div className="row">
                                {/* <div className="col-lg-12 mb-2">
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
                                  checked={isDraft?true:false}
                                  onClick={()=>setIsDraft(!isDraft)}
                                />
                              </div> */}
                                {
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
                                            <Select
                                              {...field}
                                              className={
                                                errors?.extension
                                                  ? "is-invalid"
                                                  : ""
                                              }
                                              name="extension" // Ensure that the name matches the field name
                                              placeholder="Select Extension"
                                              options={newExt?.map((ext) => ({
                                                value: ext.id,
                                                label: ext.ext_number,
                                              }))}
                                            />
                                          )}
                                        />
                                        {/* <select {...field}   className={`form-control form-control-icon ${errors?.extension ? 'is-invalid' : ''}`} placeholder="Enter Name" >
              <option value="">Select Extension</option>
              {newExt?.map((ext) => (
                    <option value={ext?.id} >{ext?.ext_number}</option>
                   ))}
                </select> */}

                                        {errors?.extension && (
                                          <span className=" is-invalid text-xs text-red-500">
                                            {errors?.extension?.message}
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
                                                disabled
                                                className={`form-control form-control-icon ${
                                                  errors?.port
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                placeholder="IP/Domain:Port"
                                              />
                                            )}
                                          />
                                          {errors?.port && (
                                            <span className="invalid-feedback">
                                              {errors?.port.message}
                                            </span>
                                          )}
                                        </div>
                                        {/* {!errors?.port&& <i
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
                                                disabled
                                                type="text"
                                                className={`form-control form-control-icon ${
                                                  errors?.username
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                placeholder="Username"
                                              />
                                            )}
                                          />
                                          {errors?.username && (
                                            <span className="invalid-feedback">
                                              {errors?.username.message}
                                            </span>
                                          )}
                                        </div>
                                        {/* { !errors?.username &&<i
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
                                                disabled
                                                className={`form-control form-control-icon ${
                                                  errors?.password1
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                placeholder="Password"
                                              />
                                            )}
                                          />
                                          {errors?.password1 && (
                                            <span className="invalid-feedback">
                                              {errors?.password1.message}
                                            </span>
                                          )}
                                        </div>
                                        {/* {!errors?.password1&&<i
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
                                                  errors?.status
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                placeholder="Status"
                                                disabled
                                              />
                                            )}
                                          />
                                          {errors?.status && (
                                            <span className="invalid-feedback">
                                              {errors?.status.message}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                }
                              </div>
                              <div className="d-flex align-items-start gap-3 mt-4">
                                <button
                                  type="button"
                                  className="btn btn-success bg-success     ms-auto  "
                                  onClick={handleSubmit(onSubmit3)}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--end tab-pane--> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {new Date().getFullYear()} © All Rights Reserved.
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end d-none d-sm-block">
                    Designed and Developed by Call Center Projects
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
