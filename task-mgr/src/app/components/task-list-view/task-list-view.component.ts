import {
  Component,
  OnChanges,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { TaskFormModel } from "src/app/models/task-form-model";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-task-list-view",
  templateUrl: "./task-list-view.component.html",
  styleUrls: ["./task-list-view.component.scss"]
})
export class TaskListViewComponent implements OnChanges {
  @Input()
  taskModels: Array<TaskFormModel>;

  @Output("onEditAction")
  editEmitter = new EventEmitter();

  @Output("onEndAction")
  endEmitter = new EventEmitter();

  dataSource = new MatTableDataSource<TaskFormModel>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columns: Array<string> = [
    "task",
    "parentTask",
    "startDate",
    "endDate",
    "actions"
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.taskModels.currentValue;
    this.dataSource.sort = this.sort;
  }

  editAction(taskFormModel: TaskFormModel) {
    this.editEmitter.emit(taskFormModel);
  }

  endAction(taskFormModel: TaskFormModel) {
    this.endEmitter.emit(taskFormModel);
  }

  search(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }
}
