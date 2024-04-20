import SimpleBar from "simplebar-react";
import { useGetGeneralInfoQuery } from "../../../services/api";
import Loader from "../Loader";

export default function DashboardComments() {
  const { data: callsInfo, isLoading } = useGetGeneralInfoQuery();
  

  function formatRelativeTime(timeString) {
    const currentTime = new Date();
    const pastTime = new Date(timeString);
    const timeDifference = (currentTime - pastTime) / 1000; // Time difference in seconds

    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} seconds ago`;
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)} minutes ago`;
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)} hours ago`;
    } else if (timeDifference < 2592000) {
      return `${Math.floor(timeDifference / 86400)} days ago`;
    } else if (timeDifference < 31536000) {
      return `${Math.floor(timeDifference / 2592000)} months ago`;
    } else {
      return `${Math.floor(timeDifference / 31536000)} years ago`;
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="col-xxl-4 col-lg-6">
        <div className="card card-height-100">
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
          </div>
          {/* <!--  end card header --> */}
          <div className="card-body p-0">
            <div>
              <SimpleBar className=" h-[490px]" data-simplebar>
                <div className="mt-2">
                  {callsInfo?.data?.latest_comments?.length > 0 &&
                    callsInfo?.data?.latest_comments?.map((comment, ind) => (
                      <div className="p-2 card  bg-slate-50" key={ind}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <img
                              src="/assets/images/users/default_proile_image.png"
                              className="avatar-xs rounded-3 me-2"
                            />
                            <div>
                              <p className="text-xs !font-bold text-muted text-capitalize">
                                {comment?.title}
                              </p>

                              <p className="text-[10px] truncate max-w-[150px]">{comment?.comment}</p>
                              <span className="text-muted text-[12px] text-semibold ">
                                Enquiry Details
                              </span>
                              <p
                                className="text-[12px]  "
                              >
                                {comment?.enq?.name}
                              </p>
                              <p
                                className="text-[12px] "
                               
                              >
                                {comment?.enq?.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end">
                            <p className="badge badge-soft-warning text-end">
                              {comment?.position}
                            </p>
                            <span className="text-[12px] text-muted">
                              <i className=" mdi mdi-calendar mr-1">
                                {comment?.date}
                              </i>{" "}
                            </span>
                            <span className="text-secondary float-right">
                              <i className=" mdi mdi-calendar-clock-outline mr-1"></i>
                              {formatRelativeTime(comment?.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </SimpleBar>
            </div>
            <div className="border-top border-top-dashed"></div>
          </div>
          {/* <!--  end cardbody --> */}
        </div>
        {/* <!--  end card --> */}
      </div>
    </>
  );
}
