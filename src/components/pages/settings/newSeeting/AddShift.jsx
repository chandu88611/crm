import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddShiftMutation } from "../../../../services/api";
import Swal from "sweetalert2";

function AddShift() {
  // Define Yup schema for validation
  const validationSchema = yup.object().shape({
    shiftName: yup.string().required("Shift Name is required").matches(/^[a-zA-Z ]+$/, 'Shift name must contain only Alphabets').test('no-space', 'Enter Valid Designation', value => {
 
      return value.trim().length > 0;  
    }),
    startTime: yup.string().required("Start Time is required"),
    endTime: yup
      .string()
      .required("End Time is required")
      // .test(
      //   "time-range",
      //   "Time range must be within 6-8 hours",
      //   function (value) {
      //     const { startTime, endTime } = this.parent;
          
      //     // Parse start time
      //     const [startHour, startMinute, startPeriod] = startTime.split(":").map((item) => parseInt(item));
      //     // Parse end time
      //     const [endHour, endMinute, endPeriod] = endTime.split(":").map((item) => parseInt(item));
  
      //     // Convert start and end times to 24-hour format
      //     const startHour24 = (startPeriod === "PM" && startHour !== 12) ? startHour + 12 : (startPeriod === "AM" && startHour === 12) ? 0 : startHour;
      //     const endHour24 = (endPeriod === "PM" && endHour !== 12) ? endHour + 12 : (endPeriod === "AM" && endHour === 12) ? 0 : endHour;
  
      //     // Calculate total minutes for start and end times
      //     const startTotalMinutes = startHour24 * 60 + startMinute;
      //     const endTotalMinutes = endHour24 * 60 + endMinute;
  
      //     // Calculate difference in minutes
      //     let diffInMinutes = endTotalMinutes - startTotalMinutes;
      //     if (diffInMinutes < 0) {
      //       // If endTime is before startTime, adjust for wrapping around to the next day
      //       diffInMinutes += 24 * 60;
      //     }
  
      //     // Check if the difference is between 6 and 8 hours
      //     return diffInMinutes >= 6 * 60 && diffInMinutes <= 8 * 60;
      //   }
      // ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [addShift] = useAddShiftMutation();
  const onSubmit = async (data) => {
    const res = await addShift({
      endTime: data.endTime + ":00",
      shiftName: data.shiftName,
      startTime: data.startTime + ":00",
      shift_id: null
    });

    if (res?.data?.status) {
      Swal.fire({
        title: "success",
        text: res.data.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      console.log(res)
      Swal.fire({
        title: "error",
        text: res.data.errors?.message,
        icon: "error",
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.reload()
        }
      })
    }
  };

  return (
    <div
      id="shifts"
      className="modal fade"
      tabIndex={-1}
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-bottom pb-3">
            <h5 className="modal-title" id="">
              Add Office Hours
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {" "}
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-xl-4">
                  <div className="form-group">
                    <label htmlFor="shiftName" className="form-label">
                      Shift Name
                    </label>
                    <input
                      type="text"
                      id="shiftName"
                      {...register("shiftName")} // Register input with React Hook Form
                      className="form-control"
                      placeholder="Enter Shift Name"
                    />
                    <p className="text-danger">{errors.shiftName?.message}</p>{" "}
                    {/* Display validation error message */}
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="form-group">
                    <label htmlFor="startTime" className="form-label">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime23"
                      {...register("startTime")}
                      className="form-control flatpickr-input active cursor-pointer"
                      data-provider="timepickr"
                      placeholder="Select Start Time"
                      data-time-basic="true"
                      onClick={() =>
                        document.getElementById("startTime23").showPicker()
                      }
                    />
                    <p className="text-danger">{errors.startTime?.message}</p>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="form-group">
                    <label htmlFor="endTime" className="form-label">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime23"
                      {...register("endTime")}
                      className="form-control flatpickr-input active  cursor-pointer"
                      data-provider="timepickr"
                      placeholder="Select End Time"
                      data-time-basic="true"
                      onClick={() =>
                        document.getElementById("endTime23").showPicker()
                      }
                    />
                    <p className="text-danger">{errors.endTime?.message}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer mt-2">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary bg-[#687cfe] ml-4 ">
                  <i className="mdi mdi-content-save" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
}

export default AddShift;
