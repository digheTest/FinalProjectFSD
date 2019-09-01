import { Component, OnInit } from "@angular/core";
import { TaskFormModel } from "src/app/models/task-form-model";
import { TaskService } from "src/app/services/task.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-view-task",
  templateUrl: "./view-task.component.html",
  styleUrls: ["./view-task.component.scss"]
})
export class ViewTaskComponent implements OnInit {
  taskModels: Array<TaskFormModel> = [];

  selectedUserFormModel: TaskFormModel;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.taskService
      .getAllTasks()
      .subscribe(tasks => (this.taskModels = tasks));
  }

  processEditAction(taskFormModel: TaskFormModel) {
    this.taskService.setTask(taskFormModel);
    this.router.navigate(["/editTask"]);
  }

  processEndAction(taskFormModel: TaskFormModel) {
    this.taskService.endTask(taskFormModel).subscribe(() => {
      this.taskService.getAllTasks().subscribe(tasks => {
        this.taskModels = tasks;
        this._snackBar.open(
          `Task ${taskFormModel.task} ended successfully!`,
          "Close",
          {
            duration: 3000
          }
        );
      });
    });
  }

  processTaskFormAction(data) {
    console.log(data);
  }

  resetTaskFormAction() {}
}
