import React from "react";

import { ShedulingIcons } from "./ShedulingIcons";
import { ITasksContainerProps, TasksContainer } from "./TasksContainer";

import './styles.scss';

export interface ICommonTasksProps {
  markAsImportant: (_id: string, isImportant: boolean) => void;
  markAsCompleted: (_id: string, isCompleted: boolean) => void;
  switchTask: (_id: string) => void;
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
      <div>
        <div className="my-day-container">
          {!this.props.displayLeftContainer ? (
            <div
              className="menu-icon-container menu-icon-middle white-bg"
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
