import { useGetGeneralInfoQuery } from "../../../services/api";
import ApexDonutCharts from "../charts/Invoices";
import Loader from "../Loader";

export default function InvoiceDonut() {
  const { data: callsInfo, isLoading } = useGetGeneralInfoQuery();
  return (
    <>
      {isLoading && <Loader />}
      <div className="col-xxl-4 col-lg-6">
        <div className="card card-height-100">
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Invoice Status</h4>
            {/* <div className="flex-shrink-0">
              <div className="dropdown card-header-dropdown">
                <a
                  className="dropdown-btn text-muted"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All Time <i className="mdi mdi-chevron-down ms-1"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    All Time
                  </a>
                  <a className="dropdown-item" href="#">
                    Last 7 Days
                  </a>
                  <a className="dropdown-item" href="#">
                    Last 30 Days
                  </a>
                  <a className="dropdown-item" href="#">
                    Last 90 Days
                  </a>
                </div>
              </div>
            </div> */}
          </div>
          {/* <!--  end card header --> */}
          <div className="card-body">
            <ApexDonutCharts
              series={[
                callsInfo?.data?.invoices_overvue?.paid_count,
                callsInfo?.data?.invoices_overvue?.unpaid_count,
                callsInfo?.data?.invoices_overvue?.partially_paid_count,
                callsInfo?.data?.invoices_overvue?.due_count,
              ]}
            />
            <div className="mt-3">
              <div className="d-flex justify-content-center align-items-center mb-4">
                  <h2 className="me-1 ff-secondary mb-0 h2">
                    {parseInt(callsInfo?.data?.invoices_overvue?.unpaid_count) +
                      parseInt(callsInfo?.data?.invoices_overvue?.paid_count) +
                      parseInt(callsInfo?.data?.invoices_overvue?.due_count) +
                      parseInt(
                        callsInfo?.data?.invoices_overvue?.partially_paid_count
                      )}
                  </h2>
                  <p className="text-muted mb-0">Total Invoices</p>
                  {/* <p className="text-success text-center fw-medium mb-0">
                    <span className="badge badge-soft-success p-1 rounded-circle">
                      <i className="ri-arrow-right-up-line"></i>
                    </span>{" "}
                    {parseInt(callsInfo?.data?.invoices_overvue?.unpaid_count) +
                      parseInt(callsInfo?.data?.invoices_overvue?.paid_count) +
                      parseInt(callsInfo?.data?.invoices_overvue?.due_count) +
                      parseInt(
                        callsInfo?.data?.invoices_overvue?.partially_paid_count
                      )}
                  </p> */}
              </div>
              <div className="d-flex justify-between border-bottom border-bottom-dashed py-2">
                <p className="fw-medium mb-0">
                  <i className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></i>{" "}
                  Paid
                </p>
                <div>
                  <span className="text-muted pe-5">
                    {callsInfo?.data?.invoices_overvue?.paid_count} Invoices
                  </span>
                  <span className="text-success fw-medium fs-12">
                    ₹{callsInfo?.data?.invoices_overvue?.paid_total}
                  </span>
                </div>
              </div>
              {/* <!--  end --> */}
              <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                <p className="fw-medium mb-0">
                  <i className="ri-checkbox-blank-circle-fill text-danger align-middle me-2"></i>{" "}
                  Unpaid
                </p>
                <div>
                  <span className="text-muted pe-5">
                    {callsInfo?.data?.invoices_overvue?.unpaid_count} Invoices
                  </span>
                  <span className="text-danger fw-medium fs-12">
                    ₹{callsInfo?.data?.invoices_overvue?.unpaid_total}
                  </span>
                </div>
              </div>
              {/* <!--  end --> */}
              <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                <p className="fw-medium mb-0">
                  <i className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></i>{" "}
                  Partially Paid
                </p>
                <div>
                  <span className="text-muted pe-5">
                    {callsInfo?.data?.invoices_overvue?.partially_paid_count}{" "}
                    Invoices
                  </span>
                  <span className="text-warning fw-medium fs-12">
                    ₹{callsInfo?.data?.invoices_overvue?.partially_paid_total}
                  </span>
                </div>
              </div>
              {/* <!--  end --> */}
              <div className="d-flex justify-content-between py-2">
                <p className="fw-medium mb-0">
                  <i className="ri-checkbox-blank-circle-fill text-secondary align-middle me-2"></i>{" "}
                  Due
                </p>
                <div>
                  <span className="text-muted pe-5">
                    {callsInfo?.data?.invoices_overvue?.due_count} Invoices
                  </span>
                  <span className="text-secondary fw-medium fs-12">
                    ₹{callsInfo?.data?.invoices_overvue?.due_total}
                  </span>
                </div>
              </div>
              {/* <!--  end --> */}
            </div>
          </div>
          {/* <!--  end cardbody --> */}
        </div>
      </div>
    </>
  );
}