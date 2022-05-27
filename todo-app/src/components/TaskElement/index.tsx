import React from "react";

import { connect } from "react-redux";

import { ITask } from "../StepTasks";
import {
  taskCompletedIconClicked,
  taskImportantIconClicked,
} from "../../actions/stepTasks";
import { taskClicked } from "../../actions/taskElement";

import "./styles.scss";

interface ITaskElementState {}

interface ITaskElementProps {
  task: ITask;
  key: string;
  taskClicked: (taskId: string) => void;
  taskImportantIconClicked: (taskId: string, isImportant: boolean) => void;
  taskCompletedIconClicked: (taskId: string, isCompleted: boolean) => void;
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
      <div className="task" onClick={() => this.props.taskClicked(taskId)}>
        <div className="radio-container">
          <i
            className={
              (isCompleted ? "fa fa-check-circle" : "fa fa-circle-thin") +
              " add-icon radio-icon blue-icon"
            }
            onClick={(event) => {
              event.stopPropagation();
              this.props.taskCompletedIconClicked(taskId, !isCompleted);
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
            this.props.taskImportantIconClicked(taskId, !isImportant);
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
  taskClicked: (taskId: string) => dispatch(taskClicked(taskId)),
  taskImportantIconClicked: (taskId: string, isImportant: boolean) =>
    dispatch(taskImportantIconClicked(taskId, isImportant)),
  taskCompletedIconClicked: (taskId: string, isCompleted: boolean) =>
    dispatch(taskCompletedIconClicked(taskId, isCompleted)),
});

export default connect(null, mapDispatchToProps)(TaskElement);
