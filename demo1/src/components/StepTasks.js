import React from "react";

function RightMenuBox(props) {
  const listItems = props.items.map((item) => {
    return (
      <li
        className={
          "right-menu-list grey-bg" + (item.borderBottom ? " list-bottom" : "")
        }
      >
        <i className="material-icons right-icons">{item.icon}</i>
        <span>{item.text}</span>
      </li>
    );
  });

  return <ul className="right-menu-container">{listItems}</ul>;
}

function StepTasks(props) {
  return (
    <div className="right-container">
      <div className="right-top-container">
        <ul className="right-menu-container">
          <li className="right-menu-list grey-bg">
            <i className="material-icons right-icons blue-icon completed-icon">
              {" "}
              radio_button_unchecked_outlined
            </i>
            <span className="task-right">task</span>
            <i className="material-icons list-icons star-right">star_border</i>
          </li>
          <li className="right-menu-list">
            <i className="material-icons right-icons add-icon blue-icon">
              {" "}
              add
            </i>
            <input
              className="step-task-input-box new-list"
              id="stepTaskInput"
              type="text"
              placeholder="Add Step"
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
        <i className="material-icons hide-icon">drive_file_move_outlined</i>
        <span className="created-text">Created Today</span>
        <i className="material-icons delete-icon">delete_outlined</i>
      </div>
    </div>
  );
}

export default StepTasks;
