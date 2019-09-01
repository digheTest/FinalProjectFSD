import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../utils/constants";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ManagerService {
  constructor(private http: HttpClient) {}

  getAllManagers() {
    return this.http
      .get(`${Constants.BASE_URL}/getAllProjects`)
      .pipe(map(res => console.log(res)));
  }
}
