import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InquiryResponse } from "../../shared/models/Common/InquiryResponse";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { InquiryResquest } from "../../shared/models/Common/InquiryRequest";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private readonly userEndpoint = environment.webApi + "Activity";

  constructor(private http: HttpClient) {}

  /**
   * this method allow to get an user by the id
   * @param {id:number} the id to get the user
   * @returns {Observable<ResultHelper>}
   */

  getAllActivitiesByAccoutingFirmId(
    inquiryRequest: InquiryResquest
  ): Observable<InquiryResponse> {
    const request = inquiryRequest.parseQueryString();

    const url = `${this.userEndpoint}/All${request}`;
    return this.http.get<InquiryResponse>(url);
  }
}
