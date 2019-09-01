import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";

import { AddProjectComponent } from "./pages/add-project/add-project.component";
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { ViewTaskComponent } from "./pages/view-task/view-task.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UserListViewComponent } from "./components/user-list-view/user-list-view.component";
import { ProjectFormComponent } from "./components/project-form/project-form.component";
import { ProjectListViewComponent } from "./components/project-list-view/project-list-view.component";
import { ItemSelectionDialogComponent } from "./components/item-selection-dialog/item-selection-dialog.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { TaskListViewComponent } from "./components/task-list-view/task-list-view.component";

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    UserFormComponent,
    UserListViewComponent,
    ProjectFormComponent,
    ProjectListViewComponent,
    ItemSelectionDialogComponent,
    TaskFormComponent,
    TaskListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatTabsModule,
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ItemSelectionDialogComponent]
})
export class AppModule {}
