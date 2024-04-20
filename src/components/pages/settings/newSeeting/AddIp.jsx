import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Flatpickr from "react-flatpickr";
import { useCreateIpMutation } from '../../../../services/api';
import Loader from '../../Loader';
import Swal from "sweetalert2";

function AddIp() {
  // Define Yup schema for validation
  const validationSchema = yup.object().shape({
    ipAddress: yup
      .string()

      .required("IP Address is required")
      .matches(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        "Invalid IP Address"
      ),
    ipName: yup.string().required("IP Name is required").test('no-space', 'Enter Valid name', value => {
 
      return value.trim().length > 0;  
    }),
    ipLocation: yup.string().required("IP Location is required").test('no-space', 'Enter Valid location', value => {
 
      return value.trim().length > 0;  
    }),
    validity: yup
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
      {method: "GET"}
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setValue("ipLocation", result.city.name);
        trigger("ipLocation")
      })
      .catch((error) => console.log("error", error));

  }

  const ipAddress = watch("ipAddress")
  useEffect(() => {
    setValue("ipAddress", ipAddress?.replace(/[^0-9.]/g, ""));
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipRegex.test(ipAddress)) {
      console.log(ipAddress)
      fetchIpLocation()
    }
  },[ipAddress])
  
  const [dateRange, setDateRange] = useState([]);

  const [addIp, {isLoading:ipLoading}] = useCreateIpMutation()

  const onSubmit = async(data) => {
    const response = await addIp({
      ipAddress: data.ipAddress,
      ipName: data?.ipName,
      ipLocation: data?.ipLocation,
      validFrom: dateRange[0],
      validTo: dateRange[1],
      type:"office"
    });
    if (response?.data?.status) {
      Swal.fire({
        title: "success",
        text: response.data.message,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      console.log(response)
      Swal.fire({
        title: "error",
        text: response?.error?.data?.message,
        icon: "error",
      });
    }
  };

  // State to manage the date range
  

  // Handler for Flatpickr's onChange event
const handleDateChange = (selectedDates) => {
  if (selectedDates.length === 2) {
    // Format each date in the array to 'yyyy-mm-dd'
    const formattedDates = selectedDates.map((date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });
    console.log(formattedDates)
    setDateRange(formattedDates);
    setValue("validity", formattedDates); // Update the form value with formatted dates
    trigger("validity"); // Trigger re-validation for the 'validity' field
  } else {
    // If not exactly two dates are selected, clear the value and error message
    setDateRange([]);
    setValue("validity",); // Clear the value
    // Optionally, you can also clear the error message for 'validity' here
  }
};

  return (
    <>
      {ipLoading && <Loader/>}
      <div
        id="myModal"
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-bottom pb-3">
              <h5 className="modal-title h5" id="">
                Add New IP
              </h5>
            
            </div>
            <div className="modal-body">
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
                        {...register("ipAddress")} // Register input with React Hook Form
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
                      <p className="text-danger">
                        {errors.ipLocation?.message}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 mt-3">
                    <div className="form-group">
                      <label htmlFor="validity" className="form-label">
                        Validity (From and To)
                      </label>
                      <Flatpickr
                        type="text"
                        options={{
                          mode: "range",
                          dateFormat: "Y-m-d",
                          onChange: handleDateChange,
                          disable: [
                            function (date) {
                              // Disable the second date if it's the same as the first date selected
                              return (
                                dateRange.length === 1 &&
                                date.getTime() === dateRange[0].getTime()
                              );
                            },
                          ],
                          minDate: "today", // Handle date change
                        }}
                        id="validity"
                        placeholder="Select IP validity Range"
                        className="form-control flatpickr-input"
                        data-provider="flatpickr"
                        data-date-format="d M, Y"
                        data-range-date="true"
                      />
                      <p className="text-danger">{errors.validity?.message}</p>
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
                  <button
                    type="submit"
                    className="btn btn-primary bg-[#687cfe] ml-4"
                  >
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
    </>
  );
}

export default AddIp;
