import { createMuiTheme } from "@material-ui/core/styles";
import overides from "./overrides";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#2E8B57" },
  },
  ...overides,
});
export default theme;
