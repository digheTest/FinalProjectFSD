import { UserFormModel } from "../models/user-form-model";
import { ItemModel } from "../models/item-model";
import { ProjectFormModel } from "../models/project-form-model";
import { TaskFormModel } from "../models/task-form-model";

export class Utils {
  static convertUsersToItems(
    users: Array<UserFormModel>,
    selectedUserID?: number
  ) {
    return users.map(user =>
      this.convertUserToItem(user, user.userID === selectedUserID)
    );
  }

  static convertUserToItem(user: UserFormModel, isSelected: boolean = false) {
    return new ItemModel({
      isSelected,
      itemID: user.userID,
      itemName: `${user.firstName} ${user.lastName}`
    });
  }

  static convertProjectsToItems(
    projects: Array<ProjectFormModel>,
    selectedProjectID?: number
  ) {
    return projects.map(project =>
      this.convertProjectToItem(
        project,
        project.projectID === selectedProjectID
      )
    );
  }

  static convertProjectToItem(
    project: ProjectFormModel,
    isSelected: boolean = false
  ) {
    return new ItemModel({
      isSelected,
      itemID: project.projectID,
      itemName: project.project
    });
  }

  static convertTasksToItems(
    tasks: Array<TaskFormModel>,
    selectedTaskID?: number
  ) {
    return tasks.map(task =>
      this.convertTaskToItem(task, task.taskID === selectedTaskID)
    );
  }

  static convertTaskToItem(task: TaskFormModel, isSelected: boolean = false) {
    return new ItemModel({
      isSelected,
      itemID: task.taskID,
      itemName: task.task
    });
  }

  static convertParentTasksToItems(
    tasks: Array<TaskFormModel>,
    selectedParentTaskID?: number
  ) {
    return tasks.map(task =>
      this.convertParentTaskToItem(
        task,
        task.parentTaskID === selectedParentTaskID
      )
    );
  }

  static convertParentTaskToItem(
    task: TaskFormModel,
    isSelected: boolean = false
  ) {
    return new ItemModel({
      isSelected,
      itemID: task.parentTaskID,
      itemName: task.parentTask
    });
  }
}
