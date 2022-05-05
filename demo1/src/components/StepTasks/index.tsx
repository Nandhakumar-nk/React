import React, { useState } from "react";
import { MenuListItem } from "./MenuListItem";
import { RightMenuBox } from "./RightMenuBox";

interface IStepTask {
  _id: string;
  stepTask: string;
  isCompleted: boolean;
}

export interface ITask {
  _id: string;
  task: string;
  stepTasks: IStepTask[];
  isCompleted: boolean;
  isImportant: boolean;
}

interface IStepTasksProps {
  currentTask: ITask;
  addStepTask: (stepTask: string) => void;
  markAsCompleted: (_id: string, isCompleted: boolean) => void;
  markAsImportant: (_id: string, isImportant: boolean) => void;
  hideRightContainer: () => void;
  markAsCompletedStepTask: (_id: string, isCompleted: boolean) => void;
}

function StepTasks(props: IStepTasksProps) {
  const [stepTask, setStepTask] = useState("");

  function addStepTask(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && stepTask.length > 0) {
      props.addStepTask(stepTask);
      setStepTask("");
    }
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStepTask(event.target.value);
  }

  return (
    <div className="right-container">
      <div className="right-top-container">
        <ul className="right-menu-container">
          <MenuListItem
            item={{
              icon: props.currentTask.isCompleted
                ? "check_circle"
                : "radio_button_unchecked_outlined",
              iconClass: " blue-icon radio-icon",
              iconEvent: () => {
                props.markAsCompleted(
                  props.currentTask._id,
                  props.currentTask.isCompleted
                );
              },
              text: props.currentTask.task,
              textClass:
                "task-right" +
                (props.currentTask.isCompleted ? " text-strike" : ""),
              secondIcon: props.currentTask.isImportant
                ? "star"
                : "star_border",
              secondIconClass: props.currentTask.isImportant ? "blue-icon" : "",
              secondIconEvent: () => {
                props.markAsImportant(
                  props.currentTask._id,
                  props.currentTask.isImportant
                );
              },
            }}
          />
          {props.currentTask.stepTasks.map((stepTask: IStepTask) => {
            return (
              <MenuListItem
                item={{
                  icon: stepTask.isCompleted
                    ? "check_circle"
                    : "radio_button_unchecked_outlined",
                  iconClass: " blue-icon completed-icon",
                  iconEvent: () => {
                    props.markAsCompletedStepTask(
                      stepTask._id,
                      stepTask.isCompleted
                    );
                  },
                  text: stepTask.stepTask,
                  textClass: stepTask.isCompleted ? " text-strike" : "",
                  secondIcon: "close_outlined",
                  secondIconClass: "close-icon",
                  borderBottom: true,
                }}
              />
            );
          })}
          <li className="right-menu-list">
            <i className="material-icons right-icons add-icon blue-icon">
              {" "}
              add
            </i>
            <input
              className="step-task-input-box new-list"
              type="text"
              value={stepTask}
              placeholder="Add Step"
              onChange={handleOnChange}
              onKeyUp={addStepTask}
            />
          </li>
        </ul>

        <RightMenuBox
          items={[{ icon: "light_mode_outlined", text: "Add to My Day" }]}
        />

        <RightMenuBox
          items={[
            {
              icon: "notifications_outlined",
              text: "Remind me",
              borderBottom: true,
            },
            {
              icon: "date_range_outlined",
              text: "Add due date",
              borderBottom: true,
            },
            { icon: "event_repeat_outlined", text: "Repeat" },
          ]}
        />

        <RightMenuBox
          items={[{ icon: "local_offer_outlined", text: "Pick a category" }]}
        />

        <RightMenuBox
          items={[{ icon: "attach_file_outlined", text: "Add file" }]}
        />

        <div className="right-menu-container empty-container">
          <span className="updated-text">Updated a few seconds ago</span>
        </div>
      </div>

      <div className="right-bottom-container">
        <i
          className="material-icons hide-icon"
          onClick={() => props.hideRightContainer()}
        >
          drive_file_move_outlined
        </i>
        <span className="created-text">Created Today</span>
        <i className="material-icons delete-icon">delete_outlined</i>
      </div>
    </div>
  );
}

export default StepTasks;
