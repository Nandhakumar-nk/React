import React, { useEffect } from "react";

import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Categories from "./components/Categories";
import TaskDisplayer from "./components/TaskDisplayer";
import StepTasks from "./components/StepTasks";

import { IState } from "./store";
import { fetchDefaultCategoryRequest } from "./actions/categories";
import { DEFAULT_CATEGORIES } from "./constants/defaultCategories";

import "./App.scss";

export interface IAppProps {
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
  fetchDefaultCategoryRequest: (categoryTitle: string, isInitialLoading:boolean) => void;
}

function App(props: IAppProps) {
  useEffect(() => {
    props.fetchDefaultCategoryRequest(DEFAULT_CATEGORIES.MY_DAY, true);
  }, []);

  return (
    <div className={"root-container " + props.rootClass}>
      <Header />

      {props.displayLeftContainer ? <Categories /> : ""}

      <TaskDisplayer />
      {props.displayRightContainer ? <StepTasks /> : ""}
      <ToastContainer></ToastContainer>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  displayLeftContainer: state.displayLeftContainer,
  displayRightContainer: state.displayRightContainer,
  rootClass: state.rootClass,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  fetchDefaultCategoryRequest: (categoryTitle: string, isInitialLoading:boolean) =>
    dispatch(fetchDefaultCategoryRequest(categoryTitle, isInitialLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
