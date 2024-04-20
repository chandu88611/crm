/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import axios from "axios";
import "../../assets/customersEdit.css"

import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import Header from "../Header";
import ProfileForm from "./customerForms/ProfileForm";
import { useLazyBankSettingsQuery, useLazyCompanySettingsQuery, useLazyGetSmtpSettingsQuery, useLazyProfileSettingsQuery } from "../../../services/api";
import CompanyDetails from "../profileAgreement/CompanyDetails";
import CompanySettings from "./customerForms/CompanySettings";
import BankDetails from "../profileAgreement/BankDetails";
import BankSettings from "./customerForms/BankSettings";
import SmtpSettings from "./customerForms/SmtpSettings";

export default function Settings() {
  const params = useParams();
 
  const dispatch = useDispatch();
  const [currentTab, setcurrentTab] = useState("PROFILE");

  const [getProfileInfo, { data: userInfo, isLoading }] = useLazyProfileSettingsQuery();
  const [getCompanyInfo, { data: companyInfo, isLoading: companyInfoLaoding }] = useLazyCompanySettingsQuery()
  const [getBankInfo, { data: bankInfo, isLoading: bankInfoLaoding }] =
    useLazyBankSettingsQuery();
  const [getSmtpInfo, {data:smtpInfo, isLoading:smtpLoading}] = useLazyGetSmtpSettingsQuery()
  
  useEffect(() => {
    if (currentTab == "PROFILE") {
      getProfileInfo()
    }
    else if (currentTab == "COMPANY") {
      getCompanyInfo();
    } else if (currentTab == "BANK") {
      getBankInfo()
    } else if (currentTab == "SMTP") {
      getSmtpInfo();
    }
  },[currentTab])
 

  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              
              <div className="row">
                <div className="col-lg-3">
                  <div className="card">
                    <div className="card-header flex gap-2">
                      <img
                        className="avatar-sm object-cover  rounded-full"
                        src={userInfo?.data?.profile?.profile_image}
                      />
                      <div>
                        <h4 className="card-title mb-1 h4 capitalize truncate max-w-[200px]">
                          {userInfo?.data?.profile?.name}
                        </h4>
                        <p className="text-muted mb-0 truncate sm:!max-w-[100%] md:!max-w-[100px] xl:!max-w-[200px]">
                          {userInfo?.data?.profile?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* {/* <!--end card--> */}
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className={`nav-link cursor-pointer  ${
                            currentTab == "PROFILE"
                              ? "active show drop-shadow-lg shadowColor"
                              : ""
                          }`}
                          onClick={() => setcurrentTab("PROFILE")}
                        >
                          <i className="mdi mdi-account-circle"></i> Profile
                        </a>
                        <a
                          className={`nav-link cursor-pointer ${
                            currentTab == "COMPANY"
                              ? "active show drop-shadow-lg shadowColor"
                              : ""
                          }`}
                          onClick={() => setcurrentTab("COMPANY")}
                        >
                          <i className="ri-building-line"></i> Company{" "}
                        </a>
                        <a
                          className={`nav-link cursor-pointer ${
                            currentTab == "BANK"
                              ? "active show drop-shadow-lg shadowColor"
                              : ""
                          }`}
                          onClick={() => setcurrentTab("BANK")}
                        >
                          <i className="ri-bank-line"></i> Bank{" "}
                        </a>
                        <a
                          className={`nav-link cursor-pointer ${
                            currentTab == "SMTP"
                              ? "active show drop-shadow-lg shadowColor"
                              : ""
                          }`}
                          id="custom-v-pills-invoices-tab"
                          onClick={() => setcurrentTab("SMTP")}
                        >
                          <i className="ri-mail-settings-line"></i> SMTP{" "}
                          <span className="badge rounded-pill text-bg-primary float-end"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  {currentTab == "PROFILE" && (
                    <div className="card">
                      <ProfileForm userInfo={userInfo} isLoading={isLoading} />
                    </div>
                  )}
                  {currentTab == "COMPANY" && (
                    <div className="card">
                      <CompanySettings
                        companyInfo={companyInfo}
                        isLoading={companyInfoLaoding}
                      />
                    </div>
                  )}
                  {currentTab == "BANK" && (
                    <div className="card">
                      <BankSettings
                        bankInfo={bankInfo}
                        isLoading={bankInfoLaoding}
                      />
                    </div>
                  )}
                  {currentTab == "SMTP" && (
                    <div className="card">
                      <SmtpSettings
                        smtpInfo={smtpInfo}
                        isLoading={smtpLoading}
                      />
                    </div>
                  )}
                </div>
              </div>
              <footer className="footer w-100">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">
                      {new Date().getFullYear()} © All Rights Reserved.
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
        </div>
      </div>
    </>
  );
}
