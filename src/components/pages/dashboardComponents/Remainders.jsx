/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "./dashboardstyles.css"
import SimpleBar from "simplebar-react";

import { useLazyGetEventsQuery } from "../../../services/api";
import Loader from "../Loader";

export default function Remainders() {
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState()

  const handleDateChange = (dateStr) => {
    setDate(dateStr)
  }

  function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  const [getEvetns, {isLoading}] = useLazyGetEventsQuery()

  const fetchEvents = async () => {
    const formattedDate = formatDate(date)
    const response = await getEvetns({ date: formattedDate })
    console.log(response?.data?.status)
    if (response?.data?.status) {
      setEvents(response?.data)
    }
  }

  useEffect(() => {
    fetchEvents()
  },[date])


  return (
    <>
      {isLoading && <Loader />}
      <div className="col-xxl-4">
        <div className="card">
          <div className="card-header border-0">
            <h4 className="card-title mb-0">Upcoming Reminders</h4>
          </div>
          {/* <!--  end cardheader --> */}
          <div className="card-body pt-0">
            <div className="upcoming-scheduled">
              <Flatpickr
                options={{
                  mode: "single",
                  inline: true,
                  minDate: new Date(),
                  defaultDate: date,
                  onChange: (dateStr) => handleDateChange(dateStr),
                }}
                className="form-control bg-light border-light"
              />

              {/* <input type="text" className="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-deafult-date="today" data-inline-date="true"/> */}
            </div>
            <h6 className="text-uppercase fw-semibold mt-4 mb-3 text-muted">
              Events:
            </h6>
            <SimpleBar
              className="h-[420px]"
              id="chat-conversation"
              data-simplebar
            >
              { events?.data?.events?.length > 0 &&
                events?.data?.events?.map((eve, ind) => (
                  <>
                    <div className="newsCard news-Slide-up">
                      <div className="flex justify-between">
                        <div key={ind} className="">
                          <h5
                            className="h5 text-capitalize text-muted truncate max-w-[180px]"
                            style={{ fontSize: "12px" }}
                          >
                            {eve?.title}
                          </h5>
                          <p className="text-xs text-muted px-2 truncate max-w-[180px]">
                            {eve?.comment}
                          </p>
                        </div>
                        <div className="flex gap-1 items-start">
                          <i
                            className="mdi mdi-calendar-clock-outline m-0 p-0"
                            style={{ verticalAlign: "top" }}
                          ></i>
                          <p
                            className="text-xs text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {eve?.date}
                          </p>
                        </div>
                      </div>
                      <div className="newsCaption">
                        <h2 className="newsCaption-title text-secondary ">
                          <p>
                            {eve?.type == "comment"
                              ? "Enquiry Details"
                              : "Customer Details"}
                          </p>
                        </h2>
                        <p className="newsCaption-content">
                          {eve?.type == "comment"
                            ? eve?.enq?.name
                            : `${eve?.customer?.first_name} ${eve?.customer?.last_name}`}
                        </p>
                        <p className="text-muted">
                          {eve?.type == "comment"
                            ? eve?.enq?.email
                            : `${eve?.customer?.email}`}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              {events?.data?.events?.length == 0 && <p className="text-lg text-muted text-center p-2">No Events Found</p>}
            </SimpleBar>
          </div>
          {/* <!--  end cardbody --> */}
        </div>
        {/* <!--  end card --> */}
      </div>
    </>
  );
}
