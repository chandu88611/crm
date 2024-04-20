import React from 'react'

function Customers() {
  return (
    <div className="page-content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card crm-widget">
            <div className="card-body p-0">
              <div className="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
                <div className="col">
                  <div className="py-4 px-3">
                    <h5 className="text-muted text-uppercase fs-13 mb-3">
                      Total Customers{" "}
                      <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle" />
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className="las la-rocket fs-3 text-muted" />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4 className="mb-0">
                          <span className="counter-value" data-target={197}>
                            197
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end col */}
                <div className="col">
                  <div className="mt-3 mt-md-0 py-4 px-3">
                    <h5 className="text-muted text-uppercase fs-13 mb-3">
                      Active Customers{" "}
                      <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle" />
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className="ri-exchange-dollar-line fs-3 text-muted" />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4 className="mb-0">
                          $
                          <span className="counter-value" data-target="489.4">
                            489.4
                          </span>
                          k
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end col */}
                <div className="col">
                  <div className="mt-3 mt-md-0 py-4 px-3">
                    <h5 className="text-muted text-uppercase fs-13 mb-3">
                      Inactive Customers{" "}
                      <i className="ri-arrow-down-circle-line text-danger fs-18 float-end align-middle" />
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className="ri-pulse-line fs-3 text-muted" />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4 className="mb-0">
                          <span className="counter-value" data-target="32.89">
                            32.89
                          </span>
                          %
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end col */}
                <div className="col">
                  <div className="mt-3 mt-lg-0 py-4 px-3">
                    <h5 className="text-muted text-uppercase fs-13 mb-3">
                      Active Contacts{" "}
                      <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle" />
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className="las la-trophy fs-3 text-muted" />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4 className="mb-0">
                          $
                          <span className="counter-value" data-target="1596.5">
                            1,596.5
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end col */}
                <div className="col">
                  <div className="mt-3 mt-lg-0 py-4 px-3">
                    <h5 className="text-muted text-uppercase fs-13 mb-3">
                      Inactive Contacts{" "}
                      <i className="ri-arrow-down-circle-line text-danger fs-18 float-end align-middle" />
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className="las la-handshake fs-3 text-muted" />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4 className="mb-0">
                          <span className="counter-value" data-target={2659}>
                            2,659
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end col */}
              </div>
              {/* end row */}
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
        </div>
        {/* end col */}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-1">Customers</h4>
            </div>
            <div className="card-body">
              <table
                id="tbl_customers"
                className="table table-borderedless dt-responsive nowrap table-striped align-middle"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr className="bg-light">
                    <th>Customer No.</th>
                    <th>Customer/Company</th>
                    <th>Primary Contact</th>
                    <th>Primary Email</th>
                    <th>Phone</th>
                    <th>Active</th>
                    <th>Groups</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>58658</td>
                    <td className="text-primary">
                      <a href="customers.html">Mohamed Momin</a>
                    </td>
                    <td>Mohamed Momin</td>
                    <td>
                      <span className="badge badge-soft-info fs-12">
                        momin@gmail.com
                      </span>
                    </td>
                    <td>9856325698</td>
                    <td>
                      <div className="form-check form-switch form-switch-right form-switch-md">
                        <input
                          className="form-check-input code-switcher"
                          type="checkbox"
                          defaultChecked=""
                        />
                      </div>
                    </td>
                    <td />
                    <td>
                      <span className="badge badge-outline-primary">
                        08/10/2022 10:20 AM
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>58658</td>
                    <td className="text-primary">
                      <a href="customers.html">Gleam Global Services</a>
                    </td>
                    <td>Mohamed Momin</td>
                    <td>
                      <span className="badge badge-soft-info fs-12">
                        momin@gmail.com
                      </span>
                    </td>
                    <td>9856325698</td>
                    <td>
                      <div className="form-check form-switch form-switch-right form-switch-md">
                        <input
                          className="form-check-input code-switcher"
                          type="checkbox"
                          defaultChecked=""
                        />
                      </div>
                    </td>
                    <td />
                    <td>
                      <span className="badge badge-outline-primary">
                        08/10/2022 10:20 AM
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* end card-body */}
          </div>
          {/*end card*/}
        </div>
      </div>
    </div>
    {/* container-fluid */}
  </div>
  
  )
}

export default Customers
