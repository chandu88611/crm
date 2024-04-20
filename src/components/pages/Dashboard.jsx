// /* eslint-disable no-unused-vars */
// import Flatpickr from "react-flatpickr";
// import ApexChart from "./charts/EnquiriesFC";
// import Header from "./Header";
// import Footer from "./Footer";
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux"
// import { Modal } from "react-bootstrap" 
// import ProfileAgreement from "./profileAgreement/ProfileAgreement";
// import { hideLoader, showLoader } from "../../reducers/loader";
// import Loader from "./Loader";
// import TableLoader from "./TableLoader";
// import { useGetDashboardfDetails2Query, useGetDashboardfDetailsQuery , useLazyGetAllCallDetailsQuery } from "../../services/api";
// import moment from "moment";


// export default function Dashboard() {

//   function convertSecondsToHMS(totalSeconds) {
//     var hours = Math.floor(totalSeconds / 3600);
//     var minutes = Math.floor((totalSeconds % 3600) / 60);
//     var seconds = totalSeconds % 60;

//     return {
//         hours: hours,
//         minutes: minutes,
//         seconds: seconds
//     };
// }


// function calculateCallChange(todayDuration , yesterdayDuration) {
 
//   var difference =   yesterdayDuration - todayDuration;
//   var percentageChange = (difference / yesterdayDuration) * 100;

//   if (difference < 0) {

//       return { percentage: Math.abs(percentageChange).toFixed(2), increased: false };

//   } else {
   
//       return { percentage: Math.abs(percentageChange).toFixed(2), increased: true };
      
//   }
// }

//   const [type,setType]=useState('inbound')
//   const {data}=useGetDashboardfDetailsQuery()
//   const {data:callDuration}=useGetDashboardfDetails2Query()
//   const[getCalls, {data:callsData}]=useLazyGetAllCallDetailsQuery()
//   const [page,setPage] = useState(1)
//   const [filteredCalls,setFilteredCalls]=useState({})
//   const dispatch = useDispatch()
//   const userData = useSelector(state => state?.user?.value)
//   const loaderState = useSelector((state) => state.loader?.value);

//   // const [showSetup, setShowSetup] = useState(false)
//   // console.log(userData)
//   // useEffect(() => {
//   //   if (userData?.staff?.setup_status < 5) {
//   //     dispatch(showLoader())
//   //     setTimeout(() => {
//   //       setShowSetup(true)
//   //       dispatch(hideLoader())
//   //     },3000)
//   //   }
//   // },[userData])
  
//   useEffect(()=>{
//     if(type){
//       getCalls({type:type,page:page})
//     }
//   },[type,page])

//   useEffect(()=>{
 
//     if(callsData){
//       console.log(callsData?.data?.calls)
//       setFilteredCalls(callsData?.data?.calls)
//     }
//   },[callsData])

//   const startPage = Math.max(1, page - 2);
//   const endPage = Math.min(startPage + 4, filteredCalls?.links?.length-1);
//     return (
//       <>
//         {loaderState && (
//           <>
//             <span className="delayLoader dashboardLoader !z-[99999]"></span>
//             <div className="delayLoaderOverlay !z-[999]"></div>
//           </>
//         )}
//         <div id="layout-wrapper">
//           <Header />
//           {/* {showSetup && (
//             <>
//               <Modal
//                 style={{ backdropFilter:"blur(3px)" }}
//                 centered
//                 scrollable
//                 show={true}
//                 size="xl"
//               >
//                 <Modal.Body>
//                   <ProfileAgreement />
//                 </Modal.Body>
//               </Modal>
//             </>
//           )} */}
//           <div className="main-content">
//             <div className="page-content">
//               <div className="container-fluid">
//                 <div className="row project-wrapper">
//                   <div className="col-xxl-8">
//                     <div className="row">
//                       <div className="col-xl-4">
//                         <div className="card card-animate">
//                           <div className="card-body">
//                             <div className="d-flex align-items-center">
//                               <div className="avatar-sm flex-shrink-0">
//                                 <span className="avatar-title bg-soft-secondary rounded-2 fs-2">
//                                   <i className="bx bx-time-five text-secondary"></i>
//                                 </span>
//                               </div>
//                               <div className="flex-grow-1 ms-3">
//                                 <p className="text-uppercase fw-medium text-muted mb-3">
//                                   Last Week Call Duration
//                                 </p>
//                                 <div className="d-flex align-items-center mb-3">
//                                   <h4 className="flex-grow-1 mb-0">
//                                     <span
//                                       className="counter-value"
//                                       data-target="18"
//                                     >
//                                       {convertSecondsToHMS(callDuration?.data?.yesterday_cd)?.hours}
//                                     </span>
//                                     h{" "}
//                                     <span
//                                       className="counter-value"
//                                       data-target="13"
//                                     >
//                                       0
//                                     </span>
//                                     m{" "}
//                                     <span
//                                       className="counter-value"
//                                       data-target="43"
//                                     >
//                                       0
//                                     </span>
//                                     s
//                                   </h4>
//                                   <span className="badge badge-soft-success fs-12">
//                                     <i className="ri-arrow-up-s-line fs-13 align-middle me-1"></i>
//                                     3.58 %
//                                   </span>
//                                 </div>
//                                 <p className="text-muted mb-0">
//                                   Leads this month
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                           {/* <!--  end card body --> */}
//                         </div>
//                       </div>
//                       {/* <!--  end col --> */}
//                       <div className="col-xl-4">
//                         <div className="card card-animate">
//                           <div className="card-body">
//                             <div className="d-flex align-items-center">
//                               <div className="avatar-sm flex-shrink-0">
//                                 <span className="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
//                                   <i className="bx bx-time-five text-primary"></i>
//                                 </span>
//                               </div>
//                               <div className="flex-grow-1 overflow-hidden ms-3">
//                                 <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
//                                   Yesterday Call Duration
//                                 </p>
//                                 <div className="d-flex align-items-center mb-3">
//                                   <h4 className="flex-grow-1 mb-0">
//                                     <span
//                                       className="counter-value"
//                                       data-target="5"
//                                     >
//                                    {convertSecondsToHMS(callDuration?.data?.yesterday_cd)?.hours}
//                                     </span>
//                                     h{" "}
//                                     <span
//                                       className="counter-value"
//                                       data-target="53"
//                                     >
//                                        {convertSecondsToHMS(callDuration?.data?.yesterday_cd)?.minutes}
//                                     </span>
//                                     m{" "}
//                                     <span
//                                       className="counter-value"
//                                       data-target="23"
//                                     >
//                                      {convertSecondsToHMS(callDuration?.data?.yesterday_cd)?.seconds}
//                                     </span>
//                                     s
//                                   </h4>
//                                  {calculateCallChange(callDuration?.data?.yesterday_cd,callDuration?.data?.thirday_cd).increased?<span className="badge badge-soft-danger fs-12">
//                                     <i className="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
//                                     {calculateCallChange(callDuration?.data?.yesterday_cd,callDuration?.data?.thirday_cd).percentage}%
//                                   </span>:<span className="badge badge-soft-success fs-12">
//                                     <i className="ri-arrow-up-s-line fs-13 align-middle me-1"></i>
//                                     {calculateCallChange(callDuration?.data?.yesterday_cd,callDuration?.data?.thirday_cd).percentage}%
//                                   </span>}
//                                 </div>
//                                 <p className="text-muted text-truncate mb-0">
//                                   Work this month
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                           {/* <!--  end card body --> */}
//                         </div>
//                       </div>
//                       {/* <!--  end col --> */}
//                       <div className="col-xl-4">
//                         <div className="card card-animate">
//                           <div className="card-body">
//                             <div className="d-flex align-items-center">
//                               <div className="avatar-sm flex-shrink-0">
//                                 <span className="avatar-title bg-soft-success text-success rounded-2 fs-2">
//                                   <i className="bx bx-time-five text-success"></i>
//                                 </span>
//                               </div>
//                               <div className="flex-grow-1 overflow-hidden ms-3">
//                                 <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
//                                   Today Call Duration
//                                 </p>
//                                 <div className="d-flex align-items-center mb-3">
//                                   <h4 className="flex-grow-1 mb-0">
//                                     <span
//                                       className="counter-value"
//                                       data-target="5"
//                                     >
//                                     {convertSecondsToHMS(callDuration?.data?.today_cd)?.hours}
//                                     </span>
//                                     h{" "}
//                                     <span
//                                       className="counter-value"
//                                       data-target="53"
//                                     >
//                                       {convertSecondsToHMS(callDuration?.data?.today_cd)?.minutes}
//                                     </span>
//                                     m{" "}
//                                     <span
//                                       className="counter-value"
//                                       data-target="23"
//                                     >
//                                    {convertSecondsToHMS(callDuration?.data?.today_cd)?.seconds}
//                                     </span>
//                                     s
//                                   </h4>
//                                   {calculateCallChange(callDuration?.data?.today_cd,callDuration?.data?.yesterday_cd).increased?<span className="badge badge-soft-danger fs-12">
//                                     <i className="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
//                                     {calculateCallChange(callDuration?.data?.today_cd,callDuration?.data?.yesterday_cd).percentage}%
//                                   </span>:<span className="badge badge-soft-success fs-12">
//                                     <i className="ri-arrow-up-s-line fs-13 align-middle me-1"></i>
//                                     {calculateCallChange(callDuration?.data?.today_cd,callDuration?.data?.yesterday_cd).percentage}%
//                                   </span>}
//                                 </div>
//                                 <p className="text-muted text-truncate mb-0">
//                                   Work this month
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                           {/* <!--  end card body --> */}
//                         </div>
//                       </div>
//                       {/* <!--  end col --> */}
//                     </div>
//                     {/* <!--  end row --> */}
//                     <div className="row">
//                       <div className="col-xl-12">
//                         <div className="card">
//                           <div className="card-header border-0 align-items-center d-flex">
//                             <h4 className="card-title mb-0 flex-grow-1">
//                               Enquiries Overview
//                             </h4>
//                             <div>
//                               <button
//                                 type="button"
//                                 className="btn btn-soft-primary btn-sm"
//                               >
//                                 Today
//                               </button>
//                               <button
//                                 type="button"
//                                 className="btn btn-soft-secondary btn-sm"
//                               >
//                                 Yesterday
//                               </button>
//                               <button
//                                 type="button"
//                                 className="btn btn-soft-secondary btn-sm"
//                               >
//                                 Week
//                               </button>
//                             </div>
//                           </div>
//                           <ApexChart
//                             NOP={[
//                               23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 35,
//                             ]}
//                             Revenue={[
//                               44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 50,
//                             ]}
//                             AP={[
//                               30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 45,
//                             ]}
//                           />
//                           {/* <!--  end card header --> */}
//                           <div className="card-header p-0 border-0 bg-soft-light">
//                             <div className="row g-0 text-center">
//                               <div className="col-6 col-sm-3">
//                                 <div className="p-3 border border-dashed border-start-0">
//                                   <h5 className="mb-1">
//                                     <span
//                                       className="counter-value"
//                                       data-target="51"
//                                     >
//                                       0
//                                     </span>
//                                   </h5>
//                                   <p className="text-muted mb-0">
//                                     <i className="mdi mdi-phone"></i> New
//                                     Enquiries
//                                   </p>
//                                 </div>
//                               </div>
//                               {/* <!-- end col--> */}
//                               <div className="col-6 col-sm-3">
//                                 <div className="p-3 border border-dashed border-start-0">
//                                   <h5 className="mb-1 text-info">
//                                     <span
//                                       className="counter-value"
//                                       data-target="352"
//                                     >
//                                       0
//                                     </span>
//                                   </h5>
//                                   <p className="text-muted mb-0">
//                                     <i className="mdi mdi-phone-ring"></i>{" "}
//                                     Ringing Enquiries
//                                   </p>
//                                 </div>
//                               </div>
//                               {/* <!-- end col--> */}
//                               <div className="col-6 col-sm-3">
//                                 <div className="p-3 border border-dashed border-start-0">
//                                   <h5 className="mb-1 text-warning">
//                                     <span
//                                       className="counter-value"
//                                       data-target="228"
//                                     >
//                                       0
//                                     </span>
//                                   </h5>
//                                   <p className="text-muted mb-0">
//                                     <i className="mdi mdi-phone-plus-outline"></i>{" "}
//                                     Postponed Enquiries
//                                   </p>
//                                 </div>
//                               </div>
//                               {/* <!-- end col--> */}
//                               <div className="col-6 col-sm-3">
//                                 <div className="p-3 border border-dashed border-start-0 border-end-0">
//                                   <h5 className="mb-1 text-danger">
//                                     <span
//                                       className="counter-value"
//                                       data-target="189"
//                                     >
//                                       0
//                                     </span>
//                                   </h5>
//                                   <p className="text-muted mb-0">
//                                     <i className="mdi mdi-phone-off"></i> Not
//                                     Interested Enquiries
//                                   </p>
//                                 </div>
//                               </div>
//                               {/* <!-- end col--> */}
//                             </div>
//                           </div>
//                           {/* <!--  end card header --> */}
//                           <div className="card-body p-0 pb-2">
//                             <div>
//                               <div
//                                 id="projects-overview-chart"
//                                 data-colors='["--vz-primary", "--vz-secondary", "--vz-danger"]'
//                                 dir="ltr"
//                                 className="apex-charts"
//                               ></div>
//                             </div>
//                           </div>
//                           {/* <!--  end card body --> */}
//                         </div>
//                         {/* <!--  end card --> */}
//                       </div>
//                       {/* <!--  end col --> */}
//                     </div>
//                     {/* <!--  end row --> */}
//                   </div>
//                   {/* <!--  end col --> */}
//                   <div className="col-xxl-4">
//                     <div className="card">
//                       <div className="card-header border-0">
//                         <h4 className="card-title mb-0 font-semibold">
//                           Upcoming Reminders
//                         </h4>
//                       </div>
//                       {/* <!--  end cardheader --> */}
//                       <div className="card-body pt-0">
//                         <div className="upcoming-scheduled">
//                           <Flatpickr
//                             options={{
//                               // mode: "range",
//                               dateFormat: "d-M-Y",
//                               conjunction: "to",
//                               inline: true,
//                               defaultDate: new Date(),
//                             }}
//                             className="form-control bg-light border-light"
//                             readOnly="readOnly"
//                           />

//                           {/* <input type="text" className="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-deafult-date="today" data-inline-date="true"/> */}
//                         </div>
//                         <h6 className="text-uppercase fw-semibold mt-4 mb-3 text-muted">
//                           Events:
//                         </h6>
//                         <div className="mini-stats-wid d-flex align-items-center mt-3">
//                           <div className="flex-shrink-0 avatar-sm">
//                             <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
//                               09
//                             </span>
//                           </div>
//                           <div className="flex-grow-1 ms-3">
//                             <h6 className="mb-1">Development planning</h6>
//                             <p className="text-muted mb-0">iTest Factory </p>
//                           </div>
//                           <div className="flex-shrink-0">
//                             <p className="text-muted mb-0">
//                               9:20 <span className="text-uppercase">am</span>
//                             </p>
//                           </div>
//                         </div>
//                         {/* <!--  end --> */}
//                         <div className="mini-stats-wid d-flex align-items-center mt-3">
//                           <div className="flex-shrink-0 avatar-sm">
//                             <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
//                               12
//                             </span>
//                           </div>
//                           <div className="flex-grow-1 ms-3">
//                             <h6 className="mb-1">
//                               Design new UI and check sales
//                             </h6>
//                             <p className="text-muted mb-0">Meta4Systems</p>
//                           </div>
//                           <div className="flex-shrink-0">
//                             <p className="text-muted mb-0">
//                               11:30 <span className="text-uppercase">am</span>
//                             </p>
//                           </div>
//                         </div>
//                         {/* <!--  end --> */}
//                         <div className="mini-stats-wid d-flex align-items-center mt-3">
//                           <div className="flex-shrink-0 avatar-sm">
//                             <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
//                               25
//                             </span>
//                           </div>
//                           <div className="flex-grow-1 ms-3">
//                             <h6 className="mb-1">Weekly catch-up </h6>
//                             <p className="text-muted mb-0">
//                               Nesta Technologies
//                             </p>
//                           </div>
//                           <div className="flex-shrink-0">
//                             <p className="text-muted mb-0">
//                               02:00 <span className="text-uppercase">pm</span>
//                             </p>
//                           </div>
//                         </div>
//                         {/* <!--  end --> */}
//                         <div className="mini-stats-wid d-flex align-items-center mt-3">
//                           <div className="flex-shrink-0 avatar-sm">
//                             <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
//                               27
//                             </span>
//                           </div>
//                           <div className="flex-grow-1 ms-3">
//                             <h6 className="mb-1">
//                               James Bangs (Client) Meeting
//                             </h6>
//                             <p className="text-muted mb-0">
//                               Nesta Technologies
//                             </p>
//                           </div>
//                           <div className="flex-shrink-0">
//                             <p className="text-muted mb-0">
//                               03:45 <span className="text-uppercase">pm</span>
//                             </p>
//                           </div>
//                         </div>
//                         {/* <!--  end --> */}
//                         <div className="mt-3 text-center">
//                           <a
//                             href="javascript:void(0);"
//                             className="text-muted text-decoration-underline"
//                           >
//                             View all Events
//                           </a>
//                         </div>
//                       </div>
//                       {/* <!--  end cardbody --> */}
//                     </div>
//                     {/* <!--  end card --> */}
//                   </div>
//                   {/* <!--  end col --> */}
//                 </div>
//                 <div className="row">
//                   <div className="col-xl-12">
//                     <div className="card">
//                       <div className="card-header border-0 align-items-center d-flex">
//                         <h4 className="card-title mb-0 flex-grow-1">
//                           TL Call Recordings
//                         </h4>
//                       </div>
//                       <div className="card-body border border-dashed border-end-0 border-start-0">
//                         <form>
//                           <div className="row g-3">
//                             <div className="col-xxl-8 col-sm-4">
//                               <div className="search-box">
//                                 <input
//                                   type="text"
//                                   className="form-control search bg-light border-light"
//                                   placeholder="Search"
//                                 />
//                                 {/* <i className="ri-search-line search-icon"></i> */}
//                               </div>
//                             </div>
//                             {/* <!--end col--> */}
//                             <div className="col-xxl-2 col-sm-4">
//                               <button
//                                 type="button"
//                                 className="btn btn-primary bg-primary w-100"
//                               >
//                                 {" "}
//                                 <i className="ri-equalizer-fill me-1 align-bottom"></i>
//                                 Search
//                               </button>
//                             </div>
//                             <div className="col-6 col-md-3 col-lg-3 col-xxl-2 col-sm-4">
//                               <button
//                                 id="advSearch"
//                                 type="button"
//                                 className="btn btn-info bg-info w-100"
//                               >
//                                 {" "}
//                                 <i className="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
//                                 Advanced Search
//                               </button>
//                             </div>
//                             <div
//                               className="col-6 col-md-3 col-lg-3 col-xxl-12 py-2 m-0"
//                               id="advSearchDiv"
//                             >
//                               <hr />
//                               <div className="d-flex gap-2">
//                                 <div className="col-xxl-2">
//                                   <select
//                                     className="form-control"
//                                     data-choices
//                                     name="choices-single-default"
//                                   >
//                                     <option value="">Select Source</option>
//                                     <option value="Choice 1">Inbound</option>
//                                     <option value="Choice 2">Outbound</option>
//                                     <option value="Choice 3">
//                                       Inbound Missed
//                                     </option>
//                                     <option value="Choice 3">
//                                       Outbound Missed
//                                     </option>
//                                   </select>
//                                 </div>
//                                 <div className="col-xxl-2">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     data-provider="flatpickr"
//                                     data-date-format="d M, Y"
//                                     data-range-date="true"
//                                     placeholder="Select Date Range"
//                                   />
//                                 </div>
//                                 <div className="col-6 col-md-2 col-lg-2 col-xxl-1">
//                                   <button className="btn btn-success bg-success w-100">
//                                     {" "}
//                                     <i className="mdi mdi-magnify search-widget-icon me-1 align-bottom"></i>
//                                     Filter
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* <!--end col--> */}
//                           </div>
//                           {/* <!--end row--> */}
//                         </form>
//                       </div>
//                       <div className="card-body">
//                         {/* <!-- Nav tabs --> */}
//                         <ul
//                           className="nav nav-tabs nav-justified mb-3 gap-3"
//                           data-dropdown-tabs="true"
//                           id=""
//                           role="tablist"
//                         >
//                           <li className="nav-item">
//                             <a
//                               className="nav-link active"
//                               data-bs-toggle="tab"
//                               href="#inbound-tab"
//                               role="tab"
//                               aria-selected="true"
//                               onClick={()=>{setType('inbound')
//                               setPage(1)}}
//                             >
//                               <i className="mdi mdi-phone-incoming-outline"></i>{" "}
//                               Inbound
//                             </a>
//                           </li>
//                           <li className="nav-item">
//                             <a
//                               className="nav-link align-middle"
//                               data-bs-toggle="tab"
//                               href="#outbound-tab"
//                               role="tab"
//                               aria-selected="true"
//                               onClick={()=>{setType('outbound')
//                               setPage(1)
//                             }}

//                             >
//                               <i className="mdi mdi-phone-outgoing-outline"></i>{" "}
//                               Outbound
//                             </a>
//                           </li>
//                           <li className="nav-item">
//                             <a
//                               className="nav-link align-middle"
//                               data-bs-toggle="tab"
//                               href="#inbound-missed-tab"
//                               role="tab"
//                               aria-selected="true"
//                               onClick={()=>{setType('in_missed')
//                               setPage(1)
//                             }}

//                             >
//                               <i className="mdi mdi-phone-missed-outline"></i>{" "}
//                               Inbound Missed
//                             </a>
//                           </li>
//                           <li className="nav-item">
//                             <a
//                               className="nav-link"
//                               data-bs-toggle="tab"
//                               href="#outbound-missed-tab"
//                               role="tab"
//                               aria-selected="true"
//                               onClick={()=>{setType('out_missed')
//                             setPage(1)
//                             }}

//                             >
//                               <i className="mdi mdi-phone-missed-outline"></i>{" "}
//                               Outbound Missed
//                             </a>
//                           </li>
//                         </ul>
//                         {/* <!-- Nav tabs --> */}
//                         <div className="tab-content text-muted" id="">
//                           <div
//                             className="tab-pane active"
                            
//                           >
//                             <div className="card card-height-100 mt-4">
//                               <div className="card-body">
//                                 <div className="table-responsive table-card">
//                                   <table className="table table-nowrap table-centered align-middle">
//                                     <thead className="bg-light text-muted">
//                                       <tr>
//                                         <th scope="col">Sl No.</th>
//                                         <th scope="col">Call Date</th>
//                                         <th scope="col">Linked ID</th>
//                                         <th scope="col">Source</th>
//                                         <th scope="col">Destination</th>
//                                         <th scope="col">Direction</th>
//                                       {(type=="inbound" ||type=="outbound")&&  <th scope="col">Duration</th>}
//                                         {(type=="inbound" ||type=="outbound")&&<th scope="col" className="w-[10%]">
//                                           Recording
//                                         </th>}
//                                       </tr>
//                                       {/* <!-- end tr --> */}
//                                     </thead>
//                                     {/* <!-- thead --> */}
//                                     <tbody>
//                                       {filteredCalls?.data?.length>0&&
//                                       filteredCalls?.data?.map((call,i)=>(
//                                         <tr>
//                                         <td>{i+1}</td>
//                                         <td className="fw-medium">
//                                           {moment(call?.calldate)?.format("DD MMM YYYY")}
//                                         </td>
//                                         <td>{call?.uuid}</td>
//                                         <td>{call?.source}</td>
                                         
//                                         <td>{call?.destination}</td>
//                                         <td>
//                                           <span className="badge badge-soft-success capitalize">
//                                             {call?.direction}
//                                           </span>
//                                         </td>
//                                         {(type=="inbound" ||type=="outbound")&&<td className="text-muted">{(call?.bill_sec/60).toFixed(2)}</td>}
//                                         {(type=="inbound" ||type=="outbound")&&<td>
//                                           <audio controls>
//                                             <source
//                                               src={call?.recordingfile}
//                                               type="audio/wav"
//                                             />
//                                             <source
//                                              src={call?.recordingfile}
//                                               type="audio/mpeg"
//                                             />
//                                             Your browser does not support the
//                                             audio tag.
//                                           </audio>
//                                         </td>}
//                                       </tr>
//                                       ))
//                                       }
                                      
                                  
//                                     </tbody>
//                                     {/* <!-- end tbody --> */}

//                                   </table>
//                   {filteredCalls?.data?.length<1&&<div className='w-full whitespace-nowrap p-2 mb-2 text-primary  bg-[#f1f1f1] text-muted text-lg text-center shadow-sm '>No Data Found</div>}
//                                   {/* <!-- end table --> */}

//                                 </div>
//                                 <div className="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
//                                   <div className="flex-shrink-0">
//                                     <div className="text-muted">
//                                       Showing{" "}
//                                       <span className="fw-semibold">{filteredCalls?.data?.length}</span> of{" "}
//                                       <span className="fw-semibold">{filteredCalls?.total}</span>{" "}
//                                       Results{" "}
//                                     </div>
//                                   </div>
                                  
//                                   <ul className="pagination pagination-separated pagination-sm mb-0">
//   {filteredCalls?.links?.map((link, i) => (
//                        <React.Fragment key={i + "paginate"}>
            
//                         {i === 0 && (
//                           <>
                          
//                           <li
//                           className={`page-item ${
//                             link?.url == null ? "disabled" : "cursor-pointer "
//                           } ${link?.active && "active"}`}
//                           key={i + "paginate"}
//                           onClick={() => {
//                             setPage(link.url.split("page=")[1]);
//                           }}
//                         >
//                           <a
//                             className="page-link"
//                             dangerouslySetInnerHTML={{ __html: link.label }}
//                           />
//                         </li> 
                        
//                         {page >=4 && (
//                           <li className="page-item disabled">
//                             <span className="page-link">. . .</span>
//                           </li>
//                         )}
//                           </>
//   )}

//   {i >= startPage && i < endPage && (   
//                       <li
//                         className={`page-item ${
//                           link?.url == null ? "disabled" : "cursor-pointer "
//                         } ${link?.active && "active"}`}
//                         key={i + "paginate"}
//                         onClick={() => {
//                           setPage(link.url.split("page=")[1]);
//                         }}
//                       >
//                         <a
//                           className="page-link"
//                           dangerouslySetInnerHTML={{ __html: link.label }}
//                         />
//                       </li>

//                       )}

//                       {i === filteredCalls?.links?.length - 1 && (
//                         <>
//                          { filteredCalls?.links?.length - 1 > endPage && (
//       <li className="page-item disabled">
//         <span className="page-link">...</span>
//       </li>
//     )}
//                         <li
//                         className={`page-item ${
//                           link?.url == null ? "disabled" : "cursor-pointer "
//                         } ${link?.active && "active"}`}
//                         key={i + "paginate"}
//                         onClick={() => {
//                           setPage(link.url.split("page=")[1]);
//                         }}
//                       >
//                         <a
//                           className="page-link"
//                           dangerouslySetInnerHTML={{ __html: link.label }}
//                         />
//                       </li>
//                         </>
//     )}
//                       </React.Fragment>
//                     ))}
//                   </ul>
//                                 </div>
//                               </div>
//                               {/* <!-- end card body --> */}
//                             </div>
//                             {/* <!-- end card --> */}
//                           </div>

                          
//                         </div>
//                       </div>
//                       {/* <!-- end card-body --> */}
//                     </div>
//                   </div>
//                   {/* <!-- end col --> */}
//                 </div>
//               </div>
//             </div>
//             <Footer />
//           </div>
//         </div>
//       </>
//     );
// }


import Header from "./Header";
import EnquiriesOverview from "./dashboardComponents/enquiriesOverviewGraph";
import Remainders from "./dashboardComponents/Remainders";
import TodaysCalls from "./dashboardComponents/Calls";
import Tasks from "./dashboardComponents/Tasks";
import DashboardComments from "./dashboardComponents/Comments";
import InvoiceDonut from "./dashboardComponents/InvoiceStatusDonut";
import CallCounts from "./dashboardComponents/CallCounts";
import ProposalsCards from "./dashboardComponents/proposalsCards";

export default function Dashboard() {
  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row project-wrapper">
                <div className="col-xxl-8">
                  <CallCounts />
                  {/* <!--  end row --> */}
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <EnquiriesOverview />
                        <ProposalsCards/>
                        {/* <!--  end card header --> */}

                        {/* <!--  end card header --> */}
                        
                        {/* <!--  end card body --> */}
                      </div>
                      {/* <!--  end card --> */}
                    </div>
                    {/* <!--  end col --> */}
                  </div>
                  {/* <!--  end row --> */}
                </div>
                {/* <!--  end col --> */}
                <Remainders />
                {/* <!--  end col --> */}
              </div>
              {/* <!--  end row --> */}
              <div className="row">
                <div className="col-xl-12">
                  <TodaysCalls />
                  {/* <!--  end card --> */}
                </div>
                {/* <!--  end col --> */}
              </div>
              {/* <!--  end row --> */}
              <div className="row">
                <Tasks />
                {/* <!--  end col --> */}
                <DashboardComments />
                {/* <!--  end col --> */}
                <InvoiceDonut />
              </div>
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
    </>
  );
}
