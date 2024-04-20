/* eslint-disable no-unused-vars */
import SparkLineChart from "../charts/sparkLine";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Loader from "../Loader";
import { useGetGeneralInfoQuery } from "../../../services/api";

export default function ProposalsCards() {
    const { data: callsInfo, isLoading } = useGetGeneralInfoQuery();

  return (
    <>
      {isLoading && <Loader />}
      <div className="m-4">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{ delay: 3000 }}
          dots={true}
          speed={1500}
          loop={true}
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
          // modules={[Autoplay]}
          className="swiper swiper-init nk-swiper nk-swiper-s4 pt-5 pt-lg-0"
          data-autoplay="true"
          data-space-between="30"
        >
          <SwiperSlide className="swiper-slide h-auto">
            <div className="card">
              <div className="card-body ">
                <div className="flex items-center gap-1 w-full">
                  <div className="avatar-xs h-7 avathar-border">
                    <div className="avatar-title  bg-primary rounded-circle text-light">
                      <i className="mdi mdi-account-clock"></i>
                    </div>
                  </div>

                  <h6 className=" mb-0 fs-14 w-full h6">Pending Proposals</h6>
                </div>
                <div className="d-flex gap-2 justify-content-between align-items-end">
                  <div>
                    <h5 className="mb-1 mt-2 text-lg !font-bold">
                      {callsInfo?.data?.proposals_data?.pending_count}
                    </h5>
                    <p className="text-success text-muted fs-13 fw-medium mb-0">
                      {callsInfo?.data?.proposals_data?.pending_per}%
                    </p>
                  </div>
                  <SparkLineChart
                    seriesData={callsInfo?.data?.proposals_data?.pending_graph}
                    name={"Pending"}
                    color={"#687cfe"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="swiper-slide h-auto">
            <div className="card">
              <div className="card-body ">
                <div className="flex items-center gap-1 w-full">
                  <div className="avatar-xs h-7 avathar-border">
                    <div className="avatar-title  bg-secondary rounded-circle text-light">
                      <i className="mdi mdi-account-arrow-right"></i>
                    </div>
                  </div>
                  <h6 className=" mb-0 fs-14 w-full h6">Sent Proposals</h6>
                </div>
                <div className="d-flex gap-2 justify-content-between align-items-end">
                  <div>
                    <h5 className="mb-1 mt-2 text-lg !font-bold">
                      {callsInfo?.data?.proposals_data?.sent_count}
                    </h5>
                    <p className="text-success text-muted fs-13 fw-medium mb-0">
                      {callsInfo?.data?.proposals_data?.pending_per}%
                    </p>
                  </div>
                  <SparkLineChart
                    seriesData={callsInfo?.data?.proposals_data?.sent_graph}
                    name={"Sent"}
                    color={"#ff7f5d"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide h-auto">
            <div className="card">
              <div className="card-body ">
                <div className="flex items-center gap-1 w-full">
                  <div className="avatar-xs h-7 avathar-border">
                    <div className="avatar-title  bg-warning rounded-circle text-light">
                      <i className="mdi mdi-account-eye"></i>
                    </div>
                  </div>
                  <h6 className=" mb-0 fs-14 w-full h6">Opened Proposals</h6>
                </div>
                <div className="d-flex gap-2 justify-content-between align-items-end">
                  <div>
                    <h5 className="mb-1 mt-2 text-lg !font-bold">
                      {callsInfo?.data?.proposals_data?.opened_count}
                    </h5>
                    <p className="text-success text-muted fs-13 fw-medium mb-0">
                      {callsInfo?.data?.proposals_data?.opened_per}%
                    </p>
                  </div>
                  <SparkLineChart
                    seriesData={callsInfo?.data?.proposals_data?.opened_graph}
                    name={"Opened"}
                    color={"#efae4e"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide h-auto">
            <div className="card">
              <div className="card-body ">
                <div className="flex items-center gap-1 w-full">
                  <div className="avatar-xs h-7 avathar-border">
                    <div className="avatar-title  bg-success rounded-circle text-light">
                      <i className="mdi mdi mdi-account-check"></i>
                    </div>
                  </div>
                  <h6 className=" mb-0 fs-14 w-full h6">Accepted Proposals</h6>
                </div>
                <div className="d-flex gap-2 justify-content-between align-items-end">
                  <div>
                    <h5 className="mb-1 mt-2 text-lg !font-bold">
                      {callsInfo?.data?.proposals_data?.accepted_count}
                    </h5>
                    <p className="text-success text-muted fs-13 fw-medium mb-0">
                      {callsInfo?.data?.proposals_data?.accepted_per}%
                    </p>
                  </div>
                  <SparkLineChart
                    seriesData={callsInfo?.data?.proposals_data?.accepted_graph}
                    name={"Accepted"}
                    color={"#3cd188"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide h-auto">
            <div className="card">
              <div className="card-body ">
                <div className="flex items-center gap-1 w-full">
                  <div className="avatar-xs h-7 avathar-border">
                    <div className="avatar-title  bg-danger rounded-circle text-light">
                      <i className="mdi mdi mdi-account-remove"></i>
                    </div>
                  </div>
                  <h6 className=" mb-0 fs-14 w-full h6">Rejected Proposals</h6>
                </div>
                <div className="d-flex gap-2 justify-content-between align-items-end">
                  <div>
                    <h5 className="mb-1 mt-2 text-lg !font-bold">
                      {callsInfo?.data?.proposals_data?.rejected_count}
                    </h5>
                    <p className="text-success text-muted fs-13 fw-medium mb-0">
                      {callsInfo?.data?.proposals_data?.rejected_per}%
                    </p>
                  </div>
                  <SparkLineChart
                    seriesData={callsInfo?.data?.proposals_data?.rejected_graph}
                    name={"Rejected"}
                    color={"#f7666e"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}