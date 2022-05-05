import React from "react";

interface IBoxedIconProps {
  iconClass: String;
  iconName: String;
  materialIcon?: String;
}

export function BoxedIcon(props: IBoxedIconProps) {
  return (
    <div className={"blue-bg " + (props.iconClass ? props.iconClass : "")}>
      <i className={"top-right-icons " + props.iconName}>
        {props.materialIcon ? props.materialIcon : ""}
      </i>
    </div>
  );
}
