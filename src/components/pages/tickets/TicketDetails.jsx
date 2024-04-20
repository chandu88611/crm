import Header from "../Header";
import Select from "react-select"
import SimpleBar from "simplebar-react";


export default function TicketDetails() {
  const code = `var app = document.getElementById("app");
var run = (model) => get(model, "users", () =>
    get(model, "posts",
    () => {
        model.users.forEach(user => model.userIdx[user.id] = user);
        app.innerText = '';
        model.posts.forEach(post =>
        app.appendChild(renderPost(post, model.userIdx[post.userId])));
    }));
app.appendChild(Wrapper.generate("button", "Load").click(() => run({
    userIdx: {}
})).element);`;
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card mt-n4 mb-n5">
                    <div className="bg-soft-primary">
                      <div className="card-body pb-4 mb-5">
                        <div className="row">
                          <div className="col-md">
                            <div className="row align-items-center">
                              <div className="col-md-auto">
                                <div className="avatar-md mb-md-0 mb-4">
                                  <div className="avatar-title bg-white rounded-circle">
                                    <img
                                      src="/assets/images/users/default_proile_image.png"
                                      alt=""
                                      className="avatar rounded-full object-fill"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <!--end col--> */}
                              <div className="col-md">
                                <h4 className="fw-semibold h4" id="ticket-title">
                                  #VLZ135 - Create an Excellent UI for a
                                  Dashboard
                                </h4>
                                <div className="hstack gap-3 flex-wrap">
                                  {/* <!-- <div class="text-muted"><i class="ri-building-line align-bottom me-1"></i><span id="ticket-client">Themesbrand</span></div>
                                               <div class="vr"></div> --> */}
                                  <div className="text-muted">
                                    Create Date :{" "}
                                    <span
                                      className="fw-medium "
                                      id="create-date"
                                    >
                                      20 Dec, 2021
                                    </span>
                                  </div>
                                  <div className="vr"></div>
                                  <div className="text-muted">
                                    Due Date :{" "}
                                    <span className="fw-medium" id="due-date">
                                      29 Dec, 2021
                                    </span>
                                  </div>
                                  <div className="vr"></div>
                                  <div
                                    className="badge rounded-pill bg-info fs-12"
                                    id="ticket-status"
                                  >
                                    New
                                  </div>
                                  <div
                                    className="badge rounded-pill bg-danger fs-12"
                                    id="ticket-priority"
                                  >
                                    High
                                  </div>
                                </div>
                              </div>
                              {/* <!--end col--> */}
                            </div>
                            {/* <!--end row--> */}
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-md-auto mt-md-0 mt-4">
                            <div className="hstack gap-1 flex-wrap">
                              <button
                                type="button"
                                className="btn avatar-xs mt-n1 p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <button
                                type="button"
                                className="btn py-0 fs-16 text-body"
                                id="settingDropdown"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ri-share-line"></i>
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="settingDropdown"
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-share-forward-fill align-bottom me-2 text-muted"></i>{" "}
                                    Share with
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Delete
                                  </a>
                                </li>
                              </ul>
                              <button
                                type="button"
                                className="btn py-0 fs-16 text-body"
                              >
                                <i className="ri-flag-line"></i>
                              </button>
                            </div>
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        {/* <!--end row--> */}
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
                <div className="col-xxl-9">
                  <div className="card">
                    <div className="card-body p-4">
                      <h6 className="fw-semibold text-uppercase mb-3 h6">
                        Ticket Discripation
                      </h6>
                      <p className="text-muted">
                        It would also help to know what the errors are - it
                        could be something simple like a message saying delivery
                        is not available which could be a problem with your
                        shipping templates. Too much or too little spacing, as
                        in the example below, can make things unpleasant for the
                        reader. The goal is to make your text as comfortable to
                        read as possible. On the note of consistency, color
                        consistency is a MUST. If you’re not trying to create
                        crazy contrast in your design, then a great idea would
                        be for you to use a color palette throughout your entire
                        design. It will subconsciously interest viewers and also
                        is very pleasing to look at.{" "}
                        <a
                          href="javascript:void(0);"
                          className="link-secondary text-decoration-underline"
                        >
                          Example
                        </a>
                      </p>
                      <h6 className="fw-semibold text-uppercase mb-3 h6">
                        Create an Excellent UI for a Dashboard
                      </h6>
                      <ul className="text-muted vstack gap-2 mb-4">
                        <li>Pick a Dashboard Type</li>
                        <li>Categorize information when needed</li>
                        <li>Provide Context</li>
                        <li>On using colors</li>
                        <li>On using the right graphs</li>
                      </ul>
                      <div className="mt-4">
                        <h6 className="fw-semibold text-uppercase mb-3 h6">
                          Here is the code you&apos;ve requsted
                        </h6>
                        <div>
                          <pre className="language-markup rounded-2">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                    {/* <!--end card-body--> */}
                    <div className="card-body p-4">
                      <h5 className="card-title mb-4 h5">Comments</h5>
                      <SimpleBar data-simplebar className="px-3 mx-n3 h-[300px]">
                        <div className="d-flex mb-4">
                          <div className="flex-shrink-0">
                            <img
                              src="/assets/images/users/default_proile_image.png"
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="fs-13 h5">
                              Joseph Parker{" "}
                              <small className="text-muted">
                                20 Dec 2021 - 05:47AM
                              </small>
                            </h5>
                            <p className="text-muted">
                              I am getting message from customers that when they
                              place order always get error message .
                            </p>
                            <a
                              href="javascript: void(0);"
                              className="badge text-muted bg-light"
                            >
                              <i className="mdi mdi-reply"></i> Reply
                            </a>
                            <div className="d-flex mt-4">
                              <div className="flex-shrink-0">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="fs-13 h5">
                                  Alexis Clarke{" "}
                                  <small className="text-muted">
                                    22 Dec 2021 - 02:32PM
                                  </small>
                                </h5>
                                <p className="text-muted">
                                  Please be sure to check your Spam mailbox to
                                  see if your email filters have identified the
                                  email from Dell as spam.
                                </p>
                                <a
                                  href="javascript: void(0);"
                                  className="badge text-muted bg-light"
                                >
                                  <i className="mdi mdi-reply"></i> Reply
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mb-4">
                          <div className="flex-shrink-0">
                            <img
                              src="/assets/images/users/default_proile_image.png"
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="fs-13 h5">
                              Donald Palmer{" "}
                              <small className="text-muted">
                                24 Dec 2021 - 05:20PM
                              </small>
                            </h5>
                            <p className="text-muted">
                              If you have further questions, please contact
                              Customer Support from the “Action Menu” on your{" "}
                              <a
                                href="javascript:void(0);"
                                className="text-decoration-underline text-primary"
                              >
                                Online Order Support
                              </a>
                              .
                            </p>
                            <a
                              href="javascript: void(0);"
                              className="badge text-muted bg-light"
                            >
                              <i className="mdi mdi-reply"></i> Reply
                            </a>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src="/assets/images/users/default_proile_image.png"
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="fs-13 h5">
                              Alexis Clarke{" "}
                              <small className="text-muted">26 min ago</small>
                            </h5>
                            <p className="text-muted">
                              Your{" "}
                              <a
                                href="javascript:void(0)"
                                className="text-decoration-underline text-primary"
                              >
                                Online Order Support
                              </a>{" "}
                              provides you with the most current status of your
                              order. To help manage your order refer to the
                              “Action Menu” to initiate return, contact Customer
                              Support and more.
                            </p>
                            <div className="row g-2 mb-3">
                              <div className="col-lg-1 col-sm-2 col-6">
                                <img
                                  src="/assets/images/small/img-4.jpg"
                                  alt=""
                                  className="img-fluid rounded"
                                />
                              </div>
                              <div className="col-lg-1 col-sm-2 col-6">
                                <img
                                  src="/assets/images/small/img-5.jpg"
                                  alt=""
                                  className="img-fluid rounded"
                                />
                              </div>
                            </div>
                            <a
                              href="javascript: void(0);"
                              className="badge text-muted bg-light"
                            >
                              <i className="mdi mdi-reply"></i> Reply
                            </a>
                            <div className="d-flex mt-4">
                              <div className="flex-shrink-0">
                                <img
                                  src="/assets/images/users/default_proile_image.png"
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="fs-13 h5">
                                  Donald Palmer{" "}
                                  <small className="text-muted">
                                    8 sec ago
                                  </small>
                                </h5>
                                <p className="text-muted">
                                  Other shipping methods are available at
                                  checkout if you want your purchase delivered
                                  faster.
                                </p>
                                <a
                                  href="javascript: void(0);"
                                  className="badge text-muted bg-light"
                                >
                                  <i className="mdi mdi-reply"></i> Reply
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SimpleBar>
                      <form action="javascript:void(0);" className="mt-3">
                        <div className="row g-3">
                          <div className="col-lg-12">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Leave a Comments
                            </label>
                            <textarea
                              className="form-control bg-light border-light"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              placeholder="Enter comments"
                            ></textarea>
                          </div>
                          <div className="col-lg-12 text-end">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-secondary"
                            >
                              Post Comments
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!--end card--> */}
                </div>
                {/* <!--end col--> */}
                <div className="col-xxl-3">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0 h5">Ticket Details</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive table-card">
                        <table className="table table-borderless align-middle mb-0">
                          <tbody>
                            <tr>
                              <td className="fw-medium">Ticket</td>
                              <td>
                                #VLZ<span id="t-no">135</span>{" "}
                              </td>
                            </tr>
                            {/* <!-- <tr>
                                         <td class="fw-medium">Client</td>
                                         <td id="t-client">Themesbrand</td>
                                      </tr> --> */}
                            <tr>
                              <td className="fw-medium">Project</td>
                              <td>Velzon - Admin Dashboard</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Assigned To:</td>
                              <td>
                                <div className="avatar-group">
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar-group-item"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-trigger="hover"
                                    data-bs-original-title="Erica Kernan"
                                  >
                                    <img
                                      src="/assets/images/users/default_proile_image.png"
                                      alt=""
                                      className="rounded-circle avatar-xs"
                                    />
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar-group-item"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-trigger="hover"
                                    data-bs-original-title="Alexis Clarke"
                                  >
                                    <img
                                      src="/assets/images/users/default_proile_image.png"
                                      alt=""
                                      className="rounded-circle avatar-xs"
                                    />
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar-group-item"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-trigger="hover"
                                    data-bs-original-title="James Price"
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
                                    data-bs-trigger="hover"
                                    data-bs-placement="top"
                                    data-bs-original-title="Add Members"
                                  >
                                    <div className="avatar-xs">
                                      <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                        +
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Status:</td>
                              <td>
                                <Select
                                  className="form-selsect"
                                  placeholder="Filter Status"
                                  name="choices-single-default"
                                  options={[
                                    { value: "new", label: "New" },
                                    { value: "open", label: "Open" },
                                    {
                                      value: "inprogress",
                                      label: "Inprogress",
                                    },
                                    { value: "closed", label: "Closed" },
                                  ]}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Priority</td>
                              <td>
                                <span
                                  className="badge bg-danger"
                                  id="t-priority"
                                >
                                  High
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Create Date</td>
                              <td id="c-date">20 Dec, 2021</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Due Date</td>
                              <td id="d-date">29 Dec, 2021</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Last Activity</td>
                              <td>14 min ago</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Labels</td>
                              <td className="hstack text-wrap gap-1">
                                <span className="badge badge-soft-primary">
                                  Admin
                                </span>
                                <span className="badge badge-soft-primary">
                                  UI
                                </span>
                                <span className="badge badge-soft-primary">
                                  Dashboard
                                </span>
                                <span className="badge badge-soft-primary">
                                  Design
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* <!--end card-body--> */}
                  </div>
                  {/* <!--end card--> */}
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title fw-semibold mb-0 h6">
                        Files Attachment
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center border border-dashed p-2 rounded">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light rounded">
                            <i className="ri-file-zip-line fs-20 text-primary"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1 h6">
                            <a href="javascript:void(0);">Velzon-admin.zip</a>
                          </h6>
                          <small className="text-muted">3.2 MB</small>
                        </div>
                        <div className="hstack gap-3 fs-16">
                          <a href="javascript:void(0);" className="text-muted">
                            <i className="ri-download-2-line"></i>
                          </a>
                          <a href="javascript:void(0);" className="text-muted">
                            <i className="ri-delete-bin-line"></i>
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center border border-dashed p-2 rounded mt-2">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light rounded">
                            <i className="ri-file-ppt-2-line fs-20 text-danger"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1 h6">
                            <a href="javascript:void(0);">Velzon-admin.ppt</a>
                          </h6>
                          <small className="text-muted">4.5 MB</small>
                        </div>
                        <div className="hstack gap-3 fs-16">
                          <a href="javascript:void(0);" className="text-muted">
                            <i className="ri-download-2-line"></i>
                          </a>
                          <a href="javascript:void(0);" className="text-muted">
                            <i className="ri-delete-bin-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <footer className="footer w-100">
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