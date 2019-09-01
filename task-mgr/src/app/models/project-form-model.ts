export class ProjectFormModel {
  project: string;
  projectID: number;
  startDate: Date;
  endDate: Date;
  priority: number;
  managerID: number;
  manager: string;

  totalTasks: number;
  completedTasks: number;

  constructor(
    options: {
      project?: string;
      projectID?: number;
      startDate?: Date;
      endDate?: Date;
      priority?: number;
      managerID?: number;
      manager?: string;

      totalTasks?: number;
      completedTasks?: number;
    } = {}
  ) {
    this.project = options.project || "";
    this.projectID = options.projectID || -1;
    this.startDate = options.startDate || undefined;
    this.endDate = options.endDate || undefined;
    this.priority = options.priority || 0;
    this.managerID = options.managerID || -1;
    this.manager = options.manager || "";

    this.totalTasks = options.totalTasks || 0;
    this.completedTasks = options.completedTasks || 0;
  }
}
