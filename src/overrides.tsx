import { Overrides } from "@material-ui/core/styles/overrides";

const overrides: Overrides = {
  MuiSvgIcon: {
    fontSizeLarge: {
      fontSize: "4rem",
    },
  },
  MuiFormHelperText: {
    contained: {
      marginLeft: "0px",
    },
    root: {
      fontSize: "0.6rem",
    },
  },
  MuiBackdrop: {
    root: {
      color: "#2E8B57",
    },
  },
  MuiOutlinedInput: {
    root: {
      borderRadius: 0,
      borderColor: "var(--color-primary-500)",

      "&$error": {
        "&:hover,&:focus": {
          "& fieldset": {
            borderColor: "#f44336 !important",
          },
        },
      },
    },
    notchedOutline: {
      borderColor: "var(--color-primary-500)",
    },
    colorSecondary: {
      "&:hover": {
        "& fieldset": {
          borderColor: "#ffffffd9 !important",
        },
      },
    },
    input: {
      padding: "1em",
      fontSize: "0.8em",
    },
  },
  MuiInputLabel: {
    outlined: {
      left: "0.2em",
      backgroundColor: "#fff",
      lineHeight: "0.3em",
      fontSize: "16px",
      transform: "translate(14px, 20px) scale(0.8)",

      "&$shrink": {
        transform: "translate(0.6em, -4px) scale(0.75)",
      },
    },
    shrink: {
      padding: "0.2em",
      borderRadius: "1em",
    },
  },
};

export default overrides;
