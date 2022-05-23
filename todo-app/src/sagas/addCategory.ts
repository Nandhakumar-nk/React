import { call } from 'redux-saga/effects';

import { CategoriesService } from "../services/categories";

function* addCategory(action:any): Generator {
    try {
      const response = yield call(CategoriesService.post, action.payload);
      
      //this.props.toggleRightContainer(false);
      //this.props.state.currentCategory = response.data; category fetched
      //refreshCatgeories()
    } catch (error) {
      console.log("error ocurred during category posting");
    }
  }