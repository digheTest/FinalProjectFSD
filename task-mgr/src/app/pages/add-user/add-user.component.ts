import { Component, OnInit } from "@angular/core";
import { UserFormModel } from "src/app/models/user-form-model";
import { UserService } from "src/app/services/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  userModels: Array<UserFormModel> = [];

  selectedUserFormModel: UserFormModel;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService
      .getAllUsers()
      .subscribe(users => (this.userModels = users));
  }

  processEditAction(userFormModel: UserFormModel) {
    this.selectedUserFormModel = userFormModel;
  }

  processDeleteAction(userFormModel: UserFormModel) {
    this.userService.deleteUser(userFormModel).subscribe(() => {
      this.userService.getAllUsers().subscribe(users => {
        this.userModels = users;
        this._snackBar.open(
          `User ${userFormModel.firstName} ${userFormModel.lastName} deleted successfully!`,
          "Close",
          {
            duration: 3000
          }
        );
      });
    });
  }

  processUserFormAction({ userFormModel, mode }) {
    if (mode === "Add") {
      this.userService.addUser(userFormModel).subscribe(() => {
        this.userService.getAllUsers().subscribe(users => {
          this.userModels = users;
          this._snackBar.open(
            `User ${userFormModel.firstName} ${userFormModel.lastName} added successfully!`,
            "Close",
            {
              duration: 3000
            }
          );
        });
      });
    } else {
      this.userService.editUser(userFormModel).subscribe(() => {
        this.userService.getAllUsers().subscribe(users => {
          this.userModels = users;
          this._snackBar.open(
            `User ${userFormModel.firstName} ${userFormModel.lastName} edited successfully!`,
            "Close",
            {
              duration: 3000
            }
          );
        });
      });
    }
  }

  resetUserFormAction() {
    this.selectedUserFormModel = undefined;
  }
}
