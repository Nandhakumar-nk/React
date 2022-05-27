import React from "react";

import { connect } from "react-redux";

import { MenuListItem } from "../MenuListItem";
import { RightMenuBox } from "../RightMenuBox";

import { IState } from "../../store";
import { ACTION_TYPES } from "../../constants/actionTypes";
import {
  stepTaskAdded,
  taskImportantClicked,
  taskCompletedClicked,
  stepTaskCompletedClicked,
} from "../../actions/stepTasks";
import "./styles.scss";

interface IStepTask {
  _id: string;
  stepTask: string;
  isCompleted: boolean;
}

export interface ITask {
  _id: string;
  task: string;
  stepTasks: IStepTask[];
  isCompleted: boolean;
  isImportant: boolean;
}

interface IStepTasksState {
  stepTask: string;
}

interface IStepTasksProps {
  currentTask: ITask;
  stepTaskAdded: (taskId: string, stepTask: string) => void;
  taskImportantClicked: (taskId: string, isImportant: boolean) => void;
  taskCompletedClicked: (taskId: string, isCompleted: boolean) => void;
  stepTaskCompletedClicked: (stepTaskId: string, isCompleted: boolean) => void;
  hideIconClicked: () => void;
}

class StepTasks extends React.Component<IStepTasksProps, IStepTasksState> {
  constructor(props: IStepTasksProps) {
    super(props);
    this.state = { stepTask: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.state.stepTask.length > 0) {
      this.props.stepTaskAdded(this.props.currentTask._id, this.state.stepTask);
      this.setState({ stepTask: "" });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ stepTask: event.target.value });
  }

  render() {
    return (
      <div className="right-container">
        <div className="right-top-container">
          <div className="scrollable-container-right">
            <ul className="right-menu-container">
              <MenuListItem
                item={{
                  iconClass:
                    (this.props.currentTask.isCompleted
                      ? " fa fa-check-circle"
                      : " fa fa-circle-thin") + " blue-icon radio-icon",
                  icon: "f",
                  iconEvent: () => {
                    this.props.taskCompletedClicked(
                      this.props.currentTask._id,
                      !this.props.currentTask.isCompleted
                    );
                  },
                  text: this.props.currentTask.task,
                  textClass:
                    "task-right" +
                    (this.props.currentTask.isCompleted ? " text-strike" : ""),
                  secondIcon: this.props.currentTask.isImportant
                    ? "star"
                    : "star_border",
                  secondIconClass: this.props.currentTask.isImportant
                    ? "blue-icon"
                    : "",
                  secondIconEvent: () => {
                    this.props.taskImportantClicked(
                      this.props.currentTask._id,
                      !this.props.currentTask.isImportant
                    );
                  },
                }}
              />
              {this.props.currentTask.stepTasks.map((stepTask: IStepTask) => {
                return (
                  <MenuListItem
                    item={{
                      icon: stepTask.isCompleted
                        ? "check_circle"
                        : "radio_button_unchecked_outlined",
                      iconClass: " blue-icon completed-icon",
                      iconEvent: () => {
                        this.props.stepTaskCompletedClicked(
                          stepTask._id,
                          !stepTask.isCompleted
                        );
                      },
                      text: stepTask.stepTask,
                      textClass: stepTask.isCompleted ? " text-strike" : "",
                      secondIcon: "f",
                      secondIconClass: "fa fa-times-circle-o",
                      borderBottom: true,
                    }}
                  />
                );
              })}
              <li className="right-menu-list">
                <i className="material-icons right-icons add-icon blue-icon">
                  {" "}
                  add
                </i>
                <input
                  className="step-task-input-box new-list"
                  type="text"
                  placeholder="Add Step"
                  value={this.state.stepTask}
                  onChange={this.handleChange}
                  onKeyUp={this.handleSubmit}
                />
              </li>
            </ul>

            <RightMenuBox
              items={[{ icon: "light_mode_outlined", text: "Add to My Day" }]}
            />

            <RightMenuBox
              items={[
                {
                  icon: "notifications_outlined",
                  text: "Remind me",
                  borderBottom: true,
                },
                {
                  icon: "date_range_outlined",
                  text: "Add due date",
                  borderBottom: true,
                },
                { icon: "event_repeat_outlined", text: "Repeat" },
              ]}
            />

            <RightMenuBox
              items={[
                { icon: "local_offer_outlined", text: "Pick a category" },
              ]}
            />

            <RightMenuBox
              items={[{ icon: "attach_file_outlined", text: "Add file" }]}
            />

            <div className="right-menu-container empty-container">
              <span className="updated-text">Updated a few seconds ago</span>
            </div>
          </div>
        </div>

        <div className="right-bottom-container">
          <i
            className="material-icons hide-icon"
            onClick={this.props.hideIconClicked}
          >
            drive_file_move_outlined
          </i>
          <span className="created-text">Created Today</span>
          <i className="material-icons delete-icon">delete_outlined</i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currentTask: state.currentTask,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  stepTaskAdded: (taskId: string, stepTask: string) =>
    dispatch(stepTaskAdded(taskId, stepTask)),
  taskImportantClicked: (taskId: string, isImportant: boolean) =>
    dispatch(taskImportantClicked(taskId, isImportant)),
  taskCompletedClicked: (taskId: string, isCompleted: boolean) =>
    dispatch(taskCompletedClicked(taskId, isCompleted)),
  stepTaskCompletedClicked: (stepTaskId: string, isCompleted: boolean) =>
    dispatch(stepTaskCompletedClicked(stepTaskId, isCompleted)),
  hideIconClicked: () => dispatch({ type: ACTION_TYPES.HIDE_RIGHT_CONTAINER_ICON_CLICKED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTasks);
