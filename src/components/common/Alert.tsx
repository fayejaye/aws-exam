import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { Snackbar } from "@material-ui/core";
import { Severity } from "../../constants";

interface Props {
  type: Severity;
  title: string;
  content: string;
  open: boolean;
  close: () => void;
  timer?: boolean;
}

const AlertBanner = (props: Props) => {
  const { type, title, content, open, close, timer } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={timer ? 6000 : null}
      onClose={() => close()}
      data-testid="alertComponent"
    >
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default AlertBanner;
