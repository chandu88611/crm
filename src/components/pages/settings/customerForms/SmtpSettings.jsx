/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUpdateSmtpMutation } from "../../../../services/api";
import swAlert, { successAlert } from "../../swAlert";
import Loader from "../../Loader";

export default function SmtpSettings({ smtpInfo, isLoading }) {
  const [apiErr, setApiErr] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: customerInfo,
    mode: "all",
  });

  const [updateSmtp, {data:smtpUpdateResp, isLoading:smtpLoading}] = useUpdateSmtpMutation()


  useEffect(() => {
    const values = {
      id: smtpInfo?.data?.smtp?.id ? smtpInfo?.data?.smtp?.id : "",
      tl_id: smtpInfo?.data?.smtp?.tl_id ? smtpInfo?.data?.smtp?.tl_id : "",
      host: smtpInfo?.data?.smtp?.host
        ? smtpInfo?.data?.smtp?.host
        : `smtp.gmail.com`,
      port: smtpInfo?.data?.smtp?.port
        ? smtpInfo?.data?.smtp?.port
        : `smtp.gmail.com`,
      username: smtpInfo?.data?.smtp?.username
        ? smtpInfo?.data?.smtp?.username
        : "",
      password: smtpInfo?.data?.smtp?.password
        ? smtpInfo?.data?.smtp?.password
        : "",
      smtpmethod: smtpInfo?.data?.smtp?.smtpmethod
        ? smtpInfo?.data?.smtp?.smtpmethod
        : "tls",
      from_email: smtpInfo?.data?.smtp?.from_email
        ? smtpInfo?.data?.smtp?.from_email
        : "",
      from_name: smtpInfo?.data?.smtp?.from_name
        ? smtpInfo?.data?.smtp?.from_name
        : "",
      reply_email: smtpInfo?.data?.smtp?.reply_email
        ? smtpInfo?.data?.smtp?.reply_email
        : "",
      reply_name: smtpInfo?.data?.smtp?.reply_name
        ? smtpInfo?.data?.smtp?.reply_name
        : "",
    };
    setCustomerInfo(values);
    reset(values);
  }, [smtpInfo]);

  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
      }, 2000);
    }
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg("");
        // handleClose();
        // addEnq.current.click();
      }, 2000);
    }
  }, [apiErr, successMsg]);

  const onSubmit = async (data) => {
    // Handle form submission here
    // console.log(addEnq.current.click())
    clearErrors();
    console.log(data,"ddddd")
    try {
      const response = await updateSmtp(data);
      console?.log(response, response?.data?.message);
      if (response?.data?.status) {
        // setSuccessMsg(response?.data?.message);
        successAlert(response?.data?.message);
        localStorage.removeItem("editEnq");
        return;
      }
      if (response?.error?.data?.errors != {}) {

        setError("host", {
          type: "apierr",
          message: response?.error.data?.errors?.host,
        });
        setError("port", {
          type: "apierr",
          message: response?.error.data?.errors?.port,
        });
        setError("username", {
          type: "apierr",
          message: response?.error.data?.errors?.username,
        });
        setError("password", {
          type: "apierr",
          message: response?.error.data?.errors?.password,
        });
        setError("smtpmethod", {
          type: "apierr",
          message: response?.error.data?.errors?.smtpmethod,
        });
        setError("from_email", {
          type: "apierr",
          message: response?.error.data?.errors?.from_email,
        });
        setError("from_name", {
          type: "apierr",
          message: response?.error.data?.errors?.from_name,
        });
        setError("reply_email", {
          type: "apierr",
          message: response?.error.data?.errors?.reply_email,
        });
        setError("reply_name", {
          type: "apierr",
          message: response?.error.data?.errors?.reply_name,
        });
      } else if (response?.error?.data?.message) {
        setApiErr(response?.error?.data?.message);
      }
    } catch (err) {
      console.log(err, "err");
      if (err?.error?.data?.errors != {}) {

        setError("host", {
          type: "apierr",
          message: err?.error.data?.errors?.host,
        });
        setError("port", {
          type: "apierr",
          message: err?.error.data?.errors?.port,
        });
        setError("username", {
          type: "apierr",
          message: err?.error.data?.errors?.username,
        });
        setError("password", {
          type: "apierr",
          message: err?.error.data?.errors?.password,
        });
        setError("smtpmethod", {
          type: "apierr",
          message: err?.error.data?.errors?.smtpmethod,
        });
        setError("from_email", {
          type: "apierr",
          message: err?.error.data?.errors?.from_email,
        });
        setError("from_name", {
          type: "apierr",
          message: err?.error.data?.errors?.from_name,
        });
        setError("reply_email", {
          type: "apierr",
          message: err?.error.data?.errors?.reply_email,
        });
        setError("reply_name", {
          type: "apierr",
          message: err?.error.data?.errors?.reply_name,
        });
      } else if (err?.error?.data?.message) {
        setApiErr(err?.error?.data?.message);
      } else {
        swAlert();
      }
    }
  };
  console.log(errors);
  return (
    <>
      {isLoading && <Loader />}
      {smtpLoading && <Loader />}
      <div className="card-header">
        <h5 className="h5"> SMTP Settings</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
          <input className="hidden" {...register("id")} />
          <div className="row">
            <div className="col-xxl-4 col-md-6">
              <label htmlFor="placeholderInput" className="form-label">
                Host <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control bg-slate-100"
                id=""
                placeholder="Host"
                {...register("host", {
                  required: true,
                  readOnly: true,
                  message: "host is required",
                  minLength: 2,
                  maxLength: 100,
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.host?.type == "required" && "Host is required"}
                  {errors?.host?.type == "apierr" && errors?.host?.message}
                  {errors?.host?.type == "minLength" && "Invalid host name"}
                  {errors?.host?.type == "maxLength" && "Invalid host name"}
                </span>
              }
            </div>
            <div className="col-xxl-4 col-md-6">
              <label htmlFor="placeholderInput" className="form-label">
                port<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control bg-slate-100"
                id=""
                placeholder="Port"
                readOnly
                {...register("port", {
                  required: true,
                  message: "Port is required",
                  minLength: 2,
                  maxLength: 100,
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.port?.type == "required" && "Port is required"}
                  {errors?.port?.type == "maxLength" && "Invalid port"}
                  {errors?.port?.type == "minLength" && "Invalid Port"}
                  {errors?.port?.type == "apierr" && errors?.port?.message}
                </span>
              }
            </div>
            <div className="col-xxl-4 col-md-6 ">
              <label htmlFor="placeholderInput" className="form-label">
                SMTP method<span className="text-danger "> *</span>
              </label>
              <input
                type="text"
                className="form-control bg-slate-100"
                id=""
                readOnly
                placeholder="SMTP method"
                {...register("smtpmethod", {
                  required: true,
                  readOnly: true,
                  message: "SMTP method is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.smtpmethod?.type == "required" &&
                    "SMTP method is required"}
                  {errors?.smtpmethod?.type == "apierr" &&
                    errors?.smtpmethod?.message}
                  {errors?.smtpmethod?.type == "minLength" &&
                    "Invalid SMTP method"}
                  {errors?.smtpmethod?.type == "maxLength" &&
                    "Invalid SMTP method"}
                </span>
              }
            </div>

            <div className="col-xxl-4 col-md-6 mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                User name<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                autoComplete="off"
                placeholder="Username"
                {...register("username", {
                  required: true,
                  message: "User name is required",
                  minLength: 3,
                  maxLength: 100,
                  autoComplete: "off",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.username?.type == "required" &&
                    "User name is required"}
                  {errors?.username?.type == "apierr" &&
                    errors?.username?.message}
                  {errors?.username?.type == "minLength" && "Invalid user name"}
                  {errors?.username?.type == "maxLength" && "Invalid user name"}
                </span>
              }
            </div>
            <div className="col-xxl-4 col-md-6 mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id=""
                autoComplete="off"
                placeholder="Password"
                {...register("password", {
                  required: false,
                  message: "Password is required",
                  autoComplete: "off",
                  minLength: 3,
                  maxLength: 100,
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.password?.type == "required" &&
                    "Password is required"}
                  {errors?.password?.type == "apierr" &&
                    errors?.password?.message}
                  {errors?.password?.type == "minLength" && "Invalid password"}
                  {errors?.password?.type == "maxLength" && "Invalid password"}
                </span>
              }
            </div>

            <div className="col-xxl-4 col-md-6 mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                From email<span className="text-danger "> *</span>
              </label>
              <input
                type="email"
                className="form-control"
                id=""
                placeholder="From email"
                {...register("from_email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                  message: "From email is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.from_email?.type == "required" &&
                    "From email is required"}
                  {errors?.email?.type == "pattern" && "Invalid from email"}
                  {errors?.from_email?.type == "apierr" &&
                    errors?.from_email?.message}
                </span>
              }
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <label htmlFor="pinInput" className="form-label">
                From name <span className="text-danger"> *</span>{" "}
              </label>
              <div className="form-icon right">
                <input
                  type="text"
                  className="form-control"
                  placeholder="From name"
                  {...register("from_name", {
                    required: true,
                    message: "From name is required",
                    minLength: 3,
                    maxLength: 100,
                  })}
                />
                {
                  <span className="error text-red-600">
                    {errors?.from_name?.type == "required" &&
                      "From name is required"}
                    {errors?.from_name?.type == "apierr" &&
                      errors?.from_name?.message}
                    {errors?.from_name?.type == "minLength" &&
                      "Invalid from name"}
                    {errors?.from_name?.type == "maxLength" &&
                      "Invalid from name"}
                  </span>
                }
              </div>
            </div>
            <div className="col-xxl-4 col-md-6 mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Reply email<span className="text-danger "> *</span>
              </label>
              <input
                type="email"
                className="form-control "
                id=""
                placeholder="Reply email"
                {...register("reply_email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                  message: "Reply email is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.reply_email?.type == "required" &&
                    "Reply email is required"}
                  {errors?.email?.type == "pattern" && "Invalid reply email"}
                  {errors?.reply_email?.type == "apierr" &&
                    errors?.reply_email?.message}
                </span>
              }
            </div>

            <div className="col-12 col-lg-4 mt-3">
              <label htmlFor="pinInput" className="form-label">
                Reply name <span className="text-danger"> *</span>{" "}
              </label>
              <div className="form-icon right">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reply name"
                  {...register("reply_name", {
                    required: true,
                    message: "Reply name is required",
                    minLength: 3,
                    maxLength: 100,
                  })}
                />
                {
                  <span className="error text-red-600">
                    {errors?.reply_name?.type == "required" &&
                      "Reply name is required"}
                    {errors?.reply_name?.type == "apierr" &&
                      errors?.reply_name?.message}
                    {errors?.reply_name?.type == "minLength" &&
                      "Invalid reply name"}
                    {errors?.reply_name?.type == "maxLength" &&
                      "Invalid reply name"}
                  </span>
                }
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="">
              <p className="text-danger text-center">{apiErr}</p>
              <p className="text-success text-center">{successMsg}</p>
            </div>

            <div className="hstack gap-2 mt-2 justify-content-end">
              <div className="text-end">
                {!isLoading && (
                  <button
                    type="submit"
                    className="btn btn-primary bg-primary"
                    id="sa-success"
                    onClick={() => clearErrors()}
                    // onClick={() => handleSubmit(onSubmit())}
                  >
                    Save
                  </button>
                )}
                {isLoading && (
                  <button
                    disabled
                    type="button"
                    className="btn btn-outline-primary btn-load"
                  >
                    <span className="d-flex align-items-center">
                      <span className="flex-grow-1 me-2">Please Wait...</span>
                      <span
                        className="spinner-border flex-shrink-0"
                        role="status"
                      >
                        <span className="visually-hidden">Please Wait...</span>
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
