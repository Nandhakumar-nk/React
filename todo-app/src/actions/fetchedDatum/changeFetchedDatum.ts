import { ICategory } from "../../components/Categories";
import { ITask } from "../../components/StepTasks";
import { ACTION_TYPES } from "../../constants/actionTypes";

export interface IFetchedDatum {
  categories: ICategory[];
  categoryTitle: string;
  selectedCategoryId: string;
  tasks: ITask[];
  importantTasks: ITask[];
  completedTasks: ITask[];
  currentTask: ITask;
}

export function changeFetchedDatum(fetchedDatum: IFetchedDatum[]) {
  return {
    type: ACTION_TYPES.FETCHED_DATA,
    payload: fetchedDatum,
  };
}
