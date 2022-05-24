import React from "react";

import { connect } from "react-redux";

import Header from "./components/Header";
import Categories, { ICategory } from "./components/Categories";
import TaskDisplayer from "./components/TaskDisplayer";
import StepTasks, { ITask } from "./components/StepTasks";

import { IState } from "./store";

interface IAppState {}

export interface IAppProps {
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
}

class App extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <div className={"root-container " + this.props.rootClass}>
        <Header />

        {this.props.displayLeftContainer ? <Categories /> : ""}

        <TaskDisplayer />

        {this.props.displayRightContainer ? <StepTasks /> : ""}
      </div>
    );
  }

  async componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - parent");
    // try {
    //   this.refreshCategories({ _id: "0", title: "My Day", tasks: [] });
    // } catch (error) {
    //   console.log("error ocurred during MyDay posting");
    // }
  }
}

const mapStateToProps = (state: IState): IAppProps => ({
  displayRightContainer: state.displayRightContainer,
  displayLeftContainer: state.displayRightContainer,
  rootClass: state.rootClass,
});

export default connect(mapStateToProps)(App);

// App.defaultProps = {
//   displayRightContainer: false,
//   displayLeftContainer: true,
//   rootClass: ""
// }
