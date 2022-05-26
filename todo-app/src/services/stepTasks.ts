import axios from "axios";

export class StepTasksService {
  static API_URL: string = "http://192.168.0.102:3030/";

  static post = (data: any) =>
    axios({
      method: "post",
      url: `${StepTasksService.API_URL}stepTasks`,
      data,
    });

  static get = (id: string = "") =>
    axios.get(`${StepTasksService.API_URL}stepTasks/${id}`);

  static patch = (id: string, data: any) =>
    axios({
      method: "patch",
      url: `${StepTasksService.API_URL}stepTasks/${id}`,
      data,
    });
}
