import React from "react";

import "./styles.scss";

export interface IMenuListItem {
  borderBottom?: boolean;
  iconClass?: string;
  iconEvent?: (event?: Object) => void;
  icon: string;
  textClass?: string;
  text: string;
  secondIcon?: string;
  secondIconClass?: string;
  secondIconEvent?: (event: Object) => void;
}

interface IMenuListItemProps {
  item: IMenuListItem;
}

function hello() {
  console.log("hello");
}

export function MenuListItem(props: IMenuListItemProps) {
  return (
    <React.Fragment>
      <li className="right-menu-list grey-bg">
        <i
          className={
            "material-icons right-icons" +
            (props.item.iconClass ? props.item.iconClass : "")
          }
          onClick={props.item.iconEvent ? props.item.iconEvent : hello}
        >
          {props.item.icon == "f" ? "" : props.item.icon}
        </i>
        <span
          className={
            "right-list-text " +
            (props.item.textClass ? props.item.textClass : "")
          }
        >
          {props.item.text}
        </span>
        {props.item.secondIcon || props.item.secondIcon === "f" ? (
          <i
            className={
              "material-icons list-icons second-list-icon " +
              (props.item.secondIconClass ? props.item.secondIconClass : "")
            }
            onClick={
              props.item.secondIconEvent ? props.item.secondIconEvent : hello
            }
          >
            {props.item.secondIcon === "f" ? "" : props.item.secondIcon}
          </i>
        ) : (
          ""
        )}
      </li>
      {props.item.borderBottom ? <hr className="bottom-border-right" /> : ""}
    </React.Fragment>
  );
}
