import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectFormModel } from "src/app/models/project-form-model";
import { MatDialog } from "@angular/material";
import { ItemSelectionDialogComponent } from "../item-selection-dialog/item-selection-dialog.component";
import { DialogDataModel } from "src/app/models/dialog-data-model";
import { ItemModel } from "src/app/models/item-model";
import { Constants } from "src/app/utils/constants";
import { validDateCheck, validDateRange } from "src/app/utils/valid-date";
import { UserService } from "src/app/services/user.service";
import { map } from "rxjs/operators";
import { UserFormModel } from "src/app/models/user-form-model";
import { Utils } from "src/app/utils/utils";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.scss"]
})
export class ProjectFormComponent implements OnChanges {
  projectForm: FormGroup;

  primaryBtnLbl: string;

  mode: string = "ADD";

  selectedManager: ItemModel;

  @Input()
  projectFormModel: ProjectFormModel;

  @Output()
  onSubmit = new EventEmitter();

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnChanges(change: SimpleChanges) {
    this.projectFormModel = change.projectFormModel.currentValue;
    this.primaryBtnLbl = this.projectFormModel
      ? Constants.UPDATE
      : Constants.ADD;
    this.mode = this.primaryBtnLbl === Constants.UPDATE ? "UPDATE" : "ADD";
    this.projectFormModel = this.projectFormModel || new ProjectFormModel();

    const projectFormGroup = {
      project: new FormControl(
        this.projectFormModel.project,
        Validators.required
      ),
      projectID: new FormControl(
        this.projectFormModel.projectID,
        Validators.required
      ),
      setDate: new FormControl(
        !!this.projectFormModel.startDate && !!this.projectFormModel.endDate
      ),
      startDate: new FormControl(this.projectFormModel.startDate),
      endDate: new FormControl(this.projectFormModel.endDate),
      priority: new FormControl(
        this.projectFormModel.priority,
        Validators.required
      ),
      manager: new FormControl(
        this.projectFormModel.manager,
        Validators.required
      ),
      managerID: new FormControl(
        this.projectFormModel.managerID,
        Validators.required
      )
    };

    this.projectForm = new FormGroup(projectFormGroup, validDateRange);

    this.projectForm.get("setDate").valueChanges.subscribe(setDate => {
      if (setDate) {
        this.projectForm
          .get("startDate")
          .setValidators([Validators.required, validDateCheck]);
        this.projectForm
          .get("endDate")
          .setValidators([Validators.required, validDateCheck]);
      } else {
        this.projectForm.get("startDate").clearValidators();
        this.projectForm.get("endDate").clearValidators();
      }
      this.projectForm.get("startDate").updateValueAndValidity();
      this.projectForm.get("endDate").updateValueAndValidity();
    });
  }

  submitProjectForm(projectFormData) {
    this.onSubmit.emit({
      mode: this.mode,
      projectFormData
    });
  }

  resetProjectForm() {
    this.primaryBtnLbl = Constants.ADD;
    this.projectFormModel = new ProjectFormModel();
  }

  searchManager() {
    this.userService
      .getAllUsers()
      .subscribe((managers: Array<UserFormModel>) => {
        const managerList = Utils.convertUsersToItems(managers);
        const dialogRef = this.dialog.open(ItemSelectionDialogComponent, {
          disableClose: true,
          data: new DialogDataModel({
            itemType: "Manager",
            title: "Select Manager",
            items: managerList,
            selectedItem: this.projectFormModel
              ? managerList.find(
                  manager => manager.itemID === this.projectFormModel.managerID
                )
              : this.selectedManager
          })
        });

        dialogRef.afterClosed().subscribe((data: ItemModel) => {
          this.selectedManager = data;
          this.projectForm
            .get("manager")
            .setValue(this.selectedManager.itemName);
          this.projectForm
            .get("managerID")
            .setValue(this.selectedManager.itemID);
        });
      });
  }
}
