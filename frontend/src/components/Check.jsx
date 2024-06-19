import React from "react";
import { Carousel } from "antd";

const Check = () => {
  const contentStyle = {
    margin: 10,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div>
      <Carousel arrows infinite autoplay autoplaySpeed={5000} fade>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
      </Carousel>
      <h1>hello</h1>
    </div>
  );
};

export default Check;
