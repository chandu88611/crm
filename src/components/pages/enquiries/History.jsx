/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useGetJSONDecodedLogsMutation, useLazyHistoryByDateQuery } from "../../../services/api";
import TableLoader from "../TableLoader";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../reducers/loader";
import axios from "axios";
import moment from "moment";



export default function EnquiryHistory() {
  const loaderState = useSelector((state) => state.loader?.value);
  const dispatch = useDispatch();

   const [historyData, setHistoryData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize with today's date
  const [toggleViewEnquiries, setToggleViewEnquiries] = useState(0);
  const [enqData, setEnqData] = useState([])

  const [historyInfo, { data, isLoading, error }] = useLazyHistoryByDateQuery()
  
  const [getEnqData, { data:enqDataRes, isLoading: enqLoading }] =
    useGetJSONDecodedLogsMutation()
   
  useEffect(() => {
     console.log("inside fetch")
      const fetchData = async () => {
         const response = await historyInfo({date: formatDate(currentDate)})
         if (response) {
            setHistoryData(response?.data?.data)
            console.log(response?.data?.data)
         }
      }
      fetchData()
  }, [currentDate])
  
  const handleViewEnquiries = async (link,ind) => {
    console.log()
    if (ind == toggleViewEnquiries) {
      setToggleViewEnquiries(0)
    } else {
      setToggleViewEnquiries(ind);
    }
    
    const response = await getEnqData({ file_url: link });
    if (response?.data?.status) {
      setEnqData(response?.data?.data?.logs)
      // console.log(response?.data)
    }
}

  const formatDate = (date) => {
     console.log(date, typeof(date))
     const day = String(date?.getDate()).padStart(2, "0");
     const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
     const year = date.getFullYear();
     return `${day}-${month}-${year}`;
   };

   useEffect(()=>{
console.log(historyData?.date)
   },[historyData])
  return (
    <>
      {isLoading && <TableLoader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <p className="mb-sm-0 relative">
                      <small>Showing logs of </small>
                      <Flatpickr
                        className="form-control bg-light border-0"
                        options={{
                          // mode: "range",
                          enableTime: false,
                          dateFormat: "d-M-Y",
                          defaultDate: currentDate,
                          maxDate: new Date(),
                          onChange: (selectedDates, dateStr, instance) => {
                            setCurrentDate(new Date(selectedDates[0]));
                          },
                        }}
                      />
                     
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Enquiries</a>
                          </li>
                          <li className="breadcrumb-item active">History</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    {/* <!-- <h5>Center Timeline</h5> --> */}
                    <div className="timeline">
                      {historyData?.history?.map((history, ind) => (
                        <div
                          className={`timeline-item ${
                            ind % 2 == 0 ? "left" : "right"
                          }`}
                          key={ind}
                        >
                          <i className="icon ri-stack-line"></i>
                          <div className="date">
                            {moment(historyData?.date,"DD-MM-YYYY").format('DD MMM YYYY')}
                          </div>
                          <div className="content">
                            <div className="d-flex">
                              <div className="flex-grow-1 ms-3">
                                <h5 className="fs-15 font-semibold">
                                  {history?.action}
                                </h5>
                                <p className="text-muted mb-2">
                                  {history?.result}{" "}
                                </p>
                                {/* <!-- Horizontal Collapse --> */}
                                <div className="slideDiv">
                                  {history?.link != null && (
                                    <button
                                      className="btn btn-primary bg-primary slideBtn px-1 py-0"
                                      type="button"
                                      onClick={() =>
                                        handleViewEnquiries(
                                          history?.link,
                                          ind + 1
                                        )
                                      }
                                    >
                                      View Details
                                    </button>
                                  )}
                                  {toggleViewEnquiries == ind + 1 && (
                                    <div className="slideContent !block">
                                      <div className="mt-2 w-full">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            {loaderState && <TableLoader />}
                                            {enqData && (
                                              <ul className="list-group list-group-flush border-dashed mb-0 mt-0 pt-2">
                                                {enqData?.map((enq, ind) => (
                                                  <li
                                                    className="list-group-item px-0"
                                                    key={ind}
                                                  >
                                                    <div className="">
                                                      {enq?.Name &&
                                                        ind != 0 && (
                                                          <div className="flex items-center gap-3">
                                                            <div className="flex-shrink-0 avatar-xs">
                                                              <span className="avatar-title bg-dark p-1 rounded-circle">
                                                                <i className="mdi mdi-account text-white fs-16"></i>
                                                              </span>
                                                            </div>
                                                            <div className="flex items-center justify-between w-full">
                                                              <div className="flex-grow-1 ms-2">
                                                                <span
                                                                  className="mb-1 emailTooltip"
                                                                  data-toggle="tooltip"
                                                                  title="momin@gleamglobalservicesindia.com"
                                                                >
                                                                  {enq?.Name}
                                                                </span>
                                                                <p className="fs-12 mb-0 text-muted">
                                                                  {enq?.Email}{" "}
                                                                </p>
                                                                <p className="fs-12 mb-0 text-muted">
                                                                  {enq?.Phone}{" "}
                                                                </p>
                                                              </div>
                                                              <div>
                                                                <p className="fs-12 mb-0 text-muted">
                                                                  {enq?.Note}
                                                                </p>
                                                                <p className="fs-12 mb-0 text-muted">
                                                                  {enq?.Domain}{" "}
                                                                </p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}
                                                      <div className="flex-shrink-0 ">
                                                        {enq?.description && (
                                                          <h6 className="mb-1 text-start flex break-words items-center w-[250px] h6">
                                                            <i className="ri-git-commit-line"></i>
                                                            {enq?.description}
                                                          </h6>
                                                        )}
                                                        {enq?.date_time && <p className="text-primary text-xs mb-0 text-end w-full">
                                                          <span className="text-muted font-semibold">
                                                            Date :
                                                          </span>
                                                          {new Date(
                                                            enq?.date_time
                                                          ).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                              day: "2-digit",
                                                              month: "short",
                                                              year: "numeric",
                                                            }
                                                          )}
                                                        </p>}
                                                      </div>
                                                    </div>
                                                  </li>
                                                ))}
                                              </ul>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="border-dashed  border-gray-900 my-4" />
                    {historyData[0]?.history?.length == 0 && (
                      <p className="m-auto text-3xl text-muted text-center ">
                        No Logs found
                      </p>
                    )}
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <Footer />
        </div>
      </div>
    </>
  );
}