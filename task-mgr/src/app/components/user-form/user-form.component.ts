import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserFormModel } from "src/app/models/user-form-model";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent implements OnChanges {
  userForm: FormGroup;

  primaryBtnLbl: string;

  @Input()
  userFormModel: UserFormModel;

  @Output("primaryUserFormAction")
  primaryEmitter = new EventEmitter();

  @Output("secondaryUserFormAction")
  secondaryEmitter = new EventEmitter();

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    this.userFormModel = change.userFormModel.currentValue;
    this.primaryBtnLbl = this.userFormModel ? "Update" : "Add";
    this.userFormModel = this.userFormModel || new UserFormModel();

    const userFormGroup = {
      firstName: new FormControl(
        this.userFormModel.firstName,
        Validators.required
      ),
      lastName: new FormControl(
        this.userFormModel.lastName,
        Validators.required
      ),
      employeeID: new FormControl(
        this.userFormModel.employeeID || "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ),
      userID: new FormControl(
        this.userFormModel.userID || 0,
        Validators.required
      )
    };

    this.userForm = new FormGroup(userFormGroup);
  }

  submitUserForm(userFormModel: UserFormModel) {
    this.primaryEmitter.emit({
      userFormModel,
      mode: this.primaryBtnLbl
    });
  }

  resetUserForm() {
    this.secondaryEmitter.emit();
  }
}
