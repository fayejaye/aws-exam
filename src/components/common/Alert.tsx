import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { Snackbar } from "@material-ui/core";
import { Severity } from "../../constants";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  type: Severity;
  title: string;
  content: string;
  open: boolean;
  close: () => void;
  timer?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiAlert-root": {
      minWidth: "50%",
    },
  },
}));

const AlertBanner = (props: Props) => {
  const { type, title, content, open, close, timer } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default AlertBanner;
