/* eslint-disable react/prop-types */
import ReactCUSexChart from "react-apexcharts";

export default function EnqCusCharts({ ENQ, CUS }) {
  const series = [
    {
      name: "Enquiries",
      type: "area",
      data: ENQ,
      color: "#697dfe",
    },
    {
      name: "Customers",
      type: "area",
      data: CUS,
      color: "#46d38e",
    },
  ];
  let options = {
    chart: {
      height: 350,
      type: "line",
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
      opacity: [0.1, 0.1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100],
      },
    },

    labels: [
      "Jan",
      "Feb",
      "Mar",
      "CUSr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "text",
    },
    yaxis: {
      title: {
        text: "Points",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };

  return (
    <>
      <div id="chart">
        <ReactCUSexChart
          series={series}
          options={options}
          type="line"
          height={350}
        />
      </div>
    </>
  );
}
