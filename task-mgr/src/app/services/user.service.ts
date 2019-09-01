import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Constants } from "../utils/constants";
import { map } from "rxjs/operators";
import { UserFormModel } from "../models/user-form-model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${Constants.BASE_URL}/getAllUsers`).pipe(
      map((response: any) =>
        response.map(
          item =>
            new UserFormModel({
              employeeID: item.EmpID,
              firstName: item.FirstName,
              lastName: item.LastName,
              userID: item.UserId
            })
        )
      )
    );
  }

  getUser(userID: number) {
    const params = new HttpParams().set("UserID", userID.toString());
    return this.http
      .get(`${Constants.BASE_URL}/getUser`, {
        params
      })
      .pipe(
        map(
          (response: any) =>
            new UserFormModel({
              employeeID: response.EmpID,
              firstName: response.FirstName,
              lastName: response.LastName,
              userID: response.UserId
            })
        )
      );
  }

  addUser(userFormData) {
    return this.http.post(`${Constants.BASE_URL}/addUser`, {
      FirstName: userFormData.firstName,
      LastName: userFormData.lastName,
      EmpID: userFormData.employeeID,
      UserID: userFormData.userID
    });
  }

  editUser(userFormData) {
    return this.http.post(`${Constants.BASE_URL}/editUser`, {
      FirstName: userFormData.firstName,
      LastName: userFormData.lastName,
      EmpID: userFormData.employeeID,
      UserID: userFormData.userID
    });
  }

  deleteUser(userFormData) {
    const params = new HttpParams().set("UserID", userFormData.userID);
    return this.http.delete(`${Constants.BASE_URL}/deleteUser`, { params });
  }
}
