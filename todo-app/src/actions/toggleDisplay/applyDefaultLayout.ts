import { ACTION_TYPES } from "../../constants/actionTypes";

export function applyDefaultLayout(
  defaultLayout: boolean
) {
  return {
    type: ACTION_TYPES.APPLY_DEFAULT_LAYOUT,
    payload: defaultLayout,
  };
}
