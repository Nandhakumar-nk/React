import React, { useEffect, useState } from "react";

import axios from "axios";

import Header from "./components/Header";
import Categories from "./components/Categories";
import TaskDisplayer from "./components/TaskDisplayer";
import StepTasks from "./components/StepTasks";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tasks: [],
      display: "hide",
      categoryTitle: "My Day",
      selectedCategoryId: 0,
      selectedTaskId: 0,
      importantTasks: [],
      completedTasks: [],
      stepTasks:[]
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addTask = this.addTask.bind(this);
    this.switchCategory = this.switchCategory.bind(this);
    this.markAsImportant = this.markAsImportant.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.markAsCompleted = this.markAsCompleted.bind(this);
    this.selectedTaskId = 0;
    this.selectedTaskId = [];
    console.log("parent cons executed");
  }

  toggleDisplay() {
    const value = this.state.display === "show" ? "hide" : "show";
    this.setState({ display: value });
    console.log("app " + this.state.display);
  }

  async refreshCategories(category) {
    try {
      console.log("refresh cat inside");
      const categories = await axios.get("http://localhost:3030/categories");
      console.log("after cat fetched");

      console.log(categories.data);
      const importantTasks = await axios.get(
        "http://localhost:3030/importantTasks"
      );
      console.log("after imp fetched")
      console.log(importantTasks.data);
      this.setState({
        categories: categories.data.data,
        categoryTitle: category.title,
        selectedCategoryId: category._id,
        tasks:
          category.title === "Important"
            ? importantTasks.data.data
            : category.tasks.filter((task) => task.isCompleted === false),
        importantTasks: importantTasks.data.data,
        completedTasks: category.title === "Important"
        ? []
        : category.tasks.filter((task) => task.isCompleted === true),
        selectedTaskId: this.selectedTaskId,
        stepTasks: this.stepTasks
      });
      console.log("after setState()");
    } catch (error) {
      console.log("error ocurred during categories fetching");
    }
  }

  async refreshTasks(categoryId) {
    try {
      if (categoryId != "Important") {
        const category = await axios.get(
          "http://localhost:3030/categories/" + categoryId
        );

        this.refreshCategories(category.data);
      } else {
        this.displayImportantTasks();
      }
    } catch (error) {
      console.log("error ocurred during categories fetching");
    }
  }

  async addCategory(event) {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:3030/categories",
          data: {
            title: event.target.value,
            isCompleted: false,
            isImportant: false,
          },
        });
        this.refreshCategories(response.data);
      } catch (error) {
        console.log("error ocurred during category posting");
      }
    }
  }

  async addTask(event) {
    console.log("\naddTask() method triggered");
    console.log("cid:" + this.state.selectedCategoryId);
    console.log("task:" + event.target.value);

    if (event.keyCode === 13 && event.target.value.length > 0) {
      try {
        await axios({
          method: "post",
          url: "http://localhost:3030/tasks",
          data: {
            categoryId: this.state.selectedCategoryId,
            task: event.target.value,
          },
        });
        this.refreshTasks(this.state.selectedCategoryId);
      } catch (error) {
        console.log("error ocurred during task posting");
      }
    }
  }

  switchCategory(categoryId) {
    console.log(typeof categoryId);
    axios
      .get("http://localhost:3030/categories/" + categoryId)
      .then((response) => {
        console.log(response.data);
        this.refreshCategories(response.data);
      })
      .catch((error) => {
        console.log("error ocurred during categories fetching");
      });
  }

  async markAsImportant(taskId, isImportant) {
    console.log("isimp:" + isImportant);
    console.log("isimp opp:" + !isImportant);
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/tasks/" + taskId,
        data: {
          isImportant: !isImportant,
        },
      });
      this.refreshTasks(this.state.selectedCategoryId);
    } catch (error) {
      console.log("error ocurred during important posting");
    }
  }

  switchTab(categoryTitle) {
    console.log("switch tab called");
    console.log("switch tab cat title" + categoryTitle);
    if (categoryTitle != "Important") {
      console.log("switch tab other tabs");
      this.setState({
        categoryTitle: categoryTitle,
        tasks: [],
        completedTasks: []
      });
    } else {
      console.log("switch tab imp tab");
      this.refreshCategories({ _id: "Important", title: "Important" });
    }
  }

  async markAsCompleted(taskId, isCompleted) {
    console.log("isCompleted:" + isCompleted);
    console.log("isCompleted opp:" + !isCompleted);
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3030/tasks/" + taskId,
        data: {
          isCompleted: !isCompleted,
        },
      });
      this.refreshTasks(this.state.selectedCategoryId);
    } catch (error) {
      console.log("error ocurred during completed posting");
    }
  }

  async switchTask(taskId) {
    console.log("switch Task triggered...");
    console.log("taskId:" + taskId);

    try {
      const response = await axios.get("http://localhost:3030/tasks/" + taskId);
      console.log(response.data);
        this.selectedTaskId = taskId;
        this.stepTasks = response.data.stepTasks;
      this.refreshTasks(this.state.selectedCategoryId);
    } catch (error) {
      console.log("error ocurred during task fetching");
    }
  }

  render() {
    console.log("important tasks:" + this.state.importantTasks.length);
    console.log("\napp render");
    console.log("ct " + this.state.categoryTitle);
    return (
      <div className="root-container">
        <Header />
        <Categories
          toggleDisplay={this.toggleDisplay}
          categories={this.state.categories}
          addCategory={this.addCategory}
          switchCategory={this.switchCategory}
          importantTasks={this.state.importantTasks}
          switchTab={this.switchTab}
        />
        <TaskDisplayer
          display={this.state.display}
          toggleDisplay={this.toggleDisplay}
          categoryTitle={this.state.categoryTitle}
          tasks={this.state.tasks}
          completedTasks={this.state.completedTasks}
          addTask={this.addTask}
          markAsImportant={this.markAsImportant}
          markAsCompleted={this.markAsCompleted}
          switchTask={this.switchTask}
        />
        <StepTasks stepTasks={this.state.stepTasks}/>
      </div>
    );
  }

  async componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - parent");
    try {
      const result = await axios({
        method: "post",
        url: "http://localhost:3030/categories",
        data: {
          title: "from react1",
        },
      });
      console.log("result" + result.data._id);
      //this.refreshCategories(result.data);
    } catch (error) {
      console.log("error ocurred during MyDay posting");
    }
  }
}

export default App;

/*
 switchCategory(categoryId) {
    console.log(typeof categoryId);
    axios
      .get("http://localhost:3030/categories/" + categoryId)
      .then((response) => {
        console.log(response.data);
        this.setState({
          categoryTitle: response.data.title,
          selectedCategoryId: response.data._id,
          tasks: response.data.tasks,
        });
      })
      .catch((error) => {
        console.log("error ocurred during categories fetching");
      });
  }
*/
