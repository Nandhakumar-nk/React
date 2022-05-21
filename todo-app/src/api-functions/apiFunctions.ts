import axios from "axios";
import { IFetchedDatum } from "../actions/fetchedDatum/changeFetchedDatum";
import { ITask } from "../components/StepTasks";



// export async function refreshCategories(state:IFetchedDatum):Promise<IFetchedDatum> {
//   let newState:IFetchedDatum = state;

//     try {
//       const categories = await axios.get("http://localhost:3030/categories");
//       const importantTasks = await axios.get(
//         "http://localhost:3030/importantTasks"
//       );

//       if (state.currentCategory.title === "My Day") {
//         state.currentCategory = categories.data.data[0] ? categories.data.data[0] : state.currentCategory;
//         state.currentTask = categories.data.data[0].tasks[0]
//           ? categories.data.data[0].tasks[0]
//           : state.currentTask;
//       }

//       newState = {
//         categories: categories.data,
//         categoryTitle: category.title,
//         selectedCategoryId: category._id,
//         tasks:
//           state.currentCategory.title === "Important"
//             ? importantTasks.data
//             : state.currentCategory.tasks.filter((task: ITask) => task.isCompleted === false),
//         importantTasks: importantTasks.data.length
//         completedTasks:
//           state.currentCategory.title === "Important"
//             ? []
//             : state.currentCategory.tasks.filter((task: ITask) => task.isCompleted === true),
//         currentTask: state.currentTask,
//       };
//     } catch (error) {
//       console.log("error ocurred during categories fetching");
//     }
//     return newState;
//   }

  // async function markAsImportant(taskId: string, isImportant: boolean) {
  //   try {
  //     const response = await axios({
  //       method: "patch",
  //       url: "http://localhost:3030/tasks/" + taskId,
  //       data: {
  //         isImportant: !isImportant,
  //       },
  //     });
  //     state.currentTask = response.data;
  //     refreshTasks(state)
  //   } catch (error) {
  //     console.log("error ocurred during important posting");
  //   }
  // }

  // async function switchTask(state:IFetchedDatum, taskId: string) {
  //   //this.setDisplayRightContainer(true);
  //   //this.showShedulingIcons(false);

  //   try {
  //     const response = await axios.get("http://localhost:3030/tasks/" + taskId);

  //     state.currentTask = response.data;
  //     refreshTasks(state.currentCategory._id);
  //   } catch (error) {
  //     console.log("error ocurred during task fetching");
  //   }
  // }

  // async function refreshTasks(state) {
  //   try {
  //     if (categoryId != "Important") {
  //       const category = await axios.get(
  //         "http://localhost:3030/categories/" + categoryId
  //       );

  //       this.refreshCategories(category.data);
  //     } else {
  //       this.refreshCategories({
  //         _id: "Important",
  //         title: "Important",
  //         tasks: [],
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error ocurred during categories fetching");
  //   }
  // }

  // async function addStepTask(stepTask: string):Promise<void> {
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "http://localhost:3030/stepTasks",
  //       data: {
  //         taskId: this.state.currentTask._id,
  //         stepTask,
  //       },
  //     });

  //     this.switchTask(this.state.currentTask._id);
  //   } catch (error) {
  //     console.log("error ocurred during stepTask posting");
  //   }
  // }