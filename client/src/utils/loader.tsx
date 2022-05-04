import React from "react";
import { Space, Spin } from "antd";

function Loader() {
  return (
    <Space
      style={{
        position: "absolute",
        left: "0",
        zIndex: "1",
        top: "0",
        backgroundColor: "rgba(0, 0, 0, .5)",
        height: "100%",
        width: "100%",
      }}
      size={"large"}
    >
      <Spin style={{ position: "absolute", left: "50%" }} size={"large"} />
    </Space>
  );
}

export default Loader;
