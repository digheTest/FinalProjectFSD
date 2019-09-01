import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProjectComponent } from "./pages/add-project/add-project.component";
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { ViewTaskComponent } from "./pages/view-task/view-task.component";

const routes: Routes = [
  {
    path: "addProject",
    component: AddProjectComponent
  },
  {
    path: "addTask",
    component: AddTaskComponent
  },
  {
    path: "editTask",
    component: AddTaskComponent
  },
  {
    path: "addUser",
    component: AddUserComponent
  },
  {
    path: "viewTask",
    component: ViewTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
