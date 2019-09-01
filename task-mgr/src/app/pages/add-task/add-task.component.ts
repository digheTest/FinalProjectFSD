import { Component, OnInit } from "@angular/core";
import { TaskFormModel } from "src/app/models/task-form-model";
import { TaskService } from "src/app/services/task.service";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"]
})
export class AddTaskComponent implements OnInit {
  selectedTaskFormModel: TaskFormModel;
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskService.getTask().subscribe(task => {
      this.projectService.getAllProjects().subscribe(projects => {
        if (task) {
          const project = projects.find(
            project => project.managerID === task.userID
          );
          task.project = project ? project.project : undefined;
          task.projectID = project ? project.projectID : undefined;
        }
        this.selectedTaskFormModel = task;
      });
    });
  }

  processTaskForm(taskFormModel) {
    this.taskService.addTask(taskFormModel).subscribe(() => {
      this._snackBar
        .open(
          `Task ${taskFormModel.task} created/updated successfully!`,
          "Close",
          {
            duration: 3000
          }
        )
        .afterDismissed()
        .subscribe(() => this.router.navigate(["/viewTask"]));
    });
  }
}
