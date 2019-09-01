import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { UserFormModel } from "src/app/models/user-form-model";
import { MatTableDataSource } from "@angular/material";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-user-list-view",
  templateUrl: "./user-list-view.component.html",
  styleUrls: ["./user-list-view.component.scss"]
})
export class UserListViewComponent implements OnChanges {
  @Input()
  userModels: Array<UserFormModel>;

  @Output("onEditAction")
  editEmitter = new EventEmitter();

  @Output("onDeleteAction")
  deleteEmitter = new EventEmitter();

  dataSource = new MatTableDataSource<UserFormModel>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columns: Array<string> = ["firstName", "lastName", "employeeID", "actions"];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.userModels.currentValue;
    this.dataSource.sort = this.sort;
  }

  editAction(userFormModel: UserFormModel) {
    this.editEmitter.emit(userFormModel);
  }

  deleteAction(userFormModel: UserFormModel) {
    this.deleteEmitter.emit(userFormModel);
  }

  search(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }
}
