import React from "react";

import { BoxedIcon } from "../BoxedIcon";

import "./styles.scss";

interface IHeaderState {}

interface IHeaderProps {}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  render() {
    return (
      <div className="header-container">
        <BoxedIcon
          divClass="top-left-container blue-bg"
          iconClass="material-icons apps-icon"
          materialIcon="apps"
        />

        <p className="todo">To Do</p>

        <div className="top-middle-container white-bg">
          <i className="material-icons search-icon blue-icon">
            search_outlined
          </i>
          <input className="search-box" type="text" />
        </div>

        <BoxedIcon
          divClass="top-right-container top-right-distance blue-bg"
          iconClass="top-right-icons fa fa-cog"
        />
        <BoxedIcon
          divClass="top-right-container blue-bg"
          iconClass="top-right-icons fa fa-question-circle"
        />
        <BoxedIcon
          divClass="top-right-container blue-bg"
          iconClass="top-right-icons fa fa-bullhorn"
        />
        <BoxedIcon
          divClass="top-right-container blue-bg"
          iconClass="top-right-icons fa fa-user"
        />
      </div>
    );
  }

  componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - Header");
  }
}

export default Header;
