import React from "react";

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

//onClick={markAsCompletedMiddle}
//onClick={markAsImportantTask}
//{props.tasks[reversedIndex].isImportant ? "star" : "star_border"}
function TasksContainer(props) {
  console.log("tasksContainer:" + props.task)
  const elements = [];
  let reversedIndex = props.tasks.length - 1;

  for (let index = 0; reversedIndex >= 0; index++, reversedIndex--) {
   let taskBox = <div className="task" onClick={props.showRightContainer}>
      <div className="radio-container">
        <span className="material-icons add-icon radio-icon blue-icon">
          radio_button_unchecked_outlined
        </span>
      </div>
      <div className="tasks-text">{props.tasks[reversedIndex].task} </div>
      <div className="star-container">
        <span className="material-icons list-icons star-task">
        star_border
        </span>{" "}
      </div>
    </div>;
    elements.push(taskBox);
    //selectIcon(addedTasks[reversedIndex], taskBox.childNodes[2].childNodes[0]);
  }

  for (let tasksLength = props.tasks.length; tasksLength < 8; tasksLength++) {
    elements.push(<div className="task" key={tasksLength}></div>);
    console.log("for" + tasksLength);
  }

  return <div className="tasks-container">{elements}</div>;
}

class TaskDisplayer extends React.Component {

  render() {
    console.log("tasksDisplayer comp " + this.props.categoryTitle);
    console.log("tdis:" + this.props.tasks)

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
        <TasksContainer tasks={this.props.tasks} />
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
  }

  componentWillUnmount() {
    console.log("\ncwu- tasksdisplayer");
  }
}

export default TaskDisplayer;
