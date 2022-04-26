import React, { useEffect, useState } from "react";

import { post, get } from "../api-functions/api-functions";

function DefaultCategories() {
  const icons = [
    { name: "light_mode_outlined", color: "", text: "My Day" },
    { name: "star_border", color: "", text: "Important" },
    { name: "event_outlined", color: "", text: "Planned" },
    { name: "person_outline", color: " green-icon", text: "Assigned to me" },
    { name: "home_outlined", color: " blue-icon", text: "Tasks" },
  ];
  const elements = icons.map((icon, index) => {
    return (
      <li className={"left-top-menu-list" + icon.color} key={index}>
        <i className="material-icons list-icons">{icon.name}</i>
        <span>{icon.text}</span>
      </li>
    );
  });

  return (
    <div className="left-menu-container">
      <ul className="menu-list">{elements}</ul>
    </div>
  );
}

function DynamicCategories(props) {
  const elements = props.categories.map((category, index) => {
    return (
      <CategoryListItem categoryName={category.title} key={category._id} />
    );
  });

  return (
    <div>
      <ul className="dynamic-list-left">{elements}</ul>
    </div>
  );
}

function CategoryListItem(props) {
  return (
    //<li onClick={displayListTasks}>
    <li>
      <span className="material-icons list-icons blue-icon">list_outlined</span>
      {props.categoryName}
      <span
        className="task-count"
        value="0"
        id={props.categoryName + "list"}
      ></span>
    </li>
  );
}

class NewCategoryAdder extends React.Component {
  render() {
    return (
      <div className="new-list-container">
        <div className="new-list-left-container">
          <div className="add-icon-container">
            <i className="material-icons add-icon blue-icon">add</i>
          </div>
  
          <input
            className="new-list-input-box new-list"
            id = "newCategoryInputBox"
            type="text"
            placeholder="New List"
            onKeyUp={this.props.addCategory}
            onClick={this.props.toggleDisplay}
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
  
  componentDidUpdate() {
    document.getElementById("newCategoryInputBox").value = "";
  }
}

function BottomIcons(props) {
  const icons = [
    "email_outlined",
    "date_range_outlined",
    "people_alt_outlined",
    "attach_file_outlined",
    "done_outline_outlined",
  ];
  const elements = icons.map((icon, index) => {
    return (
      <div
        className={"left-bottom-icons-container " + "grey-red-bg"}
        key={index}
      >
        <i className="material-icons left-bottom-icons">{icon}</i>
      </div>
    );
  });

  return <div className="left-bottom-container">{elements}</div>;
}

function Categories(props) {
  // useEffect(async () => {
  //   function getCategories() {
  //     get("categories")
  //     .then((responseData) => {
  //       const elements = responseData.data.map((category, index) => {
  //         return <CategoryListItem categoryName={category.title} key={category._id}/>;
  //       });
  //       props.modifyCategories(elements)
  //     })
  //     .catch((error) => {
  //       console.log("get error");
  //     });
  //   }

  //   getCategories();
  // }, []);

  // function addCategory(event) {
  //   if (event.keyCode === 13 && event.target.value.length > 0) {
  //     const element = <CategoryListItem categoryName={event.target.value} />;

  //     post("categories", { title: event.target.value });
  //     setCategories([...categories, element]);
  //   }
  // }

  return (
    <div className="left-container">
      <div className="menu-button-container">
        <div className="menu-inner-container white-bg">
          <i className="material-icons menu-icon">menu_outlined</i>
        </div>
      </div>

      <div className="menu-added-items-container">
        <DefaultCategories />
        <DynamicCategories categories={props.categories} />
      </div>

      <NewCategoryAdder
        addCategory={props.addCategory}
        toggleDisplay={props.toggleDisplay}
      />

      <BottomIcons />
    </div>
  );
}

export default Categories;
