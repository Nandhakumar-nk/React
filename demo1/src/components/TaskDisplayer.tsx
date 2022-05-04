import React, { useState } from "react";

import { ITask } from "./StepTasks";

interface ICommonTasksProps {
  markAsImportant: (_id: string, isImportant: boolean) => void;
  markAsCompleted: (_id: string, isCompleted: boolean) => void;
  switchTask: (_id: string) => void;
}

interface ITaskElementProps extends ICommonTasksProps {
  task: ITask;
  key: string;
}

interface ITasksContainerProps extends ICommonTasksProps {
  tasks: ITask[];
  completedTasks: ITask[];
}

interface ITaskDisplayerProps extends ICommonTasksProps, ITasksContainerProps {
  categoryTitle: string;
  addTask: (task: string) => void;
  displayLeftContainer: boolean;
  toggleLeftContainer: () => void;
  showShedulingIcons: (displayShedulingIcons: boolean) => void;
  displayShedulingIcons: boolean;
}

interface ITaskDisplayerState {
  task: string;
}

function ShedulingIcons() {
  return (
    <div className="add-task-bottom-container " id="taskBottomContainer">
      <div className="task-bottom-icons-container grey-red-bg">
        <i className="material-icons middle-bottom-icons">
          date_range_outlined
        </i>
      </div>

      <div className="task-bottom-icons-container grey-red-bg">
        <i className="material-icons middle-bottom-icons">
          notifications_outlined
        </i>
      </div>

      <div className="task-bottom-icons-container grey-red-bg">
        <i className="material-icons middle-bottom-icons">
          event_repeat_outlined
        </i>
      </div>
    </div>
  );
}

function TaskElement(props: ITaskElementProps) {
  const taskId = props.task._id;
  const isImportant = props.task.isImportant;
  const isCompleted = props.task.isCompleted;
  const completedStepTasks = props.task.stepTasks.filter(
    (stepTask) => stepTask.isCompleted === true
  );

  return (
    <div className="task" onClick={() => props.switchTask(taskId)}>
      <div className="radio-container">
        <span
          className="material-icons add-icon radio-icon blue-icon"
          onClick={() => props.markAsCompleted(taskId, isCompleted)}
          title={isCompleted ? "undo completed" : "mark as completed"}
        >
          {isCompleted ? "check_circle" : "radio_button_unchecked_outlined"}
        </span>
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
      <div className="star-container">
        <span
          className={
            "material-icons list-icons" + (isImportant ? " blue-icon" : "")
          }
          onClick={() => props.markAsImportant(taskId, isImportant)}
          title={isImportant ? "remove from important" : "mark as important"}
        >
          {isImportant ? "star" : "star_border"}
        </span>
      </div>
    </div>
  );
}

function TasksContainer(props: ITasksContainerProps) {
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

class TaskDisplayer extends React.Component<
  ITaskDisplayerProps,
  ITaskDisplayerState
> {
  constructor(props: ITaskDisplayerProps) {
    super(props);
    this.state = {
      task: "",
    };
    this.addTask = this.addTask.bind(this);
  }

  addTask(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.state.task.length > 0) {
      this.props.addTask(this.state.task);
      this.setState({ task: "" });
    }
  }

  render() {
    return (
      <div className="middle-container-full">
        <div className="my-day-container">
          {!this.props.displayLeftContainer ? (
            <div
              className="menu-icon-middle white-bg"
              onClick={this.props.toggleLeftContainer}
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
            value={this.state.task}
            placeholder="Add a task"
            onClick={() => this.props.showShedulingIcons(true)}
            onChange={(event) => this.setState({ task: event.target.value })}
            onKeyUp={this.addTask}
          />

          {this.props.displayShedulingIcons ? <ShedulingIcons /> : ""}
        </div>

        <TasksContainer
          tasks={this.props.tasks}
          completedTasks={this.props.completedTasks}
          markAsImportant={this.props.markAsImportant}
          markAsCompleted={this.props.markAsCompleted}
          switchTask={this.props.switchTask}
        />
      </div>
    );
  }
}

export default TaskDisplayer;
