import React, { useState } from "react";
import { ICommonTasksProps } from "../TaskDisplayer";
import { ITask } from "../StepTasks";
import { TaskElement } from "../TaskElement";


import "./styles.scss";


export interface ITasksContainerProps extends ICommonTasksProps {
  tasks: ITask[];
  completedTasks: ITask[];
}

export function TasksContainer(props: ITasksContainerProps) {
  const [shouldDisplay, toggleDisplay] = useState(true);
  let completedTasksCount = 0;
  const elements = [];
  let reversedIndex = props.tasks.length - 1;

  for (; reversedIndex >= 0; reversedIndex--) {
    elements.push(
      <TaskElement
        task={props.tasks[reversedIndex]}
        markAsImportant={props.markAsImportant}
        markAsCompleted={props.markAsCompleted}
        switchTask={props.switchTask}
        key={props.tasks[reversedIndex]._id}
      />
    );
  }

  if (props.completedTasks.length > 0) {
    reversedIndex = props.completedTasks.length - 1;
    elements.push(
      <div className="empty-task" key="completedTitle">
        <i
          className={
            (shouldDisplay ? "fa fa-angle-down" : "fa fa-angle-right") +
            " dropdown-icon"
          }
          onClick={() => toggleDisplay(!shouldDisplay)}
        ></i>
        <span className="completed-heading">Completed</span>
        <span className="completed-count">{props.completedTasks.length}</span>
      </div>
    );
    completedTasksCount = 1;

    if (shouldDisplay) {
      for (; reversedIndex >= 0; reversedIndex--) {
        elements.push(
          <TaskElement
            task={props.completedTasks[reversedIndex]}
            markAsImportant={props.markAsImportant}
            markAsCompleted={props.markAsCompleted}
            switchTask={props.switchTask}
            key={props.completedTasks[reversedIndex]._id}
          />
        );
      }
      completedTasksCount += props.completedTasks.length;
    }
  }

  for (
    let tasksLength = props.tasks.length + completedTasksCount;
    tasksLength < 9;
    tasksLength++
  ) {
    elements.push(
      <div className="empty-task" key={tasksLength.toString()}></div>
    );
  }

  return <div className="tasks-container">{elements}</div>;
}
