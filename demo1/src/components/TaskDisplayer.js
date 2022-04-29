import React, { useState } from "react";

function ShedulingIcons(props) {
  console.log("sh " + props.display);
  return (
    <div
      className={"add-task-bottom-container " + "props.display"}
      id="taskBottomContainer"
    >
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

      <a href="#" className="add-button" id="addButton">
        Add
      </a>
    </div>
  );
}

//onClick={props.showRightContainer}
function TaskElement(props) {
  console.log("for task:" + JSON.stringify(props.task._id));
  console.log(typeof props.task._id);
  console.log("taskimp:" + props.task.isImportant);
  const taskId = props.task._id;
  const isImportant = props.task.isImportant;
  const isCompleted = props.task.isCompleted;

  return (
    <div className="task" onClick={()=>props.switchTask(taskId)}>
      <div className="radio-container">
        <span
          className="material-icons add-icon radio-icon blue-icon"
          onClick={() => props.markAsCompleted(taskId, isCompleted)}
          title={isCompleted ? "undo completed" : "mark as completed"}
        >
          {isCompleted ? "check_circle" : "radio_button_unchecked_outlined"}
        </span>
      </div>
      <div className="tasks-text">{props.task.task} </div>
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

function TasksContainer(props) {
  const [shouldDisplay, toggleDisplay] = useState(true);
  let completedTasksCount = 0;

  console.log("tasksContainer:" + props.tasks);
  const elements = [];
  let reversedIndex = props.tasks.length - 1;

  for (; reversedIndex >= 0; reversedIndex--) {
    elements.push(
      <TaskElement
        task={props.tasks[reversedIndex]}
        markAsImportant={props.markAsImportant}
        markAsCompleted={props.markAsCompleted}
        switchTask={props.switchTask}
      />
    );
  }

  if (props.completedTasks.length > 0) {
    reversedIndex = props.completedTasks.length - 1;
    elements.push(
      <div className="task">
        <i
          class={
            (shouldDisplay
              ? "fa fa-angle-down"
              : "fa fa-angle-right") + " dropdown-icon"
          }
          onClick={() => toggleDisplay(!shouldDisplay)}
        ></i>
        <span className="completed-heading">Completed</span>
        <span className="completed-count">{props.completedTasks.length}</span>
      </div>
    );
    completedTasksCount = 1;

    if(shouldDisplay) {
      for (; reversedIndex >= 0; reversedIndex--) {
        elements.push(
          <TaskElement
            task={props.completedTasks[reversedIndex]}
            markAsImportant={props.markAsImportant}
            markAsCompleted={props.markAsCompleted}
            switchTask={props.switchTask}
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
    elements.push(<div className="task" key={tasksLength}></div>);
    console.log("for" + tasksLength);
  }

  return <div className="tasks-container">{elements}</div>;
}

class TaskDisplayer extends React.Component {
  render() {
    console.log("tasksDisplayer comp " + this.props.categoryTitle);
    console.log("tdis:" + this.props.tasks);

    return (
      <div className="middle-container-full">
        <div className="my-day-container">
          <div className="my-day-left-container">
            <span className="my-day"> {this.props.categoryTitle}</span>
            <i className="material-icons more-icon">more_horiz_outlined</i>
            <div className="date-container">
              <p className="today-date" id="todayDate">
                Wednesday, April 13
              </p>
            </div>
          </div>

          <div className="my-day-right-container">
            <i className="material-icons sort-icon">import_export</i>
            <span className="sort-text"> Sort</span>
            <i className="material-icons bulb-icon">lightbulb_outlined</i>
            <span className="sort-text"> Suggestions</span>
          </div>
        </div>

        <div className="add-task-full-container">
          <div className="add-task-container" id="addTaskContainer">
            <div className="add-icon-container-middle">
              <i className="material-icons add-icon-middle" id="addIconMiddle">
                add
              </i>
            </div>

            <input
              className="add-task-input-box"
              id="taskInputBox"
              type="text"
              placeholder="Add a task"
              onClick={this.props.toggleDisplay}
              onKeyUp={this.props.addTask}
            />
          </div>
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

  componentDidMount() {
    console.log("\ncdm- tasksdisplayer");
  }

  componentDidUpdate() {
    console.log("\ncdu- tasksdisplayer");
    if (!(this.props.categoryTitle === "My Day")) {
      document.getElementsByClassName("date-container")[0].style.display =
        "none";
    }
    document.getElementById("taskInputBox").value = "";
  }

  componentWillUnmount() {
    console.log("\ncwu- tasksdisplayer");
  }
}

export default TaskDisplayer;
