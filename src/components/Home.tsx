import React, { useState, useEffect } from "react";
import Card from "./Card";
import { IconButton } from "@material-ui/core";
import RightIcon from "@material-ui/icons/ChevronRightOutlined";
import LeftIcon from "@material-ui/icons/ChevronLeftOutlined";
import { listCardss } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Severity } from "../constants";
import Alert from "./common/Alert";
import SkeletonCard from "../components/common/SkeletonCard";
export interface GraphQLResult {
  data?: Record<string, any>;
  errors?: [object];
  extensions?: {
    [key: string]: any;
  };
}

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [alert, setAlert] = React.useState<{ type: Severity; title: string; content: string }>();
  const [alertVisibility, setAlertVisibility] = React.useState(false);
  const [cardList, setCardList] = React.useState<GraphQLResult>();

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await await API.graphql(graphqlOperation(listCardss));
        setCardList({ data: res });
        setLoading(false);
      } catch (e) {
        console.log("e", e);
        setLoading(false);
        setAlert({ type: "error", title: "Error", content: e });
        setAlertVisibility(true);
      }
    };
    fetch();
  }, []);

  if (cardList) {
    const listLength: number = cardList?.data?.data?.listCardss.items.length;
    return !loading ? (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {activeIndex !== 0 && (
            <IconButton color="primary" onClick={() => setActiveIndex(activeIndex - 1)}>
              <LeftIcon />
            </IconButton>
          )}
          {cardList?.data?.data?.listCardss && (
            <Card
              length={listLength}
              activeIndex={activeIndex + 1}
              service={cardList.data.data.listCardss.items[activeIndex].category}
              question={cardList.data.data.listCardss.items[activeIndex].question}
              answer={cardList.data.data.listCardss.items[activeIndex].answer}
            />
          )}
          {activeIndex !== listLength - 1 && listLength > 0 && (
            <IconButton color="primary" onClick={() => setActiveIndex(activeIndex + 1)}>
              <RightIcon />
            </IconButton>
          )}
        </div>
        <div>
          <Alert
            type={alert?.type}
            title={alert?.title!}
            content={alert?.content!}
            open={alertVisibility}
            close={() => setAlertVisibility(false)}
            timer={false}
          />
        </div>
      </>
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SkeletonCard />
      </div>
    );
  } else {
    return (
      <Alert
        type={alert?.type}
        title={alert?.title!}
        content={alert?.content!}
        open={alertVisibility}
        close={() => setAlertVisibility(false)}
        timer={false}
      />
    );
  }
};

export default Home;
