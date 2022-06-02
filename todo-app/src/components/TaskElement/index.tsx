import React from "react";

import { connect } from "react-redux";

import { ITask } from "../StepTasks";
import {
  markAsCompletedTaskRequest,
  markAsImportantTaskRequest,
} from "../../actions/stepTasks";
import { fetchTaskRequest } from "../../actions/taskElement";

import "./styles.scss";

interface ITaskElementProps {
  task: ITask;
  key: string;
  fetchTaskRequest: (taskId: string) => void;
  markAsImportantTaskRequest: (taskId: string, isImportant: boolean) => void;
  markAsCompletedTaskRequest: (taskId: string, isCompleted: boolean) => void;
}

function TaskElement(props: ITaskElementProps) {
  const taskId = props.task._id;
  const isImportant = props.task.isImportant;
  const isCompleted = props.task.isCompleted;
  const completedStepTasks = props.task.stepTasks.filter(
    (stepTask) => stepTask.isCompleted === true
  );

  return (
    <React.Fragment>
      <div className="task" onClick={() => props.fetchTaskRequest(taskId)}>
        <div className="radio-container">
          <i
            className={
              (isCompleted ? "fa fa-check-circle" : "fa fa-circle-thin") +
              " radio-icon blue-icon"
            }
            onClick={(event) => {
              event.stopPropagation();
              props.markAsCompletedTaskRequest(taskId, !isCompleted);
            }}
            title={isCompleted ? "undo completed" : "mark as completed"}
          ></i>
        </div>

        <div className={"tasks-text" + (isCompleted ? " text-strike" : "")}>
          {props.task.task}{" "}
          {props.task.stepTasks.length > 0 ? (
            <span className="step-task-count">
              {completedStepTasks.length + " of " + props.task.stepTasks.length}{" "}
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
            props.markAsImportantTaskRequest(taskId, !isImportant);
          }}
          title={isImportant ? "remove from important" : "mark as important"}
        >
          {isImportant ? "star" : "star_border"}
        </i>
      </div>
      <hr className="bottom-border" />
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  fetchTaskRequest: (taskId: string) => dispatch(fetchTaskRequest(taskId)),
  markAsImportantTaskRequest: (taskId: string, isImportant: boolean) =>
    dispatch(markAsImportantTaskRequest(taskId, isImportant)),
  markAsCompletedTaskRequest: (taskId: string, isCompleted: boolean) =>
    dispatch(markAsCompletedTaskRequest(taskId, isCompleted)),
});

export default connect(null, mapDispatchToProps)(TaskElement);
