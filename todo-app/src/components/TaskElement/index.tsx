import React from "react";

import { connect } from "react-redux";

import { ITask } from "../StepTasks";
import {
  markAsCompletedTaskRequest,
  markAsImportantTaskRequest,
} from "../../actions/stepTasks";
import { fetchTaskRequest } from "../../actions/taskElement";

import "./styles.scss";

interface ITaskElementState {}

interface ITaskElementProps {
  task: ITask;
  key: string;
  fetchTaskRequest: (taskId: string) => void;
  markAsImportantTaskRequest: (taskId: string, isImportant: boolean) => void;
  markAsCompletedTaskRequest: (taskId: string, isCompleted: boolean) => void;
}

class TaskElement extends React.Component<
  ITaskElementProps,
  ITaskElementState
> {
  constructor(props: ITaskElementProps) {
    super(props);
  }

  render() {
    const taskId = this.props.task._id;
    const isImportant = this.props.task.isImportant;
    const isCompleted = this.props.task.isCompleted;
    const completedStepTasks = this.props.task.stepTasks.filter(
      (stepTask) => stepTask.isCompleted === true
    );

    return (
      <div className="task" onClick={() => this.props.fetchTaskRequest(taskId)}>
        <div className="radio-container">
          <i
            className={
              (isCompleted ? "fa fa-check-circle" : "fa fa-circle-thin") +
              " radio-icon blue-icon"
            }
            onClick={(event) => {
              event.stopPropagation();
              this.props.markAsCompletedTaskRequest(taskId, !isCompleted);
            }}
            title={isCompleted ? "undo completed" : "mark as completed"}
          >
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
          onClick={(event) => {
            event.stopPropagation();
            this.props.markAsImportantTaskRequest(taskId, !isImportant);
          }}
          title={isImportant ? "remove from important" : "mark as important"}
        >
          {isImportant ? "star" : "star_border"}
        </i>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  fetchTaskRequest: (taskId: string) => dispatch(fetchTaskRequest(taskId)),
  markAsImportantTaskRequest: (taskId: string, isImportant: boolean) =>
    dispatch(markAsImportantTaskRequest(taskId, isImportant)),
  markAsCompletedTaskRequest: (taskId: string, isCompleted: boolean) =>
    dispatch(markAsCompletedTaskRequest(taskId, isCompleted)),
});

export default connect(null, mapDispatchToProps)(TaskElement);
