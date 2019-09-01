import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ParentTask } from "../models/parent-task";
import { Constants } from "../utils/constants";
import { TaskFormModel } from "../models/task-form-model";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  static BASE_URL = "https://localhost:44366/api/values";

  tasks: Array<Task> = [];
  parentTasks: Array<ParentTask> = [];
  selectedTask: TaskFormModel;

  constructor(private http: HttpClient) {}

  addTask(taskFormModel) {
    if (taskFormModel.isParentTask) {
      return this.http.post(`${Constants.BASE_URL}/manageParentTask`, {
        ParentTaskName: taskFormModel.parentTask,
        ParentTaskID: taskFormModel.parentTaskID
      });
    } else {
      return this.http.post(`${Constants.BASE_URL}/manageTask`, {
        ParentTaskID: taskFormModel.parentTaskID,
        ParentTaskName: taskFormModel.parentTask,
        Task: [
          {
            TaskId: taskFormModel.taskID,
            TaskName: taskFormModel.task,
            StartDate: taskFormModel.startDate,
            EndDate: taskFormModel.endDate,
            priority: taskFormModel.priority,
            IsCompleted: taskFormModel.isCompleted,
            Users: [
              {
                UserId: taskFormModel.userID,
                FirstName: taskFormModel.user.split(" ")[0],
                LastName: taskFormModel.user.split(" ")[1],
                EmpID: taskFormModel.selectedUserObj.employeeID,
                Project: [
                  {
                    ProjectID: taskFormModel.projectID
                  }
                ]
              }
            ]
          }
        ]
      });
    }
  }

  endTask(taskFormModel) {
    return this.http.put(`${Constants.BASE_URL}/editEndTask`, {
      TaskId: taskFormModel.taskID,
      TaskName: taskFormModel.taskName,
      StartDate: taskFormModel.startDate,
      EndDate: taskFormModel.endDate,
      Priority: taskFormModel.priority,
      IsCompleted: true,
      Users: taskFormModel.users
    });
  }

  getAllParentTasks() {
    return this.getAllTasks().pipe(
      map((task: any) => {
        return task.filter(t => t.isParentTask);
      })
    );
  }

  getAllTasks() {
    return this.http.get(`${Constants.BASE_URL}/get`).pipe(
      map((response: any) => {
        let tasks = [];
        response.forEach(item => {
          tasks.push(
            new TaskFormModel({
              isParentTask: true,
              parentTaskID: item.ParentTaskID,
              parentTask: item.ParentTaskName,
              isCompleted: false
            })
          );
          for (let t of item.Task) {
            tasks.push(
              new TaskFormModel({
                endDate: t.EndDate,
                isParentTask: false,
                parentTask: item.ParentTaskName,
                parentTaskID: item.ParentTaskID,
                priority: t.Priority,
                project: t.Users.length ? t.Users[0].Project : "",
                projectID: t.Users.length ? t.Users[0].Project : 0,
                startDate: t.StartDate,
                task: t.TaskName,
                user: t.Users.length
                  ? `${t.Users[0].FirstName} ${t.Users[0].LastName}`
                  : "",
                userID: t.Users.length ? t.Users[0].UserId : 0,
                taskID: t.TaskId,
                isCompleted: t.IsCompleted
              })
            );
          }
        });
        return tasks;
      })
    );
  }

  getTask() {
    const selectedTask = this.selectedTask;
    this.selectedTask = undefined;
    return of(selectedTask);
  }

  setTask(taskFormModel) {
    this.selectedTask = taskFormModel;
  }
}
