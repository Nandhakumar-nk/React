import React from "react";
import { ICategory } from "../Categories";


import "./styles.scss";

export interface ICategoryListItemProps {
  category: ICategory;
  switchCategory: (categoryId: string) => void;
}

export function CategoryListItem(props: ICategoryListItemProps) {
  const iconColor = props.category.iconName
    ? ""
    : "blue-icon";
  const uncompletedTasks = props.category.tasks.filter(
    (task) => task.isCompleted === false
  );
  return (
    <li onClick={() => props.switchCategory(props.category._id)}>
      <span className={"material-icons list-icons " + iconColor}>
        {" "}
        {props.category.iconName ? props.category.iconName : "list_outlined"}
      </span>
      <span
        className={props.category.textColor ? props.category.textColor : ""}
      >
        {props.category.title}
      </span>
      <span className="task-count">
        {uncompletedTasks.length > 0 ? uncompletedTasks.length : ""}
      </span>
    </li>
  );
}
