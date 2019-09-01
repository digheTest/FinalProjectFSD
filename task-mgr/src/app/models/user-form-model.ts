export class UserFormModel {
  firstName: string;
  lastName: string;
  employeeID: number;
  userID: number;

  constructor(
    options: {
      firstName?: string;
      lastName?: string;
      employeeID?: number;
      userID?: number;
    } = {}
  ) {
    this.firstName = options.firstName || "";
    this.lastName = options.lastName || "";
    this.employeeID = options.employeeID || 0;
    this.userID = options.userID || 0;
  }
}
