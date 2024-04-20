
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Signin from "./components/pages/Signin";
import Dashboard from "./components/pages/Dashboard";
import { useEffect } from "react";
import UploadEnquiries from "./components/pages/enquiries/UploadEnquiries";
import NewEnquiries from "./components/pages/enquiries/NewEnquiries";
import EnquiryHistory from "./components/pages/enquiries/History";
import ActiveExtensions from "./components/pages/extensions/Active";
import InactiveExtensions from "./components/pages/extensions/Inactive";
import AsignedExtensions from "./components/pages/extensions/Assigned";
import AddStaff from "./components/pages/staffs/Add";
import StaffList from "./components/pages/staffs/List";
import StaffActive from "./components/pages/staffs/Active";
import StaffInactive from "./components/pages/staffs/Inactive";
import Transfer from "./components/pages/staffs/Transfer";
import Inbound from "./components/pages/callRecords/Inbound";
import Outbound from "./components/pages/callRecords/Outbound";
import InboundMissed from "./components/pages/callRecords/InboundMissed";
import OutboundMissed from "./components/pages/callRecords/OutboundMissed";
import AllInvoices from "./components/pages/invoices/invoice/AllInvoices";
import PaidInvoices from "./components/pages/invoices/invoice/Paid";
import UnpaidInvoices from "./components/pages/invoices/invoice/Unpaid";
import DueInvoices from "./components/pages/invoices/invoice/Due";
import PartiallyPaidInvoices from "./components/pages/invoices/invoice/PartiallyPaid";
import AllRecurringInvoices from "./components/pages/invoices/recurringInvoice/AllInvoices";
import PaidRecurringInvoices from "./components/pages/invoices/recurringInvoice/Paid";
import UnpaidRecurringInvoices from "./components/pages/invoices/recurringInvoice/Unpaid";
import DueRecurringInvoices from "./components/pages/invoices/recurringInvoice/Due";
import PartiallyPaidRecurringInvoices from "./components/pages/invoices/recurringInvoice/PartiallyPaid";
import All from "./components/pages/invoices/proposal/AllInvoices";
import ConfigurationPending from "./components/pages/configuration/Pending";
import ConfigurationCompleted from "./components/pages/configuration/Completed";
import ConfigurationProcessing from "./components/pages/configuration/Processing";
import Tickets from "./components/pages/tickets/Tickets";
import TicketDetails from "./components/pages/tickets/TicketDetails";
import Products from "./components/pages/Products";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import ProfileChat from "./components/pages/ProfileChat";
import Help from "./components/pages/Help";
import LockScreen from "./components/pages/LockedScreen";
import AuthWrapper from "./AuthWrapper";
import ForgotPassword from "./components/pages/ForgotPassword";
import OTPVerification from "./components/pages/Opt";
import ResetPassword from "./components/pages/resetPassword";
import SessionExpired from "./components/pages/sessionExpired";
import AcceptedProposals from "./components/pages/invoices/proposal/Accepted";
import DeclinedProposals from "./components/pages/invoices/proposal/Declined";
import SentProposals from "./components/pages/invoices/proposal/Sent";
import PendingProposals from "./components/pages/invoices/proposal/Pending";
import ViewExtension from "./components/pages/extensions/ViewExtension";
import Loader from "./components/pages/Loader";
import ProjectOverview from "./components/pages/projects/ProjectOverView";
import InvoiceOtpRequests from "./components/pages/otpRequests/Invoices";
import ProfileAgreement from "./components/pages/profileAgreement/ProfileAgreement";
import Settings from "./components/pages/settings/CommonSettings";
import Branches from "./components/pages/Branches";
import Pagenotfound from "./components/pages/Pagenotfound";
import CompletedProjects from "./components/pages/projects/completedProjects";
import ProcessingProjects from "./components/pages/projects/ProcessingProjects";
import PendingProjects from "./components/pages/projects/PendingProjects";
import Layout from "./components/Layout";
import Extensions from "./components/pages/extensions/Extensions";
import List from "./components/pages/staffs/List_chandan";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editstaff from "./components/pages/staffs/EditStaff";
import NewSetting from "./components/pages/settings/NewSetting";
import Customers from "./components/pages/customer/Customers";
import EnquiryTransferRequest from "./components/pages/EnquiryTransfer";
import InvoiceCancelRequest from "./components/pages/CancelInvRequests";
import ProposalCancelRequest from "./components/pages/CancelProRequests";
function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();

  
  }, []);

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <BrowserRouter>
        <Routes>
          {/* global  */}
          <Route
            path="/signin"
            element={<Signin />}
            loader={<Loader />}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/lockscreen" element={<LockScreen />}></Route>
          <Route path="/otp/:id" element={<OTPVerification />}></Route>
          <Route path="/reset-password/:id" element={<ResetPassword />}></Route>
          <Route path="/session-expired" element={<SessionExpired />}></Route>
          <Route path="*" element={<Pagenotfound />}></Route>

          <Route
            path="/"
            element={
              <AuthWrapper>
                <Outlet />
              </AuthWrapper>
            }
          >
            {/* profile agreement */}
            <Route
              path="/profile/agreement"
              element={<ProfileAgreement />}
            ></Route>

            {/* dashboard routes */}
            <Route path="/" element={<Dashboard />}></Route>

            <Route path="/dashboard" element={<Dashboard />}></Route>

            {/* Enquiries routes */}
            <Route
              path="/enquiries/upload"
              element={<UploadEnquiries />}
            ></Route>
            <Route path="/enquiries/new" element={<NewEnquiries />}></Route>
            <Route
              path="/enquiries/history"
              element={<EnquiryHistory />}
            ></Route>

            {/* Extensions routes */}
            <Route
              path="/extensions/active"
              element={<Layout><Extensions /></Layout>}
            ></Route>
            <Route
              path="/extensions/unassigned"
              element={<Layout><Extensions /></Layout>}
            ></Route>
            <Route
              path="/extensions/assigned"
              element={<Layout><Extensions /></Layout>}
            ></Route>
            <Route
              path="/extensions/view/:ext"
              element={<ViewExtension />}
            ></Route>

            {/* Staff routes */}
            <Route path="/staff/add" element={<AddStaff />}></Route>
            <Route path="/staff/all" element={<Layout><List /></Layout>}></Route>
            <Route path="/staff/active" element={<Layout><List /></Layout>}></Route>
            <Route path="/staff/inactive" element={<Layout><List /></Layout>}></Route>
            <Route path="/staff/terminated" element={<Layout><List /></Layout>}></Route>
            <Route path="/staff/transfer" element={<Transfer />}></Route>

            {/* call recordings routes */}
            <Route path="/inbound" element={<Inbound />}></Route>
            <Route path="/outbound" element={<Outbound />}></Route>
            <Route path="/inbound-missed" element={<InboundMissed />}></Route>
            <Route path="/outbound-missed" element={<OutboundMissed />}></Route>

            {/* opt requests */}
            <Route
              path="/otp-requests/invoices"
              element={<InvoiceOtpRequests />}
            ></Route>

            {/* invoices routes */}
            <Route path="/all-invoices" element={<AllInvoices />}></Route>
            <Route path="/paid-invoices" element={<PaidInvoices />}></Route>
            <Route path="/unpaid-invoices" element={<UnpaidInvoices />}></Route>
            <Route path="/due-invoices" element={<DueInvoices />}></Route>
            <Route
              path="/partially-paid-invoices"
              element={<PartiallyPaidInvoices />}
            ></Route>

            {/* Recurring invoices routes */}
            <Route
              path="/recurring/all-invoices"
              element={<AllRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/paid-invoices"
              element={<PaidRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/unpaid-invoices"
              element={<UnpaidRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/due-invoices"
              element={<DueRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/partially-paid-invoices"
              element={<PartiallyPaidRecurringInvoices />}
            ></Route>

            {/* proposal routes */}
            <Route path="/proposal/all" element={<All />}></Route>
            <Route
              path="/proposal/accepted"
              element={<AcceptedProposals />}
            ></Route>
            <Route
              path="/proposal/rejected"
              element={<DeclinedProposals />}
            ></Route>
            <Route
              path="/proposal/pending"
              element={<PendingProposals />}
            ></Route>

            <Route path="/proposal/sent" element={<SentProposals />}></Route>

            {/* configuration routes */}
            <Route
              path="/configuration/pending"
              element={<ConfigurationPending />}
            ></Route>
            <Route
              path="/configuration/processing"
              element={<ConfigurationProcessing />}
            ></Route>
            <Route
              path="/configuration/completed"
              element={<ConfigurationCompleted />}
            ></Route>
            {/* <Route path="/projects" element={<Projects />}></Route> */}
            <Route
              path="/project-overview/:id"
              element={<ProjectOverview />}
            ></Route>

            {/* tickets routes */}
            <Route path="/tickets" element={<Tickets />}></Route>
            <Route path="/ticket-details" element={<TicketDetails />}></Route>

            {/* products routes */}
            <Route path="/products" element={<Products />}></Route>
            <Route
              path="/projects/pending"
              element={<PendingProjects />}
            ></Route>
            <Route
              path="/projects/processing"
              element={<ProcessingProjects />}
            ></Route>
            <Route
              path="/projects/completed"
              element={<CompletedProjects />}
            ></Route>
            {/* profile */}
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/edit-profile" element={<EditProfile />}></Route>
            <Route path="/chat" element={<ProfileChat />}></Route>
            <Route path="/faq" element={<Help />}></Route>

            {/* settings */}
            <Route path="/settings" element={<Layout><NewSetting /></Layout>}></Route>
            <Route path="/settings/e" element={<Layout><Settings /></Layout>}></Route>
            <Route
              path="/enquiry-transfer-requests"
              element={<EnquiryTransferRequest />}
            ></Route>
            {/* Branches */}
            <Route path="/customers" element={<Layout><Customers /></Layout>}></Route>
            <Route path="/edit-staff/:id" element={<Editstaff />}></Route>

            <Route
              path="/invoice-cancel-requests"
              element={<InvoiceCancelRequest />}
            ></Route>
            <Route
              path="/proposal-cancel-requests"
              element={<ProposalCancelRequest />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
