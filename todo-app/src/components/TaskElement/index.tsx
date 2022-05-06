import React from "react";
import { ITask } from "../StepTasks";
import { ICommonTasksProps } from "../TaskDisplayer";


import "./styles.scss";

export interface ITaskElementProps extends ICommonTasksProps {
  task: ITask;
  key: string;
}

export function TaskElement(props: ITaskElementProps) {
  const taskId = props.task._id;
  const isImportant = props.task.isImportant;
  const isCompleted = props.task.isCompleted;
  const completedStepTasks = props.task.stepTasks.filter(
    (stepTask) => stepTask.isCompleted === true
  );

  return (
    <div className="task" onClick={() => props.switchTask(taskId)}>
      <div className="radio-container">
        <i
          className="material-icons add-icon radio-icon blue-icon"
          onClick={() => props.markAsCompleted(taskId, isCompleted)}
          title={isCompleted ? "undo completed" : "mark as completed"}
        >
          {isCompleted ? "check_circle" : "radio_button_unchecked_outlined"}
        </i>
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
        onClick={() => props.markAsImportant(taskId, isImportant)}
        title={isImportant ? "remove from important" : "mark as important"}
      >
        {isImportant ? "star" : "star_border"}
      </i>
    </div>
  );
}
