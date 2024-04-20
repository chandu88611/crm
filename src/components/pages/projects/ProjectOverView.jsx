/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import Header from "../Header";
import SimpleBar from "simplebar-react";
import MainComment from "./ParentComment";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom";
import { useAssignMemberMutation , useViewProjectQuery } from "../../../services/api";

import Loader from "../Loader";
import { FilePond } from "react-filepond";
import AttachmentUploadComponent from "./AttachmentUpload";
import axios from "axios"
import Reply from "./Reply";
import {Table} from "react-bootstrap"
import GLightbox from "glightbox";
import Select from "react-select"
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import UserForm from "./userForm";
import DepartmentForm from "./DepartmentForm";
import IvrForm from "./IvrForm";
import { errorRedirect, successAlert } from "../swAlert";

export default function SkyProjectOverview() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [currentVerticalTab, setCurrentVerticalTab] = useState("user")
  const [readMore, setReadMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectData, setProjectData] = useState("");
  const [showSideInviteMemberComp, setShowSideInviteMemberComp] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [sideSelectedMembers, setSideSelectedMembers] = useState([]);
  const [showInviteMemberComp, setShowInviteMemberComp] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [agreementSignedErr, setAgreementSignedErr] = useState("")
  const [showAttachmentUpload, setShowAttachmentUpload] = useState(false);
  const decryptedID = CryptoJS.AES.decrypt(
    params?.id.replace(/_/g, "/").replace(/-/g, "+"), "customer_id").toString(CryptoJS.enc.Utf8);
    const musicfiletypes = [ "wav" , "x-wav"  , "acc" , "wma" , "ogg" , "pls" , "mpa" , "aif" ];


  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  function getTimeAgo(timestamp) {
    const now = new Date();
    const timeDiff = now.getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return "just now";
    } else if (minutes === 1) {
      return "a minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours === 1) {
      return "an hour ago";
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return "yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks === 1) {
      return "a week ago";
    } else if (weeks < 4) {
      return `${weeks} weeks ago`;
    } else if (months === 1) {
      return "a month ago";
    } else if (months < 12) {
      return `${months} months ago`;
    } else if (years === 1) {
      return "a year ago";
    } else {
      return `${years} years ago`;
    }
  }

  const { data: projectsData, isLoading: detailsLoading } =
    useViewProjectQuery(decryptedID);


  const handleSearch = () => {
    const staffTData = projectsData;
    const lowerSearch = searchTerm;
    if (searchTerm != "") {
      const filteredData = staffTData?.data?.project?.members?.find(
        (member) => {
          return member?.staff?.name
            ?.toLocaleLowerCase()
            .startsWith(lowerSearch?.toLocaleLowerCase());
        }
      );
      console.log(filteredData);
      if (filteredData) {
        setProjectData([filteredData]);
      } else if (filteredData == undefined) {
        setProjectData([]);
      }
    } else {
      setProjectData(projectsData?.data?.project?.members);
    }
  };

  const handleDownload = async (id, name) => {
    const response = await axios.get(
      `https://skycontroller.connetz.shop/bdo-api/projects/download-attachment?id=${id}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/*",
          Authorization: "Bearer " + localStorage.getItem("staff_auth_token"),
        },
      }
    );
    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url, new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
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

  useEffect(() => {
    setShowAttachmentUpload(false);
    setProjectData(projectsData?.data?.project?.members);
  }, [projectsData]);

  const addComment = async () => {};
  const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ];

  const [assignMember, { data: assignresp, isLoading: assignLoading }] =
    useAssignMemberMutation();

  const handleSideInvideMembers = async () => {
    const mappedArr = sideSelectedMembers?.map((member, ind) => ({
      id: member?.value,
      staff_type: projectsData?.data?.staffs?.find(
        (staff) => staff?.id == member?.value
      )?.staff_type,
    }));
    const response = await assignMember({
      project_id: decryptedID,
      assignedTo: mappedArr,
    });
    if (response?.data?.status) {
      successAlert("Members Assigned Successfully");
      setShowSideInviteMemberComp(false);
      setSideSelectedMembers([]);
    }
  };

  const handleInvideMembers = async () => {
    const mappedArr = selectedMembers?.map((member, ind) => ({
      id: member?.value,
      staff_type: projectsData?.data?.staffs?.find(
        (staff) => staff?.id == member?.value
      )?.staff_type,
    }));
    const response = await assignMember({
      project_id: decryptedID,
      assignedTo: mappedArr,
    });
    if (response?.data?.status) {
      successAlert("Members Assigned Successfully");
      setShowInviteMemberComp(false);
      setSelectedMembers([]);
    }
  };

  return (
    <>
      {assignLoading && <Loader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card mt-n4">
                    <div className="bg-soft-success">
                      <div className="card-body pb-0 px-4">
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="row align-items-center g-3">
                              <div className="col-md-auto">
                                <div className="">
                                  <div className=" bg-white rounded-circle p-3 font-bold text-muted ">
                                    <span>
                                      {
                                        projectsData?.data?.project?.project_no?.split(
                                          "-"
                                        )[0]
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5">
                                <div>
                                  <h4 className="fw-bold h4">
                                    {projectsData?.data?.project?.project_no} -{" "}
                                    {
                                      projectsData?.data?.project?.invoice
                                        ?.prefix
                                    }
                                    -
                                    {projectsData?.data?.project?.invoice?.id
                                      ?.toString()
                                      .padStart(5, "0") +
                                      "/" +
                                      (
                                        new Date(
                                          projectsData?.data?.project?.invoice?.date
                                        ).getMonth() + 1
                                      )
                                        ?.toString()
                                        ?.padStart(2, "0") +
                                      "/" +
                                      new Date(
                                        projectsData?.data?.project?.invoice?.date
                                      ).getFullYear()}
                                  </h4>
                                  <div className="hstack gap-3 flex-wrap">
                                    {/* <!-- <div><i class="ri-building-line align-bottom me-1"></i> Themesbrand</div>
                                                      <div class="vr"></div> --> */}
                                    <div>
                                      Create Date :{" "}
                                      <span className="fw-medium">
                                        {new Date(
                                          projectsData?.data?.project?.project_created
                                        ).toLocaleString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div className="vr"></div>
                                    <div>
                                      Deadline :{" "}
                                      <span className="fw-medium">
                                        {new Date(
                                          projectsData?.data?.project?.deadline
                                        ).toLocaleString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div className="vr"></div>
                                    <div
                                      className={`badge rounded-pill ${
                                        projectsData?.data?.project?.status == 0
                                          ? "badge-soft-primary"
                                          : projectsData?.data?.project
                                              ?.status == 2
                                          ? "badge-soft-success"
                                          : "badge-soft-warning"
                                      } fs-12`}
                                    >
                                      {projectsData?.data?.project?.status == 0
                                        ? "Pending"
                                        : projectsData?.data?.project?.status ==
                                          2
                                        ? "Completed"
                                        : "Processing"}
                                    </div>
                                    <div className="badge rounded-pill bg-danger fs-12">
                                      High
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 ">
                                <div className="">
                                  <div className="flex flex-wrap flex-grow items-center gap-2">
                                    <div className="">
                                      <p
                                        className={`flex items-center capitalize antialiased ${
                                          showCustomerDetails
                                            ? "pulse"
                                            : "blur-[3px] transition-all "
                                        } fw-bold h4`}
                                        style={{ lineBreak: "anywhere" }}
                                      >
                                        <i className="ri-account-circle-fill mr-1"></i>
                                        {
                                          projectsData?.data?.project?.customer
                                            ?.first_name
                                        }{" "}
                                        {
                                          projectsData?.data?.project?.customer
                                            ?.last_name
                                        }
                                      </p>
                                      <span
                                        className={`flex items-center antialiased font-medium ${
                                          showCustomerDetails
                                            ? "pulse"
                                            : "blur-[3px]"
                                        }`}
                                      >
                                        <i className="ri-phone-line mr-1"></i>
                                        {
                                          projectsData?.data?.project?.customer
                                            ?.phone
                                        }
                                      </span>
                                    </div>
                                    <div className="vr"></div>
                                    <div className="">
                                      <span
                                        className={`flex items-center antialiased fw-bold h4 ${
                                          showCustomerDetails
                                            ? "pulse"
                                            : "blur-[3px]"
                                        }`}
                                        style={{ lineBreak: "anywhere" }}
                                      >
                                        <i className="ri-building-line mr-1"></i>
                                        {projectsData?.data?.project?.customer
                                          ?.company
                                          ? projectsData?.data?.project
                                              ?.customer?.company
                                          : "N/A"}{" "}
                                      </span>
                                      <p
                                        className={`flex items-center break-words font-medium ${
                                          showCustomerDetails
                                            ? "pulse"
                                            : "blur-[3px]"
                                        }`}
                                        style={{ lineBreak: "anywhere" }}
                                      >
                                        <i className="ri-mail-line mr-1 "></i>
                                        {
                                          projectsData?.data?.project?.customer
                                            ?.email
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-6 mt-2 float-end">
                                    <p
                                      className="badge cursor-pointer rounded text-center bg-soft-primary text-primary fs-12"
                                      onClick={() =>
                                        setShowCustomerDetails(
                                          !showCustomerDetails
                                        )
                                      }
                                    >
                                      {showCustomerDetails ? "Hide" : "View"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-auto">
                            <div className="hstack gap-1 flex-wrap">
                              <button
                                type="button"
                                className=" py-0 fs-16 favourite-btn active"
                              >
                                <i className="ri-star-fill"></i>
                              </button>
                              <button
                                type="button"
                                className="btn py-0 fs-16 text-body"
                              >
                                <i className="ri-share-line"></i>
                              </button>
                              <button
                                type="button"
                                className="btn py-0 fs-16 text-body"
                              >
                                <i className="ri-flag-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <ul
                          className="nav nav-tabs-custom border-bottom-0"
                          role="tablist"
                        >
                          <li className="nav-item cursor-pointer">
                            <a
                              className={`nav-link ${
                                activeTab == 1 ? "active" : ""
                              } fw-semibold`}
                              onClick={() => setActiveTab(1)}
                              // href="#project-overview"
                              // role="tab"
                            >
                              Overview
                            </a>
                          </li>
                          <li className="nav-item cursor-pointer">
                            <a
                              className={`nav-link ${
                                activeTab == 2 ? "active" : ""
                              } fw-semibold`}
                              onClick={() => setActiveTab(2)}
                              // href="#project-documents"
                              // role="tab"
                            >
                              Documents
                            </a>
                          </li>
                          <li className="nav-item cursor-pointer">
                            <a
                              className={`nav-link ${
                                activeTab == 3 ? "active" : ""
                              } fw-semibold`}
                              onClick={() => setActiveTab(3)}
                              // href="#project-activities"
                              // role="tab"
                            >
                              Activities
                            </a>
                          </li>
                          <li className="nav-item cursor-pointer">
                            <a
                              className={`nav-link ${
                                activeTab == 4 ? "active" : ""
                              } fw-semibold`}
                              onClick={() => setActiveTab(4)}
                              // href="#project-team"
                              // role="tab"
                            >
                              Team
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- end card body --> */}
                    </div>
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content text-muted">
                    {activeTab == 1 && (
                      <div
                        className={`tab-pane fade ${
                          activeTab == 1 ? "show active" : ""
                        } `}
                        id="project-overview"
                        // role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-xl-9 col-lg-8 sticky">
                            {projectsData?.data?.project?.items?.map(
                              (item, ind) => (
                                <div
                                  key={ind}
                                  className="card alert-dismissible alert-additional fade show"
                                  role="alert"
                                >
                                  <div className="card-header p-[10px] bg-success">
                                    <div className="d-flex">
                                      <div className="flex-shrink-0 me-3">
                                        <i className="ri-notification-line fs-16 align-middle text-light" />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="text-light h5 mb-0 capitalize ">
                                          {item?.description}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-body bg-soft-success px-5">
                                    <p className="mb-0 text-success">
                                      {item?.long_description}
                                    </p>
                                    <p>
                                      <span className="text-muted">
                                        Number Details
                                      </span>
                                      <p className="text-green-600">
                                        <span className="text-muted">
                                          Number :{" "}
                                        </span>
                                        <span className=" font-bold">
                                          {item?.number}
                                        </span>{" "}
                                        |{" "}
                                        <span className="text-muted">
                                          Vanity type
                                        </span>{" "}
                                        :{" "}
                                        <span className="font-bold">
                                          {item?.vanity_type}
                                        </span>{" "}
                                        |{" "}
                                        <span className="text-muted">
                                          Price :{" "}
                                        </span>
                                        <span className="font-bold">
                                          {" "}
                                          ₹{item?.number_price}
                                        </span>{" "}
                                        |{" "}
                                        <span className="text-muted">
                                          Duration :{" "}
                                        </span>
                                        <span className="font-bold">
                                          {item?.months} Months
                                        </span>
                                      </p>
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                            <div className="card">
                              <div className="card-header">
                                <h4 className="card-title h4  mb-0">
                                  Skyvoice user panel details
                                </h4>
                              </div>
                              {/* end card header */}
                              <div className="card-body form-steps">
                                <form className="vertical-navs-step">
                                  <div className="row gy-5">
                                    <div className="col-lg-1">
                                      <div
                                        className="nav flex-column custom-nav nav-pills"
                                        role="tablist"
                                        aria-orientation="vertical"
                                      >
                                        <a
                                          className={`nav-link ${
                                            currentVerticalTab == "user"
                                              ? "active"
                                              : ""
                                          }`}
                                          id="v-pills-bill-info-tab"
                                          onClick={() =>
                                            setCurrentVerticalTab("user")
                                          }
                                          type="button"
                                          style={{ width: 60 }}
                                        >
                                          <span className="step-title">
                                            <div
                                              style={{ overflow: "hidden" }}
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              data-bs-original-title="Add User"
                                            >
                                              <i
                                                className="mdi mdi-account-multiple-plus"
                                                style={{
                                                  fontSize: 24,
                                                  fontWeight: 600,
                                                }}
                                              />
                                            </div>
                                          </span>
                                        </a>
                                        <button
                                          disabled={
                                            !projectsData?.data?.project
                                              ?.sky_users?.length
                                          }
                                          className={`nav-link ${
                                            currentVerticalTab == "department"
                                              ? "active"
                                              : ""
                                          }`}
                                          id="v-pills-bill-address-tab"
                                          onClick={() =>
                                            setCurrentVerticalTab("department")
                                          }
                                          type="button"
                                          style={{ width: 60 }}
                                        >
                                          <span className="step-title">
                                            <div
                                              style={{ overflow: "hidden" }}
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              data-bs-original-title="Add Department"
                                            >
                                              <i
                                                className="mdi mdi-shield-account-variant"
                                                style={{
                                                  fontSize: 24,
                                                  fontWeight: 600,
                                                }}
                                              />
                                            </div>
                                          </span>
                                        </button>
                                        <button
                                          disabled={
                                            !projectsData?.data?.project
                                              ?.sky_users?.length ||
                                            !projectsData?.data?.project
                                              ?.sky_departments?.length
                                          }
                                          className={` nav-link ${
                                            currentVerticalTab == "ivr"
                                              ? "active"
                                              : ""
                                          }`}
                                          id="v-pills-payment-tab"
                                          onClick={() =>
                                            setCurrentVerticalTab("ivr")
                                          }
                                          type="button"
                                          style={{ width: 60 }}
                                        >
                                          <span className="step-title">
                                            <div
                                              style={{
                                                width: 20,
                                                overflow: "hidden",
                                              }}
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="right"
                                              data-bs-original-title="Add IVR"
                                            >
                                              <i
                                                className="mdi mdi-phone-voip"
                                                style={{
                                                  fontSize: 21,
                                                  fontWeight: 600,
                                                }}
                                              />
                                            </div>
                                          </span>
                                        </button>
                                      </div>
                                      {/* end nav */}
                                    </div>{" "}
                                    {/* end col*/}
                                    <div className="col-lg-11">
                                      <div className="px-lg-0">
                                        <div className="tab-content">
                                          <div
                                            className={`tab-pane fade show ${
                                              currentVerticalTab == "user"
                                                ? "active"
                                                : "fade"
                                            }`}
                                            id="v-pills-bill-info"
                                          >
                                            <UserForm
                                              projectsData={projectsData}
                                            />
                                          </div>
                                          {/* end tab pane */}
                                          <div
                                            className={`tab-pane ${
                                              currentVerticalTab == "department"
                                                ? "active"
                                                : "fade"
                                            }`}
                                            id="v-pills-bill-address"
                                          >
                                            <DepartmentForm
                                              projectsData={projectsData}
                                            />
                                            {/*end card*/}
                                          </div>
                                          {/* end tab pane */}
                                          <div
                                            className={`tab-pane ${
                                              currentVerticalTab == "ivr"
                                                ? "active"
                                                : "fade"
                                            }`}
                                            id="v-pills-payment"
                                          >
                                            <IvrForm
                                              projectsData={projectsData}
                                            />
                                          </div>
                                          {/* end tab pane */}
                                        </div>
                                        {/* end tab content */}
                                      </div>
                                    </div>
                                    {/* end col */}
                                  </div>
                                </form>
                                {/* end row */}
                              </div>
                            </div>
                            {/* <!-- end card --> */}
                            <div className="card">
                              <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1 h4">
                                  Comments
                                </h4>
                            
                              </div>
                              {/* <!-- end card header --> */}
                              <SimpleBar className="px-3 mx-n3 mb-2 max-h-[400px]">
                                <div className="card-body py-0">
                                  <div className="d-flex pt-4">
                                    {projectsData?.data?.project?.comments
                                      ?.length > 0 && (
                                      <>
                                        <MainComment
                                          projectID={
                                            projectsData?.data?.project?.id
                                          }
                                          projectData={
                                            projectsData?.data?.project
                                              ?.comments
                                          }
                                        />
                                      </>
                                    )}
                                  </div>
                                  {projectsData?.data?.project?.comments
                                    ?.length == 0 && (
                                    <>
                                      <div className="w-full text-center">
                                        <span className="!text-center  text-muted text-[12px] p-1">
                                          No Comments Found
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </SimpleBar>
                              {/* <!-- end card body --> */}
                              <div className="card-footer">
                                <form
                                  className={`${
                                    projectsData?.data?.project?.comments
                                      ?.length == 0
                                      ? "mt-0"
                                      : "mt-4 "
                                  }`}
                                >
                                  <Reply
                                    projectID={projectsData?.data?.project?.id}
                                  />
                                </form>
                              </div>
                            </div>

                            {/* <!-- end card --> */}
                          </div>
                          {/* <!-- ene col --> */}

                          <div className="col-xl-3 col-lg-4">
                            {projectsData?.data?.agreement?.agreement_status <
                              3 && (
                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title mb-4 h5">
                                    Agreement
                                  </h5>
                                  <div className="table-responsive table-card">
                                    <table className="table table-borderless mb-0">
                                      <tr>
                                        <td className="fw-bold " scope="row">
                                          Name
                                        </td>
                                        <td className="py-1 truncate max-w-[250px]">
                                          {projectsData?.data?.profile?.name}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="fw-bold " scope="row">
                                          Email
                                        </td>
                                        <td className="py-1 truncate max-w-[250px]">
                                          {projectsData?.data?.profile?.email}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="fw-bold " scope="row">
                                          Phone
                                        </td>
                                        <td className="py-1 truncate max-w-[250px]">
                                          {projectsData?.data?.profile?.phone}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="fw-bold " scope="row">
                                          Company
                                        </td>
                                        <td className="py-1 truncate max-w-[250px]">
                                          {projectsData?.data?.profile?.company
                                            ? projectsData?.data?.profile
                                                ?.company
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="fw-bold " scope="row">
                                          Address
                                        </td>
                                        <td className="py-1 truncate max-w-[250px]">
                                          {projectsData?.data?.profile?.address}
                                          ,{projectsData?.data?.profile?.city},{" "}
                                          {projectsData?.data?.profile?.state},{" "}
                                          {projectsData?.data?.profile?.country}
                                          ,{projectsData?.data?.profile?.zip}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="fw-bold " scope="row">
                                          Aadhaar Number
                                        </td>
                                        <td className="py-1 truncate max-w-[250px]">
                                          {"x".repeat(
                                            projectsData?.data?.profile
                                              ?.aadhaar_number?.length - 4
                                          ) +
                                            projectsData?.data?.profile?.aadhaar_number?.slice(
                                              -4
                                            )}
                                        </td>
                                      </tr>
                                    </table>
                                    <div className="p-2">
                                      {projectsData?.data?.agreement
                                        ?.agreement_status == 0 && (
                                        <button
                                          className="btn btn-soft-secondary w-full"
                                          disabled
                                          onClick={() =>
                                            handleGenerateAgreement(
                                              projectsData?.data?.project?.id
                                            )
                                          }
                                        >
                                          Generate Agreement
                                        </button>
                                      )}
                                      {projectsData?.data?.agreement
                                        ?.agreement_status > 0 &&
                                        projectsData?.data?.agreement
                                          ?.agreement_status < 3 && (
                                          <>
                                            {projectsData?.data?.agreement
                                              ?.agreement_status > 0 &&
                                              projectsData?.data?.agreement
                                                ?.agreement_status < 3 && (
                                                <div className="flex gap-1 items-center">
                                                  <input
                                                    className=""
                                                    checked={agreementSigned}
                                                    onChange={() =>
                                                      setAgreementSigned(
                                                        !agreementSigned
                                                      )
                                                    }
                                                    type="checkbox"
                                                  ></input>
                                                  <label className="mb-0 ">
                                                    I have received the
                                                    agreement from the customer
                                                  </label>
                                                </div>
                                              )}
                                            <div className="flex mt-2 gap-1 justify-start">
                                              {projectsData?.data?.agreement
                                                ?.agreement_status == 1 && (
                                                <OverlayTrigger
                                                  delay={{
                                                    hide: 450,
                                                    show: 300,
                                                  }}
                                                  overlay={(props) => (
                                                    <Tooltip {...props}>
                                                      {
                                                        projectsData?.data
                                                          ?.agreement
                                                          ?.mail_count
                                                      }{" "}
                                                      / 3 sent
                                                    </Tooltip>
                                                  )}
                                                  placement="bottom"
                                                >
                                                  <button
                                                    className="btn btn-soft-primary hidden"
                                                    disabled={
                                                      projectsData?.data
                                                        ?.agreement
                                                        ?.mail_count == 3
                                                    }
                                                    onClick={() =>
                                                      handleResendAgreement()
                                                    }
                                                  >
                                                    Resend Agreement
                                                  </button>
                                                </OverlayTrigger>
                                              )}
                                              <button
                                                className="btn btn-soft-success"
                                                disabled={
                                                  !agreementSigned || true
                                                }
                                                onClick={() =>
                                                  handleAcceptAgreement(
                                                    projectsData?.data?.project
                                                      ?.id
                                                  )
                                                }
                                              >
                                                Agreement Signed
                                              </button>
                                            </div>
                                          </>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                           
                            <div className="card">
                              <div className="card-body">
                                <h5 className="float-end mt-2 h5 text-primary">
                                  AGREEMENT
                                </h5>
                                <div className="avatar-sm flex-shrink-0">
                                  <span className="avatar-title bg-soft-primary rounded fs-3">
                                    <i className="mdi mdi-file-sign text-primary" />
                                  </span>
                                </div>
                                <p className="text-muted my-1">
                                  Here's what's happening with the customers
                                  agreement
                                </p>
                                <div className=" gap-4 mb-3">
                                  <div>
                                    <i className="mdi mdi-file-image-marker text-primary me-1 align-bottom" />{" "}
                                    Agreement{" "}
                                    <span
                                      className={`badge badge-soft-${
                                        projectsData?.data?.project
                                          ?.agreement_status == 0
                                          ? "primary"
                                          : projectsData?.data?.project
                                              ?.agreement_status == 1
                                          ? "secondary"
                                          : "success"
                                      }`}
                                    >
                                      {projectsData?.data?.project
                                        ?.agreement_status == 0
                                        ? "Pending"
                                        : projectsData?.data?.project
                                            ?.agreement_status == 1
                                        ? "Sent"
                                        : "Received"}
                                    </span>
                                  </div>
                                  <div>
                                    <i className="mdi mdi-clipboard-text-clock text-primary me-1 align-bottom" />{" "}
                                    Agreement sent date:{" "}
                                    <span className="text-muted font-semibold">
                                      {projectsData?.data?.project
                                        ?.agreement_sent_date
                                        ? new Date(
                                            projectsData?.data?.project?.agreement_sent_date
                                          ).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div>
                                    <i className="mdi mdi-clipboard-text-clock text-primary me-1 align-bottom" />{" "}
                                    Agreement received date:{" "}
                                    <span className="text-muted font-semibold">
                                      {projectsData?.data?.project
                                        ?.agreement_received_date
                                        ? new Date(
                                            projectsData?.data?.project?.agreement_received_date
                                          ).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
                                        : "N/A"}
                                    </span>
                                  </div>
                                  {/* <div>
                                    <i className="ri-map-pin-2-line text-primary me-1 align-bottom" />{" "}
                                    <a
                                      href={
                                        projectsData?.data?.project
                                          ?.agreement_url
                                      }
                                    >
                                      Agreement
                                    </a>
                                  </div> */}
                                </div>
                                {/* <div className="hstack gap-2">
                                  <span className="badge badge-soft-warning">
                                    Part Time
                                  </span>
                                  <span className="badge badge-soft-primary">
                                    Freelance
                                  </span>
                                </div> */}

                                {/* {projectsData?.data?.project?.agreement_status <
                                  2 && (
                                  <div className="flex gap-1 items-start">
                                    <p className="mb-0 ">
                                      <input
                                        className="mr-1"
                                        checked={agreementSigned}
                                        onChange={() =>
                                          setAgreementSigned(!agreementSigned)
                                        }
                                        type="checkbox"
                                      ></input>
                                      {projectsData?.data?.project
                                        ?.agreement_status == 0
                                        ? "By accepting this, you confirm that the agreement has been generated and sent to the customer."
                                        : "By accepting this, you confirm that the agreement has been received from the customer."}
                                    </p>
                                  </div>
                                )}
                                <div className="mt-4">
                                  {projectsData?.data?.project
                                    ?.agreement_status == 0 && (
                                    <button
                                      disabled={!agreementSigned}
                                      onClick={() =>
                                        handleSentAgreement(
                                          projectsData?.data?.project?.id
                                        )
                                      }
                                      className="btn btn-soft-secondary w-100"
                                    >
                                      Agreement Sent
                                    </button>
                                  )}
                                  {projectsData?.data?.project
                                    ?.agreement_status == 1 && (
                                    <button
                                      disabled={!agreementSigned}
                                      onClick={() =>
                                        handleReceiveAgreement(
                                          projectsData?.data?.project?.id
                                        )
                                      }
                                      className="btn btn-soft-success w-100"
                                    >
                                      Agreement Received
                                    </button>
                                  )}
                                </div> */}

                              </div>
                            </div>

                            {projectsData?.data?.project?.extensions?.length >
                              0 && (
                              <div className="card">
                                <div className="card-header align-items-center d-flex border-bottom-dashed">
                                  <h4 className="card-title mb-0 flex-grow-1 h4">
                                    Extension Details
                                  </h4>
                                </div>
                                <SimpleBar className="max-h-[400px]">
                                  <div className="card-body !shadow-none">
                                    {projectsData?.data?.project?.extensions?.map(
                                      (ext, ind) => (
                                        <div
                                          key={ind}
                                          className="d-flex align-items-center"
                                        >
                                          <div className="flex-grow-1 ms-3 mb-3 border-light ">
                                            <h6 className="fs-13  w-fit flex">
                                              {ext?.status == 0 && (
                                                <div className="mr-1">
                                                  <button
                                                    disabled
                                                    className="btn btn-primary p-1 bg-primary"
                                                    onClick={() =>
                                                      handleInstallExtension(
                                                        ext
                                                      )
                                                    }
                                                  >
                                                    Install
                                                  </button>
                                                </div>
                                              )}
                                              <div className="fs-13  px-1 w-fit flex items-center border bg-soft-success vert extborder">
                                                Ext No:{" "}
                                                <b>{ext?.ext?.ext_number}</b>
                                                <span className="layeredDiv"></span>
                                                <span className="blackDiv  "></span>
                                              </div>
                                              <span className="blackDivExt "></span>
                                            </h6>

                                            <div className="border noBorderTop rounded-r-lg">
                                              <p className="text-muted fs-11 mb-0 mx-3">
                                                <i className="mdi mdi-account text-dark mr-1 fs-15 align-middle"></i>
                                                UserName :{" "}
                                                <b>{ext?.ext?.username}</b>
                                              </p>
                                              <p className="text-muted fs-11 mb-0 mx-3">
                                                <i className="mdi mdi-account-key text-dark mr-1 fs-15 align-middle"></i>
                                                Password :{" "}
                                                <b>{ext?.ext?.password}</b>
                                              </p>
                                              <p className="text-muted fs-11 mb-0 mx-3">
                                                <i className="mdi mdi-wifi-star text-dark mr-1 fs-15 align-middle"></i>
                                                IP address : Port :{" "}
                                                <b>
                                                  {
                                                    ext?.ext?.ip_address
                                                      ?.ip_address
                                                  }{" "}
                                                  : {ext?.ext?.ip_address?.port}
                                                </b>
                                              </p>
                                              <p className="text-muted fs-11 mb-0  mx-3">
                                                <i className="mdi mdi-map-marker-outline text-dark mr-1 fs-15 align-middle"></i>
                                                IP name:{" "}
                                                <b>
                                                  {ext?.ext?.ip_address?.name}
                                                </b>
                                              </p>
                                              <p className="text-muted fs-11 mb-0  mx-3">
                                                <i className="mdi mdi-phone text-dark fs-15 align-middle"></i>
                                                Caller Id:{" "}
                                                <b>
                                                  {ext?.ext?.caller_id?.cid}
                                                </b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </SimpleBar>
                              </div>
                            )}
                            {/* <!-- end card --> */}
                            <div className="card">
                              <div className="card-header align-items-center d-flex border-bottom-dashed">
                                <h4 className="card-title mb-0 flex-grow-1 h4">
                                  Members
                                </h4>
                                <div className="flex-shrink-0">
                                  <button
                                    type="button"
                                    className={`btn btn-soft-${
                                      showSideInviteMemberComp
                                        ? "danger"
                                        : "success"
                                    } btn-sm`}
                                    onClick={() =>
                                      setShowSideInviteMemberComp(
                                        !showSideInviteMemberComp
                                      )
                                    }
                                  >
                                    <i
                                      className={`${
                                        showSideInviteMemberComp
                                          ? "ri-close-line"
                                          : "ri-share-line"
                                      } me-1 align-bottom`}
                                    ></i>{" "}
                                    {showSideInviteMemberComp
                                      ? "Hide"
                                      : "Invite Member"}
                                  </button>
                                </div>
                              </div>

                              <div className="card-body ">
                                <div className="vstack gap-3">
                                  {showSideInviteMemberComp && (
                                    <>
                                      <div>
                                        <label>Select Members</label>
                                        <Select
                                          isMulti
                                          options={projectsData?.data?.staffs?.map(
                                            (staff) => ({
                                              value: staff?.id,
                                              label: `${staff?.name} (${staff?.staff_type})`,
                                            })
                                          )}
                                          value={sideSelectedMembers}
                                          onChange={(values) => {
                                            setSideSelectedMembers(values);
                                          }}
                                        ></Select>

                                        <button
                                          className="btn btn-warning p-1 mt-2 float-end"
                                          disabled={
                                            sideSelectedMembers?.length == 0
                                          }
                                          onClick={() =>
                                            handleSideInvideMembers()
                                          }
                                        >
                                          Invite Members
                                        </button>
                                      </div>
                                      <hr className="my-2" />
                                    </>
                                  )}
                                </div>
                                {/* <SimpleBar className="px-3 mx-n3 mb-2 max-h-[250px]"> */}
                                <div className="vstack gap-3 ">
                                  {projectsData?.data?.project?.members
                                    ?.length > 0 &&
                                    projectsData?.data?.project?.members?.map(
                                      (member, ind) => {
                                        if (ind < 4) {
                                          return (
                                            <div
                                              key={ind}
                                              className="d-flex align-items-center"
                                            >
                                              <div className="avatar-xs flex-shrink-0 me-3">
                                                <div
                                                  className={`avatar-title bg-soft-${
                                                    colors[
                                                      parseInt(
                                                        member?.staff?.id % 6
                                                      )
                                                    ]
                                                  } text-${
                                                    colors[
                                                      parseInt(
                                                        member?.staff?.id % 6
                                                      )
                                                    ]
                                                  } rounded-circle uppercase`}
                                                >
                                                  {member?.staff?.name?.split(
                                                    " "
                                                  )?.length >= 2
                                                    ? `${
                                                        member?.staff?.name?.split(
                                                          " "
                                                        )[0][0]
                                                      }${
                                                        member?.staff?.name?.split(
                                                          " "
                                                        )[1][0]
                                                      }`
                                                    : member?.staff?.name?.split(
                                                        " "
                                                      )[0][0]}
                                                </div>
                                              </div>
                                              <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 h5">
                                                  <a className="text-body d-block capitalize">
                                                    {member?.staff?.name}
                                                  </a>
                                                  <span
                                                    className={`text-capitalize text-[10px] ${
                                                      member?.staff_type ==
                                                      "staff"
                                                        ? "text-primary"
                                                        : member?.staff_type ==
                                                          "tl"
                                                        ? "text-secondary"
                                                        : "text-danger"
                                                    }`}
                                                  >
                                                    {member?.staff_type}
                                                  </span>
                                                </h5>
                                              </div>
                                              <div className="flex-shrink-0 pointer-events-none">
                                                <div className="d-flex align-items-center gap-1">
                                                  <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                  >
                                                    Message
                                                  </button>
                                                  <div className="dropdown">
                                                    <button
                                                      className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                                      type="button"
                                                      data-bs-toggle="dropdown"
                                                      aria-expanded="false"
                                                    >
                                                      <i className="ri-more-fill"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                      <li>
                                                        <a
                                                          className="dropdown-item"
                                                          href="javascript:void(0);"
                                                        >
                                                          <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                                          View
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          className="dropdown-item"
                                                          href="javascript:void(0);"
                                                        >
                                                          <i className="ri-star-fill text-muted me-2 align-bottom"></i>
                                                          Favourite
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <button
                                                          className="dropdown-item btn btn-light bg-light"
                                                          disabled={
                                                            !member?.staff
                                                              ?.editable
                                                          }
                                                        >
                                                          <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                                                          Delete
                                                        </button>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      }
                                    )}
                                  {projectsData?.data?.project?.members
                                    ?.length > 4 && (
                                    <div className="mt-2 text-center">
                                      <button
                                        type="button"
                                        className="btn btn-secondary bg-secondary"
                                        onClick={() => {
                                          setActiveTab(4);
                                        }}
                                      >
                                        View more
                                      </button>
                                    </div>
                                  )}
                                  {projectsData?.data?.project?.members
                                    ?.length == 0 && (
                                    <span className="text-muted text-[12px] capitalize">
                                      No members found
                                    </span>
                                  )}
                                </div>
                                {/* <!-- end list --> */}
                                {/* </SimpleBar> */}
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header align-items-center d-flex border-bottom-dashed">
                                <h4 className="card-title mb-0 flex-grow-1 h4">
                                  Attachments
                                </h4>
                                <div className="flex-shrink-0">
                                  <button
                                    type="button"
                                    className="btn btn-soft-success btn-sm"
                                    onClick={() =>
                                      setShowAttachmentUpload(
                                        !showAttachmentUpload
                                      )
                                    }
                                  >
                                    <i className="ri-upload-2-fill me-1 align-bottom"></i>{" "}
                                    {!showAttachmentUpload ? "Upload" : "Close"}
                                  </button>
                                </div>
                              </div>
                              <div className="card-body">
                                {showAttachmentUpload && (
                                  <AttachmentUploadComponent
                                    projectId={projectsData?.data?.project?.id}
                                  />
                                )}

                                {projectsData?.data?.project?.attachments
                                  ?.length > 0 &&
                                  projectsData?.data?.project?.attachments?.map(
                                    (attachment, ind) => {
                                      if (ind < 4) {
                                        return (
                                          <div
                                            key={ind}
                                            className="vstack gap-2"
                                          >
                                            <div className="border rounded border-dashed p-2">
                                              <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 me-3">
                                                  <div className="avatar-sm">
                                                    <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                      <i
                                                        className={`ri-${
                                                          attachment?.filetype ==
                                                          "pdf"
                                                            ? "file-pdf"
                                                            : attachment?.filetype?.startsWith(
                                                                "m"
                                                              ) ||
                                                              musicfiletypes.includes(
                                                                attachment?.filetype
                                                              )
                                                            ? "folder-music"
                                                            : attachment?.filetype ==
                                                              "zip"
                                                            ? "folder-zip"
                                                            : attachment?.filetype ==
                                                              "csv"
                                                            ? "file-excel"
                                                            : attachment?.filetype ==
                                                              ""
                                                            ? "file"
                                                            : "image"
                                                        }-line`}
                                                      ></i>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                  <h5 className="fs-13 mb-1 h5">
                                                    <button
                                                      disabled={
                                                        attachment?.filetype?.startsWith(
                                                          "m"
                                                        ) ||
                                                        musicfiletypes.includes(
                                                          attachment?.filetype
                                                        )
                                                      }
                                                      onClick={() =>
                                                        openImg(
                                                          projectsData?.data
                                                            ?.project
                                                            ?.attachments,
                                                          ind
                                                        )
                                                      }
                                                      className="text-body text-truncate d-block "
                                                    >
                                                      {attachment?.title}-
                                                      {attachment?.filetype}
                                                    </button>
                                                  </h5>
                                                  <div>
                                                    {new Date(
                                                      attachment?.created_at
                                                    ).toLocaleDateString(
                                                      "en-GB",
                                                      {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                      }
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex-shrink-0 ms-2">
                                                  <div className="d-flex gap-1">
                                                    <button
                                                      type="button"
                                                      className="btn btn-icon text-muted btn-sm fs-18"
                                                      onClick={() =>
                                                        handleDownload(
                                                          attachment?.id,
                                                          attachment?.title
                                                        )
                                                      }
                                                    >
                                                      <i className="ri-download-2-line"></i>
                                                    </button>
                                                    {/* <div className="dropdown">
                                                      <button
                                                        className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                      >
                                                        <i className="ri-more-fill"></i>
                                                      </button>
                                                      <ul className="dropdown-menu">
                                                        <li>
                                                          <a
                                                            className="dropdown-item"
                                                            href="#"
                                                          >
                                                            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                                            Rename
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            className="dropdown-item"
                                                            href="#"
                                                          >
                                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                                            Delete
                                                          </a>
                                                        </li>
                                                      </ul>
                                                    </div> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                {projectsData?.data?.project?.attachments
                                  ?.length > 3 && (
                                  <div className="mt-2 text-center">
                                    <button
                                      type="button"
                                      className="btn btn-secondary bg-secondary"
                                      onClick={() => setActiveTab(2)}
                                    >
                                      View more
                                    </button>
                                  </div>
                                )}
                                {projectsData?.data?.project?.attachments
                                  ?.length == 0 && (
                                  <span className="text-muted text-[12px] capitalize">
                                    No attachments found
                                  </span>
                                )}
                              </div>
                              {/* <!-- end card body --> */}
                            </div>
                            {/* <!-- end card body --> */}
                          </div>

                          {/* <!-- end card --> */}

                          {/* <!-- end card --> */}
                        </div>
                        {/* <!-- end col --> */}
                      </div>
                    )}
                    {/* <!-- end tab pane --> */}
                    {activeTab == 2 && (
                      <div
                        className={`tab-pane fade ${
                          activeTab == 2 ? "show active" : ""
                        } `}
                        id="project-documents"
                        // role="tabpanel"
                      >
                        <div className="card">
                          <div className="card-body">
                            <div
                              className={`d-flex align-items-center ${
                                projectsData?.data?.project?.attachments
                                  ?.length > 0
                                  ? "mb-4"
                                  : ""
                              }`}
                            >
                              <h5 className="card-title flex-grow-1 h5">
                                Documents
                              </h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                {projectsData?.data?.project?.attachments
                                  ?.length > 0 && (
                                  <div className="table-responsive ">
                                    <Table
                                      response
                                      className="table table-borderless align-middle mb-0"
                                    >
                                      <thead className="table-light">
                                        <tr className="text-center">
                                          <th scope="col">File Name</th>
                                          <th scope="col">Type</th>
                                          <th scope="col">Size</th>
                                          <th scope="col">Upload Date</th>
                                          <th scope="col" className="w-[120px]">
                                            Action
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {projectsData?.data?.project?.attachments?.map(
                                          (attachment, ind) => (
                                            <tr key={ind}>
                                              <td className="!w-[250px]">
                                                <div className="d-flex align-items-center">
                                                  <div className="avatar-sm">
                                                    <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                      <i
                                                        className={`ri-${
                                                          attachment?.filetype ==
                                                          "pdf"
                                                            ? "file-pdf"
                                                            : attachment?.filetype?.startsWith(
                                                                "m"
                                                              ) ||
                                                              musicfiletypes.includes(
                                                                attachment?.filetype
                                                              )
                                                            ? "folder-music"
                                                            : attachment?.filetype ==
                                                              "zip"
                                                            ? "folder-zip"
                                                            : attachment?.filetype ==
                                                              "csv"
                                                            ? "file-excel"
                                                            : attachment?.filetype ==
                                                              ""
                                                            ? "file"
                                                            : "image"
                                                        }-line`}
                                                      ></i>
                                                    </div>
                                                  </div>
                                                  <div className="ms-3 ">
                                                    <h5 className="fs-14 mb-0 h5">
                                                      <a className="text-dark">
                                                        {attachment?.title}
                                                      </a>
                                                    </h5>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className="text-center">
                                                {attachment?.filetype}
                                              </td>
                                              <td className="text-center">
                                                {attachment?.filesize}
                                              </td>
                                              <td className="text-center">
                                                {new Date(
                                                  attachment?.created_at
                                                ).toLocaleDateString(
                                                  undefined,
                                                  {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                  }
                                                )}
                                              </td>
                                              <td className="text-center">
                                                <div className="flex gap-1 justify-center items-center">
                                                  <button
                                                    className="btn btn-soft-info py-1 btn-sm"
                                                    disabled={
                                                      attachment?.filetype?.startsWith(
                                                        "m"
                                                      ) ||
                                                      musicfiletypes.includes(
                                                        attachment?.filetype
                                                      )
                                                    }
                                                    onClick={() =>
                                                      openImg(
                                                        projectsData?.data
                                                          ?.project
                                                          ?.attachments,
                                                        ind
                                                      )
                                                    }
                                                  >
                                                    <i className="ri-eye-fill align-bottom "></i>
                                                  </button>
                                                  <button
                                                    className="btn btn-soft-primary py-1 btn-sm"
                                                    onClick={() =>
                                                      handleDownload(
                                                        attachment?.id,
                                                        attachment?.title
                                                      )
                                                    }
                                                  >
                                                    <i className="ri-download-2-fill  align-bottom "></i>
                                                  </button>
                                                  {/* <button
                                                    className="btn btn-soft-danger py-1 btn-sm pointer-events-none"
                                                    href="javascript:void(0);"
                                                  >
                                                    <i className="ri-delete-bin-5-fill align-bottom "></i>
                                                  </button> */}
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                )}
                                {projectsData?.data?.project?.attachments
                                  ?.length == 0 && (
                                  <p className="text-muted text-lg text-center">
                                    No Documents Found
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <!-- end tab pane --> */}
                    {activeTab == 3 && (
                      <div
                        className={`tab-pane fade ${
                          activeTab == 3 ? "show active" : ""
                        } `}
                        id="project-activities"
                        role="tabpanel"
                      >
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title h5">Activities</h5>
                            <div className="acitivity-timeline py-3">
                              {projectsData?.data?.project?.logs?.length > 0 &&
                                projectsData?.data?.project?.logs?.map(
                                  (log, ind) => (
                                    <div
                                      key={ind}
                                      className="acitivity-item d-flex"
                                    >
                                      <div className="flex-shrink-0">
                                        <img
                                          src="/assets/images/users/default_proile_image.png"
                                          alt=""
                                          className="avatar-xs rounded-circle acitivity-avatar"
                                        />
                                      </div>
                                      <div className="flex-grow-1 mb-2 ms-3">
                                        <h6
                                          className={`mb-1 flex items-center capitalize h6 ${
                                            log?.staff?.name ? "" : "text-muted"
                                          }`}
                                        >
                                          {log?.staff?.name
                                            ? log?.staff?.name
                                            : "N/A"}
                                          <span
                                            className={` ml-2 badge bg-soft-${
                                              log?.staff_type == "admin"
                                                ? "secondary"
                                                : log?.staff_type == "staff"
                                                ? "primary"
                                                : "info"
                                            } text-${
                                              log?.staff_type == "admin"
                                                ? "secondary"
                                                : log?.staff_type == "staff"
                                                ? "primary"
                                                : "info"
                                            } align-middle`}
                                          >
                                            {log?.staff_type}
                                          </span>
                                        </h6>
                                        <p className="text-muted">
                                          <b>{log?.action}</b> : {log?.result}.
                                        </p>
                                        <small className="mb-0 text-muted flex items-center gap-1 mb-2">
                                          <i className="ri-time-line"></i>
                                          {getTimeAgo(log?.created_at)}
                                        </small>
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                          {/* <!--end card-body--> */}
                        </div>
                        {/* <!--end card--> */}
                      </div>
                    )}
                    {/* <!-- end tab pane --> */}
                    {activeTab == 4 && (
                      <div
                        className={`tab-pane fade ${
                          activeTab == 4 ? "show active" : ""
                        } `}
                        id="project-team"
                        role="tabpanel"
                      >
                        <div className="row g-4 mb-3">
                          <div className="col-sm">
                            <div className="d-flex">
                              <div className="search-box me-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) =>
                                    setSearchTerm(e?.target?.value)
                                  }
                                  placeholder="Search member..."
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-auto">
                            <div>
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  className={`btn btn-${
                                    showInviteMemberComp ? "danger" : "success"
                                  } bg-${
                                    showInviteMemberComp ? "danger" : "success"
                                  } btn-sm`}
                                  onClick={() =>
                                    setShowInviteMemberComp(
                                      !showInviteMemberComp
                                    )
                                  }
                                >
                                  <i
                                    className={`${
                                      showInviteMemberComp
                                        ? "ri-close-line"
                                        : "ri-share-line"
                                    } me-1 align-bottom`}
                                  ></i>{" "}
                                  {showInviteMemberComp
                                    ? "Hide"
                                    : "Invite Member"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end row --> */}
                        <div className="vstack gap-3">
                          {showInviteMemberComp && (
                            <>
                              <div>
                                <label>Select Members</label>
                                <Select
                                  isMulti
                                  options={projectsData?.data?.staffs?.map(
                                    (staff) => ({
                                      value: staff?.id,
                                      label: `${staff?.name} (${staff?.staff_type})`,
                                    })
                                  )}
                                  value={selectedMembers}
                                  onChange={(values) => {
                                    setSelectedMembers(values);
                                  }}
                                ></Select>

                                <button
                                  className="btn btn-warning p-1 mt-2 float-end"
                                  disabled={selectedMembers?.length == 0}
                                  onClick={() => handleInvideMembers()}
                                >
                                  Invite Members
                                </button>
                              </div>
                              <hr className="my-2" />
                            </>
                          )}
                        </div>
                        <SimpleBar className="max-h-[500px]">
                          <div className="team-list list-view-filter">
                            {projectData?.length > 0 &&
                              projectData?.map((member, ind) => (
                                <div key={ind} className="card team-box">
                                  <div className="card-body px-4">
                                    <div className="row align-items-center team-row">
                                      <div className="col team-settings">
                                        <div className="row align-items-center">
                                          <div className="col pointer-events-none">
                                            <div className="flex-shrink-0 me-2 pointer-events-none">
                                              <button
                                                type="button"
                                                className="btn fs-16 p-0 favourite-btn"
                                              >
                                                <i className="ri-star-fill"></i>
                                              </button>
                                            </div>
                                          </div>
                                          <div className="col text-end dropdow pointer-events-none">
                                            <a
                                              href="javascript:void(0);"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <i className="ri-more-fill fs-17"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-star-fill text-muted me-2 align-bottom"></i>
                                                  Favourite
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col">
                                        <div className="team-profile-img">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                                <div
                                                  className={`avatar-title bg-soft-${
                                                    colors[
                                                      parseInt(
                                                        member?.staff?.id % 6
                                                      )
                                                    ]
                                                  } text-${
                                                    colors[
                                                      parseInt(
                                                        member?.staff?.id % 6
                                                      )
                                                    ]
                                                  } rounded-circle uppercase`}
                                                >
                                                  {member?.staff?.name?.split(
                                                    " "
                                                  )?.length >= 2
                                                    ? `${
                                                        member?.staff?.name?.split(
                                                          " "
                                                        )[0][0]
                                                      }${
                                                        member?.staff?.name?.split(
                                                          " "
                                                        )[1][0]
                                                      }`
                                                    : member?.staff?.name?.split(
                                                        " "
                                                      )[0][0]}
                                                </div>
                                              </div>
                                          <div className="team-content">
                                            <a className="d-block">
                                              <h5 className="fs-16 mb-1 h5 capitalize">
                                                {member?.staff?.name}
                                              </h5>
                                              <span
                                                    className={`text-capitalize text-[12px] ${
                                                      member?.staff_type ==
                                                      "staff"
                                                        ? "text-primary"
                                                        : member?.staff_type ==
                                                          "tl"
                                                        ? "text-secondary"
                                                        : "text-danger"
                                                    }`}
                                                  >
                                                    {member?.staff_type}
                                                  </span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col">
                                        <div className="row text-muted text-center">
                                          {/* <div className="col-6 border-end border-end-dashed">
                                            <h5 className="mb-1 h5">225</h5>
                                            <p className="text-muted mb-0">
                                              Projects
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <h5 className="mb-1 h5">197</h5>
                                            <p className="text-muted mb-0">
                                              Tasks
                                            </p>
                                          </div> */}
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col pointer-events-none">
                                        <div className="text-end">
                                          <a
                                            //href="profile.html"
                                            className="btn btn-light view-btn"
                                          >
                                            View Profile
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {projectData?.length == 0 && (
                              <p className="text-muted text-lg text-center">
                                No members assigned
                              </p>
                            )}
                            {/* <!--end card--> */}
                          </div>
                          {/* <!-- end team list --> */}
                        </SimpleBar>
                        {/* <!-- end row --> */}
                      </div>
                    )}

                    {/* <!-- end tab pane --> */}
                  </div>
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
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