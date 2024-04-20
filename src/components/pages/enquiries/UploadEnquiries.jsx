/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import Header from "../Header";
import { useEffect, useRef, useState } from "react";
import Footer from "../Footer";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import axios from "axios";
import SimpleBar from "simplebar-react";
import { useAddEnquiryMutation, useGetDraftEnqQuery, useUploadEnquiriesMutation } from "../../../services/api";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import EnquiriesTable from "./DraftEnquiriesTable";
import TableLoader from "../TableLoader";
import { successAlert } from "../swAlert";
import "./enqup.css"


registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode
);

export default function UploadEnquiries() {

  const filePondRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [encodedFile, setEncodedFile] = useState();
  const [fileErr, setFileErr] = useState("");
  const [apiErr, setApiErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [existingEnq, setExistEnq] = useState([]);
  const [show, setShow] = useState(false);
  const [fileUploadSuccessMessage, setFileUploadSuccessMessage] = useState("");
  const [fileUploadErrMsg, setFileUploadErrMsg] = useState("");
  const [draftenquiriesData, setDraftEnquiriesData] = useState([])
  const [showLoader, setShowLoader] = useState(false)
    const [enqView, setEnqView] = useState(false);
    const [enqSelected, setEnqSelected] = useState({});

    const enquirySelected = (row) => {
      console.log(row, "enqSelected");
      setEnqSelected(row);
    };

    useEffect(() => {
      setTimeout(() => {
        if (enqSelected?.email ) {
          setEnqView(true);
        }
      }, 1000);
    }, [enqSelected]);

  const [uploadenq, {data:uploadRes, isLoading: uploadLoader, err}] = useUploadEnquiriesMutation()

  const onUpdateFiles = async (updatedFiles) => {
    setFiles(updatedFiles);    
    setEncodedFile(updatedFiles[0])
  };

  const handleUpload = async() => {
    if (encodedFile) {
      try {
        setShowLoader(true)
        const formData = new FormData();
        formData.append("csv_file", encodedFile?.file, encodedFile?.filename);
        // const body = { csv_file: encodedFile };
        console.log(encodedFile?.file)
        const response = await uploadenq(formData);
        console.log(response)
        if (response?.data?.status) {
          successAlert(response?.data?.message);

          setExistEnq(response?.data?.existing_enqs)
          setFiles([])
          setEncodedFile()
        } else {
          console.log(response)
          if(response?.data?.message){

            setFileUploadErrMsg(response?.data?.message)
          }
          if(response?.error?.data?.message){

            setFileUploadErrMsg(response?.error?.data?.message)
          }
        }
      } catch (err) {
        setFileUploadErrMsg(err?.data?.error?.message);
      } finally {
        setShowLoader(false)
      }
    }
  }

    const { data: draftEnq, isLoading: dEnqLoading, error: dError }
      = useGetDraftEnqQuery();
  
  useEffect(() => {
    setDraftEnquiriesData(draftEnq)
  },[draftEnq])




  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setTimeout(() => {
      if (fileUploadSuccessMessage != "") {
        setFileUploadSuccessMessage("");
      } else if (fileUploadErrMsg != "") {
        setFileUploadErrMsg("");
      }
    },5000)
  },[fileUploadSuccessMessage,fileUploadErrMsg])

  useEffect(() => {
    if (
      files != "" &&
      files != null &&
      files == undefined &&
      fileErr?.length > 0
    ) {
      setFileErr("");
    }
  }, [files]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const zipcode = watch("zip");

  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
      }, 2000);
    }
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg("");
        // addEnq.current.click();
        localStorage.removeItem("editEnq");
      }, 2000);
    }
  }, [apiErr, successMsg]);

  const [addEnquiry, {isLoading: loading }] = useAddEnquiryMutation();

  const onSubmit = async (data, event) => {
    // Prevent the default form submission
    clearErrors();
    event.preventDefault();
    
    // Handle form submission here
    // console.log(addEnq.current.click())
    console.log(data, "submitted");
    try {
      const response = await addEnquiry({ data });
      console?.log(response, response?.data?.message);
      if (response?.data?.status) {
        successAlert(response?.data?.message);
        reset();
        setTimeout(() => {
          handleClose();
        }, 1500);
        return;
      }

      if (response?.error?.data?.errors != {}) {
        console.log(response, response?.error.data?.errors?.email);

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
        setError("message", {
          type: "apierr",
          message: response?.error.data?.errors?.message,
        });
      } else if (response?.error?.data?.message) {
        setApiErr(response?.error?.data?.message);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };




  // useEffect(() => {
  //     if (error) {
  //       console.log(error);
  //       console.log(error?.data?.errors?.email);
  //       if (error?.data?.errors != {}) {
  //         setError("name", {
  //           type: "apierr",
  //           message: error?.data?.errors?.name,
  //         });
  //         setError("email", {
  //           type: "apierr",
  //           message: error?.data?.errors?.email,
  //         });
  //         setError("phone", {
  //           type: "apierr",
  //           message: error?.data?.errors?.phone,
  //         });
  //         setError("city", {
  //           type: "apierr",
  //           message: error?.data?.errors?.city,
  //         });
  //         setError("state", {
  //           type: "apierr",
  //           message: error?.data?.errors?.state,
  //         });
  //         setError("zip", {
  //           type: "apierr",
  //           message: error?.data?.errors?.zip,
  //         });
  //         setError("message", {
  //           type: "apierr",
  //           message: error?.data?.errors?.message,
  //         });
  //       } else if (error?.data?.errors?.message) {
  //         setApiErr(error?.data?.errors?.message);
  //       }
  //     }
  // },[error])


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
        trigger("state");
        trigger("city");
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


  const handleSampleCSVDownload = () => {
    const csvFilePath = "/public/assets/samplefiles/sampleCSV.csv"; // Path to your CSV file
    fetch(csvFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sampleinfo.csv"); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleCloseViewEnqDetails = () => {
    setEnqSelected();
    setEnqView(false);
  };



  return (
    <>
      {showLoader && <TableLoader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18 h4"> </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Enquiries</a>
                        </li>
                        <li className="breadcrumb-item active">Upload</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0 h4">Upload Enquiries</h4>
                      <a
                        className="btn btn-primary bg-primary"
                        onClick={handleShow}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Enquiry{" "}
                      </a>
                    </div>
                    {/* <!-- end card header --> */}
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-between mb-3 gap-2">
                        <div className="flex items-center gap-3">
                          <p className="text-muted mb-0">
                            Please use only .csv files and not more than
                            500 records.
                          </p>
                          <button
                            type="button"
                            name="button"
                            className="btn btn-info bg-info btn-sm d-flex align-items-center gap-1 mb-0"
                            // onClick={() => handleSampleCSVDownload()}
                          >
                            <i className="ri-download-cloud-2-fill fs-18"></i>
                            <span>
                              <a
                                style={{ textDecoration: "none" }}
                                className="text-white"
                                download
                                href="/assets/samplefiles/sampleCSV.csv"
                              >
                                Download Sample CSV
                              </a>
                            </span>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            name="button"
                            className="btn btn-warning bg-warning btn-sm d-flex align-items-center gap-1 mb-0 float-right"
                            disabled={!encodedFile}
                            onClick={() => handleUpload()}
                          >
                            <i className="ri-upload-cloud-2-fill fs-18"></i>
                            <span>Upload CSV</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-12 mt-3">
                        <FilePond
                          files={files}
                          ref={filePondRef}
                          onupdatefiles={onUpdateFiles}
                          maxFiles={1}
                          maxParallelUploads={1}
                          allowReplace={true}
                          allowMultiple={false}
                          allowFileSizeValidation={true}
                          allowDrop={true}
                          maxFileSize={5 * 1024 * 1024}
                          allowFileEncode={true}
                          acceptedFileTypes={[
                            "text/csv",
                            // "application/vnd.ms-excel",
                            // "application/json",
                          ]}
                          labelMaxFileSize="Maximum file size is 2mb"
                          labelIdle={`
<span class="font-semibold text-primary !text-xl !cursor-pointer flex flex-col items-center justify-evenly !p-5 gap-3">
  <i class="ri-upload-cloud-2-line !text-[48px]"></i>
 Click here to upload the  files
</span>                            `}
                          className={""}
                          labelMaxFileSizeExceeded="Maximum total size exceeded"
                        />
                        <p className="text-red-600 text-start">{fileErr}</p>
                        <p className="text-red-600 text-start">
                          {fileUploadErrMsg}
                        </p>
                        <p className="text-green-600 text-start">
                          {fileUploadSuccessMessage}
                        </p>
                      </div>
                      {/* <!-- end dropzon-preview --> */}
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
              {existingEnq?.length > 0 && (
                <div className="card bg-[#1f1e1e] text-white">
                  <div className="card-header font-semibold text-black">
                    Existing Enquiries found from the uploaded file
                  </div>
                  <div className="card-body">
                    <SimpleBar
                      className=" p-3 max-h-[400px]"
                      id="chat-conversation"
                      data-simplebar
                    >
                      <table className="table text-white">
                        <thead>
                          <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Domain</th>
                          </tr>
                        </thead>
                        <tbody>
                          {existingEnq?.length > 0 &&
                            existingEnq?.map((enq, ind) => {
                              if (enq?.Email != "") {
                                return (
                                  <tr
                                    key={ind}
                                    className={`${
                                      ind % 2 != 0
                                        ? "shadow-sm drop-shadow-lg"
                                        : ""
                                    }`}
                                  >
                                    <td>{ind + 1}</td>
                                    <td>
                                      <p>
                                        {enq?.Name}-{ind}
                                      </p>
                                    </td>
                                    <td>
                                      <p>{enq?.Email}</p>
                                    </td>
                                    <td>
                                      <p>{enq?.Phone}</p>
                                    </td>
                                    <td>
                                      <p>{enq?.City}</p>
                                    </td>
                                    <td>
                                      <p>{enq?.State}</p>
                                    </td>
                                    <td>
                                      <p>{enq?.Domain}</p>
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                        </tbody>
                      </table>
                    </SimpleBar>
                  </div>
                </div>
              )}
              <div className="row">
                <div
                  className={`${
                    enqSelected?.email != undefined
                      ? "col-lg-9 slideAnim"
                      : "col-lg-12"
                  }`}
                >
                  <div className="card" id="tasksList">
                    <div className="card-header border-0">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 flex-grow-1 h5">
                          Enquiries List
                        </h5>
                      </div>
                    </div>

                    {/* <!--end card-body--> */}
                    <div className="card-body">
                      <EnquiriesTable
                        type={"upload"}
                        enquirySelected={enquirySelected}
                      />
                    </div>
                  </div>
                </div>

                {enqView && (
                  <div className="col-lg-3 pulse">
                    <div className="card" id="contact-view-detail">
                      <div className="card-body text-center">
                        <div className="position-relative d-inline-block">
                          <img
                            src="/assets/images/users/default_proile_image.png"
                            alt=""
                            className="avatar-lg rounded-circle img-thumbnail"
                          />
                          <span className="contact-active position-absolute rounded-circle bg-success">
                            <span className="visually-hidden"></span>
                          </span>
                        </div>
                        <h5 className="mt-4 h5 capitalize">{enqSelected?.name}</h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item avatar-xs">
                            <a
                              href="javascript:void(0);"
                              className="avatar-title bg-soft-success text-success fs-15 rounded"
                            >
                              <i className="ri-phone-line"></i>
                            </a>
                          </li>
                          <li className="list-inline-item avatar-xs">
                            <a
                              href="javascript:void(0);"
                              className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                            >
                              <i className="ri-mail-line"></i>
                            </a>
                          </li>
                          <li className="list-inline-item avatar-xs">
                            <a
                              href="javascript:void(0);"
                              className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                            >
                              <i className="ri-question-answer-line"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td
                                  className="fw-bold py-1"
                                  width="200"
                                  scope="row"
                                >
                                  Email ID
                                </td>
                                <td className="py-1">{enqSelected?.email}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  Phone No
                                </td>
                                <td className="py-1">{enqSelected?.phone}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  City
                                </td>
                                <td className="py-1">{enqSelected?.city}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold py-1" scope="row">
                                  State
                                </td>
                                <td className="py-1">{enqSelected?.state}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          className="btn btn-secondary bg-secondary w-full "
                          onClick={() => handleCloseViewEnqDetails()}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    {/* <!--end card--> */}
                  </div>
                )}
              </div>
              <div
                className="modal fade"
                id="createTask"
                tabIndex="-1"
                aria-labelledby="createTaskLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0">
                    <div className="modal-header p-3 bg-soft-success">
                      <h5 className="modal-title h5" id="createTaskLabel">
                        Create Comment
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        id="createTaskBtn-close"
                        aria-label="Close"
                      >X</button>
                    </div>
                    <div className="modal-body">
                      <div
                        id="task-error-msg"
                        className="alert alert-danger py-2"
                      ></div>
                      <form autoComplete="off" action="" id="creattask-form">
                        <input
                          type="hidden"
                          id="taskid-input"
                          className="form-control"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="task-title-input"
                            className="form-label"
                          >
                            Comment Title
                          </label>
                          <input
                            type="text"
                            id="task-title-input"
                            className="form-control"
                            placeholder="Enter task title"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="task-title-input"
                            className="form-label"
                          >
                            Comment
                          </label>
                          <textarea
                            name="name"
                            className="form-control"
                            rows=""
                            cols=""
                          ></textarea>
                        </div>
                        <div className="mb-3 position-relative">
                          <label
                            htmlFor="task-assign-input"
                            className="form-label"
                          >
                            Assigned To :{" "}
                            <span className="text-muted">Staff Name</span>{" "}
                          </label>
                          <div
                            className="avatar-group justify-content-center"
                            id="assignee-member"
                          >
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item mb-2"
                              data-img="assets/images/users/default_proile_image.png"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="John Robles"
                            >
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                alt=""
                                className="rounded-circle avatar-xs"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="row g-4 mb-3">
                          <div className="col-lg-6">
                            <label htmlFor="task-status" className="form-label">
                              Status
                            </label>
                            <select
                              className="form-control"
                              data-choices
                              data-choices-search-false
                              id="task-status-input"
                            >
                              <option value="">Status</option>
                              <option value="Ringing" selected>
                                Ringing
                              </option>
                              <option value="Postponed">Postponed</option>
                              <option value="Not Interested">
                                Not Interested
                              </option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="priority-field"
                              className="form-label"
                            >
                              Post Time
                            </label>
                            <input
                              type="text"
                              className="form-control flatpickr-input active"
                              data-provider="timepickr"
                              data-time-hrs="true"
                              id="timepicker-24hrs"
                              readOnly="readonly"
                            />
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="task-duedate-input"
                            className="form-label"
                          >
                            Post Date
                          </label>
                          <input
                            type="text"
                            className="form-control flatpickr-input active"
                            data-provider="flatpickr"
                            data-date-format="d M, Y"
                            placeholder="DD MM, YYYY"
                            readOnly="readonly"
                          />
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-ghost-success"
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-fill align-bottom"></i> Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary bg-primary"
                            id="addNewTodo"
                          >
                            Add Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--end create taks--> */}
              <Modal
                id="signupModals"
                className="modal fade hidden"
                tabIndex="-1"
                aria-hidden="true"
                centered
                onHide={handleClose}
                size="lg"
                show={show}
              >
                <div className="modal-dialog modal-dialog-centered modal-lg !m-0">
                  <div className="modal-content border-0 overflow-hidden">
                    <Modal.Header className="modal-header p-3">
                      <h4 className="card-title mb-0 font-bold h4">
                        Add New Enquiry
                      </h4>
                      <button
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                      ></button>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="fullName" className="form-label">
                              Full Name <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Enter full name"
                                {...register("name", {
                                  required: true,
                                  message: "Name is required",
                                  minLength: 3,
                                  maxLength: 100,
                                  pattern: /^[a-zA-Z\s]+$/,
                                })}
                              />
                              <i className="ri-shield-user-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.name?.type == "required" &&
                                  "Full Name is required"}
                                {errors?.name?.type == "minLength" &&
                                  "Invalid full name"}
                                {errors?.name?.type == "maxLength" &&
                                  "Invalid full name"}
                                {errors?.name?.type == "apierr" &&
                                  errors?.name?.message}
                                  {errors?.name?.type == "pattern" &&
                                  "Invalid Full Name"}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="emailInput" className="form-label">
                              Email <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="email"
                                className="form-control form-control-icon"
                                id="emailInput"
                                placeholder="Enter email"
                                {...register("email", {
                                  required: true,
                                  pattern:
                                  /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                                  message: "Invalid email format",
                                })}
                              />

                              <i className="ri-mail-unread-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.email?.type == "required" &&
                                  "Email is required"}
                                {errors?.email?.type == "pattern" &&
                                  "Invalid email"}
                                {errors?.email?.type == "apierr" &&
                                  errors?.email?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="mobileInput" className="form-label">
                              Phone Number{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="number"
                                className="form-control"
                                id="mobileInput"
                                placeholder="Phone Number"
                                {...register("phone", {
                                  required: true,
                                  message: "Number is required",
                                  maxLength: 10,
                                  minLength: 10,
                                  pattern: /^\d{10}$/,
                                })}
                              />
                              <i className=" ri-smartphone-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
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
                          <div className="col-12 col-lg-6 mb-3">
                            <label
                              htmlFor="addressInput"
                              className="form-label"
                            >
                              Address{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="address"
                                className="form-control"
                                id="addressInput"
                                placeholder="Enter Address"
                                {...register("address", {
                                  message: "Address is required",
                                  maxLength: 250,
                                  minLength: 5,
                                })}
                              />
                              <i className="ri-map-pin-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
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
                          <div className="col-12 col-lg-4 mb-3">
                            <label htmlFor="pinInput" className="form-label">
                              Zip Code <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="number"
                                className="form-control"
                                id="pinInput"
                                placeholder="Enter Zip Code"
                                {...register("zip", {
                                  required: true,
                                  message: "Zip code is required",
                                  minLength: 6,
                                  maxLength: 6,
                                })}
                              />
                              <i className="ri-map-pin-fill"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.zip?.type == "required" &&
                                  "Zip code is required"}
                                {errors?.zip?.type == "minLength" &&
                                  "Invalid zip code"}
                                {errors?.zip?.type == "maxLength" &&
                                  "Invalid zip code"}
                                {errors?.zip?.type == "apierr" &&
                                  errors?.zip?.message}
                              </span>
                            }
                          </div>
                         
                          <div className="col-12 col-lg-4 mb-3">
                            <label htmlFor="cityInput" className="form-label">
                              City <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon left">
                              <input
                                type="text"
                                className="form-control"
                                id="cityInput"
                                placeholder="Enter City"
                                {...register("city", {
                                  required: true,
                                  message: "City is required",
                                  minLength: 3,
                                  maxLength: 100,
                                  pattern: /^[a-zA-Z\s]+$/,
                                })}
                              />
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.city?.type == "required" &&
                                  "City is required"}
                                {errors?.city?.type == "minLength" &&
                                  "Invalid City"}
                                {errors?.city?.type == "maxLength" &&
                                  "Invalid City"}
                                {errors?.city?.type == "apierr" &&
                                  errors?.city?.message}
                                  
{errors?.city?.type == "pattern" &&
                                 "Invalid City"}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-4 mb-3">
                            <label
                              htmlFor="exampleInputPassword1"
                              className="form-label"
                            >
                              State <span className="text-danger">*</span>
                            </label>
                            <div className="form-icon right">
                              <input
                                type="text"
                                className="form-control"
                                id="stateInput"
                                placeholder="Enter State"
                                {...register("state", {
                                  required: true,
                                  message: "State is required",
                                  minLength: 3,
                                  maxLength: 100,
                                  pattern: /^[a-zA-Z\s]+$/,
                                })}
                              />
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.state?.type == "required" &&
                                  "State is required"}
                                {errors?.state?.type == "minLength" &&
                                  "Invalid State"}
                                {errors?.state?.type == "maxLength" &&
                                  "Invalid State"}
                                {errors?.state?.type == "apierr" &&
                                  errors?.state?.message}

{errors?.state?.type == "pattern" &&
                                  "Invalid State"}
                              </span>
                            }
                          </div>
                          {/* <div className="col-12 col-lg-12 mb-3">
                            <label
                              htmlFor="messageInput"
                              className="form-label"
                            >
                              Message
                            </label>
                            <textarea
                              name="name"
                              className="form-control"
                              id="messageInput"
                              placeholder="Enter Message"
                              {...register("message", {
                                message: "Message is required",
                              })}
                            ></textarea>
                          </div>
                          {
                            <span className="error text-red-600">
                              {errors?.message?.type == "required" &&
                                "Message is required"}
                              {errors?.message?.type == "apierr" &&
                                errors?.message?.message}
                            </span>
                          } */}

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-success text-start">
                                {successMsg}
                              </p>
                              <p className="text-danger text-start">{apiErr}</p>
                            </div>
                            <div className="text-end">
                              {!loading && (
                                <button
                                  type="submit"
                                  className="btn btn-primary bg-primary"
                                  id="sa-success"
                                  onClick={() => clearErrors()}
                                >
                                  Submit
                                </button>
                              )}
                              {loading && (
                                <button
                                  disabled
                                  type="button"
                                  className="btn btn-outline-primary btn-load"
                                >
                                  <span className="d-flex align-items-center">
                                    <span className="flex-grow-1 me-2">
                                      Please Wait...
                                    </span>
                                    <span
                                      className="spinner-border flex-shrink-0"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Please Wait...
                                      </span>
                                    </span>
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </Modal.Body>
                  </div>
                  {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
              </Modal>
              {/* <!-- /.modal --> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <Footer />
        </div>
      </div>
    </>
  );
}
