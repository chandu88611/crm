/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export default function ApexDonutCharts({ series }) {
  let options = {
    series: series,
    labels: ["Paid", "Unpaid", "Partially Paid", " Due"],
    plotOptions: {
      donut: {
        donutWidth: 0.3,
      },
    },
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3cd188", "#f7666e", "#efae4e", "#ff7f5d"],
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          series={series}
          options={options}
          type="donut"
          height={250}
        />
      </div>
    </>
  );
}
