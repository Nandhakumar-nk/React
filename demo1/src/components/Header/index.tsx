import React from "react";

interface IBoxedIconProps {
  iconClass: String;
  iconName: String;
  materialIcon?: String;
}

function BoxedIcon(props: IBoxedIconProps) {
  return (
    <div className={"blue-bg " + (props.iconClass ? props.iconClass : "")}>
      <i className={"top-right-icons " + props.iconName}>
        {props.materialIcon ? props.materialIcon : ""}
      </i>
    </div>
  );
}

function Header() {
  return (
    <div className="header-container">
      <BoxedIcon
        iconClass="top-left-container"
        iconName="material-icons apps-icon"
        materialIcon="apps"
      />

      <p className="todo">To Do</p>

      <div className="top-middle-container white-bg">
        <i className="material-icons search-icon blue-icon">search_outlined</i>
        <input className="search-box" type="text" />
      </div>

      <BoxedIcon
        iconClass="top-right-container top-right-distance"
        iconName="fa fa-cog"
      />
      <BoxedIcon
        iconClass="top-right-container"
        iconName="fa fa-question-circle"
      />
      <BoxedIcon iconClass="top-right-container" iconName="fa fa-bullhorn" />
      <BoxedIcon iconClass="top-right-container" iconName="fa fa-user" />
    </div>
  );
}

export default Header;
