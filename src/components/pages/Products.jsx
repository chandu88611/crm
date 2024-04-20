import Header from "./Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../../components/assets/products.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";

export default function Products() {
  const [activeVirtualPlan, setActiveVirtualPlan] = useState("quarterly");
  const [activeTollPlan, setActiveTollPlan] = useState("quarterly");


  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content" id="virtual">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0"></h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Pricing</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row justify-content-center mt-4">
                <div className="col-lg-5">
                  <div className="text-center mb-4">
                    <h4 className="fw-semibold fs-22">Virtual Number Plan</h4>
                    <p className="text-muted mb-2 fs-15">
                      Choose your plan according to your business needs
                    </p>
                    <div className="d-inline-flex">
                      <ul
                        className="nav nav-pills arrow-navtabs plan-nav rounded align-items-center mb-0 p-1"
                        id="pills-tab"
                        role="tablist"
                      >
                        {/* <li className="nav-item" role="presentation">
                          <button
                            className="nav-link fw-semibold active"
                            id="month-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#month"
                            type="button"
                            role="tab"
                            aria-selected="true"
                          >
                            Monthly
                          </button>
                        </li> */}
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveVirtualPlan("quarterly")}
                            className={`nav-link fw-semibold ${
                              activeVirtualPlan == "quarterly" ? "active" : ""
                            }`}
                            id="quarter-tab"
                            type="button"
                          >
                            {" "}
                            <span className="badge bg-info">10% Off</span>
                            <br /> Quarterly{" "}
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveVirtualPlan("halfyearly")}
                            className={`nav-link fw-semibold ${
                              activeVirtualPlan == "halfyearly" ? "active" : ""
                            }`}
                            id="half-tab"
                            type="button"
                          >
                            {" "}
                            <span className="badge bg-warning">15% Off</span>
                            <br />
                            Half Yearly
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveVirtualPlan("yearly")}
                            className={`nav-link fw-semibold ${
                              activeVirtualPlan == "yearly" ? "active" : ""
                            }`}
                            id="annual-tab"
                            type="button"
                          >
                            {" "}
                            <span className="badge bg-success">25% Off</span>
                            <br />
                            Annually
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Swiper --> */}
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    dots={true}
                    speed={1500}
                    loop={true}
                    autoplay={true}
                    // navigation={true}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      720: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                      },
                      2048: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="swiper swiper-init nk-swiper nk-swiper-s4 pt-5 pt-lg-0"
                    data-autoplay="true"
                    data-space-between="30"
                  >
                    <SwiperSlide className="swiper-slide h-auto">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">START UP</h5>
                            </div>
                            <div className="">
                              {/* <h2
                                className={`month mb-0 h2 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                }`}
                              >
                                {sessionStorage.getItem("currency") != undefined
                                  ? JSON.parse(
                                      sessionStorage.getItem("currency")
                                    )?.data?.currencies[0]?.symbol
                                  : "₹"}
                                900{" "}
                                <small
                                  className={`fs-13 text-muted  ${
                                    activeVirtualPlan == "quarterly"
                                      ? ""
                                      : "d-none"
                                  }`}
                                >
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`quarter mb-0 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹2,500{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹2,700</del>
                                </small>
                              </h2>
                              <h2
                                className={`half mb-0 ${
                                  activeVirtualPlan == "halfyearly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹4,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹5,400</del>
                                </small>
                              </h2>
                              <h2
                                className={`annual mb-0 h2 ${
                                  activeVirtualPlan == "yearly" ? "" : "d-none"
                                }`}
                              >
                                ₹9,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹18,800</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1000</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>2</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10-digit</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹0.6</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹900
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-danger me-1">
                                  <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  5 Simultaneous Calls
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                VIRTUAL PLAN 1
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2
                                className={`month mb-0 h2 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                }`}
                              >
                                1,400{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`quarter mb-0 h2 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                }`}
                              >
                                {" "}
                                ₹3,500{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹4,200</del>
                                </small>
                              </h2>
                              <h2
                                className={`half mb-0 ${
                                  activeVirtualPlan == "halfyearly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹5,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹8,400</del>
                                </small>
                              </h2>
                              <h2
                                className={`annual mb-0 h2 ${
                                  activeVirtualPlan == "yearly" ? "" : "d-none"
                                }`}
                              >
                                ₹14,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹16,800</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1200</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>4</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10-digit</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹0.5</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹1400
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-danger me-1">
                                  <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  5 Simultaneous Calls
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                VIRTUAL PLAN 2
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2
                                className={`month mb-0 h2 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                }`}
                              >
                                ₹2100{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`quarter mb-0 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹4,500{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹2,700</del>
                                </small>
                              </h2>
                              <h2
                                className={`half mb-0 ${
                                  activeVirtualPlan == "halfyearly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹9,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹13,600</del>
                                </small>
                              </h2>
                              <h2
                                className={`annual mb-0 ${
                                  activeVirtualPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹21,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹25,200</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1300</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>6</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10-digit</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹0.4</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹2100
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-danger me-1">
                                  <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  5 Simultaneous Calls
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                VIRTUAL PLAN 3
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2
                                className={`month mb-0 h2 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                }`}
                              >
                                ₹2800{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`quarter mb-0 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹6,999{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹8,400</del>
                                </small>
                              </h2>
                              <h2
                                className={`half mb-0 ${
                                  activeVirtualPlan == "halfyearly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹14,499{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹16,800</del>
                                </small>
                              </h2>
                              <h2
                                className={`annual mb-0 ${
                                  activeVirtualPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹30,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹33,600</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1400</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>8</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10-digit</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹0.3</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹2800
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-danger me-1">
                                  <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  5 Simultaneous Calls
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold">
                                VIRTUAL PLAN 4
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2
                                className={`month mb-0 h2 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                }`}
                              >
                                ₹3500{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`quarter mb-0 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹8,500{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹10,500</del>
                                </small>
                              </h2>
                              <h2
                                className={`half mb-0 ${
                                  activeVirtualPlan == "halfyearly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹18,000{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹21,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`annual mb-0 ${
                                  activeVirtualPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹34,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹42,000</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>Unlimited</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10-digit</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>Unlimited</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹3500
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-danger me-1">
                                  <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  5 Simultaneous Calls
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                BUSINESS PLAN
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2 className={`month mb-0 h2 ${activeVirtualPlan == "quarterly" ? "" : "d-none"}`}>
                                ₹9000{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`quarter mb-0 ${
                                  activeVirtualPlan == "quarterly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹22,000{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹27,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`half mb-0 ${
                                  activeVirtualPlan == "halfyearly"
                                    ? ""
                                    : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹48,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹54,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`annual mb-0 ${
                                  activeVirtualPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹90,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹1,08,800</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>Unlimited</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>20</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10-digit</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>Unlimited</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1" id="toll-number">
                                  Monthly Rental ₹9000
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  5 Simultaneous Calls
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  {/* <div className="swiper-pagination swiper-pagination-dark"></div> */}
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-lg-5">
                  <div className="text-center mb-4">
                    <h4 className="fw-semibold fs-22 h4">Toll Number Plan</h4>
                    <p className="text-muted mb-2 fs-15">
                      Choose your plan according to your business needs
                    </p>
                    <div className="d-inline-flex">
                      <ul
                        className="nav nav-pills arrow-navtabs plan-nav rounded align-items-center mb-0 p-1"
                        id="pills-tab"
                        role="tablist"
                      >
                        {/* <li className="nav-item" role="presentation">
                          <button
                            className="nav-link fw-semibold active"
                            id="toll-month-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#toll-month"
                            type="button"
                            role="tab"
                            aria-selected="true"
                          >
                            Monthly
                          </button>
                        </li> */}
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveTollPlan("quarterly")}
                            className={`nav-link fw-semibold ${
                              activeTollPlan == "quarterly" ? "active" : ""
                            }`}
                            id="toll-quarter-tab"
                            type="button"
                          >
                            {" "}
                            <span className="badge bg-info">10% Off</span>
                            <br /> Quarterly{" "}
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveTollPlan("halfyearly")}
                            className={`nav-link fw-semibold ${
                              activeTollPlan == "halfyearly" ? "active" : ""
                            }`}
                            id="toll-half-tab"
                            type="button"
                          >
                            {" "}
                            <span className="badge bg-warning">15% Off</span>
                            <br />
                            Half Yearly
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveTollPlan("yearly")}
                            className={`nav-link fw-semibold ${
                              activeTollPlan == "yearly" ? "active" : ""
                            }`}
                            id="toll-annual-tab"
                            type="button"
                          >
                            {" "}
                            <span className="badge bg-success">25% Off</span>
                            <br />
                            Annually
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Swiper --> */}
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    dots={true}
                    speed={1500}
                    loop={true}
                    autoplay={true}
                    // navigation={true}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      720: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                      },
                      2048: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="swiper swiper-init nk-swiper nk-swiper-s4 pt-5 pt-lg-0"
                    data-autoplay="true"
                    data-space-between="30"
                  >
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">START UP</h5>
                            </div>
                            <div className="">
                              {/* <h2 className="toll-month mb-0 h2">
                                ₹1499{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`toll-quarter mb-0 ${
                                  activeTollPlan == "quarterly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹4,299{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹4,499</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-half mb-0 ${
                                  activeTollPlan == "halfyearly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹7,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹8,999</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-annual mb-0 ${
                                  activeTollPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹18,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹13,499</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>0</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>2</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1</b> Simultaneous Calls
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1800</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹1.5</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹1499
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                TOLL FREE PLAN 1
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2 className="toll-month mb-0 h2">
                                ₹2100{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`toll-quarter mb-0 ${
                                  activeTollPlan == "quarterly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹5,999{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹6,300</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-half mb-0 ${
                                  activeTollPlan == "halfyearly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹9,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹12,600</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-annual mb-0 ${
                                  activeTollPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹18,900{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹25,200</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>500</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>4</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1</b> Simultaneous Calls
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1800</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹1.5</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹2100
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                TOLL FREE PLAN 2
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2 className="toll-month mb-0 h2">
                                ₹1499{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`toll-quarter mb-0 ${
                                  activeTollPlan == "quarterly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹4,299{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹4,499</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-half mb-0 ${
                                  activeTollPlan == "halfyearly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹7,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹8,999</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-annual mb-0 ${
                                  activeTollPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹18,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹13,499</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1000</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>6</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>2</b> Simultaneous Calls
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1800</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹1.5</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹1499
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                TOLL FREE PLAN 3
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2 className="toll-month mb-0 h2">
                                ₹4500{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`toll-quarter mb-0 ${
                                  activeTollPlan == "quarterly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹9,999{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹13,500</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-half mb-0 ${
                                  activeTollPlan == "halfyearly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹22,999{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹26,999</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-annual mb-0 ${
                                  activeTollPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹40,499{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹54,000</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1000</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>8</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>3</b> Simultaneous Calls
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1800</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹1.5</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹4500
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                VIRTUAL PLAN 4
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2 className="toll-month mb-0 h2">
                                ₹6000{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`toll-quarter mb-0 ${
                                  activeTollPlan == "quarterly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹15,000{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹18,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-half mb-0 ${
                                  activeTollPlan == "halfyearly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹30,000{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹36,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-annual mb-0 ${
                                  activeTollPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹60,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹72,000</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1500</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>10</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>4</b> Simultaneous Calls
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1800</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>₹1.5</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹6000
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="card pricing-box ribbon-box right">
                        <div className="card-body bg-light m-2 p-3">
                          <div className="ribbon-two ribbon-two-danger">
                            <span>Popular</span>
                          </div>
                          <div className="d-flex align-items-center mb-3 flex-wrap">
                            <div className="flex-grow-1">
                              <h5 className="mb-0 fw-semibold h5">
                                BUSINESS PLAN
                              </h5>
                            </div>
                            <div className="">
                              {/* <h2 className="toll-month mb-0 h2">
                                ₹9000{" "}
                                <small className="fs-13 text-muted">
                                  /Month
                                </small>
                              </h2> */}
                              <h2
                                className={`toll-quarter mb-0 ${
                                  activeTollPlan == "quarterly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹22,000{" "}
                                <small className="fs-13 text-muted">
                                  /3 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹27,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-half mb-0 ${
                                  activeTollPlan == "halfyearly" ? "" : "d-none"
                                } h2`}
                              >
                                {" "}
                                ₹46,000{" "}
                                <small className="fs-13 text-muted">
                                  /6 Months
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹54,000</del>
                                </small>
                              </h2>
                              <h2
                                className={`toll-annual mb-0 ${
                                  activeTollPlan == "yearly" ? "" : "d-none"
                                } h2`}
                              >
                                ₹90,000{" "}
                                <small className="fs-13 text-muted">
                                  /Year
                                </small>
                                <br />
                                <small className="fs-16">
                                  <del>₹1,08,000</del>
                                </small>
                              </h2>
                            </div>
                          </div>
                          <p className="text-muted">
                            The perfect way to get started and get used to our
                            tools.
                          </p>
                          <ul className="list-unstyled vstack gap-3">
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1500</b> free minutes
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>20</b> Users
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>5</b> Simultaneous Calls
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Call Recording
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">SMS Alerts</div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Single-Level IVR
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  <b>1800</b> IVR Number
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div
                                  className="flex-grow-1"
                                  id="voice-broadcast"
                                >
                                  <b>₹1.2</b> per minute incoming
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex">
                                <div className="flex-shrink-0 text-success me-1">
                                  <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                </div>
                                <div className="flex-grow-1">
                                  Monthly Rental ₹9000
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  {/* <div className="swiper-pagination swiper-pagination-dark"></div> */}
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-lg-5">
                  <div className="text-center mb-4">
                    <h4 className="fw-semibold fs-22 h4">
                      Choose Our Pricing Plans
                    </h4>
                    <p className="text-muted mb-4 fs-15">
                      Our packages cover many clients with its Affordable
                      Pricing Plans, special pricing packages for high volume
                    </p>
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
              <div className="row justify-content-center">
                <div className="col-xl-9">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card pricing-box">
                        <div className="card-body p-4 m-2">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <h5 className="mb-1 fw-semibold h5">
                                ONE WAY VOICE CALLS
                              </h5>
                              <p className="text-muted mb-0">Per License</p>
                            </div>
                            <div className="avatar-sm">
                              <div className="avatar-title bg-light rounded-circle text-primary">
                                <i className="mdi mdi-phone-return fs-20"></i>
                              </div>
                            </div>
                          </div>
                          <div className="pt-4">
                            <h2 className="h2">
                              <sup>
                                <small>₹</small>
                              </sup>
                              1500{" "}
                              <span className="fs-13 text-muted">/Year</span>
                            </h2>
                          </div>
                          <hr className="my-4 text-muted" />
                          <div>
                            <ul className="list-unstyled text-muted vstack gap-3">
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Voice Credit <b>10000</b>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Validity <b>1 Year</b>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Free Updates
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    No Landing Number
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Monthly updates
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    24x7 Support
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--end col--> */}
                    <div className="col-lg-4">
                      <div className="card pricing-box ribbon-box right">
                        <div className="card-body p-4 m-2">
                          <div className="ribbon-two ribbon-two-danger">
                            <span>Popular</span>
                          </div>
                          <div>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <h5 className="mb-1 fw-semibold h5">
                                  TWO WAY VOICE CALLS
                                </h5>
                                <p className="text-muted mb-0">Per License</p>
                              </div>
                              <div className="avatar-sm">
                                <div className="avatar-title bg-light rounded-circle text-primary">
                                  <i className="mdi mdi-phone-sync-outline fs-20"></i>
                                </div>
                              </div>
                            </div>
                            <div className="pt-4">
                              <h2 className="h2">
                                <sup>
                                  <small>₹</small>
                                </sup>{" "}
                                4999
                                <span className="fs-13 text-muted">/Year</span>
                              </h2>
                            </div>
                          </div>
                          <hr className="my-4 text-muted" />
                          <div>
                            <ul className="list-unstyled text-muted vstack gap-3">
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Voice Credit <b>Unlimited</b>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Validity <b>1 Month</b>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Free Updates
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <b>1</b> Landing Number
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Monthly updates
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    24x7 Support
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--end col--> */}
                    <div className="col-lg-4">
                      <div className="card pricing-box">
                        <div className="card-body p-4 m-2">
                          <div>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <h5 className="mb-1 fw-semibold h5">
                                  EXTENDED
                                </h5>
                                <p className="text-muted mb-0">Per License</p>
                              </div>
                              <div className="avatar-sm">
                                <div className="avatar-title bg-light rounded-circle text-primary">
                                  <i className="mdi mdi-phone-plus fs-20"></i>
                                </div>
                              </div>
                            </div>
                            <div className="pt-4">
                              <h2 className="h2">
                                <sup>
                                  <small>$</small>
                                </sup>{" "}
                                39
                                <span className="fs-13 text-muted">/Month</span>
                              </h2>
                            </div>
                          </div>
                          <hr className="my-4 text-muted" />
                          <div>
                            <ul className="list-unstyled text-muted vstack gap-3">
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Voice Credit <b>Unlimited</b>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Validity <b>1 Month</b>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Free Updates
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <b>1</b> Landing Number
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    Monthly updates
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 text-success me-1">
                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    24x7 Support
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--end col--> */}
                  </div>
                  {/* <!--end row--> */}
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
              <div
                className="row justify-content-center mt-5"
                id="corporate-plans"
              >
                <div className="col-lg-4">
                  <div className="text-center mb-4 pb-2">
                    <h4 className="fw-semibold fs-22 h4">
                      Corporate Plan Pricing
                    </h4>
                    <p className="text-muted mb-4 fs-15">
                      Simple pricing. No hidden fees. Advanced features for you
                      business.
                    </p>
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
              <div className="row">
                <div className="col-lg-6">
                  <div className="card pricing-box text-center">
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="card-body h-100">
                          <div>
                            <h5 className="mb-1 h5">Starter</h5>
                            <p className="text-muted">Starter plans</p>
                          </div>
                          <div className="py-4">
                            <h2 className="h2">
                              <sup>
                                <small>$</small>
                              </sup>
                              22{" "}
                              <span className="fs-13 text-muted">
                                {" "}
                                /Per month
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-6">
                        <div className="card-body border-start mt-4 mt-lg-0">
                          <div className="card-header bg-light">
                            <h5 className="fs-15 mb-0 h5">Plan Features:</h5>
                          </div>
                          <div className="card-body pb-0">
                            <ul className="list-unstyled vstack gap-3 mb-0">
                              <li>
                                Users:{" "}
                                <span className="text-success fw-semibold">
                                  1
                                </span>
                              </li>
                              <li>
                                Storage:{" "}
                                <span className="text-success fw-semibold">
                                  01 GB
                                </span>
                              </li>
                              <li>
                                Domain:{" "}
                                <span className="text-success fw-semibold">
                                  No
                                </span>
                              </li>
                              <li>
                                Support:{" "}
                                <span className="text-success fw-semibold">
                                  No
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </div>
                </div>
                {/* <!--end row--> */}
                <div className="col-lg-6">
                  <div className="card pricing-box ribbon-box ribbon-fill text-center">
                    <div className="ribbon ribbon-primary">New</div>
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="card-body h-100">
                          <div>
                            <h5 className="mb-1 h5">Professional</h5>
                            <p className="text-muted">Professional plans</p>
                          </div>
                          <div className="py-4">
                            <h2 className="h2">
                              <sup>
                                <small>$</small>
                              </sup>
                              29{" "}
                              <span className="fs-13 text-muted">
                                /Per month
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-6">
                        <div className="card-body border-start mt-4 mt-lg-0">
                          <div className="card-header bg-light">
                            <h5 className="fs-15 mb-0 h5">Plan Features:</h5>
                          </div>
                          <div className="card-body pb-0">
                            <ul className="list-unstyled vstack gap-3 mb-0">
                              <li>
                                Users:{" "}
                                <span className="text-success fw-semibold">
                                  3
                                </span>
                              </li>
                              <li>
                                Storage:{" "}
                                <span className="text-success fw-semibold">
                                  10 GB
                                </span>
                              </li>
                              <li>
                                Domain:{" "}
                                <span className="text-success fw-semibold">
                                  Yes
                                </span>
                              </li>
                              <li>
                                Support:{" "}
                                <span className="text-success fw-semibold">
                                  No
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </div>
                </div>
                {/* <!--end row--> */}
                <div className="col-lg-6">
                  <div className="card pricing-box ribbon-box ribbon-fill text-center">
                    <div className="ribbon ribbon-primary">New</div>
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="card-body h-100">
                          <div>
                            <h5 className="mb-1 h5">Enterprise</h5>
                            <p className="text-muted">Enterprise plans</p>
                          </div>
                          <div className="py-4">
                            <h2 className="h2">
                              <sup>
                                <small>$</small>
                              </sup>
                              39{" "}
                              <span className="fs-13 text-muted">
                                /Per month
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-6">
                        <div className="card-body border-start mt-4 mt-lg-0">
                          <div className="card-header bg-light">
                            <h5 className="fs-15 mb-0 h5">Plan Features:</h5>
                          </div>
                          <div className="card-body pb-0">
                            <ul className="list-unstyled vstack gap-3 mb-0">
                              <li>
                                Users:{" "}
                                <span className="text-success fw-semibold">
                                  3
                                </span>
                              </li>
                              <li>
                                Storage:{" "}
                                <span className="text-success fw-semibold">
                                  20 GB
                                </span>
                              </li>
                              <li>
                                Domain:{" "}
                                <span className="text-success fw-semibold">
                                  Yes
                                </span>
                              </li>
                              <li>
                                Support:{" "}
                                <span className="text-success fw-semibold">
                                  Yes
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </div>
                </div>
                {/* <!--end col--> */}
                <div className="col-lg-6">
                  <div className="card pricing-box text-center">
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="card-body h-100">
                          <div>
                            <h5 className="mb-1 h5">Unlimited</h5>
                            <p className="text-muted">Unlimited plans</p>
                          </div>
                          <div className="py-4">
                            <h2 className="h2">
                              <sup>
                                <small>$</small>
                              </sup>
                              49{" "}
                              <span className="fs-13 text-muted">
                                /Per month
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-6">
                        <div className="card-body border-start mt-4 mt-lg-0">
                          <div className="card-header bg-light">
                            <h5 className="fs-15 mb-0 h5">Plan Features:</h5>
                          </div>
                          <div className="card-body pb-0">
                            <ul className="list-unstyled vstack gap-3 mb-0">
                              <li>
                                Users:{" "}
                                <span className="text-success fw-semibold">
                                  5
                                </span>
                              </li>
                              <li>
                                Storage:{" "}
                                <span className="text-success fw-semibold">
                                  40 GB
                                </span>
                              </li>
                              <li>
                                Domain:{" "}
                                <span className="text-success fw-semibold">
                                  Yes
                                </span>
                              </li>
                              <li>
                                Support:{" "}
                                <span className="text-success fw-semibold">
                                  Yes
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
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
        </div>
      </div>
    </>
  );
}