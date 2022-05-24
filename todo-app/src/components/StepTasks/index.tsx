import React from "react";

import { connect } from "react-redux";
import axios from "axios";

import { MenuListItem } from "../MenuListItem";
import { RightMenuBox } from "../RightMenuBox";

import { IState } from "../../store";
import { toggleRightContainer } from "../../actions/toggleDisplay/toggleRightContainer";

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

interface IStepTasksState {}

interface IStepTasksProps {
  currentTask: ITask;
  toggleRightContainer: (displayRightContainer: boolean) => void;
}

class StepTasks extends React.Component<IStepTasksProps, IStepTasksState> {
  inputBox: React.RefObject<HTMLInputElement>;

  constructor(props: IStepTasksProps) {
    super(props);
    this.inputBox = React.createRef();
  }

  async addStepTask(stepTask: string): Promise<void> {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3030/stepTasks",
        data: {
          taskId: this.props.currentTask._id,
          stepTask,
        },
      });

      //this.switchTask(this.state.currentTask._id); fetch task for current task ID
      //fetch category for selectedCategoryID
      //refreshCategories(fetch all categories + importantTasks)
    } catch (error) {
      console.log("error ocurred during stepTask posting");
    }
  }

  handleSubmit(this: any, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.inputBox.current.value.length > 0) {
      this.addStepTask(this.inputBox.current.value);
      this.inputBox.current.value = "";
    }
  }

  async markAsImportant(taskId: string, isImportant: boolean) {
    try {
      const response = await axios({
        method: "patch",
        url: "http://localhost:3030/tasks/" + taskId,
        data: {
          isImportant: !isImportant,
        },
      });
      //state.currentTask = response.data //fetched task
      //fetch category for selectedCategoryID
      //refreshCategories(fetch all categories + importantTasks)
    } catch (error) {
      console.log("error ocurred during important posting");
    }
  }

  async markAsCompleted(taskId: string, isCompleted: boolean) {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/tasks/" + taskId,
        data: {
          isCompleted: !isCompleted,
        },
      });
      //state.currentTask = response.data //fetched task
      //fetch category for selectedCategoryID
      //refreshCategories(fetch all categories + importantTasks)
    } catch (error) {
      console.log("error ocurred during completed posting");
    }
  }

  async markAsCompletedStepTask(stepTaskId: string, isCompleted: boolean) {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/stepTasks/" + stepTaskId,
        data: {
          isCompleted: !isCompleted,
        },
      });
      //fetch task(currentTask._id)
      //fetch category for selectedCategoryID
      //refreshCategories(fetch all categories + importantTasks)
    } catch (error) {
      console.log("error ocurred during completed stepTask posting");
    }
  }

  render() {
    return (
      <div className="right-container">
        <div className="right-top-container">
          <ul className="right-menu-container">
            <MenuListItem
              item={{
                icon: this.props.currentTask.isCompleted
                  ? "check_circle"
                  : "radio_button_unchecked_outlined",
                iconClass: " blue-icon radio-icon",
                iconEvent: () => {
                  this.markAsCompleted(
                    this.props.currentTask._id,
                    this.props.currentTask.isCompleted
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
                  this.markAsImportant(
                    this.props.currentTask._id,
                    this.props.currentTask.isImportant
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
                      this.markAsCompletedStepTask(
                        stepTask._id,
                        stepTask.isCompleted
                      );
                    },
                    text: stepTask.stepTask,
                    textClass: stepTask.isCompleted ? " text-strike" : "",
                    secondIcon: "close_outlined",
                    secondIconClass: "close-icon",
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
                onKeyUp={this.handleSubmit}
                ref={this.inputBox}
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
            items={[{ icon: "local_offer_outlined", text: "Pick a category" }]}
          />

          <RightMenuBox
            items={[{ icon: "attach_file_outlined", text: "Add file" }]}
          />

          <div className="right-menu-container empty-container">
            <span className="updated-text">Updated a few seconds ago</span>
          </div>
        </div>

        <div className="right-bottom-container">
          <i
            className="material-icons hide-icon"
            onClick={() => this.props.toggleRightContainer(false)}
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
  toggleRightContainer: (displayRightContainer: boolean) =>
    dispatch(toggleRightContainer(displayRightContainer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTasks);
