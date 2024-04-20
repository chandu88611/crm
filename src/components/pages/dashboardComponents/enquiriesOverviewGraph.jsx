/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ApexCharts from "../charts/EnquiriesFC";
import { useSelector } from "react-redux";

import { useGetGeneralInfoQuery, useLazyGetCallsOverviewQuery } from "../../../services/api";
import Loader from "../Loader";

export default function EnquiriesOverview() {
    const userData = useSelector((state) => state?.user?.value);

  const [callsOverviewData, setCallsOverViewData] = useState()
  const [dataFilter, setDataFilter] = useState("today")

  const [ callsOverview, { isLoading }
  ] = useLazyGetCallsOverviewQuery()
  
    const { data: callsInfo } = useGetGeneralInfoQuery();


const fetchCallsOverview = async () => {
  const response = await callsOverview({ type: dataFilter })
  if (response?.data?.status) {
    setCallsOverViewData(response?.data?.data)
  }
  }
  
  console.log(callsOverviewData)
  
useEffect(() => {
  fetchCallsOverview()
},[dataFilter])
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className="card-header border-0 align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Calls Overview</h4>
        <div>
          <button
            type="button"
            className={`btn btn-soft-${
              dataFilter == "today" ? "primary" : "secondary"
            } btn-sm`}
            onClick={() => setDataFilter("today")}
          >
            Today
          </button>
          <button
            type="button"
            className={`btn btn-soft-${
              dataFilter == "yesterday" ? "primary" : "secondary"
            } btn-sm`}
            onClick={() => setDataFilter("yesterday")}
          >
            Yesterday
          </button>
          <button
            type="button"
            className={`btn btn-soft-${
              dataFilter == "week" ? "primary" : "secondary"
            } btn-sm`}
            onClick={() => setDataFilter("week")}
          >
            Week
          </button>
          <button
            type="button"
            className={`btn btn-soft-${
              dataFilter == "week" ? "primary" : "secondary"
            } btn-sm`}
            onClick={() => setDataFilter("month")}
          >
            Month
          </button>
        </div>
      </div>
      <ApexCharts
        inbound={callsOverviewData?.inbound}
        outbound={callsOverviewData?.outbound}
        answered={callsOverviewData?.answered}
        labels={callsOverviewData?.x_axis}
      />
      <div className="card-header p-0 border-0 bg-soft-light">
        <div className="row g-0 text-center">
          <div className="col-6 col-sm-3">
            <div className="p-3 border border-dashed border-start-0">
              <h5 className="mb-1">
                <span
                  className="counter-value"
                  data-target={callsInfo?.data?.enq_counts?.new_enq_count}
                >
                  {callsInfo?.data?.enq_counts?.new_enq_count}
                </span>
              </h5>
              <p className="text-muted mb-0">
                <i className="mdi mdi-phone"></i> New Enquiries
              </p>
            </div>
          </div>
          {/* <!-- end col--> */}
          <div className="col-6 col-sm-3">
            <div className="p-3 border border-dashed border-start-0">
              <h5 className="mb-1 text-info">
                <span
                  className="counter-value"
                  data-target={callsInfo?.data?.enq_counts?.ring_enq_count}
                >
                  {callsInfo?.data?.enq_counts?.ring_enq_count}
                </span>
              </h5>
              <p className="text-muted mb-0">
                <i className="mdi mdi-phone-ring"></i> Ringing Enquiries
              </p>
            </div>
          </div>
          {/* <!-- end col--> */}
          <div className="col-6 col-sm-3">
            <div className="p-3 border border-dashed border-start-0">
              <h5 className="mb-1 text-warning">
                <span
                  className="counter-value"
                  data-target={callsInfo?.data?.enq_counts?.post_enq_count}
                >
                  {callsInfo?.data?.enq_counts?.post_enq_count}
                </span>
              </h5>
              <p className="text-muted mb-0">
                <i className="mdi mdi-phone-plus-outline"></i> Postponed
                Enquiries
              </p>
            </div>
          </div>
          {/* <!-- end col--> */}
          <div className="col-6 col-sm-3">
            <div className="p-3 border border-dashed border-start-0 border-end-0">
              <h5 className="mb-1 text-danger">
                <span
                  className="counter-value"
                  data-target={callsInfo?.data?.enq_counts?.notin_enq_count}
                >
                  {callsInfo?.data?.enq_counts?.notin_enq_count}
                </span>
              </h5>
              <p className="text-muted mb-0">
                <i className="mdi mdi-phone-off"></i> Not Interested Enquiries
              </p>
            </div>
          </div>
          {/* <!-- end col--> */}
        </div>
      </div>
    </>
  );
}