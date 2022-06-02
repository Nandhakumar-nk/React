import React from "react";

import { connect } from "react-redux";

import { CategoryListItem } from "../CategoryListItem";
import { ITask } from "../StepTasks";
import { LoaderComponent } from "../LoaderComponent";

import { IState } from "../../store";
import { ACTION_TYPES } from "../../constants/actionTypes";
import {
  createCategoryRequest,
  fetchDefaultCategoryRequest,
  fetchCategoryRequest,
  inputBoxFocused,
} from "../../actions/categories";
import { getDefaultCategories } from "../../helpers/getDefaultCategories";

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
  isCategoriesLoading: boolean;
  createCategoryRequest: (categoryName: string) => void;
  fetchDefaultCategoryRequest: (categoryTitle: string) => void;
  fetchCategoryRequest: (categoryId: string) => void;
  inputBoxFocused: (displayShedulingIcons: boolean) => void;
  menuButtonClicked: () => void;
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
      this.props.createCategoryRequest(this.state.category);
      this.setState({ category: "" });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
        <div className="categories-container">
          <div className="scrollable-container">
            <ul>
              {getDefaultCategories(this.props.importantTasks).map(
                (category, index) => {
                  return (
                    <CategoryListItem
                      category={category}
                      key={category._id}
                      switchCategory={this.props.fetchDefaultCategoryRequest}
                    />
                  );
                }
              )}
              <li></li>
              {this.props.isCategoriesLoading ? (
                <LoaderComponent height="30" width="30" />
              ) : (
                <React.Fragment>
                  {this.props.categories.map((category, index) => {
                    return (
                      <CategoryListItem
                        category={category}
                        key={category._id}
                        switchCategory={this.props.fetchCategoryRequest}
                      />
                    );
                  })}
                </React.Fragment>
              )}
            </ul>
          </div>

          <div className="new-list-container">
            <i className="material-icons add-icon blue-icon">add</i>
            <input
              className="new-list-input-box new-list"
              type="text"
              placeholder="New List"
              value={this.state.category}
              onChange={this.handleChange}
              onClick={() => this.props.inputBoxFocused(false)}
              onKeyUp={this.handleSubmit}
            />
            <i className="material-icons add-icon blue-icon note-add-icon">
              note_add_outlined
            </i>
          </div>
        </div>

        <div className="left-bottom-container">
          {this.bottomIcons.map((icon, index) => {
            let iconColor = icon === "done_outline_outlined" ? "blue-icon" : "";
            return (
              <i
                className={
                  "material-icons left-bottom-icons grey-red-bg " + iconColor
                }
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
}

const mapStateToProps = (state: IState) => ({
  categories: state.categories,
  importantTasks: state.importantTasks,
  displayLeftContainer: state.displayRightContainer,
  isCategoriesLoading: state.isCategoriesLoading,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  createCategoryRequest: (categoryName: string) =>
    dispatch(createCategoryRequest(categoryName)),
  fetchDefaultCategoryRequest: (categoryTitle: string) =>
    dispatch(fetchDefaultCategoryRequest(categoryTitle)),
  fetchCategoryRequest: (categoryId: string) =>
    dispatch(fetchCategoryRequest(categoryId)),
  inputBoxFocused: (displayShedulingIcons: boolean) =>
    dispatch(inputBoxFocused(displayShedulingIcons)),
  menuButtonClicked: () => dispatch({ type: ACTION_TYPES.MENU_BUTTON_CLICKED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
