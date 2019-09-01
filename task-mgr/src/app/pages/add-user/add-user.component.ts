import { Component, OnInit } from "@angular/core";
import { UserFormModel } from "src/app/models/user-form-model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  userModels: Array<UserFormModel> = [];

  selectedUserFormModel: UserFormModel;

  constructor(private userService: UserService) {}

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
      this.userService
        .getAllUsers()
        .subscribe(users => (this.userModels = users));
    });
  }

  processUserFormAction({ userFormModel, mode }) {
    if (mode === "Add") {
      this.userService.addUser(userFormModel).subscribe(() => {
        this.userService
          .getAllUsers()
          .subscribe(users => (this.userModels = users));
      });
    } else {
      this.userService.editUser(userFormModel).subscribe(() => {
        this.userService
          .getAllUsers()
          .subscribe(users => (this.userModels = users));
      });
    }
  }

  resetUserFormAction() {
    this.selectedUserFormModel = undefined;
  }
}
