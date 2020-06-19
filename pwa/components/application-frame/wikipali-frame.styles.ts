import { makeStyles, fade } from "@material-ui/core/styles";

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
  navbarOpen: {},
  searchBox: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
  },
  searchBoxIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBoxInput: {
    color: 'inherit',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '40ch',
    }
  }
}));
