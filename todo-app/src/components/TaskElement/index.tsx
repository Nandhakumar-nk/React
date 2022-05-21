import React from "react";

import axios from "axios";

import { ITask } from "../StepTasks";

import "./styles.scss";

interface ITaskElementState {}

interface ITaskElementProps {
  task: ITask;
  key: string;
}

export class TaskElement extends React.Component<
  ITaskElementProps,
  ITaskElementState
> {
  constructor(props: ITaskElementProps) {
    super(props);
    this.markAsImportant = this.markAsImportant.bind(this);
    this.markAsCompleted = this.markAsCompleted.bind(this);
    this.switchTask = this.switchTask.bind(this);
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

  async switchTask(taskId: string) {
    // this.setDisplayRightContainer(true);
    // this.showShedulingIcons(false);
    // try {
    //   const response = await axios.get("http://localhost:3030/tasks/" + taskId);
    //   this.currentTask = response.data;
    //   this.refreshTasks(this.state.selectedCategoryId);
    // } catch (error) {
    //   console.log("error ocurred during task fetching");
    // }
  }

  render() {
    const taskId = this.props.task._id;
    const isImportant = this.props.task.isImportant;
    const isCompleted = this.props.task.isCompleted;
    const completedStepTasks = this.props.task.stepTasks.filter(
      (stepTask) => stepTask.isCompleted === true
    );

    return (
      <div className="task" onClick={() => this.switchTask(taskId)}>
        <div className="radio-container">
          <i
            className="material-icons add-icon radio-icon blue-icon"
            onClick={() => this.markAsCompleted(taskId, isCompleted)}
            title={isCompleted ? "undo completed" : "mark as completed"}
          >
            {isCompleted ? "check_circle" : "radio_button_unchecked_outlined"}
          </i>
        </div>

        <div className={"tasks-text" + (isCompleted ? " text-strike" : "")}>
          {this.props.task.task}{" "}
          {this.props.task.stepTasks.length > 0 ? (
            <span className="step-task-count">
              {completedStepTasks.length +
                " of " +
                this.props.task.stepTasks.length}{" "}
            </span>
          ) : (
            ""
          )}
        </div>

        <i
          className={
            "material-icons list-icons star-container" +
            (isImportant ? " blue-icon" : "")
          }
          onClick={() => this.markAsImportant(taskId, isImportant)}
          title={isImportant ? "remove from important" : "mark as important"}
        >
          {isImportant ? "star" : "star_border"}
        </i>
      </div>
    );
  }
}
