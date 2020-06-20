import { Styles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";

export function typeStyles<ClassKey extends string>(
  style: Styles<Theme, {}, ClassKey>
) {
  return style;
}
