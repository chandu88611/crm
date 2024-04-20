import { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import Loader from "./Loader";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import { useGetUserInfoQuery, useUnlockScreenMutation } from "../../services/api";
import { successAlert } from "./swAlert";
import { Link } from "react-router-dom";

export default function LockScreen() {
  const loaderState = useSelector((state) => state?.loader?.value);
  const {
    data: userData,
    isLoading,
    error: userInfoFetchErr,
  } = useGetUserInfoQuery();
  const [apiErr, setApiErr] = useState("");
  const [togglePassword, settogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      Password: "",
    },
  });

    const [unlockUser, { isloading: unlockloading }] = useUnlockScreenMutation();


  useEffect(() => {
    if (userInfoFetchErr) {
      console.log(userInfoFetchErr);
    }
  }, [userInfoFetchErr]);

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
            value: 125,
          },
          opacity: {
            value: { min: 0.1, max: 1 },
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
            shape: {
              type: "circle",
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
        },
      });
    })();
  }, []);

  const onSubmit = async (data) => {
    clearErrors();
    const response = await unlockUser({ password: data.Password });
    console.log(response?.error?.data?.errors, response);
    if (response?.data?.status) {
 
      successAlert("Unlocked successfully");
      localStorage.removeItem("lockout")
      window.location.href = "/";
    } else {
      if (response?.error?.data?.errors) {
        console.log("indie");
        setApiErr(response?.error?.data?.errors?.password);
      } else {
        setApiErr(response?.error?.data?.message);
      }
    }
  };
  return (
    <>
      {isLoading || loaderState || unlockloading && <Loader />}
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
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a   className="d-inline-block auth-logo">
                      <img src="/assets/images/logo-m.webp" alt="" height="" />
                    </a>
                  </div>
                  {/* <!-- <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p> --> */}
                </div>
              </div>
            </div>
            {/* <!-- end row --> */}

            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5 col-xl-4">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary h5">Lock Screen</h5>
                      <p className="text-muted">
                        Enter your password to unlock the screen!
                      </p>
                    </div>
                    <div className="user-thumb text-center">
                      <img
                        src="/assets/images/users/default_proile_image.png"
                        className="mx-auto rounded-circle img-thumbnail avatar-lg"
                        alt="thumbnail"
                      />
                      <h5 className="font-size-15 h5 mt-3">
                        {userData?.data?.staff?.name}
                      </h5>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="position-relative auth-pass-inputgroup mb-1">
                          <input
                            type={togglePassword ? "text" : "password"}
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password-input"
                            name="Password"
                            {...register("Password", {
                              required: true,
                            })}
                            // maxLength={30}
                          />
                          {
                            <span className="error text-red-600">
                              {errors?.Password?.type == "required" &&
                                "Password is required"}
                              {errors?.Password?.type == "apierr" &&
                                errors?.Password?.message}
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
                        {apiErr && <p className="text-red-600">{apiErr}</p>}
                        <div className="mb-2 mt-4">
                          <button
                            className="btn btn-secondary bg-secondary w-100"
                            type="submit"
                            onClick={() => clearErrors()}
                          >
                            Unlock
                          </button>
                        </div>
                      </form>
                     <p className="text-primary"><Link to={'/signin'}>Not You? Return to Sign in</Link></p>
                    </div>
                  </div>
                  {/* <!-- end card body --> */}
                </div>
                {/* <!-- end card --> */}

                {/* <div className="mt-4 text-center">
                            <p className="mb-0">Not you ? return <a href="index.html" className="fw-semibold text-primary text-decoration-underline"> Signin </a> </p>
                        </div> */}
              </div>
            </div>
            {/* <!-- end row --> */}
          </div>
          {/* <!-- end container --> */}
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
