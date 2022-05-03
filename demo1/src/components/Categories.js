import React from "react";

function DefaultCategories(props) {
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
    console.log("icon tasks length:" + category.text + category.tasks.length);
    const text = category.text;
    console.log("icon tasks text:" + text);
    return (
      <li
        className={category.color}
        key={index}
        onClick={() => {
          console.log("text:" + text);
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

function DynamicCategories(props) {
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

function CategoryListItem(props) {
  const uncompletedTasks = props.category.tasks.filter(
    (task) => task.isCompleted === false
  );
  return (
    <li onClick={() => props.switchCategory(props.category._id)}>
      <span className="material-icons list-icons blue-icon">list_outlined</span>
      {props.category.title}
      <span className="task-count" id={props.categoryName + "list"}>
        {uncompletedTasks.length > 0 ? uncompletedTasks.length : ""}
      </span>
    </li>
  );
}

class NewCategoryAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    };
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(event) {
    console.log("category:" + event.target.value);

    if (event.keyCode === 13 && event.target.value.length > 0) {
      console.log(
        "inside addCategory 1-Category-------------------------------"
      );
      this.props.addCategory(event.target.value);
      console.log("inside addCategory 2-Category-----------------------------");
      this.setState({ category: "" });
      console.log(
        "inside addCategory 3-Category---------------------------------"
      );
    }
  }

  render() {
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
            value={this.state.category}
            placeholder="New List"
            onClick={() => this.props.showShedulingIcons(false)}
            onChange={(event) =>
              this.setState({ category: event.target.value })
            }
            onKeyUp={this.addCategory}
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
        className="left-bottom-icons-container grey-red-bg"
        key={index}
      >
        <i className="material-icons left-bottom-icons">{icon}</i>
      </div>
    );
  });

  return <div className="left-bottom-container">{elements}</div>;
}

function Categories(props) {
  console.log("categories --- imporatnt tasks:" + props.importantTasks.length);
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
