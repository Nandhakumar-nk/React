import React from "react";

import { connect } from "react-redux";

import Header from "./components/Header";
import Categories from "./components/Categories";
import TaskDisplayer from "./components/TaskDisplayer";
import StepTasks from "./components/StepTasks";

import { IState } from "./store";
import { defaultCategoryClicked } from "./actions/categories/defaultCategoryClicked";

interface IAppState {}

export interface IAppProps {
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
  defaultCategoryClicked: (categoryTitle: string) => void;
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

  componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - App");
    this.props.defaultCategoryClicked("My Day");
    console.log("displayLeftContainer:" + this.props.displayLeftContainer);
    console.log("displayRightContainer:" + this.props.displayRightContainer);
    console.log("rootClass:" + this.props.rootClass);
  }

  componentDidUpdate() {
    console.log("\ncomponentDidUpdate() lifecycle - App");
    console.log("displayLeftContainer:" + this.props.displayLeftContainer);
    console.log("displayRightContainer:" + this.props.displayRightContainer);
    console.log("rootClass:" + this.props.rootClass);
  }
}

const mapStateToProps = (state: IState) => ({
  displayLeftContainer: state.displayLeftContainer,
  displayRightContainer: state.displayRightContainer,
  rootClass: state.rootClass,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  defaultCategoryClicked: (categoryTitle: string) =>
    dispatch(defaultCategoryClicked(categoryTitle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// App.defaultProps = {
//   displayRightContainer: false,
//   displayLeftContainer: true,
//   rootClass: ""
// }
