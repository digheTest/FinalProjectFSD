import { Component, OnInit } from "@angular/core";
import { ProjectFormModel } from "src/app/models/project-form-model";
import { ProjectService } from "src/app/services/project.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"]
})
export class AddProjectComponent implements OnInit {
  projectModels: Array<ProjectFormModel> = [];

  selectedProjectFormModel: ProjectFormModel;

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.projectService
      .getAllProjects()
      .subscribe(projects => (this.projectModels = projects));
  }

  processUpdateAction(projectFormModel: ProjectFormModel) {
    const { managerID } = projectFormModel;
    this.userService.getUser(managerID).subscribe(user => {
      this.selectedProjectFormModel = projectFormModel;
      this.selectedProjectFormModel.manager = `${user.firstName} ${user.lastName}`;
    });
  }

  processSuspendAction(projectFormModel: ProjectFormModel) {
    this.projectService.deleteProject(projectFormModel).subscribe(() => {
      this.projectService
        .getAllProjects()
        .subscribe(projects => (this.projectModels = projects));
    });
  }

  processProjectFormAction({ mode, projectFormData }) {
    if (mode === "ADD") {
      this.projectService.addProject(projectFormData).subscribe(() => {
        this.projectService
          .getAllProjects()
          .subscribe(projects => (this.projectModels = projects));
      });
    } else {
      this.projectService.editProject(projectFormData).subscribe(() => {
        this.projectService
          .getAllProjects()
          .subscribe(projects => (this.projectModels = projects));
      });
    }
  }

  resetProjectFormAction() {
    this.selectedProjectFormModel = undefined;
  }
}
