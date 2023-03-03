import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InquiryResponse } from "../../shared/models/Common/InquiryResponse";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { InquiryResquest } from "../../shared/models/Common/InquiryRequest";
import { Activity } from "../../shared/models/Activity";
import { ResultHelper } from "../../shared/models/Common/ResultHelper";
import { Client } from "../../shared/models/Client";
import { Provider } from "../../shared/models/Provider";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  // Activity Endpoint
  private readonly activityEndpoint = environment.webApi + "Activity";
  //Client Enpoint
  private readonly clientEndpoint = environment.webApi + "Client";

  //Provider Endpoint
  private readonly providerEndpoint = environment.webApi + "Provider";

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

  /**
   * this method allow to update an activity
   * @param {activity:Activity} the Activity to be updated
   * @returns {Observable<ResultHelper>}
   */

  updateActivity(activity: Activity): Observable<ResultHelper> {
    const url = `${this.activityEndpoint}`;
    return this.http.put<ResultHelper>(url, activity);
  }

  /**
   * this method allow to update an activity
   * @param {activity:Activity}  the Activity to be created
   * @returns {Observable<ResultHelper>}
   */

  createActivity(activity: Activity): Observable<ResultHelper> {
    const url = `${this.activityEndpoint}`;
    return this.http.post<ResultHelper>(url, activity);
  }

  /**
   * this method allow to update an activity
   * @param {client:Client}  the Activity to be created
   * @returns {Observable<ResultHelper>}
   */

  updateClient(client: Client): Observable<ResultHelper> {
    console.log(JSON.stringify(client));
    const url = `${this.clientEndpoint}`;
    return this.http.put<ResultHelper>(url, client);
  }

  /**
   * this method allow to update an client
   * @param {client:Client}  the Activity to be created
   * @returns {Observable<ResultHelper>}
   */

  createClient(client: Client): Observable<ResultHelper> {
    const url = `${this.clientEndpoint}`;
    return this.http.post<ResultHelper>(url, client);
  }

  /**
   * this method allow to get all providers by client id
   * @param {inquiryRequest:InquiryResquest} the request to fetch the data
   * @returns {Observable<ResultHelper>}
   */

  getAllProvidersByClientId(
    inquiryRequest: InquiryResquest
  ): Observable<InquiryResponse> {
    const request = inquiryRequest.parseQueryString();

    const url = `${this.providerEndpoint}/All${request}`;
    return this.http.get<InquiryResponse>(url);
  }

  /**
   * this method allow to update an provider
   * @param {provider:Provider} the Activity to be updated
   * @returns {Observable<ResultHelper>}
   */

  updateProvider(provider: Provider): Observable<ResultHelper> {
    const url = `${this.providerEndpoint}`;
    return this.http.put<ResultHelper>(url, provider);
  }

  /**
   * this method allow to create a provider
   * @param {provider:Provider}  the Activity to be created
   * @returns {Observable<ResultHelper>}
   */

  createProvider(provider: Provider): Observable<ResultHelper> {
    const url = `${this.providerEndpoint}`;
    return this.http.post<ResultHelper>(url, provider);
  }
}
