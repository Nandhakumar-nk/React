import axios from "axios";

export class CategoriesService {
  static post = (data:any) =>
    axios({
      method: "post",
      url: `${process.env.API_URL}categories`,
      data,
    });

  static get = (id: string = "") =>
    axios.get(`${process.env.API_URL}categories/${id}`);
}
