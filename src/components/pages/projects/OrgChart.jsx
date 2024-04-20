/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "orgchart/dist/css/jquery.orgchart.min.css";
import "orgchart";

const Flow = ({projectsData}) => {
  const chartContainer = useRef(null);
  console.log(projectsData)



  useEffect(() => {
    if (chartContainer.current) {
      $(chartContainer.current).orgchart({
        data: projectsData,
        nodeContent: "title",
        direction: "l2r",
      });
    }

    return () => {
      if (chartContainer.current) {
        $(chartContainer.current).empty();
      }
    };
  }, []);

  return <div className="relative h-[225px]  " ref={chartContainer}></div>;
};



export default Flow;

