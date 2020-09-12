import React from "react";
import { Skeleton } from "@material-ui/lab";
const SkeletonCard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Skeleton animation="wave" variant="rect" width={345} height={200} />
      <Skeleton animation="wave" height={20} width="100%" style={{ marginBottom: 2 }} />
      <Skeleton animation="wave" height={20} width="100%" style={{ marginBottom: 2 }} />
    </div>
  );
};
export default SkeletonCard;
