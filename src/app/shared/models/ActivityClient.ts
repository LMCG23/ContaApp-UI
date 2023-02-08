import { Activity } from "./Activity";
import { Client } from "./Client";

export class ActivityClient {
  activity?: Activity = new Activity();
  activityId: number = 0;
  client?: Client = new Client();
  clientId: number = 0;
}
