import React from "react";

export function ShedulingIcons() {
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