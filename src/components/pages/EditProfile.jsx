import Header from "./Header";
import "../assets/profile.css";
import Flatpickr from "react-flatpickr";


export default function EditProfile() {
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
                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                          <img
                            src="/assets/images/users/default_proile_image.png"
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                            alt="user-profile-image"
                          />
                          <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <input
                              id="profile-img-file-input"
                              type="file"
                              className="profile-img-file-input"
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
                        </div>
                        <h5 className="fs-16 mb-1">Mohamed Momin</h5>
                        <p className="text-muted mb-0">Designation</p>
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
                          <a
                            href="javascript:void(0);"
                            className="badge bg-light text-primary fs-12"
                          >
                            <i className="ri-edit-box-line align-bottom me-1"></i>{" "}
                            Edit
                          </a>
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
                          <form action="javascript:void(0);">
                            <div className="row">
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="firstnameInput"
                                    className="form-label"
                                  >
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="firstnameInput"
                                    placeholder="Enter your firstname"
                                    value="Mohamed"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="lastnameInput"
                                    className="form-label"
                                  >
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastnameInput"
                                    placeholder="Enter your lastname"
                                    value="Momin"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="phonenumberInput"
                                    className="form-label"
                                  >
                                    Phone Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="phonenumberInput"
                                    placeholder="Enter your phone number"
                                    value="+91 90361 83631"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="phonenumberInput"
                                    className="form-label"
                                  >
                                    Phone Number{" "}
                                    <small>(Emergency Contact Person)</small>{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="emergencyphonenumber"
                                    placeholder="Enter emergency phone number"
                                    value="+91 78922 02921"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                  >
                                    Email Address
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    placeholder="Enter your email"
                                    value="momin@gleamglobalservicesindia.com"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="JoiningdatInput"
                                    className="form-label"
                                  >
                                    Joining Date
                                  </label>
                                  <Flatpickr
                                    options={{
                                      // mode: "range",
                                      dateFormat: "d-M-Y",
                                      conjunction: "to",
                                      defaultDate: new Date(),
                                    }}
                                    className="form-control bg-light border-light"
                                  />{" "}
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="designationInput"
                                    className="form-label"
                                  >
                                    Designation
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="designationInput"
                                    placeholder="Designation"
                                    value="Web Developer"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="websiteInput1"
                                    className="form-label"
                                  >
                                    Website
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="websiteInput1"
                                    placeholder="www.example.com"
                                    value="www.example.com"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label
                                    htmlFor="cityInput"
                                    className="form-label"
                                  >
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="cityInput"
                                    placeholder="City"
                                    value="Bengaluru"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label
                                    htmlFor="countryInput"
                                    className="form-label"
                                  >
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="countryInput"
                                    placeholder="Country"
                                    value="India"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label
                                    htmlFor="zipcodeInput"
                                    className="form-label"
                                  >
                                    Zip Code
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    minLength="5"
                                    maxLength="6"
                                    id="zipcodeInput"
                                    placeholder="Enter zipcode"
                                    value="560045"
                                  />
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-12">
                                <div className="mb-3 pb-2">
                                  <label
                                    htmlFor="exampleFormControlTextarea"
                                    className="form-label"
                                  >
                                    Address
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea"
                                    placeholder="Enter your description"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="submit"
                                    className="btn btn-secondary bg-secondary"
                                  >
                                    Updates
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-soft-danger"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                              {/* <!--end col--> */}
                            </div>
                            {/* <!--end row--> */}
                          </form>
                        </div>
                        {/* <!--end tab-pane--> */}
                        <div
                          className="tab-pane"
                          id="changePassword"
                          role="tabpanel"
                        >
                          <form action="javascript:void(0);">
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
                                  <i className="mdi mdi-content-save"></i> Save
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
                          </form>
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
                          <form>
                            <div id="newlink">
                              <div id="1">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="jobTitle"
                                        className="form-label"
                                      >
                                        Institute Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="institute"
                                        placeholder="Institute Name"
                                        value="Bangalore Institute of Technology"
                                      />
                                    </div>
                                  </div>
                                  {/* <!--end col--> */}
                                  <div className="col-lg-6">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="companyName"
                                        className="form-label"
                                      >
                                        Degree
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="degree"
                                        placeholder="Degree"
                                        value="Master of Computer Applications"
                                      />
                                    </div>
                                  </div>
                                  {/* <!--end col--> */}
                                  <div className="col-lg-6">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="experienceYear"
                                        className="form-label"
                                      >
                                        Duration
                                      </label>
                                      <div className="row">
                                        <div className="col-lg-5">
                                          <select
                                            className="form-control"
                                            data-choices
                                            data-choices-search-false
                                            name="experienceYear"
                                            id="experienceYear"
                                          >
                                            <option value="">
                                              Select years
                                            </option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017" selected>
                                              2017
                                            </option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                          </select>
                                        </div>
                                        {/* <!--end col--> */}
                                        <div className="col-auto align-self-center">
                                          to
                                        </div>
                                        {/* <!--end col--> */}
                                        <div className="col-lg-5">
                                          <select
                                            className="form-control"
                                            data-choices
                                            data-choices-search-false
                                            name="choices-single-default2"
                                          >
                                            <option value="">
                                              Select years
                                            </option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020" selected>
                                              2020
                                            </option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                          </select>
                                        </div>
                                        {/* <!--end col--> */}
                                      </div>
                                      {/* <!--end row--> */}
                                    </div>
                                  </div>
                                  {/* <!--end col--> */}
                                  <div className="col-lg-3">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="companyName"
                                        className="form-label"
                                      >
                                        City
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        placeholder="City"
                                        value="Bengaluru"
                                      />
                                    </div>
                                  </div>
                                  {/* <!--end col--> */}
                                  <div className="col-lg-3">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="companyName"
                                        className="form-label"
                                      >
                                        State
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        placeholder="State"
                                        value="Karnataka"
                                      />
                                    </div>
                                  </div>
                                  {/* <!--end col--> */}
                                  <div className="hstack gap-2 justify-content-end">
                                    <a
                                      className="btn btn-danger  bg-danger"
                                      href="javascript:deleteEl(1)"
                                    >
                                      Delete
                                    </a>
                                  </div>
                                </div>
                                {/* <!--end row--> */}
                              </div>
                            </div>
                            <div id="newForm" className="hidden"></div>
                            <div className="col-lg-12">
                              <div className="hstack gap-2">
                                <button
                                  type="submit"
                                  className="btn btn-primary bg-primary"
                                >
                                  Update
                                </button>
                                <a
                                  href="#"
                                  className="btn btn-secondary bg-secondary"
                                >
                                  Add New
                                </a>
                              </div>
                            </div>
                            {/* <!--end col--> */}
                          </form>
                        </div>
                        {/* <!--end tab-pane--> */}
                        <div
                          className="tab-pane"
                          id="extension"
                          role="tabpanel"
                        >
                          <form action="javascript:void(0);">
                            <div className="row">
                              <div className="col-lg-12 extensionsDiv">
                                <div>
                                  <label
                                    htmlFor="Extentions"
                                    className="form-label text-muted"
                                  >
                                    Extensions
                                  </label>
                                  <select
                                    className="form-control"
                                    id="extensions"
                                    data-choices
                                    name="login-type"
                                  >
                                    <option value="">Select Extension</option>
                                    <option
                                      value="1001"
                                      className="activeExt"
                                      selected
                                    >
                                      1001
                                    </option>
                                    <option
                                      value="1002"
                                      className="inactiveExt"
                                    >
                                      1002
                                    </option>
                                    <option value="1003" className="activeExt">
                                      1003
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-3 extensionsDiv">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label text-muted"
                                  >
                                    IP/Domain:Port
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="tel"
                                      className="form-control form-control-icon"
                                      value="127.0.0.1:5006"
                                      placeholder="IP/Domain:Port"
                                    />
                                    <i className="mdi mdi-midi-port"></i>
                                  </div>
                                  <i
                                    className="mdi mdi-content-copy"
                                    data-toggle="tooltip"
                                    title="Click to Copy"
                                  ></i>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-3 extensionsDiv">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label text-muted"
                                  >
                                    Username
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="text"
                                      value="9959658569"
                                      className="form-control form-control-icon"
                                      placeholder="Username"
                                    />
                                    <i className="mdi mdi-account-circle"></i>
                                  </div>
                                  <i
                                    className="mdi mdi-content-copy"
                                    data-toggle="tooltip"
                                    title="Click to Copy"
                                  ></i>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-3 extensionsDiv">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label text-muted"
                                  >
                                    Password
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="password"
                                      value="5525632562"
                                      className="form-control form-control-icon"
                                      placeholder="Password"
                                    />
                                    <i className="mdi mdi-lock-outline"></i>
                                  </div>
                                  <i
                                    className="mdi mdi-content-copy"
                                    data-toggle="tooltip"
                                    title="Click to Copy"
                                  ></i>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-3 extensionsDiv">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label text-muted"
                                  >
                                    Status
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="text"
                                      className="form-control form-control-icon"
                                      value="Active"
                                      placeholder="Status"
                                    />
                                    <i className="mdi mdi-list-status"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="submit"
                                    className="btn btn-success bg-success"
                                  >
                                    Update
                                  </button>
                                  {/* <!-- <button type="button" class="btn btn-soft-danger">Cancel</button> --> */}
                                </div>
                              </div>
                            </div>
                            {/* <!--end row--> */}
                          </form>
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






