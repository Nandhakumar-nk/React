import React from "react";

import { connect } from "react-redux";

import TasksContainer from "../TasksContainer";
import { BoxedIcon } from "../BoxedIcon";

import { IState } from "../../store";
import { toggleLeftContainer } from "../../actions/toggleDisplay/toggleLeftContainer";
import { toggleShedulingIcons } from "../../actions/toggleDisplay/toggleShedulingIcons";

import "./styles.scss";

interface ITaskDisplayerState {}

interface ITaskDisplayerProps {
  categoryTitle: string;
  displayLeftContainer: boolean;
  displayShedulingIcons: boolean;
  toggleLeftContainer: (displayLeftContainer: boolean) => any;
  toggleShedulingIcons: (displayShedulingIcons: boolean) => void;
}

class TaskDisplayer extends React.Component<
  ITaskDisplayerProps,
  ITaskDisplayerState
> {
  inputBox: React.RefObject<HTMLInputElement>;

  constructor(props: ITaskDisplayerProps) {
    super(props);
    this.inputBox = React.createRef();
  }

  async addTask(task: string) {
    try {
      // const response = await axios({
      //   method: "post",
      //   url: "http://localhost:3030/tasks",
      //   data: {
      //     categoryId: this.state.selectedCategoryId,
      //     task,
      //   },
      // });
      // this.currentTask = response.data;
      // this.refreshTasks(this.state.selectedCategoryId);
    } catch (error) {
      console.log("error ocurred during task posting");
    }
  }

  handleSubmit(this: any, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.inputBox.current.value.length > 0) {
      this.addTask(this.inputBox.current.value);
      this.inputBox.current.value = "";
    }
  }

  render() {
    return (
      <div>
        <div className="my-day-container">
          {!this.props.displayLeftContainer ? (
            <div
              className="menu-icon-container menu-icon-middle white-bg"
              onClick={this.props.toggleLeftContainer(
                !this.props.displayLeftContainer
              )}
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
            placeholder="Add a task"
            onClick={() => this.props.toggleShedulingIcons(true)}
            onKeyUp={this.handleSubmit}
          />

          {this.props.displayShedulingIcons ? (
            <div className="add-task-bottom-container">
              {[
                "date_range_outlined",
                "notifications_outlined",
                "event_repeat_outlined",
              ].map((icon) => {
                return (
                  <BoxedIcon
                    divClass="sheduling-icons-container grey-red-bg"
                    iconClass="material-icons middle-bottom-icons"
                    materialIcon={icon}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        <TasksContainer />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  categoryTitle: state.fetchedData.categoryTitle,
  displayLeftContainer: state.toggleDisplay.displayLeftContainer,
  displayShedulingIcons: state.toggleDisplay.displayShedulingIcons,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  toggleLeftContainer: (displayLeftContainer: boolean) =>
    dispatch(toggleLeftContainer(displayLeftContainer)),
  toggleShedulingIcons: (displayShedulingIcons: boolean) =>
    dispatch(toggleShedulingIcons(displayShedulingIcons)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDisplayer);
