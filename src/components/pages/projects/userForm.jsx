/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import GLightbox from "glightbox";
import SimpleBar from "simplebar-react";

/* eslint-disable react/no-unescaped-entities */
export default function UserForm({ projectsData }) {
  const [addUser, setAddUser] = useState(false)
  const [viewUser, setViewUser] = useState([])
  const [editUser, setEditUser] = useState()
  const [editUserToggle, setEditUserToggle] = useState(false)


  const handleEditUser = (user) => {
    setEditUser(user);
    setEditUserToggle(true)
    
  }


  



    const openImg = (attachment, index) => {
      const lbElements = attachment?.map((attachment, ind) => {
        return { href: attachment };
      });
      const myGallery = GLightbox({
        elements: lbElements,
        autoplayVideos: false,
        index: index,
      });
      console;
      myGallery.openAt(index);
  };
    const handelViewList = () => {
      setAddUser(false);
      setEditUser();
      setEditUserToggle(false);
      setViewUser([])
    };


  
  return (
    <>
      <div>
        <div className="card shadow-none mb-0" id="tasksList">
          <div className="card-header p-2 border-0">
            <div className="d-flex align-items-center gap-2">
              <h5 className="card-title mb-0 flex-grow-1 h5">User List</h5>
              <p>
                Total Users:{" "}
                <b>{projectsData?.data?.project?.plan?.planusers}</b>{" "}
              </p>
              <p>
                Remaining Users:{" "}
                <b>
                  {parseInt(projectsData?.data?.project?.plan?.planusers) -
                    projectsData?.data?.project?.sky_users?.length}
                </b>{" "}
              </p>
            </div>
          </div>
          {/* <div className="card-body border border-dashed border-end-0 border-start-0">
              <div className="row g-3">
              <div className="col-xxl-10 col-sm-12">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control form-control-prof search bg-light border-light"
                    placeholder="Search"
                  />
                  <i className="ri-search-line search-icon" />
                </div>
              </div>
              <div className="col-xxl-2 col-sm-4">
                <button
                  type="button"
                  className="btn btn-primary bg-primary w-100"
                >
                  {" "}
                  <i className="ri-equalizer-fill me-1 align-bottom" />
                  Search
                </button>
              </div>
            </div>
            </div> */}
          {/*end card-body*/}
          {!viewUser?.length && (
            <SimpleBar className="max-h-[500px]">
              <div className="card-body">
                <div className="table-responsive table-card mb-4">
                  <table className="table dt-responsive w-100" id="example">
                    <thead className="table-light text-muted text-nowrap">
                      <tr>
                        <th className="!p-2">Name</th>
                        <th className="!p-2">Email Id</th>
                        <th className="!p-2">Mobile No</th>
                        <th className="!p-2">Extension</th>
                        <th className="!p-2">Profile Picture</th>
                        <th className="!p-2">Status</th>
                        <th className="!p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {projectsData?.data?.project?.sky_users?.length > 0 &&
                        projectsData?.data?.project?.sky_users?.map(
                          (user, ind) => (
                            <tr key={ind}>
                              <td className="!pl-1 text-start">
                                <a className="fw-medium link-primary text-capitalize">
                                  {user?.mem_name}
                                </a>
                              </td>
                              <td className="!pl-1 text-start">
                                <a className="fw-medium link-primary fs-16">
                                  {user?.mem_loginemail}
                                </a>
                              </td>
                              <td className="!pl-1 text-start">
                                <span>{user?.mem_mobile_number}</span>
                              </td>
                              <td className="!pl-1 text-start">
                                {user?.mem_extension}
                              </td>
                              <td className="!pl-1 text-start">
                                {user?.varphoto ? (
                                  <p
                                    onClick={() => openImg([user?.varphoto], 0)}
                                    className="btn btn-soft-secondary p-1 text-[10px]"
                                  >
                                    View Image
                                  </p>
                                ) : (
                                  <p>N/A</p>
                                )}
                              </td>
                              <td className="!pl-1 text-start">
                                <span
                                  className={`badge badge-soft-${
                                    user?.varstatus == "active"
                                      ? "success"
                                      : user?.varstatus == "inactive"
                                      ? "danger"
                                      : "warning"
                                  } text-capitalize p-2 fs-12`}
                                >
                                  {user?.varstatus}
                                </span>
                              </td>
                              <td className="!pl-1 text-start">
                                <div className="flex gap-1">
                                  <button
                                    className="btn btn-soft-primary btn-sm"
                                    type="button"
                                    onClick={() => setViewUser([user])}
                                  >
                                    <i className="mdi mdi-eye-outline" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      {projectsData?.data?.project?.sky_users?.length == 0 && (
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
            </SimpleBar>
          )}
          {viewUser?.length > 0 && (
            <div className="card-body p-2">
              <div className="card-block">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    <strong>Email Address&nbsp;:</strong>
                  </label>
                  <div className="col-sm-10" style={{ paddingTop: 8 }}>
                    {viewUser[0]?.mem_loginemail}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    <strong>Name&nbsp;:</strong>
                  </label>
                  <div className="col-sm-10" style={{ paddingTop: 8 }}>
                    {viewUser[0]?.mem_name}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    <strong>Mobile Number&nbsp;:</strong>
                  </label>
                  <div className="col-sm-10" style={{ paddingTop: 8 }}>
                    {viewUser[0]?.mem_mobile_number}
                    <span className="messages" />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    <strong>Extension&nbsp;:</strong>
                  </label>
                  <div className="col-sm-10" style={{ paddingTop: 8 }}>
                    {viewUser[0]?.mem_extension}
                    <span className="messages" />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    <strong>Profile Photo</strong>
                  </label>
                  <div className="col-sm-10">
                    <button
                      type="button"
                      disabled={!viewUser[0]?.varphoto}
                      className="btn btn btn-primary p-1 fs-12 bg-primary btn-mini waves-effect waves-light "
                      onClick={() => openImg([viewUser[0]?.varphoto], 0)}
                    >
                      View Photo
                    </button>
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
                        viewUser[0]?.varstatus == "active"
                          ? "success"
                          : viewUser[0]?.varstatus == "inactive"
                          ? "danger"
                          : "warning"
                      } capitalize p-2 fs-12`}
                    >
                      {viewUser[0]?.varstatus}
                    </span>
                    <span className="messages" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10" style={{ paddingTop: 8 }}>
                    <button
                      type="button"
                      className="btn btn-mini waves-effect waves-light btn-danger bg-danger p-1 fs-12"
                      onClick={() => setViewUser([])}
                    >
                      <span className="mdi mdi-arrow-left-bold-circle mr-1"></span>
                      Go to user list
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*end card-body*/}
        </div>
        {/*end card*/}
      </div>
    </>
  );
}