import React, { useEffect, useState } from "react";

import axios from "axios";

import Header from "./components/Header";
import Categories from "./components/Categories";
import TaskDisplayer from "./components/TaskDisplayer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tasks: [],
      display: "hide",
      categoryTitle: "My Day",
      selectedCategoryId: 0,
      importantTasks: [],
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addTask = this.addTask.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.markAsImportant = this.markAsImportant.bind(this);
    console.log("parent cons executed");
  }

  toggleDisplay() {
    const value = this.state.display === "show" ? "hide" : "show";
    this.setState({ display: value });
    console.log("app " + this.state.display);
  }

  async refreshCategories(category) {
    try {
      const categories = await axios.get("http://localhost:3030/categories");

      console.log(categories.data);
      const importantTasks = await axios.get("http://localhost:3030/importantTasks");

      console.log(importantTasks.data);
      this.setState({
        categories: categories.data.data,
        categoryTitle: category.title,
        selectedCategoryId: category._id,
        tasks: category.tasks,
        importantTasks: importantTasks.data.data
      });
    } catch (error) {
      console.log("error ocurred during categories fetching");
    }
  }

  async refreshTasks(categoryId) {
    try {
      const category = await axios.get(
        "http://localhost:3030/categories/" + categoryId
      );

      this.refreshCategories(category.data);
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

  changeCategory(categoryId) {
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

  render() {
    console.log("imporatnt tasks:"+this.state.importantTasks.length);
    console.log("\napp render");
    console.log("ct " + this.state.categoryTitle);
    return (
      <div className="root-container">
        <Header />
        <Categories
          toggleDisplay={this.toggleDisplay}
          categories={this.state.categories}
          addCategory={this.addCategory}
          changeCategory={this.changeCategory}
          importantTasks={this.state.importantTasks}
        />
        <TaskDisplayer
          display={this.state.display}
          toggleDisplay={this.toggleDisplay}
          categoryTitle={this.state.categoryTitle}
          tasks={this.state.tasks}
          addTask={this.addTask}
          markAsImportant={this.markAsImportant}
        />
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

/*useEffect(async () => {
        axios.get("http://localhost:3030/categories").then((response) => {
            console.log(response.data);
        });
        
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3030/categories',
            data: {
              title: 'from react1',
            }
          });
          console.log("result" + result.data._id);
    }, []);*/
