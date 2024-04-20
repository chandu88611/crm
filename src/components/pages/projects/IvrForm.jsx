/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useState } from "react";
import SimpleBar from "simplebar-react";
import Flow from "./OrgChart";



/* eslint-disable react/no-unescaped-entities */
export default function IvrForm({projectsData}) {
  const [addIvr, setAddIvr] = useState(false)
  const [viewIvr, setViewIvr] = useState([])
  const [editIVR, setEditIVR] = useState(false)

    const handelViewList = () => {
      setViewIvr([]);
      setEditIVR(false);
    };

    const data = projectsData?.data?.project?.sky_ivr?.chartData ? JSON.parse(projectsData?.data?.project?.sky_ivr?.chartData) : "";  
  return (
    <>
        <div>
          <div className="card shadow-none mb-0" id="tasksList">
            <div className="card-header p-2 border-0">
              <div className="d-flex align-items-center gap-2">
                <h5 className="card-title mb-0 flex-grow-1 text-nowrap h5">
                  IVR List
                </h5>
                {viewIvr?.length > 0 && (
                  <div className="form-group row float-end w-full">
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      <button
                        type="button"
                        className="btn btn-mini waves-effect waves-light btn-danger float-end bg-danger p-1 fs-12"
                        onClick={() => setViewIvr([])}
                      >
                        <span className="mdi mdi-arrow-left-bold-circle mr-1"></span>
                        Go to IVR list
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*end card-body*/}
            {!viewIvr?.length && (
              // <SimpleBar className="max-h-[500px]">
              <div className="card-body">
                <div className="table-responsive table-card mb-4">
                  <table className="table dt-responsive w-100" id="example">
                    <thead className="table-light text-muted text-nowrap">
                      <tr>
                        <th className="!p-2">IVR Name</th>
                        {/* <th className="!p-2">Welcome File</th> */}
                        <th className="!p-2">Deartment Count</th>
                        <th className="!p-2">Office Timing</th>
                        <th className="!p-2">Status</th>
                        <th className="!p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {projectsData?.data?.project?.sky_ivr?.ivr_id &&
                        [projectsData?.data?.project?.sky_ivr]?.map(
                          (ivr, ind) => (
                            <tr key={ind}>
                              <td className="!pl-1 text-start">
                                <div>
                                  <a href="" className="fw-medium link-primary">
                                    {ivr?.ivrname}
                                  </a>
                                </div>
                              </td>
                              {/* <td>
                                <audio controls>
                        <source
                          src={ivr?.ivrwelcome_file}
                          type="audio/ogg"
                        />
                        <source
                          src={ivr?.ivrwelcome_file}
                          type="audio/mpeg"
                                  />
                                  </audio>
                              </td> */}
                              <td className="!pl-1 text-start">
                                <div>
                                  <span>{ivr?.department_count}</span>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div>
                                  <span>{ivr?.workinghours}</span>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div>
                                  <span
                                    className={`badge badge-soft-${
                                      ivr?.varstatus == "active"
                                        ? "success"
                                        : ivr?.varstatus == "inactive"
                                        ? "danger"
                                        : "warning"
                                    } capitalize p-2 fs-12`}
                                  >
                                    {ivr?.varstatus
                                      ? ivr?.varstatus
                                      : "Processing"}
                                  </span>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div>
                                  <div className="">
                                    <button
                                      className="btn btn-soft-primary btn-sm dropdown"
                                      type="button"
                                      onClick={() => setViewIvr([ivr])}
                                    >
                                      <i className="mdi mdi-eye-outline" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      {!projectsData?.data?.project?.sky_ivr?.ivr_id && (
                        <tr>
                          <td colSpan={8}>
                            <p className="text-center w-full text-lg">
                              No data found
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/*end table*/}
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#08a88a"
                        style={{
                          width: 75,
                          height: 75,
                        }}
                      />
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 200k+ tasks We did not find any
                        tasks for you search.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              // {/* </SimpleBar> */}
            )}
            {viewIvr?.length > 0 && (
              <div className="card-body p-2">
                {/* {viewIvr[0]?.workinghours == "24hours" && ( */}
                <div className="card-block">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>IVR Name&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewIvr[0]?.ivrname}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Welcome file&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      <audio controls>
                        <source
                          src={viewIvr[0]?.ivrwelcome_file}
                          type="audio/ogg"
                        />
                        <source
                          src={viewIvr[0]?.ivrwelcome_file}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Department count&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewIvr[0]?.department_count}
                      <span className="messages" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Status&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      <span
                        className={`badge badge-soft-${
                          viewIvr[0]?.varstatus == "active"
                            ? "success"
                            : viewIvr[0]?.varstatus == "inactive"
                            ? "danger"
                            : "warning"
                        } capitalize p-2 fs-12`}
                      >
                        {viewIvr[0]?.varstatus
                          ? viewIvr[0]?.varstatus
                          : "Processing"}
                      </span>
                      <span className="messages" />
                    </div>
                  </div>
                  <div className="form-group row mt-1">
                    <label className="col-sm-2 col-form-label">
                      <strong>Office timings&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewIvr[0]?.workinghours}
                      <span className="messages" />
                    </div>
                  </div>

                  {/* {viewIvr[0]?.workinghours?.toLowerCase() != "customize" && (
                    <div className="form-group row">
                      <div className="col-sm-10" style={{ paddingTop: 8 }}>
                        <button
                          type="button"
                          className="btn btn-mini waves-effect waves-light btn-danger bg-danger p-1 fs-12"
                          onClick={() => setViewIvr([])}
                        >
                          <span className="mdi mdi-arrow-left-bold-circle mr-1"></span>
                          Go to IVR list
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
                {/* // )} */}
                {viewIvr[0]?.workinghours?.toLowerCase() == "customize" && (
                  <>
                    <div className=" border-dashed border p-1">
                      <table
                        width="800"
                        height="115"
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <strong>Time to Start </strong>
                            </td>
                            <td>
                              &nbsp;{viewIvr[0]?.timestartmin}
                              &nbsp;&nbsp;Minutes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {viewIvr[0]?.timestartsec}&nbsp;&nbsp;Seconds{" "}
                            </td>
                            <td>
                              <strong>Time to finish </strong>
                            </td>
                            <td>
                              {viewIvr[0]?.timefinmin}
                              &nbsp;&nbsp;Minutes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {viewIvr[0]?.timefinsec}&nbsp;&nbsp;Seconds
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Week Day Start </strong>
                            </td>
                            <td>&nbsp;{viewIvr[0]?.weekdaystart}</td>
                            <td>
                              <strong>Week Day finish </strong>
                            </td>
                            <td>&nbsp;{viewIvr[0]?.weekdayfinish}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Month Day start </strong>
                            </td>
                            <td>&nbsp;{viewIvr[0]?.monthdaystart}</td>
                            <td>
                              <strong>Month Day finish </strong>
                            </td>
                            <td>&nbsp;{viewIvr[0]?.monthdayfinish}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Month start </strong>
                            </td>
                            <td>&nbsp;{viewIvr[0]?.monthstart}</td>
                            <td>
                              <strong>Month finish </strong>
                            </td>
                            <td>&nbsp;{viewIvr[0]?.monthfinish}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <Flow projectsData={data} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
    </>
  );
}