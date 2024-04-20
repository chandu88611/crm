import React from 'react'
// import CompanyIpAddress from './newSeeting/CompanyIpAddress'
import AssignIpAddress from './newSeeting/AssignIpAddress'
import AddIp from './newSeeting/AddIp'
import AddShift from './newSeeting/AddShift'
import Timeline from './newSeeting/Timeline'
import { useLazyBankSettingsQuery, useLazyCompanySettingsQuery, useLazyGetSmtpSettingsQuery, useLazyProfileSettingsQuery } from "../../../services/api";
import CompanyIpAddress from './newSeeting/CompanyIpAddress'
function NewSetting() {

  const [getProfileInfo, { data: userInfo, isLoading }] = useLazyProfileSettingsQuery();
  const [getCompanyInfo, { data: companyInfo, isLoading: companyInfoLaoding }] = useLazyCompanySettingsQuery()
  const [getBankInfo, { data: bankInfo, isLoading: bankInfoLaoding }] = useLazyBankSettingsQuery();
  const [getSmtpInfo, {data:smtpInfo, isLoading:smtpLoading}] = useLazyGetSmtpSettingsQuery()
  
  return (
    <>
    
    <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18"> </h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                {/* <li class="breadcrumb-item">
                          <a href="javascript: void(0);">Settings</a>
                          </li> */}
                <li className="breadcrumb-item active">Settings</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
       <CompanyIpAddress/>
        {/* end col */}
        <AssignIpAddress/>
      </div>
      {/* container-fluid */}
    </div>
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">© All Rights Reserved.</div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Designed and Developed by Call Center Projects
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <AddIp />

<AddShift />

<Timeline />


    </>
  
  )
}

export default NewSetting
