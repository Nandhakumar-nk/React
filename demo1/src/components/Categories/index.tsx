import React from "react";

import { ITask } from "../StepTasks";
import { BottomIcons } from "./BottomIcons";
import {
  DefaultCategories,
  IDefaultCategoriesProps,
} from "./DefaultCategories";
import {
  DynamicCategories,
  IDynamicCategoriesProps,
} from "./DynamicCategories";
import { INewCategoryAdderProps, NewCategoryAdder } from "./NewCategoryAdder";

import './styles.scss';

export interface ICategory {
  _id: string;
  title: string;
  tasks: ITask[];
}

interface ICategoriesProps
  extends IDynamicCategoriesProps,
    INewCategoryAdderProps,
    IDefaultCategoriesProps {
  toggleLeftContainer: () => void;
}

function Categories(props: ICategoriesProps) {
  return (
    <div className="left-container">
      <div className="menu-button-container">
        <div
          className="menu-icon-container white-bg"
          onClick={props.toggleLeftContainer}
        >
          <i className="material-icons menu-icon">menu_outlined</i>
        </div>
      </div>

      <div className="menu-added-items-container">
        <DefaultCategories
          importantTasks={props.importantTasks}
          switchTab={props.switchTab}
        />
        <DynamicCategories
          categories={props.categories}
          switchCategory={props.switchCategory}
        />
      </div>

      <NewCategoryAdder
        addCategory={props.addCategory}
        showShedulingIcons={props.showShedulingIcons}
      />

      <BottomIcons />
    </div>
  );
}

export default Categories;
