/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Select from "react-select";
import {
  useLazyProjectsPaginationQuery,
  useProjectsListQuery,
} from "../../../services/api";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import CryptoJS from "crypto-js";
import Header from "../Header";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import InvoiceModal from "../invoices/invoice/InvoiceModal";

export default function Projects({ type }) {
  const [projectsData, setProjectsData] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [invId, setInvId] = useState();

  function interpolateColor(percentage) {
    // Ensure percentage is within [0, 100]
    percentage = Math.max(0, Math.min(100, percentage));

    // Convert percentage to a value between 0 and 1
    var normalizedPercentage = percentage / 100.0;

    // Define RGB values for green and red
    var green = [0, 200, 0];
    var red = [255, 0, 0];

    // Interpolate between red and green based on the percentage
    var r = Math.round(
      red[0] * (1 - normalizedPercentage) + green[0] * normalizedPercentage
    );
    var g = Math.round(
      red[1] * (1 - normalizedPercentage) + green[1] * normalizedPercentage
    );
    var b = Math.round(
      red[2] * (1 - normalizedPercentage) + green[2] * normalizedPercentage
    );

    return "rgb(" + r + "," + g + "," + b + ")";
  }

  const { data: fetchProjects, isLoading, err } = useProjectsListQuery(type);
  useEffect(() => {
    setProjectsData(fetchProjects);
  }, [fetchProjects]);

  const [
    nextPage,
    { data: pageData, isLoading: loading, error: paginationErr },
  ] = useLazyProjectsPaginationQuery();

  const handleNext = () => {
    nextPage({
      type: type,
      no: projectsData?.data?.projects?.current_page + 1,
    }).then((res) => {
      setProjectsData(res.data);
    });
  };

  const handlePrevious = () => {
    nextPage({
      type: type,
      no: projectsData?.data?.projects?.current_page - 1,
    }).then((res) => {
      setProjectsData(res.data);
    });
  };

  const handleCustomPage = (pageNO) => {
    nextPage({
      type: type,
      no: pageNO,
    }).then((res) => {
      setProjectsData(res.data);
    });
  };

  const hideinv = () => {
    setShowInvoice(false);
  };

  const handleShowInvoice = (id) => {
    setShowInvoice(true);
    setInvId(id);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              {/* <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex justify-content-sm-end gap-2">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                    </div>
                    <Select
                      className="f w-md"
                      data-choices
                      data-choices-search-false
                      options={[
                        { label: "All", value: "All" },
                        { label: "Today", value: "Today" },
                        { label: "Yesterday", value: "Yesterday" },
                        { label: "Last 7 Days", value: "Last 7 Days" },
                        { label: "Last 30 Days", value: "Last 30 Days" },
                        { label: "This Month", value: "This Month" },
                        { label: "Last Year", value: "Last Year" },
                      ]}
                    ></Select>
                  </div>
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between py-0 my-0">
                    <h4 className="mb-sm-0 font-size-18"> </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Configuration</a>
                        </li>
                        <li className="breadcrumb-item active">{type}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div> */}
              <h4 className="h4 capitalize">Projects {type}</h4>
              <div className="row mt-3">
                {projectsData?.data?.projects?.total > 0 &&
                  projectsData?.data?.projects?.data?.map((project, ind) => (
                    <div key={ind} className="col-xxl-3 col-sm-6 project-card">
                      <div className="card border border-soft-primary">
                        <div className="card-body">
                          <div
                            className={`p-3 mt-n3 mx-n3 ${
                              type == "pending"
                                ? "bg-soft-primary"
                                : type == "completed"
                                ? "bg-soft-success"
                                : "bg-soft-warning"
                            } rounded-top`}
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <h5 className="mb-0 fs-14 h5">
                                  <a className="text-dark">
                                    <span
                                      className="hover:text-secondary cursor-pointer"
                                      onClick={() =>
                                        (window.location.href = `/project-overview/${CryptoJS.AES.encrypt(
                                          `${project?.id}`,
                                          "customer_id"
                                        )
                                          ?.toString()
                                          .replace(/\//g, "_")
                                          .replace(/\+/g, "-")}`)
                                      }
                                    >
                                      {project?.project_no}
                                    </span>{" "}
                                    /{" "}
                                    <span
                                      className="text-primary !cursor-pointer"
                                      onClick={() =>
                                        handleShowInvoice(project?.invoice?.id)
                                      }
                                    >
                                      {project?.invoice?.prefix}-
                                      {project?.invoice?.id
                                        ?.toString()
                                        .padStart(5, "0") +
                                        "/" +
                                        (
                                          new Date(
                                            project?.invoice?.date
                                          ).getMonth() + 1
                                        )
                                          ?.toString()
                                          ?.padStart(2, "0") +
                                        "/" +
                                        new Date(
                                          project?.invoice?.date
                                        ).getFullYear()}
                                    </span>
                                  </a>
                                </h5>
                              </div>
                              {/* <div className="flex-shrink-0">
                                <div className="d-flex gap-1 align-items-center my-n2">
                                  <button
                                    type="button"
                                    className="btn avatar-xs p-0 favourite-btn active"
                                  >
                                    <OverlayTrigger
                                      delay={{ hide: 450, show: 300 }}
                                      overlay={(props) => (
                                        <Tooltip {...props}>
                                          {`${project?.seater} seaters`}
                                        </Tooltip>
                                      )}
                                      placement="bottom"
                                    >
                                      <p className="avatar-title bg-transparent fs-15">
                                        <span className="mdi mdi-chair-rolling text-secondary"></span>
                                        <span className="text-black">
                                          {project?.seater}
                                        </span>
                                      </p>
                                    </OverlayTrigger>
                                  </button>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="py-3">
                            <div className="row gy-3">
                              <div className="col-6">
                                <div>
                                  <p className="text-muted mb-1">Status</p>
                                  <div
                                    className={`badge ${
                                      project?.status == 0
                                        ? "badge-soft-primary"
                                        : project?.status == 2
                                        ? "badge-soft-success"
                                        : "badge-soft-warning"
                                    } fs-12`}
                                  >
                                    {project?.status == 0
                                      ? "Pending"
                                      : project?.status == 2
                                      ? "Completed"
                                      : "Processing"}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div>
                                  <p className="text-muted mb-1">Deadline</p>
                                  <h5 className="fs-14 h5">
                                    {new Date(
                                      project?.deadline
                                    ).toLocaleDateString(undefined, {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </h5>
                                </div>
                              </div>
                            </div>

                            <div className=" items-center justify-between">
                              <div className="d-flex align-items-center  mt-3">
                                <p className="text-muted mb-0 me-2">Team :</p>
                                <div className="avatar-group w-[90%] overflow-auto">
                                  {project?.members?.map(
                                    (member, idx) => (
                                      <a
                                        key={idx}
                                        href="javascript: void(0);"
                                        className="avatar-group-item"
                                        data-bs-toggle="tooltip"
                                        data-bs-trigger="hover"
                                        data-bs-placement="top"
                                        title={member?.name}
                                      >
                                        <div className="avatar-xxs">
                                          <div
                                            className={`avatar-title rounded-circle ${
                                              type == "pending"
                                                ? "bg-danger"
                                                : type == "completed"
                                                ? "bg-success"
                                                : "bg-warning"
                                            }`}
                                          >
                                            {member?.name[0]}
                                          </div>
                                        </div>
                                      </a>
                                    )
                                  )}
 
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <span className="text-muted">Customer:</span>
                                <p className=" mb-0 me-2 !truncate !w-[70%]  text-capitalize ">
                                  <span className="text-dark !truncate !w-2">
                                    {project?.customer?.first_name}{" "}
                                    {project?.customer?.last_name} 
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="d-flex mb-2">
                              <div className="flex-grow-1">
                                <div>Progress</div>
                              </div>
                              <div className="flex-shrink-0">
                                <div>{project?.pro_progress}%</div>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full">
                              <div
                                className={`   text-xs leading-none py-[2.5px] rounded-full text-center text-white !w-[${project?.pro_progress}%] delay-1000 transition-all`}
                                style={{
                                  width: `${project?.pro_progress}%`,
                                  background: interpolateColor(
                                    project?.pro_progress
                                  ),
                                }}
                              >
                                {/* 75% */}
                              </div>
                            </div>
                            {/* <!-- /.progress --> */}
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                  ))}
              </div>
              {projectsData?.data?.projects?.total > 0 && (
                <div className="row g-0 text-center text-sm-start align-items-center mb-4">
                  <div className="col-sm-6">
                    <div>
                      <p className="mb-sm-0 text-muted">
                        Showing{" "}
                        {projectsData?.data?.projects?.from
                          ? projectsData?.data?.projects?.from
                          : 0}{" "}
                        to{" "}
                        {projectsData?.data?.projects?.to
                          ? projectsData?.data?.projects?.to
                          : 0}{" "}
                        of {projectsData?.data?.projects?.total} entries
                      </p>
                    </div>
                  </div>
                  {/* <!-- end col --> */}
                  <div className="col-sm-6">
                    <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                      {projectsData?.data?.projects?.links?.map((page, ind) => (
                        <li
                          key={ind}
                          className={`page-item ${
                            page?.active ? "active" : ""
                          }`}
                          onClick={() => {
                            if (page?.label?.includes("Previous")) {
                              handlePrevious();
                            } else if (page?.label?.includes("Next")) {
                              handleNext();
                            } else {
                              handleCustomPage(parseInt(page?.label));
                            }
                          }}
                        >
                          <button
                            disabled={page?.url == null}
                            className="page-link"
                            dangerouslySetInnerHTML={{ __html: page?.label }}
                          ></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <!-- end col --> */}
                </div>
              )}
              {projectsData?.data?.projects?.total == 0 && (
                <p className="h3 text-center text-muted">No projects found</p>
              )}
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
      {showInvoice && invId && (
        <InvoiceModal
          show={showInvoice}
          hide={hideinv}
          invId={invId}
          source={"projects"}
        />
      )}
    </>
  );
}
