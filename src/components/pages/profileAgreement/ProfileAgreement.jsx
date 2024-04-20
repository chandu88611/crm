
import { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ProfileDetails from "./ProfileDetails";
import CompanyDetails from "./CompanyDetails";
import BankDetails from "./BankDetails";
import Agreements from "./Agreements";
import { useGetProfileDetailsQuery, useGetUserInfoQuery, useLogoutMutation } from "../../../services/api";
import "./pa.css"
import TableLoader from "../TableLoader";
import VerifyAgreement from "./VerifyAgreement";

export default function ProfileAgreement() {
  const [activeForm, setActiveForm] = useState(0)
  const [profileDetails, setProfileDetails] = useState()
  const activeFormHandle = (no) => {
  
    setActiveForm(no)
  }

  const { data: infoData, isLoading, error } = useGetUserInfoQuery();
  const {data:profileDetailsResp, isLoading:profileLoading} = useGetProfileDetailsQuery()
  
  useEffect(() => {

    if (infoData) {
      setActiveForm(infoData?.data?.staff?.setup_status )
    }
    
  }, [infoData])

  useEffect(() => {
    setProfileDetails(profileDetailsResp?.data);
  },[profileDetailsResp])
  
  const [logout, { loading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout()
        .then((res) => {
          if (res?.data?.status) {
            localStorage.removeItem("clt_token");
            window.location.href = "/signin";
          } else {
            localStorage.removeItem("clt_token");
            window.location.href = "/signin";
          }
        })
        .catch(() => {
          localStorage.removeItem("clt_token");
          window.location.href = "/signin";
        });
    } catch (error) {
      // Handle successful logout redirection or actions
      // Handle logout errors
      console.log(error);
      // localStorage.removeItem("clt_token");
      // window.location.href = "/signin";
    }
  };

  return (
    <div className="pulse">
      {isLoading && <TableLoader />}
      <div className="layout-wrapper landing">
        {/* <!-- start hero section --> */}
        <section className="section pb-0 hero-section pt-2" id="hero">
          <div className="bg-overlay bg-overlay-pattern"></div>
          <div className="container">
            <div className="row">
              <div className="d-flex justify-content-between align-items-center flex-wrap d-flex-center">
                <img src="/assets/images/ccp_logo.webp" width="" alt="" />
                <div>
                  <p className="text-muted capitalize">
                    Welcome <b>{infoData?.data?.staff?.name}</b>
                  </p>
                  <div
                    className="float-end flex items-center gap-1 text-muted cursor-pointer hover:!text-danger"
                    onClick={() => handleLogout()}
                  >
                    <i className="ri-logout-circle-line"></i>Logout
                  </div>
                </div>
              </div>
            </div>
            {/* wizard start */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  {/* <!-- end card header --> */}
                  <div className="card-body form-steps">
                    <form className="vertical-navs-step">
                      <div className="row gy-5">
                        {activeForm < 3 && (
                          <div className="col-lg-3 !sticky">
                            <div className="nav flex-column custom-nav ">
                              <button
                                className={`nav-link  ${
                                  infoData?.data?.staff?.setup_status > 0 &&
                                  activeForm != 0
                                    ? "done"
                                    : activeForm == 0
                                    ? "border-primary !bg-[#fafbfd]  active "
                                    : ""
                                }`}
                                disabled={
                                  infoData?.data?.staff?.setup_status < 0
                                }
                                type="button"
                                role="tab"
                                onClick={() => setActiveForm(0)}
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                                  Step 1
                                </span>
                                Profile Details
                              </button>
                              <button
                                className={`nav-link  ${
                                  infoData?.data?.staff?.setup_status > 1 &&
                                  activeForm != 1
                                    ? "done"
                                    : activeForm == 1
                                    ? "border-primary !bg-[#fafbfd]  active"
                                    : ""
                                }`}
                                disabled={
                                  infoData?.data?.staff?.setup_status < 1
                                }
                                id="v-pills-bill-address-tab"
                                type="button"
                                onClick={() => setActiveForm(1)}
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                                  Step 2
                                </span>
                                Company Details
                              </button>
                              <button
                                className={`nav-link  ${
                                  infoData?.data?.staff?.setup_status > 2 &&
                                  activeForm != 2
                                    ? "done"
                                    : activeForm == 2
                                    ? "border-primary !bg-[#fafbfd]  active"
                                    : ""
                                }`}
                                disabled={
                                  infoData?.data?.staff?.setup_status < 2
                                }
                                id="v-pills-payment-tab"
                                type="button"
                                onClick={() => setActiveForm(2)}
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                                  Step 3
                                </span>
                                Bank Details
                              </button>
                              {/* <button
                              className={`nav-link  ${
                                infoData?.data?.staff?.setup_status > 3 &&
                                activeForm != 3
                                  ? "done"
                                  : activeForm == 3
                                  ? "border-primary !bg-[#fafbfd]  active"
                                  : ""
                              }`}
                              disabled={infoData?.data?.staff?.setup_status < 3}
                              id="v-pills-finish-tab"
                              type="button"
                              onClick={() => setActiveForm(3)}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                                Step 4
                              </span>
                              Terms and Conditions
                            </button> */}
                            </div>
                            {/* <!-- end nav --> */}
                          </div>
                        )}{" "}
                        {/* <!-- end col--> */}
                        <div
                          className={`${
                            activeForm >= 3 ? "col-lg-12" : "col-lg-9"
                          }`}
                        >
                          <div className="px-lg-4">
                            <div className="tab-content">
                              <div
                                className={`  ${
                                  activeForm == 0 ? "show active" : ""
                                }`}
                              >
                                {activeForm == 0 && (
                                  <ProfileDetails
                                    handleActiveForm={activeFormHandle}
                                    profileDetails={profileDetails}
                                  />
                                )}
                              </div>
                              {/* <!-- end tab pane --> */}
                              <div
                                className={`  ${
                                  activeForm == 1 ? "show active" : ""
                                }`}
                                id="v-pills-bill-address"
                                role="tabpanel"
                                aria-labelledby="v-pills-bill-address-tab"
                              >
                                {activeForm == 1 && (
                                  <CompanyDetails
                                    handleActiveForm={activeFormHandle}
                                    profileDetails={profileDetails}
                                  />
                                )}
                              </div>
                              {/* <!-- end tab pane --> */}
                              <div
                                className={`  ${
                                  activeForm == 2 ? "show active" : ""
                                }`}
                              >
                                {activeForm == 2 && (
                                  <BankDetails
                                    handleActiveForm={activeFormHandle}
                                    profileDetails={profileDetails}
                                  />
                                )}
                                {activeForm == 3 && (
                                  <Agreements
                                    handleActiveForm={activeFormHandle}
                                    isSigned={false}
                                  />
                                )}
                                {activeForm == 4 && (
                                  <Agreements
                                    handleActiveForm={activeFormHandle}
                                    isSigned={true}
                                  />
                                )}
                                {activeForm == 5 && (
                                  <VerifyAgreement
                                    handleActiveForm={activeFormHandle}
                                    isSigned={true}
                                  />
                                )}
                              </div>
                              {/* <!-- end tab pane --> */}
                            </div>
                            {/* <!-- end tab content --> */}
                          </div>
                        </div>
                      </div>
                      {/* <!-- end row --> */}
                    </form>
                  </div>
                </div>
                {/* <!-- end --> */}
              </div>
              {/* <!-- end col --> */}
            </div>
          </div>
        </section>
        {/* <!-- end hero section --> */}

        {/* <!-- end footer --> */}

        {/* <!--start back-to-top--> */}
        <button
          onClick="topFunction()"
          className="btn btn-danger btn-icon landing-back-top"
          id="back-to-top"
        >
          <i className="ri-arrow-up-line"></i>
        </button>
        {/* <!--end back-to-top--> */}
      </div>
      {/* <!-- end layout wrapper --> */}

      {/* <!-- /.modal --> */}
    </div>
  );
}