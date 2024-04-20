/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export default function EnquiriesPie({ series }) {
  let options = {
    series: series,
    labels: ["Enquirires", "Ringing", "Postponed", "Not interested", "Signed"],
    plotOptions: {
      donut: {
        donutWidth: 0.3,
      },
    },
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#687cfe", "#3cd188", "#efae4e", "#f7666e", "#0ac7fb"],
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          series={series}
          options={options}
          type="pie"
          height={250}
        />
      </div>
    </>
  );
}
