import React from "react";

import { connect } from "react-redux";

import TasksContainer from "../TasksContainer";
import { BoxedIcon } from "../BoxedIcon";

import { IState } from "../../store";
import { ACTION_TYPES } from "../../constants/actionTypes";
import { createTaskRequest } from "../../actions/taskDisplayer";
import { inputBoxFocused } from "../../actions/categories";

import "./styles.scss";

interface ITaskDisplayerState {
  task: string;
}

interface ITaskDisplayerProps {
  categoryTitle: string;
  selectedCategoryId: string;
  displayLeftContainer: boolean;
  displayShedulingIcons: boolean;
  createTaskRequest: (categoryId: string, task: string) => void;
  inputBoxFocused: (displayShedulingIcons: boolean) => void;
  menuButtonClicked: () => void;
}

class TaskDisplayer extends React.Component<
  ITaskDisplayerProps,
  ITaskDisplayerState
> {
  constructor(props: ITaskDisplayerProps) {
    super(props);
    this.state = { task: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(this: any, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.state.task.length > 0) {
      this.props.createTaskRequest(this.props.selectedCategoryId, this.state.task);
      this.setState({ task: "" });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ task: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="my-day-container">
          {!this.props.displayLeftContainer ? (
            <div
              className="menu-icon-container menu-icon-middle white-bg"
              onClick={this.props.menuButtonClicked}
            >
              <i className="material-icons menu-icon">menu_outlined</i>
            </div>
          ) : (
            ""
          )}

          <div className="my-day-left-container">
            <span className="my-day"> {this.props.categoryTitle}</span>
            <i className="material-icons more-icon">more_horiz_outlined</i>
            {this.props.categoryTitle === "My Day" ? (
              <div className="date-container">
                <p className="today-date" id="todayDate">
                  Wednesday, April 13
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="my-day-right-container">
            <i className="material-icons sort-icon">import_export</i>
            <span className="sort-text"> Sort</span>
            <i className="material-icons bulb-icon">lightbulb_outlined</i>
            <span className="sort-text"> Suggestions</span>
          </div>
        </div>

        <div className="add-task-container">
          <div className="add-icon-container-middle">
            <i className="material-icons add-icon-middle">add</i>
          </div>

          <input
            className="add-task-input-box"
            type="text"
            placeholder="Add a task"
            value={this.state.task}
            onChange={this.handleChange}
            onClick={() => this.props.inputBoxFocused(true)}
            onKeyUp={this.handleSubmit}
          />

          {this.props.displayShedulingIcons ? (
            <div className="add-task-bottom-container">
              {[
                "date_range_outlined",
                "notifications_outlined",
                "event_repeat_outlined",
              ].map((icon, index) => {
                return (
                  <BoxedIcon
                    divClass="sheduling-icons-container grey-red-bg"
                    iconClass="material-icons middle-bottom-icons"
                    materialIcon={icon}
                    key={index}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        <TasksContainer />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  categoryTitle: state.categoryTitle,
  selectedCategoryId: state.selectedCategoryId,
  displayLeftContainer: state.displayLeftContainer,
  displayShedulingIcons: state.displayShedulingIcons,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  createTaskRequest: (categoryId: string, task: string) =>
    dispatch(createTaskRequest(categoryId, task)),
  inputBoxFocused: (displayShedulingIcons: boolean) =>
    dispatch(inputBoxFocused(displayShedulingIcons)),
  menuButtonClicked: () => dispatch({ type: ACTION_TYPES.MENU_BUTTON_CLICKED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDisplayer);
