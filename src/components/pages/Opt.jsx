/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import "../../App.css";
import OtpInput from "react-otp-input";
import axios from "axios"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../reducers/loader";
import Loader from "./Loader";
import { errorRedirect } from "./swAlert";




export default function OTPVerification() {
  const params = useParams()
  const [otpError, setotpError] = useState("");
  const [otp, setOtp] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [successMEssage, setSuccessMessage] = useState("");
    const [verifyHash, setVerifyHash] = useState(true);

  const [apiErr, setApiErr] = useState();

  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
  const navigate = useNavigate();
  const location = useLocation();

    function otpValidation(otp) {
      if (otp === "") {
        setotpError("Otp is required");
      } else {
        setotpError("");
      }
    }

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
  
    useEffect(() => {
      const verifyHash = async () => {
        try {
          dispatch(showLoader());
          const response = await axios.post(
            "https://skycontroller.connetz.shop/tl-api/verify/hash",
            {
              hash: params?.id,
            }
          );
          console.log("response", response);
          // setVerifiedHash(true)
        } catch (err) {
          console.log("err", err);
          dispatch(hideLoader());
          setVerifyHash(false);
          // errorRedirect(err?.response?.data?.message)
          // window.location.href="/signin"
          // navigate("/expired");
          // setVerifiedHash(false)
        }
        dispatch(hideLoader());
      };
      verifyHash();
    }, []);
  
  useEffect(() => {
    if (otpError != "") {
      setTimeout(() => {
        setotpError("");
      }, 2500);
    }
    if (apiErr != "") {
      setTimeout(() => {
        setApiErr("");
      }, 2500);
    }
  }, [otpError, apiErr]);

  // const handleRequestAgain = () => {
    
  // }

    const handleSubmit = async (e) => {
      // Handle form submission here
      e.preventDefault()

      try {
        if (otp == "") {
          setotpError("Otp required");
          return;
        }
        dispatch(showLoader());
        const response = await axios.post(
          "https://skycontroller.connetz.shop/tl-api/verify/otp",
          { otp: otp, hash: params.id }
        );
        if (response?.data?.status) {
          localStorage.setItem("clt_token", response?.data?.token);
          window.location.href = `/reset-password/${params.id}`;
        }
      } catch (err) {
        setApiErr(err?.response?.data?.message);
      } finally {
        dispatch(hideLoader());
      }
    };
  return (
    <>
      {loaderState && <Loader />}
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
            <div className="row justify-content-center mt-[9rem]">
              <div className="col-md-8 col-lg-6 col-xl-4">
                <div className="card mt-4 fadeInDown">
                  {verifyHash && (
                    <div className="card-body p-4">
                      <div className="text-center mt-2 fadeIn second">
                        <h3 className="text-primary">Verify OTP</h3>
                        <p className="text-muted">
                          Your code was sent to you via email
                        </p>
                      </div>
                      <div className="p-2 fadeIn third">
                        <form onSubmit={handleSubmit}>
                          <div className=" w-full mx-auto ">
                            <OtpInput
                              value={otp}
                              onChange={setOtp}
                              numInputs={4}
                              inputType="tel"
                              shouldAutoFocus={true}
                              containerStyle={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                              inputStyle={{
                                padding: "10px",
                                margin: "10px",
                                width: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5",
                                marginRight: "15px",
                                border: "1px solid gray",
                                borderRadius: "8%",
                              }}
                              //   renderSeparator={<span>-</span>}
                              renderInput={(props) => <input {...props} />}
                            />
                            {otpError && (
                              <p className="text-[#fb3048] font-normal !text-center w-full !text-xs !px-3 flex items-center justify-center my-2 gap-1 capitalize">
                                <svg
                                  data-v-059cda41=""
                                  data-v-4b5d7b40=""
                                  viewBox="0 0 24 24"
                                  className="sc-icon sc-icon_16 sc-validation-message__icon w-4 h-4"
                                  style={{ fill: "#fb3048" }}
                                >
                                  <path d="M20.4 16 14.3 5.4a2.6 2.6 0 0 0-4.6 0L3.6 16c-1 1.8.3 4 2.3 4h12.2c2-.1 3.3-2.3 2.3-4zm-9.5-6.4c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1v2.9c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1V9.6zm1.1 7.8c-.6 0-1.2-.5-1.2-1.2S11.4 15 12 15s1.2.5 1.2 1.2-.6 1.2-1.2 1.2z"></path>
                                </svg>
                                {otpError}
                              </p>
                            )}
                          </div>
                          <button
                            className="btn btn-primary bg-primary w-100 mt-2"
                            type="submit"
                          >
                            Verify
                          </button>
                          {apiErr && (
                            <p className="text-[#fb3048] text-center my-2">
                              {apiErr}
                            </p>
                          )}
                          <p className="resend text-muted mb-0 mt-2">
                            Didn&apos;t receive code?{" "}
                            <a href="/forgot-password">Request again</a>
                          </p>
                        </form>
                      </div>
                    </div>
                  )}

                  {!verifyHash && (
                    <>
                      <div className="card-body p-4">
                        <div className="flex items-center justify-center">
                          <img src="/assets/images/Expired-Icon.png" className="w-[40%]"/>
                        </div>
                        <h4 className="h4 text-center text-muted">
                          This link has been expired
                        </h4>
                        <p className="text-center">
                          Please follow this link{" "}
                          <a
                            className="text-secondary cursor-pointer text-center"
                            href="/forgot-password"
                          >
                            forgot password
                          </a>{" "}
                          to generate new password reset link
                        </p>
                      </div>
                    </>
                  )}
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
