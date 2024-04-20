/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export default function ApexCharts({ inbound, outbound, answered, labels }) {
  const series = [
    {
      name: "Inbound Calls",
      type: "column",
      data: inbound,
      color: "#3d78e3",
    },
    {
      name: "Outbound Calls",
      type: "column",
      data: outbound,
      color: "#eb4310",
    },
    {
      name: "Answered",
      type: "area",
      data: answered,
      color: "#02e8b6",
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line", // Changed type to line
      stacked: false,
    },
    stroke: {
      width: [2, 2, 2],
      curve: "smooth",
      dashArray: [0, 0, 5],
    },
    plotOptions: {
      bar: {
        columnWidth: "35%",
      },
    },
    fill: {
      opacity: [0.8, 0.5, 0.1], // Adjusted opacity array
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100, 100, 100],
      },
    },
    labels: labels,
    markers: {
      size: 5,
    },
    xaxis: {
      type: "text", // Adjusted x-axis type
    },
    yaxis: {
      title: {
        text: "Calls",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " Calls";
          }
          return y;
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        series={series}
        options={options}
        type="line"
        height={350}
      />
    </div>
  );
}
