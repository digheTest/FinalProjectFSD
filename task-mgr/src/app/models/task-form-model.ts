export class TaskFormModel {
  project: string;
  taskID: number;
  task: string;
  isParentTask: boolean;
  priority: number;
  parentTaskID: number;
  parentTask: string;
  startDate: Date;
  endDate: Date;
  user: string;
  userID: number;
  projectID: number;
  isCompleted: boolean;

  constructor(
    options: {
      project?: string;
      taskID?: number;
      task?: string;
      isParentTask?: boolean;
      priority?: number;
      parentTaskID?: number;
      parentTask?: string;
      startDate?: Date;
      endDate?: Date;
      user?: string;
      userID?: number;
      projectID?: number;
      isCompleted?: boolean;
    } = {}
  ) {
    this.project = options.project || "";
    this.taskID = options.taskID || 0;
    this.task = options.task || "";
    this.isParentTask = options.isParentTask || false;
    this.priority = options.priority || 0;
    this.parentTaskID = options.parentTaskID || 0;
    this.parentTask = options.parentTask || "";
    this.startDate = options.startDate || new Date();
    this.endDate = options.endDate || new Date();
    this.user = options.user || "";
    this.userID = options.userID || 0;
    this.projectID = options.projectID || 0;
    this.isCompleted = options.isCompleted || false;
  }
}
