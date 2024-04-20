/* eslint-disable react/prop-types */
import { useState } from "react";
import SimpleBar from "simplebar-react";

/* eslint-disable react/no-unescaped-entities */
export default function DepartmentForm({projectsData}) {
  const [viewDepartment, setViewDepartment] = useState([]);



  return (
    <>
        <div>
          {/* Department list table starts */}
          <div className="card shadow-none mb-0" id="tasksList">
            <div className="card-header p-2 border-0">
              <div className="d-flex align-items-center gap-2">
                <h5 className="card-title mb-0 h5 flex-grow-1 h5">
                  Department List
                </h5>
              </div>
            </div>
            {!viewDepartment?.length && (
              <SimpleBar className="max-h-[500px]">
                <div className="card-body">
                  <div className="table-responsive table-card mb-4">
                    <table className="table dt-responsive w-100" id="example">
                      <thead className="table-light text-muted text-nowrap">
                        <tr>
                          <th className="!p-2">Dept Name</th>
                          <th className="!p-2">User</th>
                          <th className="!p-2">Ringing Type</th>
                          <th className="!p-2" width={150}>
                            Skip Busy Agent
                          </th>
                          <th className="!p-2">Status</th>
                          <th className="!p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {projectsData?.data?.project?.sky_departments?.length > 0 && projectsData?.data?.project?.sky_departments?.map(
                          (department, ind) => (
                            <tr key={ind}>
                              <td className="!pl-1 text-start">
                                <div className="">
                                  <a
                                    href=""
                                    className=" text-capitalize fw-medium link-primary"
                                  >
                                    {department?.department_name}
                                  </a>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div className="">
                                  <a className="fw-medium link-primary text-capitalize">
                                    {department?.users?.map((user, index) => (
                                      <p key={index}>
                                        {user?.mem_name}
                                        {department?.users?.length - 1 == index
                                          ? ""
                                          : ", "}
                                      </p>
                                    ))}
                                  </a>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div className="">
                                  <a className="fw-medium link-primary">
                                    {department?.riging_type}
                                  </a>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div className="">
                                  <span>{department?.skipbusy_agent}</span>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div className="">
                                  <span
                                    className={`badge badge-soft-${
                                      department?.varstatus == "active"
                                        ? "success"
                                        : department?.varstatus == "inactive"
                                        ? "danger"
                                        : "warning"
                                    } capitalize p-2 fs-12`}
                                  >
                                    {department?.varstatus
                                      ? department?.varstatus
                                      : "Processing"}
                                  </span>
                                </div>
                              </td>
                              <td className="!pl-1 text-start">
                                <div className="flex gap-1">
                                  <button
                                    className="btn btn-soft-primary btn-sm"
                                    type="button"
                                    onClick={() =>
                                      setViewDepartment([department])
                                    }
                                  >
                                    <i className="mdi mdi-eye-outline" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                        {projectsData?.data?.project?.sky_departments?.length ==
                          0 && (
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
                          We've searched more than 200k+ tasks We did not find
                          any tasks for you search.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleBar>
            )}
            {viewDepartment?.length > 0 && (
              <div className="card-body p-2">
                <div className="card-block">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Department Name&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewDepartment[0]?.department_name}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>User&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewDepartment[0]?.users?.map((user, index) => (
                        <p key={index}>
                          {user?.mem_name}
                          {` (${user?.mem_mobile_number})`}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Ringing type&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewDepartment[0]?.riging_type}
                      <span className="messages" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Welcome audio&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      <audio controls>
                        <source src={viewDepartment[0]?.welcome_file} />
                        <source
                          src={viewDepartment[0]?.welcome_file}
                          type="audio/ogg"
                        />
                        Your browser does not support the audio tag.
                      </audio>
                      <span className="messages" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Busy tone</strong>
                    </label>
                    <div className="col-sm-10">
                      <audio controls>
                        <source src={viewDepartment[0]?.busytone_file} />
                        <source
                          src={viewDepartment[0]?.busytone_file}
                          type="audio/ogg"
                        />
                      </audio>
                      <span className="messages" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      <strong>Skip bust agent&nbsp;:</strong>
                    </label>
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      {viewDepartment[0]?.skipbusy_agent}
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
                          viewDepartment[0]?.varstatus == "active"
                            ? "success"
                            : viewDepartment[0]?.varstatus == "inactive"
                            ? "danger"
                            : "warning"
                        } capitalize p-2 fs-12`}
                      >
                        {viewDepartment[0]?.varstatus
                          ? viewDepartment[0]?.varstatus
                          : "Processing"}
                      </span>
                      <span className="messages" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10" style={{ paddingTop: 8 }}>
                      <button
                        type="button"
                        className="btn btn-mini waves-effect waves-light btn-danger bg-danger p-1 fs-12"
                        onClick={() => setViewDepartment([])}
                      >
                        <span className="mdi mdi-arrow-left-bold-circle mr-1"></span>
                        Go to Department list
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*end card-body*/}
          </div>
        </div>
    </>
  );
}