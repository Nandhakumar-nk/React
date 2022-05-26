import React from "react";

import { connect } from "react-redux";

import { ITask } from "../StepTasks";

import TaskElement from "../TaskElement";
import { IState } from "../../store";

import "./styles.scss";

interface ITasksContainerState {
  completedTasksDisplay: boolean;
}

interface ITasksContainerProps {
  tasks: ITask[];
  completedTasks: ITask[];
}

class TasksContainer extends React.Component<
  ITasksContainerProps,
  ITasksContainerState
> {
  constructor(props: ITasksContainerProps) {
    super(props);
    this.state = { completedTasksDisplay: true };
    this.toggleCompletedTasks = this.toggleCompletedTasks.bind(this);
  }

  toggleCompletedTasks() {
    this.setState({ completedTasksDisplay: !this.state.completedTasksDisplay });
  }

  render() {
    let completedTasksCount = 0;
    const elements = [];
    let reversedIndex = this.props.tasks.length - 1;

    for (; reversedIndex >= 0; reversedIndex--) {
      elements.push(
        <TaskElement
          task={this.props.tasks[reversedIndex]}
          key={this.props.tasks[reversedIndex]._id}
        />
      );
    }

    if (this.props.completedTasks.length > 0) {
      reversedIndex = this.props.completedTasks.length - 1;
      elements.push(
        <div className="empty-task" key="completedTitle">
          <i
            className={
              (this.state.completedTasksDisplay
                ? "fa fa-angle-down"
                : "fa fa-angle-right") + " dropdown-icon"
            }
            onClick={this.toggleCompletedTasks}
          ></i>
          <span className="completed-heading">Completed</span>
          <span className="completed-count">
            {this.props.completedTasks.length}
          </span>
        </div>
      );
      completedTasksCount = 1;

      if (this.state.completedTasksDisplay) {
        for (; reversedIndex >= 0; reversedIndex--) {
          elements.push(
            <TaskElement
              task={this.props.completedTasks[reversedIndex]}
              key={this.props.completedTasks[reversedIndex]._id}
            />
          );
        }
        completedTasksCount += this.props.completedTasks.length;
      }
    }

    for (
      let tasksLength = this.props.tasks.length + completedTasksCount;
      tasksLength < 7;
      tasksLength++
    ) {
      elements.push(
        <div className="empty-task" key={tasksLength.toString()}></div>
      );
    }

    return <div className="tasks-container">{elements}</div>;
  }

  componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - TasksContainer");
    console.log("tasks:");
    console.log(this.props.tasks);
    console.log("completedTasks:");
    console.log(this.props.completedTasks);
  }

  componentDidUpdate() {
    console.log("\ncomponentDidUpdate() lifecycle - TasksContainer");
    console.log("tasks:");
    console.log(this.props.tasks);
    console.log("completedTasks:");
    console.log(this.props.completedTasks);
  }
}

const mapStateToProps = (state: IState) => ({
  tasks: state.tasks,
  completedTasks: state.completedTasks,
});

export default connect(mapStateToProps)(TasksContainer);
