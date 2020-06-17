import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  topbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  navbarButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navbar: {
    [theme.breakpoints.down("xs")]: {
      '&:not($navbarOpen)': {
        display: "none"
      }
    },
  },
  navbarOpen: {}
}));
