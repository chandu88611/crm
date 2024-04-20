/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Modal} from "react-bootstrap"
import { api, useSendCompanyOPTMutation, useSendOPTMutation, useVerifyBankMutation, useVerifyCompanyOPTMutation, useVerifyOPTMutation } from "../../../../services/api";
import Loader from "../../Loader";
import { useEffect, useState } from "react";
import { successAlert } from "../../swAlert";

export default function VerifyModal({ verifyFor, isOpen, verifyHeader, handleClose }) {
  const [otp, setOtp] = useState("")
  const [otpErr, setOtpErr] = useState("")
  const [apiErr, setApiErr] = useState("")
  const [sendOpt, { data: otpResp, isLoading: optsendLoading }] =
    useSendOPTMutation();
  const [verify, { data: verifyResp, isLoading }] = useVerifyOPTMutation();
  const [bankVerify,{data:bankVerifyResp, isLoading: bankVerifyLoading}] = useVerifyBankMutation()
    const [sendCompanyOpt, { data: otpCompResp, isLoading: optCompsendLoading }] =
      useSendCompanyOPTMutation();
    const [verifyCompanyAdd, { data: verifyCompResp, isLoading: isCompLoading }] = useVerifyCompanyOPTMutation();
  
  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("")
      },7000)
    }
  }, [apiErr])
  
  const handleVerifyOTP = async () => {
    if (verifyFor != "companyAddress" || verifyFor != "bank") {
      const response = await verify({ otp: otp, type: verifyFor });
      if (response?.data?.status) {
        handleClose();
        successAlert(response?.data?.message);
      } else {
        console.log(response);
        setApiErr(response?.error?.data?.message);
      }
    } else if(verifyFor == "companyAddress") {
      const response = await verifyCompanyAdd({ otp: otp, type: verifyFor });
      if (response?.data?.status) {
        handleClose();
        successAlert(response?.data?.message);
      } else {
        console.log(response);
        setApiErr(response?.error?.data?.message);
      }
    } else if (verifyFor == "bank") {
      const response = await verify({ otp: otp, type: verifyFor });
      if (response?.data?.status) {
        handleClose();
        successAlert(response?.data?.message);
      } else {
        console.log(response);
        setApiErr(response?.error?.data?.message);
      }
    }
  }

  const handleResendOTP = async () => {
    
    if (verifyFor != "address") {
      const response = await sendOpt({ type: verifyFor });
      if (response?.data?.status) {
        successAlert(response?.data?.message);
      }
    } else {
      const response = await sendCompanyOpt({ type: verifyFor });
      if (response?.data?.status) {
        successAlert(response?.data?.message);
      }
    }
    
  }


  return (
    <>
      <Modal centered show={isOpen}>
        <Modal.Header className=" h4">{verifyHeader}</Modal.Header>
        <hr className=" border-dashed" />
        <Modal.Body className="mt-0 pt-0">
          {isLoading && <Loader />}
          {optsendLoading && <Loader />}
          {optCompsendLoading && <Loader />}
          {isCompLoading && <Loader />}
          {bankVerifyLoading && <Loader />}
          <div className="">
            <form className="verify_profile_form">
              <input type="hidden" name="staff_id" value="1" />
              <input type="hidden" name="type" value="phone" />
              <div className="row">
                <div className="col-lg-12 ">
                  <label htmlFor="title" className="form-label">
                    {verifyFor == "bank" ? "Amount" : "OTP"}
                  </label>
                  <input
                    type="number"
                    className="form-control otp_input"
                    id=""
                    value={otp}
                    onChange={(e) => setOtp(e?.target?.value)}
                    name="otp"
                    placeholder={`Enter ${
                      verifyFor == "bank" ? "Amount" : "OTP"
                    }`}
                  />
                  <span className="text-danger fs-13 otp-error"></span>
                </div>
                <div className="col-12 mt-2 message_div"></div>
                {verifyFor == "phone" && (
                  <div className="col-lg-12 mt-3">
                    Verification OTP has been sent successfully. Please keep
                    this window open and check your WhatsApp{" "}
                    <i className="ri-whatsapp-fill text-success"></i> / Message{" "}
                    <i className="ri-message-2-fill text-warning"></i> for the
                    one-time password. Enter Received one-time password to
                    verify Phone number.
                  </div>
                )}
                {verifyFor == "email" && (
                  <div className="col-lg-12 mt-3">
                    Verification OTP has been sent successfully. Please keep
                    this window open and check your Inbox for the one-time
                    password. Enter Received one-time password to verify Email.
                  </div>
                )}
                {verifyFor == "address" ||
                  (verifyFor == "companyAddress" && (
                    <div className="col-lg-12 mt-3">
                      Please enter the OTP that was sent to you by postal mail
                      in order to verify your address.
                    </div>
                  ))}
                {verifyFor == "bank" && (
                  <div className="col-lg-12 mt-3">
                    Please enter the amount that has been credited to your
                    account.
                  </div>
                )}
                {verifyFor != "bank" && (
                  <div className="col-12 mt-3">
                    <p>
                      Did not receive it?{" "}
                      <a
                        type="button"
                        className="text-primary resendProfileVerification"
                        data-id="1"
                        data-type="phone"
                        onClick={() => handleResendOTP()}
                      >
                        Click here to resend.
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
          {apiErr && (
            <p className="text-red-600 flex gap-1 items-center">
              <i className="ri-information-line"></i>
              {apiErr}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-light bg-light"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              disabled={otp == ""}
              className="btn btn-success bg-success validateProfileOTP hover:!scale-125 transition-all "
              onClick={() => handleVerifyOTP()}
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}