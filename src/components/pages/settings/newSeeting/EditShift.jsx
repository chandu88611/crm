/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddShiftMutation } from "../../../../services/api";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap"

function EditShift({ shiftDetails, show, onHide }) {
  console.log(shiftDetails)
  // Define Yup schema for validation
  const validationSchema = yup.object().shape({
    shiftName: yup.string().required("Shift Name is required"),
    startTime: yup.string().required("Start Time is required"),
    endTime: yup
      .string()
      .required("End Time is required")
      // .test(
      //     "time-range",
      //     "Time range must be within 6-8 hours",
      //     function (value) {
      //       const { startTime, endTime } = this.parent;
            
      //       // Parse start time
      //       const [startHour, startMinute, startPeriod] = startTime.split(":").map((item) => parseInt(item));
      //       // Parse end time
      //       const [endHour, endMinute, endPeriod] = endTime.split(":").map((item) => parseInt(item));
    
      //       // Convert start and end times to 24-hour format
      //       const startHour24 = (startPeriod === "PM" && startHour !== 12) ? startHour + 12 : (startPeriod === "AM" && startHour === 12) ? 0 : startHour;
      //       const endHour24 = (endPeriod === "PM" && endHour !== 12) ? endHour + 12 : (endPeriod === "AM" && endHour === 12) ? 0 : endHour;
    
      //       // Calculate total minutes for start and end times
      //       const startTotalMinutes = startHour24 * 60 + startMinute;
      //       const endTotalMinutes = endHour24 * 60 + endMinute;
    
      //       // Calculate difference in minutes
      //       let diffInMinutes = endTotalMinutes - startTotalMinutes;
      //       if (diffInMinutes < 0) {
      //         // If endTime is before startTime, adjust for wrapping around to the next day
      //         diffInMinutes += 24 * 60;
      //       }
    
      //       // Check if the difference is between 6 and 8 hours
      //       return diffInMinutes >= 6 * 60 && diffInMinutes <= 8 * 60;
      //     }
      //   ),
      
  });

    useEffect(() => {
      setValue("shiftName", shiftDetails?.name);
      setValue("startTime", shiftDetails?.start?.split(":00")[0]);
      setValue("endTime", shiftDetails?.end?.split(":00")[0]);
    }, [shiftDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      shift_id: shiftDetails?.id,
     
    });

    if (res?.data?.status) {
      Swal.fire({
        title: "success",
        text: res.data.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          onHide();
        }
      });
    } else {
      console.log(res);
      Swal.fire({
        title: "error",
        text: res.data.errors?.message,
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      id="shiftsEdit"
      className="modal fade"
      tabIndex={-1}
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <Modal.Header className="modal-header border-bottom pb-3" closeButton>
        <h5 className="modal-title" id="">
          Edit Office Hours
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => onHide()}
          aria-label="Close"
        >
          {" "}
        </button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-xl-4">
              <div className="">
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
              <div className="">
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime12"
                  {...register("startTime")}
                  className="form-control     cursor-pointer"
                  data-provider="timepickr"
                  placeholder="Select Start Time"
                  data-time-basic="true"
                  onClick={() =>
                    document.getElementById("startTime12").showPicker()
                  }
                />
                <p className="text-danger">{errors.startTime?.message}</p>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="">
                <label htmlFor="endTime" className="form-label">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime12"
                  {...register("endTime")}
                  className="form-control      cursor-pointer"
                  data-provider="timepickr"
                  placeholder="Select End Time"
                  data-time-basic="true"
                  onClick={() =>
                    document.getElementById("endTime12").showPicker()
                  }
                />
                <p className="text-danger">{errors.endTime?.message}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => onHide()}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary bg-[#687cfe] ml-4">
              <i className="mdi mdi-content-save" /> Save
            </button>
          </div>
        </form>
      </Modal.Body>

      {/* /.modal-dialog */}
    </Modal>
  );
}

export default EditShift;
