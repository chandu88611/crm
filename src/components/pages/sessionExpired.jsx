import { useEffect } from "react";
import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.0/+esm";

export default function SessionExpired() {
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
            value: 400,
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
            <div className="row">
              <div className="col-lg-12 top-20">
                <div className="text-center pt-4">
                  <div className="mx-auto flex justify-center">
                    {/* <img
                      src="/assets/images/sessionExpired.jpg"
                      alt=""
                      className="error-basic-img move-animation"
                    /> */}
                    <div className="hourglassBackground drop-shadow">
                      <div className="hourglassContainer">
                        <div className="hourglassCurves"></div>
                        <div className="hourglassCapTop"></div>
                        <div className="hourglassGlassTop"></div>
                        <div className="hourglassSand"></div>
                        <div className="hourglassSandStream"></div>
                        <div className="hourglassCapBottom"></div>
                        <div className="hourglassGlass"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-n4">
                    <h3 className="display-1 fw-medium text-4xl my-2 text-white">
                      Session Expired
                    </h3>
                    <p className="text-capitalize my-2 text-white">
                      {" "}
                      Your session has been expired, please login again
                    </p>
                    <a href="/signin" className="btn btn-secondary">
                      <i className="mdi mdi-home me-1"></i>Login
                    </a>
                  </div>
                </div>
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
