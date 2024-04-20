import { useGetGeneralInfoQuery } from "../../../services/api";
import Loader from "../Loader";

export default function CallCounts() {

  const { data:callsInfo, isLoading } = useGetGeneralInfoQuery()
  
  function convertSecondsToHMS(seconds) {
      console.log(seconds)
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;

      return `${hours}-${minutes}-${remainingSeconds}`;
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="row">
        <div className="col-xl-4">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-secondary rounded-2 fs-2">
                    <i className="bx bx-time-five text-secondary"></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-3">
                    Last Week Call Duration
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <h4 className="flex-grow-1 mb-0">
                      <span className="counter-value" data-target="18">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data
                              ?.last_week_call_dur_in_sec
                          )?.split("-")[0]
                        }
                      </span>
                      h{" "}
                      <span className="counter-value" data-target="13">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data
                              ?.last_week_call_dur_in_sec
                          )?.split("-")[1]
                        }
                      </span>
                      m{" "}
                      <span className="counter-value" data-target="43">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data
                              ?.last_week_call_dur_in_sec
                          )?.split("-")[2]
                        }
                      </span>
                      s
                    </h4>
                    <span
                      className={`badge badge-soft-${
                        callsInfo?.data?.cards_data?.w_per?.includes("-")
                          ? "danger"
                          : "success"
                      } fs-12`}
                    >
                      <i
                        className={`ri-arrow-${
                          callsInfo?.data?.cards_data?.w_per?.includes("-")
                            ? "down"
                            : "up"
                        }-s-line fs-13 align-middle me-1`}
                      ></i>
                      {callsInfo?.data?.cards_data?.w_per > 0 ?  callsInfo?.data?.cards_data?.w_per : callsInfo?.data?.cards_data?.w_per?.substring(1)} %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--  end card body --> */}
          </div>
        </div>
        {/* <!--  end col --> */}
        <div className="col-xl-4">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                    <i className="bx bx-time-five text-primary"></i>
                  </span>
                </div>
                <div className="flex-grow-1 overflow-hidden ms-3">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                    Yesterday Call Duration
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <h4 className="flex-grow-1 mb-0">
                      <span className="counter-value" data-target="18">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data?.y_dur_in_sec
                          )?.split("-")[0]
                        }
                      </span>
                      h{" "}
                      <span className="counter-value" data-target="13">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data?.y_dur_in_sec
                          )?.split("-")[1]
                        }
                      </span>
                      m{" "}
                      <span className="counter-value" data-target="43">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data?.y_dur_in_sec
                          )?.split("-")[2]
                        }
                      </span>
                      s
                    </h4>
                    <span
                      className={`badge badge-soft-${
                        callsInfo?.data?.cards_data?.y_per?.includes("-")
                          ? "danger"
                          : "success"
                      } fs-12`}
                    >
                      <i
                        className={`ri-arrow-${
                          callsInfo?.data?.cards_data?.y_per?.includes("-")
                            ? "down"
                            : "up"
                        }-s-line fs-13 align-middle me-1`}
                      ></i>
                      {callsInfo?.data?.cards_data?.y_per > 0 ? callsInfo?.data?.cards_data?.y_per : callsInfo?.data?.cards_data?.y_per?.substring(1)} %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--  end card body --> */}
          </div>
        </div>
        {/* <!--  end col --> */}
        <div className="col-xl-4">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success text-success rounded-2 fs-2">
                    <i className="bx bx-time-five text-success"></i>
                  </span>
                </div>
                <div className="flex-grow-1 overflow-hidden ms-3">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                    Today Call Duration
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <h4 className="flex-grow-1 mb-0">
                      <span className="counter-value" data-target="18">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data?.t_dur_in_sec
                          )?.split("-")[0]
                        }
                      </span>
                      h{" "}
                      <span className="counter-value" data-target="13">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data?.t_dur_in_sec
                          )?.split("-")[1]
                        }
                      </span>
                      m{" "}
                      <span className="counter-value" data-target="43">
                        {
                          convertSecondsToHMS(
                            callsInfo?.data?.cards_data?.t_dur_in_sec
                          )?.split("-")[2]
                        }
                      </span>
                      s
                    </h4>
                    <span
                      className={`badge badge-soft-${
                        callsInfo?.data?.cards_data?.t_per?.includes("-")
                          ? "danger"
                          : "success"
                      } fs-12`}
                    >
                      <i
                        className={`ri-arrow-${
                          callsInfo?.data?.cards_data?.t_per?.includes("-")
                            ? "down"
                            : "up"
                        }-s-line fs-13 align-middle me-1`}
                      ></i>
                      {callsInfo?.data?.cards_data?.t_per > 0 ? callsInfo?.data?.cards_data?.t_per : callsInfo?.data?.cards_data?.t_per?.substring(1)} %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--  end card body --> */}
          </div>
        </div>
        {/* <!--  end col --> */}
      </div>
    </>
  );
}