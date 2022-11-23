import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResultHelper } from "../../shared/models/Common/ResultHelper";
import { User } from "../../shared/models/User";
import { environment } from "../../../environments/environment";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private readonly userEndpoint = environment.webApi + "User/";

  constructor(private http: HttpClient) {}

  /**
   * this method allow to get an user by the id
   * @param {id:number} the id to get the user
   * @returns {Observable<ResultHelper>}
   */

  getUserById(id: number): Observable<ResultHelper> {
    const url = `${this.userEndpoint}${id}`;
    return this.http.get<ResultHelper>(url);
  }

  /**
   * this method allow to update an user
   * @param {id:number} the id to get the user
   * @returns {Observable<ResultHelper>}
   */

  updateUser(user: User): Observable<ResultHelper> {
    const url = `${this.userEndpoint}`;
    return this.http.put<ResultHelper>(url, user);
  }
}
