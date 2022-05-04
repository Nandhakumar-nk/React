import React, { useState } from "react";

import { ITask } from "./StepTasks";

interface IDefaultCategoriesProps {
  importantTasks: ITask[];
  switchTab: (text: string) => void;
}

export interface ICategory {
  _id: string;
  title: string;
  tasks: ITask[];
}

interface IDynamicCategoriesProps {
  categories: ICategory[];
  switchCategory: (categoryId: string) => void;
}

interface ICategoryListItemProps {
  category: ICategory;
  key: string;
  switchCategory: (categoryId: string) => void;
}

interface INewCategoryAdderProps {
  addCategory: (categoryName: string) => void;
  showShedulingIcons: (displayShedulingIcons: boolean) => void;
}

interface ICategoriesProps {
  categories: ICategory[];
  switchCategory: (categoryId: string) => void;
  importantTasks: ITask[];
  switchTab: (text: string) => void;
  toggleLeftContainer: () => void;
  addCategory: (categoryName: string) => void;
  showShedulingIcons: (displayShedulingIcons: boolean) => void;
}

function DefaultCategories(props: IDefaultCategoriesProps) {
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

function DynamicCategories(props: IDynamicCategoriesProps) {
  const elements = props.categories.map((category, index) => {
    return (
      <CategoryListItem
        category={category}
        key={category._id}
        switchCategory={props.switchCategory}
      />
    );
  });

  return (
    <div>
      <ul className="dynamic-list">{elements}</ul>
    </div>
  );
}

function CategoryListItem(props: ICategoryListItemProps) {
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

function NewCategoryAdder(props: INewCategoryAdderProps) {
  const [category, setCategory] = useState("");

  function addCategory(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && category.length > 0) {
      props.addCategory(category);
      setCategory("");
    }
  }
  return (
    <div className="new-list-container">
      <div className="new-list-left-container">
        <div className="add-icon-container">
          <i className="material-icons add-icon blue-icon">add</i>
        </div>

        <input
          className="new-list-input-box new-list"
          id="newCategoryInputBox"
          type="text"
          value={category}
          placeholder="New List"
          onClick={() => props.showShedulingIcons(false)}
          onChange={(event) => setCategory(event.target.value)}
          onKeyUp={addCategory}
        />
      </div>

      <div className="note-icon-container">
        <i className="material-icons add-icon blue-icon note-add-icon">
          note_add_outlined
        </i>
      </div>
    </div>
  );
}

function BottomIcons() {
  const icons = [
    "email_outlined",
    "date_range_outlined",
    "people_alt_outlined",
    "attach_file_outlined",
    "done_outline_outlined",
  ];
  const elements = icons.map((icon, index) => {
    return (
      <div className="left-bottom-icons-container grey-red-bg" key={index}>
        <i className="material-icons left-bottom-icons">{icon}</i>
      </div>
    );
  });

  return <div className="left-bottom-container">{elements}</div>;
}

function Categories(props: ICategoriesProps) {
  return (
    <div className="left-container">
      <div className="menu-button-container">
        <div
          className="menu-inner-container white-bg"
          onClick={props.toggleLeftContainer}
        >
          <i className="material-icons menu-icon">menu_outlined</i>
        </div>
      </div>

      <div className="menu-added-items-container">
        <DefaultCategories
          importantTasks={props.importantTasks}
          switchTab={props.switchTab}
        />
        <DynamicCategories
          categories={props.categories}
          switchCategory={props.switchCategory}
        />
      </div>

      <NewCategoryAdder
        addCategory={props.addCategory}
        showShedulingIcons={props.showShedulingIcons}
      />

      <BottomIcons />
    </div>
  );
}

export default Categories;
