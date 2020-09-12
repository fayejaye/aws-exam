import React, { useState, useEffect } from "react";
import Card from "./Card";
import { IconButton } from "@material-ui/core";
import RightIcon from "@material-ui/icons/ChevronRightOutlined";
import LeftIcon from "@material-ui/icons/ChevronLeftOutlined";
import mockedData from "../mockedData.json";

interface MyObject {
  category: string;
  question: string;
  answer: string;
}

const Home = () => {
  const [data, setData] = useState<MyObject[]>();
  const [activeIndex, setActiveIndex] = useState(0);

  let api_response = mockedData.data;

  useEffect(() => {
    const fetch = async () => {
      const result = api_response;
      console.log("res", result);
      setData(result);
    };
    fetch();
  }, [api_response]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {activeIndex !== 0 && (
        <IconButton color="primary" onClick={() => setActiveIndex(activeIndex - 1)}>
          <LeftIcon />
        </IconButton>
      )}
      {data && (
        <Card
          length={data.length}
          activeIndex={activeIndex + 1}
          service={data[activeIndex].category}
          question={data[activeIndex].question}
          answer={data[activeIndex].answer}
        />
      )}
      {activeIndex + 1 !== 0 && (
        <IconButton color="primary" onClick={() => setActiveIndex(activeIndex + 1)}>
          <RightIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Home;
