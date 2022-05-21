import React from "react";

import { connect } from "react-redux";
import axios from "axios";

import { CategoryListItem } from "../CategoryListItem";
import { ITask } from "../StepTasks";

import { IState } from "../../store";
import {
  changeFetchedDatum,
  IFetchedDatum,
} from "../../actions/fetchedDatum/changeFetchedDatum";
import { toggleLeftContainer } from "../../actions/toggleDisplay/toggleLeftContainer";
import { toggleRightContainer } from "../../actions/toggleDisplay/toggleRightContainer";
import { toggleShedulingIcons } from "../../actions/toggleDisplay/toggleShedulingIcons";

import "./styles.scss";

export interface ICategory {
  _id: string;
  title: string;
  tasks: ITask[];
  iconName?: string;
  textColor?: string;
}

interface ICategoriesState {}

interface ICategoriesProps {
  categories: ICategory[];
  importantTasks: ITask[];
  displayLeftContainer: boolean;
  changeFetchedDatum: (fetchedDatum: IFetchedDatum) => any;
  toggleRightContainer: (displayRightContainer: boolean) => any;
  toggleLeftContainer: (displayLeftContainer: boolean) => any;
  toggleShedulingIcons: (displayShedulingIcons: boolean) => any;
}

function getDefaultCategories(importantTasks: ITask[]) {
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

class Categories extends React.Component<ICategoriesProps, ICategoriesState> {
  inputBox: React.RefObject<HTMLInputElement>;
  bottomIcons = [
    "email_outlined",
    "date_range_outlined",
    "people_alt_outlined",
    "attach_file_outlined",
    "done_outline_outlined",
  ];

  constructor(props: ICategoriesProps) {
    super(props);
    this.inputBox = React.createRef();
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
      this.props.toggleRightContainer(false);
      //this.props.state.currentCategory = response.data; category fetched
      //refreshCatgeories()
    } catch (error) {
      console.log("error ocurred during category posting");
    }
  }

  handleSubmit(this: any, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.inputBox.current.value.length > 0) {
      this.props.addCategory(this.inputBox.current.value);
      this.inputBox.current.value = "";
    }
  }

  switchTab(categoryTitle: string) {
    if (categoryTitle != "Important") {
      // this.props.changeFetchedDatum({
      //   ...this.props.state,
      //   tasks: [],
      //   completedTasks: [],
      //   currentTask: {
      //     _id: "0",
      //     task: "",
      //     stepTasks: [],
      //     isCompleted: false,
      //     isImportant: false,
      //   },
      // });                                 //no api call, default category
      this.props.toggleRightContainer(false);
    } else {
      this.props.toggleRightContainer(false);
      // this.props.state.currentCategory = {
      //   _id: "Important",
      //   title: "Important",
      //   tasks: [],                          _id= ?imporatantTasks=true, title = important
      // };

      //refesh call(all catgeories + importantTasks)
      // refreshCategories(this.props.state)
      //   .then((newState: IFetchedDatum) => {
      //     this.props.changeFetchedDatum(newState);
      //   })
      //   .catch((error) => {
      //     console.log("Error occured during important tasks fetching");
      //   });
    }
  }

  switchCategory(categoryId: string) {
    // axios
    //   .get("http://localhost:3030/categories/" + categoryId)
    //   .then((response) => {
    //     this.props.state.currentTask = {
    //       _id: "0",
    //       task: "",
    //       stepTasks: [],
    //       isCompleted: false,
    //       isImportant: false,
    //     }.catch((error) => {
    //     console.log("error ocurred during categories fetching");
    //   });;                                                         //fetchCategory

    this.props.toggleRightContainer(false);
    // //refreshCategories(this.props.state)
    //   .then((newState: IFetchedDatum) => {
    //     this.props.changeFetchedDatum(newState);
    //   })
    //   .catch((error) => {
    //     console.log("Error occured during important tasks fetching");
    //   });
  }

  render() {
    return (
      <div className="left-container">
        <div className="menu-button-container">
          <div
            className="menu-icon-container white-bg"
            onClick={this.props.toggleLeftContainer(
              !this.props.displayLeftContainer
            )}
          >
            <i className="material-icons menu-icon">menu_outlined</i>
          </div>
        </div>

        <div className="categories-container">
          <ul>
            {getDefaultCategories(this.props.importantTasks).map(
              (category, index) => {
                return (
                  <CategoryListItem
                    category={category}
                    key={category._id}
                    switchCategory={this.switchTab}
                  />
                );
              }
            )}
            <li></li>
            {this.props.categories.map((category, index) => {
              return (
                <CategoryListItem
                  category={category}
                  key={category._id}
                  switchCategory={this.switchCategory}
                />
              );
            })}
          </ul>
        </div>

        <div className="new-list-container">
          <i className="material-icons add-icon blue-icon">add</i>
          <input
            className="new-list-input-box new-list"
            type="text"
            placeholder="New List"
            onClick={() => this.props.toggleShedulingIcons(false)}
            onKeyUp={this.handleSubmit}
            ref={this.inputBox}
          />
          <i className="material-icons add-icon blue-icon note-add-icon">
            note_add_outlined
          </i>
        </div>

        <div className="left-bottom-container">
          {this.bottomIcons.map((icon, index) => {
            return (
              <i
                className="material-icons left-bottom-icons grey-red-bg"
                key={index}
              >
                {icon}
              </i>
            );
          })}
        </div>
      </div>
    );
  }

  // async componentDidMount() {
  //   try {
  //     // this.props.state.currentCategory = { _id: "0", title: "My Day", tasks: [] };
  //     // const newState: IFetchedDatum = await refreshCategories(this.props.state);

  //     // this.props.changeFetchedDatum(newState);
  //   } catch (error) {
  //     console.log("error ocurred in componentDidMount");
  //   }
  // }
}

const mapStateToProps = (state: IState) => ({
  categories: state.fetchedData.categories,
  importantTasks: state.fetchedData.importantTasks,
  displayLeftContainer: state.toggleDisplay.displayRightContainer,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  changeFetchedDatum: (fetchedDatum: IFetchedDatum) =>
    dispatch(changeFetchedDatum(fetchedDatum)),
  toggleRightContainer: (displayRightContainer: boolean) =>
    dispatch(toggleRightContainer(displayRightContainer)),
  toggleLeftContainer: (displayLeftContainer: boolean) =>
    dispatch(toggleLeftContainer(displayLeftContainer)),
  toggleShedulingIcons: (displayShedulingIcons: boolean) =>
    dispatch(toggleShedulingIcons(displayShedulingIcons)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
