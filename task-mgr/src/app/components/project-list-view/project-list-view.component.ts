import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { ProjectFormModel } from "src/app/models/project-form-model";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-project-list-view",
  templateUrl: "./project-list-view.component.html",
  styleUrls: ["./project-list-view.component.scss"]
})
export class ProjectListViewComponent implements OnChanges {
  @Input()
  projectModels: Array<ProjectFormModel>;

  @Output("onUpdateAction")
  updateEmitter = new EventEmitter();

  @Output("onSuspendAction")
  suspendEmitter = new EventEmitter();

  dataSource = new MatTableDataSource<ProjectFormModel>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columns: Array<string> = [
    "project",
    "totalTasks",
    "completedTasks",
    "startDate",
    "endDate",
    "priority",
    "actions"
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.projectModels.currentValue;
    this.dataSource.sort = this.sort;
  }

  updateAction(projectFormModel: ProjectFormModel) {
    this.updateEmitter.emit(projectFormModel);
  }

  suspendAction(projectFormModel: ProjectFormModel) {
    this.suspendEmitter.emit(projectFormModel);
  }

  search(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }
}
