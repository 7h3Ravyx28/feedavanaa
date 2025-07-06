// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
      paper: "rgba(255,255,255,0.05)",
    },
    text: {
      primary: "#fff",
      secondary: "#aaa",
    },
    primary: {
      main: "#ff0080",
    },
  },
});

export default theme;
