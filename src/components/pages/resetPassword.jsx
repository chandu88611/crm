import { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { successRedirect } from "./swAlert";
//

/* eslint-disable react/no-unknown-property */
export default function ResetPassword() {
  const params = useParams()
  const [apiErr, setApiErr] = useState("");
    const [toggleConfirmPassword, settoggleConfirmPassword] = useState(false);
    const [togglePassword, settogglePassword] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
      }, 2000);
    }
  }, [apiErr]);

  useEffect(() => {
    (async () => {
      await loadAll(tsParticles);

      await tsParticles.addPreset("lightdark", {
        fullScreen: {
          enable: false,
        },
        particles: {
          move: {
            enable: true,
          },
          number: {
            value: 150,
          },
          opacity: {
            value: { min: 1, max: 1 },
          },

          size: {
            value: { min: 1, max: 5 },
          },
          speed: {
            value: { min: 1, max: 5 },
          },
        },
      });

      await tsParticles.load({
        id: "light",
        options: {
          preset: "lightdark",
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              enable: true,
            },

            move: {
              enable: true,
              speed: 1,
              direction: "random",
              random: true,
              straight: false,
              out_mode: "out",
              attract: {
                enable: false,
                rotateX: 1600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "grab",
              },
              resize: false,
            },
            modes: {
              grab: {
                distance: 200,
                opacity: 0.1,
                color: "random",
              },
            },
          },
        },
      });
    })();
  }, []);

  const onSubmit = async (data) => {
    // Handle form submission here
    clearErrors()
    console.log(data);
    try {
      
      const response = await axios.post(
        "https://skycontroller.connetz.shop/tl-api/reset/password",
        {
          password: data.Password,
          confirm_password: data.ConfirmPassword,
          hash: params?.id,
        }
      );
      if (response?.data?.status) {
        successRedirect(response?.data?.message);
      }
    } catch (err) {
      if (err?.response?.data?.errors) {
        console.log("inside", err.response.data);
         setError("ConfirmPassword", {
           type: "validate",
           message: err.response.data?.errors?.confirm_password,
         });
        setError("Password", {
          type: "apierr",
          message: err.response.data?.errors?.password,
        });
        // err?.response?.data?.errors?.confirm_password[0]
      }
      setApiErr(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="auth-page-wrapper pt-5">
        {/* <!--  auth page bg --> */}
        <div className="auth-one-bg-position auth-one-bg">
          <div
            id="light"
            className="fixed top-0 h-[450px] w-full !overflow-hidden "
            style={{ zIndex: 1, mixBlendMode: "overlay" }}
          ></div>
          <div className="bg-overlay"></div>
          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
            </svg>
          </div>
        </div>
        {/* <!--  auth page content --> */}
        <div className="auth-page-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5 mt-[9rem]">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a href="/" className="d-inline-block auth-logo">
                      <img src="/assets/images/logo-m.webp" alt="" height="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--  end row --> */}
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4 fadeInDown">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary h5">Reset Password</h5>
                      {/* <p className="text-muted">Sign in to continue to CCP.</p> */}
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3 fadeIn third">
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            New Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type={togglePassword ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              name="Password"
                              {...register("Password", {
                                required: true,
                                message: "Password is required",
                                maxLength: 16,
                                minLength: 8,
                              })}
                              maxLength={16}
                            />
                            {
                              <span className="error text-red-600">
                                {errors?.Password?.type == "required" &&
                                  "Password is required"}
                                {errors?.Password?.type == "apierr" &&
                                  errors?.Password?.message}
                                {errors?.Password?.type == "maxLength" &&
                                  "Password should be within 16 characters"}
                                {errors?.Password?.type == "minLength" &&
                                  "Password should have atleast 8 characters"}
                              </span>
                            }
                            <button
                              onClick={() => settogglePassword(!togglePassword)}
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i
                                className={`${
                                  togglePassword
                                    ? "ri-eye-off-fill"
                                    : "ri-eye-fill"
                                }  align-middle`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        <div className="mb-3 fadeIn third">
                          <label
                            className="form-label"
                            htmlFor="cpassword-input"
                          >
                            Confirm New Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type={toggleConfirmPassword ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Re Enter password"
                              id="password-input"
                              name="ConfirmPassword"
                              {...register("ConfirmPassword", {
                                required: true,
                                message: "Confirm Password is required",
                                maxLength: 16,
                                minLength: 8,
                              })}
                              maxLength={16}
                            />
                            {
                              <span className="error text-red-600">
                                {errors?.ConfirmPassword?.type == "required" &&
                                  "Confirm Password is required"}
                                {errors?.ConfirmPassword?.type == "apierr" &&
                                  errors?.ConfirmPassword?.message}
                                {/* {errors?.ConfirmPassword?.type == "maxLength" &&
                                  "Confirm Password should be within 16 characters"}
                                {errors?.ConfirmPassword?.type == "minLength" &&
                                  "Confirm Password should have atleast 8 characters"} */}
                                {errors?.ConfirmPassword?.type == "validate" &&
                                  errors?.ConfirmPassword?.message}
                              </span>
                            }
                            <button
                              onClick={() =>
                                settoggleConfirmPassword(!toggleConfirmPassword)
                              }
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i
                                className={`${
                                  toggleConfirmPassword
                                    ? "ri-eye-off-fill"
                                    : "ri-eye-fill"
                                }  align-middle`}
                              ></i>
                            </button>
                          </div>
                        </div>

                        {apiErr && <p className="text-red-600">{apiErr}</p>}
                        <div className="mt-4 fadeIn fourth">
                          <button
                            className="btn btn-primary w-100 bg-[#687cfe]"
                            type="submit"
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!--  end card body --> */}
                </div>
                {/* <!--  end card --> */}
              </div>
            </div>
            {/* <!--  end row --> */}
          </div>
          {/* <!--  end container --> */}
        </div>
        {/* <!--  end auth page content --> */}

        {/* <!--  footer --> */}
        <footer className="footer w-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                {new Date().getFullYear()} © All Rights Reserved.
              </div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Designed and Developed by Call Center Projects
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!--  end Footer --> */}
      </div>
    </>
  );
}
