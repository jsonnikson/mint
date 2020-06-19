import { Styles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";
import React from "react";
import { Observer } from "mobx-react";

export function typeStyles<ClassKey extends string>(
  style: Styles<Theme, {}, ClassKey>
) {
  return style;
}

export function createObserver<P extends {}>(
  type: React.FunctionComponent<P> | React.ComponentClass<P> | string,
  props: () => React.Attributes & P) {
  return React.createElement(Observer, {
      render: () => React.createElement(type, props())
  });
}

