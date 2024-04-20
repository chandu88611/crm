/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import { useCreateIpMutation } from "../../../../services/api";
import Loader from "../../Loader";
import Swal from "sweetalert2";

import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};

function EditIp({ ipDetails, show, onHide }) {
  const validationSchema = yup.object().shape({
    ipAddress: yup
      .string()
      .required("IP Address is required")
      .matches(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        "Invalid IP Address"
      ),
    ipName: yup.string().required("IP Name is required"),
    ipLocation: yup.string().required("IP Location is required"),
    validity1: yup
      .array("Validity is required")
      .of(yup.string("Validity is required"))
      .required("Validity is required"),
  });

  const {
    register,
    setValue,
    trigger,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema), // Integrate Yup with React Hook Form
  });

  const fetchIpLocation = async () => {
    fetch(
      `https://api.geoapify.com/v1/ipinfo?ip=${ipAddress}&apiKey=ec2e3f89e6d84d45a6ad3d6556398bbf`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setValue("ipLocation", result.city.name);
        trigger("ipLocation");
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setValue("ipAddress", ipDetails?.address);
    setValue("ipLocation", ipDetails?.location);
    setValue("ipName", ipDetails?.name);
    setValue("validity1", [ipDetails?.valid_from, ipDetails?.valid_to]);
    setDateRange([ipDetails?.valid_from, ipDetails?.valid_to]);
  }, [ipDetails]);

  const ipAddress = watch("ipAddress");
  useEffect(() => {
    setValue("ipAddress", ipAddress?.replace(/[^0-9.]/g, ""));
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipRegex.test(ipAddress)) {
      console.log(ipAddress);
      fetchIpLocation();
    }
  }, [ipAddress]);

  const [dateRange, setDateRange] = useState([]);

  const [addIp, { isLoading: ipLoading }] = useCreateIpMutation();

  const onSubmit = async (data) => {
    const response = await addIp({
      ipAddress: data.ipAddress,
      ipName: data?.ipName,
      ipLocation: data?.ipLocation,
      validFrom: dateRange[0],
      validTo: dateRange[1],
      type: "office",
      id:ipDetails?.id
    });
    if (response?.data?.status) {
      onHide();
      Swal.fire({
        title: "success",
        text: response.data.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          onHide();
        }
      });
    } else {
      console.log(response);
      onHide();
      Swal.fire({
        title: "error",
        text: response?.error?.data?.message,
        icon: "error",
      });
    }
  };

  
  const handleDateChange = (selectedDates) => {
    if (selectedDates.length === 2) {
 
      const formattedDates = selectedDates.map((date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");  
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      });
      console.log(formattedDates);
      setDateRange(formattedDates);
      setValue("validity1", formattedDates);  
      trigger("validity1");  
    }
  };

  return (
    <>
      {ipLoading && <Loader />}
      <Modal open={show} onClose={onHide} centered size="lg">
        <Box sx={style}>
          <h5 className="modal-title h5" id="">
            Edit IP
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {" "}
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="ipAddress" className="form-label">
                    IP Address
                  </label>
                  <input
                    type="text"
   
                    id="ipAddress"
                    {...register("ipAddress")}
                    className="form-control"
                    placeholder="Eg :- 127.0.0.1"
                  />
                  <p className="text-danger">{errors.ipAddress?.message}</p>{" "}
                  {/* Display validation error message */}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="ipName" className="form-label">
                    IP Name
                  </label>
                  <input
                    type="text"
                    id="ipName"
                    {...register("ipName")}
                    className="form-control"
                    placeholder="Enter IP Name"
                  />
                  <p className="text-danger">{errors.ipName?.message}</p>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="ipLocation" className="form-label">
                    IP Location
                  </label>
                  <input
                    type="text"
                    id="ipLocation"
                    {...register("ipLocation")}
                    className="form-control"
                    placeholder="Enter IP Location"
                  />
                  <p className="text-danger">{errors.ipLocation?.message}</p>
                </div>
              </div>
              <div className="col-xl-4 mt-3">
                <div className=" ">
                  <label htmlFor="validity1" className="form-label">
                    Validity (From and To)
                  </label>

                  <Flatpickr
                    type="text"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                      defaultDate: [ipDetails?.valid_from, ipDetails?.valid_to],
                      onChange: handleDateChange,
                      disable: [
                        function (date) {
                          return (
                            dateRange.length === 1 &&
                            date.getTime() === dateRange[0].getTime()
                          );
                        },
                      ],
                      minDate: "today", // Handle date change
                    }}
                    id="validity1"
                    placeholder="Select IP validity Range"
                    className="form-control flatpickr-input !relative "
                  />

                  <p className="text-danger">{errors?.validity1?.message}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer flex gap-4 ">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => onHide()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary bg-[#687cfe]">
                <i className="mdi mdi-content-save" /> Update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default EditIp;
