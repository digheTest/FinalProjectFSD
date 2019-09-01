import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Constants } from "../utils/constants";
import { ProjectFormModel } from "../models/project-form-model";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get(`${Constants.BASE_URL}/getAllProjects`).pipe(
      map((response: any) =>
        response.map(
          item =>
            new ProjectFormModel({
              completedTasks: item.NoCompletedTasks,
              endDate: item.EndDate ? new Date(item.EndDate) : undefined,
              managerID: item.Users.length ? item.Users[0].UserId : 0,
              priority: item.Priority,
              project: item.ProjectName,
              totalTasks: item.NoTasks,
              startDate: item.StartDate ? new Date(item.StartDate) : undefined,
              projectID: item.ProjectID
            })
        )
      )
    );
  }

  addProject(projectFormData) {
    return this.http.post(`${Constants.BASE_URL}/addProject`, {
      ProjectName: projectFormData.project,
      StartDate: projectFormData.startDate,
      EndDate: projectFormData.endDate,
      Priority: projectFormData.priority,
      Users: [
        {
          UserId: projectFormData.managerID
        }
      ]
    });
  }

  editProject(projectFormData) {
    return this.http.post(`${Constants.BASE_URL}/editProject`, {
      ProjectName: projectFormData.project,
      StartDate: projectFormData.startDate,
      EndDate: projectFormData.endDate,
      Priority: projectFormData.priority,
      ProjectID: projectFormData.projectID,
      Users: [
        {
          UserId: projectFormData.managerID
        }
      ]
    });
  }

  deleteProject(projectFormData) {
    const params = new HttpParams().set("ProjectID", projectFormData.projectID);
    return this.http.delete(`${Constants.BASE_URL}/deleteProject`, {
      params
    });
  }
}
