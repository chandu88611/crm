/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export default function PaymentRadialPie({ series }) {
  let options = {
    series: series,
    labels: ["Paid", "Due", "Unpaid"],
    plotOptions: {
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: true,
        },
      },
    },
    chart: {
      type: "radialBar",
    },
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "bottom",
      // offsetX: 160,
      // offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 2,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: true,
          },
        },
      },
    ],

    colors: ["#687cfe", "#3cd188", "#efae4e"],
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          series={series}
          options={options}
          type="radialBar"
          height={340}
        />
      </div>
    </>
  );
}
