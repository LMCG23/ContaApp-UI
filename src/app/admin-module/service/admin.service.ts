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
  // Activity Endpoint
  private readonly activityEndpoint = environment.webApi + "Activity";
  //Client Enpoint
  private readonly clientEndpoint = environment.webApi + "Client";
  constructor(private http: HttpClient) {}

  /**
   * this method allow to get all activityes by acounting firm id
   * @param {inquiryRequest:InquiryResquest} the request to fetch the data
   * @returns {Observable<ResultHelper>}
   */

  getAllActivitiesByAccoutingFirmId(
    inquiryRequest: InquiryResquest
  ): Observable<InquiryResponse> {
    const request = inquiryRequest.parseQueryString();

    const url = `${this.activityEndpoint}/All${request}`;
    return this.http.get<InquiryResponse>(url);
  }

  /**
   * this method allow to get all clients by acounting firm id
   * @param {inquiryRequest:InquiryResquest} the request to fetch the data
   * @returns {Observable<ResultHelper>}
   */
  getAllClientsByAccoutingFirmId(
    inquiryRequest: InquiryResquest
  ): Observable<InquiryResponse> {
    const request = inquiryRequest.parseQueryString();

    const url = `${this.clientEndpoint}/All${request}`;
    return this.http.get<InquiryResponse>(url);
  }
}
