/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useEffect, useReducer, useState } from "react";
import axios from "axios"
import { successAlert } from "../../swAlert";
import Loader from "../../Loader";
import GLightbox from "glightbox";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import VerifyModal from "./VerifyModal";
import { useSendOPTMutation } from "../../../../services/api";



export default function ProfileForm({ userInfo, isLoading }) {
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationFor, setVerificationFor] = useState("")

  const [sendOpt, {data:otpResp, isLoading:optsendLoading}] = useSendOPTMutation()

  const handleClose = () => {
    setShowVerificationModal(false)
  }

  const handleVerification = async (verifyFor) => {
    if (verifyFor == "phone" && userInfo?.data?.profile?.phone_count == 0) {
      const response = await sendOpt({ type: verifyFor });
      if (response?.data?.status) {
        setVerificationFor(verifyFor);
        setShowVerificationModal(true);
      }
    } else if (
      verifyFor == "email" &&
      userInfo?.data?.profile?.email_count == 0
    ) {
      const response = await sendOpt({ type: verifyFor });
      if (response?.data?.status) {
        setVerificationFor(verifyFor);
        setShowVerificationModal(true);
      }
    } else if (
      verifyFor == "phone" &&
      userInfo?.data?.profile?.phone_count > 0
    ) {
      setVerificationFor(verifyFor);
      setShowVerificationModal(true);
    } else if (
      verifyFor == "email" &&
      userInfo?.data?.profile?.email_count > 0
    ) {
      setVerificationFor(verifyFor);
      setShowVerificationModal(true);
    }else if (
      verifyFor == "address" &&
      userInfo?.data?.profile?.email_count > 0
    ) {
      setVerificationFor(verifyFor);
      setShowVerificationModal(true);
    }else if (
      verifyFor == "address" &&
      userInfo?.data?.profile?.email_count == 0
    ) {
      const response = await sendOpt({ type: verifyFor });
      if (response?.data?.status) {
        setVerificationFor(verifyFor);
        setShowVerificationModal(true);
      }
    }    
  }

  
  const imageTypes = ["png", "jpg", "jpeg", "webp", "avif", "svg", "gif"];
  
    const openImg = () => {
      const lbElements = [
        {
          href: userInfo?.data?.profile?.aadhaar_proof,
        },
      ];
      const myGallery = GLightbox({
        elements: lbElements,
        autoplayVideos: false,
      });
      console;
      myGallery.open();
    };

  return (
    <>
      {isLoading && <Loader />}
      {optsendLoading && <Loader />}
      <div className="card-header flex justify-between items-center">
        <p className="h5 pb-0 mb-0">Profile Settings</p>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-success bg-success dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Verify
          </button>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              onClick={() => handleVerification("email")}
            >
              <i className="ri-mail-line mr-1"></i> Verify Email
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleVerification("phone")}
            >
              <i className="ri-phone-line mr-1"></i>Verify Phone number
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleVerification("address")}
            >
              <i className="ri-map-pin-2-line mr-1"></i>Verify address
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-xxl-4 col-md-6">
              <label htmlFor="placeholderInput" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control bg-slate-100"
                readOnly
                placeholder="Full Name"
                value={userInfo?.data?.profile?.name}
              />
            </div>
            <div className="col-xxl-4 col-md-6">
              <label
                htmlFor="placeholderInput"
                className="form-label flex items-center gap-1"
              >
                Phone Number{" "}
                {userInfo?.data?.profile?.is_phone_verified == "0" ? (
                  <>
                    {userInfo?.data?.profile?.phone_count == 0 && (
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>Not verified</Tooltip>
                        )}
                        placement="bottom"
                      >
                        {
                          <i className="mdi mdi-alert-decagram text-danger fs-18"></i>
                        }
                      </OverlayTrigger>
                    )}
                    {userInfo?.data?.profile?.phone_count > 0 && (
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>OTP Generated</Tooltip>
                        )}
                        placement="bottom"
                      >
                        {
                          <i className="mdi mdi-email-lock text-primary ms-1 fs-18"></i>
                        }
                      </OverlayTrigger>
                    )}
                    {userInfo?.data?.profile?.phone_count > 0 && (
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>
                            Sent {userInfo?.data?.profile?.phone_count} of 3
                            mails
                          </Tooltip>
                        )}
                        placement="bottom"
                      >
                        {
                          <i className="mdi mdi-send-circle text-success ms-1 fs-18"></i>
                        }
                      </OverlayTrigger>
                    )}
                  </>
                ) : (
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>Verified</Tooltip>}
                    placement="bottom"
                  >
                    <i className="mdi  text-success mdi-alert-decagram fs-18"></i>
                  </OverlayTrigger>
                )}
              </label>
              <input
                type="number"
                className={`form-control border ${
                  userInfo?.data?.profile?.is_phone_verified == "0"
                    ? "text-danger"
                    : ""
                } bg-slate-100`}
                id=""
                placeholder="Phone Number"
                readOnly
                value={userInfo?.data?.profile?.phone}
              />
            </div>
            <div className="col-xxl-4 col-md-6">
              <label
                htmlFor="placeholderInput"
                className="form-label flex items-center gap-1"
              >
                Email
                {userInfo?.data?.profile?.is_email_verified == "0" ? (
                  <>
                    {userInfo?.data?.profile?.email_count == 0 && (
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>Not verified</Tooltip>
                        )}
                        placement="bottom"
                      >
                        {
                          <i className="mdi mdi-alert-decagram text-danger fs-18"></i>
                        }
                      </OverlayTrigger>
                    )}
                    {userInfo?.data?.profile?.email_count > 0 && (
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>OTP Generated</Tooltip>
                        )}
                        placement="bottom"
                      >
                        {
                          <i className="mdi mdi-email-lock text-primary ms-1 fs-18"></i>
                        }
                      </OverlayTrigger>
                    )}
                    {userInfo?.data?.profile?.email_count > 0 && (
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>
                            Sent {userInfo?.data?.profile?.email_count} of 3
                            mails
                          </Tooltip>
                        )}
                        placement="bottom"
                      >
                        {
                          <i className="mdi mdi-send-circle text-success ms-1 fs-18"></i>
                        }
                      </OverlayTrigger>
                    )}
                  </>
                ) : (
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>Verified</Tooltip>}
                    placement="bottom"
                  >
                    <i className="mdi  text-success mdi-alert-decagram fs-18"></i>
                  </OverlayTrigger>
                )}
              </label>
              <input
                type="email"
                className={`form-control border ${
                  userInfo?.data?.profile?.is_email_verified == "0"
                    ? "text-danger"
                    : ""
                } bg-slate-100`}
                id=""
                readOnly
                placeholder="Email"
                value={userInfo?.data?.profile?.email}
              />
            </div>

            <div className="col-xxl-4 col-md-6 mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                OTP
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-slate-100"
                id=""
                placeholder="PAN/GST Number"
                value={userInfo?.data?.profile?.otp}
              />
            </div>
            <div className="col-xxl-4 col-md-6 mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Aadhaar number
              </label>
              <input
                type="text"
                className="form-control bg-slate-100"
                id=""
                readOnly
                placeholder="Company Website"
                value={userInfo?.data?.profile?.aadhaar_number}
              />
            </div>

            <div className="col-xxl-12 col-md-12 mt-3 border">
              <label
                htmlFor="placeholderInput"
                className="form-label flex items-center gap-1"
              >
                Address
                {userInfo?.data?.profile?.address_verified == "0" && (
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Not verified</Tooltip>
                    )}
                    placement="bottom"
                  >
                    <i className="mdi mdi-alert-decagram text-danger fs-18"></i>
                  </OverlayTrigger>
                )}
                {userInfo?.data?.profile?.address_verified == "2" && 
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>Verified</Tooltip>}
                    placement="bottom"
                  >
                    <i className="mdi  text-success mdi-alert-decagram fs-18"></i>
                  </OverlayTrigger>
                }
              </label>

              <textarea
                name="name"
                rows="2"
                readOnly
                className={`form-control border ${
                  userInfo?.data?.profile?.address_verified == "0"
                    ? "text-danger"
                    : ""
                } bg-slate-100`}
                placeholder="Address"
                value={userInfo?.data?.profile?.address}
              ></textarea>
              <div
                className="alert alert-primary alert-dismissible alert-label-icon rounded-label fade show mt-3"
                role="alert"
              >
                <i className="ri-user-smile-line label-icon"></i>
                {userInfo?.data?.profile?.address_verified == "0"
                  ? "OTP has been generated and it will be dispatch shortly."
                  : userInfo?.data?.profile?.address_verified == "1"
                  ? "OTP has been dispatched"
                  : ""}
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <label htmlFor="pinInput" className="form-label">
                Zip Code{" "}
              </label>
              <div className="form-icon right">
                <input
                  type="number"
                  className="form-control bg-slate-100"
                  readOnly
                  id="pinInput"
                  placeholder="Enter Zip Code"
                  value={userInfo?.data?.profile?.zip}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <label htmlFor="cityInput" className="form-label">
                City{" "}
              </label>
              <div className="form-icon left">
                <input
                  type="text"
                  className="form-control bg-slate-100"
                  id="cityInput"
                  placeholder="Enter city"
                  value={userInfo?.data?.profile?.city}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                State
              </label>
              <div className="form-icon right">
                <input
                  type="text"
                  className="form-control bg-slate-100"
                  id="stateInput"
                  placeholder="Enter State"
                  value={userInfo?.data?.profile?.state}
                />
              </div>
            </div>

            <div className="col-xxl-3 col-md-6 mt-3">
              <label htmlFor="countryInput" className="form-label">
                Country{" "}
              </label>
              <div className="form-icon left">
                <input
                  type="text"
                  className="form-control bg-slate-100"
                  id="countryInput"
                  placeholder="Enter Country"
                  value={userInfo?.data?.profile?.country}
                />
              </div>
            </div>

            <div className="col-xxl-3 col-md-6 my-3">
              <label htmlFor="placeholderInput" className="form-label">
                Aadhaar proof
              </label>
              <div
                className="cursor-pointer"
                onClick={() =>
                  openImg(
                    userInfo,
                    imageTypes?.includes(
                      userInfo?.data?.profile?.aadhaar_proof
                        ?.split(".")
                        .pop()
                        .toLowerCase()
                    )
                  )
                }
              >
                {imageTypes?.includes(
                  userInfo?.data?.profile?.aadhaar_proof
                    ?.split(".")
                    .pop()
                    .toLowerCase()
                ) ? (
                  <img
                    className="!w-28 !h-28 object-cover drop-shadow-sm rounded-lg"
                    src={userInfo?.data?.profile?.aadhaar_proof}
                    alt="attachment"
                  />
                ) : (
                  <p className="!align-middle fs-16">
                    {/* <div className="  text-primary flex items-center">
                            <i className="ri-file-pdf-fill"></i>
                            <span className>
                              {userInfo?.data?.profile?.aadhaar_proof
                                ?.split(".")
                                .pop()
                                .toLowerCase()}
                            </span>
                          </div> */}
                    {/* <div className="  text-primary flex items-center">
                          <i className="ri-file-pdf-fill"></i>
                        </div> */}
                    <div className="avatar-title bg-light text-danger rounded">
                      <i className="ri-file-pdf-fill text-4xl"></i>
                    </div>
                    <span className="avatar-title bg-light text-danger rounded fs-24">
                      {userInfo?.data?.profile?.aadhaar_proof
                        ?.split(".")
                        .pop()
                        .toLowerCase()}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <VerifyModal
        isOpen={showVerificationModal}
        handleClose={handleClose}
        verifyFor={verificationFor}
        verifyHeader={
          verificationFor == "email"
            ? "Email Verification"
            : verificationFor == "phone"
            ? "Phone Number Verification"
            : "Address verification"
        }
      />
    </>
  );
}
