import axios from "axios";

export const createStepTask = (data: any) =>
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}stepTasks`,
    data,
  });

export const editStepTaskDetails = (id: string, data: any) =>
  axios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}stepTasks/${id}`,
    data,
  });
