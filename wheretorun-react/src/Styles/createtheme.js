import { createTheme } from "@material-ui/core";
import { purple } from "@mui/material/colors";

export default createTheme(() => ({
  typography: {
    fontFamily: "Prompt",
    fontWeight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#7986cb",
    },
    secondary: {
      main: "#e57373",
    },
  },
}));
