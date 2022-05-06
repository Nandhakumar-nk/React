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
      <li
        className={
          "right-menu-list grey-bg" +
          (props.item.borderBottom ? " list-bottom" : "")
        }
      >
        <i
          className={
            "material-icons right-icons" +
            (props.item.iconClass ? props.item.iconClass : "")
          }
          onClick={props.item.iconEvent ? props.item.iconEvent : hello}
        >
          {props.item.icon}
        </i>
        <span className={props.item.textClass ? props.item.textClass : ""}>
          {props.item.text}
        </span>
        {props.item.secondIcon ? (
          <i
            className={
              "material-icons list-icons second-list-icon " +
              (props.item.secondIconClass ? props.item.secondIconClass : "")
            }
            onClick={
              props.item.secondIconEvent ? props.item.secondIconEvent : hello
            }
          >
            {props.item.secondIcon}
          </i>
        ) : (
          ""
        )}
      </li>
    );
  }