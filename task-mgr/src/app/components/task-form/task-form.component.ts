import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { validTask } from "src/app/utils/valid-task";
import { ItemModel } from "src/app/models/item-model";
import { TaskFormModel } from "src/app/models/task-form-model";
import { MatDialog } from "@angular/material";
import { ItemSelectionDialogComponent } from "../item-selection-dialog/item-selection-dialog.component";
import { DialogDataModel } from "src/app/models/dialog-data-model";
import { ProjectService } from "src/app/services/project.service";
import { Utils } from "src/app/utils/utils";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import {
  validDateCheck,
  validDateRangeUnconditional
} from "src/app/utils/valid-date";
import { UserFormModel } from "src/app/models/user-form-model";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"]
})
export class TaskFormComponent {
  taskForm: FormGroup;

  primaryBtnLbl: string;

  selectedProject: ItemModel;

  selectedParentTask: ItemModel;

  selectedUser: ItemModel;

  allUsers: Array<UserFormModel>;

  @Input()
  taskFormModel: TaskFormModel;

  @Output("onSubmit")
  taskFormSubmit = new EventEmitter();

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnChanges(change: SimpleChanges) {
    this.taskFormModel = change.taskFormModel.currentValue;
    this.primaryBtnLbl = this.taskFormModel ? "Update Task" : "Add Task";
    this.taskFormModel = this.taskFormModel || new TaskFormModel();

    const taskFormGroup = {
      project: new FormControl(this.taskFormModel.project),
      projectID: new FormControl(this.taskFormModel.projectID),
      taskID: new FormControl(this.taskFormModel.taskID || -1),
      task: new FormControl(this.taskFormModel.task),
      isParentTask: new FormControl(this.taskFormModel.isParentTask),
      priority: new FormControl(this.taskFormModel.priority),
      parentTaskID: new FormControl(this.taskFormModel.parentTaskID || -1),
      parentTask: new FormControl(this.taskFormModel.parentTask),
      startDate: new FormControl(
        this.taskFormModel.startDate
          ? new Date(this.taskFormModel.startDate)
          : undefined
      ),
      endDate: new FormControl(
        this.taskFormModel.endDate
          ? new Date(this.taskFormModel.endDate)
          : undefined
      ),
      user: new FormControl(this.taskFormModel.user),
      userID: new FormControl(this.taskFormModel.userID),
      isCompleted: new FormControl(this.taskFormModel.isCompleted),
      selectedUserObj: new FormControl()
    };

    this.taskForm = new FormGroup(taskFormGroup, [
      validDateRangeUnconditional,
      validTask
    ]);

    this.taskForm.get("isParentTask").valueChanges.subscribe(isParentTask => {
      if (!isParentTask) {
        this.taskForm.get("project").setValidators([Validators.required]);
        this.taskForm.get("priority").setValidators([Validators.required]);
        this.taskForm.get("task").setValidators([Validators.required]);
        this.taskForm
          .get("startDate")
          .setValidators([Validators.required, validDateCheck]);
        this.taskForm
          .get("endDate")
          .setValidators([Validators.required, validDateCheck]);
        this.taskForm.get("user").setValidators([Validators.required]);
        this.taskForm.setValidators([validDateRangeUnconditional, validTask]);

        this.taskForm.get("parentTask").clearValidators();
      } else {
        this.taskForm.get("project").setValue(undefined);
        this.taskForm.get("projectID").setValue(undefined);
        this.taskForm.get("task").setValue(undefined);
        this.taskForm.get("taskID").setValue(undefined);
        this.taskForm.get("priority").setValue(undefined);
        this.taskForm.get("startDate").setValue(undefined);
        this.taskForm.get("endDate").setValue(undefined);
        this.taskForm.get("user").setValue(undefined);
        this.taskForm.get("userID").setValue(undefined);

        this.selectedProject = undefined;
        this.selectedParentTask = undefined;
        this.selectedUser = undefined;

        this.taskFormModel.project = undefined;
        this.taskFormModel.projectID = undefined;
        this.taskFormModel.task = undefined;
        this.taskFormModel.taskID = undefined;
        this.taskFormModel.priority = undefined;
        this.taskFormModel.startDate = undefined;
        this.taskFormModel.endDate = undefined;
        this.taskFormModel.user = undefined;
        this.taskFormModel.userID = undefined;

        this.taskForm.get("project").clearValidators();
        this.taskForm.get("priority").clearValidators();
        this.taskForm.get("task").clearValidators();
        this.taskForm.get("startDate").clearValidators();
        this.taskForm.get("endDate").clearValidators();
        this.taskForm.get("user").clearValidators();

        this.taskForm.get("parentTask").setValidators([Validators.required]);
        this.taskForm.clearValidators();
      }
      this.taskForm.get("project").updateValueAndValidity();
      this.taskForm.get("priority").updateValueAndValidity();
      this.taskForm.get("parentTask").updateValueAndValidity();
      this.taskForm.get("task").updateValueAndValidity();
      this.taskForm.get("startDate").updateValueAndValidity();
      this.taskForm.get("endDate").updateValueAndValidity();
      this.taskForm.get("user").updateValueAndValidity();
    });
  }

  submitTaskForm(taskFormData) {
    this.taskFormSubmit.emit(taskFormData);
  }

  resetTaskForm() {}

  searchProject() {
    this.projectService.getAllProjects().subscribe(projects => {
      const projectList = Utils.convertProjectsToItems(projects);
      const dialogRef = this.dialog.open(ItemSelectionDialogComponent, {
        data: new DialogDataModel({
          itemType: "Project",
          title: "Select Project",
          items: projectList,
          selectedItem: this.taskFormModel
            ? projectList.find(
                project => project.itemID === this.taskFormModel.projectID
              )
            : this.selectedProject
        })
      });

      dialogRef.afterClosed().subscribe((data: ItemModel) => {
        this.selectedProject = data;
        this.taskForm
          .get("project")
          .setValue(this.selectedProject ? this.selectedProject.itemName : "");
        this.taskForm
          .get("projectID")
          .setValue(this.selectedProject ? this.selectedProject.itemID : "");
      });
    });
  }

  searchParentTask() {
    this.taskService.getAllParentTasks().subscribe(parentTasks => {
      const parentTaskList = Utils.convertParentTasksToItems(parentTasks);
      const dialogRef = this.dialog.open(ItemSelectionDialogComponent, {
        data: new DialogDataModel({
          itemType: "Parent Task",
          title: "Select Parent Task",
          items: parentTaskList,
          selectedItem: this.taskFormModel
            ? parentTaskList.find(
                task => task.itemID === this.taskFormModel.parentTaskID
              )
            : this.selectedParentTask
        })
      });

      dialogRef.afterClosed().subscribe((data: ItemModel) => {
        this.selectedParentTask = data;
        this.taskForm
          .get("parentTask")
          .setValue(
            this.selectedParentTask ? this.selectedParentTask.itemName : ""
          );
        this.taskForm
          .get("parentTaskID")
          .setValue(
            this.selectedParentTask ? this.selectedParentTask.itemID : ""
          );
      });
    });
  }

  searchUser() {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      const userList = Utils.convertUsersToItems(users);
      const dialogRef = this.dialog.open(ItemSelectionDialogComponent, {
        data: new DialogDataModel({
          itemType: "User",
          title: "Select User",
          items: userList,
          selectedItem: this.taskFormModel
            ? userList.find(user => user.itemID === this.taskFormModel.userID)
            : this.selectedUser
        })
      });

      dialogRef.afterClosed().subscribe((data: ItemModel) => {
        this.selectedUser = data;
        this.taskForm
          .get("user")
          .setValue(this.selectedUser ? this.selectedUser.itemName : "");
        this.taskForm
          .get("selectedUserObj")
          .setValue(
            this.selectedUser
              ? this.allUsers.find(
                  user => user.userID === this.selectedUser.itemID
                )
              : undefined
          );
        this.taskForm
          .get("userID")
          .setValue(this.selectedUser ? this.selectedUser.itemID : "");
      });
    });
  }
}
