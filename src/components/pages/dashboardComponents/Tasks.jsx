import { useGetGeneralInfoQuery } from "../../../services/api";
import Loader from "../Loader";
import SimpleBar from "simplebar-react";

export default function Tasks() {
    const { data: callsInfo, isLoading } = useGetGeneralInfoQuery();
  return (
    <>
      {isLoading && <Loader />}
      <div className="col-xxl-4">
        <div className="card card-height-100">
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              Today&apos;s Postponed Enquiries
            </h4>
          </div>
          {/* <!--  end card header --> */}
          <div className="card-body">
            <div className="table-responsive table-card">
              <SimpleBar className=" h-[490px]" data-simplebar>
                <table className="table table-borderless ml-3 table-nowrap align-middle mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th className="text-start" scope="col">
                        Enquiries
                      </th>
                      <th className="text-center" scope="col">
                        Last Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {callsInfo?.data?.todays_post_enqs?.length > 0 &&
                      callsInfo?.data?.todays_post_enqs?.map((enq, ind) => (
                        <tr key={ind}>
                          <td className="d-flex">
                            <img
                              src="/assets/images/users/default_proile_image.png"
                              alt=""
                              className="avatar-xs rounded-3 me-2"
                            />
                            <div>
                              <h5 className="fs-13 mb-0 text-capitalize text-start">
                                {enq?.name}
                              </h5>
                              <p className="fs-12 mb-0 text-muted text-start ">
                                {enq?.email}
                              </p>
                            </div>
                          </td>
                          <td>
                            <h6 className="mb-0 text-end truncate text-capitalize  max-w-[220px]">
                              {enq?.title}
                            </h6>
                            <h6 className="mb-0 text-end w-full text-muted text-[10px] truncate max-w-[220px]">
                              {enq?.comment}
                            </h6>
                          </td>
                          <td style={{ width: "5%" }}>
                            <div
                              id="radialBar_chart_1"
                              data-colors='["--vz-primary"]'
                              data-chart-series="50"
                              className="apex-charts"
                              dir="ltr"
                            ></div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  {/* <!--  end tbody --> */}
                </table>
                {callsInfo?.data?.todays_post_enqs?.length == 0 && (
                  <p className="text-center text-muted">No enquiries found</p>
                )}
              </SimpleBar>
              {/* <!--  end table --> */}
            </div>
          </div>
          {/* <!--  end cardbody --> */}
        </div>
        {/* <!--  end card --> */}
      </div>
    </>
  );
}