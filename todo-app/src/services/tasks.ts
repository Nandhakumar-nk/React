import axios from "axios";

export class TasksService {
  static API_URL:string ="http://192.168.0.102:3030/";

  static post = (data: any) =>
    axios({
      method: "post",
      url: `${TasksService.API_URL}tasks`,
      data,
    });

  static get = (id: string = "") =>
    axios.get(`${TasksService.API_URL}tasks/${id}`);

  static patch = (id: string, data: any) =>
    axios({
      method: "patch",
      url: `${TasksService.API_URL}tasks/${id}`,
      data,
    });
}
