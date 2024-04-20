/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../reducers/loader";
import "../../App.css"
import axios from "axios"
import Loader from "./Loader";
import { successAlert } from "./swAlert";
import TableLoader from "./TableLoader";

//

/* eslint-disable react/no-unknown-property */
export default function ForgotPassword() {

    const dispatch = useDispatch();
   const loaderState = useSelector((state) => state.loader?.value);

  const [successMsg, setsuccesMsg] = useState("")
  const [apiErr, setApiErr] = useState("")
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

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

  const onSubmit = async(data) => {
    // Handle form submission here
    console.log(data);
    try {
      dispatch(showLoader());
      const response = await axios.post(
        "https://skycontroller.connetz.shop/tl-api/reset-password-link",
        { email: data?.Email }
      );
      if (response?.data?.status) {
        console.log(response?.data);
        successAlert(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error?.length) {
        setError("Email", {
          type: "apierr",
          message: err?.response.data?.errors?.email,
        });
      } else {
        setApiErr(err?.response?.data?.message);
      }
    } finally {
      dispatch(hideLoader());
    }

    
  };

    useEffect(() => {
      setTimeout(() => {
        if (apiErr != "") {
          setApiErr("");
        }
      }, 1500);
    }, [apiErr]);

  return (
    <>
      {loaderState && <TableLoader />}
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
              <div className="col-md-8 col-lg-6 col-xl-5">
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
                      <h5 className="text-primary h5">Forgot Password?</h5>
                      <p className="text-muted">Reset your password</p>
                      <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        colors="primary:#0ab39c"
                      ></lord-icon>
                    </div>
                    <div
                      className="alert alert-borderless alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </div>
                    <div className="p-2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3 fadeIn second">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="Email"
                            placeholder="Enter email"
                            {...register("Email", {
                              required: true,
                              pattern:
                                /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                              message: "Invalid email format",
                            })}
                          />
                          {
                            <span className="error text-red-600">
                              {errors?.Email?.type == "required" &&
                                "Email is required"}
                              {errors?.Email?.type == "pattern" &&
                                "Invalid email"}
                            </span>
                          }
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary bg-primary w-100"
                            type="submit"
                          >
                            Send Reset Link
                          </button>
                        </div>
                        {successMsg && (
                          <p className="text-success text-center mt-2">
                            {successMsg}
                          </p>
                        )}
                        {apiErr && (
                          <p className="text-danger text-center mt-2">
                            {apiErr}
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...{" "}
                    <a
                      href="/signin"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Click here{" "}
                    </a>{" "}
                  </p>
                </div>
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
