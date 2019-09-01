import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  MatTableDataSource,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatRadioChange
} from "@angular/material";
import { ItemModel } from "src/app/models/item-model";
import { DialogDataModel } from "src/app/models/dialog-data-model";

@Component({
  selector: "app-item-selection-dialog",
  templateUrl: "./item-selection-dialog.component.html",
  styleUrls: ["./item-selection-dialog.component.scss"]
})
export class ItemSelectionDialogComponent implements OnInit {
  dataSource = new MatTableDataSource<ItemModel>();

  columns: Array<string> = ["select", "itemName"];

  selectedItem: ItemModel;

  constructor(
    public dialogRef: MatDialogRef<ItemSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel
  ) {}

  ngOnInit() {
    this.dataSource.data = this.data.items;
    this.selectedItem = this.data.selectedItem
      ? this.data.selectedItem
      : new ItemModel();
  }

  search(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
    //TODO: Fix date search
  }

  processData() {
    this.dialogRef.close(this.selectedItem);
  }

  processSelection(data: MatRadioChange) {
    this.selectedItem = data.value;
  }
}
