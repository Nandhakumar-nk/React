import { put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { switchRootClass } from "../helpers/switchRootClass";

export function* toggleLeftContainer(action: any): any {
  try {
    const displayRightContainer = yield select(
      (state) => state.displayRightContainer
    );

    const rootClass = yield switchRootClass(
      action.payload.displayLeftContainer,
      displayRightContainer
    );
  } catch (error) {
    console.log("error ocurred inside toggleLeftContainer generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload: action.payload });
  }
}
