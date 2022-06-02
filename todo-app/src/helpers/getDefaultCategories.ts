import { ICategory } from "../components/Categories";
import { ITask } from "../components/StepTasks";
import { DEFAULT_CATEGORIES } from "../constants/defaultCategories";

export function getDefaultCategories(importantTasks: ITask[]) {
  const categories: ICategory[] = [
    {
      _id: DEFAULT_CATEGORIES.MY_DAY,
      title: DEFAULT_CATEGORIES.MY_DAY,
      tasks: [],
      iconName: "light_mode_outlined",
    },
    {
      _id: DEFAULT_CATEGORIES.IMPORTANT,
      title: DEFAULT_CATEGORIES.IMPORTANT,
      tasks: importantTasks,
      iconName: "star_border",
    },
    {
      _id: DEFAULT_CATEGORIES.PLANNED,
      title: DEFAULT_CATEGORIES.PLANNED,
      tasks: [],
      iconName: "event_outlined",
    },
    {
      _id: DEFAULT_CATEGORIES.ASSIGNED_TO_ME,
      title: DEFAULT_CATEGORIES.ASSIGNED_TO_ME,
      tasks: [],
      iconName: "person_outline",
      textColor: "green-icon",
    },
    {
      _id: DEFAULT_CATEGORIES.TASKS,
      title: DEFAULT_CATEGORIES.TASKS,
      tasks: [],
      iconName: "home_outlined",
      textColor: "blue-icon",
    },
  ];

  return categories;
}
