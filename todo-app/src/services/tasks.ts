import axios from "axios";

export class TasksService {
  static post = (data: any) =>
    axios({
      method: "post",
      url: `${process.env.API_URL}tasks`,
      data,
    });

  static get = (id: string = "") =>
    axios.get(`${process.env.API_URL}tasks/${id}`);

  static patch = (id: string, data: any) =>
    axios({
      method: "patch",
      url: `${process.env.API_URL}tasks/${id}`,
      data,
    });
}
