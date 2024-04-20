/* eslint-disable no-unused-vars */
import Header from "../Header";
import SimpleBar from "simplebar-react";
import MainComment from "./ParentComment";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom";

import Loader from "../Loader";
import { FilePond } from "react-filepond";
import AttachmentUploadComponent from "./AttachmentUpload";
import axios from "axios";
import Reply from "./Reply";
import { Table } from "react-bootstrap";
import GLightbox from "glightbox";
import Select from "react-select";
import { successAlert } from "../swAlert";
import { useAssignMemberMutation, useViewProjectQuery } from "../../../services/api";

export default function ProjectOverview() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [readMore, setReadMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectData, setProjectData] = useState("");
  const [showSideInviteMemberComp, setShowSideInviteMemberComp] =
    useState(false);
  const [sideSelectedMembers, setSideSelectedMembers] = useState([]);
  const [showInviteMemberComp, setShowInviteMemberComp] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showAttachmentUpload, setShowAttachmentUpload] = useState(false);
  const decryptedID = CryptoJS.AES.decrypt(
    params?.id.replace(/_/g, "/").replace(/-/g, "+"),
    "customer_id"
  ).toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

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
      `https://skycontroller.connetz.shop/tl-api/projects/download-attachment?id=${id}`,
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
      {detailsLoading || (assignLoading && <Loader />)}
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
                              <div className="col-md">
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
                            </div>
                          </div>
                          <div className="col-md-auto">
                            <div className="hstack gap-1 flex-wrap">
                              <button
                                type="button"
                                className="btn py-0 fs-16 favourite-btn active"
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
                          <li className="nav-item">
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
                          <li className="nav-item">
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
                          <li className="nav-item">
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
                          <li className="nav-item">
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
                          <div className="col-xl-9 col-lg-8">
                            <div className="card">
                              <div className="card-body">
                                <div className="text-muted">
                                  <h6 className="mb-3 fw-semibold text-uppercase h6">
                                    Summary
                                  </h6>
                                  <p>
                                    {projectsData?.data?.project?.description}
                                  </p>
                                  <ul
                                    className={`ps-4 vstack gap-2 ${
                                      readMore ? "" : "line-clamp-2"
                                    } break-words`}
                                  >
                                    {
                                      projectsData?.data?.project
                                        ?.long_description
                                    }
                                  </ul>
                                  {projectsData?.data?.project?.long_description
                                    ?.length > 25 && (
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-link link-success p-0"
                                        onClick={() => setReadMore(!readMore)}
                                      >
                                        {readMore ? "Read less" : "Read more"}
                                      </button>
                                    </div>
                                  )}
                                  <div className="pt-3 border-top border-top-dashed mt-4">
                                    <div className="row">
                                      <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Create Date :
                                          </p>
                                          <h5 className="fs-15 mb-0 h5">
                                            {new Date(
                                              projectsData?.data?.project?.project_created
                                            ).toLocaleString("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </h5>
                                        </div>
                                      </div>
                                      {/* <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Due Date :
                                          </p>
                                          <h5 className="fs-15 mb-0 h5">
                                            {new Date(
                                              projectsData?.data?.project?.deadline
                                            ).toLocaleString("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </h5>
                                        </div>
                                      </div> */}
                                      <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Priority :
                                          </p>
                                          <div className="badge bg-danger fs-12">
                                            High
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Status :
                                          </p>
                                          <div
                                            className={`badge  ${
                                              projectsData?.data?.project
                                                ?.status == 0
                                                ? "bg-primary"
                                                : projectsData?.data?.project
                                                    ?.status == 2
                                                ? "bg-success"
                                                : "bg-warning"
                                            } fs-12`}
                                          >
                                            {projectsData?.data?.project
                                              ?.status == 0
                                              ? "Pending"
                                              : projectsData?.data?.project
                                                  ?.status == 2
                                              ? "Completed"
                                              : "Processing"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pt-3 border-top border-top-dashed mt-4">
                                    <h6 className="mb-3 fw-semibold text-uppercase h6">
                                      Agreement
                                    </h6>
                                    <div className="row g-3">
                                      <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Agreement Sent Date :
                                          </p>
                                          <h5 className="fs-15 mb-0 h5">
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
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Agreement Received Date :
                                          </p>
                                          <h5 className="fs-15 mb-0 h5">
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
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-sm-6">
                                        <div>
                                          <p className="mb-2 text-uppercase fw-medium">
                                            Agreement Status :
                                          </p>
                                          <h5 className="fs-15 mb-0 h5">
                                            {"N/A"}
                                          </h5>
                                        </div>
                                      </div>
                                      {/* <!-- end col --> */}
                                    </div>
                                    {/* <!-- end row --> */}
                                  </div>
                                </div>
                              </div>
                              {/* <!-- end card body --> */}
                            </div>
                            {/* <!-- end card --> */}
                            <div className="card">
                              <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1 h4">
                                  Comments
                                </h4>
                                <div className="flex-shrink-0">
                                  <div className="dropdown card-header-dropdown">
                                    <a
                                      className="text-reset dropdown-btn"
                                      href="#"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <span className="text-muted">
                                        Recent
                                        <i className="mdi mdi-chevron-down ms-1"></i>
                                      </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <a className="dropdown-item" href="#">
                                        Recent
                                      </a>
                                      <a className="dropdown-item" href="#">
                                        Top Rated
                                      </a>
                                      <a className="dropdown-item" href="#">
                                        Previous
                                      </a>
                                    </div>
                                  </div>
                                </div>
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
                                          data={
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
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title mb-4 h5">
                                  Extensions
                                </h5>
                                <div className="d-flex flex-wrap gap-2 fs-16">
                                  {projectsData?.data?.project?.extensions
                                    ?.length > 0 && (
                                    <div className="badge fw-medium badge-soft-secondary">
                                      4001
                                    </div>
                                  )}
                                  {!projectsData?.data?.projects
                                    ?.extensions && (
                                    <span className="text-muted text-[12px] capitalize">
                                      No extensions found
                                    </span>
                                  )}
                                </div>
                              </div>
                              {/* <!-- end card body --> */}
                            </div>
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
                                              label: staff?.name,
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
                                <div className="vstack gap-3 pointer-events-none">
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
                                                    colors[parseInt(ind % 6)]
                                                  } text-${
                                                    colors[parseInt(ind % 6)]
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
                                                </h5>
                                              </div>
                                              <div className="flex-shrink-0">
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
                                        onClick={() => setActiveTab(4)}
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
                                                    <a
                                                      onClick={() =>
                                                        openImg(
                                                          openImg(
                                                            projectsData?.data
                                                              ?.project
                                                              ?.attachments,
                                                            ind
                                                          )
                                                        )
                                                      }
                                                      className="text-body text-truncate d-block"
                                                    >
                                                      {attachment?.title}-
                                                      {attachment?.filetype}
                                                    </a>
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
                                                    <div className="dropdown">
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
                                                    </div>
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
                                                <div className="flex gap-1 items-center">
                                                  <button
                                                    className="btn btn-soft-info py-1 btn-sm"
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
                                                  <button
                                                    className="btn btn-soft-danger py-1 btn-sm pointer-events-none"
                                                    href="javascript:void(0);"
                                                  >
                                                    <i className="ri-delete-bin-5-fill align-bottom "></i>
                                                  </button>
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
                              <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src="/assets/images/users/avatar-1.jpg"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    Oliver Phillips{" "}
                                    <span className="badge bg-soft-primary text-primary align-middle">
                                      New
                                    </span>
                                  </h6>
                                  <p className="text-muted mb-2">
                                    We talked about a project on linkedin.
                                  </p>
                                  <small className="mb-0 text-muted">
                                    Today
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                  <div className="avatar-title bg-soft-success text-success rounded-circle">
                                    N
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    Nancy Martino{" "}
                                    <span className="badge bg-soft-secondary text-secondary align-middle">
                                      In Progress
                                    </span>
                                  </h6>
                                  <p className="text-muted mb-2">
                                    <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                                    Create new project Buildng product
                                  </p>
                                  <div className="avatar-group mb-2">
                                    <a
                                      href="javascript: void(0);"
                                      className="avatar-group-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Christi"
                                    >
                                      <img
                                        src="/assets/images/users/avatar-4.jpg"
                                        alt=""
                                        className="rounded-circle avatar-xs"
                                      />
                                    </a>
                                    <a
                                      href="javascript: void(0);"
                                      className="avatar-group-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Frank Hook"
                                    >
                                      <img
                                        src="/assets/images/users/avatar-3.jpg"
                                        alt=""
                                        className="rounded-circle avatar-xs"
                                      />
                                    </a>
                                    <a
                                      href="javascript: void(0);"
                                      className="avatar-group-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title=" Ruby"
                                    >
                                      <div className="avatar-xs">
                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                          R
                                        </div>
                                      </div>
                                    </a>
                                    <a
                                      href="javascript: void(0);"
                                      className="avatar-group-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="more"
                                    >
                                      <div className="avatar-xs">
                                        <div className="avatar-title rounded-circle">
                                          2+
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                  <small className="mb-0 text-muted">
                                    Yesterday
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src="/assets/images/users/avatar-2.jpg"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    Natasha Carey{" "}
                                    <span className="badge bg-soft-success text-success align-middle">
                                      Completed
                                    </span>
                                  </h6>
                                  <p className="text-muted mb-2">
                                    Adding a new event with attachments
                                  </p>
                                  <div className="row">
                                    <div className="col-xxl-4">
                                      <div className="row border border-dashed gx-2 p-2 mb-2">
                                        <div className="col-4">
                                          <img
                                            src="/assets/images/small/img-2.jpg"
                                            alt=""
                                            className="img-fluid rounded"
                                          />
                                        </div>
                                        {/* <!--end col--> */}
                                        <div className="col-4">
                                          <img
                                            src="/assets/images/small/img-3.jpg"
                                            alt=""
                                            className="img-fluid rounded"
                                          />
                                        </div>
                                        {/* <!--end col--> */}
                                        <div className="col-4">
                                          <img
                                            src="/assets/images/small/img-4.jpg"
                                            alt=""
                                            className="img-fluid rounded"
                                          />
                                        </div>
                                        {/* <!--end col--> */}
                                      </div>
                                      {/* <!--end row--> */}
                                    </div>
                                  </div>
                                  <small className="mb-0 text-muted">
                                    25 Nov
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src="/assets/images/users/avatar-6.jpg"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">Bethany Johnson</h6>
                                  <p className="text-muted mb-2">
                                    added a new member to velzon dashboard
                                  </p>
                                  <small className="mb-0 text-muted">
                                    19 Nov
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs acitivity-avatar">
                                    <div className="avatar-title rounded-circle bg-soft-danger text-danger">
                                      <i className="ri-shopping-bag-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    Your order is placed{" "}
                                    <span className="badge bg-soft-danger text-danger align-middle ms-1">
                                      Out of Delivery
                                    </span>
                                  </h6>
                                  <p className="text-muted mb-2">
                                    These customers can rest assured their order
                                    has been placed.
                                  </p>
                                  <small className="mb-0 text-muted">
                                    16 Nov
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src="/assets/images/users/avatar-7.jpg"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">Lewis Pratt</h6>
                                  <p className="text-muted mb-2">
                                    They all have something to say beyond the
                                    words on the page. They can come across as
                                    casual or neutral, exotic or graphic.{" "}
                                  </p>
                                  <small className="mb-0 text-muted">
                                    22 Oct
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                  <div className="avatar-xs acitivity-avatar">
                                    <div className="avatar-title rounded-circle bg-soft-info text-info">
                                      <i className="ri-line-chart-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    Monthly sales report
                                  </h6>
                                  <p className="text-muted mb-2">
                                    <span className="text-danger">
                                      2 days left
                                    </span>{" "}
                                    notification to submit the monthly sales
                                    report.{" "}
                                    <a
                                      href="javascript:void(0);"
                                      className="link-warning text-decoration-underline"
                                    >
                                      Reports Builder
                                    </a>
                                  </p>
                                  <small className="mb-0 text-muted">
                                    15 Oct
                                  </small>
                                </div>
                              </div>
                              <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src="/assets/images/users/avatar-8.jpg"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    New ticket received{" "}
                                    <span className="badge bg-soft-success text-success align-middle">
                                      Completed
                                    </span>
                                  </h6>
                                  <p className="text-muted mb-2">
                                    User{" "}
                                    <span className="text-secondary">
                                      Erica245
                                    </span>{" "}
                                    submitted a ticket.
                                  </p>
                                  <small className="mb-0 text-muted">
                                    26 Aug
                                  </small>
                                </div>
                              </div>
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
                                      label: staff?.name,
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
                                          <div className="avatar-lg img-thumbnail rounded-circle">
                                            <img
                                              src="/assets/images/users/default_proile_image.png"
                                              alt=""
                                              className="img-fluid d-block rounded-circle"
                                            />
                                          </div>
                                          <div className="team-content">
                                            <a className="d-block">
                                              <h5 className="fs-16 mb-1 h5 capitalize">
                                                {member?.staff?.name}
                                              </h5>
                                            </a>
                                            <p className="text-muted mb-0 capitalize">
                                              {member?.staff_type}
                                            </p>
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
