import React from "react";
import { ITask } from "../../StepTasks";

export interface IDefaultCategoriesProps {
  importantTasks: ITask[];
  switchTab: (text: string) => void;
}

export function DefaultCategories(props: IDefaultCategoriesProps) {
  const categories = [
    {
      icon: "light_mode_outlined",
      color: "",
      text: "My Day",
      tasks: [],
    },
    {
      icon: "star_border",
      color: "",
      text: "Important",
      tasks: props.importantTasks,
    },
    {
      icon: "event_outlined",
      color: "",
      text: "Planned",
      tasks: [],
    },
    {
      icon: "person_outline",
      color: "green-icon",
      text: "Assigned to me",
      tasks: [],
    },
    {
      icon: "home_outlined",
      color: "blue-icon",
      text: "Tasks",
      tasks: [],
    },
  ];
  const elements = categories.map((category, index) => {
    const text = category.text;

    return (
      <li
        className={category.color}
        key={index}
        onClick={() => {
          props.switchTab(text);
        }}
      >
        <i className="material-icons list-icons">{category.icon}</i>
        <span>{category.text}</span>
        <span className="task-count">
          {category.tasks.length > 0 ? category.tasks.length : ""}
        </span>
      </li>
    );
  });

  return (
    <div className="left-menu-container">
      <ul className="menu-list">{elements}</ul>
    </div>
  );
}
