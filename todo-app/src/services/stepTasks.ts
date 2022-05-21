import axios from "axios";

export class StepTasksService {
  static post = (data: any) =>
    axios({
      method: "post",
      url: `${process.env.API_URL}stepTasks`,
      data,
    });

  static get = (id: string = "") =>
    axios.get(`${process.env.API_URL}stepTasks/${id}`);

  static patch = (id: string, data: any) =>
    axios({
      method: "patch",
      url: `${process.env.API_URL}stepTasks/${id}`,
      data,
    });
}
