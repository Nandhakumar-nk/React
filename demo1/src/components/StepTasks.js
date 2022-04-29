import React from 'react';

class StepTasks extends React.Component {
  render() {
    return (
      <div class="right-container">
        <div class="right-top-container">

          <div class="right-inner-containers">
            <div class="remind-containers">
              <i class="material-icons add-icon radio-icon blue-icon completed-icon">
                radio_button_unchecked_outlined
              </i>
              <span class="add-text task-right">task</span>
              <div class="star-container-right">
                <i class="material-icons list-icons">star_border</i>
              </div>
            </div>

            <div>
              <ul class="dynamic-list" id="dynamicListRight"></ul>
            </div>

            <p class="remind-containers">
              <i class="material-icons add-icon blue-icon">add</i>
              <input
                class="step-task-input-box new-list"
                id="stepTaskInput"
                type="text"
                placeholder="Add Step"
              />
            </p>
          </div>
          <div class="right-inner-containers grey-bg">
            <p class="remind-containers">
              <i class="material-icons icons-align">light_mode_outlined</i>
              <span>Add to My Day</span>
            </p>
          </div>
          <div class="right-inner-containers">
            <div class="remind-containers grey-bg">
              <i class="material-icons right-icons">notifications_outlined</i>
              <span class="border-bottom"> Remind me</span>
            </div>

            <div class="remind-containers grey-bg">
              <i class="material-icons right-icons">date_range_outlined</i>
              <span class="border-bottom"> Add due date</span>
            </div>

            <div class="remind-containers grey-bg">
              <i class="material-icons repeat-icon">event_repeat_outlined</i>
              <span class="repeat-text">Repeat</span>
            </div>
          </div>
          <div class="right-inner-containers">
            <p class="remind-containers">
              <i class="material-icons icons-align tag-icon">
                local_offer_outlined
              </i>
              <span>Pick a category</span>
            </p>
          </div>
          <div class="right-inner-containers grey-bg">
            <p class="remind-containers">
              <i class="material-icons icons-align tag-icon">
                attach_file_outlined
              </i>
              <span>Add file</span>
            </p>
          </div>
          <div class="right-inner-containers empty-container">
            <span class="updated-text">Updated a few seconds ago</span>
          </div>
        </div>
        <div class="right-bottom-container">
            <i class="material-icons hide-icon">drive_file_move_outlined</i>
            <span class="created-text">Created Today</span>
            <i class="material-icons delete-icon">delete_outlined</i>
          </div>
      </div>
    );
  }
}

export default StepTasks;