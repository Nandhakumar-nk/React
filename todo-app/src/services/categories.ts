import axios from "axios";

export class CategoriesService {
  static API_URL:string ="http://192.168.0.102:3030/";

  static post = (data:any) =>
    axios({
      method: "post",
      url: `${CategoriesService.API_URL}categories`,
      data,
    });

  static get = (id: string = "") =>
    axios.get(`${CategoriesService.API_URL}categories/${id}`);
}
