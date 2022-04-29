import React from "react";
function MenuListItem(props) {
  return (
    <li
      className={
        "right-menu-list grey-bg" +
        (props.item.borderBottom ? " list-bottom" : "")
      }
    >
      <i
        className={
          "material-icons right-icons" +
          (props.item.iconClass ? props.item.iconClass : "")
        }
      >
        {props.item.icon}
      </i>
      <span className={props.item.textClass ? props.item.textClass : ""}>
        {props.item.text}
      </span>
      {props.item.secondIcon ? (
        <i className="material-icons list-icons star-right">
          {props.item.secondIcon}
        </i>
      ) : (
        ""
      )}
    </li>
  );
}

function RightMenuBox(props) {
  const listItems = props.items.map((item) => {
    return <MenuListItem item={item} />;
  });

  return <ul className="right-menu-container">{listItems}</ul>;
}

function StepTasks(props) {
  console.log("stepTasks length:" + props.stepTasks.length);

  return (
    <div className="right-container">
      <div className="right-top-container">
        <ul className="right-menu-container">
          <MenuListItem
            item={{
              icon: "radio_button_unchecked_outlined",
              iconClass: " blue-icon completed-icon",
              text: "task",
              textClass: "task-right",
              secondIcon: "star_border",
            }}
          />
          {props.stepTasks.map((stepTask) => {
            return (
              <MenuListItem
                item={{
                  icon: stepTask.isCompleted
                    ? "check_circle"
                    : "radio_button_unchecked_outlined",
                  iconClass: " blue-icon completed-icon",
                  text: stepTask.stepTask,
                  textClass: "task-right",
                  secondIcon: "close_outlined",
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
