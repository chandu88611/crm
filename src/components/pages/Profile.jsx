import Header from "./Header";
import "../assets/profile.css"

export default function Profile() {
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content ">
        <p style={{position: "fixed",
    top: "50%",
    left: "50%",
    zIndex:"9",
    fontSize: "xxx-large",
    transform:" translate(-50%, -50%)",
    overflow:'hi'
    }} ><img src="https://kaysvillefamilydentistry.com/wp-content/uploads/2022/07/coming_soon.gif" alt="comming Soon"/></p>
          <div className="page-content blur-sm pointer-events-none select-none">
            <div className="container-fluid">
              <div className="profile-foreground position-relative mx-n4 mt-n4">
                <div className="profile-wid-bg">
                  <img
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80"
                    alt=""
                    className="profile-wid-img"
                  />
                </div>
              </div>
              <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                <div className="row g-4">
                  <div className="col-auto">
                    <div className="avatar-lg">
                      <img
                        src="/assets/images/users/default_proile_image.png"
                        alt="user-img"
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                  </div>
                  {/* <!--end col --> */}
                  <div className="col">
                    <div className="p-2">
                      <h3 className="text-white mb-1 h3">Mohamed Momin</h3>
                      <p className="text-white-75">Designation</p>
                      <div className="hstack text-white-50 gap-1">
                        <div className="me-2">
                          <i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>
                          City, State
                        </div>
                        {/* <!-- <div>
                                    <i class="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>Themesbrand
                                    </div> --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!--end col --> */}
                  {/* <!-- <div class="col-12 col-lg-auto order-last order-lg-0">
                           <div class="row text text-white-50 text-center">
                               <div class="col-lg-6 col-4">
                                   <div class="p-2">
                                       <h4 class="text-white mb-1">24.3K</h4>
                                       <p class="fs-14 mb-0">Followers</p>
                                   </div>
                               </div>
                               <div class="col-lg-6 col-4">
                                   <div class="p-2">
                                       <h4 class="text-white mb-1">1.3K</h4>
                                       <p class="fs-14 mb-0">Following</p>
                                   </div>
                               </div>
                           </div>
                           </div> --> */}
                  {/* <!--end col --> */}
                </div>
                {/* <!--end row--> */}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="d-flex profile-wrapper">
                      {/* <!-- Nav tabs --> */}
                      <ul
                        className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link fs-14 active"
                            data-bs-toggle="tab"
                            href="#overview-tab"
                            role="tab"
                          >
                            <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Overview
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link fs-14"
                            data-bs-toggle="tab"
                            href="#activities"
                            role="tab"
                          >
                            <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Activities
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link fs-14"
                            data-bs-toggle="tab"
                            href="#documents"
                            role="tab"
                          >
                            <i className="ri-folder-4-line d-inline-block d-md-none"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Documents
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link fs-14"
                            data-bs-toggle="tab"
                            href="#password"
                            role="tab"
                          >
                            <i className="ri-price-tag-line d-inline-block d-md-none"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Password
                            </span>
                          </a>
                        </li>
                      </ul>
                      <div className="flex-shrink-0">
                        <a
                          href="/edit-profile"
                          className="btn btn-secondary bg-secondary"
                        >
                          <i className="ri-edit-box-line align-bottom"></i> Edit
                          Profile
                        </a>
                      </div>
                    </div>
                    {/* <!-- Tab panes --> */}
                    <div className="tab-content pt-4 text-muted">
                      <div
                        className="tab-pane active"
                        id="overview-tab"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title mb-5 h5">
                                  Complete Your Profile
                                </h5>
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
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title mb-3 h5">
                                  Extension Details
                                </h5>
                                <div className="table-responsive">
                                  <table className="table table-borderless mb-0">
                                    <tbody>
                                      <tr>
                                        <th className="ps-0" scope="row">
                                          Extension Number :
                                        </th>
                                        <td className="text-muted">5003</td>
                                      </tr>
                                      <tr>
                                        <th className="ps-0" scope="row">
                                          IP/Domain:Port :
                                        </th>
                                        <td className="text-muted">
                                          127.0.0.1:2003
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="ps-0" scope="row">
                                          Username :
                                        </th>
                                        <td className="text-muted">
                                          daveadame@mail.com
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="ps-0" scope="row">
                                          Status :
                                        </th>
                                        <td className="text-muted">
                                          <span className="badge badge-outline-success fs-12">
                                            Active
                                          </span>
                                        </td>
                                      </tr>
                                      {/* <!-- <tr>
                                                         <th class="ps-0" scope="row">Joining Date</th>
                                                         <td class="text-muted">24 Nov 2021</td>
                                                         </tr> --> */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              {/* <!-- end card body --> */}
                            </div>
                            {/* <!-- end card --> */}
                            <div className="card">
                              <div className="card-body">
                                {/* <!-- <h5 class="card-title mb-4">Portfolio</h5> --> */}
                                <div>
                                  <div className="mt-4 mb-3 border-bottom pb-2">
                                    {/* <!-- <div class="float-end">
                                                      <a href="javascript:void(0);" class="link-primary">All Logout</a>
                                                      </div> --> */}
                                    <h5 className="card-title h5">
                                      Log History
                                    </h5>
                                  </div>
                                  <div className="custom-scroll scrollbar style-2">
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-shrink-0 avatar-sm">
                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                          <i className="mdi mdi-web"></i>
                                        </div>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <h6 className="h6">Browser Name</h6>
                                        <p className="text-muted mb-0">
                                          Los Angeles, United States
                                        </p>
                                        <small className="text-muted mb-0">
                                          16 March, 2023 2:47PM
                                        </small>
                                      </div>
                                      <div>
                                        <a href="javascript:void(0);">
                                          127.0.0.1
                                        </a>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-shrink-0 avatar-sm">
                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                          <i className="mdi mdi-web"></i>
                                        </div>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <h6 className="h6">Browser Name</h6>
                                        <p className="text-muted mb-0">
                                          Los Angeles, United States
                                        </p>
                                        <small className="text-muted mb-0">
                                          16 March, 2023 2:47PM
                                        </small>
                                      </div>
                                      <div>
                                        <a href="javascript:void(0);">
                                          127.0.0.1
                                        </a>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-shrink-0 avatar-sm">
                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                          <i className="mdi mdi-web"></i>
                                        </div>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <h6 className="h6">Browser Name</h6>
                                        <p className="text-muted mb-0">
                                          Los Angeles, United States
                                        </p>
                                        <small className="text-muted mb-0">
                                          16 March, 2023 2:47PM
                                        </small>
                                      </div>
                                      <div>
                                        <a href="javascript:void(0);">
                                          127.0.0.1
                                        </a>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-shrink-0 avatar-sm">
                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                          <i className="mdi mdi-web"></i>
                                        </div>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <h6 className="h6">Browser Name</h6>
                                        <p className="text-muted mb-0">
                                          Los Angeles, United States
                                        </p>
                                        <small className="text-muted mb-0">
                                          16 March, 2023 2:47PM
                                        </small>
                                      </div>
                                      <div>
                                        <a href="javascript:void(0);">
                                          127.0.0.1
                                        </a>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-shrink-0 avatar-sm">
                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                          <i className="mdi mdi-web"></i>
                                        </div>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <h6 className="h6">Browser Name</h6>
                                        <p className="text-muted mb-0">
                                          Los Angeles, United States
                                        </p>
                                        <small className="text-muted mb-0">
                                          16 March, 2023 2:47PM
                                        </small>
                                      </div>
                                      <div>
                                        <a href="javascript:void(0);">
                                          127.0.0.1
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- end card body --> */}
                            </div>
                            {/* <!-- end card --> */}
                          </div>
                          {/* <!--end col --> */}
                          <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card">
                                  <div className="card-header align-items-center d-flex justify-content-between">
                                    <h4 className="card-title mb-0  me-2 h4">
                                      Attendance
                                    </h4>
                                    <div className="d-flex gap-2">
                                      <select
                                        className="form-select filter-select"
                                        aria-label="Default select example"
                                      >
                                        <option selected="">
                                          {" "}
                                          Select Month{" "}
                                        </option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                      </select>
                                      <select
                                        className="form-select filter-select"
                                        aria-label="Default select example"
                                      >
                                        <option selected="">
                                          {" "}
                                          Select Year{" "}
                                        </option>
                                        <option value="1">2022</option>
                                        <option value="2">2023</option>
                                        <option value="3">2024</option>
                                      </select>
                                      <button className="btn btn-info bg-info">
                                        <i className="mdi mdi-download align-bottom"></i>{" "}
                                        Download
                                      </button>
                                    </div>
                                  </div>
                                  <div className="card-body style-2 px-3 pt-0 max-h-[650px] overflow-auto">
                                    <table className="table table-borderless table-fixed">
                                      <thead className="sticky-top bg-white">
                                        <tr>
                                          <th align="left">Login Time</th>
                                          <th
                                            align="center"
                                            className="text-center"
                                          >
                                            Logout Time
                                          </th>
                                          <th
                                            align="right"
                                            className="text-right"
                                          >
                                            Worked Hours
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              20 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Monday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-primary shadow">
                                          <td align="left">
                                            <span className="text-primary">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-primary">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-primary">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              21 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Tuesday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-success shadow">
                                          <td align="left">
                                            <span className="text-success">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-success">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-success">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              22 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Wednesday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-success shadow">
                                          <td align="left">
                                            <span className="text-success">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-success">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-success">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              23 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Thursday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-danger shadow">
                                          <td align="left">
                                            <span className="text-danger">
                                              <i className="mdi mdi-login"></i>{" "}
                                              00:00:00 AM
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-danger">
                                              <i className="mdi mdi-logout"></i>
                                              : 00:00:00 PM
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-danger">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              00:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              24 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Friday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-warning shadow">
                                          <td align="left">
                                            <span className="text-warning">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-warning">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-warning">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              25 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Saturday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-success shadow">
                                          <td align="left">
                                            <span className="text-success">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-success">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-success">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              20 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Monday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-primary shadow">
                                          <td align="left">
                                            <span className="text-primary">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-primary">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-primary">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              21 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Tuesday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-success shadow">
                                          <td align="left">
                                            <span className="text-success">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-success">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-success">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              22 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Wednesday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-success shadow">
                                          <td align="left">
                                            <span className="text-success">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-success">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-success">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              23 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Thursday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-danger shadow">
                                          <td align="left">
                                            <span className="text-danger">
                                              <i className="mdi mdi-login"></i>{" "}
                                              00:00:00 AM
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-danger">
                                              <i className="mdi mdi-logout"></i>
                                              : 00:00:00 PM
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-danger">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              00:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              24 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Friday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-warning shadow">
                                          <td align="left">
                                            <span className="text-warning">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-warning">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-warning">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                        {/* <!-- row starts --> */}
                                        <tr>
                                          <td colSpan="3">
                                            <span className="font-weight-bold font-semibold text-black">
                                              25 September, 2023
                                            </span>{" "}
                                            |{" "}
                                            <span className="font-weight-bold font-semibold text-muted">
                                              Saturday
                                            </span>
                                          </td>
                                        </tr>
                                        <tr className="bg-soft-success shadow">
                                          <td align="left">
                                            <span className="text-success">
                                              <i className="mdi mdi-login"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="center">
                                            <span className="text-success">
                                              <i className="mdi mdi-logout"></i>{" "}
                                              10:00:00 AM |{" "}
                                              <i className="mdi mdi-earth"></i>{" "}
                                              127.0.0.1
                                            </span>
                                          </td>
                                          <td align="right">
                                            <span className="text-success">
                                              <i className="mdi mdi-account-clock-outline"></i>{" "}
                                              07:00:00 Hrs
                                            </span>
                                          </td>
                                        </tr>
                                        {/* <!-- row ends --> */}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {/* <!-- end card --> */}
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title mb-3 h5">
                                      Educaltional Qualification
                                    </h5>
                                    {/* <!-- Swiper --> */}
                                    <div className="row">
                                      <div className="col-lg-4">
                                        <div className="card profile-project-card shadow-none profile-project-info mb-0">
                                          <div className="card-body p-2">
                                            <div className="d-flex">
                                              <div className="flex-grow-1 text-muted overflow-hidden">
                                                <h5 className="fs-14 text-truncate mb-1 h5">
                                                  <a
                                                    href="#"
                                                    className="text-dark"
                                                  >
                                                    Bangalore Institute of
                                                    Technology
                                                  </a>{" "}
                                                  <span className="badge badge-soft-success fs-12">
                                                    {" "}
                                                    2016 - 2020
                                                  </span>
                                                </h5>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  Degree :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    Master of Computer
                                                    Applications
                                                  </span>
                                                </p>
                                                <p className="text-muted text-truncate mb-0">
                                                  {" "}
                                                  Duration :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    4 Years
                                                  </span>
                                                </p>
                                                <p className="text-muted text-truncate mb-0">
                                                  {" "}
                                                  City/State :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    Bengaluru, India
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/* <!-- end card body --> */}
                                        </div>
                                        {/* <!-- end card --> */}
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="card profile-project-card shadow-none profile-project-info mb-0">
                                          <div className="card-body p-2">
                                            <div className="d-flex">
                                              <div className="flex-grow-1 text-muted overflow-hidden">
                                                <h5 className="fs-14 text-truncate mb-1 h5">
                                                  <a
                                                    href="#"
                                                    className="text-dark"
                                                  >
                                                    Bangalore Institute of
                                                    Technology
                                                  </a>{" "}
                                                  <span className="badge badge-soft-success fs-12">
                                                    {" "}
                                                    2016 - 2020
                                                  </span>
                                                </h5>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  Degree :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    Master of Computer
                                                    Applications
                                                  </span>
                                                </p>
                                                <p className="text-muted text-truncate mb-0">
                                                  {" "}
                                                  Duration :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    4 Years
                                                  </span>
                                                </p>
                                                <p className="text-muted text-truncate mb-0">
                                                  {" "}
                                                  City/State :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    Bengaluru, India
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/* <!-- end card body --> */}
                                        </div>
                                        {/* <!-- end card --> */}
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="card profile-project-card shadow-none profile-project-info mb-0">
                                          <div className="card-body p-2">
                                            <div className="d-flex">
                                              <div className="flex-grow-1 text-muted overflow-hidden">
                                                <h5 className="fs-14 text-truncate mb-1 h5">
                                                  <a
                                                    href="#"
                                                    className="text-dark"
                                                  >
                                                    Bangalore Institute of
                                                    Technology
                                                  </a>{" "}
                                                  <span className="badge badge-soft-success fs-12">
                                                    {" "}
                                                    2016 - 2020
                                                  </span>
                                                </h5>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  Degree :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    Master of Computer
                                                    Applications
                                                  </span>
                                                </p>
                                                <p className="text-muted text-truncate mb-0">
                                                  {" "}
                                                  Duration :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    4 Years
                                                  </span>
                                                </p>
                                                <p className="text-muted text-truncate mb-0">
                                                  {" "}
                                                  City/State :{" "}
                                                  <span className="fw-semibold text-dark">
                                                    Bengaluru, India
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/* <!-- end card body --> */}
                                        </div>
                                        {/* <!-- end card --> */}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- end card body --> */}
                                </div>
                                {/* <!-- end card --> */}
                              </div>
                              {/* <!-- end col --> */}
                            </div>
                            {/* <!-- end row --> */}
                          </div>
                          {/* <!--end col --> */}
                        </div>
                        {/* <!--end row--> */}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="activities"
                        role="tabpanel"
                      >
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title mb-3">Activities</h5>
                            <div className="acitivity-timeline">
                              <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src="/assets/images/users/default_proile_image.png"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">
                                    Mohamed Momin{" "}
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
                                        src="/assets/images/users/default_proile_image.png"
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
                                        src="/assets/images/users/default_proile_image.png"
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
                                    src="/assets/images/users/default_proile_image.png"
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
                                        {/* <!--end col --> */}
                                        <div className="col-4">
                                          <img
                                            src="/assets/images/small/img-3.jpg"
                                            alt=""
                                            className="img-fluid rounded"
                                          />
                                        </div>
                                        {/* <!--end col --> */}
                                        <div className="col-4">
                                          <img
                                            src="/assets/images/small/img-4.jpg"
                                            alt=""
                                            className="img-fluid rounded"
                                          />
                                        </div>
                                        {/* <!--end col --> */}
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
                                    src="/assets/images/users/default_proile_image.png"
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
                                    src="/assets/images/users/default_proile_image.png"
                                    alt=""
                                    className="avatar-xs rounded-circle acitivity-avatar"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 h6">Lewis Pratt</h6>
                                  <p className="text-muted mb-2">
                                    They all have something to say beyond the
                                    words on the page. They can come across as
                                    casual or neutral, exotic or graphic.
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
                                    src="/assets/images/users/default_proile_image.png"
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
                      {/* <!--end tab-pane--> */}
                      <div
                        className="tab-pane fade"
                        id="password"
                        role="tabpanel"
                      >
                        <div className="card">
                          <div className="card-body">
                            <div className="col-xl-8 mx-auto">
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      Current Password
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id=""
                                        placeholder="Enter Current Password"
                                      />
                                      <i className="ri-lock-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      New Password
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id=""
                                        placeholder="Enter New Password"
                                      />
                                      <i className="ri-lock-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      Confirm Password
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id=""
                                        placeholder="Re-enter Password"
                                      />
                                      <i className="ri-lock-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-3">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      OTP
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id="iconInput"
                                        placeholder="Enter OTP"
                                      />
                                      <i className="ri-lock-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-3">
                                  <button
                                    type="button"
                                    className="btn btn-primary bg-primary waves-effect waves-light"
                                  >
                                    <i className="mdi mdi-content-save"></i>{" "}
                                    Save
                                  </button>
                                  <button className="btn btn-outline-primary btn-load">
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
                                </div>
                              </div>
                              {/* <!--end row--> */}
                            </div>
                          </div>
                          {/* <!--end card-body--> */}
                        </div>
                        {/* <!--end card--> */}
                      </div>
                      {/* <!--end tab-pane--> */}
                      <div
                        className="tab-pane fade"
                        id="documents"
                        role="tabpanel"
                      >
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                              <h5 className="card-title flex-grow-1 mb-0 h5">
                                Documents
                              </h5>
                              <div className="flex-shrink-0">
                                <input
                                  className="form-control d-none"
                                  type="file"
                                  id="formFile"
                                />
                                <label
                                  htmlFor="formFile"
                                  className="btn btn-danger bg-danger"
                                >
                                  <i className="ri-upload-2-fill me-1 align-bottom"></i>{" "}
                                  Upload File
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="table-responsive">
                                  <table className="table table-borderless align-middle mb-0">
                                    <thead className="table-light">
                                      <tr>
                                        <th scope="col">File Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Upload Date</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="avatar-sm">
                                              <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                                                <i className="ri-file-zip-fill"></i>
                                              </div>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                              <h6 className="fs-15 mb-0 h6">
                                                <a href="javascript:void(0)">
                                                  Artboard-documents.zip
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Zip File</td>
                                        <td>4.57 MB</td>
                                        <td>12 Dec 2021</td>
                                        <td>
                                          <div className="dropdown">
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-light btn-icon"
                                              id="dropdownMenuLink15"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="true"
                                            >
                                              <i className="ri-equalizer-fill"></i>
                                            </a>
                                            <ul
                                              className="dropdown-menu dropdown-menu-end"
                                              aria-labelledby="dropdownMenuLink15"
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                  Download
                                                </a>
                                              </li>
                                              <li className="dropdown-divider"></li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="avatar-sm">
                                              <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                                                <i className="ri-file-pdf-fill"></i>
                                              </div>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                              <h6 className="fs-15 mb-0 h6">
                                                <a href="javascript:void(0);">
                                                  Bank Management System
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>PDF File</td>
                                        <td>8.89 MB</td>
                                        <td>24 Nov 2021</td>
                                        <td>
                                          <div className="dropdown">
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-light btn-icon"
                                              id="dropdownMenuLink3"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="true"
                                            >
                                              <i className="ri-equalizer-fill"></i>
                                            </a>
                                            <ul
                                              className="dropdown-menu dropdown-menu-end"
                                              aria-labelledby="dropdownMenuLink3"
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                  Download
                                                </a>
                                              </li>
                                              <li className="dropdown-divider"></li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="avatar-sm">
                                              <div className="avatar-title bg-soft-secondary text-secondary rounded fs-20">
                                                <i className="ri-video-line"></i>
                                              </div>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                              <h6 className="fs-15 mb-0 h6">
                                                <a href="javascript:void(0);">
                                                  Tour-video.mp4
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>MP4 File</td>
                                        <td>14.62 MB</td>
                                        <td>19 Nov 2021</td>
                                        <td>
                                          <div className="dropdown">
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-light btn-icon"
                                              id="dropdownMenuLink4"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="true"
                                            >
                                              <i className="ri-equalizer-fill"></i>
                                            </a>
                                            <ul
                                              className="dropdown-menu dropdown-menu-end"
                                              aria-labelledby="dropdownMenuLink4"
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                  Download
                                                </a>
                                              </li>
                                              <li className="dropdown-divider"></li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="avatar-sm">
                                              <div className="avatar-title bg-soft-success text-success rounded fs-20">
                                                <i className="ri-file-excel-fill"></i>
                                              </div>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                              <h6 className="fs-15 mb-0 h6">
                                                <a href="javascript:void(0);">
                                                  Account-statement.xsl
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>XSL File</td>
                                        <td>2.38 KB</td>
                                        <td>14 Nov 2021</td>
                                        <td>
                                          <div className="dropdown">
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-light btn-icon"
                                              id="dropdownMenuLink5"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="true"
                                            >
                                              <i className="ri-equalizer-fill"></i>
                                            </a>
                                            <ul
                                              className="dropdown-menu dropdown-menu-end"
                                              aria-labelledby="dropdownMenuLink5"
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                  Download
                                                </a>
                                              </li>
                                              <li className="dropdown-divider"></li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="avatar-sm">
                                              <div className="avatar-title bg-soft-info text-info rounded fs-20">
                                                <i className="ri-folder-line"></i>
                                              </div>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                              <h6 className="fs-15 mb-0 h6">
                                                <a href="javascript:void(0);">
                                                  Project Screenshots Collection
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Floder File</td>
                                        <td>87.24 MB</td>
                                        <td>08 Nov 2021</td>
                                        <td>
                                          <div className="dropdown">
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-light btn-icon"
                                              id="dropdownMenuLink6"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="true"
                                            >
                                              <i className="ri-equalizer-fill"></i>
                                            </a>
                                            <ul
                                              className="dropdown-menu dropdown-menu-end"
                                              aria-labelledby="dropdownMenuLink6"
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill me-2 align-middle"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-download-2-fill me-2 align-middle"></i>
                                                  Download
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 align-middle"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="avatar-sm">
                                              <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                                                <i className="ri-image-2-fill"></i>
                                              </div>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                              <h6 className="fs-15 h6 mb-0">
                                                <a href="javascript:void(0);">
                                                  Velzon-logo.png
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>PNG File</td>
                                        <td>879 KB</td>
                                        <td>02 Nov 2021</td>
                                        <td>
                                          <div className="dropdown">
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-light btn-icon"
                                              id="dropdownMenuLink7"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="true"
                                            >
                                              <i className="ri-equalizer-fill"></i>
                                            </a>
                                            <ul
                                              className="dropdown-menu dropdown-menu-end"
                                              aria-labelledby="dropdownMenuLink7"
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-eye-fill me-2 align-middle"></i>
                                                  View
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-download-2-fill me-2 align-middle"></i>
                                                  Download
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 align-middle"></i>
                                                  Delete
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="text-center mt-3">
                                  <a
                                    href="javascript:void(0);"
                                    className="text-success"
                                  >
                                    <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
                                    Load more{" "}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!--end tab-pane--> */}
                    </div>
                    {/* <!--end tab-content--> */}
                  </div>
                </div>
                {/* <!--end col --> */}
              </div>
              {/* <!--end row--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  { new Date().getFullYear()} ©
                  All Rights Reserved.
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