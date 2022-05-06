import React from "react";

interface IBoxedIconProps {
  divClass: String;
  iconClass: String;
  materialIcon?: String;
}

export function BoxedIcon(props: IBoxedIconProps) {
  return (
    <div className={props.divClass.toString()}>
      <i className={props.iconClass.toString()}>
        {props.materialIcon ? props.materialIcon : ""}
      </i>
    </div>
  );
}
