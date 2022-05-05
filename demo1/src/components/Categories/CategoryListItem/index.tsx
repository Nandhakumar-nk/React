import React from "react";
import { ICategory } from "..";

export interface ICategoryListItemProps {
    category: ICategory;
    key: string;
    switchCategory: (categoryId: string) => void;
  }
  
  export function CategoryListItem(props: ICategoryListItemProps) {
    const uncompletedTasks = props.category.tasks.filter(
      (task) => task.isCompleted === false
    );
    return (
      <li onClick={() => props.switchCategory(props.category._id)}>
        <span className="material-icons list-icons blue-icon">list_outlined</span>
        {props.category.title}
        <span className="task-count">
          {uncompletedTasks.length > 0 ? uncompletedTasks.length : ""}
        </span>
      </li>
    );
  }