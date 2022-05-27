import axios from "axios";

export const createCategory = (data: any) =>
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}categories`,
    data,
  });

export const getCategory = (id: string) =>
  axios.get(`${process.env.REACT_APP_API_URL}categories/${id}`);

export const getCategories = () =>
  axios.get(`${process.env.REACT_APP_API_URL}categories`);
