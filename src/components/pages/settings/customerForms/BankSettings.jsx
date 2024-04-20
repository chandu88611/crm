/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Loader from "../../Loader";
import Swal from "sweetalert2";
import VerifyModal from "./VerifyModal";
import { useState } from "react";


export default function BankSettings({ bankInfo, isLoading }) {
   const [showVerificationModal, setShowVerificationModal] = useState(false);

   const handleClose = () => {
     setShowVerificationModal(false);
   };
  const handleBankVerification = () => {
    if (bankInfo?.data?.bank_account[0]?.is_verified == "0") {
      Swal.fire({
        title: "Failed",
        text: "Bank details have not been added to the beneficiarys account.",
        icon: "error",
        showCancelButton: !1,
        confirmButtonText: "Ok",
        confirmButtonColor: "btn btn-danger  w-xs me-2 mt-2",
        buttonsStyling: 1,
        showCloseButton: !0,
        focusCancel: false,
      });
    } else if (
      bankInfo?.data?.bank_account[0]?.is_verified == "1" &&
      bankInfo?.data?.bank_account[0]?.txn_amount == null
    ) {
      Swal.fire({
        title: "Failed",
        text: "Beneficiary added",
        icon: "error",
        showCancelButton: !1,
        confirmButtonText: "Ok",
        confirmButtonColor: "btn btn-danger  w-xs me-2 mt-2",
        buttonsStyling: 1,
        showCloseButton: !0,
        focusCancel: false,
      });
    } else if (
      bankInfo?.data?.bank_account[0]?.is_verified == "1" &&
      bankInfo?.data?.bank_account[0]?.txn_amount != null
    ) {
      setShowVerificationModal(true)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="">
        <div className="card-header">
          <div className="row">
            <div className="col-xl-10 mb-3">
              <div className="">
                <div className="card-header">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                      <h5 className="mb-0 h5">
                        Bank Account Details{" "}
                        <i
                          className="ms-1 mdi  text-danger mdi-alert-decagram fs-18"
                          data-toggle="tooltip"
                          aria-label="Verified"
                          data-bs-original-title="Unverified"
                        ></i>
                      </h5>
                      <div className="dropdown d-inline-block">
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
                              data-type="bank"
                              onClick={() => handleBankVerification()}
                            >
                              <i className="ri-bank-fill align-bottom me-2 text-muted"></i>
                              Bank Account
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4 border-bottom border-end">
                      <b className="m-0 text-dark"> Bank Name </b>
                      <div className="project-amnt pt-1 mb-2">
                        {bankInfo?.data?.bank_account[0]?.bank_name}
                      </div>
                    </div>
                    <div className="col-lg-4 border-bottom border-end">
                      <b className="m-0 text-dark"> Branch </b>
                      <div className="project-amnt pt-1 mb-2">
                        {bankInfo?.data?.bank_account[0]?.branch_name}
                      </div>
                    </div>
                    <div className="col-lg-4 border-bottom">
                      <b className="m-0 text-dark"> Account Holder Name </b>
                      <div className="project-amnt pt-1 mb-2">
                        {bankInfo?.data?.bank_account[0]?.account_holder_name}
                      </div>
                    </div>
                    <div className="col-lg-4 mt-3 border-bottom border-end">
                      <b className="m-0 text-dark"> Account Number </b>
                      <div className="project-amnt pt-1 mb-2">
                        {bankInfo?.data?.bank_account[0]?.account_number}
                      </div>
                    </div>
                    <div className="col-lg-4 mt-3 border-bottom border-end">
                      <b className="m-0 text-dark"> IFSC Code </b>
                      <div className="project-amnt pt-1 mb-2">
                        {bankInfo?.data?.bank_account[0]?.ifsc_code}
                      </div>
                    </div>
                    <div className="col-lg-4 mt-3 border-bottom ">
                      <div
                        className={`alert alert-${
                          bankInfo?.data?.bank_account[0]?.is_verified == "0"
                            ? "danger"
                            : bankInfo?.data?.bank_account[0]?.is_verified ==
                              "1"
                            ? "primary"
                            : "success"
                        } alert-dismissible alert-label-icon rounded-label fade show mt-3 `}
                        role="alert"
                      >
                        <i className="mdi mdi-progress-alert"></i>{" "}
                        {bankInfo?.data?.bank_account[0]?.is_verified == "0"
                          ? "Beneficiary not added"
                          : bankInfo?.data?.bank_account[0]?.is_verified == "1"
                          ? "Processing Verification."
                          : "Bank Account Verified."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VerifyModal
        isOpen={showVerificationModal}
        handleClose={handleClose}
        verifyFor={"bank"}
        verifyHeader={"Bank Account Verification"}
      />
    </>
  );
}