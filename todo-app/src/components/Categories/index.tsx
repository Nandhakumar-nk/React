import React from "react";

import { connect } from "react-redux";

import { CategoryListItem } from "../CategoryListItem";
import { ITask } from "../StepTasks";

import { IState } from "../../store";
import { ACTION_TYPES } from "../../constants/actionTypes";
import { categoryAdded } from "../../actions/categories/categoryAdded";
import { defaultCategoryClicked } from "../../actions/categories/defaultCategoryClicked";
import { dynamicCategoryClicked } from "../../actions/categories/dynamicCategoryClicked";
import { inputBoxFocused } from "../../actions/categories/inputBoxFocused";

import "./styles.scss";

export interface ICategory {
  _id: string;
  title: string;
  tasks: ITask[];
  iconName?: string;
  textColor?: string;
}

interface ICategoriesState {
  category: string;
}

interface ICategoriesProps {
  categories: ICategory[];
  importantTasks: ITask[];
  categoryAdded: (categoryName: string) => void;
  defaultCategoryClicked: (categoryTitle: string) => void;
  dynamicCategoryClicked: (categoryId: string) => void;
  inputBoxFocused: (displayShedulingIcons: boolean) => void;
  menuButtonClicked: () => void;
}

function getDefaultCategories(importantTasks: ITask[]) {
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
      textColor: "green-icon",
    },
    {
      _id: "Tasks",
      title: "Tasks",
      tasks: [],
      iconName: "home_outlined",
      textColor: "blue-icon",
    },
  ];

  return categories;
}

class Categories extends React.Component<ICategoriesProps, ICategoriesState> {
  bottomIcons = [
    "email_outlined",
    "date_range_outlined",
    "people_alt_outlined",
    "attach_file_outlined",
    "done_outline_outlined",
  ];

  constructor(props: ICategoriesProps) {
    super(props);
    this.state = { category: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.state.category.length > 0) {
      console.log("category submitted:" + this.state.category);
      this.props.categoryAdded(this.state.category);
      this.setState({ category: "" });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("category:" + this.state.category);
    this.setState({ category: event.target.value });
  }

  render() {
    return (
      <div className="left-container">
        <div className="menu-button-container">
          <div
            className="menu-icon-container white-bg"
            onClick={this.props.menuButtonClicked}
          >
            <i className="material-icons menu-icon">menu_outlined</i>
          </div>
        </div>
        <div className="scrollable-container">
          <ul>
            {getDefaultCategories(this.props.importantTasks).map(
              (category, index) => {
                return (
                  <CategoryListItem
                    category={category}
                    key={category._id}
                    switchCategory={this.props.defaultCategoryClicked}
                  />
                );
              }
            )}
            <li></li>
            {this.props.categories.map((category, index) => {
              return (
                <CategoryListItem
                  category={category}
                  key={category._id}
                  switchCategory={this.props.dynamicCategoryClicked}
                />
              );
            })}
          </ul>
        </div>

        <div className="new-list-container">
          <i className="material-icons add-icon blue-icon">add</i>
          <input
            className="new-list-input-box new-list"
            type="text"
            placeholder="New List"
            onChange={this.handleChange}
            onClick={() => this.props.inputBoxFocused(false)}
            onKeyUp={this.handleSubmit}
          />
          <i className="material-icons add-icon blue-icon note-add-icon">
            note_add_outlined
          </i>
        </div>

        <div className="left-bottom-container">
          {this.bottomIcons.map((icon, index) => {
            return (
              <i
                className="material-icons left-bottom-icons grey-red-bg"
                key={index}
              >
                {icon}
              </i>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - Categories");
    console.log("categories:");
    console.log(this.props.categories);
    console.log("importantTasks:" + this.props.importantTasks);
    console.log(this.props.importantTasks);
  }

  componentDidUpdate() {
    console.log("\ncomponentDidUpdate() lifecycle - Categories");
    console.log("categories:");
    console.log(this.props.categories);
    console.log("importantTasks:" + this.props.importantTasks);
    console.log(this.props.importantTasks);
  }
}

const mapStateToProps = (state: IState) => ({
  categories: state.categories,
  importantTasks: state.importantTasks,
  displayLeftContainer: state.displayRightContainer,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  categoryAdded: (categoryName: string) =>
    dispatch(categoryAdded(categoryName)),
  defaultCategoryClicked: (categoryTitle: string) =>
    dispatch(defaultCategoryClicked(categoryTitle)),
  dynamicCategoryClicked: (categoryId: string) =>
    dispatch(dynamicCategoryClicked(categoryId)),
  inputBoxFocused: (displayShedulingIcons: boolean) =>
    dispatch(inputBoxFocused(displayShedulingIcons)),
  menuButtonClicked: () => dispatch({ type: ACTION_TYPES.MENU_BUTTON_CLICKED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
