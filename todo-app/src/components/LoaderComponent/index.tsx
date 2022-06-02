import React from "react";

import { Bars } from "react-loader-spinner";

interface ILoaderComponentProps {
  divClass?: string;
  height?: string;
  width?: string;
  message?: string;
}

export function LoaderComponent(props: ILoaderComponentProps) {
  const divClass = props.divClass ? props.divClass : "";
  const height = props.height ? props.height : "40";
  const width = props.width ? props.width : "40";
  const message = props.message ? props.message : "";
  return (
    <div className={"loading-icon " + divClass}>
      <Bars
        height={height}
        width={width}
        color="grey"
        ariaLabel="loading-indicator"
      />
      {message}
    </div>
  );
}
