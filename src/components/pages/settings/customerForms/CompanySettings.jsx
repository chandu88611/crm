/* eslint-disable react/prop-types */
        import { useState } from "react";
import Swal from "sweetalert2";
import VerifyModal from "./VerifyModal";
import Loader from "../../Loader";


export default function CompanySettings({ companyInfo, isLoading }) {
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleClose = () => {
    setShowVerificationModal(false);
  };

  const handleVerifyAddress = (address) => {
    if (address?.address_verified == "0") {
      Swal.fire({
        title: "Failed",
        text: "OTP has been generated and it will be dispatch shortly.",
        icon: "error",
        showCancelButton: !1,
        confirmButtonText: "Ok",
        confirmButtonColor: "btn btn-danger  w-xs me-2 mt-2",
        buttonsStyling: 1,
        showCloseButton: !0,
        focusCancel: false,
      });
    } else if (address?.address_verified == "1") {
      setShowVerificationModal(true);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="card set-card">
        <div className="card-header">
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              <h5 className="mb-0 h5">Company Details</h5>
              {/* <div className="dropdown d-inline-block">
                <button
                  className="btn btn-soft-dark btn-sm dropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Verify
                  <i className="ri-menu-fill align-middle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item text-muted verifyProfile"
                      data-id="1"
                      data-type="c_address"
                    >
                      <i className="  ri-map-pin-2-fill align-bottom me-2 text-muted"></i>
                      Current Address
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item text-muted verifyProfile"
                      data-id="1"
                      data-type="p_address"
                    >
                      <i className="ri-map-pin-4-fill align-bottom me-2 text-muted"></i>
                      Permanent Address
                    </button>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {companyInfo?.data?.company_address?.map((add, ind) => (
              <div key={ind} className="col-lg-4">
                <div className="card card-light m-auto">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 ms-3">
                        <img src={add?.logo_url} />
                        <p className="card-text flex gap-1">
                          <i className="ri-building-line"></i>
                          {add?.name}
                        </p>
                        <p className="card-text flex gap-1">
                          <i className="mdi mdi-earth text-dark"></i>
                          {add?.address}
                        </p>
                        <p className="card-text flex gap-1">
                          <i className="mdi mdi-loupe"></i>
                          {add?.city}, {add?.state}
                        </p>
                        <p className="card-text flex gap-1">
                          <i className="mdi mdi-map-marker-radius"></i>
                          {add?.country}, {add?.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer p-1 hover:bg-[#f1a88b] cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      if (add?.address_verified != "2") {
                        handleVerifyAddress(add);
                      }
                    }}
                  >
                    <div className="text-center hover:!text-white ">
                      <p className="mb-0 flex items-center justify-center gap-1">
                        {add?.address_verified == "2"
                          ? "Address Verified"
                          : "Verify Address"}
                        <i
                          className={`mdi  text-${
                            add?.address_verified == "2" ? "success" : "danger"
                          } mdi-alert-decagram fs-18`}
                          data-toggle="tooltip"
                          aria-label="Verified"
                          data-bs-original-title="Unverified"
                        ></i>
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
                {add?.address_verified == "0" && (
                  <div
                    className="alert alert-primary alert-dismissible alert-label-icon rounded-label fade show mt-3"
                    role="alert"
                  >
                    <i className="ri-user-smile-line label-icon"></i>
                    {add?.address_verified == "0" &&
                      "OTP has been generated and it will be dispatch shortly."}
                  </div>
                )}
                {add?.address_verified == "1" && (
                  <div
                    className="alert alert-success alert-dismissible alert-label-icon rounded-label fade show mt-3"
                    role="alert"
                  >
                    <i className="ri-check-double-line label-icon"></i>
                    Your OTP has been dispatched. Tracking No. :{" "}
                    {add?.consignment_no}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <VerifyModal
        isOpen={showVerificationModal}
        handleClose={handleClose}
        verifyFor={"companyAddress"}
        verifyHeader={"Address verification"}
      />
    </>
  );
}