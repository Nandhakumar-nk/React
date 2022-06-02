import React from "react";

import { connect } from "react-redux";

import Header from "./components/Header";
import Categories from "./components/Categories";
import TaskDisplayer from "./components/TaskDisplayer";
import StepTasks from "./components/StepTasks";

import { IState } from "./store";
import { fetchDefaultCategoryRequest } from "./actions/categories";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

interface IAppState {}

export interface IAppProps {
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
  fetchDefaultCategoryRequest: (categoryTitle: string) => void;
}

class App extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <div className={"root-container " + this.props.rootClass}>
        <Header />

        {this.props.displayLeftContainer ? <Categories /> : ""}

        <TaskDisplayer />
        {this.props.displayRightContainer ? <StepTasks /> : ""}
        <ToastContainer></ToastContainer>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchDefaultCategoryRequest("My Day");
  }
}

const mapStateToProps = (state: IState) => ({
  displayLeftContainer: state.displayLeftContainer,
  displayRightContainer: state.displayRightContainer,
  rootClass: state.rootClass,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  fetchDefaultCategoryRequest: (categoryTitle: string) =>
    dispatch(fetchDefaultCategoryRequest(categoryTitle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
