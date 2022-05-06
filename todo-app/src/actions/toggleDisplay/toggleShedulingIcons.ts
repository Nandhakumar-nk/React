import { ACTION_TYPES } from "../../constants/actionTypes";

export function toggleShedulingIcons(displayShedulingIcons: boolean) {
  return {
    type: ACTION_TYPES.TOGGLE_SHEDULING_ICONS,
    payload: displayShedulingIcons,
  };
}
