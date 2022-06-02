import { applyMiddleware, createStore } from "redux";

import createSagaMiddleware from "redux-saga";

import { rootReducer } from "../reducers";
import { rootSaga } from "../sagas";
import { ICategory } from "../components/Categories";
import { ITask } from "../components/StepTasks";

export interface IState {
  categoryTitle: string;
  selectedCategoryId: string;
  tasks: ITask[];
  completedTasks: ITask[];
  categories: ICategory[];
  importantTasks: ITask[];
  currentTask: ITask;
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
  displayShedulingIcons: boolean;
  isCategoriesLoading: boolean;
  isTasksLoading: boolean;
  isStepTasksLoading: boolean;
}

export const initialState: IState = {
  categoryTitle: "My Day",
  selectedCategoryId: "0",
  tasks: [],
  completedTasks: [],
  categories: [],
  importantTasks: [],
  currentTask: {
    _id: "0",
    task: "",
    stepTasks: [],
    isCompleted: false,
    isImportant: false,
  },
  displayLeftContainer: true,
  displayRightContainer: false,
  rootClass: "",
  displayShedulingIcons: false,
  isCategoriesLoading: false,
  isTasksLoading: false,
  isStepTasksLoading: false,
};
const sagaMiddleware = createSagaMiddleware();

function configureStore(state: IState = initialState) {
  const store = createStore(
    rootReducer,
    state,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
