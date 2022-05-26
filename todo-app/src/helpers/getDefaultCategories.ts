import { ICategory } from "../components/Categories";
import { ITask } from "../components/StepTasks";

export function getDefaultCategories(importantTasks: ITask[]) {
    const categories: ICategory[] = [
      {
        _id: "My Day",
        title: "My Day",
        tasks: [],
        iconName: "light_mode_outlined",
      },
      {
        _id: "Important",
        title: "Important",
        tasks: importantTasks,
        iconName: "star_border",
      },
      {
        _id: "Planned",
        title: "Planned",
        tasks: [],
        iconName: "event_outlined",
      },
      {
        _id: "Assigned to me",
        title: "Assigned to me",
        tasks: [],
        iconName: "person_outline",
        textColor: "green-icon",
      },
      {
        _id: "Tasks",
        title: "Tasks",
        tasks: [],
        iconName: "home_outlined",
        textColor: "blue-icon",
      },
    ];
  
    return categories;
  }