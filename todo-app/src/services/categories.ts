import axios from "axios";

export class CategoriesService {
  static post = (categoryName: string) =>
    axios({
      method: "post",
      url: `${process.env.API_URL}categories`,
      data: {
        title: categoryName,
        isCompleted: false,
        isImportant: false,
      },
    });

  static get = (id: string = "") =>
    axios.get(`${process.env.API_URL}categories/${id}`);
}
