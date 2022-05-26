import React from "react";

import { connect } from "react-redux";

import { ITask } from "../StepTasks";
import { taskCompletedClicked } from "../../actions/stepTasks/taskCompletedClicked";
import { taskImportantClicked } from "../../actions/stepTasks/taskImportantClicked";
import { taskClicked } from "../../actions/taskElement/taskClicked";

import "./styles.scss";

interface ITaskElementState {}

interface ITaskElementProps {
  task: ITask;
  key: string;
  taskClicked: (taskId: string) => void;
  taskImportantClicked: (taskId: string, isImportant: boolean) => void;
  taskCompletedClicked: (taskId: string, isCompleted: boolean) => void;
}

class TaskElement extends React.Component<
  ITaskElementProps,
  ITaskElementState
> {
  taskClicked: (taskId: string) => void;
  taskCompletedClicked: (taskId: string, isCompleted: boolean) => void;
  taskImportantClicked: (taskId: string, isImportant: boolean) => void;

  constructor(props: ITaskElementProps) {
    super(props);
    this.taskClicked = this.props.taskClicked.bind(this);
    this.taskCompletedClicked = this.props.taskCompletedClicked.bind(this);
    this.taskImportantClicked = this.props.taskImportantClicked.bind(this);
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
            className="material-icons add-icon radio-icon blue-icon"
            onClick={(event) => {
              event.stopPropagation();
              this.props.taskCompletedClicked(taskId, !isCompleted);
            }}
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
          onClick={(event) => {
            event.stopPropagation();
            this.props.taskImportantClicked(taskId, !isImportant);
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
  taskImportantClicked: (taskId: string, isImportant: boolean) =>
    dispatch(taskImportantClicked(taskId, isImportant)),
  taskCompletedClicked: (taskId: string, isCompleted: boolean) =>
    dispatch(taskCompletedClicked(taskId, isCompleted)),
});

export default connect(null, mapDispatchToProps)(TaskElement);
