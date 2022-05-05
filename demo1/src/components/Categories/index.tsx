import React, { useState } from "react";
import { CategoryListItem } from "../CategoryListItem";

import { ITask } from "../StepTasks";

import "./styles.scss";

export interface ICategory {
  _id: string;
  title: string;
  tasks: ITask[];
  iconName ?:string;
  textColor ?:string;
}

interface ICategoriesProps {
    
      importantTasks: ITask[];
  switchTab: (text: string) => void;
  categories: ICategory[];
  switchCategory: (categoryId: string) => void;
      addCategory: (categoryName: string) => void;
  showShedulingIcons: (displayShedulingIcons: boolean) => void;
  toggleLeftContainer: () => void;
}

function getDefaultCategories(importantTasks:ITask[]) {
  const categories: ICategory[] = [
    {
      _id: "My Day",
      title: "My Day",
      tasks: [],
      iconName: "light_mode_outlined",
    },
    {
        _id: "Important",
      title: "Important",
      tasks: importantTasks,
      iconName: "star_border",
    },
    {
        _id: "Planned",
      title: "Planned",
      tasks: [],
      iconName: "event_outlined",
    },
    {
        _id: "Assigned to me",
      title: "Assigned to me",
      tasks: [],
      iconName: "person_outline",
      textColor:"green-icon"
    },
    {
        _id: "Tasks",
      title: "Tasks",
      tasks: [],
      iconName: "home_outlined",
      textColor:"blue-icon"
    },
  ];

  return categories;
}

function Categories(props: ICategoriesProps) {
  const [category, setCategory] = useState("");
  const bottomIcons = [
    "email_outlined",
    "date_range_outlined",
    "people_alt_outlined",
    "attach_file_outlined",
    "done_outline_outlined",
  ];

  function addCategory(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && category.length > 0) {
      props.addCategory(category);
      setCategory("");
    }
  }

  return (
    <div className="left-container">
      <div className="menu-button-container">
        <div
          className="menu-icon-container white-bg"
          onClick={props.toggleLeftContainer}
        >
          <i className="material-icons menu-icon">menu_outlined</i>
        </div>
      </div>

      <div className="categories-container">
      <ul >
          {
              getDefaultCategories(props.importantTasks).map((category, index) => {
                return (
                    <CategoryListItem
                    category={category}
                    key={category._id}
                    switchCategory={props.switchTab}
                  />
                );
              })
          } 
          <li></li>
          {
            props.categories.map((category, index) => {
              return (
                <CategoryListItem
                  category={category}
                  key={category._id}
                  switchCategory={props.switchCategory}
                />
              );
            })
          }
          </ul>
      </div>

      <div className="new-list-container">
        <i className="material-icons add-icon blue-icon">add</i>
        <input
          className="new-list-input-box new-list"
          type="text"
          value={category}
          placeholder="New List"
          onClick={() => props.showShedulingIcons(false)}
          onChange={(event) => setCategory(event.target.value)}
          onKeyUp={addCategory}
        />
        <i className="material-icons add-icon blue-icon note-add-icon">
          note_add_outlined
        </i>
      </div>

      <div className="left-bottom-container">
        {bottomIcons.map((icon, index) => {
        return (
            <i className="material-icons left-bottom-icons grey-red-bg" key={index}>{icon}</i>
        );
      })}</div>
    </div>
  );
}

export default Categories;
