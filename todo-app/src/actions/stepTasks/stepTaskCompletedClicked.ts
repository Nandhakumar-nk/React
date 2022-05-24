import { ACTION_TYPES } from "../../constants/actionTypes";

export function stepTaskCompletedClicked(stepTaskId: string, isCompleted: boolean) {
  return {
    type: ACTION_TYPES.STEPTASK_COMPLETED_CLICKED,
    payload: {
      stepTaskId,
      data:{isCompleted}
    },
  };
}
