import React from "react";

import axios from "axios";

import Header from './components/Header';
import Categories, { ICategory } from './components/Categories';
import TaskDisplayer from './components/TaskDisplayer';
import StepTasks, { ITask } from './components/StepTasks';

interface IAppProps {}

interface IAppState {
  categories: ICategory[];
  tasks: ITask[];
  categoryTitle: string;
  selectedCategoryId: string;
  importantTasks: ITask[];
  completedTasks: ITask[];
  currentTask: ITask;
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
  displayShedulingIcons: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  currentTask: ITask = {
    _id: "0",
    task: "",
    stepTasks: [],
    isCompleted: false,
    isImportant: false,
  };
  displayRightContainer: boolean = false;
  displayLeftContainer: boolean = true;
  rootClass: string = "";

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      categories: [],
      tasks: [],
      categoryTitle: "My Day",
      selectedCategoryId: "0",
      importantTasks: [],
      completedTasks: [],
      currentTask: this.currentTask,
      displayRightContainer: false,
      displayLeftContainer: true,
      rootClass: "",
      displayShedulingIcons: false,
    };

    this.addCategory = this.addCategory.bind(this);
    this.addTask = this.addTask.bind(this);
    this.switchCategory = this.switchCategory.bind(this);
    this.markAsImportant = this.markAsImportant.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.markAsCompleted = this.markAsCompleted.bind(this);
    this.switchTask = this.switchTask.bind(this);
    this.addStepTask = this.addStepTask.bind(this);
    this.markAsCompletedStepTask = this.markAsCompletedStepTask.bind(this);
    this.hideRightContainer = this.hideRightContainer.bind(this);
    this.toggleLeftContainer = this.toggleLeftContainer.bind(this);
    this.showShedulingIcons = this.showShedulingIcons.bind(this);
  }

  async refreshCategories(category: ICategory) {
    try {
      const categories = await axios.get("http://localhost:3030/categories");
      const importantTasks = await axios.get(
        "http://localhost:3030/importantTasks"
      );

      if (category.title === "My Day") {
        category = categories.data.data[0] ? categories.data.data[0] : category;
        this.currentTask = categories.data.data[0].tasks[0]
          ? categories.data.data[0].tasks[0]
          : this.currentTask;
      }

      this.setState({
        categories: categories.data,
        categoryTitle: category.title,
        selectedCategoryId: category._id,
        tasks:
          category.title === "Important"
            ? importantTasks.data
            : category.tasks.filter((task) => task.isCompleted === false),
        importantTasks: importantTasks.data,
        completedTasks:
          category.title === "Important"
            ? []
            : category.tasks.filter((task) => task.isCompleted === true),
        currentTask: this.currentTask,
        displayRightContainer: this.displayRightContainer,
        displayLeftContainer: this.displayLeftContainer,
        rootClass: this.rootClass,
      });
    } catch (error) {
      console.log("error ocurred during categories fetching");
    }
  }

  async refreshTasks(categoryId: string) {
    try {
      if (categoryId != "Important") {
        const category = await axios.get(
          "http://localhost:3030/categories/" + categoryId
        );

        this.refreshCategories(category.data);
      } else {
        this.refreshCategories({
          _id: "Important",
          title: "Important",
          tasks: [],
        });
      }
    } catch (error) {
      console.log("error ocurred during categories fetching");
    }
  }

  async addCategory(categoryName: string) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3030/categories",
        data: {
          title: categoryName,
          isCompleted: false,
          isImportant: false,
        },
      });
      this.setDisplayRightContainer(false);
      this.refreshCategories(response.data);
    } catch (error) {
      console.log("error ocurred during category posting");
    }
  }

  async addTask(task: string) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3030/tasks",
        data: {
          categoryId: this.state.selectedCategoryId,
          task,
        },
      });
      this.currentTask = response.data;
      this.refreshTasks(this.state.selectedCategoryId);
    } catch (error) {
      console.log("error ocurred during task posting");
    }
  }

  switchCategory(categoryId: string) {
    axios
      .get("http://localhost:3030/categories/" + categoryId)
      .then((response) => {
        this.currentTask = {
          _id: "0",
          task: "",
          stepTasks: [],
          isCompleted: false,
          isImportant: false,
        };
        this.setDisplayRightContainer(false);
        this.refreshCategories(response.data);
      })
      .catch((error) => {
        console.log("error ocurred during categories fetching");
      });
  }

  async markAsImportant(taskId: string, isImportant: boolean) {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/tasks/" + taskId,
        data: {
          isImportant: !isImportant,
        },
      });
      this.switchTask(taskId);
    } catch (error) {
      console.log("error ocurred during important posting");
    }
  }

  switchTab(categoryTitle: string) {
    if (categoryTitle != "Important") {
      this.setState({
        categoryTitle: categoryTitle,
        tasks: [],
        completedTasks: [],
        currentTask: {
          _id: "0",
          task: "",
          stepTasks: [],
          isCompleted: false,
          isImportant: false,
        },
        displayRightContainer: false,
        displayLeftContainer: true,
        rootClass: "",
      });
    } else {
      this.setDisplayRightContainer(false);
      this.refreshCategories({
        _id: "Important",
        title: "Important",
        tasks: [],
      });
    }
  }

  async markAsCompleted(taskId: string, isCompleted: boolean) {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/tasks/" + taskId,
        data: {
          isCompleted: !isCompleted,
        },
      });
      this.switchTask(taskId);
    } catch (error) {
      console.log("error ocurred during completed posting");
    }
  }

  async switchTask(taskId: string) {
    this.setDisplayRightContainer(true);
    this.showShedulingIcons(false);

    try {
      const response = await axios.get("http://localhost:3030/tasks/" + taskId);

      this.currentTask = response.data;
      this.refreshTasks(this.state.selectedCategoryId);
    } catch (error) {
      console.log("error ocurred during task fetching");
    }
  }

  async addStepTask(stepTask: string):Promise<void> {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3030/stepTasks",
        data: {
          taskId: this.state.currentTask._id,
          stepTask,
        },
      });

      this.switchTask(this.state.currentTask._id);
    } catch (error) {
      console.log("error ocurred during stepTask posting");
    }
  }

  async markAsCompletedStepTask(stepTaskId: string, isCompleted: boolean) {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/stepTasks/" + stepTaskId,
        data: {
          isCompleted: !isCompleted,
        },
      });
      this.switchTask(this.state.currentTask._id);
    } catch (error) {
      console.log("error ocurred during completed stepTask posting");
    }
  }

  setDisplayRightContainer(displayRightContainer:boolean) {
    this.displayRightContainer = displayRightContainer;
    this.switchRootClass();
  }

  hideRightContainer() {
    this.setDisplayRightContainer(false);
    this.setState({
      displayRightContainer: this.displayRightContainer,
      rootClass: this.rootClass,
    });
  }

  toggleLeftContainer() {
    this.displayLeftContainer = !this.state.displayLeftContainer;
    this.switchRootClass();
    this.setState({
      displayLeftContainer: this.displayLeftContainer,
      rootClass: this.rootClass,
    });
  }

  switchRootClass() {
    if (this.displayLeftContainer && this.displayRightContainer) {
      this.rootClass = "show-both-containers";
    } else if (this.displayLeftContainer && !this.displayRightContainer) {
      this.rootClass = "";
    } else if (!this.displayLeftContainer && this.displayRightContainer) {
      this.rootClass = "hide-left-container";
    } else if (!this.displayLeftContainer && !this.displayRightContainer) {
      this.rootClass = "hide-both-containers";
    }
  }

  showShedulingIcons(displayShedulingIcons: boolean) {
    this.setState({ displayShedulingIcons });
  }

  render() {
    return (
      <div className={"root-container " + this.state.rootClass}>
        <Header />
        {this.state.displayLeftContainer ? (
          <Categories
            categories={this.state.categories}
            addCategory={this.addCategory}
            switchCategory={this.switchCategory}
            importantTasks={this.state.importantTasks}
            switchTab={this.switchTab}
            toggleLeftContainer={this.toggleLeftContainer}
            showShedulingIcons={this.showShedulingIcons}
          />
        ) : (
          ""
        )}

        <TaskDisplayer
          categoryTitle={this.state.categoryTitle}
          tasks={this.state.tasks}
          completedTasks={this.state.completedTasks}
          addTask={this.addTask}
          markAsImportant={this.markAsImportant}
          markAsCompleted={this.markAsCompleted}
          switchTask={this.switchTask}
          displayLeftContainer={this.state.displayLeftContainer}
          toggleLeftContainer={this.toggleLeftContainer}
          showShedulingIcons={this.showShedulingIcons}
          displayShedulingIcons={this.state.displayShedulingIcons}
        />
        {this.state.displayRightContainer ? (
          <StepTasks
            currentTask={this.state.currentTask}
            addStepTask={this.addStepTask}
            markAsImportant={this.markAsImportant}
            markAsCompleted={this.markAsCompleted}
            markAsCompletedStepTask={this.markAsCompletedStepTask}
            hideRightContainer={this.hideRightContainer}
          />
        ) : (
          ""
        )}
      </div>
    );
  }

  async componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - parent");
    try {
      this.refreshCategories({ _id: "0", title: "My Day", tasks: [] });
    } catch (error) {
      console.log("error ocurred during MyDay posting");
    }
  }
}

export default App;
