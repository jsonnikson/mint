import { typeStyles } from "../../lib/utils";

export default typeStyles({
  tokenContainer: {
    display: "inline-flex",
    flexDirection: "column",
    marginBottom: "2em",
    color: "#7B7165",
    font: '17px/23px "Noto Sans", "Noto Sans CJK TC"',
    fontWeight: 300,
    "& button, & input": {
      border: "none",
      margin: 0,
      padding: 0,
      textAlign: "inherit",
      font: 'inherit',
      backgroundColor: 'inherit',
      width: '100%'
    },
  },
  wordToken: {
    '&:not(:first-child)': {
      marginLeft: '1em'
    }
  },
  activeToken: {
    backgroundColor: "#e0e0e0",
  },
  tokenText: {
    '$wordToken &': {
      borderBottom: "solid #7b7165 1px"
    },
    font: '600 21px/27px "Source Sans Pro"',
    color: "black",
    "$wordToken + $wordToken &": {
      marginLeft: "-1em",
      paddingLeft: "1em",
    },
  },
});
