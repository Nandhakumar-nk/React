import axios from "axios";

export const createTask = (data: any) =>
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}tasks`,
    data,
  });

export const getTask = (id: string) =>
  axios.get(`${process.env.REACT_APP_API_URL}tasks/${id}`);

export const getImportantTasks = () =>
  axios.get(
    `${process.env.REACT_APP_API_URL}tasks/?isImportant=true&isCompleted=false`
  );

export const editTaskDetails = (id: string, data: any) =>
  axios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}tasks/${id}`,
    data,
  });
